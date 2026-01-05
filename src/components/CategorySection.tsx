import { Link } from "react-router-dom";
import { 
  Monitor, Smartphone, Gamepad2, Settings, Palette, Video, Music, 
  FileText, Shield, Globe, Code, Play, Terminal, Tablet
} from "lucide-react";
import { usePlatforms, useCategories } from "@/hooks/useSoftware";

const iconMap: Record<string, any> = {
  Monitor, Smartphone, Gamepad2, Settings, Palette, Video, Music, 
  FileText, Shield, Globe, Code, Play, Terminal, Tablet,
  Apple: Monitor,
};

// Platform logos mapping
const platformLogos: Record<string, string> = {
  windows: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/88px-Windows_logo_-_2012.svg.png",
  mac: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/64px-Apple_logo_black.svg.png",
  linux: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/76px-Tux.svg.png",
  android: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Android_new_logo_2019.svg/96px-Android_new_logo_2019.svg.png",
  ios: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/64px-Apple_logo_black.svg.png",
};

const CategorySection = () => {
  const { data: platforms, isLoading: platformsLoading } = usePlatforms();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <section className="mb-12">
      {/* Platforms */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          سیستم‌عامل‌ها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {platformsLoading ? (
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-secondary animate-pulse" />
            ))
          ) : platforms && platforms.length > 0 ? (
            platforms.map((platform) => {
              const logoUrl = platformLogos[platform.slug];
              const Icon = iconMap[platform.icon || "Monitor"] || Monitor;
              
              return (
                <Link
                  key={platform.id}
                  to={`/platform/${platform.slug}`}
                  className="group p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform shadow-glow overflow-hidden">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={platform.name}
                        className="w-8 h-8 object-contain invert dark:invert-0"
                      />
                    ) : (
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    )}
                  </div>
                  <h3 className="font-medium text-foreground">{platform.name}</h3>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-8">
              پلتفرمی موجود نیست
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          دسته‌بندی نرم‌افزارها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoriesLoading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-secondary animate-pulse" />
            ))
          ) : categories && categories.length > 0 ? (
            categories.map((category) => {
              const Icon = iconMap[category.icon || "Settings"] || Settings;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
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
                    {category.subcategories?.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {category.subcategories && category.subcategories.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-8">
              دسته‌بندی موجود نیست
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
