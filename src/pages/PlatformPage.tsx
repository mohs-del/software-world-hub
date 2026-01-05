import { useParams, Link } from "react-router-dom";
import { Download, Star, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { platforms, getSoftwareByPlatform, categories } from "@/data/softwareData";

const PlatformPage = () => {
  const { platform } = useParams();
  const platformData = platforms.find(p => p.id === platform);
  const software = getSoftwareByPlatform(platform || '');

  if (!platformData) {
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

  const platformCategories = categories.filter(c => 
    platformData.categories.includes(c.id)
  );

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
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
            <span className="text-4xl">
              {platform === 'windows' && '🪟'}
              {platform === 'mac' && '🍎'}
              {platform === 'linux' && '🐧'}
              {platform === 'android' && '🤖'}
              {platform === 'ios' && '📱'}
            </span>
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
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">دسته‌بندی‌ها</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platformCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="glass rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all text-center group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.subcategories.length} زیردسته
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Software List */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                نرم‌افزارهای محبوب ({software.length})
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {software.map((item) => (
                  <Link
                    key={item.id}
                    to={`/software/${item.id}`}
                    className="glass rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-card flex items-center justify-center text-3xl shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{item.size}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {item.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {item.downloads.toLocaleString('fa-IR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
