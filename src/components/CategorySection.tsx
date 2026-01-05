import { Monitor, Smartphone, Gamepad2, Settings, Image, Video, Music, FileText, Shield, Globe } from "lucide-react";

const categories = [
  { name: "ویندوز", icon: Monitor, count: 1250, color: "from-blue-500 to-cyan-500" },
  { name: "اندروید", icon: Smartphone, count: 890, color: "from-green-500 to-emerald-500" },
  { name: "بازی", icon: Gamepad2, count: 456, color: "from-purple-500 to-pink-500" },
  { name: "ابزارها", icon: Settings, count: 324, color: "from-orange-500 to-amber-500" },
  { name: "گرافیک", icon: Image, count: 187, color: "from-rose-500 to-red-500" },
  { name: "ویدیو", icon: Video, count: 256, color: "from-indigo-500 to-violet-500" },
  { name: "موزیک", icon: Music, count: 198, color: "from-teal-500 to-cyan-500" },
  { name: "آفیس", icon: FileText, count: 145, color: "from-sky-500 to-blue-500" },
  { name: "امنیت", icon: Shield, count: 89, color: "from-red-500 to-orange-500" },
  { name: "اینترنت", icon: Globe, count: 312, color: "from-cyan-500 to-teal-500" },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            دسته‌بندی نرم‌افزارها
          </h2>
          <p className="text-muted-foreground">
            نرم‌افزار مورد نظر خود را از دسته‌بندی‌های مختلف پیدا کنید
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <button
              key={cat.name}
              className="group p-4 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.count} نرم‌افزار</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
