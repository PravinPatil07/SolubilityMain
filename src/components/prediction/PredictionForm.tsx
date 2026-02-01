import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FlaskConical, Sparkles } from "lucide-react";
import { PredictionRequest, PredictionResponse, SOLVENTS } from "@/types/prediction";

interface PredictionFormProps {
  onResults: (results: PredictionResponse) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export function PredictionForm({ onResults, isLoading, setIsLoading, setError }: PredictionFormProps) {
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState<PredictionRequest>({
    drug_name: searchParams.get("name") || "",
    smiles: searchParams.get("smiles") || "",
    ph: 7.0,
    temperature: 25.0,
    solvent: "water",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call both APIs in parallel
      const [solubilityResponse, drugDataResponse] = await Promise.all([
        // Solubility prediction API
        fetch("https://pravinpatil007-solubility-final.hf.space/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }),
        // Molecular properties API
        fetch("https://pravinpatil007-drugdata.hf.space/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            drug_name: formData.drug_name,
            smiles: formData.smiles 
          }),
        }),
      ]);

      if (!solubilityResponse.ok) {
        const errorData = await solubilityResponse.json().catch(() => ({}));
        throw new Error(errorData.detail || `Solubility API error: ${solubilityResponse.status}`);
      }

      const solubilityData = await solubilityResponse.json();
      const drugData = drugDataResponse.ok ? await drugDataResponse.json() : null;

      console.log("Solubility API response:", solubilityData);
      console.log("Drug Data API response:", drugData);

      // Extract from your API's exact response structure
      const solubilityPrediction = solubilityData?.solubility_prediction;
      const solventOptimization = solubilityData?.solvent_optimization;
      const moleculeVisualization = solubilityData?.molecule_visualization;

      // Get solubility value from solubility_prediction.value_mg_per_ml
      const rawSolubility = solubilityPrediction?.value_mg_per_ml;

      const solubilityNumber =
        typeof rawSolubility === "number"
          ? rawSolubility
          : typeof rawSolubility === "string"
            ? Number(rawSolubility)
            : NaN;
      
      // Extract molecule image (already includes data URL prefix)
      let moleculeImage = moleculeVisualization?.structure_image || "";
      // Remove data URL prefix for storage (we'll add it back when displaying)
      if (moleculeImage.startsWith("data:image/png;base64,")) {
        moleculeImage = moleculeImage.replace("data:image/png;base64,", "");
      }

      if (!Number.isFinite(solubilityNumber)) {
        throw new Error(
          "Solubility API did not return a valid solubility value. Please verify your SMILES string."
        );
      }

      // ✅ Convert solvent_optimization.recommendations → OBJECT (not array)
      // ✅ FIX: Convert solvent recommendations ARRAY → OBJECT (required by UI)
      const solventOptimizationMap: Record<string, any> = {};

      if (Array.isArray(solventOptimization?.recommendations)) {
        solventOptimization.recommendations.forEach((rec: any) => {
          const key = rec.solvent
            .toLowerCase()
            .replace(/\s+/g, "_"); // ethanol, dmso, methanol, etc.

          solventOptimizationMap[key] = {
            solubility_mg_ml: rec.predicted_solubility_mg_ml,
            category: rec.solubility_category,
            improvement_percentage: rec.improvement_percent,
          };
        });
      }

      // Combine and transform the responses to match PredictionResponse type
      const combinedData: PredictionResponse = {
        drug_name: formData.drug_name,
        smiles: formData.smiles,
        solubility_mg_ml: solubilityNumber,
        solubility_category: solubilityPrediction?.category ?? "Unknown",
        usp_description:
          solubilityPrediction?.description ??
          "No USP classification available",

        molecular_properties: {
          molecular_weight:
            drugData?.molecular_weight ??
            drugData?.molecular_properties?.molecular_weight ??
            0,
          logp:
            drugData?.logp ??
            drugData?.molecular_properties?.logp ??
            0,
          tpsa:
            drugData?.tpsa ??
            drugData?.molecular_properties?.tpsa ??
            0,
          hbd:
            drugData?.hbd ??
            drugData?.molecular_properties?.hbd ??
            0,
          hba:
            drugData?.hba ??
            drugData?.molecular_properties?.hba ??
            0,
          formula:
            drugData?.molecular_formula ??
            drugData?.molecular_properties?.formula ??
            "",
          inchikey:
            drugData?.inchikey ??
            drugData?.molecular_properties?.inchikey ??
            "",
        },

        // ✅ FIXED - using the object format
        solvent_optimization: solventOptimizationMap,

        // ✅ VERY IMPORTANT: preserve selected solvent
        selected_solvent: formData.solvent,

        formulation_suggestions: [],
        molecule_image_base64: moleculeImage,
      };

      onResults(combinedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get prediction. Please check your SMILES string and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PredictionRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card-scientific p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl icon-container flex items-center justify-center">
          <FlaskConical className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Prediction Input</h2>
          <p className="text-sm text-muted-foreground">Enter molecule details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="drug_name" className="text-sm font-medium">Drug Name</Label>
          <Input
            id="drug_name"
            placeholder="e.g., Aspirin"
            value={formData.drug_name}
            onChange={(e) => handleInputChange("drug_name", e.target.value)}
            className="h-11 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smiles" className="text-sm font-medium">SMILES Structure</Label>
          <Input
            id="smiles"
            placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
            value={formData.smiles}
            onChange={(e) => handleInputChange("smiles", e.target.value)}
            className="font-mono text-sm h-11 rounded-xl"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ph" className="text-sm font-medium">pH</Label>
            <Input
              id="ph"
              type="number"
              step="0.1"
              min="0"
              max="14"
              value={formData.ph}
              onChange={(e) => handleInputChange("ph", parseFloat(e.target.value))}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-sm font-medium">Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              step="1"
              min="0"
              max="100"
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", parseFloat(e.target.value))}
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="solvent" className="text-sm font-medium">Solvent</Label>
          <Select
            value={formData.solvent}
            onValueChange={(value) => handleInputChange("solvent", value)}
          >
            <SelectTrigger id="solvent" className="h-11 rounded-xl">
              <SelectValue placeholder="Select solvent" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {SOLVENTS.map((solvent) => (
                <SelectItem key={solvent.value} value={solvent.value} className="rounded-lg">
                  {solvent.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-primary border-0 h-12 rounded-xl shadow-glow hover:shadow-glow-lg transition-all text-base font-medium" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Predict Solubility
            </>
          )}
        </Button>
      </form>
    </div>
  );
}