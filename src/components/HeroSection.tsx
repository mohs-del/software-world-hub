import { Search, Download, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">به </span>
            <span className="text-gradient-primary">دنیای نرم‌افزار</span>
            <span className="text-foreground"> خوش آمدید</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            دانلود رایگان و امن هزاران نرم‌افزار برای ویندوز، اندروید و iOS
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="نام نرم‌افزار مورد نظر خود را جستجو کنید..."
              className="w-full h-14 pr-12 pl-32 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-card transition-all"
            />
            <Button variant="gradient" size="lg" className="absolute left-2 top-1/2 -translate-y-1/2">
              جستجو
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <span>دانلود رایگان</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span>فایل‌های امن</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span>سرعت بالا</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
