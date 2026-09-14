"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
  Lock,
  Play,
  Key,
  Database,
  Layers,
  ArrowRight,
  Fingerprint,
  FileCheck2,
  AlertTriangle,
  Zap,
} from "lucide-react";

interface Block {
  blockHeight: number;
  timestamp: string;
  prevHash: string;
  hash: string;
  action: string;
  tenant: string;
  signer: string;
  payload: Record<string, any>;
  status: "PRISTINE" | "TAMPERED";
}

interface Scenario {
  id: string;
  name: string;
  type: "safe" | "unauthorized" | "hitl" | "fault";
  description: string;
  expectedOutcome: string;
  simulatedSteps: Array<{
    node: string;
    status: "PASS" | "DENIED" | "PAUSED_HITL" | "RETRYING";
    latency: string;
    log: string;
  }>;
  tamperCheckPassed: boolean;
  sha256Hash: string;
}

const INITIAL_BLOCKS: Block[] = [
  {
    blockHeight: 1042,
    timestamp: "18:24:01.102Z",
    prevHash: "0000a4f2...7891",
    hash: "e3b0c442...b855",
    action: "ORDER_STATUS_QUERY",
    tenant: "acme_corp",
    signer: "HMAC_SHA256_KMS",
    payload: { order_id: "ORD-8841", tenant_match: true, privilege: "READ_ONLY" },
    status: "PRISTINE",
  },
  {
    blockHeight: 1043,
    timestamp: "18:24:03.415Z",
    prevHash: "e3b0c442...b855",
    hash: "8a4f21b7...0182",
    action: "CROSS_TENANT_BLOCKED",
    tenant: "rogue_sub",
    signer: "SECURITY_GUARD_DAEMON",
    payload: { violation_type: "OWNER_MISMATCH", target: "enterprise_alpha", blocked: true },
    status: "PRISTINE",
  },
  {
    blockHeight: 1044,
    timestamp: "18:24:08.890Z",
    prevHash: "8a4f21b7...0182",
    hash: "4c7b82e1...1940",
    action: "HITL_CONCESSION_ESC",
    tenant: "consumer_retail",
    signer: "SUPERVISOR_INBOX_PAGER",
    payload: { concession_amount: "$250.00", limit: "$50.00", status: "WAITING_APPROVAL" },
    status: "PRISTINE",
  },
  {
    blockHeight: 1045,
    timestamp: "18:24:14.221Z",
    prevHash: "4c7b82e1...1940",
    hash: "f1a2b3c4...1a2b",
    action: "BACKOFF_RETRY_HEAL",
    tenant: "catalog_sync",
    signer: "STATE_MACHINE_EXP_BACKOFF",
    payload: { attempts: 2, error_code: 429, restored_latency_ms: 14.2 },
    status: "PRISTINE",
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: "safe-query",
    name: "01: Authorized Lookup",
    type: "safe",
    description: "Tenant 'acme_corp' queries order #8841. Caller owns resource.",
    expectedOutcome: "Guarded Pass (200 OK)",
    simulatedSteps: [
      { node: "1. classify_intent", status: "PASS", latency: "2.1ms", log: "Intent identified as read:order_status" },
      { node: "2. create_plan", status: "PASS", latency: "3.4ms", log: "Plan generated: [lookup_order_status]" },
      { node: "3. authorize_plan", status: "PASS", latency: "1.8ms", log: "ResourceOwnershipRule verified: tenant_id == caller_id" },
      { node: "5. execute_tool", status: "PASS", latency: "8.2ms", log: "Idempotent query dispatched to OrderStore" },
      { node: "6. validate_result", status: "PASS", latency: "1.1ms", log: "Pydantic schema validated (status: SHIPPED)" },
      { node: "8. emit_evidence", status: "PASS", latency: "2.9ms", log: "Chained to Block #1042 in immutable evidence ledger" },
    ],
    tamperCheckPassed: true,
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "cross-tenant-blocked",
    name: "02: Cross-Tenant Attack",
    type: "unauthorized",
    description: "Tenant 'rogue_sub' attempts to read order belonging to 'enterprise_alpha'.",
    expectedOutcome: "Blocked by ResourceOwnershipRule (403 Forbidden)",
    simulatedSteps: [
      { node: "1. classify_intent", status: "PASS", latency: "1.9ms", log: "Intent identified as read:order_status" },
      { node: "2. create_plan", status: "PASS", latency: "2.8ms", log: "Plan generated: [lookup_order_details]" },
      { node: "3. authorize_plan", status: "DENIED", latency: "2.4ms", log: "SECURITY VIOLATION: Owner mismatch (tenant: rogue_sub != enterprise_alpha)" },
      { node: "8. emit_evidence", status: "PASS", latency: "3.1ms", log: "Security incident notarized into Block #1043 with cryptographic stamp" },
    ],
    tamperCheckPassed: true,
    sha256Hash: "8a4f21b77c3e5d918b920194bc0283e1fa73e16279cba9163ef2918492040182",
  },
  {
    id: "hitl-refund",
    name: "03: High-Value Refund ($250)",
    type: "hitl",
    description: "Customer requests $250 concession. Exceeds $50 auto-threshold.",
    expectedOutcome: "Paused for Human Supervisor Sign-off",
    simulatedSteps: [
      { node: "1. classify_intent", status: "PASS", latency: "2.0ms", log: "Intent identified as action:issue_refund" },
      { node: "2. create_plan", status: "PASS", latency: "3.1ms", log: "Plan generated: [issue_refund(amount=250.00)]" },
      { node: "3. authorize_plan", status: "PAUSED_HITL", latency: "2.6ms", log: "PolicyTrigger: Concession > $50.00 threshold. Escalating to HITL queue." },
      { node: "4. request_approval", status: "PAUSED_HITL", latency: "140ms", log: "Supervisor approval ticket created (ID: #AP-9921)" },
    ],
    tamperCheckPassed: true,
    sha256Hash: "4c7b82e16d4982a17f6b921340bfa1e974e1276024ab719371029f8a32bc1940",
  },
  {
    id: "rate-limit-retry",
    name: "04: 429 Rate-Limit Fault",
    type: "fault",
    description: "Downstream catalog API returns HTTP 429 Too Many Requests.",
    expectedOutcome: "Healed by Bounded Exponential Backoff",
    simulatedSteps: [
      { node: "1. classify_intent", status: "PASS", latency: "2.2ms", log: "Intent identified as action:catalog_sync" },
      { node: "3. authorize_plan", status: "PASS", latency: "1.7ms", log: "Authorized with idempotency key: 9b1deb4d" },
      { node: "5. execute_tool", status: "RETRYING", latency: "12ms", log: "Downstream 429 Rate Limit encountered. Fault injected." },
      { node: "7. recover_or_escalate", status: "PASS", latency: "102ms", log: "Executing backoff retry attempt 1 (sleep=0.1s + jitter)" },
      { node: "5. execute_tool (retry)", status: "PASS", latency: "14ms", log: "Execution succeeded with original idempotency token" },
      { node: "8. emit_evidence", status: "PASS", latency: "3.2ms", log: "Chained into Block #1045 with self-healing latency metrics" },
    ],
    tamperCheckPassed: true,
    sha256Hash: "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
  },
];

