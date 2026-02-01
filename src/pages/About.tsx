import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, 
  Brain, 
  Target, 
  Zap, 
  Database,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import scientistResearchImage from "@/assets/scientist-research.jpg";
import pillsCapsulesImage from "@/assets/pills-capsules.jpg";

const features = [
  "AI-powered predictions using machine learning",
  "Comprehensive molecular property analysis",
  "Solvent optimization recommendations",
  "Formulation strategy suggestions",
  "Fast, reliable results in seconds",
  "Based on extensive pharmaceutical data",
];

const howItWorks = [
  {
    icon: Database,
    title: "Training Data",
    description: "Our models are trained on extensive datasets of experimentally determined solubility values from pharmaceutical literature and proprietary databases.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Advanced neural networks analyze molecular descriptors including structural features, physicochemical properties, and electronic characteristics.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Prediction",
    description: "The model generates accurate solubility predictions along with uncertainty estimates, ensuring you can trust the results.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Zap,
    title: "Optimization",
    description: "Additional models suggest optimal solvents and formulation strategies based on the predicted molecular behavior.",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function About() {
  return (
    <Layout>
      <div className="container py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-medium mb-6">
              <FlaskConical className="h-4 w-4" />
              About SoluPredict
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Accelerating Drug Development
              <br />
              <span className="text-gradient">with AI-Powered Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              SoluPredict is an intelligent cheminformatics platform designed to help pharmaceutical scientists, 
              researchers, and students predict drug solubility quickly and accurately.
            </p>

            {/* Hero Image */}
            <div className="mt-10">
              <div className="relative rounded-3xl overflow-hidden max-w-3xl mx-auto shadow-2xl">
                <img 
                  src={scientistResearchImage} 
                  alt="Scientist conducting pharmaceutical research" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </div>

          {/* Why Solubility Matters */}
          <section className="card-scientific p-8 md:p-10 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Why Drug Solubility Matters
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Solubility is one of the most critical factors in drug development. A drug must dissolve 
                    before it can be absorbed into the bloodstream and reach its target. Poor solubility is 
                    responsible for the failure of approximately <strong className="text-foreground">40% of drug candidates</strong> in development.
                  </p>
                  <p className="leading-relaxed">
                    Understanding solubility early in the development process helps pharmaceutical scientists optimize their drug candidates.
                  </p>
                </div>
              </div>
              <div className="md:w-80 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden h-48 md:h-full">
                  <img 
                    src={pillsCapsulesImage} 
                    alt="Various pharmaceutical pills and capsules" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {[
                "Identify potential formulation challenges before costly clinical trials",
                "Select appropriate delivery systems and excipients",
                "Optimize drug candidates for better absorption and bioavailability",
                "Reduce development time and costs significantly",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How AI Prediction Works */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Technology
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How AI Prediction Works
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="card-scientific-hover p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="card-scientific p-8 md:p-10 mb-12 overflow-hidden relative">
            <div className="absolute inset-0 gradient-hero opacity-90" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
                Platform Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                    <span className="text-primary-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* API Credit */}
          <section className="card-scientific p-8 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">API & Technology</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              SoluPredict is powered by advanced machine learning models hosted on Hugging Face Spaces. 
              The prediction API provides comprehensive solubility analysis including molecular properties, 
              solvent optimization, and formulation recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://pravinpatil007-solubility.hf.space/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                View API Documentation
                <ExternalLink className="h-4 w-4" />
              </a>
              <a 
                href="https://pubchem.ncbi.nlm.nih.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                PubChem Database
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Try our solubility prediction tool and accelerate your research today.
            </p>
            <Button asChild size="lg" className="gradient-primary border-0 rounded-2xl shadow-glow hover:shadow-glow-lg transition-shadow h-14 px-10 text-lg">
              <Link to="/predict">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Predicting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}