import { Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SoftwareCardProps {
  name: string;
  description: string;
  icon: string;
  category: string;
  version: string;
  size: string;
  downloads: string;
  rating: number;
}

const SoftwareCard = ({
  name,
  description,
  icon,
  category,
  version,
  size,
  downloads,
  rating,
}: SoftwareCardProps) => {
  return (
    <div className="group bg-gradient-card rounded-2xl border border-border/50 p-5 transition-all duration-300 hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium">
          {category}
        </span>
        <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
          v{version}
        </span>
        <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
          {size}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>{rating}</span>
          </div>
          <span>•</span>
          <span>{downloads} دانلود</span>
        </div>
        <Button variant="download" size="sm">
          <Download className="w-4 h-4" />
          دانلود
        </Button>
      </div>
    </div>
  );
};

export default SoftwareCard;
