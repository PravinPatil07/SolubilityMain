import { MolecularProperties } from "@/types/prediction";
import { Atom, Scale, Droplet, Link2 } from "lucide-react";

interface MolecularPropertiesCardProps {
  properties: MolecularProperties;
}

const propertyItems = [
  { key: "molecular_weight", label: "Molecular Weight", unit: "g/mol", icon: Scale, color: "from-blue-500 to-cyan-500" },
  { key: "logp", label: "LogP", unit: "", icon: Droplet, color: "from-purple-500 to-pink-500" },
  { key: "tpsa", label: "TPSA", unit: "Ų", icon: Atom, color: "from-orange-500 to-amber-500" },
  { key: "hbd", label: "H-Bond Donors", unit: "", icon: Link2, color: "from-emerald-500 to-teal-500" },
  { key: "hba", label: "H-Bond Acceptors", unit: "", icon: Link2, color: "from-rose-500 to-red-500" },
] as const;

export function MolecularPropertiesCard({ properties }: MolecularPropertiesCardProps) {
  return (
    <div className="card-scientific p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl icon-container flex items-center justify-center">
          <Atom className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Molecular Properties</h3>
          <p className="text-sm text-muted-foreground">Physicochemical descriptors</p>
        </div>
      </div>

      <div className="space-y-3">
        {propertyItems.map((item) => {
          const Icon = item.icon;
          const value = properties[item.key as keyof MolecularProperties];
          const displayValue = typeof value === "number" ? value.toFixed(2) : value;
          
          return (
            <div 
              key={item.key} 
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              </div>
              <span className="text-base font-semibold text-foreground">
                {displayValue}{item.unit && <span className="text-muted-foreground font-normal ml-1">{item.unit}</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
          <span className="text-sm font-medium text-muted-foreground">Formula</span>
          <span className="text-base font-mono font-semibold text-foreground">{properties.formula}</span>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-sm font-medium text-muted-foreground block mb-2">InChIKey</span>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg block overflow-x-auto">
            {properties.inchikey}
          </code>
        </div>
      </div>
    </div>
  );
}