import React from "react";
import Link from "next/link";
import { AlertOctagon, ArrowLeft, Terminal, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F4F4F5] flex flex-col items-center justify-center p-6 command-grid font-mono">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-8 shadow-2xl backdrop-blur-xl text-center">
        <div className="w-12 h-12 rounded-xl bg-[#F87171]/10 border border-[#F87171]/30 flex items-center justify-center text-[#F87171] mx-auto mb-5">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F87171]/10 border border-[#F87171]/20 text-[#F87171] text-xs font-semibold uppercase tracking-wider mb-3">
          Error 404 // Route Unreachable
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Target Node Missing
        </h1>

        <p className="text-xs text-[#989CA5] font-sans leading-relaxed mb-6">
          The requested system route does not exist or has been relocated within the state machine.
        </p>

        <div className="p-3 rounded-lg bg-[#050607] border border-white/5 text-[11px] text-[#656A74] text-left mb-6 font-mono">
          <div>$ ping target_endpoint</div>
          <div className="text-[#F87171]">&gt; 404 Not Found: packet dropped</div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Command Core</span>
        </Link>
      </div>
    </div>
  );
}
