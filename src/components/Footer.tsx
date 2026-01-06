import { Download, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Download className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">دنیای نرم‌افزار</h3>
                <p className="text-xs text-muted-foreground">دانلود رایگان</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              دانلود رایگان و امن هزاران نرم‌افزار برای تمام پلتفرم‌ها. ما در خدمت شما هستیم.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">نرم‌افزار ویندوز</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">نرم‌افزار اندروید</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">بازی‌های کامپیوتر</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">ابزارهای کاربردی</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-foreground mb-4">پشتیبانی</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">سوالات متداول</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">آموزش دانلود</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">گزارش مشکل</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">تماس با ما</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="https://merwisr.work.gd" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">merwisr.work.gd</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">+93 748002981</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>مزار شریف، افغانستان</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            کلیه حقوق این وبسایت متعلق به سازنده{" "}
            <a href="https://merwisr.work.gd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              میرویس رحیمی
            </a>{" "}
            می‌باشد.
          </p>
          <p className="text-sm text-muted-foreground">
            © ۱۴۰۴ - 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
