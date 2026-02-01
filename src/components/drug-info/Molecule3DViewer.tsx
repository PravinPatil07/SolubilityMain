import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AtomProps {
  position: [number, number, number];
  color: string;
  size: number;
}

function Atom({ position, color, size }: AtomProps) {
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </Sphere>
  );
}

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
}

function Bond({ start, end }: BondProps) {
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
      <cylinderGeometry args={[0.08, 0.08, length, 16]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.5} />
    </mesh>
  );
}

interface MoleculeData {
  name: string;
  formula: string;
  description: string;
  atoms: AtomProps[];
  bonds: BondProps[];
  cameraDistance: number;
  offset: [number, number, number];
}

// Aspirin (Acetylsalicylic acid) - simplified structure
const aspirinMolecule: MoleculeData = {
  name: "Aspirin",
  formula: "C₉H₈O₄",
  description: "Common pain reliever and anti-inflammatory",
  cameraDistance: 8,
  offset: [-1.5, -1, 0],
  atoms: [
    // Benzene ring carbons
    { position: [0, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.8, 1.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [0, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-0.6, 1.0, 0], color: "#3b82f6", size: 0.35 },
    // Carboxylic acid group
    { position: [2.4, -0.8, 0], color: "#3b82f6", size: 0.35 },
    { position: [3.6, -0.4, 0], color: "#ef4444", size: 0.4 },
    { position: [2.2, -2.0, 0], color: "#ef4444", size: 0.4 },
    // Acetyl group
    { position: [-1.8, 1.0, 0], color: "#ef4444", size: 0.4 },
    { position: [-2.8, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-3.8, 0.6, 0], color: "#ef4444", size: 0.4 },
  ],
  bonds: [
    { start: [0, 0, 0], end: [1.2, 0, 0] },
    { start: [1.2, 0, 0], end: [1.8, 1.0, 0] },
    { start: [1.8, 1.0, 0], end: [1.2, 2.0, 0] },
    { start: [1.2, 2.0, 0], end: [0, 2.0, 0] },
    { start: [0, 2.0, 0], end: [-0.6, 1.0, 0] },
    { start: [-0.6, 1.0, 0], end: [0, 0, 0] },
    { start: [1.2, 0, 0], end: [2.4, -0.8, 0] },
    { start: [2.4, -0.8, 0], end: [3.6, -0.4, 0] },
    { start: [2.4, -0.8, 0], end: [2.2, -2.0, 0] },
    { start: [-0.6, 1.0, 0], end: [-1.8, 1.0, 0] },
    { start: [-1.8, 1.0, 0], end: [-2.8, 0, 0] },
    { start: [-2.8, 0, 0], end: [-3.8, 0.6, 0] },
  ],
};

// Caffeine - simplified structure
const caffeineMolecule: MoleculeData = {
  name: "Caffeine",
  formula: "C₈H₁₀N₄O₂",
  description: "Central nervous system stimulant",
  cameraDistance: 9,
  offset: [-1, -1, 0],
  atoms: [
    // Purine ring system
    { position: [0, 0, 0], color: "#a855f7", size: 0.38 }, // N
    { position: [1.2, 0.5, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [1.2, 1.8, 0], color: "#a855f7", size: 0.38 }, // N
    { position: [0, 2.3, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [-1, 1.5, 0], color: "#a855f7", size: 0.38 }, // N
    { position: [-1, 0.3, 0], color: "#3b82f6", size: 0.35 }, // C
    // Second ring
    { position: [2.4, 0, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [3.2, 1.2, 0], color: "#a855f7", size: 0.38 }, // N
    { position: [2.4, 2.2, 0], color: "#3b82f6", size: 0.35 }, // C
    // Carbonyl oxygens
    { position: [-2.2, 0, 0], color: "#ef4444", size: 0.4 }, // O
    { position: [2.6, 3.4, 0], color: "#ef4444", size: 0.4 }, // O
    // Methyl groups
    { position: [-0.5, -1.2, 0], color: "#3b82f6", size: 0.32 },
    { position: [4.5, 1.4, 0], color: "#3b82f6", size: 0.32 },
    { position: [-2.2, 1.8, 0], color: "#3b82f6", size: 0.32 },
  ],
  bonds: [
    { start: [0, 0, 0], end: [1.2, 0.5, 0] },
    { start: [1.2, 0.5, 0], end: [1.2, 1.8, 0] },
    { start: [1.2, 1.8, 0], end: [0, 2.3, 0] },
    { start: [0, 2.3, 0], end: [-1, 1.5, 0] },
    { start: [-1, 1.5, 0], end: [-1, 0.3, 0] },
    { start: [-1, 0.3, 0], end: [0, 0, 0] },
    { start: [1.2, 0.5, 0], end: [2.4, 0, 0] },
    { start: [2.4, 0, 0], end: [3.2, 1.2, 0] },
    { start: [3.2, 1.2, 0], end: [2.4, 2.2, 0] },
    { start: [2.4, 2.2, 0], end: [1.2, 1.8, 0] },
    { start: [-1, 0.3, 0], end: [-2.2, 0, 0] },
    { start: [2.4, 2.2, 0], end: [2.6, 3.4, 0] },
    { start: [0, 0, 0], end: [-0.5, -1.2, 0] },
    { start: [3.2, 1.2, 0], end: [4.5, 1.4, 0] },
    { start: [-1, 1.5, 0], end: [-2.2, 1.8, 0] },
  ],
};

// Ibuprofen - simplified structure
const ibuprofenMolecule: MoleculeData = {
  name: "Ibuprofen",
  formula: "C₁₃H₁₈O₂",
  description: "Nonsteroidal anti-inflammatory drug (NSAID)",
  cameraDistance: 10,
  offset: [-2, -0.5, 0],
  atoms: [
    // Benzene ring
    { position: [0, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 0.6, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [0, 2.6, 0], color: "#3b82f6", size: 0.35 },
    { position: [-1.2, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-1.2, 0.6, 0], color: "#3b82f6", size: 0.35 },
    // Isobutyl chain
    { position: [2.4, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [3.6, 0.8, 0], color: "#3b82f6", size: 0.35 },
    { position: [4.8, 0, 0.5], color: "#3b82f6", size: 0.32 },
    { position: [4.8, 1.6, -0.5], color: "#3b82f6", size: 0.32 },
    // Propionic acid chain
    { position: [-2.4, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-3.6, 0.8, 0], color: "#3b82f6", size: 0.35 },
    { position: [-4.8, 0.2, 0], color: "#ef4444", size: 0.4 },
    { position: [-3.8, 2.2, 0], color: "#ef4444", size: 0.4 },
  ],
  bonds: [
    { start: [0, 0, 0], end: [1.2, 0.6, 0] },
    { start: [1.2, 0.6, 0], end: [1.2, 2.0, 0] },
    { start: [1.2, 2.0, 0], end: [0, 2.6, 0] },
    { start: [0, 2.6, 0], end: [-1.2, 2.0, 0] },
    { start: [-1.2, 2.0, 0], end: [-1.2, 0.6, 0] },
    { start: [-1.2, 0.6, 0], end: [0, 0, 0] },
    { start: [1.2, 0.6, 0], end: [2.4, 0, 0] },
    { start: [2.4, 0, 0], end: [3.6, 0.8, 0] },
    { start: [3.6, 0.8, 0], end: [4.8, 0, 0.5] },
    { start: [3.6, 0.8, 0], end: [4.8, 1.6, -0.5] },
    { start: [-1.2, 0.6, 0], end: [-2.4, 0, 0] },
    { start: [-2.4, 0, 0], end: [-3.6, 0.8, 0] },
    { start: [-3.6, 0.8, 0], end: [-4.8, 0.2, 0] },
    { start: [-3.6, 0.8, 0], end: [-3.8, 2.2, 0] },
  ],
};

// Paracetamol (Acetaminophen) - simplified structure
const paracetamolMolecule: MoleculeData = {
  name: "Paracetamol",
  formula: "C₈H₉NO₂",
  description: "Pain reliever and fever reducer",
  cameraDistance: 8,
  offset: [-1, -1, 0],
  atoms: [
    // Benzene ring
    { position: [0, 0, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 0.6, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.2, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [0, 2.6, 0], color: "#3b82f6", size: 0.35 },
    { position: [-1.2, 2.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-1.2, 0.6, 0], color: "#3b82f6", size: 0.35 },
    // Hydroxyl group (para position)
    { position: [0, 4.0, 0], color: "#ef4444", size: 0.4 },
    // Amide group
    { position: [0, -1.4, 0], color: "#a855f7", size: 0.38 },
    { position: [0, -2.8, 0], color: "#3b82f6", size: 0.35 },
    { position: [-1.2, -3.4, 0], color: "#ef4444", size: 0.4 },
    { position: [1.2, -3.8, 0], color: "#3b82f6", size: 0.32 },
  ],
  bonds: [
    { start: [0, 0, 0], end: [1.2, 0.6, 0] },
    { start: [1.2, 0.6, 0], end: [1.2, 2.0, 0] },
    { start: [1.2, 2.0, 0], end: [0, 2.6, 0] },
    { start: [0, 2.6, 0], end: [-1.2, 2.0, 0] },
    { start: [-1.2, 2.0, 0], end: [-1.2, 0.6, 0] },
    { start: [-1.2, 0.6, 0], end: [0, 0, 0] },
    { start: [0, 2.6, 0], end: [0, 4.0, 0] },
    { start: [0, 0, 0], end: [0, -1.4, 0] },
    { start: [0, -1.4, 0], end: [0, -2.8, 0] },
    { start: [0, -2.8, 0], end: [-1.2, -3.4, 0] },
    { start: [0, -2.8, 0], end: [1.2, -3.8, 0] },
  ],
};

// Penicillin G - simplified beta-lactam structure
const penicillinMolecule: MoleculeData = {
  name: "Penicillin G",
  formula: "C₁₆H₁₈N₂O₄S",
  description: "Beta-lactam antibiotic",
  cameraDistance: 10,
  offset: [-1.5, -1.5, 0],
  atoms: [
    // Beta-lactam ring (4-membered)
    { position: [0, 0, 0], color: "#a855f7", size: 0.38 }, // N
    { position: [1.0, 0.8, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [1.0, 2.0, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [-0.2, 1.8, 0], color: "#3b82f6", size: 0.35 }, // C
    // Thiazolidine ring (5-membered)
    { position: [-1.4, 2.6, 0], color: "#fbbf24", size: 0.42 }, // S (yellow)
    { position: [-2.2, 1.4, 0], color: "#3b82f6", size: 0.35 }, // C
    { position: [-1.4, 0.4, 0], color: "#3b82f6", size: 0.35 }, // C
    // Carbonyl on beta-lactam
    { position: [2.2, 2.6, 0], color: "#ef4444", size: 0.4 }, // O
    // Carboxylic acid
    { position: [-3.4, 1.0, 0], color: "#3b82f6", size: 0.35 },
    { position: [-4.4, 2.0, 0], color: "#ef4444", size: 0.4 },
    { position: [-4.0, -0.2, 0], color: "#ef4444", size: 0.4 },
    // Benzyl side chain
    { position: [0.2, -1.4, 0], color: "#3b82f6", size: 0.35 },
    { position: [1.4, -2.2, 0], color: "#3b82f6", size: 0.35 },
    { position: [2.6, -1.6, 0], color: "#3b82f6", size: 0.35 },
    { position: [2.6, -0.2, 0], color: "#3b82f6", size: 0.35 },
    // Methyl groups
    { position: [-2.8, 3.4, 0.8], color: "#3b82f6", size: 0.32 },
    { position: [-2.8, 3.4, -0.8], color: "#3b82f6", size: 0.32 },
  ],
  bonds: [
    { start: [0, 0, 0], end: [1.0, 0.8, 0] },
    { start: [1.0, 0.8, 0], end: [1.0, 2.0, 0] },
    { start: [1.0, 2.0, 0], end: [-0.2, 1.8, 0] },
    { start: [-0.2, 1.8, 0], end: [0, 0, 0] },
    { start: [-0.2, 1.8, 0], end: [-1.4, 2.6, 0] },
    { start: [-1.4, 2.6, 0], end: [-2.2, 1.4, 0] },
    { start: [-2.2, 1.4, 0], end: [-1.4, 0.4, 0] },
    { start: [-1.4, 0.4, 0], end: [0, 0, 0] },
    { start: [1.0, 2.0, 0], end: [2.2, 2.6, 0] },
    { start: [-2.2, 1.4, 0], end: [-3.4, 1.0, 0] },
    { start: [-3.4, 1.0, 0], end: [-4.4, 2.0, 0] },
    { start: [-3.4, 1.0, 0], end: [-4.0, -0.2, 0] },
    { start: [0, 0, 0], end: [0.2, -1.4, 0] },
    { start: [0.2, -1.4, 0], end: [1.4, -2.2, 0] },
    { start: [1.4, -2.2, 0], end: [2.6, -1.6, 0] },
    { start: [2.6, -1.6, 0], end: [2.6, -0.2, 0] },
    { start: [-1.4, 2.6, 0], end: [-2.8, 3.4, 0.8] },
    { start: [-1.4, 2.6, 0], end: [-2.8, 3.4, -0.8] },
  ],
};

const molecules: MoleculeData[] = [
  aspirinMolecule,
  caffeineMolecule,
  ibuprofenMolecule,
  paracetamolMolecule,
  penicillinMolecule,
];

interface RotatingMoleculeProps {
  molecule: MoleculeData;
}

function RotatingMolecule({ molecule }: RotatingMoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={molecule.offset}>
        {molecule.atoms.map((atom, i) => (
          <Atom key={`atom-${i}`} {...atom} />
        ))}
        {molecule.bonds.map((bond, i) => (
          <Bond key={`bond-${i}`} {...bond} />
        ))}
      </group>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  );
}

export function Molecule3DViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMolecule = molecules[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? molecules.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === molecules.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full space-y-4">
      {/* Molecule info header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">{currentMolecule.name}</h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono text-primary">{currentMolecule.formula}</span>
            <span className="mx-2">•</span>
            {currentMolecule.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-9 w-9 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
            {currentIndex + 1} / {molecules.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-9 w-9 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <Canvas camera={{ position: [0, 0, currentMolecule.cameraDistance], fov: 50 }}>
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <spotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            
            <RotatingMolecule key={currentIndex} molecule={currentMolecule} />
            
            <Environment preset="city" />
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={15}
              autoRotate={false}
            />
          </Suspense>
        </Canvas>
        
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-white/80">Carbon</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-white/80">Oxygen</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs text-white/80">Nitrogen</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-xs text-white/80">Sulfur</span>
          </div>
        </div>
      </div>

      {/* Molecule selector pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {molecules.map((mol, index) => (
          <button
            key={mol.name}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              index === currentIndex
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {mol.name}
          </button>
        ))}
      </div>
    </div>
  );
}
