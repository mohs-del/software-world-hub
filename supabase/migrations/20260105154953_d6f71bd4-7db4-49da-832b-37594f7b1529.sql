-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create platforms table
CREATE TABLE public.platforms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on platforms
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create subcategories table
CREATE TABLE public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (category_id, slug)
);

-- Enable RLS on subcategories
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;

-- Create software table
CREATE TABLE public.software (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    full_description TEXT,
    icon TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL,
    platform_id UUID REFERENCES public.platforms(id) ON DELETE SET NULL,
    version TEXT,
    size TEXT,
    size_in_mb NUMERIC DEFAULT 0,
    developer TEXT,
    release_date DATE,
    downloads INTEGER DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 0,
    is_popular BOOLEAN DEFAULT false,
    is_quick_download BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on software
ALTER TABLE public.software ENABLE ROW LEVEL SECURITY;

-- Create software_screenshots table
CREATE TABLE public.software_screenshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID REFERENCES public.software(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on software_screenshots
ALTER TABLE public.software_screenshots ENABLE ROW LEVEL SECURITY;

-- Create software_features table
CREATE TABLE public.software_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID REFERENCES public.software(id) ON DELETE CASCADE NOT NULL,
    feature TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Enable RLS on software_features
ALTER TABLE public.software_features ENABLE ROW LEVEL SECURITY;

-- Create software_requirements table
CREATE TABLE public.software_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID REFERENCES public.software(id) ON DELETE CASCADE NOT NULL,
    requirement TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Enable RLS on software_requirements
ALTER TABLE public.software_requirements ENABLE ROW LEVEL SECURITY;

-- Create download_links table
CREATE TABLE public.download_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID REFERENCES public.software(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL DEFAULT 'دانلود مستقیم',
    url TEXT NOT NULL,
    is_direct BOOLEAN DEFAULT true,
    file_size TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on download_links
ALTER TABLE public.download_links ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
    RETURN new;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_software_updated_at
    BEFORE UPDATE ON public.software
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- Profiles: Users can view all, update their own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- User roles: Only viewable by admins or self
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Platforms: Public read, admin write
CREATE POLICY "Platforms are viewable by everyone" ON public.platforms
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage platforms" ON public.platforms
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Categories: Public read, admin write
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Subcategories: Public read, admin write
CREATE POLICY "Subcategories are viewable by everyone" ON public.subcategories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage subcategories" ON public.subcategories
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Software: Public read, admin write
CREATE POLICY "Software is viewable by everyone" ON public.software
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage software" ON public.software
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Screenshots: Public read, admin write
CREATE POLICY "Screenshots are viewable by everyone" ON public.software_screenshots
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage screenshots" ON public.software_screenshots
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Features: Public read, admin write
CREATE POLICY "Features are viewable by everyone" ON public.software_features
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage features" ON public.software_features
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Requirements: Public read, admin write
CREATE POLICY "Requirements are viewable by everyone" ON public.software_requirements
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage requirements" ON public.software_requirements
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Download links: Public read, admin write
CREATE POLICY "Download links are viewable by everyone" ON public.download_links
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage download links" ON public.download_links
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));