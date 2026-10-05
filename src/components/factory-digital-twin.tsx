import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Activity, AlertTriangle, Box, Cpu, Factory, Gauge, Minus, Plus, RotateCcw, RotateCw, Scan, Thermometer, Timer, Waves, Zap } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import factoryCutawayPreview from "@/assets/factory-cutaway-preview.png";
import factoryExteriorPreview from "@/assets/factory-exterior-preview.png";

type MachineId = "cnc" | "press" | "robot" | "inspection";
type MachineStatus = "Running" | "Attention";
type MachineRecord = {
  id: MachineId; station: string; name: string; shortName: string; role: string; condition: string;
  status: MachineStatus; action: string; outputBase: number; temperatureBase: number;
  vibrationBase: number; cycleBase: number; oeeBase: number; energyBase: number; phase: number;
};

const machines: MachineRecord[] = [
  { id: "cnc", station: "ZONE 01", name: "Raw materials handling", shortName: "Materials", role: "Receives, stores, and meters polymer feedstock", condition: "Feed rate stable", status: "Running", action: "Holding material flow and feed rate within target band", outputBase: 94, temperatureBase: 61.2, vibrationBase: 1.8, cycleBase: 38.4, oeeBase: 92, energyBase: 18.6, phase: 0.4 },
  { id: "press", station: "ZONE 02", name: "Injection molding factory", shortName: "Injection", role: "Forms high-volume components across eight molding cells", condition: "Cooling-loop drift detected", status: "Attention", action: "Maintenance window reserved before vibration reaches limit", outputBase: 87, temperatureBase: 74.1, vibrationBase: 4.9, cycleBase: 42.8, oeeBase: 84, energyBase: 27.4, phase: 1.7 },
  { id: "robot", station: "ZONE 03", name: "Blow molding", shortName: "Blow molding", role: "Shapes hollow components and transfers finished batches", condition: "Line balance optimal", status: "Running", action: "Routing batch AN-284 toward inspection", outputBase: 91, temperatureBase: 48.3, vibrationBase: 1.2, cycleBase: 40.1, oeeBase: 95, energyBase: 12.8, phase: 2.8 },
  { id: "inspection", station: "ZONE 04", name: "Packaging line", shortName: "Packaging", role: "Inspects, labels, packs, and releases finished goods", condition: "Quality within tolerance", status: "Running", action: "Scanning edge variance and releasing passed units", outputBase: 98.4, temperatureBase: 39.2, vibrationBase: 0.4, cycleBase: 11.6, oeeBase: 97, energyBase: 8.3, phase: 3.6 },
];

const colors = {
  sky: "#dce3e8", white: "#ffffff", concrete: "#aeb8c2", concreteDark: "#707a83",
  asphalt: "#151719", graphite: "#151719", steel: "#56616a", silver: "#aeb8c2",
  glass: "#78a9c9", blue: "#2a65d7", blueDark: "#163e8e", cyan: "#63b8d5",
  yellow: "#f4c430", green: "#35a36f", red: "#e4572e", grass: "#78977d",
};

const positions: Record<MachineId, [number, number, number]> = {
  cnc: [-4.75, 0.12, 0.55], press: [-1.65, 0.12, -0.35], robot: [1.65, 3.34, -0.35], inspection: [4.65, 3.34, 0.55],
};

type ViewMode = "exterior" | "cutaway";

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

const layers = [
  { name: "Mirror", description: "Current machine and material state" },
  { name: "Predict", description: "Risk, drift, and maintenance window" },
  { name: "Orchestrate", description: "Actions across the production line" },
];

function useLiveMachineStats(machine: MachineRecord, activeLayer: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setTick((n) => n + 1), 900); return () => window.clearInterval(timer); }, []);
  return useMemo(() => {
    const wave = Math.sin(tick * 1.05 + machine.phase);
    const lift = machine.id === "press" && activeLayer === 1 ? 1.15 : 1;
    const output = machine.outputBase + wave * (machine.id === "inspection" ? 1.4 : 2.4);
    return {
      output: machine.id === "inspection" ? `${output.toFixed(1)}% pass` : `${Math.round(output)} units/hr`,
      temperature: `${(machine.temperatureBase + wave * 1.4 * lift).toFixed(1)}°C`,
      vibration: `${Math.max(0.1, machine.vibrationBase + wave * 0.22 * lift).toFixed(1)} mm/s`,
      cycle: `${(machine.cycleBase - wave * 0.55).toFixed(1)} sec`,
      oee: `${Math.round(Math.max(0, Math.min(100, machine.oeeBase + wave * 1.8 - (machine.status === "Attention" ? 2 : 0))))}%`,
      energy: `${(machine.energyBase + wave * 0.9).toFixed(1)} kW`,
      health: Math.round(machine.status === "Attention" ? 76 + wave * 3 : 91 + wave * 4),
    };
  }, [activeLayer, machine, tick]);
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (size.width < 640) {
      camera.position.set(24, 16, 27);
      camera.fov = 44;
    } else if (size.width < 850) {
      camera.position.set(21, 14, 23.5);
      camera.fov = 40;
    } else {
      camera.position.set(20, 13, 22);
      camera.fov = 37;
    }
    camera.lookAt(0, 2.2, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

function ZoomRig({ zoom }: { zoom: number }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as { update?: () => void } | null;
  const base = useRef<number | null>(null);
  const size = useThree((state) => state.size);
  useEffect(() => { base.current = null; }, [size.width]);
  useEffect(() => {
    const target = new THREE.Vector3(0, 2.35, 0.4);
    const direction = camera.position.clone().sub(target);
    if (base.current === null) base.current = direction.length();
    const distance = THREE.MathUtils.clamp(base.current / zoom, 8, 34);
    camera.position.copy(target.clone().add(direction.normalize().multiplyScalar(distance)));
    camera.updateProjectionMatrix();
    controls?.update?.();
  }, [camera, controls, zoom]);
  return null;
}

function RotateRig({ spin }: { spin: number }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as { update?: () => void } | null;
  const applied = useRef(0);
  useEffect(() => {
    const delta = spin - applied.current;
    if (!delta) return;
    applied.current = spin;
    const target = new THREE.Vector3(0, 2.35, 0.4);
    const offset = camera.position.clone().sub(target).applyAxisAngle(new THREE.Vector3(0, 1, 0), delta);
    camera.position.copy(target.clone().add(offset));
    camera.lookAt(target);
    controls?.update?.();
  }, [camera, controls, spin]);
  return null;
}

/** Trucks that drive in from the perimeter road, dwell at the factory, and drive back out. */
function GateVehicle({ lane, phase, inside, blue = false }: { lane: number; phase: number; inside: number; blue?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const period = 16;
    const cycle = ((clock.elapsedTime + phase) % period) / period;
    const progress = cycle < 0.4 ? cycle / 0.4 : cycle < 0.58 ? 1 : 1 - (cycle - 0.58) / 0.42;
    const eased = progress * progress * (3 - 2 * progress);
    group.current.position.set(lane, 0.12, THREE.MathUtils.lerp(9.6, inside, eased));
    group.current.rotation.y = cycle < 0.5 ? Math.PI / 2 : -Math.PI / 2;
  });
  return <group ref={group}><Vehicle position={[0, 0, 0]} blue={blue} /></group>;
}

function GateTraffic({ inside }: { inside: number }) {
  return <group>
    <BoxPart position={[-3.2, 0.015, 7.1]} size={[1.5, 0.07, 5.4]} color={colors.asphalt} roughness={0.9} />
    <BoxPart position={[3.6, 0.015, 7.1]} size={[1.5, 0.07, 5.4]} color={colors.asphalt} roughness={0.9} />
    <GateVehicle lane={-3.2} phase={0} inside={inside} blue />
    <GateVehicle lane={3.6} phase={8.5} inside={inside} />
    <GateVehicle lane={-3.2} phase={12.5} inside={inside + 0.9} />
  </group>;
}

function Conveyor({ position, length = 3.2, rotation = 0 }: { position: [number, number, number]; length?: number; rotation?: number }) {
  const parcels = useRef<THREE.Group>(null);
  const rollers = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    if (!parcels.current && !rollers.current) return;
    const delta = Math.min(rawDelta, 0.05);
    parcels.current?.children.forEach((parcel) => {
      parcel.position.x += delta * 1.18;
      if (parcel.position.x > length / 2 - 0.25) parcel.position.x = -length / 2 + 0.25;
    });
    rollers.current?.children.forEach((roller) => { roller.rotation.z -= delta * 5.2; });
  });
  return <group position={position} rotation-y={rotation}>
    <BoxPart position={[0, 0.5, -0.42]} size={[length, 0.12, 0.1]} color={colors.graphite} metalness={0.72} roughness={0.2} />
    <BoxPart position={[0, 0.5, 0.42]} size={[length, 0.12, 0.1]} color={colors.graphite} metalness={0.72} roughness={0.2} />
    <group ref={rollers}>{Array.from({ length: 14 }, (_, i) => <mesh key={i} position={[-length / 2 + 0.15 + i * (length - 0.3) / 13, 0.52, 0]} rotation-x={Math.PI / 2} castShadow><cylinderGeometry args={[0.09, 0.09, 0.76, 14]} /><meshStandardMaterial color={colors.silver} metalness={0.78} roughness={0.18} /></mesh>)}</group>
    {[-length / 2 + 0.2, length / 2 - 0.2].flatMap((x) => [-0.36, 0.36].map((z) => <BoxPart key={`${x}-${z}`} position={[x, 0.22, z]} size={[0.08, 0.48, 0.08]} color={colors.steel} metalness={0.68} />))}
    <group ref={parcels}>{[-1.15, 0, 1.15].map((x, i) => <BoxPart key={x} position={[x, 0.73, 0]} size={[0.5, 0.32, 0.48]} color={i === 1 ? colors.yellow : colors.blue} metalness={0.12} roughness={0.5} />)}</group>
  </group>;
}

