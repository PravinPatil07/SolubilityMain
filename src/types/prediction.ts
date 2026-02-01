export interface PredictionRequest {
  drug_name: string;
  smiles: string;
  ph: number;
  temperature: number;
  solvent: string;
}

export interface MolecularProperties {
  molecular_weight: number;
  logp: number;
  tpsa: number;
  hbd: number;
  hba: number;
  formula: string;
  inchikey: string;
}

// Change from specific interface to more flexible type
export type SolventOptimization = Record<string, {
  solubility_mg_ml: number;
  category: string;
  improvement_percentage: number;
}>;

export interface FormulationSuggestion {
  strategy: string;
  description: string;
  success_rate: number;
}

export interface PredictionResponse {
  drug_name: string;
  smiles: string;
  solubility_mg_ml: number;
  solubility_category: string;
  usp_description: string;
  molecular_properties: MolecularProperties;
  solvent_optimization: SolventOptimization[];
  formulation_suggestions: FormulationSuggestion[];
  molecule_image_base64?: string;
}

export const SOLVENTS = [
  { value: "water", label: "Water" },
  { value: "ethanol", label: "Ethanol" },
  { value: "methanol", label: "Methanol" },
  { value: "acetone", label: "Acetone" },
  { value: "dmso", label: "DMSO" },
  { value: "peg400", label: "PEG 400" },
  { value: "acetate_buffer", label: "Acetate Buffer" },
  { value: "phosphate_buffer", label: "Phosphate Buffer" },
] as const;

export type SolventType = typeof SOLVENTS[number]["value"];
