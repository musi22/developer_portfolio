"use client";

import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AgentControlCoreFallback, { NodeData } from "./AgentControlCoreFallback";
import { ShieldCheck, RefreshCw, Layers, Compass } from "lucide-react";

// 9 Node specifications with 3D spherical / orbital coordinates
interface Node3D {
  id: number;
  name: string;
  role: string;
  policy: string;
  detail: string;
  position: [number, number, number];
  color: string;
}

const NODES_3D: Node3D[] = [
  {
    id: 1,
    name: "1. Classification",
    role: "Intent Classifier",
    policy: "Linguistic Intent Filter",
    detail: "Classifies incoming customer request, determining if state mutation or tool call is required.",
    position: [-3.2, 1.8, 0],
    color: "#61F4DE",
  },
  {
    id: 2,
    name: "2. Planning",
    role: "Deterministic Planner",
    policy: "DAG Max Step Cap (5)",
    detail: "Generates bounded directed acyclic execution plan with pre-validated dependencies.",
    position: [-1.8, 3.1, 0.8],
    color: "#61F4DE",
  },
  {
    id: 3,
    name: "3. Authorization",
    role: "RBAC & Ownership Guard",
    policy: "ResourceOwnershipRule",
    detail: "Deterministic permission checks preventing horizontal tenant and cross-user data leakage.",
    position: [1.6, 2.9, 0.4],
    color: "#61F4DE",
  },
  {
    id: 4,
    name: "4. Human Approval",
    role: "HITL Supervisor Gate",
    policy: "Concession Threshold ($50 cap)",
    detail: "Suspends graph execution if mutation exceeds financial cap or high-risk concession criteria.",
    position: [3.4, 1.2, -0.6],
    color: "#F6C76B",
  },
  {
    id: 5,
    name: "5. Execution",
    role: "Idempotent Tool Dispatch",
    policy: "Transactional Idempotency Outbox",
    detail: "Dispatches synthetic retail tool with UUID token preventing duplicate writes under retry.",
    position: [2.8, -1.8, 0.7],
    color: "#61F4DE",
  },
  {
    id: 6,
    name: "6. Validation",
    role: "Result Verifier",
    policy: "Pydantic Schema & DB Constraints",
    detail: "Strictly validates tool execution output against domain models and invariants.",
    position: [0.8, -3.2, -0.3],
    color: "#61F4DE",
  },
  {
    id: 7,
    name: "7. Recovery",
    role: "Fault Escalate / Backoff",
    policy: "Bounded Exponential Backoff",
    detail: "Catches transient 429 rate-limits and 500 server errors, executing bounded self-healing retries.",
    position: [-1.9, -2.8, 0.5],
    color: "#8B7CFF",
  },
  {
    id: 8,
    name: "8. Audit Generation",
    role: "Cryptographic Notary",
    policy: "SHA-256 Hash Chaining",
    detail: "Appends immutable SHA-256 evidence record with mathematical tamper detection.",
    position: [-3.3, -0.9, -0.5],
    color: "#6EE7A8",
  },
  {
    id: 9,
    name: "9. Completion",
    role: "Terminal Finalizer",
    policy: "Telemetry Seal",
    detail: "Emits sealed evidence ledger receipt with latency markers to client telemetry.",
    position: [0, 0, 0],
    color: "#61F4DE",
  },
];

// Inner 3D Scene Components
function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.25;
      wireframeRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Glowing Inner Execution Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#61F4DE"
          emissive="#61F4DE"
          emissiveIntensity={0.6}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Shield */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#8B7CFF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ambient glow light */}
      <pointLight color="#61F4DE" intensity={1.8} distance={6} />
    </group>
  );
}