function RobotCell({ selected }: { selected: boolean }) {
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shoulder.current) shoulder.current.rotation.z = -0.38 + Math.sin(t * 0.8) * 0.2;
    if (elbow.current) elbow.current.rotation.z = 0.72 + Math.sin(t * 0.8 + 0.8) * 0.22;
  });
  return <group>
    <mesh position-y={0.28} castShadow><cylinderGeometry args={[0.62, 0.72, 0.5, 28]} /><meshStandardMaterial color={selected ? colors.cyan : colors.blue} metalness={0.58} roughness={0.25} /></mesh>
    <group ref={shoulder} position={[0, 0.53, 0]} rotation-z={-0.38}>
      <mesh position={[0, 0.83, 0]} castShadow><capsuleGeometry args={[0.22, 1.25, 8, 16]} /><meshStandardMaterial color={colors.yellow} metalness={0.42} roughness={0.3} /></mesh>
      <group ref={elbow} position={[0, 1.58, 0]} rotation-z={0.72}>
        <mesh position={[0, 0.62, 0]} castShadow><capsuleGeometry args={[0.17, 0.92, 8, 16]} /><meshStandardMaterial color={colors.yellow} metalness={0.42} roughness={0.3} /></mesh>
        <mesh position={[0, 1.2, 0]} castShadow><sphereGeometry args={[0.25, 20, 14]} /><meshStandardMaterial color={colors.graphite} metalness={0.72} roughness={0.2} /></mesh>
      </group>
    </group>
    <BoxPart position={[0, 0.06, 0]} size={[2.2, 0.1, 2.2]} color={colors.yellow} roughness={0.72} />
    {[-1.05, 1.05].flatMap((x) => [-1.05, 1.05].map((z) => <BoxPart key={`${x}-${z}`} position={[x, 0.58, z]} size={[0.06, 1.1, 0.06]} color={colors.graphite} metalness={0.7} />))}
  </group>;
}

function InjectionPress({ selected }: { selected: boolean }) {
  const ram = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ram.current) return;
    ram.current.position.y = -0.18 + Math.max(0, Math.sin(clock.elapsedTime * 2.1)) * 0.32;
  });
  return <group>
    <FactoryModel name="machine-window" height={2.35} rotation={[0, Math.PI / 2, 0]} />
    <FactoryModel name="hopper-high-round" height={1.65} position={[1.05, 0, -0.5]} />
    <FactoryModel name="pipe-large-valve" height={1.35} position={[-1.05, 0, 0.55]} rotation={[0, Math.PI / 2, 0]} />
    <group ref={ram}><BoxPart position={[0, 1.28, 0.74]} size={[1.15, 0.22, 0.18]} color={selected ? colors.cyan : colors.yellow} metalness={0.58} roughness={0.22} /></group>
    {selected && <pointLight position={[0, 1.4, 0.8]} color={colors.cyan} intensity={2.2} distance={3} />}
  </group>;
}

function MaterialHandling({ selected }: { selected: boolean }) {
  const auger = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    if (!auger.current) return;
    const delta = Math.min(rawDelta, 0.05);
    auger.current.rotation.x += delta * 4.6;
  });
  return <group>
    <FactoryModel name="hopper-high-round" height={2.75} position={[-0.72, 0, 0]} />
    <FactoryModel name="hopper-high-round" height={2.75} position={[0.72, 0, 0]} />
    <FactoryModel name="catwalk-stairs" height={1.75} position={[1.55, 0, 0.35]} rotation={[0, -Math.PI / 2, 0]} />
    <FactoryModel name="screen-panel-wide" height={0.72} position={[-1.48, 0.65, 0.8]} />
    <group ref={auger} position={[0, 0.82, 0.8]} rotation-z={Math.PI / 2}>
      <mesh castShadow><cylinderGeometry args={[0.12, 0.12, 2.35, 18]} /><meshStandardMaterial color={selected ? colors.cyan : colors.yellow} metalness={0.72} roughness={0.18} /></mesh>
      {[-0.7, 0, 0.7].map((x) => <mesh key={x} position={[0, x, 0]} rotation-y={Math.PI / 2}><torusGeometry args={[0.2, 0.025, 8, 24]} /><meshStandardMaterial color={colors.white} metalness={0.45} roughness={0.25} /></mesh>)}
    </group>
    <BoxPart position={[0, 0.06, 0]} size={[2.7, 0.1, 1.8]} color={colors.blueDark} roughness={0.65} />
    {selected && <pointLight position={[0, 2.2, 0.8]} color={colors.cyan} intensity={2} distance={3} />}
  </group>;
}

function VisionLine({ selected }: { selected: boolean }) {
  const scanner = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!scanner.current) return;
    scanner.current.position.x = THREE.MathUtils.lerp(-0.92, 0.92, (Math.sin(clock.elapsedTime * 2.8) + 1) / 2);
  });
  return <group>
    <FactoryModel name="conveyor-long-stripe-sides" height={0.72} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    <FactoryModel name="scanner-high" height={2.35} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    <FactoryModel name="screen-panel-wide" height={0.82} position={[1.42, 0.75, 0.6]} rotation={[0, -Math.PI / 2, 0]} />
    <mesh ref={scanner} position={[0, 1.28, 0.43]} castShadow>
      <boxGeometry args={[0.08, 1.2, 0.06]} />
      <meshStandardMaterial color={selected ? colors.cyan : colors.blue} emissive={colors.cyan} emissiveIntensity={0.6} metalness={0.25} roughness={0.18} />
    </mesh>
    {selected && <pointLight position={[0, 1.45, 0]} color={colors.cyan} intensity={2.4} distance={3} />}
  </group>;
}

function InteriorMachine({ machine, selected, hovered, onSelect, onHover }: { machine: MachineRecord; selected: boolean; hovered: boolean; onSelect: (id: MachineId) => void; onHover: (id: MachineId | null) => void }) {
  const robot = useRef<THREE.Group>(null);
  const handlers = {
    onClick: (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(machine.id); },
    onPointerDown: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); onSelect(machine.id); },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = "pointer"; onHover(machine.id); },
    onPointerOut: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = "default"; onHover(null); },
  };
  useFrame(({ clock }) => {
    if (!robot.current) return;
    robot.current.rotation.y = Math.sin(clock.elapsedTime * 0.72) * 0.48;
  });
  return <group position={positions[machine.id]} {...handlers}>
    <mesh position={[0, 1.4, 0]} {...handlers} renderOrder={2}>
      <boxGeometry args={[2.35, 2.8, 2.35]} />
      <meshBasicMaterial transparent opacity={selected ? 0.07 : hovered ? 0.05 : 0.001} color={colors.cyan} depthWrite={false} />
    </mesh>

    {machine.id === "cnc" && <MaterialHandling selected={selected} />}
    {machine.id === "press" && <InjectionPress selected={selected} />}
    {machine.id === "robot" && <group><group ref={robot}><FactoryModel name="robot-arm-a" height={2.9} /></group><Conveyor position={[0, 0, 1]} length={2.8} rotation={Math.PI / 2} />{selected && <pointLight position={[0, 1.8, 0]} color={colors.cyan} intensity={2.4} distance={3} />}</group>}
    {machine.id === "inspection" && <VisionLine selected={selected} />}
    <pointLight position={[0, 2.5, 0]} color={colors.blue} intensity={selected ? 1.8 : 0} distance={4} />
  </group>;
}

