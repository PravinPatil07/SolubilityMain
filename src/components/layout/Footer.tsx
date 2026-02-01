import { FlaskConical, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="glass-card border-t border-border/30">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-5 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl icon-container transition-transform group-hover:scale-105">
                  <FlaskConical className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">SoluPredict</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                AI-powered drug solubility prediction platform for researchers, pharmaceutical scientists, 
                and students. Accelerate your drug development with accurate solubility insights.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { to: "/predict", label: "Predict Solubility" },
                  { to: "/convert", label: "Name to SMILES" },
                  { to: "/drug-info", label: "Drug Information" },
                  { to: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-5">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://pravinpatil007-solubility.hf.space/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    API Documentation
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://pubchem.ncbi.nlm.nih.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    PubChem Database
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SoluPredict. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50">
                Powered by AI Solubility Prediction API
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}