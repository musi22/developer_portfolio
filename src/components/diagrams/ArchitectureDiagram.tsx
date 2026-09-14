"use client";

import React from "react";

interface ArchProps {
  projectSlug: string;
}

// Architecture diagrams for each project, shown in Architecture Mode
export default function ArchitectureDiagram({ projectSlug }: ArchProps) {
  switch (projectSlug) {
    case "enterprise-agent-trust-platform":
      return <TrustPlatformArchitecture />;
    case "streamalpha":
      return <StreamAlphaArchitecture />;
    case "revenueguard":
      return <RevenueGuardArchitecture />;
    case "nexusagent":
      return <NexusAgentArchitecture />;
    default:
      return null;
  }
}

function ArchNode({
  label,
  x,
  y,
  color = "#61F4DE",
  type = "service",
}: {
  label: string;
  x: number;
  y: number;
  color?: string;
  type?: "service" | "database" | "queue" | "boundary" | "human";
}) {
  const width = Math.max(label.length * 7.5 + 20, 80);
  const height = type === "boundary" ? 24 : 28;
  const rx = type === "database" ? 4 : type === "queue" ? 12 : 6;

  return (
    <g role="img" aria-label={label}>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={rx}
        fill={`${color}10`}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.4}
      />
      {type === "database" && (
        <ellipse
          cx={x}
          cy={y - height / 2 + 3}
          rx={width / 2}
          ry={3}
          fill="none"
          stroke={color}
          strokeWidth={0.5}
          strokeOpacity={0.3}
        />
      )}
      {type === "human" && (
        <circle
          cx={x - width / 2 + 10}
          cy={y}
          r={3}
          fill={color}
          fillOpacity={0.5}
        />
      )}
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fill={color}
        fontSize={9}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={500}
      >
        {label}
      </text>
    </g>
  );
}

function ArchArrow({
  x1,
  y1,
  x2,
  y2,
  color = "#61F4DE",
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={0.8}
      strokeOpacity={0.35}
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd="url(#arrowhead)"
    />
  );
}

function TrustPlatformArchitecture() {
  const cyan = "#61F4DE";
  const violet = "#8B7CFF";
  const yellow = "#F6C76B";
  const green = "#6EE7A8";
  const red = "#F87171";

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#050607] p-4 overflow-x-auto" role="img" aria-label="Enterprise Agent Trust Platform architecture diagram showing 9-node state machine with authorization, approval, and audit paths">
      <div className="text-[10px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#61F4DE]" />
        Architecture Mode · Trust Platform
      </div>
      <p className="text-[11px] text-[#989CA5] mb-4 max-w-xl">A request passes from classification to planning and authorization. Sensitive requests require human approval before tool execution. The result is validated and written to a tamper-evident audit ledger.</p>
      <svg viewBox="0 0 600 220" className="w-full max-w-[600px] mx-auto">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#61F4DE" fillOpacity="0.5" />
          </marker>
        </defs>
        {/* Main flow */}
        <ArchNode label="Request" x={55} y={40} color={cyan} />
        <ArchArrow x1={95} y1={40} x2={130} y2={40} />
        <ArchNode label="Classify" x={170} y={40} color={cyan} />
        <ArchArrow x1={210} y1={40} x2={235} y2={40} />
        <ArchNode label="Plan" x={270} y={40} color={cyan} />
        <ArchArrow x1={305} y1={40} x2={330} y2={40} />
        <ArchNode label="Authorize" x={380} y={40} color={violet} />
        <ArchArrow x1={425} y1={40} x2={455} y2={40} />
        <ArchNode label="Execute" x={500} y={40} color={green} />
        {/* Authorize → Approval (conditional) */}
        <ArchArrow x1={380} y1={54} x2={380} y2={95} color={yellow} dashed />
        <ArchNode label="Human Approval" x={380} y={110} color={yellow} type="human" />
        <ArchArrow x1={420} y1={110} x2={500} y2={54} color={yellow} dashed />
        {/* Execute → Validate → Audit */}
        <ArchArrow x1={500} y1={54} x2={500} y2={95} />
        <ArchNode label="Validate" x={500} y={110} color={green} />
        <ArchArrow x1={500} y1={124} x2={500} y2={150} />
        <ArchNode label="Audit Ledger" x={500} y={165} color={cyan} type="database" />
        {/* Authorize → Denied */}
        <ArchArrow x1={380} y1={54} x2={300} y2={95} color={red} dashed />
        <ArchNode label="DENIED" x={300} y={110} color={red} type="boundary" />
        {/* Execute → Recovery */}
        <ArchArrow x1={540} y1={40} x2={560} y2={70} color={yellow} dashed />
        <ArchNode label="Recovery" x={560} y={85} color={yellow} />
        {/* Trust Boundary */}
        <rect x={325} y={10} width={255} height={195} rx={8} fill="none" stroke={violet} strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="6 4" />
        <text x={340} y={22} fill={violet} fillOpacity={0.4} fontSize={8} fontFamily="'JetBrains Mono', monospace">TRUST BOUNDARY</text>
      </svg>
    </div>
  );
}