function StairFlight({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return <group position={position} rotation-y={rotation}>
    {Array.from({ length: 12 }, (_, index) => {
      const progress = index / 11;
      return <BoxPart key={index} position={[0, progress * 3 + 0.11, -1.7 + progress * 3.4]} size={[1.15, 0.16, 0.34]} color={index % 2 ? colors.steel : colors.silver} metalness={0.45} roughness={0.28} />;
    })}
    {[-0.68, 0.68].map((x) => <group key={x} position-x={x} rotation-x={-0.72}><BoxPart position={[0, 1.78, 0]} size={[0.06, 0.06, 4.8]} color={colors.yellow} metalness={0.55} /></group>)}
  </group>;
}

function Escalator({ position }: { position: [number, number, number] }) {
  const steps = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotionPreference();
  useFrame(({ clock }) => {
    if (!steps.current || reducedMotion) return;
    const offset = (clock.elapsedTime * 0.32) % 1;
    steps.current.children.forEach((step, index) => {
      const progress = ((index / 13) + offset) % 1;
      step.position.set(0, progress * 3 + 0.08, -1.65 + progress * 3.3);
    });
  });
  return <group position={position}>
    <group ref={steps}>{Array.from({ length: 14 }, (_, index) => <BoxPart key={index} position={[0, 0, 0]} size={[0.82, 0.12, 0.28]} color={colors.graphite} metalness={0.7} roughness={0.2} />)}</group>
    {[-0.52, 0.52].map((x) => <group key={x} position-x={x} rotation-x={-0.72}><BoxPart position={[0, 1.72, 0]} size={[0.08, 0.14, 4.65]} color={colors.blue} metalness={0.52} /></group>)}
  </group>;
}

function Worker({ position, shirt = colors.blue, phase = 0 }: { position: [number, number, number]; shirt?: string; phase?: number }) {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotionPreference();
  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.position.y = position[1] + Math.abs(Math.sin(clock.elapsedTime * 2.2 + phase)) * 0.025;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.55 + phase) * 0.35;
  });
  return <group ref={group} position={position}>
    <mesh position-y={1.26} castShadow><sphereGeometry args={[0.14, 14, 10]} /><meshStandardMaterial color={colors.yellow} roughness={0.75} /></mesh>
    <mesh position-y={0.86} castShadow><capsuleGeometry args={[0.16, 0.48, 5, 10]} /><meshStandardMaterial color={shirt} roughness={0.52} /></mesh>
    {[-0.09, 0.09].map((x) => <BoxPart key={x} position={[x, 0.31, 0]} size={[0.09, 0.48, 0.1]} color={colors.graphite} roughness={0.62} />)}
    <BoxPart position={[0, 1.42, 0]} size={[0.34, 0.08, 0.32]} color={colors.yellow} roughness={0.54} />
  </group>;
}

function MovingVehicle({ lane, phase, blue = false, speed = 1 }: { lane: number; phase: number; blue?: boolean; speed?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    if (!group.current) return;
    const delta = Math.min(rawDelta, 0.05);
    group.current.position.x += delta * (lane > 0 ? 3.1 : -2.6) * speed;
    if (group.current.position.x > 10.5) group.current.position.x = -10.5;
    if (group.current.position.x < -10.5) group.current.position.x = 10.5;
  });
  return <group ref={group} position={[phase, 0.08, lane]} scale={1.35}><Vehicle position={[0, 0, 0]} blue={blue} rotation={lane > 0 ? 0 : Math.PI} /></group>;
}

function ParkingAndTraffic() {
  return <group>
    <BoxPart position={[0, 0.01, 5.35]} size={[18.5, 0.08, 2.25]} color={colors.asphalt} roughness={0.92} />
    <BoxPart position={[0, 0.055, 5.35]} size={[18, 0.02, 0.06]} color={colors.yellow} cast={false} />
    <MovingVehicle lane={5.78} phase={-8} blue /><MovingVehicle lane={5.78} phase={1.5} speed={0.82} />
    <MovingVehicle lane={4.93} phase={7} /><MovingVehicle lane={4.93} phase={-2.5} blue speed={1.18} />

    <group position={[-5.45, 0.05, 7.05]}>
      <BoxPart position={[0, 0, 0]} size={[6.6, 0.08, 1.65]} color={colors.concreteDark} roughness={0.9} />
      {[-2.55, -1.7, -0.85, 0, 0.85, 1.7, 2.55].map((x) => <BoxPart key={x} position={[x, 0.06, 0]} size={[0.04, 0.03, 1.35]} color={colors.white} cast={false} />)}
      <Vehicle position={[-2.12, 0.08, 0]} blue rotation={Math.PI / 2} /><Vehicle position={[-0.42, 0.08, 0]} rotation={Math.PI / 2} /><Vehicle position={[2.12, 0.08, 0]} blue rotation={Math.PI / 2} />
    </group>
    <group position={[5.6, 0.05, 6.95]}><BoxPart position={[0, 0.08, 0]} size={[4.6, 0.12, 1.45]} color={colors.concreteDark} /><BoxPart position={[0, 0.3, -0.72]} size={[4.6, 0.45, 0.12]} color={colors.yellow} /><Vehicle position={[0.9, 0.08, 0]} blue rotation={Math.PI / 2} /></group>
  </group>;
}

