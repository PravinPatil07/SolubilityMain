import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, 
  Beaker, 
  Atom, 
  ArrowRight, 
  Sparkles,
  Activity,
  Database,
  Zap,
  ChevronRight,
  Play
} from "lucide-react";
import heroLabImage from "@/assets/hero-lab.jpg";
import moleculeAbstractImage from "@/assets/molecule-abstract.jpg";

const features = [
  {
    icon: FlaskConical,
    title: "Accurate Predictions",
    description: "AI-powered solubility predictions using advanced machine learning models trained on extensive pharmaceutical data.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Beaker,
    title: "Solvent Optimization",
    description: "Get recommendations for optimal solvents with predicted solubility improvements for your compounds.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Atom,
    title: "Molecular Properties",
    description: "Comprehensive molecular property analysis including LogP, TPSA, molecular weight, and more.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Activity,
    title: "Formulation Insights",
    description: "Smart formulation suggestions with success rates to guide your drug development process.",
    color: "from-emerald-500 to-teal-500",
  },
];

const stats = [
  { value: "95%", label: "Prediction Accuracy", icon: "✨" },
  { value: "100K+", label: "Molecules Analyzed", icon: "🧬" },
  { value: "<2s", label: "Response Time", icon: "⚡" },
  { value: "6+", label: "Solvent Types", icon: "🧪" },
];

const steps = [
  {
    icon: Database,
    title: "Enter Molecule",
    description: "Input your drug name and SMILES structure, or convert from drug name.",
  },
  {
    icon: Zap,
    title: "AI Analysis",
    description: "Our AI model analyzes molecular properties and predicts solubility.",
  },
  {
    icon: Sparkles,
    title: "Get Results",
    description: "Receive detailed predictions with solvent optimization and formulation advice.",
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background orbs */}
        <div className="orb orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="orb orb-accent w-80 h-80 top-1/4 right-0" style={{ animationDelay: "-5s" }} />
        <div className="orb orb-primary w-64 h-64 bottom-0 left-1/4" style={{ animationDelay: "-10s" }} />
        
        <div className="container relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-medium mb-8 animate-fade-in"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Drug Development
              <ChevronRight className="h-4 w-4" />
            </div>
            
            {/* Heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Predict Drug Solubility
              <br />
              <span className="text-gradient">with AI Precision</span>
            </h1>
            
            {/* Subheading */}
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Accelerate pharmaceutical research with instant, accurate solubility predictions. 
              Optimize solvents, analyze molecular properties, and get formulation recommendations.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary border-0 text-lg px-8 h-14 rounded-2xl shadow-glow-lg hover:shadow-glow transition-all group"
              >
                <Link to="/predict">
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Start Predicting
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 h-14 rounded-2xl glass-card hover:bg-muted/50"
              >
                <Link to="/drug-info">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div 
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 card-scientific hover-lift"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div 
            className="mt-16 max-w-5xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroLabImage} 
                alt="Modern pharmaceutical laboratory with molecular analysis" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 relative">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Comprehensive Solubility Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for drug solubility prediction and formulation development in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="group p-6 card-scientific-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Image */}
          <div className="mt-16">
            <div className="relative rounded-3xl overflow-hidden max-w-md mx-auto">
              <img 
                src={moleculeAbstractImage} 
                alt="Abstract molecular structure visualization" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 relative overflow-hidden">
        <div className="orb orb-accent w-72 h-72 -right-36 top-1/3 opacity-20" />
        
        <div className="container relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get Results in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and accurate solubility predictions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                    <step.icon className="h-9 w-9 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button asChild size="lg" className="gradient-primary border-0 rounded-2xl shadow-glow hover:shadow-glow-lg transition-shadow">
              <Link to="/predict">
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto relative">
            <div className="card-scientific p-12 md:p-16 text-center overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 gradient-hero opacity-90" />
              
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                  Ready to Accelerate Your Research?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                  Start predicting drug solubility today with our AI-powered platform. No signup required.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-10 h-14 rounded-2xl font-semibold hover:bg-white transition-colors"
                >
                  <Link to="/predict">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}