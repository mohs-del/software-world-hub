import SoftwareCard from "./SoftwareCard";

const featuredSoftware = [
  {
    name: "فتوشاپ 2024",
    description: "قدرتمندترین نرم‌افزار ویرایش تصویر در جهان",
    icon: "🎨",
    category: "گرافیک",
    version: "25.0",
    size: "2.1 GB",
    downloads: "45K",
    rating: 4.9,
  },
  {
    name: "ویندوز 11",
    description: "جدیدترین سیستم عامل مایکروسافت با رابط کاربری زیبا",
    icon: "🪟",
    category: "سیستم عامل",
    version: "23H2",
    size: "5.4 GB",
    downloads: "128K",
    rating: 4.7,
  },
  {
    name: "تلگرام دسکتاپ",
    description: "پیام‌رسان امن و سریع برای ویندوز و مک",
    icon: "✈️",
    category: "پیام‌رسان",
    version: "4.12",
    size: "45 MB",
    downloads: "89K",
    rating: 4.8,
  },
  {
    name: "آفیس 2024",
    description: "مجموعه کامل نرم‌افزارهای آفیس مایکروسافت",
    icon: "📊",
    category: "آفیس",
    version: "2024",
    size: "4.2 GB",
    downloads: "67K",
    rating: 4.6,
  },
  {
    name: "وی‌اس کد",
    description: "محبوب‌ترین ویرایشگر کد برای برنامه‌نویسان",
    icon: "💻",
    category: "برنامه‌نویسی",
    version: "1.85",
    size: "120 MB",
    downloads: "156K",
    rating: 4.9,
  },
  {
    name: "اسپاتیفای",
    description: "دسترسی به میلیون‌ها آهنگ و پادکست",
    icon: "🎵",
    category: "موزیک",
    version: "1.2.25",
    size: "150 MB",
    downloads: "78K",
    rating: 4.5,
  },
  {
    name: "دیسکورد",
    description: "بهترین پلتفرم چت و صوت برای گیمرها",
    icon: "🎮",
    category: "پیام‌رسان",
    version: "0.0.320",
    size: "95 MB",
    downloads: "92K",
    rating: 4.7,
  },
  {
    name: "وی‌پی‌ان اکسپرس",
    description: "سریع‌ترین و امن‌ترین VPN برای تمام دستگاه‌ها",
    icon: "🔒",
    category: "امنیت",
    version: "12.45",
    size: "65 MB",
    downloads: "234K",
    rating: 4.8,
  },
];

const FeaturedSoftware = () => {
  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              نرم‌افزارهای محبوب
            </h2>
            <p className="text-muted-foreground">
              پرطرفدارترین نرم‌افزارهای این هفته
            </p>
          </div>
          <button className="text-primary hover:text-primary/80 transition-colors font-medium">
            مشاهده همه ←
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSoftware.map((software, index) => (
            <div key={software.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <SoftwareCard {...software} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSoftware;
