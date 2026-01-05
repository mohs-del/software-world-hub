import { useParams, Link } from "react-router-dom";
import { Download, Star, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { categories, getSoftwareByCategory } from "@/data/softwareData";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const categoryData = categories.find(c => c.id === category);
  const software = getSoftwareByCategory(category || '');

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">دسته‌بندی یافت نشد</h1>
          <Link to="/" className="text-primary hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const subcategoryData = subcategory 
    ? categoryData.subcategories.find(s => s.id === subcategory)
    : null;

  const filteredSoftware = subcategory
    ? software.filter(s => s.subCategory === subcategory)
    : software;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
          <ChevronLeft className="w-4 h-4" />
          <Link to={`/category/${category}`} className="hover:text-primary transition-colors">
            {categoryData.name}
          </Link>
          {subcategoryData && (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-foreground">{subcategoryData.name}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 border border-border/50">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {subcategoryData ? subcategoryData.name : categoryData.name}
          </h1>
          <p className="text-muted-foreground">
            {filteredSoftware.length} نرم‌افزار در این دسته‌بندی
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Subcategories (if viewing main category) */}
            {!subcategory && categoryData.subcategories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">زیردسته‌ها</h2>
                <div className="flex flex-wrap gap-3">
                  {categoryData.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/category/${category}/${sub.id}`}
                      className="px-4 py-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Software List */}
            {filteredSoftware.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSoftware.map((item) => (
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
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {item.name}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground shrink-0">
                            {item.platform}
                          </span>
                        </div>
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

          {/* Sidebar */}
          <QuickDownloadSidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
