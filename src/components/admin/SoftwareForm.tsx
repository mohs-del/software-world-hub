import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Platform {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface SoftwareFormProps {
  software?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const SoftwareForm = ({ software, onSuccess, onCancel }: SoftwareFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState({
    name: software?.name || "",
    description: software?.description || "",
    full_description: software?.full_description || "",
    icon: software?.icon || "",
    platform_id: software?.platform_id || "",
    category_id: software?.category_id || "",
    version: software?.version || "",
    size: software?.size || "",
    size_in_mb: software?.size_in_mb || 0,
    developer: software?.developer || "",
    release_date: software?.release_date || "",
    downloads: software?.downloads || 0,
    rating: software?.rating || 0,
    is_popular: software?.is_popular || false,
    is_quick_download: software?.is_quick_download || false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [platformsRes, categoriesRes] = await Promise.all([
        supabase.from("platforms").select("id, name").order("name"),
        supabase.from("categories").select("id, name").order("name"),
      ]);
      
      setPlatforms(platformsRes.data || []);
      setCategories(categoriesRes.data || []);
    };
    
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        platform_id: formData.platform_id || null,
        category_id: formData.category_id || null,
        size_in_mb: parseFloat(String(formData.size_in_mb)) || 0,
        downloads: parseInt(String(formData.downloads)) || 0,
        rating: parseFloat(String(formData.rating)) || 0,
      };

      if (software?.id) {
        const { error } = await supabase
          .from("software")
          .update(dataToSave)
          .eq("id", software.id);

        if (error) throw error;
        toast.success("نرم‌افزار بروزرسانی شد");
      } else {
        const { error } = await supabase.from("software").insert([dataToSave]);

        if (error) throw error;
        toast.success("نرم‌افزار اضافه شد");
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "خطا در ذخیره نرم‌افزار");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">نام نرم‌افزار *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">آیکون (ایموجی)</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="🎨"
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">پلتفرم</label>
          <select
            name="platform_id"
            value={formData.platform_id}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          >
            <option value="">انتخاب کنید</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">دسته‌بندی</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          >
            <option value="">انتخاب کنید</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">نسخه</label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="1.0.0"
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">حجم</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="50 MB"
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">حجم به مگابایت</label>
          <input
            type="number"
            name="size_in_mb"
            value={formData.size_in_mb}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">توسعه‌دهنده</label>
          <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">تاریخ انتشار</label>
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">تعداد دانلود</label>
          <input
            type="number"
            name="downloads"
            value={formData.downloads}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">امتیاز (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">توضیح کوتاه</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">توضیحات کامل</label>
        <textarea
          name="full_description"
          value={formData.full_description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground resize-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="is_popular"
            checked={formData.is_popular}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-foreground">محبوب</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="is_quick_download"
            checked={formData.is_quick_download}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-foreground">دانلود سریع</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          انصراف
        </Button>
        <Button type="submit" variant="gradient" disabled={isSubmitting}>
          {isSubmitting ? "در حال ذخیره..." : software?.id ? "بروزرسانی" : "افزودن"}
        </Button>
      </div>
    </form>
  );
};

export default SoftwareForm;