function FactoryUnit({ mode }: { mode: ViewMode }) {
  const exterior = mode === "exterior";
  return <group>
    <ParkingAndTraffic />
    <GateTraffic inside={exterior ? 4.6 : 1.35} />

    {/* A purpose-built two-storey production hall: open cutaway, glazed spine, service core and loading court. */}
    <BoxPart position={[0, -0.18, 0]} size={[17.8, 0.32, 9.5]} color={colors.concreteDark} roughness={0.96} />
    <BoxPart position={[0, 0.02, 0]} size={[17.2, 0.12, 8.9]} color={colors.white} roughness={0.82} />

    {/* Rear glazed wall with a precise structural rhythm. */}
    <BoxPart position={[0, 3.8, -4.35]} size={[16.9, 7.45, 0.12]} color={colors.glass} metalness={0.28} roughness={0.12} />
    {[-8.3, -6.2, -4.1, -2.05, 0, 2.05, 4.1, 6.2, 8.3].map((x) => <BoxPart key={`column-${x}`} position={[x, 3.8, -4.22]} size={[0.18, 7.6, 0.2]} color={colors.graphite} metalness={0.72} roughness={0.18} />)}
    {[0.2, 3.2, 7.42].map((y) => <BoxPart key={`beam-${y}`} position={[0, y, -4.2]} size={[17, 0.18, 0.22]} color={y === 3.2 ? colors.blue : colors.graphite} metalness={0.68} roughness={0.2} />)}
    {[-7.2, -3.1, 1.1, 5.25].map((x) => <group key={`glass-${x}`} position={[x, 4.9, -4.08]}>
      <BoxPart position={[0, 0, 0]} size={[1.82, 2.08, 0.05]} color={colors.cyan} metalness={0.34} roughness={0.08} />
      <BoxPart position={[0, 0, 0.04]} size={[0.05, 2.08, 0.04]} color={colors.white} metalness={0.55} roughness={0.2} />
    </group>)}

    {/* Upper production floor occupies the right wing, making both levels readable at once. */}
    <BoxPart position={[3.9, 3.18, -0.35]} size={[9.05, 0.34, 7.55]} color={colors.concreteDark} roughness={0.76} />
    <BoxPart position={[3.9, 3.39, -0.35]} size={[8.8, 0.1, 7.3]} color={colors.white} roughness={0.7} />
    {[-0.4, 1.75, 3.9, 6.05, 8.18].map((x) => <BoxPart key={`upper-support-${x}`} position={[x, 1.62, -3.9]} size={[0.18, 3.2, 0.18]} color={colors.blueDark} metalness={0.7} roughness={0.18} />)}

    {/* Safety edge, stairs, moving escalator and service lift form a clear circulation core. */}
    <BoxPart position={[3.9, 3.56, 3.22]} size={[8.8, 0.12, 0.12]} color={colors.yellow} metalness={0.42} roughness={0.28} />
    <BoxPart position={[3.9, 4.25, 3.22]} size={[8.8, 0.08, 0.08]} color={colors.yellow} metalness={0.42} roughness={0.28} />
    {Array.from({ length: 9 }, (_, i) => <BoxPart key={`upper-rail-${i}`} position={[-0.35 + i * 1.06, 3.9, 3.22]} size={[0.07, 0.78, 0.07]} color={colors.yellow} metalness={0.5} />)}
    <group position={[-4.25, 0, 1.75]}><StairFlight position={[0, 0.08, 0]} rotation={Math.PI / 2} /></group>
    <group position={[-2.1, 0, 1.5]}><Escalator position={[0, 0.08, 0]} /></group>
    <group position={[-7.15, 0, -2.65]}>
      <BoxPart position={[0, 2.15, 0]} size={[1.72, 4.25, 1.55]} color={colors.blueDark} metalness={0.32} roughness={0.28} />
      <BoxPart position={[0, 1.75, 0.8]} size={[1.12, 2.6, 0.08]} color={colors.glass} metalness={0.38} roughness={0.1} />
      <BoxPart position={[0, 4.45, 0]} size={[2.05, 0.22, 1.86]} color={colors.blue} metalness={0.55} roughness={0.2} />
    </group>

    {/* Lightweight saw-tooth roof gives the unit an unmistakable industrial silhouette. */}
    {exterior && [-6.5, -2.2, 2.2, 6.5].map((x, index) => <group key={`roof-bay-${x}`} position={[x, 7.45, -0.35]}>
      <BoxPart position={[0, 0, 0]} size={[4.08, 0.14, 7.72]} color={index % 2 ? colors.silver : colors.white} metalness={0.48} roughness={0.25} />
      <BoxPart position={[-1.72, 0.62, 0]} size={[0.1, 1.25, 7.55]} color={colors.blue} metalness={0.66} roughness={0.16} />
      <BoxPart position={[-0.82, 0.92, 0]} size={[1.65, 0.08, 7.5]} color={colors.glass} metalness={0.3} roughness={0.08} />
    </group>)}
    {[-8.28, 8.28].map((x) => <group key={`corner-${x}`}>
      <BoxPart position={[x, 3.78, -4.2]} size={[0.22, 7.55, 0.22]} color={colors.graphite} metalness={0.74} roughness={0.18} />
      <BoxPart position={[x, 3.78, 4.12]} size={[0.22, 7.55, 0.22]} color={colors.graphite} metalness={0.74} roughness={0.18} />
    </group>)}

    {/* Utilities and loading equipment add recognizable industrial detail beyond rectangular shells. */}
    <group position={[-7.2, 0.05, 3.55]}><Silo position={[-0.7, 0, 0]} scale={1.1} /><Silo position={[0.7, 0, 0]} scale={1.1} /><Pipe position={[0, 2.55, 0]} length={2.2} color={colors.cyan} /></group>
    <group position={[7.2, 0.05, -1.8]}><PipeRack /></group>
    {exterior && <group position={[5.9, 6.92, -0.8]}><RoofPlant position={[-1.4, 0, 0]} tall blue /><RoofPlant position={[0, 0, 0.45]} /><RoofPlant position={[1.4, 0, 0]} tall /></group>}
    {exterior && <>
      <BoxPart position={[6.45, 1.3, 4.08]} size={[3.25, 2.35, 0.18]} color={colors.graphite} metalness={0.55} roughness={0.22} />
      {[-0.98, 0, 0.98].map((x) => <BoxPart key={`dock-${x}`} position={[6.45 + x, 1.32, 4.2]} size={[0.72, 1.45, 0.08]} color={colors.blue} metalness={0.42} roughness={0.18} />)}
    </>}
    <BoxPart position={[6.45, 0.18, 5.0]} size={[4.1, 0.16, 1.45]} color={colors.concrete} roughness={0.88} cast={false} />

    <Worker position={[-5.7, 0.12, 1.5]} phase={0.2} />
    <Worker position={[-2.55, 0.12, 0.45]} shirt={colors.yellow} phase={1.4} />
    <Worker position={[2.65, 3.34, 1.75]} phase={2.1} />
    <Worker position={[5.75, 3.34, -1.6]} shirt={colors.cyan} phase={3.2} />

    {!exterior && <>
      {[-5.6, -1.9, 1.9, 5.6].map((x) => <group key={`light-${x}`} position={[x, 6.8, -0.25]}><Pipe position={[0, 0, 0]} length={6.8} rotation={[Math.PI / 2, 0, 0]} radius={0.055} color={colors.white} /><pointLight position={[0, -0.45, 0]} color="#eaf5ff" intensity={5.5} distance={5} /></group>)}
      <Conveyor position={[-3.75, 0, 2.55]} length={5.7} />
      <Conveyor position={[4.2, 3.22, 2.55]} length={5.85} />
      <BoxPart position={[-3.8, 0.11, 1.15]} size={[6.9, 0.03, 0.09]} color={colors.yellow} cast={false} />
    </>}

    {exterior && <>
      <BoxPart position={[0, 3.75, 4.1]} size={[16.65, 7.35, 0.18]} color={colors.white} roughness={0.34} />
      {[-6.3, -3.15, 0, 3.15].map((x) => <BoxPart key={`facade-glass-${x}`} position={[x, 4.2, 4.22]} size={[2.48, 2.55, 0.07]} color={colors.glass} metalness={0.3} roughness={0.08} />)}
      <BoxPart position={[0, 5.62, 4.24]} size={[16.5, 0.22, 0.1]} color={colors.blue} metalness={0.54} roughness={0.2} />
      <BoxPart position={[-5.8, 1.3, 4.24]} size={[2.5, 2.35, 0.12]} color={colors.graphite} metalness={0.54} roughness={0.2} />
    </>}
  </group>;
}

function BoxPart({ position, size, color, metalness = 0.12, roughness = 0.55, cast = true }: { position: [number, number, number]; size: [number, number, number]; color: string; metalness?: number; roughness?: number; cast?: boolean }) {
  return <mesh position={position} castShadow={cast} receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>;
}

const factoryModelPath = (name: string) => `/models/factory/${name}.glb`;

function FactoryModel({ name, position = [0, 0, 0], rotation = [0, 0, 0], height = 1 }: { name: string; position?: [number, number, number]; rotation?: [number, number, number]; height?: number }) {
  const { scene } = useGLTF(factoryModelPath(name));
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    clone.scale.setScalar(height / (size.y || 1));
    const scaled = new THREE.Box3().setFromObject(clone);
    const center = scaled.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -scaled.min.y, -center.z);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [height, scene]);
  return <group position={position} rotation={rotation}><primitive object={object} /></group>;
}

function FactoryAssetLoader() {
  return <Html center><div className="border border-foreground/15 bg-background px-4 py-3 text-xs font-semibold text-foreground shadow-xl">Loading factory equipment</div></Html>;
}

function Pipe({ position, length, rotation = [0, 0, Math.PI / 2], radius = 0.055, color = colors.blue }: { position: [number, number, number]; length: number; rotation?: [number, number, number]; radius?: number; color?: string }) {
  return <mesh position={position} rotation={rotation} castShadow><cylinderGeometry args={[radius, radius, length, 16]} /><meshStandardMaterial color={color} metalness={0.72} roughness={0.24} /></mesh>;
}

function RoofPlant({ position, tall = false, blue = false }: { position: [number, number, number]; tall?: boolean; blue?: boolean }) {
  return <group position={position}>
    <BoxPart position={[0, 0.16, 0]} size={[0.56, 0.32, 0.68]} color={blue ? colors.blue : colors.silver} metalness={0.62} roughness={0.26} />
    <mesh position={[0, tall ? 0.62 : 0.42, 0]} castShadow><cylinderGeometry args={[0.15, 0.19, tall ? 0.9 : 0.45, 20]} /><meshStandardMaterial color={colors.graphite} metalness={0.72} roughness={0.22} /></mesh>
    <mesh position={[0, tall ? 1.08 : 0.68, 0]} castShadow><cylinderGeometry args={[0.23, 0.14, 0.12, 20]} /><meshStandardMaterial color={colors.silver} metalness={0.7} roughness={0.2} /></mesh>
  </group>;
}

function GableRoof({ width, depth, height, color = colors.graphite }: { width: number; depth: number; height: number; color?: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(width / 2, 0.08);
    shape.lineTo(0, height);
    shape.lineTo(-width / 2, 0.08);
    shape.closePath();
    const result = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    result.translate(0, 0, -depth / 2);
    result.computeVertexNormals();
    return result;
  }, [depth, height, width]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh castShadow receiveShadow><primitive object={geometry} attach="geometry" /><meshStandardMaterial color={color} metalness={0.52} roughness={0.3} /></mesh>;
}

function SteelFrame({ width, height, depth }: { width: number; height: number; depth: number }) {
  const xs = [-width / 2, 0, width / 2];
  return <group>
    {xs.map((x) => <group key={x} position-x={x}>
      <BoxPart position={[0, height / 2, -depth / 2]} size={[0.09, height, 0.09]} color={colors.graphite} metalness={0.76} roughness={0.2} />
      <BoxPart position={[0, height / 2, depth / 2]} size={[0.09, height, 0.09]} color={colors.graphite} metalness={0.76} roughness={0.2} />
      <BoxPart position={[0, height, 0]} size={[0.09, 0.09, depth]} color={colors.graphite} metalness={0.76} roughness={0.2} />
    </group>)}
    <BoxPart position={[0, height, -depth / 2]} size={[width, 0.09, 0.09]} color={colors.graphite} metalness={0.76} roughness={0.2} />
    <BoxPart position={[0, height, depth / 2]} size={[width, 0.09, 0.09]} color={colors.graphite} metalness={0.76} roughness={0.2} />
  </group>;
}

function CoolingTower({ position, blue = false }: { position: [number, number, number]; blue?: boolean }) {
  return <group position={position}>
    <mesh position-y={0.72} castShadow><cylinderGeometry args={[0.46, 0.58, 1.32, 24]} /><meshStandardMaterial color={blue ? colors.blue : colors.silver} metalness={0.5} roughness={0.28} /></mesh>
    <mesh position-y={1.42} castShadow><cylinderGeometry args={[0.58, 0.45, 0.18, 24]} /><meshStandardMaterial color={colors.graphite} metalness={0.7} roughness={0.2} /></mesh>
    <mesh position-y={1.54} rotation-x={Math.PI / 2}><torusGeometry args={[0.32, 0.045, 8, 24]} /><meshStandardMaterial color={colors.cyan} metalness={0.5} roughness={0.2} /></mesh>
  </group>;
}