// Interactive 3D Node Mesh
function NodeMesh({
  node,
  isSelected,
  isHovered,
  isPacketHere,
  onHover,
  onClick,
}: {
  node: Node3D;
  isSelected: boolean;
  isHovered: boolean;
  isPacketHere: boolean;
  onHover: (id: number | null) => void;
  onClick: (node: Node3D) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const scale = isSelected ? 1.4 : isHovered ? 1.25 : isPacketHere ? 1.3 : 1;

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#61F4DE" : node.color}
          emissive={isSelected || isPacketHere ? node.color : "#050607"}
          emissiveIntensity={isSelected || isPacketHere ? 0.8 : 0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit ring around node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.46, 24]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Spline Connections between 9 nodes
function ConnectionLines() {
  const lineObject = useMemo(() => {
    // Loop through the outer nodes and connect to center
    const outerNodes = NODES_3D.slice(0, 8).map((n) => new THREE.Vector3(...n.position));
    outerNodes.push(outerNodes[0]); // close loop
    const curve = new THREE.CatmullRomCurve3(outerNodes);
    const linePoints = curve.getPoints(80);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    return new THREE.Line(lineGeometry, lineMaterial);
  }, []);

  return <primitive object={lineObject} />;
}

// Traveling Request Packet along curve
function TravelingPacket({ activeIndex }: { activeIndex: number }) {
  const packetRef = useRef<THREE.Mesh>(null);
  const targetPos = useMemo(() => {
    const node = NODES_3D[activeIndex];
    return new THREE.Vector3(...node.position);
  }, [activeIndex]);

  useFrame((_, delta) => {
    if (packetRef.current) {
      packetRef.current.position.lerp(targetPos, delta * 3.5);
    }
  });

  return (
    <mesh ref={packetRef} position={[-3.2, 1.8, 0]}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshBasicMaterial color="#61F4DE" />
      <pointLight color="#61F4DE" intensity={2.5} distance={3} />
    </mesh>
  );
}

// Interactive 3D Scene Controller
function Scene({
  selectedNode,
  hoveredNodeId,
  activeStep,
  onHover,
  onClick,
}: {
  selectedNode: Node3D | null;
  hoveredNodeId: number | null;
  activeStep: number;
  onHover: (id: number | null) => void;
  onClick: (node: Node3D) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle mouse parallax
  useFrame((state) => {
    if (groupRef.current) {
      const { x, y } = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.35, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.25, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <CentralCore />
      <ConnectionLines />
      <TravelingPacket activeIndex={activeStep} />

      {NODES_3D.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          isSelected={selectedNode?.id === node.id}
          isHovered={hoveredNodeId === node.id}
          isPacketHere={NODES_3D[activeStep].id === node.id}
          onHover={onHover}
          onClick={onClick}
        />
      ))}
    </group>
  );
}

export default function AgentControlCore() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefer2D, setPrefer2D] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node3D | null>(NODES_3D[2]);
  const [hashRecord, setHashRecord] = useState("0x7c9a...f812");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrefer2D(true);
    }

    // Pause rendering when scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous packet cycle
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % NODES_3D.length;
        if (next === 7) {
          const rand = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "...sha256";
          setHashRecord(rand);
        }
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Fallback to 2D diagram if preferred or WebGL unsupported
  if (!hasWebGL || prefer2D) {
    return (
      <div ref={containerRef} className="w-full">
        <AgentControlCoreFallback />
        {hasWebGL && (
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => setPrefer2D(false)}
              className="text-xs font-mono text-[#989CA5] hover:text-[#61F4DE] transition-colors inline-flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              Switch to 3D Orbit View
            </button>
          </div>
        )}
      </div>
    );
  }

  const activeNodeData = NODES_3D[activeStep];
  const hoveredNode = NODES_3D.find((n) => n.id === hoveredNodeId);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-[#0B0D10]/90 shadow-2xl backdrop-blur-xl overflow-hidden"
    >
      {/* Top Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#61F4DE] animate-pulse-dot" />
          <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
            Agent Control Core
          </span>
          <span className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
            3D LangGraph State Machine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPrefer2D(true)}
            className="text-xs font-mono text-[#989CA5] hover:text-[#61F4DE] transition-colors flex items-center gap-1"
            title="Switch to 2D state matrix view"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">2D Matrix</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full aspect-[16/10] bg-[#050607] cursor-grab active:cursor-grabbing">
        <Suspense fallback={<AgentControlCoreFallback />}>
          <Canvas
            camera={{ position: [0, 0, 7.2], fov: 48 }}
            dpr={[1, 1.5]}
            frameloop={isVisible ? "always" : "never"}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <Scene
              selectedNode={selectedNode}
              hoveredNodeId={hoveredNodeId}
              activeStep={activeStep}
              onHover={setHoveredNodeId}
              onClick={setSelectedNode}
            />
          </Canvas>
        </Suspense>

        {/* Hover / Tooltip HUD */}
        {hoveredNode && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#0B0D10]/95 border border-[#61F4DE]/50 px-3 py-1.5 rounded-lg text-xs font-mono pointer-events-none shadow-xl flex items-center gap-2">
            <span className="text-[#61F4DE] font-semibold">{hoveredNode.name}</span>
            <span className="text-[#989CA5] text-[10px]">({hoveredNode.role})</span>
          </div>
        )}

        {/* Telemetry markers overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#0B0D10]/90 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-[#989CA5]">
          <span className="text-[#61F4DE]">PACKET_INSPECT:</span>
          <span className="text-white">{activeNodeData.name}</span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-[#0B0D10]/90 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
          <span className="text-[#989CA5]">LEDGER:</span>
          <span className="text-[#6EE7A8]">{hashRecord}</span>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-4 border-t border-white/10 bg-[#0B0D10] text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#61F4DE] font-semibold text-sm">
                {selectedNode.name}
              </span>
              <span className="text-[10px] font-mono text-[#989CA5] px-1.5 py-0.5 rounded bg-white/5">
                {selectedNode.role}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#6EE7A8] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              DETERMINISTIC
            </span>
          </div>

          <p className="text-[#989CA5] leading-relaxed mb-2.5">{selectedNode.detail}</p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 font-mono text-[11px]">
            <span className="text-[#989CA5]">Enforced Policy:</span>
            <span className="text-white bg-[#161A20] px-2 py-0.5 rounded border border-white/10">
              {selectedNode.policy}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
