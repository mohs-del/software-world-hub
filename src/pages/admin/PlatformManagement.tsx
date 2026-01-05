import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Platform {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

const PlatformManagement = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", icon: "" });

  const fetchPlatforms = async () => {
    const { data, error } = await supabase
      .from("platforms")
      .select("*")
      .order("name");

    if (error) {
      toast.error("خطا در دریافت پلتفرم‌ها");
    } else {
      setPlatforms(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPlatform) {
        const { error } = await supabase
          .from("platforms")
          .update(formData)
          .eq("id", editingPlatform.id);
        if (error) throw error;
        toast.success("پلتفرم بروزرسانی شد");
      } else {
        const { error } = await supabase.from("platforms").insert([formData]);
        if (error) throw error;
        toast.success("پلتفرم اضافه شد");
      }
      setShowForm(false);
      setEditingPlatform(null);
      setFormData({ name: "", slug: "", icon: "" });
      fetchPlatforms();
    } catch (error: any) {
      toast.error(error.message || "خطا");
    }
  };

  const handleEdit = (platform: Platform) => {
    setEditingPlatform(platform);
    setFormData({ name: platform.name, slug: platform.slug, icon: platform.icon || "" });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    const { error } = await supabase.from("platforms").delete().eq("id", id);
    if (error) {
      toast.error("خطا در حذف");
    } else {
      toast.success("حذف شد");
      fetchPlatforms();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">مدیریت پلتفرم‌ها</h1>
        <Button variant="gradient" onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          افزودن پلتفرم
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-secondary animate-pulse" />
          ))}
        </div>
      ) : platforms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">پلتفرمی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="glass rounded-xl p-4 border border-border/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{platform.icon || "💻"}</span>
                <div>
                  <h3 className="font-medium text-foreground">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(platform)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(platform.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md">
            <div className="border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {editingPlatform ? "ویرایش پلتفرم" : "افزودن پلتفرم"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingPlatform(null);
                  setFormData({ name: "", slug: "", icon: "" });
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">نام</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">شناسه (slug)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                  required
                  className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">آیکون (ایموجی)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))}
                  placeholder="💻"
                  className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  انصراف
                </Button>
                <Button type="submit" variant="gradient">
                  {editingPlatform ? "بروزرسانی" : "افزودن"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformManagement;
