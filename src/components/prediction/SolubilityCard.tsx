import { Droplets, CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

interface SolubilityCardProps {
  drugName: string;
  solubility: number;
  category: string;
  uspDescription: string;
}

function getSolubilityStyle(category: string | undefined) {
  const lowerCategory = (category || '').toLowerCase();
  
  if (lowerCategory.includes("freely") || lowerCategory.includes("very soluble")) {
    return {
      gradient: "from-emerald-500 to-green-400",
      badge: "badge-success",
      icon: CheckCircle,
      bgOpacity: "bg-success/5",
      barWidth: "100%",
    };
  }
  
  if (lowerCategory.includes("soluble") && !lowerCategory.includes("slightly") && !lowerCategory.includes("sparingly")) {
    return {
      gradient: "from-teal-500 to-cyan-400",
      badge: "badge-success",
      icon: CheckCircle,
      bgOpacity: "bg-success/5",
      barWidth: "75%",
    };
  }
  
  if (lowerCategory.includes("slightly") || lowerCategory.includes("sparingly")) {
    return {
      gradient: "from-amber-500 to-yellow-400",
      badge: "badge-warning",
      icon: AlertTriangle,
      bgOpacity: "bg-warning/5",
      barWidth: "40%",
    };
  }
  
  if (lowerCategory.includes("insoluble") || lowerCategory.includes("poor")) {
    return {
      gradient: "from-red-500 to-rose-400",
      badge: "badge-danger",
      icon: XCircle,
      bgOpacity: "bg-destructive/5",
      barWidth: "15%",
    };
  }
  
  return {
    gradient: "from-primary to-accent",
    badge: "badge-info",
    icon: Droplets,
    bgOpacity: "bg-primary/5",
    barWidth: "50%",
  };
}

export function SolubilityCard({ drugName, solubility, category, uspDescription }: SolubilityCardProps) {
  const style = getSolubilityStyle(category);
  const Icon = style.icon;
  const displaySolubility = solubility ?? 0;
  const displayCategory = category || "Unknown";
  const displayUspDescription = uspDescription || "No USP classification available";

  return (
    <div className={`card-scientific overflow-hidden ${style.bgOpacity}`}>
      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${style.gradient}`} />
      
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{drugName || "Unknown Drug"}</h2>
            <span className={`${style.badge} text-base`}>
              <Icon className="h-4 w-4 mr-2" />
              {displayCategory}
            </span>
          </div>
          
          <div className="text-right">
            <div className="flex items-baseline gap-2 justify-end">
              <span className="text-5xl md:text-6xl font-bold text-gradient">
                {displaySolubility.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground font-medium">mg/mL</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 justify-end">
              <TrendingUp className="h-4 w-4" />
              Predicted solubility
            </div>
          </div>
        </div>

        {/* Solubility bar visualization */}
        <div className="mb-6">
          <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${style.gradient} transition-all duration-1000`}
              style={{ width: style.barWidth }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Insoluble</span>
            <span>Very Soluble</span>
          </div>
        </div>
        
        {/* USP Classification */}
        <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">USP Classification</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{displayUspDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}