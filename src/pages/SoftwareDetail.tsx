import { useParams, Link } from "react-router-dom";
import { 
  Download, Star, Calendar, HardDrive, User, 
  ChevronLeft, Shield, Check, Monitor, Share2, Heart
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickDownloadSidebar from "@/components/QuickDownloadSidebar";
import { Button } from "@/components/ui/button";
import { getSoftwareById, softwareList } from "@/data/softwareData";

const SoftwareDetail = () => {
  const { id } = useParams();
  const software = getSoftwareById(id || '');

  if (!software) {
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

  const relatedSoftware = softwareList
    .filter(s => s.category === software.category && s.id !== software.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
          <ChevronLeft className="w-4 h-4" />
          <Link to={`/category/${software.category}`} className="hover:text-primary transition-colors">
            {software.category}
          </Link>
          <ChevronLeft className="w-4 h-4" />
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
                  {software.icon}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{software.name}</h1>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      v{software.version}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{software.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{software.developer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HardDrive className="w-4 h-4" />
                      <span>{software.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{software.releaseDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{software.downloads.toLocaleString('fa-IR')} دانلود</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-foreground font-medium">{software.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="download" size="lg" className="gap-2">
                      <Download className="w-5 h-5" />
                      دانلود مستقیم
                    </Button>
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
            <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                تصاویر نرم‌افزار
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {software.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden aspect-video bg-secondary group cursor-pointer"
                  >
                    <img
                      src={screenshot}
                      alt={`${software.name} - تصویر ${index + 1}`}
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

            {/* Description */}
            <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-4">توضیحات کامل</h2>
              <p className="text-muted-foreground leading-relaxed">{software.fullDescription}</p>
            </div>

            {/* Features */}
            <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                ویژگی‌های کلیدی
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {software.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="glass rounded-2xl p-6 mb-6 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-4">نیازمندی‌های سیستم</h2>
              <ul className="space-y-2">
                {software.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Section */}
            <div className="bg-gradient-card rounded-2xl p-6 border border-border/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">آماده دانلود</h3>
                  <p className="text-muted-foreground">
                    نسخه {software.version} • {software.size} • {software.platform}
                  </p>
                </div>
                <Button variant="download" size="lg" className="gap-2 min-w-[200px]">
                  <Download className="w-5 h-5" />
                  دانلود رایگان
                </Button>
              </div>
            </div>

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
                      <div className="text-3xl">{item.icon}</div>
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
