import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

interface AtomData {
  position: [number, number, number];
  color: string;
  size: number;
}

interface BondData {
  start: [number, number, number];
  end: [number, number, number];
}

function Atom({ position, color, size }: AtomData) {
  return (
    <Sphere args={[size, 24, 24]} position={position}>
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
    </Sphere>
  );
}

function Bond({ start, end }: BondData) {
  const midPoint = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  );

  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  );

  const length = direction.length();
  direction.normalize();

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.06, 0.06, length, 12]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.4} />
    </mesh>
  );
}

// Simple SMILES-based structure generator (creates a representative structure)
function generateMoleculeFromSmiles(smiles: string): { atoms: AtomData[]; bonds: BondData[] } {
  const atoms: AtomData[] = [];
  const bonds: BondData[] = [];
  
  // Color mapping for common atoms
  const atomColors: Record<string, string> = {
    C: "#3b82f6",  // Carbon - blue
    O: "#ef4444",  // Oxygen - red
    N: "#a855f7",  // Nitrogen - purple
    S: "#fbbf24",  // Sulfur - yellow
    Cl: "#22c55e", // Chlorine - green
    F: "#06b6d4",  // Fluorine - cyan
    Br: "#f97316", // Bromine - orange
    H: "#94a3b8",  // Hydrogen - gray
  };

  // Parse SMILES to extract atom types
  const atomPattern = /Cl|Br|[CNOS]|[cnos]/g;
  const foundAtoms = smiles.match(atomPattern) || [];
  
  // Limit atoms for performance
  const maxAtoms = Math.min(foundAtoms.length, 20);
  const atomTypes = foundAtoms.slice(0, maxAtoms);
  
  if (atomTypes.length === 0) {
    // Default structure if parsing fails
    atomTypes.push('C', 'C', 'C', 'O');
  }

  // Generate 3D positions in a circular/spiral pattern
  const angleStep = (2 * Math.PI) / Math.max(atomTypes.length, 6);
  const radius = 1.5;
  
  atomTypes.forEach((atom, i) => {
    const angle = i * angleStep;
    const layer = Math.floor(i / 6);
    const z = layer * 0.8 - (Math.floor(atomTypes.length / 12) * 0.4);
    
    const atomType = atom.toUpperCase();
    const color = atomColors[atomType] || atomColors.C;
    const size = atomType === 'H' ? 0.2 : atomType === 'O' || atomType === 'N' ? 0.35 : 0.3;
    
    atoms.push({
      position: [
        Math.cos(angle) * (radius + layer * 0.5),
        Math.sin(angle) * (radius + layer * 0.5),
        z
      ],
      color,
      size
    });
  });

  // Create bonds between adjacent atoms
  for (let i = 0; i < atoms.length - 1; i++) {
    // Connect to next atom
    bonds.push({
      start: atoms[i].position,
      end: atoms[i + 1].position
    });
    
    // Add some ring bonds for aromatic structures
    if (smiles.includes('c') || smiles.includes('C1')) {
      if (i > 0 && i % 5 === 0 && i < atoms.length - 1) {
        bonds.push({
          start: atoms[i].position,
          end: atoms[0].position
        });
      }
    }
  }

  // Close ring if SMILES suggests cyclic structure
  if ((smiles.includes('1') || smiles.includes('c1')) && atoms.length > 3) {
    bonds.push({
      start: atoms[atoms.length - 1].position,
      end: atoms[0].position
    });
  }

  return { atoms, bonds };
}

interface RotatingMoleculeProps {
  atoms: AtomData[];
  bonds: BondData[];
}

function RotatingMolecule({ atoms, bonds }: RotatingMoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {atoms.map((atom, i) => (
          <Atom key={`atom-${i}`} {...atom} />
        ))}
        {bonds.map((bond, i) => (
          <Bond key={`bond-${i}`} {...bond} />
        ))}
      </group>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  );
}

interface MoleculeViewerProps {
  smiles: string;
  drugName: string;
}

export function MoleculeViewer({ smiles, drugName }: MoleculeViewerProps) {
  const { atoms, bonds } = useMemo(() => generateMoleculeFromSmiles(smiles), [smiles]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">3D Molecule Structure</h3>
        <span className="text-sm text-muted-foreground capitalize">{drugName}</span>
      </div>
      
      <div className="relative h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
            
            <RotatingMolecule atoms={atoms} bonds={bonds} />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={12}
            />
          </Suspense>
        </Canvas>
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 justify-center">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs text-white/80">C</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs text-white/80">O</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-xs text-white/80">N</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-xs text-white/80">S</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
}
