import { Layout } from "@/components/layout/Layout";
import { 
  Droplets, 
  Beaker, 
  Atom, 
  TestTube, 
  BookOpen,
  RotateCw
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Molecule3DViewer } from "@/components/drug-info/Molecule3DViewer";
import labBeakersImage from "@/assets/lab-beakers.jpg";

const solubilityCategories = [
  { term: "Very Soluble", definition: "> 1000 mg/mL (parts of solvent per part of solute < 1)", color: "bg-emerald-500" },
  { term: "Freely Soluble", definition: "100-1000 mg/mL (1-10 parts of solvent)", color: "bg-green-500" },
  { term: "Soluble", definition: "33-100 mg/mL (10-30 parts of solvent)", color: "bg-teal-500" },
  { term: "Sparingly Soluble", definition: "10-33 mg/mL (30-100 parts of solvent)", color: "bg-yellow-500" },
  { term: "Slightly Soluble", definition: "1-10 mg/mL (100-1000 parts of solvent)", color: "bg-orange-500" },
  { term: "Very Slightly Soluble", definition: "0.1-1 mg/mL (1000-10000 parts of solvent)", color: "bg-red-400" },
  { term: "Practically Insoluble", definition: "< 0.1 mg/mL (> 10000 parts of solvent)", color: "bg-red-600" },
];

const molecularProperties = [
  {
    term: "LogP (Partition Coefficient)",
    definition: "A measure of a compound's lipophilicity (fat-loving property). It's the logarithm of the ratio of concentrations of a compound in octanol versus water. Higher LogP means more lipophilic (fat-soluble), lower LogP means more hydrophilic (water-soluble).",
    example: "LogP < 0: Hydrophilic | LogP 0-3: Balanced | LogP > 5: Highly lipophilic"
  },
  {
    term: "TPSA (Topological Polar Surface Area)",
    definition: "The surface area of polar atoms (oxygen, nitrogen, and their attached hydrogens) in a molecule. TPSA is useful for predicting drug transport properties including intestinal absorption and blood-brain barrier penetration.",
    example: "TPSA < 60 Ų: Good BBB permeation | TPSA < 140 Ų: Good oral absorption"
  },
  {
    term: "HBD (Hydrogen Bond Donors)",
    definition: "The number of hydrogen atoms attached to electronegative atoms (like nitrogen or oxygen) that can donate a hydrogen bond. Important for drug-receptor interactions and solubility.",
    example: "Lipinski's Rule: HBD ≤ 5 for good oral bioavailability"
  },
  {
    term: "HBA (Hydrogen Bond Acceptors)",
    definition: "The number of electronegative atoms (mainly nitrogen and oxygen) that can accept hydrogen bonds. Affects binding affinity and membrane permeability.",
    example: "Lipinski's Rule: HBA ≤ 10 for good oral bioavailability"
  },
];

const solventClasses = [
  { name: "Water", class: "Aqueous", description: "Most common and preferred solvent for pharmaceutical formulations. Polar, biocompatible, and safe.", color: "from-blue-500 to-cyan-500" },
  { name: "Ethanol", class: "Alcohol", description: "Commonly used co-solvent. Can enhance solubility of moderately lipophilic compounds.", color: "from-purple-500 to-pink-500" },
  { name: "Methanol", class: "Alcohol", description: "Polar protic solvent. Often used in analytical methods but less common in formulations due to toxicity.", color: "from-violet-500 to-purple-500" },
  { name: "DMSO", class: "Aprotic", description: "Dimethyl sulfoxide. Excellent solvent for poorly soluble compounds. Used in preclinical studies.", color: "from-amber-500 to-orange-500" },
  { name: "PEG 400", class: "Polymer", description: "Polyethylene glycol. Non-toxic, used in oral and injectable formulations to improve solubility.", color: "from-emerald-500 to-teal-500" },
  { name: "Acetone", class: "Ketone", description: "Polar aprotic solvent. Used in laboratory settings but not in final formulations.", color: "from-rose-500 to-red-500" },
  { name: "Acetate Buffer", class: "Buffer", description: "pH 4.0-5.5 buffer system. Commonly used for acidic drug formulations and stability studies.", color: "from-indigo-500 to-blue-500" },
  { name: "Phosphate Buffer", class: "Buffer", description: "pH 5.8-8.0 buffer system. Standard for physiological pH simulations and bioavailability studies.", color: "from-cyan-500 to-teal-500" },
];

