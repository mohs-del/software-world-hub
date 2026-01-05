import { useState, useEffect } from "react";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DownloadLink {
  id: string;
  title: string;
  url: string;
  file_size: string | null;
  is_direct: boolean | null;
}

interface DownloadLinksManagerProps {
  softwareId: string;
}

const DownloadLinksManager = ({ softwareId }: DownloadLinksManagerProps) => {
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newLink, setNewLink] = useState({
    title: "دانلود مستقیم",
    url: "",
    file_size: "",
    is_direct: true,
  });

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from("download_links")
      .select("*")
      .eq("software_id", softwareId)
      .order("created_at");

    if (error) {
      toast.error("خطا در دریافت لینک‌ها");
    } else {
      setLinks(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (softwareId) {
      fetchLinks();
    }
  }, [softwareId]);

  const handleAdd = async () => {
    if (!newLink.url) {
      toast.error("لطفا آدرس لینک را وارد کنید");
      return;
    }

    const { error } = await supabase.from("download_links").insert([
      {
        software_id: softwareId,
        title: newLink.title,
        url: newLink.url,
        file_size: newLink.file_size || null,
        is_direct: newLink.is_direct,
      },
    ]);

    if (error) {
      toast.error("خطا در افزودن لینک");
    } else {
      toast.success("لینک اضافه شد");
      setNewLink({ title: "دانلود مستقیم", url: "", file_size: "", is_direct: true });
      fetchLinks();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("download_links").delete().eq("id", id);

    if (error) {
      toast.error("خطا در حذف لینک");
    } else {
      toast.success("لینک حذف شد");
      fetchLinks();
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-secondary rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <LinkIcon className="w-4 h-4" />
        لینک‌های دانلود
      </h3>

      {/* Existing Links */}
      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{link.title}</p>
                <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                {link.file_size && (
                  <span className="text-xs text-muted-foreground">{link.file_size}</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(link.id)}
                className="text-destructive hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Link */}
      <div className="p-4 border border-dashed border-border rounded-lg space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="عنوان لینک"
            className="h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
          />
          <input
            type="text"
            value={newLink.file_size}
            onChange={(e) => setNewLink((prev) => ({ ...prev, file_size: e.target.value }))}
            placeholder="حجم فایل (مثلا 50 MB)"
            className="h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
          />
        </div>
        <input
          type="url"
          value={newLink.url}
          onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
          placeholder="آدرس لینک دانلود"
          className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={newLink.is_direct}
              onChange={(e) => setNewLink((prev) => ({ ...prev, is_direct: e.target.checked }))}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm text-foreground">دانلود مستقیم</span>
          </label>
          <Button variant="outline" size="sm" onClick={handleAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            افزودن لینک
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadLinksManager;
