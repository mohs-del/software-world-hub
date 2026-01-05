import { useParams, Link } from "react-router-dom";
import { Download, Star, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { useSoftwareByPlatform, useCategories } from "@/hooks/useSoftware";

// Platform logos mapping
const platformLogos: Record<string, string> = {
  windows: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/88px-Windows_logo_-_2012.svg.png",
  mac: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/64px-Apple_logo_black.svg.png",
  linux: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/76px-Tux.svg.png",
  android: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Android_new_logo_2019.svg/96px-Android_new_logo_2019.svg.png",
  ios: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/64px-Apple_logo_black.svg.png",
};

const platformEmojis: Record<string, string> = {
  windows: "🪟",
  mac: "🍎",
  linux: "🐧",
  android: "🤖",
  ios: "📱",
};

const PlatformPage = () => {
  const { platform } = useParams();
  const { data, isLoading, error } = useSoftwareByPlatform(platform || '');
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-48 bg-secondary rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-secondary rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data?.platform) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">پلتفرم یافت نشد</h1>
          <Link to="/" className="text-primary hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { platform: platformData, software } = data;
  const logoUrl = platformLogos[platformData.slug];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-foreground">نرم‌افزارهای {platformData.name}</span>
        </nav>

        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 border border-border/50 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow overflow-hidden">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={platformData.name}
                className="w-12 h-12 object-contain invert dark:invert-0"
              />
            ) : (
              <span className="text-4xl">
                {platformEmojis[platformData.slug] || "💻"}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            نرم‌افزارهای {platformData.name}
          </h1>
          <p className="text-muted-foreground">
            بهترین نرم‌افزارها برای سیستم‌عامل {platformData.name}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">دسته‌بندی‌ها</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="glass rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all text-center group"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.subcategories?.length || 0} زیردسته
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Software List */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                نرم‌افزارهای محبوب ({software.length})
              </h2>
              {software.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {software.map((item) => (
                    <Link
                      key={item.id}
                      to={`/software/${item.id}`}
                      className="glass rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-card flex items-center justify-center text-3xl shrink-0">
                          {item.icon || "📦"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{item.size || "-"}</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              {item.rating || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {(item.downloads || 0).toLocaleString('fa-IR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    هنوز نرم‌افزاری اضافه نشده
                  </h3>
                  <p className="text-muted-foreground">
                    به زودی نرم‌افزارهای بیشتری اضافه خواهد شد
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <QuickDownloadSidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlatformPage;