const bcsClasses = [
  { class: "I", solubility: "High", permeability: "High", description: "Rapidly dissolved and absorbed. Examples: Metoprolol, Propranolol", color: "from-emerald-500 to-green-500" },
  { class: "II", solubility: "Low", permeability: "High", description: "Dissolution-limited absorption. Examples: Ibuprofen, Ketoconazole", color: "from-amber-500 to-yellow-500" },
  { class: "III", solubility: "High", permeability: "Low", description: "Permeability-limited absorption. Examples: Ranitidine, Acyclovir", color: "from-blue-500 to-cyan-500" },
  { class: "IV", solubility: "Low", permeability: "Low", description: "Poorly absorbed compounds. Examples: Taxol, Hydrochlorothiazide", color: "from-red-500 to-rose-500" },
];

export default function DrugInfo() {
  return (
    <Layout>
      <div className="container py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Reference Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
              Drug Information & Definitions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essential concepts and definitions for understanding drug solubility, molecular properties, 
              and pharmaceutical development.
            </p>

            {/* Header Image */}
            <div className="mt-10">
              <div className="relative rounded-3xl overflow-hidden max-w-2xl mx-auto shadow-xl">
                <img 
                  src={labBeakersImage} 
                  alt="Laboratory beakers with colorful solutions" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* 3D Molecule Visualization */}
          <section className="card-scientific p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <RotateCw className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">3D Molecule Visualization</h2>
                <p className="text-muted-foreground">Interactive 3D representation of drug molecules</p>
              </div>
            </div>
            
            <div className="relative">
              <Molecule3DViewer />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Use mouse to rotate, scroll to zoom. This is a representative drug molecule structure.
              </p>
            </div>
          </section>

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Solubility Categories */}
            <section className="card-scientific p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Droplets className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">USP Solubility Categories</h2>
                  <p className="text-muted-foreground">United States Pharmacopeia classification</p>
                </div>
              </div>

              <div className="space-y-3">
                {solubilityCategories.map((cat, index) => (
                  <div 
                    key={cat.term}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all hover:shadow-md"
                  >
                    <div className={`w-3 h-12 rounded-full ${cat.color}`} />
                    <div className="flex-1">
                      <span className="font-semibold text-foreground">{cat.term}</span>
                      <span className="text-muted-foreground ml-2">— {cat.definition}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Molecular Properties */}
            <section className="card-scientific p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Atom className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Molecular Properties</h2>
                  <p className="text-muted-foreground">Key physicochemical descriptors</p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {molecularProperties.map((prop, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`prop-${index}`}
                    className="border border-border/50 rounded-2xl px-5 bg-muted/20 data-[state=open]:bg-muted/40 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <span className="font-semibold text-foreground">{prop.term}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{prop.definition}</p>
                        <div className="p-4 rounded-xl bg-info/10 border border-info/20">
                          <span className="text-sm font-mono text-info">{prop.example}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Solvent Classes */}
            <section className="card-scientific p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Beaker className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Solvent Classes</h2>
                  <p className="text-muted-foreground">Common solvents in pharmaceutical development</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {solventClasses.map((solvent) => (
                  <div key={solvent.name} className="p-5 rounded-2xl border border-border/50 bg-muted/20 hover:border-primary/30 transition-all hover:shadow-md group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${solvent.color}`} />
                      <h4 className="font-semibold text-foreground">{solvent.name}</h4>
                      <span className="badge-info text-xs ml-auto">{solvent.class}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{solvent.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* BCS Classification */}
            <section className="card-scientific p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <TestTube className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Biopharmaceutics Classification System (BCS)</h2>
                  <p className="text-muted-foreground">FDA classification for oral drug products</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                The BCS classifies drugs based on their aqueous solubility and intestinal permeability. 
                This system helps predict oral drug absorption and guides formulation development.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {bcsClasses.map((bcs) => (
                  <div key={bcs.class} className="p-5 rounded-2xl border border-border/50 bg-muted/20 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bcs.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {bcs.class}
                      </div>
                      <div className="space-y-1">
                        <span className={bcs.solubility === "High" ? "badge-success" : "badge-warning"}>
                          {bcs.solubility} Solubility
                        </span>
                        <span className={`block ${bcs.permeability === "High" ? "badge-success" : "badge-warning"}`}>
                          {bcs.permeability} Permeability
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{bcs.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}