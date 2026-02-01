import { PredictionResponse } from "@/types/prediction";
import { SolubilityCard } from "./SolubilityCard";
import { MolecularPropertiesCard } from "./MolecularPropertiesCard";
import { SolventOptimizationCard } from "./SolventOptimizationCard";
import { FormulationSuggestionsCard } from "./FormulationSuggestionsCard";
import { MoleculeStructure } from "./MoleculeStructure";
import { FlaskConical, AlertCircle, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PredictionResultsProps {
  results: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function PredictionResults({ results, isLoading, error }: PredictionResultsProps) {
  if (error) {
    return (
      <div className="card-scientific p-10 text-center">
        <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">Prediction Error</h3>
        <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-56 rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="card-scientific p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <FlaskConical className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Predict</h3>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Enter your molecule's details in the form and click "Predict Solubility" to get
            comprehensive analysis including molecular properties, solvent optimization, and formulation suggestions.
          </p>

          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-powered predictions in seconds</span>
          </div>
        </div>
      </div>
    );
  }

  // 🔑 Normalize solvent name from backend (e.g. "DMSO" → "dmso", "PEG 400" → "peg_400")
  const normalizeSolventKey = (solvent: string) =>
    solvent.toLowerCase().replace(/\s+/g, "_");

  // Backend SHOULD return selected_solvent (recommended)
  const solventKey = results.selected_solvent
    ? normalizeSolventKey(results.selected_solvent)
    : "water";

  // ✅ Dynamically pick solubility based on selected solvent
  const mainSolubility =
    results.solvent_optimization?.[solventKey]?.solubility_mg_ml ??
    results.solubility_mg_ml;

  const mainCategory =
    results.solvent_optimization?.[solventKey]?.category ??
    results.solubility_category;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Solubility Result */}
      <SolubilityCard
        drugName={results.drug_name}
        solubility={mainSolubility}
        category={mainCategory}
        uspDescription={results.usp_description}
      />

      {/* Molecular Properties and Structure */}
      <div className="grid md:grid-cols-2 gap-6">
        <MolecularPropertiesCard properties={results.molecular_properties} />
        <MoleculeStructure
          imageBase64={results.molecule_image_base64}
          smiles={results.smiles}
        />
      </div>

      {/* Solvent Optimization */}
      <SolventOptimizationCard solvents={results.solvent_optimization} />

      {/* Formulation Suggestions */}
      <FormulationSuggestionsCard suggestions={results.formulation_suggestions} />
    </div>
  );
}