export default function TrustPlatformTrace() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleStepCount, setVisibleStepCount] = useState(SCENARIOS[0].simulatedSteps.length);

  // Reactive Blockchain / Hash-Chain State
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [selectedBlock, setSelectedBlock] = useState<Block>(INITIAL_BLOCKS[0]);
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedIndex, setTamperedIndex] = useState<number | null>(null);

  const handleRunScenario = (sc: Scenario) => {
    setActiveScenario(sc);
    setIsRunning(true);
    setVisibleStepCount(0);

    // Animate trace steps
    sc.simulatedSteps.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleStepCount(idx + 1);
        if (idx === sc.simulatedSteps.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 320);
    });
  };

  // Simulate Tamper Attack on the Hash Chain
  const handleTamperBlock = (index: number) => {
    if (isTampered) {
      // Restore Pristine
      setBlocks(INITIAL_BLOCKS);
      setIsTampered(false);
      setTamperedIndex(null);
      setSelectedBlock(INITIAL_BLOCKS[index]);
    } else {
      // Mutate payload to simulate SQL injection or row alteration
      const mutated = blocks.map((b, i) => {
        if (i === index) {
          return {
            ...b,
            payload: { ...b.payload, concession_amount: "$9999.99 (TAMPERED)" },
            hash: "0xBAD_HASH_CORRUPT_7721",
            status: "TAMPERED" as const,
          };
        }
        return b;
      });
      setBlocks(mutated);
      setIsTampered(true);
      setTamperedIndex(index);
      setSelectedBlock(mutated[index]);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#07090C] p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Title Bar with Vibrant Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#61F4DE] animate-pulse-dot" />
            <h4 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
              Execution Trace & Cryptographic Evidence Ledger
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
              SHA-256 Chained
            </span>
          </div>
          <p className="text-xs text-[#989CA5] mt-1.5 font-sans">
            Simulate synthetic enterprise scenarios across the 9-node LangGraph state machine and inspect the immutable hash chain.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#6EE7A8]/10 text-[#6EE7A8] border border-[#6EE7A8]/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(110,231,168,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Cross-Tenant Leaks</span>
          </span>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {SCENARIOS.map((sc) => {
          const isSelected = activeScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleRunScenario(sc)}
              className={`text-left p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                isSelected
                  ? "bg-[#11161F] border-[#61F4DE] text-white shadow-[0_0_16px_rgba(97,244,222,0.2)] ring-1 ring-[#61F4DE]/50"
                  : "bg-[#0B0D10]/80 border-white/10 text-[#989CA5] hover:border-white/20 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <div className="font-semibold text-[#F4F4F5] flex items-center justify-between">
                <span>{sc.name}</span>
                {isSelected && <Zap className="w-3 h-3 text-[#61F4DE] fill-[#61F4DE]" />}
              </div>
              <div className="text-[11px] text-[#989CA5] truncate mt-1">
                {sc.expectedOutcome}
              </div>
            </button>
          );
        })}
      </div>

      {/* Execution Trace Timeline */}
      <div className="rounded-xl bg-[#050607] border border-white/10 p-4 sm:p-5 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3.5 text-[11px] text-[#989CA5]">
          <div className="flex items-center gap-2">
            <span className="text-[#656A74]">ACTIVE_TEST:</span>
            <span className="text-white font-semibold">{activeScenario.name}</span>
          </div>
          <button
            type="button"
            onClick={() => handleRunScenario(activeScenario)}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#61F4DE]/15 hover:text-[#61F4DE] hover:border-[#61F4DE]/30 border border-white/10 text-white transition-all disabled:opacity-50"
          >
            <Play className={`w-3 h-3 ${isRunning ? "animate-spin text-[#61F4DE]" : ""}`} />
            <span>{isRunning ? "Running Nodes..." : "Replay Simulation"}</span>
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-2">
          {activeScenario.simulatedSteps.slice(0, visibleStepCount).map((step, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 rounded-lg bg-[#0B0E12] border border-white/5 hover:border-white/10 transition-colors animate-in fade-in slide-in-from-left-1 duration-200"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-[#656A74] w-5">0{i + 1}</span>
                <span className="text-white font-medium">{step.node}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    step.status === "PASS"
                      ? "bg-[#6EE7A8]/10 text-[#6EE7A8] border border-[#6EE7A8]/30"
                      : step.status === "DENIED"
                      ? "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/30"
                      : step.status === "PAUSED_HITL"
                      ? "bg-[#F6C76B]/10 text-[#F6C76B] border border-[#F6C76B]/30"
                      : "bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/30"
                  }`}
                >
                  {step.status}
                </span>
                <span className="text-[11px] text-[#989CA5] hidden md:inline truncate max-w-sm">
                  {step.log}
                </span>
              </div>
              <div className="text-[10px] text-[#656A74] self-end sm:self-auto font-mono">
                {step.latency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reactive Cryptographic Hash-Chain / Blockchain Ledger */}
      <div className="rounded-xl border border-white/10 bg-[#0B0D12] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#61F4DE]/10 text-[#61F4DE] border border-[#61F4DE]/30">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider block">
                Chained Cryptographic Blocks (O(N) Audit Ledger)
              </span>
              <span className="text-[10px] text-[#989CA5] font-mono">
                Click any block to inspect payload or simulate tampering
              </span>
            </div>
          </div>

          {/* Tamper Simulation Toggle */}
          <button
            type="button"
            onClick={() => handleTamperBlock(1)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
              isTampered
                ? "bg-[#F87171] text-white shadow-[0_0_15px_rgba(248,113,113,0.5)] font-bold animate-pulse"
                : "bg-white/5 hover:bg-white/10 text-[#F87171] border border-[#F87171]/40"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isTampered ? "Tamper Detected! Click to Self-Heal" : "Simulate DB Tamper"}</span>
          </button>
        </div>

        {/* Chained Blocks Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {blocks.map((block, idx) => {
            const isSelected = selectedBlock.blockHeight === block.blockHeight;
            const isCorrupt = block.status === "TAMPERED";

            return (
              <button
                key={block.blockHeight}
                type="button"
                onClick={() => setSelectedBlock(block)}
                className={`text-left p-3.5 rounded-xl border font-mono text-xs transition-all relative ${
                  isCorrupt
                    ? "bg-[#F87171]/15 border-[#F87171] text-white shadow-[0_0_18px_rgba(248,113,113,0.3)]"
                    : isSelected
                    ? "bg-[#111722] border-[#61F4DE] text-white shadow-[0_0_16px_rgba(97,244,222,0.2)]"
                    : "bg-[#050607] border-white/10 text-[#989CA5] hover:border-white/20 hover:text-white"
                }`}
              >
                {/* Block Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">Block #{block.blockHeight}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      isCorrupt
                        ? "bg-[#F87171] text-white"
                        : "bg-[#6EE7A8]/10 text-[#6EE7A8] border border-[#6EE7A8]/30"
                    }`}
                  >
                    {block.status}
                  </span>
                </div>

                {/* Block Action */}
                <div className="text-[11px] text-[#61F4DE] font-semibold truncate mb-1">
                  {block.action}
                </div>

                {/* Hash */}
                <div className="text-[10px] text-[#656A74] truncate">
                  Hash: <span className="text-[#989CA5] font-mono">{block.hash}</span>
                </div>

                {/* Chaining arrow indicator */}
                {idx < blocks.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-white/30 text-[10px]">
                    →
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Block Cryptographic Evidence Payload Drawer */}
        <div className="rounded-lg bg-[#050607] border border-white/10 p-3.5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[11px]">
            <span className="text-[#61F4DE] font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              BLOCK #{selectedBlock.blockHeight} EVIDENCE PAYLOAD
            </span>
            <span className="text-[#656A74]">Signer: {selectedBlock.signer}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#989CA5]">
            <div>
              <span className="text-[#656A74] block">Previous Block Hash:</span>
              <span className="text-white font-mono">{selectedBlock.prevHash}</span>
            </div>
            <div>
              <span className="text-[#656A74] block">Current SHA-256 Hash:</span>
              <span
                className={`font-mono ${
                  selectedBlock.status === "TAMPERED" ? "text-[#F87171] font-bold" : "text-[#6EE7A8]"
                }`}
              >
                {selectedBlock.hash}
              </span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/5">
            <span className="text-[#656A74] text-[10px] block mb-1">Payload JSON:</span>
            <pre className="p-2 rounded bg-[#090C10] border border-white/5 text-[11px] text-[#E4E4E7] overflow-x-auto">
              {JSON.stringify(selectedBlock.payload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
