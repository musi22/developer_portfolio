"use client";

import React, { useState, useEffect } from "react";
import { Activity, Radio, Database, Cpu, Wifi, AlertTriangle, ShieldCheck, Gauge } from "lucide-react";

export default function StreamAlphaFlow() {
  const [loadRate, setLoadRate] = useState<"1k" | "5k" | "10k">("10k");
  const [simulateSlowConsumer, setSimulateSlowConsumer] = useState(false);
  const [activeTickCount, setActiveTickCount] = useState(1420500);

  // Tick generator
  useEffect(() => {
    const rateMs = loadRate === "10k" ? 80 : loadRate === "5k" ? 140 : 250;
    const delta = loadRate === "10k" ? 800 : loadRate === "5k" ? 400 : 100;

    const interval = setInterval(() => {
      setActiveTickCount((prev) => prev + delta);
    }, rateMs);

    return () => clearInterval(interval);
  }, [loadRate]);

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 sm:p-6 shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#61F4DE] animate-pulse-dot" />
            <h4 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
              Real-Time Event Stream & Backpressure Pipeline
            </h4>
          </div>
          <p className="text-xs text-[#989CA5] mt-1">
            Producer → Kafka/Redpanda → Stream Processor → Redis/PostgreSQL → WebSocket Clients
          </p>
        </div>

        {/* Load Rate Switcher */}
        <div className="flex items-center gap-1.5 bg-[#050607] p-1 rounded-lg border border-white/10 font-mono text-xs">
          {(["1k", "5k", "10k"] as const).map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setLoadRate(rate)}
              className={`px-2.5 py-1 rounded transition-colors ${
                loadRate === rate
                  ? "bg-[#61F4DE] text-[#050607] font-semibold"
                  : "text-[#989CA5] hover:text-white"
              }`}
            >
              {rate === "10k" ? "10,000 evt/s" : rate === "5k" ? "5,000 evt/s" : "1,000 evt/s"}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Stage Distributed Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 relative">
        {/* Stage 1: Market Producer */}
        <div className="rounded-lg bg-[#050607] border border-white/10 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#989CA5] mb-2">
              <span>01. INGESTION</span>
              <Radio className="w-3.5 h-3.5 text-[#61F4DE]" />
            </div>
            <h5 className="font-mono text-sm text-white font-semibold">Tick Producer</h5>
            <p className="text-[11px] text-[#989CA5] mt-1 leading-relaxed">
              Financial market feeds (AAPL, NVDA, MSFT) publishing live tick events.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-[#61F4DE]">
            ACTIVE_STREAM
          </div>
        </div>

        {/* Stage 2: Kafka / Redpanda */}
        <div className="rounded-lg bg-[#050607] border border-white/10 p-3.5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B7CFF]/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#989CA5] mb-2">
              <span>02. BROKER</span>
              <Activity className="w-3.5 h-3.5 text-[#8B7CFF]" />
            </div>
            <h5 className="font-mono text-sm text-white font-semibold">Kafka / Redpanda</h5>
            <p className="text-[11px] text-[#989CA5] mt-1 leading-relaxed">
              Partitioned topic logs guaranteeing per-symbol total order under load.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-[#8B7CFF]">
            LAG: 0 TICKS
          </div>
        </div>

        {/* Stage 3: FastAPI Stream Processor */}
        <div className="rounded-lg bg-[#050607] border border-white/10 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#989CA5] mb-2">
              <span>03. ROUTER</span>
              <Cpu className="w-3.5 h-3.5 text-[#61F4DE]" />
            </div>
            <h5 className="font-mono text-sm text-white font-semibold">FastAPI Gateway</h5>
            <p className="text-[11px] text-[#989CA5] mt-1 leading-relaxed">
              Asynchronous ring buffer manager dispatching frames & handling backpressure.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-[#6EE7A8]">
            p50: 2.57 ms
          </div>
        </div>

        {/* Stage 4: Redis / PostgreSQL */}
        <div className="rounded-lg bg-[#050607] border border-white/10 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#989CA5] mb-2">
              <span>04. STORAGE</span>
              <Database className="w-3.5 h-3.5 text-[#F6C76B]" />
            </div>
            <h5 className="font-mono text-sm text-white font-semibold">Redis + Postgres</h5>
            <p className="text-[11px] text-[#989CA5] mt-1 leading-relaxed">
              Redis for sub-1ms state snapshot cache; PostgreSQL for 1s/1m OHLCV batch aggregations.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-[#F6C76B]">
            BATCH COPY: 1s
          </div>
        </div>

        {/* Stage 5: WebSocket Clients */}
        <div
          className={`rounded-lg p-3.5 flex flex-col justify-between transition-colors border ${
            simulateSlowConsumer
              ? "bg-[#161A20] border-[#F6C76B]"
              : "bg-[#050607] border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#989CA5] mb-2">
              <span>05. CLIENTS</span>
              <Wifi className="w-3.5 h-3.5 text-[#61F4DE]" />
            </div>
            <h5 className="font-mono text-sm text-white font-semibold">WASM Clients</h5>
            <p className="text-[11px] text-[#989CA5] mt-1 leading-relaxed">
              Perspective WebAssembly rendering in Web Worker at 60 FPS without freezing UI.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px]">
            {simulateSlowConsumer ? (
              <span className="text-[#F6C76B]">EVICTING STALLED FRAME</span>
            ) : (
              <span className="text-[#6EE7A8]">BUFFER CAPACITY: 98%</span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Telemetry & Backpressure Stress Test */}
      <div className="rounded-lg bg-[#050607] border border-white/10 p-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#61F4DE]" />
            <span className="text-white font-semibold">LIVE STREAM TELEMETRY</span>
          </div>

          {/* Slow Consumer Simulation Toggle */}
          <button
            type="button"
            onClick={() => setSimulateSlowConsumer(!simulateSlowConsumer)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs transition-colors border ${
              simulateSlowConsumer
                ? "bg-[#F6C76B]/20 text-[#F6C76B] border-[#F6C76B]/40"
                : "bg-white/5 text-[#989CA5] border-white/10 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {simulateSlowConsumer ? "Simulating Slow Consumer (Eviction Active)" : "Simulate Slow Consumer Surge"}
          </button>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-2.5 rounded bg-[#0B0D10] border border-white/5">
            <span className="text-[10px] text-[#989CA5] block">THROUGHPUT</span>
            <span className="text-base text-white font-semibold mt-0.5 block">
              {loadRate === "10k" ? "10,000" : loadRate === "5k" ? "5,000" : "1,000"} <span className="text-xs text-[#989CA5]">evt/s</span>
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#0B0D10] border border-white/5">
            <span className="text-[10px] text-[#989CA5] block">TOTAL TICKS STREAMED</span>
            <span className="text-base text-[#61F4DE] font-semibold mt-0.5 block select-all">
              {activeTickCount.toLocaleString()}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#0B0D10] border border-white/5">
            <span className="text-[10px] text-[#989CA5] block">SLOW CLIENT EVICTIONS</span>
            <span className={`text-base font-semibold mt-0.5 block ${simulateSlowConsumer ? "text-[#F6C76B]" : "text-[#6EE7A8]"}`}>
              {simulateSlowConsumer ? "142 (Bounded)" : "0 (Healthy)"}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#0B0D10] border border-white/5">
            <span className="text-[10px] text-[#989CA5] block">BROWSER RENDER FPS</span>
            <span className="text-base text-[#6EE7A8] font-semibold mt-0.5 block">
              60.0 FPS
            </span>
          </div>
        </div>

        {simulateSlowConsumer && (
          <div className="mt-3 p-2.5 rounded bg-[#F6C76B]/10 border border-[#F6C76B]/30 text-[11px] text-[#F6C76B] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Backpressure Protection Active:</strong> Bounded ring queue evicted non-critical intermediate frames to preserve socket connection and protect server memory.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
