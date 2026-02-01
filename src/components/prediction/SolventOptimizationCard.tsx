import { SolventOptimization } from "@/types/prediction";
import { Beaker, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SolventOptimizationCardProps {
  solvents: SolventOptimization[];
}

function getImprovementColor(improvement: number) {
  if (improvement > 20) return "text-success";
  if (improvement > 0) return "text-info";
  if (improvement < 0) return "text-destructive";
  return "text-muted-foreground";
}

function getImprovementIcon(improvement: number) {
  if (improvement > 0) return TrendingUp;
  if (improvement < 0) return TrendingDown;
  return Minus;
}

function getCategoryBadge(category: string | undefined) {
  const lowerCategory = (category || '').toLowerCase();
  if (lowerCategory.includes("freely") || lowerCategory.includes("very")) return "badge-success";
  if (lowerCategory.includes("slightly") || lowerCategory.includes("sparingly")) return "badge-warning";
  if (lowerCategory.includes("insoluble")) return "badge-danger";
  return "badge-info";
}

export function SolventOptimizationCard({ solvents }: SolventOptimizationCardProps) {
  if (!solvents || !Array.isArray(solvents) || solvents.length === 0) return null;

  return (
    <div className="card-scientific p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Beaker className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Solvent Optimization</h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {solvents.map((solvent) => {
          const ImprovementIcon = getImprovementIcon(solvent.improvement_percentage);
          const improvementColor = getImprovementColor(solvent.improvement_percentage);
          const categoryBadge = getCategoryBadge(solvent.category);

          return (
            <div 
              key={solvent.solvent} 
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground capitalize">{solvent.solvent}</h4>
                <span className={categoryBadge}>{solvent.category}</span>
              </div>
              
              <div className="text-2xl font-bold text-gradient mb-2">
                {solvent.predicted_solubility.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground ml-1">mg/mL</span>
              </div>
              
              <div className={`flex items-center gap-1 text-sm ${improvementColor}`}>
                <ImprovementIcon className="h-4 w-4" />
                <span>
                  {solvent.improvement_percentage > 0 ? "+" : ""}
                  {solvent.improvement_percentage.toFixed(1)}% vs water
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
