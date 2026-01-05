import { Link } from "react-router-dom";
import { Download, Star, TrendingUp } from "lucide-react";
import { quickDownloadApps } from "@/data/softwareData";
import { Button } from "@/components/ui/button";

const QuickDownloadSidebar = () => {
  return (
    <aside className="w-72 shrink-0 hidden xl:block">
      <div className="sticky top-24 space-y-6">
        {/* Quick Downloads */}
        <div className="glass rounded-2xl p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-foreground">دانلود سریع</h3>
          </div>
          
          <div className="space-y-3">
            {quickDownloadApps.slice(0, 6).map((app) => (
              <div
                key={app.id}
                className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-all"
              >
                <div className="text-2xl">{app.icon}</div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/software/${app.id}`}
                    className="font-medium text-foreground hover:text-primary transition-colors block truncate"
                  >
                    {app.name}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{app.size}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{app.rating}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  asChild
                >
                  <Link to={`/software/${app.id}`}>
                    <Download className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <Link
            to="/search?quickDownload=true"
            className="block mt-4 text-center text-sm text-primary hover:underline"
          >
            مشاهده همه →
          </Link>
        </div>

        {/* Stats */}
        <div className="glass rounded-2xl p-5 border border-border/50">
          <h3 className="font-bold text-foreground mb-4">آمار سایت</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">کل نرم‌افزارها</span>
              <span className="font-bold text-primary">۱,۲۵۰+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">دانلود امروز</span>
              <span className="font-bold text-primary">۵,۸۴۲</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">کاربران فعال</span>
              <span className="font-bold text-primary">۱۲,۳۴۵</span>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="rounded-2xl bg-gradient-card border border-border/50 p-5 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <h4 className="font-bold text-foreground mb-2">پیشنهاد ویژه</h4>
          <p className="text-sm text-muted-foreground mb-4">
            لایسنس اورجینال نرم‌افزارها با تخفیف ویژه
          </p>
          <Button variant="gradient" size="sm" className="w-full">
            مشاهده تخفیف‌ها
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default QuickDownloadSidebar;
