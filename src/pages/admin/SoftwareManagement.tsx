import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SoftwareForm from "@/components/admin/SoftwareForm";

interface Software {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  version: string | null;
  size: string | null;
  downloads: number | null;
  is_popular: boolean | null;
  platform_id: string | null;
  category_id: string | null;
  platforms?: { name: string } | null;
  categories?: { name: string } | null;
}

const SoftwareManagement = () => {
  const [software, setSoftware] = useState<Software[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<Software | null>(null);

  const fetchSoftware = async () => {
    const { data, error } = await supabase
      .from("software")
      .select(`
        *,
        platforms(name),
        categories(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("خطا در دریافت نرم‌افزارها");
    } else {
      setSoftware(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این نرم‌افزار مطمئن هستید؟")) return;

    const { error } = await supabase.from("software").delete().eq("id", id);

    if (error) {
      toast.error("خطا در حذف نرم‌افزار");
    } else {
      toast.success("نرم‌افزار حذف شد");
      fetchSoftware();
    }
  };

  const handleEdit = (item: Software) => {
    setEditingSoftware(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSoftware(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    fetchSoftware();
  };

  const filteredSoftware = software.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">مدیریت نرم‌افزارها</h1>
        <Button variant="gradient" onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          افزودن نرم‌افزار
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجوی نرم‌افزار..."
          className="w-full h-12 pr-12 pl-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-secondary animate-pulse" />
          ))}
        </div>
      ) : filteredSoftware.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">نرم‌افزاری یافت نشد</p>
        </div>
      ) : (
        <div className="glass rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">نام</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">پلتفرم</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">دسته‌بندی</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">نسخه</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">دانلود</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredSoftware.map((item) => (
                <tr key={item.id} className="border-t border-border/50 hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon || "📦"}</span>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.platforms?.name || "-"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.categories?.name || "-"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.version || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.downloads?.toLocaleString("fa-IR") || "0"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {editingSoftware ? "ویرایش نرم‌افزار" : "افزودن نرم‌افزار جدید"}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleFormClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <SoftwareForm
                software={editingSoftware}
                onSuccess={handleFormSuccess}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareManagement;
