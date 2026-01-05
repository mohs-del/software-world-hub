import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbSoftware {
  id: string;
  name: string;
  description: string | null;
  full_description: string | null;
  icon: string | null;
  version: string | null;
  size: string | null;
  size_in_mb: number | null;
  downloads: number | null;
  rating: number | null;
  developer: string | null;
  release_date: string | null;
  is_popular: boolean | null;
  is_quick_download: boolean | null;
  platform_id: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  platforms?: { id: string; name: string; slug: string; icon: string | null } | null;
  categories?: { id: string; name: string; slug: string; icon: string | null } | null;
  subcategories?: { id: string; name: string; slug: string } | null;
}

export interface DbPlatform {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface DbSubcategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}

export interface DbDownloadLink {
  id: string;
  title: string;
  url: string;
  file_size: string | null;
  is_direct: boolean | null;
}

export interface DbScreenshot {
  id: string;
  url: string;
  sort_order: number | null;
}

export interface DbFeature {
  id: string;
  feature: string;
  sort_order: number | null;
}

export interface DbRequirement {
  id: string;
  requirement: string;
  sort_order: number | null;
}

// Fetch all software
export const useSoftwareList = () => {
  return useQuery({
    queryKey: ["software"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon),
          subcategories(id, name, slug)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DbSoftware[];
    },
  });
};

// Fetch popular software
export const usePopularSoftware = (limit = 8) => {
  return useQuery({
    queryKey: ["popular-software", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon)
        `)
        .eq("is_popular", true)
        .order("downloads", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as DbSoftware[];
    },
  });
};

// Fetch quick download software
export const useQuickDownloadSoftware = (limit = 6) => {
  return useQuery({
    queryKey: ["quick-download-software", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("software")
        .select("*")
        .eq("is_quick_download", true)
        .order("downloads", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as DbSoftware[];
    },
  });
};

// Fetch software by platform
export const useSoftwareByPlatform = (platformSlug: string) => {
  return useQuery({
    queryKey: ["software-by-platform", platformSlug],
    queryFn: async () => {
      // First get the platform id
      const { data: platform, error: platformError } = await supabase
        .from("platforms")
        .select("id, name, slug, icon")
        .eq("slug", platformSlug)
        .single();

      if (platformError) throw platformError;

      const { data, error } = await supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon)
        `)
        .eq("platform_id", platform.id)
        .order("downloads", { ascending: false });

      if (error) throw error;
      return { platform, software: data as DbSoftware[] };
    },
    enabled: !!platformSlug,
  });
};

// Fetch software by category
export const useSoftwareByCategory = (categorySlug: string, subcategorySlug?: string) => {
  return useQuery({
    queryKey: ["software-by-category", categorySlug, subcategorySlug],
    queryFn: async () => {
      // First get the category
      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, slug, icon")
        .eq("slug", categorySlug)
        .single();

      if (categoryError) throw categoryError;

      // Get subcategories for this category
      const { data: subcategories, error: subcatError } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", category.id);

      if (subcatError) throw subcatError;

      // Get software
      let query = supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon),
          subcategories(id, name, slug)
        `)
        .eq("category_id", category.id);

      if (subcategorySlug) {
        const subcategory = subcategories?.find(s => s.slug === subcategorySlug);
        if (subcategory) {
          query = query.eq("subcategory_id", subcategory.id);
        }
      }

      const { data, error } = await query.order("downloads", { ascending: false });

      if (error) throw error;

      const currentSubcategory = subcategorySlug 
        ? subcategories?.find(s => s.slug === subcategorySlug) 
        : null;

      return { 
        category, 
        subcategories: subcategories as DbSubcategory[], 
        currentSubcategory,
        software: data as DbSoftware[] 
      };
    },
    enabled: !!categorySlug,
  });
};

// Fetch single software by ID
export const useSoftwareById = (id: string) => {
  return useQuery({
    queryKey: ["software", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon),
          subcategories(id, name, slug)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      // Get related data
      const [screenshots, features, requirements, downloadLinks, relatedSoftware] = await Promise.all([
        supabase
          .from("software_screenshots")
          .select("*")
          .eq("software_id", id)
          .order("sort_order"),
        supabase
          .from("software_features")
          .select("*")
          .eq("software_id", id)
          .order("sort_order"),
        supabase
          .from("software_requirements")
          .select("*")
          .eq("software_id", id)
          .order("sort_order"),
        supabase
          .from("download_links")
          .select("*")
          .eq("software_id", id)
          .order("created_at"),
        data.category_id
          ? supabase
              .from("software")
              .select("*")
              .eq("category_id", data.category_id)
              .neq("id", id)
              .limit(4)
          : Promise.resolve({ data: [] }),
      ]);

      return {
        software: data as DbSoftware,
        screenshots: (screenshots.data || []) as DbScreenshot[],
        features: (features.data || []) as DbFeature[],
        requirements: (requirements.data || []) as DbRequirement[],
        downloadLinks: (downloadLinks.data || []) as DbDownloadLink[],
        relatedSoftware: (relatedSoftware.data || []) as DbSoftware[],
      };
    },
    enabled: !!id,
  });
};

// Fetch all platforms
export const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platforms")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as DbPlatform[];
    },
  });
};

// Fetch all categories with subcategories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (catError) throw catError;

      const { data: subcategories, error: subError } = await supabase
        .from("subcategories")
        .select("*")
        .order("name");

      if (subError) throw subError;

      // Group subcategories by category
      return categories.map(cat => ({
        ...cat,
        subcategories: subcategories.filter(sub => sub.category_id === cat.id),
      })) as (DbCategory & { subcategories: DbSubcategory[] })[];
    },
  });
};

// Search software
export const useSearchSoftware = (query: string, quickDownload?: boolean) => {
  return useQuery({
    queryKey: ["search-software", query, quickDownload],
    queryFn: async () => {
      let dbQuery = supabase
        .from("software")
        .select(`
          *,
          platforms(id, name, slug, icon),
          categories(id, name, slug, icon)
        `);

      if (query) {
        dbQuery = dbQuery.ilike("name", `%${query}%`);
      }

      if (quickDownload) {
        dbQuery = dbQuery.eq("is_quick_download", true);
      }

      const { data, error } = await dbQuery.order("downloads", { ascending: false });

      if (error) throw error;
      return data as DbSoftware[];
    },
    enabled: true,
  });
};

// Get stats
export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const [softwareCount, platformCount, categoryCount, downloadsSum] = await Promise.all([
        supabase.from("software").select("id", { count: "exact", head: true }),
        supabase.from("platforms").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("software").select("downloads"),
      ]);

      const totalDownloads = downloadsSum.data?.reduce((sum, s) => sum + (s.downloads || 0), 0) || 0;

      return {
        softwareCount: softwareCount.count || 0,
        platformCount: platformCount.count || 0,
        categoryCount: categoryCount.count || 0,
        totalDownloads,
      };
    },
  });
};
