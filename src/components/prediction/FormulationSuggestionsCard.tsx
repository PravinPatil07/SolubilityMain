import { FormulationSuggestion } from "@/types/prediction";
import { Lightbulb, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FormulationSuggestionsCardProps {
  suggestions: FormulationSuggestion[];
}

export function FormulationSuggestionsCard({ suggestions }: FormulationSuggestionsCardProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="card-scientific p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Formulation Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg border border-border bg-card"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{suggestion.strategy}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            </div>
            
            <div className="ml-11">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-medium text-foreground">{suggestion.success_rate}%</span>
              </div>
              <Progress value={suggestion.success_rate} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