function StreamAlphaArchitecture() {
  const cyan = "#61F4DE";
  const violet = "#8B7CFF";
  const yellow = "#F6C76B";
  const green = "#6EE7A8";

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#050607] p-4 overflow-x-auto" role="img" aria-label="StreamAlpha architecture: event-driven streaming pipeline from market producers through Kafka partitions to WebSocket clients">
      <div className="text-[10px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#61F4DE]" />
        Architecture Mode · StreamAlpha
      </div>
      <p className="text-[11px] text-[#989CA5] mb-4 max-w-xl">Market tick producers broadcast to partitioned Kafka topics. A FastAPI gateway manages per-client bounded ring buffers and delivers frames via WebSocket. Redis caches latest snapshots; PostgreSQL persists OHLCV aggregations.</p>
      <svg viewBox="0 0 600 160" className="w-full max-w-[600px] mx-auto">
        <defs>
          <marker id="arrowhead2" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#61F4DE" fillOpacity="0.5" />
          </marker>
        </defs>
        {/* Horizontal pipeline */}
        <ArchNode label="Producers" x={55} y={60} color={cyan} />
        <ArchArrow x1={100} y1={60} x2={135} y2={60} />
        <ArchNode label="Kafka / Redpanda" x={195} y={60} color={violet} type="queue" />
        <ArchArrow x1={255} y1={60} x2={290} y2={60} />
        <ArchNode label="FastAPI Gateway" x={355} y={60} color={cyan} />
        <ArchArrow x1={415} y1={60} x2={450} y2={60} />
        <ArchNode label="WS Clients" x={510} y={60} color={green} />
        {/* Branch to Redis */}
        <ArchArrow x1={355} y1={74} x2={355} y2={110} color={yellow} />
        <ArchNode label="Redis Cache" x={355} y={125} color={yellow} type="database" />
        {/* Branch to PostgreSQL */}
        <ArchArrow x1={195} y1={74} x2={195} y2={110} color={yellow} />
        <ArchNode label="PostgreSQL" x={195} y={125} color={yellow} type="database" />
        {/* Partition lanes */}
        <ArchNode label="Partition 0" x={195} y={25} color={violet} type="boundary" />
        {/* Backpressure label */}
        <text x={510} y={90} fill="#F6C76B" fillOpacity={0.5} fontSize={7} fontFamily="'JetBrains Mono', monospace" textAnchor="middle">Bounded Ring Buffer</text>
      </svg>
    </div>
  );
}

