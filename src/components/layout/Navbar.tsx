import { Link, useLocation } from "react-router-dom";
import { FlaskConical, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Predict", path: "/predict" },
  { label: "Convert", path: "/convert" },
  { label: "Drug Info", path: "/drug-info" },
  { label: "About", path: "/about" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-card border-b border-border/30">
        <nav className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl icon-container transition-transform group-hover:scale-105">
              <FlaskConical className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">SoluPredict</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-muted/50">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-background text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild className="gradient-primary border-0 rounded-full shadow-glow hover:shadow-glow-lg transition-shadow">
              <Link to="/predict">
                <Sparkles className="mr-2 h-4 w-4" />
                Start Predicting
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-border/30 animate-fade-in">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button asChild className="w-full gradient-primary border-0 rounded-xl shadow-glow">
                <Link to="/predict" onClick={() => setMobileMenuOpen(false)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start Predicting
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}