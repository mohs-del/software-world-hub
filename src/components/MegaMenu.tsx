import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Monitor, Apple, Terminal, Smartphone, Tablet,
  Palette, Code, FileText, Globe, Shield, Play, Settings, Gamepad2,
  ChevronDown
} from "lucide-react";
import { categories, platforms } from "@/data/softwareData";

const iconMap: Record<string, any> = {
  Monitor, Apple, Terminal, Smartphone, Tablet,
  Palette, Code, FileText, Globe, Shield, Play, Settings, Gamepad2,
};

const MegaMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {/* Platform Menu */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('platforms')}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50">
          <Monitor className="w-4 h-4" />
          <span>سیستم‌عامل</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'platforms' ? 'rotate-180' : ''}`} />
        </button>

        {activeMenu === 'platforms' && (
          <div className="absolute top-full right-0 pt-2 z-50">
            <div className="bg-card border border-border rounded-xl shadow-elevated p-6 min-w-[500px]">
              <div className="grid grid-cols-3 gap-6">
                {platforms.map((platform) => {
                  const Icon = iconMap[platform.icon] || Monitor;
                  return (
                    <Link
                      key={platform.id}
                      to={`/platform/${platform.id}`}
                      className="group flex flex-col gap-3 p-4 rounded-lg hover:bg-secondary/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {platform.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          نرم‌افزارهای {platform.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Menu */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('categories')}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50">
          <Settings className="w-4 h-4" />
          <span>دسته‌بندی</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'categories' ? 'rotate-180' : ''}`} />
        </button>

        {activeMenu === 'categories' && (
          <div className="absolute top-full right-0 pt-2 z-50">
            <div className="bg-card border border-border rounded-xl shadow-elevated p-6 min-w-[700px]">
              <div className="grid grid-cols-4 gap-4">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || Settings;
                  return (
                    <div key={category.id} className="space-y-3">
                      <Link
                        to={`/category/${category.id}`}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {category.name}
                      </Link>
                      <ul className="space-y-1">
                        {category.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={`/category/${category.id}/${sub.id}`}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Games */}
      <Link
        to="/category/games"
        className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
      >
        <Gamepad2 className="w-4 h-4" />
        <span>بازی‌ها</span>
      </Link>

      {/* Search Page */}
      <Link
        to="/search"
        className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
      >
        <Globe className="w-4 h-4" />
        <span>جستجوی پیشرفته</span>
      </Link>
    </nav>
  );
};

export default MegaMenu;
