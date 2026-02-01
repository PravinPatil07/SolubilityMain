import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PredictionForm } from "@/components/prediction/PredictionForm";
import { PredictionResults } from "@/components/prediction/PredictionResults";
import { FlaskConical, Info, ArrowRight } from "lucide-react";
import { PredictionResponse } from "@/types/prediction";
import { Link } from "react-router-dom";
import heroLabImage from "@/assets/hero-lab.jpg";

export default function Predict() {
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Layout>
      <div className="container py-10 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-medium mb-6">
            <FlaskConical className="h-4 w-4" />
            AI Solubility Prediction
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            Predict Drug Solubility
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your molecule's details to get instant solubility predictions with molecular properties, 
            solvent optimization, and formulation recommendations.
          </p>

          {/* Header Image */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-40">
              <img 
                src={heroLabImage} 
                alt="Pharmaceutical laboratory" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <PredictionForm 
                onResults={setResults} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setError={setError}
              />

              {/* Info Card */}
              <div className="p-5 rounded-2xl glass-card border-info/20">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                    <Info className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Need a SMILES string?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Convert any drug name to SMILES notation using our converter.
                    </p>
                    <Link 
                      to="/convert" 
                      className="inline-flex items-center text-sm font-medium text-info hover:text-info/80 transition-colors"
                    >
                      Go to Converter
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            <PredictionResults 
              results={results} 
              isLoading={isLoading} 
              error={error}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}