function SawtoothFactory() {
  return <group>
    <BoxPart position={[0, 1.12, 0]} size={[4.85, 2.12, 3.4]} color={colors.white} roughness={0.36} />
    {[-1.78, -0.58, 0.62, 1.82].map((x) => <group key={x} position={[x, 2.18, 0]}>
      <GableRoof width={1.16} depth={3.46} height={0.58} color={colors.steel} />
      <BoxPart position={[-0.29, 0.33, 0]} size={[0.5, 0.58, 3.48]} color={colors.glass} metalness={0.34} roughness={0.14} />
    </group>)}
    {[-1.85, -0.92, 0, 0.92, 1.85].map((x) => <BoxPart key={x} position={[x, 1.25, 1.73]} size={[0.09, 2.35, 0.1]} color={colors.graphite} metalness={0.56} roughness={0.25} />)}
    {[-1.38, -0.46, 0.46, 1.38].map((x, i) => <BoxPart key={x} position={[x, 1.25, 1.79]} size={[0.76, 1.42, 0.08]} color={i === 1 ? colors.blue : colors.glass} metalness={0.42} roughness={0.18} />)}
    <BoxPart position={[0, 0.28, 1.84]} size={[4.3, 0.2, 0.16]} color={colors.yellow} roughness={0.66} />
  </group>;
}

function PipeRack() {
  return <group>
    <SteelFrame width={4.1} height={1.55} depth={0.85} />
    {[1.1, 1.32, 1.52].map((y, i) => <Pipe key={y} position={[0, y, -0.23 + i * 0.23]} length={4.05} color={i === 1 ? colors.yellow : i === 2 ? colors.cyan : colors.blue} />)}
  </group>;
}

function DetailedHall({ size, bays, blueBand = false }: { size: [number, number, number]; bays: number; blueBand?: boolean }) {
  const [w, h, d] = size;
  return <group>
    <BoxPart position={[0, 0.09, 0]} size={[w + 0.32, 0.18, d + 0.32]} color={colors.concreteDark} />
    <BoxPart position={[0, h / 2 + 0.16, 0]} size={[w, h, d]} color={colors.white} roughness={0.38} />
    <BoxPart position={[0, h + 0.22, 0]} size={[w + 0.16, 0.18, d + 0.16]} color={colors.graphite} metalness={0.42} roughness={0.28} />
    {blueBand && <BoxPart position={[0, h * 0.72, d / 2 + 0.045]} size={[w, 0.22, 0.08]} color={colors.blue} metalness={0.35} roughness={0.28} />}
    {Array.from({ length: bays + 1 }, (_, i) => {
      const x = -w / 2 + i * w / bays;
      return <BoxPart key={`post-${i}`} position={[x, h / 2 + 0.16, d / 2 + 0.07]} size={[0.075, h, 0.11]} color={colors.graphite} metalness={0.52} roughness={0.28} />;
    })}
    {Array.from({ length: bays }, (_, i) => {
      const x = -w / 2 + w / bays / 2 + i * w / bays;
      return <group key={`bay-${i}`}>
        <BoxPart position={[x, h * 0.68, d / 2 + 0.075]} size={[w / bays - 0.18, h * 0.3, 0.09]} color={colors.glass} metalness={0.28} roughness={0.16} />
        <BoxPart position={[x, 0.56, d / 2 + 0.085]} size={[w / bays - 0.24, 0.72, 0.1]} color={i === 0 ? colors.blue : colors.steel} metalness={0.54} roughness={0.28} />
      </group>;
    })}
    {Array.from({ length: Math.max(4, bays + 1) }, (_, i) => {
      const x = -w / 2 + 0.25 + i * (w - 0.5) / (Math.max(4, bays + 1) - 1);
      return <BoxPart key={`seam-${i}`} position={[x, h + 0.325, 0]} size={[0.045, 0.035, d + 0.08]} color={colors.silver} metalness={0.68} roughness={0.22} />;
    })}
  </group>;
}

function Silo({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    {([[-0.27, -0.27], [0.27, -0.27], [-0.27, 0.27], [0.27, 0.27]] as Array<[number, number]>).map(([x, z], i) => <BoxPart key={i} position={[x, 0.22, z]} size={[0.07, 0.44, 0.07]} color={colors.graphite} metalness={0.7} />)}
    <mesh position-y={0.95} castShadow><cylinderGeometry args={[0.48, 0.48, 1.46, 28]} /><meshStandardMaterial color={colors.white} metalness={0.5} roughness={0.24} /></mesh>
    <mesh position-y={1.72} castShadow><coneGeometry args={[0.48, 0.3, 28]} /><meshStandardMaterial color={colors.silver} metalness={0.64} roughness={0.2} /></mesh>
    {[0.42, 0.92, 1.4].map((y) => <mesh key={y} position-y={y}><torusGeometry args={[0.5, 0.025, 8, 32]} /><meshStandardMaterial color={colors.graphite} metalness={0.76} roughness={0.2} /></mesh>)}
    <BoxPart position={[0.42, 1.08, 0]} size={[0.045, 1.44, 0.06]} color={colors.graphite} metalness={0.78} />
    {[0.58, 0.86, 1.14, 1.42].map((y) => <BoxPart key={y} position={[0.45, y, 0]} size={[0.18, 0.025, 0.05]} color={colors.graphite} metalness={0.75} />)}
  </group>;
}

function Tree({ position }: { position: [number, number, number] }) {
  return <group position={position}><mesh position-y={0.38} castShadow><cylinderGeometry args={[0.06, 0.08, 0.75, 10]} /><meshStandardMaterial color={colors.graphite} /></mesh><mesh position-y={1.02} castShadow><icosahedronGeometry args={[0.42, 1]} /><meshStandardMaterial color={colors.grass} roughness={0.86} /></mesh></group>;
}

function Vehicle({ position, blue = false, rotation = 0 }: { position: [number, number, number]; blue?: boolean; rotation?: number }) {
  return <group position={position} rotation-y={rotation}>
    <BoxPart position={[0, 0.25, 0]} size={[0.88, 0.28, 0.42]} color={blue ? colors.blue : colors.white} metalness={0.28} roughness={0.32} />
    <BoxPart position={[-0.18, 0.46, 0]} size={[0.36, 0.22, 0.38]} color={colors.glass} metalness={0.3} roughness={0.16} />
    {[-0.3, 0.3].flatMap((x) => [-0.22, 0.22].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.14, z]} rotation-x={Math.PI / 2}><cylinderGeometry args={[0.1, 0.1, 0.06, 14]} /><meshStandardMaterial color={colors.graphite} /></mesh>))}
  </group>;
}