function RevenueGuardArchitecture() {
  const cyan = "#61F4DE";
  const violet = "#8B7CFF";
  const gold = "#F6C76B";
  const green = "#6EE7A8";

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#050607] p-4 overflow-x-auto" role="img" aria-label="RevenueGuard architecture: event-driven revenue recovery system with pre-filtering, ERV computation, experimentation split, and policy enforcement">
      <div className="text-[10px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#61F4DE]" />
        Architecture Mode · RevenueGuard
      </div>
      <p className="text-[11px] text-[#989CA5] mb-4 max-w-xl">Business events flow through sub-millisecond pre-filtering, ERV computation, deterministic salt-hash experiment split (50/50 holdout), LangGraph intervention planning, and policy-bounded execution.</p>
      <svg viewBox="0 0 600 180" className="w-full max-w-[600px] mx-auto">
        <defs>
          <marker id="arrowhead3" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#61F4DE" fillOpacity="0.5" />
          </marker>
        </defs>
        <ArchNode label="Business Event" x={60} y={50} color={cyan} />
        <ArchArrow x1={110} y1={50} x2={140} y2={50} />
        <ArchNode label="Pre-Filter (<1ms)" x={200} y={50} color={cyan} />
        <ArchArrow x1={255} y1={50} x2={280} y2={50} />
        <ArchNode label="ERV Compute" x={330} y={50} color={gold} />
        {/* Experiment split */}
        <ArchArrow x1={380} y1={50} x2={420} y2={30} color={green} />
        <ArchNode label="Treatment" x={470} y={30} color={green} />
        <ArchArrow x1={380} y1={50} x2={420} y2={80} color={violet} dashed />
        <ArchNode label="Control (Holdout)" x={480} y={80} color={violet} />
        {/* Treatment path */}
        <ArchArrow x1={520} y1={30} x2={540} y2={50} color={green} />
        <ArchNode label="Intervention" x={560} y={50} color={green} />
        {/* Policy guard */}
        <ArchArrow x1={470} y1={44} x2={470} y2={110} color={gold} dashed />
        <ArchNode label="Policy Guard" x={470} y={125} color={gold} type="boundary" />
        {/* Human approval */}
        <ArchArrow x1={470} y1={139} x2={470} y2={155} color={gold} dashed />
        <ArchNode label="HITL (>$500)" x={470} y={165} color={gold} type="human" />
        {/* Measurement */}
        <ArchNode label="Measurement" x={560} y={125} color={cyan} />
        <ArchArrow x1={560} y1={64} x2={560} y2={111} />
      </svg>
    </div>
  );
}

function NexusAgentArchitecture() {
  const cyan = "#61F4DE";
  const violet = "#8B7CFF";
  const green = "#6EE7A8";

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#050607] p-4 overflow-x-auto" role="img" aria-label="NexusAgent architecture: multi-agent RAG system with query planning, hybrid retrieval, verification, and cited synthesis">
      <div className="text-[10px] font-mono text-[#61F4DE] uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#61F4DE]" />
        Architecture Mode · NexusAgent
      </div>
      <p className="text-[11px] text-[#989CA5] mb-4 max-w-xl">Complex questions are decomposed by a Query Planning Agent. A Hybrid Retrieval Engine fuses Qdrant semantic results with Elasticsearch BM25 via RRF. A Verification Agent filters hallucinations before the Synthesizer produces cited responses.</p>
      <svg viewBox="0 0 600 180" className="w-full max-w-[600px] mx-auto">
        <defs>
          <marker id="arrowhead4" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#61F4DE" fillOpacity="0.5" />
          </marker>
        </defs>
        <ArchNode label="Question" x={55} y={70} color={cyan} />
        <ArchArrow x1={95} y1={70} x2={125} y2={70} />
        <ArchNode label="Query Planner" x={175} y={70} color={cyan} />
        {/* Two retrieval paths */}
        <ArchArrow x1={225} y1={70} x2={270} y2={40} color={violet} />
        <ArchNode label="Qdrant (Semantic)" x={340} y={40} color={violet} type="database" />
        <ArchArrow x1={225} y1={70} x2={270} y2={100} color={green} />
        <ArchNode label="Elasticsearch (BM25)" x={345} y={100} color={green} type="database" />
        {/* Merge via RRF */}
        <ArchArrow x1={405} y1={40} x2={430} y2={70} color={violet} />
        <ArchArrow x1={415} y1={100} x2={430} y2={70} color={green} />
        <ArchNode label="RRF Fusion" x={470} y={70} color={cyan} />
        {/* Verification → Synthesis */}
        <ArchArrow x1={510} y1={70} x2={530} y2={70} />
        <ArchNode label="Verify" x={555} y={70} color={green} />
        <ArchArrow x1={555} y1={84} x2={555} y2={115} />
        <ArchNode label="Cited Response" x={555} y={130} color={cyan} />
        {/* Redis cache */}
        <ArchNode label="Redis Cache" x={470} y={140} color="#F6C76B" type="database" />
        <ArchArrow x1={470} y1={84} x2={470} y2={126} color="#F6C76B" dashed />
      </svg>
    </div>
  );
}
