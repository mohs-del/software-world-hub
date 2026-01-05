import { useState, useEffect } from "react";
import { Plus, Trash2, Monitor } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Requirement {
  id: string;
  requirement: string;
  sort_order: number | null;
}

interface RequirementsManagerProps {
  softwareId: string;
}

const RequirementsManager = ({ softwareId }: RequirementsManagerProps) => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRequirement, setNewRequirement] = useState("");

  const fetchRequirements = async () => {
    const { data, error } = await supabase
      .from("software_requirements")
      .select("*")
      .eq("software_id", softwareId)
      .order("sort_order");

    if (error) {
      toast.error("خطا در دریافت نیازمندی‌ها");
    } else {
      setRequirements(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (softwareId) {
      fetchRequirements();
    }
  }, [softwareId]);

  const handleAdd = async () => {
    if (!newRequirement.trim()) {
      toast.error("لطفا نیازمندی را وارد کنید");
      return;
    }

    const sortOrder = requirements.length;

    const { error } = await supabase.from("software_requirements").insert([
      {
        software_id: softwareId,
        requirement: newRequirement.trim(),
        sort_order: sortOrder,
      },
    ]);

    if (error) {
      toast.error("خطا در افزودن نیازمندی");
    } else {
      toast.success("نیازمندی اضافه شد");
      setNewRequirement("");
      fetchRequirements();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("software_requirements").delete().eq("id", id);

    if (error) {
      toast.error("خطا در حذف نیازمندی");
    } else {
      toast.success("نیازمندی حذف شد");
      fetchRequirements();
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-secondary rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <Monitor className="w-4 h-4" />
        نیازمندی‌های سیستم
      </h3>

      {/* Existing Requirements */}
      {requirements.length > 0 && (
        <div className="space-y-2">
          {requirements.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
            >
              <span className="flex-1 text-foreground">{req.requirement}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(req.id)}
                className="text-destructive hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Requirement */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="نیازمندی جدید (مثلا: Windows 10 یا بالاتر)"
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

export default RequirementsManager;