function Facility({ machine, selected, hovered, onSelect, onHover }: { machine: MachineRecord; selected: boolean; hovered: boolean; onSelect: (id: MachineId) => void; onHover: (id: MachineId | null) => void }) {
  const handlers = {
    onClick: (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onSelect(machine.id); },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = "pointer"; onHover(machine.id); },
    onPointerOut: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = "default"; onHover(null); },
  };
  const accent = selected ? colors.blue : hovered ? colors.cyan : colors.silver;
  return <group position={positions[machine.id]} {...handlers}>
    {/* Machine-scale equipment: a work pad plus the machine itself, never a building. */}
    <BoxPart position={[0, 0.05, 0]} size={[2.65, 0.1, 2.1]} color={selected ? colors.blue : hovered ? colors.cyan : colors.concrete} roughness={0.84} cast={false} />
    {machine.id === "cnc" && <>
      <BoxPart position={[0, 0.55, 0]} size={[2.1, 0.9, 1.5]} color={colors.white} metalness={0.28} roughness={0.38} />
      <BoxPart position={[0, 1.32, 0]} size={[1.85, 0.66, 1.34]} color={colors.graphite} metalness={0.66} roughness={0.22} />
      <BoxPart position={[0, 1.32, 0.7]} size={[1.25, 0.5, 0.05]} color={colors.glass} metalness={0.35} roughness={0.1} />
      <BoxPart position={[0, 1.72, 0]} size={[1.9, 0.12, 1.4]} color={accent} metalness={0.6} roughness={0.2} />
      <BoxPart position={[1.16, 0.75, 0.55]} size={[0.28, 0.5, 0.32]} color={colors.blueDark} metalness={0.5} roughness={0.25} />
    </>}
    {machine.id === "press" && <>
      <BoxPart position={[0, 0.42, 0]} size={[1.85, 0.64, 1.45]} color={colors.graphite} metalness={0.62} roughness={0.25} />
      {[-0.68, 0.68].map((x) => <BoxPart key={x} position={[x, 1.42, 0]} size={[0.24, 1.98, 0.24]} color={colors.steel} metalness={0.72} roughness={0.18} />)}
      <BoxPart position={[0, 2.42, 0]} size={[1.85, 0.45, 1.35]} color={accent} metalness={0.6} roughness={0.2} />
      <BoxPart position={[0, 1.55, 0]} size={[1.25, 0.4, 1.05]} color={colors.blueDark} metalness={0.55} roughness={0.22} />
      <Pipe position={[0, 2.78, -0.5]} length={2.1} color={colors.cyan} />
    </>}
    {machine.id === "robot" && <>
      <mesh position={[0, 0.22, 0]} castShadow><cylinderGeometry args={[0.52, 0.62, 0.34, 24]} /><meshStandardMaterial color={colors.graphite} metalness={0.7} roughness={0.2} /></mesh>
      <mesh position={[0, 0.85, 0]} castShadow><cylinderGeometry args={[0.28, 0.34, 0.95, 20]} /><meshStandardMaterial color={accent} metalness={0.55} roughness={0.22} /></mesh>
      <group position={[0, 1.35, 0]} rotation-z={-0.62}><BoxPart position={[0, 0.55, 0]} size={[0.26, 1.2, 0.26]} color={colors.white} metalness={0.4} roughness={0.28} /></group>
      <group position={[-0.62, 2.0, 0]} rotation-z={0.85}><BoxPart position={[0, 0.42, 0]} size={[0.2, 0.95, 0.2]} color={colors.silver} metalness={0.55} roughness={0.22} /></group>
      <BoxPart position={[-0.12, 2.42, 0]} size={[0.28, 0.2, 0.3]} color={colors.yellow} metalness={0.5} roughness={0.25} />
      {[-1.05, 1.05].map((x) => <BoxPart key={x} position={[x, 0.6, 0]} size={[0.08, 1.1, 1.9]} color={colors.glass} metalness={0.3} roughness={0.1} cast={false} />)}
    </>}
    {machine.id === "inspection" && <>
      <BoxPart position={[0, 0.36, 0]} size={[2.35, 0.52, 0.85]} color={colors.graphite} metalness={0.6} roughness={0.25} />
      <BoxPart position={[0, 0.66, 0]} size={[2.25, 0.1, 0.7]} color={colors.steel} metalness={0.75} roughness={0.15} />
      {[-0.95, 0.95].map((x) => <BoxPart key={x} position={[x, 1.28, 0]} size={[0.16, 1.7, 0.16]} color={colors.steel} metalness={0.72} roughness={0.18} />)}
      <BoxPart position={[0, 2.08, 0]} size={[2.2, 0.16, 0.3]} color={accent} metalness={0.6} roughness={0.2} />
      <BoxPart position={[0.3, 1.82, 0]} size={[0.42, 0.42, 0.42]} color={colors.blueDark} metalness={0.5} roughness={0.22} />
      <BoxPart position={[-1.24, 1.0, 0]} size={[0.4, 1.9, 0.62]} color={colors.white} metalness={0.3} roughness={0.34} />
      <BoxPart position={[-1.24, 1.5, 0.33]} size={[0.3, 0.42, 0.04]} color={colors.glass} metalness={0.35} roughness={0.1} />
    </>}
    <pointLight position={[0, 2.6, 0]} color={colors.blue} intensity={selected ? 1.2 : 0} distance={4.5} />
  </group>;
}

function CampusGround() {
  return <group>
    <BoxPart position={[0, -0.35, 0]} size={[19.5, 0.65, 15]} color={colors.concreteDark} roughness={0.92} />
    <BoxPart position={[0, 0, 0]} size={[18.8, 0.06, 14.3]} color={colors.concrete} roughness={0.9} />
    <BoxPart position={[0, 0.06, 0.2]} size={[18.1, 0.08, 1.5]} color={colors.asphalt} roughness={0.88} />
    <BoxPart position={[0.25, 0.062, 0.2]} size={[0.08, 0.09, 1.5]} color={colors.yellow} roughness={0.7} />
    <BoxPart position={[-5.1, 0.055, 3.3]} size={[1.25, 0.07, 5.3]} color={colors.asphalt} roughness={0.9} />
    <BoxPart position={[4.7, 0.055, 3.45]} size={[1.35, 0.07, 5.4]} color={colors.asphalt} roughness={0.9} />
    <BoxPart position={[-1.1, 0.08, 5.65]} size={[6.8, 0.06, 0.62]} color={colors.blueDark} roughness={0.8} />
    {[-8.45, -6.6, -2.1, 1.2, 7.9].map((x, i) => <Tree key={x} position={[x, 0.08, i % 2 ? 6.35 : -6.3]} />)}
    <Vehicle position={[-0.8, 0.12, 0.2]} blue /><Vehicle position={[6.4, 0.12, 0.2]} />
    {[-8.2, -3.5, 1.1, 6.8].map((x, i) => <group key={`lamp-${x}`} position={[x, 0.05, i % 2 ? -0.85 : 1.15]}><mesh position-y={1.35} castShadow><cylinderGeometry args={[0.025, 0.04, 2.7, 10]} /><meshStandardMaterial color={colors.graphite} metalness={0.7} /></mesh><BoxPart position={[0.18, 2.68, 0]} size={[0.36, 0.08, 0.16]} color={colors.white} metalness={0.45} /></group>)}
    <BoxPart position={[0, 0.42, -6.65]} size={[18.6, 0.72, 0.12]} color={colors.graphite} metalness={0.2} roughness={0.46} />
    {Array.from({ length: 18 }, (_, i) => <BoxPart key={`fence-${i}`} position={[-8.6 + i, 0.78, -6.65]} size={[0.035, 0.72, 0.08]} color={colors.silver} metalness={0.7} />)}
  </group>;
}

function ExteriorHotspot({ machine, selected, hovered, onSelect, onHover }: { machine: MachineRecord; selected: boolean; hovered: boolean; onSelect: (id: MachineId) => void; onHover: (id: MachineId | null) => void }) {
  const x = positions[machine.id][0];
  return <group position={[x, 0, 0]}>
    <mesh
      position={[0, 2.7, 3.72]}
      onClick={(event) => { event.stopPropagation(); onSelect(machine.id); }}
      onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = "pointer"; onHover(machine.id); }}
      onPointerOut={(event) => { event.stopPropagation(); document.body.style.cursor = "default"; onHover(null); }}
    >
      <boxGeometry args={[2.7, 4.6, 0.28]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  </group>;
}

function FactoryScene({ selected, onSelect, viewMode, zoom, spin, webgpu }: { selected: MachineId; onSelect: (id: MachineId) => void; viewMode: ViewMode; zoom: number; spin: number; webgpu: boolean }) {
  const [hovered, setHovered] = useState<MachineId | null>(null);
  return <>
    <color attach="background" args={["#dce3e8"]} />
    <fog attach="fog" args={["#dce3e8", 42, 64]} />
    <hemisphereLight args={["#ffffff", "#5a6670", webgpu ? 1.45 : 1.05]} />
    <ambientLight intensity={webgpu ? 0.65 : 0.3} />
    <directionalLight position={[-9, 17, 10]} intensity={3.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.00012} shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={10} shadow-camera-bottom={-10} />
    {webgpu
      ? <><directionalLight position={[11, 9, 8]} intensity={1.1} /><directionalLight position={[0, 6, -12]} intensity={0.55} color="#438fff" /></>
      : <Environment><Lightformer intensity={1.5} position={[0, 12, 2]} scale={[16, 12, 1]} /><Lightformer intensity={0.75} color="#438fff" position={[-10, 4, 1]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} /><Lightformer intensity={0.55} position={[10, 5, 4]} rotation-y={-Math.PI / 2} scale={[9, 3, 1]} /></Environment>}
    <FactoryUnit mode={viewMode} />
    {viewMode === "cutaway" && <Suspense fallback={<FactoryAssetLoader />}>{machines.map((machine) => <InteriorMachine key={machine.id} machine={machine} selected={selected === machine.id} hovered={hovered === machine.id} onSelect={onSelect} onHover={setHovered} />)}<FactoryModel name="crane" height={2.8} position={[0, 0, -2.35]} /><FactoryModel name="crane-lift" height={1.1} position={[2.2, 0, -2.35]} /></Suspense>}
    {viewMode === "exterior" && machines.map((machine) => <ExteriorHotspot key={machine.id} machine={machine} selected={selected === machine.id} hovered={hovered === machine.id} onSelect={onSelect} onHover={setHovered} />)}
    {!webgpu && <ContactShadows position={[0, 0.02, 0]} opacity={0.34} scale={40} blur={2.4} far={16} resolution={1024} color="#3d4a55" />}
    <OrbitControls makeDefault enableDamping dampingFactor={0.08} enableRotate enablePan minDistance={10} maxDistance={40} minPolarAngle={0.34} maxPolarAngle={1.42} target={[0, 2.35, 0.4]} />
    <ZoomRig zoom={zoom} />
    <RotateRig spin={spin} />
  </>;
}

