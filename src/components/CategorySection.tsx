import { Link } from "react-router-dom";
import { 
  Monitor, Smartphone, Gamepad2, Settings, Palette, Video, Music, 
  FileText, Shield, Globe, Code, Play, Terminal, Tablet
} from "lucide-react";
import { categories, platforms } from "@/data/softwareData";

const iconMap: Record<string, any> = {
  Monitor, Smartphone, Gamepad2, Settings, Palette, Video, Music, 
  FileText, Shield, Globe, Code, Play, Terminal, Tablet,
  Apple: Monitor,
};

const CategorySection = () => {
  return (
    <section className="mb-12">
      {/* Platforms */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          سیستم‌عامل‌ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {platforms.map((platform) => {
            const Icon = iconMap[platform.icon] || Monitor;
            return (
              <Link
                key={platform.id}
                to={`/platform/${platform.id}`}
                className="group p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform shadow-glow">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-medium text-foreground">{platform.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          دسته‌بندی نرم‌افزارها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Settings;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                    >
                      {sub.name}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      +{category.subcategories.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
