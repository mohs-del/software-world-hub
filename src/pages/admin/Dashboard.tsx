import { useEffect, useState } from "react";
import { Package, Folder, Monitor, Download, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  softwareCount: number;
  categoryCount: number;
  platformCount: number;
  totalDownloads: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    softwareCount: 0,
    categoryCount: 0,
    platformCount: 0,
    totalDownloads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [softwareRes, categoryRes, platformRes, downloadsRes] = await Promise.all([
        supabase.from("software").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("platforms").select("id", { count: "exact", head: true }),
        supabase.from("software").select("downloads"),
      ]);

      const totalDownloads = downloadsRes.data?.reduce((sum, item) => sum + (item.downloads || 0), 0) || 0;

      setStats({
        softwareCount: softwareRes.count || 0,
        categoryCount: categoryRes.count || 0,
        platformCount: platformRes.count || 0,
        totalDownloads,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "نرم‌افزارها", value: stats.softwareCount, icon: Package, color: "from-blue-500 to-cyan-500" },
    { label: "دسته‌بندی‌ها", value: stats.categoryCount, icon: Folder, color: "from-green-500 to-emerald-500" },
    { label: "پلتفرم‌ها", value: stats.platformCount, icon: Monitor, color: "from-purple-500 to-pink-500" },
    { label: "کل دانلودها", value: stats.totalDownloads.toLocaleString("fa-IR"), icon: Download, color: "from-orange-500 to-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">داشبورد</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-secondary animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 border border-border/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-foreground mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/software"
            className="glass rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all group"
          >
            <Package className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              افزودن نرم‌افزار جدید
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              نرم‌افزار جدید به سایت اضافه کنید
            </p>
          </a>
          <a
            href="/admin/categories"
            className="glass rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all group"
          >
            <Folder className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              مدیریت دسته‌بندی‌ها
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              دسته‌بندی‌ها را ویرایش کنید
            </p>
          </a>
          <a
            href="/admin/platforms"
            className="glass rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all group"
          >
            <Monitor className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              مدیریت پلتفرم‌ها
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              پلتفرم‌های جدید اضافه کنید
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