const hotspots: Record<ViewMode, Record<MachineId, { x: number; y: number }>> = {
  cutaway: { cnc: { x: 19, y: 62 }, press: { x: 40, y: 55 }, robot: { x: 60, y: 53 }, inspection: { x: 80, y: 61 } },
  exterior: { cnc: { x: 22, y: 52 }, press: { x: 42, y: 45 }, robot: { x: 61, y: 47 }, inspection: { x: 79, y: 55 } },
};

function FactoryFallback({ viewMode, zoom, selectedId, onSelect }: { viewMode: ViewMode; zoom: number; selectedId: MachineId; onSelect: (id: MachineId) => void }) {
  const src = viewMode === "exterior" ? factoryExteriorPreview : factoryCutawayPreview;
  const points = hotspots[viewMode];
  return <div className="absolute inset-0 overflow-hidden bg-muted">
    <div className="absolute inset-0 origin-center transition-transform duration-500 ease-out" style={{ transform: `scale(${zoom})` }}>
      <img src={src} alt={viewMode === "exterior" ? "Detailed exterior view of the connected factory unit" : "Detailed interior cutaway with connected production machinery"} className="size-full object-cover object-center" />
      {machines.map((machine) => {
        const point = points[machine.id];
        return <button
          key={machine.id}
          type="button"
          aria-pressed={selectedId === machine.id}
          onClick={() => onSelect(machine.id)}
          style={{ left: `${point.x}%`, top: `${point.y}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})` }}
          className="absolute z-10 size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent"
        >
          <span className="sr-only">{machine.station} {machine.shortName}</span>

        </button>;
      })}
    </div>
  </div>;
}

const predictions: Record<MachineId, { risk: number; window: string; driver: string; confidence: string; forecast: { label: string; value: string }[] }> = {
  cnc: { risk: 12, window: "No intervention needed for 21 days", driver: "Feed-screw wear trending flat", confidence: "94% model confidence", forecast: [{ label: "Failure risk (7d)", value: "3%" }, { label: "Throughput drift", value: "-0.4%" }, { label: "Next service", value: "in 21 days" }, { label: "Spare parts", value: "In stock" }] },
  press: { risk: 68, window: "Service window: Thu 02:00 - 04:30", driver: "Cooling-loop temperature rising 0.8°C/day", confidence: "89% model confidence", forecast: [{ label: "Failure risk (7d)", value: "31%" }, { label: "Vibration trend", value: "+0.4 mm/s" }, { label: "Next service", value: "in 3 days" }, { label: "Spare parts", value: "Seal kit ready" }] },
  robot: { risk: 19, window: "No intervention needed for 14 days", driver: "Gripper cycle time stable", confidence: "92% model confidence", forecast: [{ label: "Failure risk (7d)", value: "5%" }, { label: "Cycle drift", value: "+0.2 sec" }, { label: "Next service", value: "in 14 days" }, { label: "Spare parts", value: "In stock" }] },
  inspection: { risk: 8, window: "No intervention needed for 30 days", driver: "Camera calibration within tolerance", confidence: "97% model confidence", forecast: [{ label: "Failure risk (7d)", value: "2%" }, { label: "False-reject drift", value: "-0.1%" }, { label: "Next service", value: "in 30 days" }, { label: "Spare parts", value: "In stock" }] },
};

const orchestrations: Record<MachineId, { title: string; detail: string; impact: string }[]> = {
  cnc: [
    { title: "Rebalance feed rate", detail: "Match metering to injection demand", impact: "+2.1% line throughput" },
    { title: "Pre-stage batch AN-291", detail: "Release feedstock to molding buffer", impact: "-6 min changeover" },
    { title: "Shift silo draw", detail: "Move draw to silo B for moisture balance", impact: "Quality risk down" },
  ],
  press: [
    { title: "Reserve maintenance window", detail: "Lock Thu 02:00 slot and notify crew", impact: "Avoids unplanned stop" },
    { title: "Shift load to cells 5-8", detail: "Reduce duty on drifting cooling loop", impact: "-1.2°C loop temp" },
    { title: "Order seal kit", detail: "Release spare from plant inventory", impact: "Parts on site in 12h" },
  ],
  robot: [
    { title: "Route batch AN-284", detail: "Send finished batch to packaging", impact: "-4 min queue" },
    { title: "Sync cadence with press", detail: "Align transfer to molding cycle", impact: "+1.4% OEE" },
    { title: "Schedule gripper check", detail: "Add to next planned stop", impact: "No downtime cost" },
  ],
  inspection: [
    { title: "Tighten edge tolerance", detail: "Raise variance threshold for batch AN-284", impact: "Escapes risk down" },
    { title: "Release passed units", detail: "Push cleared pallets to dispatch", impact: "Dispatch 18 min earlier" },
    { title: "Flag recurring defect", detail: "Send pattern back to molding", impact: "Root cause visible" },
  ],
};

