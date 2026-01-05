import { useParams, Link } from "react-router-dom";
import { 
  Download, Star, Calendar, HardDrive, User, 
  ChevronLeft, Shield, Check, Monitor, Share2, Heart, ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { Button } from "@/components/ui/button";
import { useSoftwareById } from "@/hooks/useSoftware";

const SoftwareDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSoftwareById(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-48 bg-secondary rounded-2xl" />
            <div className="h-64 bg-secondary rounded-2xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data?.software) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">نرم‌افزار یافت نشد</h1>
          <Link to="/" className="text-primary hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { software, screenshots, features, requirements, downloadLinks, relatedSoftware } = data;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
          <ChevronLeft className="w-4 h-4" />
          {software.categories && (
            <>
              <Link to={`/category/${software.categories.slug}`} className="hover:text-primary transition-colors">
                {software.categories.name}
              </Link>
              <ChevronLeft className="w-4 h-4" />
            </>
          )}
          <span className="text-foreground">{software.name}</span>
        </nav>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Software Header */}
            <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-card flex items-center justify-center text-5xl md:text-6xl shadow-card shrink-0">
                  {software.icon || "📦"}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{software.name}</h1>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      v{software.version || "1.0"}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{software.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    {software.developer && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{software.developer}</span>
                      </div>
                    )}
                    {software.size && (
                      <div className="flex items-center gap-1">
                        <HardDrive className="w-4 h-4" />
                        <span>{software.size}</span>
                      </div>
                    )}
                    {software.release_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{software.release_date}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{(software.downloads || 0).toLocaleString('fa-IR')} دانلود</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-foreground font-medium">{software.rating || 0}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {downloadLinks.length > 0 ? (
                      <Button 
                        variant="download" 
                        size="lg" 
                        className="gap-2"
                        onClick={() => window.open(downloadLinks[0].url, '_blank')}
                      >
                        <Download className="w-5 h-5" />
                        دانلود مستقیم
                      </Button>
                    ) : (
                      <Button variant="download" size="lg" className="gap-2" disabled>
                        <Download className="w-5 h-5" />
                        لینک دانلود موجود نیست
                      </Button>
                    )}
                    <Button variant="outline" size="lg" className="gap-2">
                      <Heart className="w-5 h-5" />
                      افزودن به علاقه‌مندی
                    </Button>
                    <Button variant="ghost" size="lg" className="gap-2">
                      <Share2 className="w-5 h-5" />
                      اشتراک‌گذاری
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  تصاویر نرم‌افزار
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {screenshots.map((screenshot) => (
                    <div
                      key={screenshot.id}
                      className="relative rounded-xl overflow-hidden aspect-video bg-secondary group cursor-pointer"
                    >
                      <img
                        src={screenshot.url}
                        alt={`${software.name} - تصویر`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          بزرگ‌نمایی
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {software.full_description && (
              <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4">توضیحات کامل</h2>
                <p className="text-muted-foreground leading-relaxed">{software.full_description}</p>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  ویژگی‌های کلیدی
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4">نیازمندی‌های سیستم</h2>
                <ul className="space-y-2">
                  {requirements.map((req) => (
                    <li key={req.id} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {req.requirement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Links */}
            {downloadLinks.length > 0 && (
              <div className="bg-gradient-card rounded-2xl p-6 border border-border/50 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">لینک‌های دانلود</h3>
                <div className="space-y-3">
                  {downloadLinks.map((link) => (
                    <div 
                      key={link.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium text-foreground">{link.title}</p>
                        {link.file_size && (
                          <p className="text-sm text-muted-foreground">{link.file_size}</p>
                        )}
                      </div>
                      <Button 
                        variant="download" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        {link.is_direct ? (
                          <>
                            <Download className="w-4 h-4" />
                            دانلود
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            مشاهده
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Software */}
            {relatedSoftware.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">نرم‌افزارهای مشابه</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedSoftware.map((item) => (
                    <Link
                      key={item.id}
                      to={`/software/${item.id}`}
                      className="glass rounded-xl p-4 border border-border/50 flex items-center gap-4 hover:border-primary/50 transition-all group"
                    >
                      <div className="text-3xl">{item.icon || "📦"}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </Link>
                  ))}
                </div>
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

export default SoftwareDetail;
