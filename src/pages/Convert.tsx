import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Search, Atom, ExternalLink, Sparkles, Copy, Check } from "lucide-react";
import { MoleculeViewer } from "@/components/convert/MoleculeViewer";
import moleculeAbstractImage from "@/assets/molecule-abstract.jpg";

interface ConversionResult {
  name: string;
  smiles: string;
  cid?: number;
  formula?: string;
  molecularWeight?: number;
}

export default function Convert() {
  const navigate = useNavigate();
  const [drugName, setDrugName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller with timeout
    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
    }, 15000); // 15 second timeout

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://pravinpatil007-smileconverter.hf.space/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drug_name: drugName.trim() }),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to convert drug name. Please try again.");
      }

      const data = await response.json();

      if (!data.smiles) {
        throw new Error("Could not retrieve SMILES notation for this compound");
      }

      setResult({
        name: drugName.trim(),
        smiles: data.smiles,
        formula: data.molecular_formula,
        molecularWeight: data.molecular_weight,
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError("Request timed out. The API server may be waking up - please try again.");
      } else {
        setError(
          err instanceof Error 
            ? err.message 
            : "Failed to convert. Please check the drug name and try again."
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handlePredictSolubility = () => {
    if (result) {
      navigate(`/predict?name=${encodeURIComponent(result.name)}&smiles=${encodeURIComponent(result.smiles)}`);
    }
  };

  const handleCopySmiles = async () => {
    if (result?.smiles) {
      await navigator.clipboard.writeText(result.smiles);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <div className="container py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-medium mb-6">
              <Search className="h-4 w-4" />
              Name to SMILES Converter
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
              Convert Drug Name to SMILES
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter a drug name or IUPAC name to get the SMILES notation using the PubChem database.
            </p>

            {/* Header Image */}
            <div className="mt-8">
              <div className="relative rounded-2xl overflow-hidden max-w-md mx-auto shadow-lg">
                <img 
                  src={moleculeAbstractImage} 
                  alt="Abstract molecular structure" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </div>

          {/* Conversion Form */}
          <div className="card-scientific p-8 mb-6">
            <form onSubmit={handleConvert} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="drugName" className="text-base font-medium">Drug Name or IUPAC Name</Label>
                <div className="flex gap-3">
                  <Input
                    id="drugName"
                    placeholder="e.g., Aspirin, Ibuprofen, Acetaminophen..."
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                    className="flex-1 h-12 rounded-xl text-base"
                  />
                  <Button 
                    type="submit" 
                    className="gradient-primary border-0 h-12 px-6 rounded-xl shadow-glow hover:shadow-glow-lg transition-shadow" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        <span className="hidden sm:inline">Converting...</span>
                      </>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {isLoading && (
                  <p className="text-sm text-muted-foreground text-center animate-pulse">
                    ⏳ First request may take ~10-15s while the API wakes up...
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="card-scientific p-6 mb-6 bg-destructive/5 border-destructive/20 animate-fade-in">
              <p className="text-destructive text-center font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="card-scientific p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl icon-container flex items-center justify-center">
                  <Atom className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Conversion Result</h2>
                  <p className="text-sm text-muted-foreground">Successfully retrieved from PubChem</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
                  <span className="text-sm font-medium text-muted-foreground block mb-2">Drug Name</span>
                  <span className="text-xl font-semibold text-foreground capitalize">{result.name}</span>
                </div>

                <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">SMILES Notation</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopySmiles}
                      className="h-8 px-3 text-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1.5 text-success" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <code className="text-sm font-mono text-foreground break-all leading-relaxed block">{result.smiles}</code>
                </div>

                {result.formula && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
                      <span className="text-sm font-medium text-muted-foreground block mb-2">Molecular Formula</span>
                      <span className="font-mono font-semibold text-foreground text-lg">{result.formula}</span>
                    </div>
                    {result.molecularWeight != null && (
                      <div className="p-5 rounded-2xl bg-muted/30 border border-border/50">
                        <span className="text-sm font-medium text-muted-foreground block mb-2">Molecular Weight</span>
                        <span className="font-semibold text-foreground text-lg">{Number(result.molecularWeight).toFixed(2)} g/mol</span>
                      </div>
                    )}
                  </div>
                )}

                {result.cid && (
                  <a 
                    href={`https://pubchem.ncbi.nlm.nih.gov/compound/${result.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline p-3 rounded-xl bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on PubChem (CID: {result.cid})
                  </a>
                )}

                {/* 3D Molecule Visualization */}
                <div className="pt-4 border-t border-border/50">
                  <MoleculeViewer smiles={result.smiles} drugName={result.name} />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button 
                    onClick={handlePredictSolubility} 
                    className="w-full gradient-primary border-0 h-14 text-lg rounded-2xl shadow-glow hover:shadow-glow-lg transition-all"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Predict Solubility
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}