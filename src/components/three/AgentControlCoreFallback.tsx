"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cpu, CheckCircle2, AlertTriangle, UserCheck, RefreshCw, FileText, ArrowRight } from "lucide-react";

export interface NodeData {
  id: number;
  name: string;
  role: string;
  policy: string;
  detail: string;
  status: "active" | "inspecting" | "verified" | "idle";
  x: number;
  y: number;
}

const NODES: NodeData[] = [
  {
    id: 1,
    name: "1. Classification",
    role: "Intent Classifier",
    policy: "Linguistic intent extraction & tool necessity check",
    detail: "Determines if incoming prompt requires retail state mutations or informational lookup.",
    status: "verified",
    x: 15,
    y: 20,
  },
  {
    id: 2,
    name: "2. Planning",
    role: "Deterministic Planner",
    policy: "Bounded DAG plan creation",
    detail: "Constructs step-by-step DAG plan with strict recursion caps (max 5 steps).",
    status: "verified",
    x: 38,
    y: 15,
  },
  {
    id: 3,
    name: "3. Authorization",
    role: "RBAC & Ownership Guard",
    policy: "ResourceOwnershipRule + Multi-Tenant Boundary",
    detail: "Verifies authenticated caller owns target resource. Blocks cross-tenant data leaks.",
    status: "inspecting",
    x: 62,
    y: 20,
  },
  {
    id: 4,
    name: "4. Human Approval",
    role: "HITL Supervisor Gate",
    policy: "Concession Threshold ($50 cap)",
    detail: "Pauses graph execution if refund > $50 or order alteration crosses risk threshold.",
    status: "active",
    x: 85,
    y: 35,
  },
  {
    id: 5,
    name: "5. Execution",
    role: "Tool Dispatch Core",
    policy: "Transactional Idempotency Token",
    detail: "Executes synthetic retail tool with UUID token preventing duplicate write operations.",
    status: "active",
    x: 75,
    y: 65,
  },
  {
    id: 6,
    name: "6. Validation",
    role: "Result Verifier",
    policy: "Schema & Mutation Integrity Check",
    detail: "Checks tool payload response against Pydantic schema and database constraints.",
    status: "verified",
    x: 50,
    y: 82,
  },
  {
    id: 7,
    name: "7. Recovery",
    role: "Fault Escalate / Backoff",
    policy: "Bounded Exponential Backoff (2^(N-1) * 0.1s)",
    detail: "Catches 429 rate-limits or transient 500 errors, retrying up to 3 times before fallback.",
    status: "idle",
    x: 25,
    y: 75,
  },
  {
    id: 8,
    name: "8. Audit Generation",
    role: "Cryptographic Notary",
    policy: "SHA-256 Hash Chaining (O(N) verification)",
    detail: "Links transaction to previous block hash, generating immutable tamper-evident receipt.",
    status: "active",
    x: 12,
    y: 52,
  },
  {
    id: 9,
    name: "9. Completion",
    role: "Terminal Finalizer",
    policy: "Session seal & client telemetry dispatch",
    detail: "Emits sealed evidence ledger receipt with p50/p95 latency markers.",
    status: "verified",
    x: 48,
    y: 50,
  },
];

