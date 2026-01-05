import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Screenshot {
  id: string;
  url: string;
  sort_order: number | null;
}

interface ScreenshotsManagerProps {
  softwareId: string;
}

const ScreenshotsManager = ({ softwareId }: ScreenshotsManagerProps) => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");

  const fetchScreenshots = async () => {
    const { data, error } = await supabase
      .from("software_screenshots")
      .select("*")
      .eq("software_id", softwareId)
      .order("sort_order");

    if (error) {
      toast.error("خطا در دریافت تصاویر");
    } else {
      setScreenshots(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (softwareId) {
      fetchScreenshots();
    }
  }, [softwareId]);

  const handleAdd = async () => {
    if (!newUrl) {
      toast.error("لطفا آدرس تصویر را وارد کنید");
      return;
    }

    const sortOrder = screenshots.length;

    const { error } = await supabase.from("software_screenshots").insert([
      {
        software_id: softwareId,
        url: newUrl,
        sort_order: sortOrder,
      },
    ]);

    if (error) {
      toast.error("خطا در افزودن تصویر");
    } else {
      toast.success("تصویر اضافه شد");
      setNewUrl("");
      fetchScreenshots();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("software_screenshots").delete().eq("id", id);

    if (error) {
      toast.error("خطا در حذف تصویر");
    } else {
      toast.success("تصویر حذف شد");
      fetchScreenshots();
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-secondary rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        اسکرین‌شات‌ها
      </h3>

      {/* Existing Screenshots */}
      {screenshots.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="relative group rounded-lg overflow-hidden">
              <img
                src={screenshot.url}
                alt="Screenshot"
                className="w-full h-24 object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(screenshot.id)}
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Screenshot */}
      <div className="flex gap-2">
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="آدرس تصویر (URL)"
          className="flex-1 h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
        />
        <Button variant="outline" size="sm" onClick={handleAdd} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default ScreenshotsManager;
