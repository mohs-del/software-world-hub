import { useState, useEffect } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Feature {
  id: string;
  feature: string;
  sort_order: number | null;
}

interface FeaturesManagerProps {
  softwareId: string;
}

const FeaturesManager = ({ softwareId }: FeaturesManagerProps) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newFeature, setNewFeature] = useState("");

  const fetchFeatures = async () => {
    const { data, error } = await supabase
      .from("software_features")
      .select("*")
      .eq("software_id", softwareId)
      .order("sort_order");

    if (error) {
      toast.error("خطا در دریافت ویژگی‌ها");
    } else {
      setFeatures(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (softwareId) {
      fetchFeatures();
    }
  }, [softwareId]);

  const handleAdd = async () => {
    if (!newFeature.trim()) {
      toast.error("لطفا ویژگی را وارد کنید");
      return;
    }

    const sortOrder = features.length;

    const { error } = await supabase.from("software_features").insert([
      {
        software_id: softwareId,
        feature: newFeature.trim(),
        sort_order: sortOrder,
      },
    ]);

    if (error) {
      toast.error("خطا در افزودن ویژگی");
    } else {
      toast.success("ویژگی اضافه شد");
      setNewFeature("");
      fetchFeatures();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("software_features").delete().eq("id", id);

    if (error) {
      toast.error("خطا در حذف ویژگی");
    } else {
      toast.success("ویژگی حذف شد");
      fetchFeatures();
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-secondary rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        ویژگی‌های کلیدی
      </h3>

      {/* Existing Features */}
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
            >
              <span className="flex-1 text-foreground">{feature.feature}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(feature.id)}
                className="text-destructive hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Feature */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="ویژگی جدید"
          className="flex-1 h-10 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button variant="outline" size="sm" onClick={handleAdd} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          افزودن
        </Button>
      </div>
    </div>
  );
};

export default FeaturesManager;