export default function AgentControlCoreFallback({
  onSelectNode,
}: {
  onSelectNode?: (node: NodeData) => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(NODES[2]);
  const [hashRecord, setHashRecord] = useState("0x9f8b...e4a1");
  const [isSimulating, setIsSimulating] = useState(true);

  // Sequentially animate the simulated packet through the 9 nodes
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % NODES.length;
        // When step hits 7 (Audit Generation), generate a simulated SHA-256 hash stamp
        if (next === 7) {
          const randomHash = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "...sha256";
          setHashRecord(randomHash);
        }
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-[#0B0D10]/95 p-5 shadow-2xl backdrop-blur-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#61F4DE] animate-pulse-dot" />
          <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
            Agent Trust Control Core
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
            9-Node LangGraph State Machine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className="text-xs font-mono text-[#989CA5] hover:text-[#61F4DE] transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3 h-3 ${isSimulating ? "animate-spin text-[#61F4DE]" : ""}`} />
            {isSimulating ? "Streaming Request" : "Resume Stream"}
          </button>
        </div>
      </div>

      {/* SVG System Graph */}
      <div className="relative w-full aspect-[16/10] bg-[#050607]/80 rounded-lg border border-white/5 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Subtle connecting path lines */}
          <path
            d="M 15 20 L 38 15 L 62 20 L 85 35 L 75 65 L 50 82 L 25 75 L 12 52 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          {/* Core connection spokes to node 9 (Center Completion) */}
          <line x1="62" y1="20" x2="48" y2="50" stroke="rgba(97, 244, 222, 0.15)" strokeWidth="0.6" />
          <line x1="85" y1="35" x2="48" y2="50" stroke="rgba(97, 244, 222, 0.15)" strokeWidth="0.6" />
          <line x1="75" y1="65" x2="48" y2="50" stroke="rgba(97, 244, 222, 0.15)" strokeWidth="0.6" />
          <line x1="12" y1="52" x2="48" y2="50" stroke="rgba(110, 231, 168, 0.25)" strokeWidth="0.8" />

          {/* Central Execution Core Ring */}
          <circle
            cx="48"
            cy="50"
            r="11"
            fill="rgba(97, 244, 222, 0.03)"
            stroke="rgba(97, 244, 222, 0.3)"
            strokeWidth="0.6"
          />
          <circle
            cx="48"
            cy="50"
            r="7"
            fill="rgba(139, 124, 255, 0.05)"
            stroke="rgba(139, 124, 255, 0.4)"
            strokeWidth="0.8"
          />

          {/* Simulated Request Packet Traveling */}
          {isSimulating && (
            <circle
              cx={NODES[activeStep].x}
              cy={NODES[activeStep].y}
              r="2.2"
              fill="#61F4DE"
              className="transition-all duration-700 ease-out shadow-[0_0_12px_#61F4DE]"
            />
          )}

          {/* Render Nodes */}
          {NODES.map((node, index) => {
            const isCurrent = activeStep === index;
            const isSelected = selectedNode?.id === node.id;
            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className="cursor-pointer group"
              >
                {/* Node outer ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 4.8 : isCurrent ? 4.2 : 3.4}
                  fill={
                    isSelected
                      ? "#111418"
                      : isCurrent
                      ? "rgba(97, 244, 222, 0.2)"
                      : "#0B0D10"
                  }
                  stroke={
                    isSelected
                      ? "#61F4DE"
                      : isCurrent
                      ? "#61F4DE"
                      : "rgba(255, 255, 255, 0.25)"
                  }
                  strokeWidth={isSelected ? 1.2 : 0.8}
                  className="transition-all duration-300"
                />

                {/* Node inner pulse */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 2 : 1.4}
                  fill={
                    node.id === 8
                      ? "#6EE7A8"
                      : node.id === 4
                      ? "#F6C76B"
                      : isCurrent || isSelected
                      ? "#61F4DE"
                      : "#989CA5"
                  }
                />

                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y + (node.y > 60 ? -5 : 6.5)}
                  textAnchor="middle"
                  fill={isSelected ? "#61F4DE" : isCurrent ? "#F4F4F5" : "#989CA5"}
                  fontSize="2.9"
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="select-none transition-colors"
                >
                  {node.name.replace(/^\d+\.\s*/, "")}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live telemetry pill inside diagram */}
        <div className="absolute top-2 left-2 flex items-center gap-2 bg-[#0B0D10]/90 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-[#989CA5]">
          <span className="text-[#61F4DE]">PACKET_TRACE:</span>
          <span>{NODES[activeStep].role}</span>
        </div>

        <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-[#0B0D10]/90 border border-white/10 px-2 py-1 rounded text-[10px] font-mono">
          <span className="text-[#989CA5]">LEDGER_HASH:</span>
          <span className="text-[#6EE7A8]">{hashRecord}</span>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="mt-4 rounded-lg bg-[#111418] border border-white/10 p-3.5 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#61F4DE] font-semibold">{selectedNode.name}</span>
              <span className="text-[10px] font-mono text-[#989CA5] px-1.5 py-0.2 rounded bg-white/5">
                {selectedNode.role}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#6EE7A8] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              DETERMINISTIC
            </span>
          </div>

          <p className="text-[#989CA5] leading-relaxed mb-2">{selectedNode.detail}</p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[11px]">
            <span className="text-[#989CA5]">Enforced Policy:</span>
            <span className="text-white bg-[#050607] px-2 py-0.5 rounded border border-white/10">
              {selectedNode.policy}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
