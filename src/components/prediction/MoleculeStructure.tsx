import { Atom } from "lucide-react";

interface MoleculeStructureProps {
  imageBase64?: string;
  smiles: string;
}

export function MoleculeStructure({ imageBase64, smiles }: MoleculeStructureProps) {
  return (
    <div className="card-scientific p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Atom className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">2D Structure</h3>
      </div>

      <div className="molecule-structure flex items-center justify-center min-h-[200px]">
        {imageBase64 ? (
          <img 
            src={`data:image/png;base64,${imageBase64}`} 
            alt="Molecular structure"
            className="max-w-full max-h-[200px] object-contain"
          />
        ) : (
          <div className="text-center text-muted-foreground">
            <Atom className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Structure will be displayed here</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="text-sm text-muted-foreground block mb-1">SMILES</span>
        <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1.5 rounded block overflow-x-auto">
          {smiles}
        </code>
      </div>
    </div>
  );
}
