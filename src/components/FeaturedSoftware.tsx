import { Link } from "react-router-dom";
import { Download, Star } from "lucide-react";
import { softwareList } from "@/data/softwareData";
import { Button } from "@/components/ui/button";

const FeaturedSoftware = () => {
  const popularSoftware = softwareList.filter(s => s.isPopular).slice(0, 8);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            نرم‌افزارهای محبوب
          </h2>
          <p className="text-muted-foreground text-sm">
            پرطرفدارترین نرم‌افزارهای این هفته
          </p>
        </div>
        <Link to="/search" className="text-primary hover:underline text-sm font-medium">
          مشاهده همه ←
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {popularSoftware.map((software) => (
          <Link
            key={software.id}
            to={`/software/${software.id}`}
            className="group glass rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-card flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                {software.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {software.name}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground shrink-0">
                    v{software.version}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {software.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{software.size}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {software.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {software.downloads.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSoftware;
