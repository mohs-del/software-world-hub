import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Search, Filter, X, Download, Star, SlidersHorizontal,
  Monitor, ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { Button } from "@/components/ui/button";
import { useSearchSoftware, usePlatforms, useCategories } from "@/hooks/useSoftware";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const quickDownloadParam = searchParams.get('quickDownload') === 'true';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'name'>('downloads');
  const [showFilters, setShowFilters] = useState(true);

  const { data: allSoftware, isLoading } = useSearchSoftware(searchQuery, quickDownloadParam);
  const { data: platforms } = usePlatforms();
  const { data: categories } = useCategories();

  const filteredSoftware = useMemo(() => {
    if (!allSoftware) return [];
    
    let results = [...allSoftware];

    // Platform filter
    if (selectedPlatform && platforms) {
      const platform = platforms.find(p => p.slug === selectedPlatform);
      if (platform) {
        results = results.filter(s => s.platform_id === platform.id);
      }
    }

    // Category filter
    if (selectedCategory && categories) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) {
        results = results.filter(s => s.category_id === category.id);
      }
    }

    // Sort
    switch (sortBy) {
      case 'downloads':
        results.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        results.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'fa'));
        break;
    }

    return results;
  }, [allSoftware, selectedPlatform, selectedCategory, sortBy, platforms, categories]);

  const clearFilters = () => {
    setSelectedPlatform(null);
    setSelectedCategory(null);
    setSortBy('downloads');
  };

  const hasActiveFilters = selectedPlatform || selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {quickDownloadParam ? "دانلود سریع" : "جستجوی پیشرفته"}
          </h1>
          <p className="text-muted-foreground">
            {quickDownloadParam 
              ? "نرم‌افزارهای پرطرفدار آماده دانلود سریع"
              : "در میان نرم‌افزارها جستجو کنید و مورد دلخواه خود را پیدا کنید"
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass rounded-2xl p-4 mb-6 border border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام نرم‌افزار را جستجو کنید..."
                className="w-full h-12 pr-12 pl-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 h-12"
            >
              <SlidersHorizontal className="w-5 h-5" />
              فیلترها
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-72 shrink-0 hidden md:block">
              <div className="glass rounded-2xl p-5 border border-border/50 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    فیلترها
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      پاک کردن
                    </button>
                  )}
                </div>

                {/* Platform Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">سیستم‌عامل</h4>
                  <div className="space-y-2">
                    {platforms?.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(
                          selectedPlatform === platform.slug ? null : platform.slug
                        )}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-right ${
                          selectedPlatform === platform.slug
                            ? 'bg-primary/20 text-primary border border-primary/50'
                            : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60'
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">دسته‌بندی</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category.slug ? null : category.slug
                        )}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-right ${
                          selectedCategory === category.slug
                            ? 'bg-primary/20 text-primary border border-primary/50'
                            : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">مرتب‌سازی</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-3 rounded-lg bg-secondary border border-border text-foreground"
                  >
                    <option value="downloads">پردانلودترین</option>
                    <option value="rating">بالاترین امتیاز</option>
                    <option value="name">نام</option>
                  </select>
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="text-foreground font-bold">{filteredSoftware.length}</span> نرم‌افزار یافت شد
              </p>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 rounded-xl bg-secondary animate-pulse" />
                ))}
              </div>
            ) : filteredSoftware.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSoftware.map((software) => (
                  <Link
                    key={software.id}
                    to={`/software/${software.id}`}
                    className="glass rounded-xl p-5 border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-card flex items-center justify-center text-3xl shrink-0">
                        {software.icon || "📦"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {software.name}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground shrink-0">
                            {software.platforms?.name || "-"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {software.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{software.size || "-"}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {software.rating || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {(software.downloads || 0).toLocaleString('fa-IR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-foreground mb-2">نتیجه‌ای یافت نشد</h3>
                <p className="text-muted-foreground mb-4">
                  فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  پاک کردن فیلترها
                </Button>
              </div>
            )}
          </div>

          {/* Quick Download Sidebar (only when filters hidden) */}
          {!showFilters && <QuickDownloadSidebar />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