function MachineReadout({ machine, activeLayer }: { machine: MachineRecord; activeLayer: number }) {
  const live = useLiveMachineStats(machine, activeLayer);
  const [dispatched, setDispatched] = useState<string | null>(null);
  useEffect(() => { setDispatched(null); }, [machine.id, activeLayer]);
  const stats = [
    { icon: Gauge, label: "Output", value: live.output }, { icon: Thermometer, label: "Temperature", value: live.temperature },
    { icon: Waves, label: "Vibration", value: live.vibration }, { icon: Timer, label: "Cycle", value: live.cycle },
    { icon: Activity, label: "OEE", value: live.oee }, { icon: Zap, label: "Energy", value: live.energy },
  ];
  const prediction = predictions[machine.id];
  const actions = orchestrations[machine.id];
  const layerName = layers[activeLayer]?.name ?? "Mirror";
  return <aside key={machine.id} className="factory-readout bg-foreground p-6 text-background lg:p-7" aria-live="polite">
    <div className="flex items-center justify-between gap-4"><span className="text-[10px] font-semibold text-primary">{machine.station} / {layerName.toUpperCase()}</span><span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold ${machine.status === "Attention" ? "bg-chart-4 text-foreground" : "bg-primary text-primary-foreground"}`}>{machine.status === "Attention" ? <AlertTriangle className="size-3" /> : <Activity className="size-3" />}{machine.status}</span></div>
    <h3 className="mt-5 text-2xl font-semibold leading-tight">{machine.name}</h3>
    <p className="mt-3 text-sm leading-relaxed text-background/85">{machine.role}</p>

    {activeLayer === 0 && <>
      <p className="mt-4 border-l-2 border-primary pl-4 text-sm font-semibold leading-snug">{machine.condition}</p>
      <div className="mt-7"><div className="flex items-center justify-between text-[10px] text-background/85"><span>Asset health</span><span>{live.health}%</span></div><div className="mt-2 h-2 overflow-hidden bg-background/10"><span className="block h-full bg-primary transition-all duration-700" style={{ width: `${live.health}%` }} /></div></div>
      <div className="mt-7 grid grid-cols-2 border-t border-background/15">{stats.map(({ icon: Icon, label, value }) => <div key={label} className="border-b border-background/15 py-4 odd:border-r odd:pr-3 even:pl-3"><Icon className="size-4 text-primary" /><p className="mt-3 text-[11px] text-background/90">{label}</p><p className="mt-1 text-xs font-semibold">{value}</p></div>)}</div>
      <div className="mt-7 border-l-2 border-primary pl-4"><div className="flex items-center gap-2 text-[9px] text-primary"><Cpu className="size-3.5" /> CURRENT ACTION</div><p className="mt-3 text-base font-semibold leading-snug">{machine.action}</p></div>
      <div className="mt-7 flex items-center gap-3 text-[10px] text-background/85"><Box className="size-4" />Updated from live machine signals</div>
    </>}

    {activeLayer === 1 && prediction && <>
      <p className="mt-4 border-l-2 border-chart-4 pl-4 text-sm font-semibold leading-snug">{prediction.driver}</p>
      <div className="mt-7"><div className="flex items-center justify-between text-[10px] text-background/85"><span>Failure risk (30d)</span><span>{prediction.risk}%</span></div><div className="mt-2 h-2 overflow-hidden bg-background/10"><span className={`block h-full transition-all duration-700 ${prediction.risk > 50 ? "bg-chart-4" : "bg-primary"}`} style={{ width: `${prediction.risk}%` }} /></div></div>
      <div className="mt-7 grid grid-cols-2 border-t border-background/15">{prediction.forecast.map((item) => <div key={item.label} className="border-b border-background/15 py-4 odd:border-r odd:pr-3 even:pl-3"><AlertTriangle className="size-4 text-chart-4" /><p className="mt-3 text-[11px] text-background/90">{item.label}</p><p className="mt-1 text-xs font-semibold">{item.value}</p></div>)}</div>
      <div className="mt-7 border-l-2 border-primary pl-4"><div className="flex items-center gap-2 text-[9px] text-primary"><Cpu className="size-3.5" /> MAINTENANCE WINDOW</div><p className="mt-3 text-base font-semibold leading-snug">{prediction.window}</p></div>
      <div className="mt-7 flex items-center gap-3 text-[10px] text-background/85"><Box className="size-4" />{prediction.confidence}</div>
    </>}

    {activeLayer === 2 && actions && <>
      <p className="mt-4 border-l-2 border-primary pl-4 text-sm font-semibold leading-snug">Dispatch a coordinated action across the line.</p>
      <div className="mt-6 flex flex-col gap-3">{actions.map((action) => <Button key={action.title} type="button" variant="ghost" onClick={() => setDispatched(action.title)} aria-pressed={dispatched === action.title} className="h-auto w-full justify-start rounded-none border border-background/20 px-4 py-4 text-left text-background/70 hover:bg-background hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
        <span className="block w-full"><strong className="block text-sm">{action.title}</strong><span className="mt-1.5 block text-xs opacity-85">{action.detail}</span><span className="mt-2 block text-[10px] font-semibold opacity-95">{action.impact}</span></span>
      </Button>)}</div>
      <div className="mt-7 border-l-2 border-primary pl-4"><div className="flex items-center gap-2 text-[9px] text-primary"><Cpu className="size-3.5" /> ORCHESTRATION STATE</div><p className="mt-3 text-base font-semibold leading-snug">{dispatched ? `Dispatched: ${dispatched}` : "No action dispatched yet"}</p></div>
      <div className="mt-7 flex items-center gap-3 text-[10px] text-background/85"><Box className="size-4" />Actions propagate to every connected operation</div>
    </>}
  </aside>;
}

export function FactoryDigitalTwin({ activeLayer, setActiveLayer }: { activeLayer: number; setActiveLayer: (layer: number) => void }) {
  const [selectedId, setSelectedId] = useState<MachineId>("cnc");
  const [viewMode, setViewMode] = useState<ViewMode>("cutaway");
  const [renderMode, setRenderMode] = useState<"probe" | "webgl" | "webgpu" | "image">("probe");
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState(0);
  const changeZoom = (step: number) => setZoom((value) => Math.min(2.4, Math.max(1, Number((value + step).toFixed(2)))));
  const selected = machines.find((machine) => machine.id === selectedId) ?? machines[0];
  useEffect(() => {
    let active = true;
    const probe = document.createElement("canvas");
    if (probe.getContext("webgl2") ?? probe.getContext("webgl")) {
      setRenderMode("webgl");
      return;
    }
    const gpu = (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
    if (!gpu) {
      setRenderMode("image");
      return;
    }
    gpu.requestAdapter()
      .then((adapter) => { if (active) setRenderMode(adapter ? "webgpu" : "image"); })
      .catch(() => { if (active) setRenderMode("image"); });
    return () => { active = false; };
  }, []);
  const createWebGPURenderer = (async (props: { canvas: HTMLCanvasElement | OffscreenCanvas }) => {
    const { WebGPURenderer } = await import("three/webgpu");
    const renderer = new WebGPURenderer({ canvas: props.canvas as HTMLCanvasElement, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.max(1.5, Math.min(window.devicePixelRatio || 1, 3)));
    await renderer.init();
    return renderer;
  }) as unknown as (defaultProps: unknown) => THREE.WebGLRenderer;
  if (!selected) return null;
  return <div className="industry-stage factory-twin relative mt-16 overflow-hidden rounded-2xl border border-background/15 shadow-2xl">
    <div className="flex min-h-16 flex-col gap-3 border-b border-background/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-7"><div className="flex items-center gap-3"><span className="text-xs font-semibold">DOTS / LIVE TWO-FLOOR TWIN</span></div><div className="flex flex-wrap items-center gap-3 text-[10px] text-background/85"><span>PLANT 04</span><span>4 CONNECTED OPERATIONS</span><span className="text-primary">STREAMING</span></div></div>
    <div className="grid md:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="relative h-[420px] min-w-0 overflow-hidden sm:h-[460px] md:h-auto md:min-h-[520px] xl:min-h-[560px]">
        {renderMode === "webgl" || renderMode === "webgpu"
          ? <Canvas
              key={renderMode}
              className="absolute inset-0 size-full touch-none"
              shadows
              dpr={[1.5, 3]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              camera={{ position: [17, 10.5, 19], fov: 39, near: 0.1, far: 100 }}
              {...(renderMode === "webgpu" ? { gl: createWebGPURenderer } : {})}
            >
              <ResponsiveCamera />
              <FactoryScene selected={selectedId} onSelect={setSelectedId} viewMode={viewMode} zoom={zoom} spin={spin} webgpu={renderMode === "webgpu"} />
            </Canvas>
          : renderMode === "image"
            ? <FactoryFallback viewMode={viewMode} zoom={zoom} selectedId={selectedId} onSelect={setSelectedId} />
            : <div className="absolute inset-0 bg-muted" />}
        <div className="absolute right-4 top-20 z-20 flex flex-col border border-background/20 bg-foreground/90 p-1 backdrop-blur-sm" aria-label="Zoom and rotation">
          <Button type="button" size="icon" variant="ghost" aria-label="Rotate left" onClick={() => setSpin((value) => value + 0.35)} className="rounded-none text-background/70 hover:bg-background hover:text-foreground"><RotateCcw className="size-4" /></Button>
          <Button type="button" size="icon" variant="ghost" aria-label="Rotate right" onClick={() => setSpin((value) => value - 0.35)} className="rounded-none text-background/70 hover:bg-background hover:text-foreground"><RotateCw className="size-4" /></Button>
          <Button type="button" size="icon" variant="ghost" aria-label="Zoom in" disabled={zoom >= 2.4} onClick={() => changeZoom(0.2)} className="rounded-none text-background/70 hover:bg-background hover:text-foreground"><Plus className="size-4" /></Button>
          <span className="py-1 text-center text-[11px] text-background/90">{Math.round(zoom * 100)}%</span>
          <Button type="button" size="icon" variant="ghost" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => changeZoom(-0.2)} className="rounded-none text-background/70 hover:bg-background hover:text-foreground"><Minus className="size-4" /></Button>
        </div>
        <div className="absolute right-4 top-4 z-20 flex border border-background/20 bg-foreground/90 p-1 backdrop-blur-sm" aria-label="Factory view">
          <Button type="button" size="sm" variant="ghost" aria-pressed={viewMode === "exterior"} onClick={() => setViewMode("exterior")} className="rounded-none px-4 text-background/85 hover:bg-background hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"><Factory className="mr-2 size-3.5" />Exterior</Button>
          <Button type="button" size="sm" variant="ghost" aria-pressed={viewMode === "cutaway"} onClick={() => setViewMode("cutaway")} className="rounded-none px-4 text-background/85 hover:bg-background hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"><Scan className="mr-2 size-3.5" />Interior cutaway</Button>
        </div>
        <div className="absolute inset-x-4 bottom-4 z-20 flex gap-2 overflow-x-auto no-scrollbar pb-1" aria-label="Factory equipment">{machines.map((machine) => <Button key={machine.id} type="button" size="sm" variant="ghost" aria-pressed={selectedId === machine.id} onClick={() => setSelectedId(machine.id)} className="min-w-[7.5rem] justify-start rounded-none border border-background/20 bg-foreground/90 text-left text-background/85 backdrop-blur-sm hover:bg-background hover:text-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"><span className="mr-2 text-[9px] opacity-85">{machine.station}</span><span className="truncate">{machine.shortName}</span></Button>)}</div>
      </div>
      <div className="relative z-20 border-t border-background/15 md:border-l md:border-t-0"><div className="border-b border-background/15 p-5 xl:p-6"><p className="text-[10px] font-semibold text-primary">CONTROL ROOM</p><h3 className="mt-3 text-2xl font-semibold">Dots</h3><p className="mt-2 text-sm leading-relaxed text-background/85">Real-time synchronized view of production, circulation, parking, and logistics.</p></div><MachineReadout machine={selected} activeLayer={activeLayer} /></div>
    </div>
    <div className="grid border-t border-background/15 sm:grid-cols-3" role="tablist" aria-label="Digital twin views">{layers.map((layer, index) => <Button key={layer.name} type="button" variant="ghost" role="tab" aria-selected={activeLayer === index} onClick={() => setActiveLayer(index)} className="h-auto min-h-24 justify-start rounded-none border-b border-background/15 px-5 py-4 text-left text-background/85 last:border-b-0 hover:bg-background/5 hover:text-background aria-selected:bg-primary aria-selected:text-primary-foreground sm:border-b-0 sm:border-r sm:last:border-r-0"><span><strong className="block text-sm">0{index + 1} / {layer.name}</strong><span className="mt-2 block text-xs opacity-85">{layer.description}</span></span></Button>)}</div>
  </div>;
}
