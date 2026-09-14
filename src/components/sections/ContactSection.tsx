"use client";

import React, { useState } from "react";
import { personal } from "@/content/data/personal";
import {
  Mail,
  Copy,
  Check,
  Download,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  PhoneCall,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website_url: "", // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const key in data.errors) {
            fieldErrors[key] = data.errors[key][0];
          }
          setErrors(fieldErrors);
        }
        setSubmitError(data.message || "Failed to dispatch message. Please use direct email.");
      } else {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", company: "", message: "", website_url: "" });
      }
    } catch {
      setSubmitError("Network error. Please email directly at shawrashmi7@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Opportunities"
      className="py-24 border-t border-white/10 relative command-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Quick Action Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#61F4DE] uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact & Direct Inquiries</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Let’s build a system that survives the demo.
            </h2>

            <p className="text-base sm:text-lg text-[#989CA5] leading-relaxed">
              I’m open to AI systems, backend, applied AI and software engineering opportunities, as well as selected freelance automation projects.
            </p>

            {/* Direct Contact Actions */}
            <div className="pt-4 space-y-3 font-mono text-xs">
              {/* Copy Email Action */}
              <div className="p-4 rounded-xl bg-[#0B0D10] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-[#61F4DE]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#989CA5] block">DIRECT EMAIL</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-white hover:text-[#61F4DE] transition-colors font-medium text-sm select-all"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#6EE7A8]" />
                        <span className="text-[#6EE7A8]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#989CA5]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${personal.email}`}
                    className="px-3 py-1.5 rounded-lg bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-semibold transition-colors"
                  >
                    Send Mail
                  </a>
                </div>
              </div>

              {/* Social links row */}
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#0B0D10] border border-white/10 hover:border-white/20 text-[#989CA5] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#8B7CFF]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#0B0D10] border border-white/10 hover:border-white/20 text-[#989CA5] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4 text-[#61F4DE]" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personal.resumeUrl}
                  download
                  className="p-3.5 rounded-xl bg-[#0B0D10] border border-white/10 hover:border-white/20 text-[#989CA5] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#6EE7A8]" />
                  <span>Résumé</span>
                </a>
              </div>

              {/* Direct Phone & Voice Contact */}
              <div className="mt-3 flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D10] border border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#61F4DE]" />
                  <span className="text-white font-semibold">{personal.phone}</span>
                </div>
                <a
                  href={`tel:${personal.phone}`}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#61F4DE] border border-white/10 transition-colors"
                >
                  Call Directly
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/10 bg-[#0B0D10]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl command-panel">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#61F4DE] animate-pulse-dot" />
                  <h3 className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                    Direct Dispatch Channel
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#6EE7A8] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SPAM PROTECTED
                </span>
              </div>

              {submitSuccess ? (
                <div className="py-12 text-center font-mono">
                  <div className="w-12 h-12 rounded-full bg-[#6EE7A8]/10 border border-[#6EE7A8]/30 flex items-center justify-center text-[#6EE7A8] mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message Transmitted</h4>
                  <p className="text-xs text-[#989CA5] max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                    Thank you for reaching out. Your message has been logged in the command queue. Rashmi will respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  {/* Honeypot field - visually hidden */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_url">Leave empty</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name & Email grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[#989CA5] mb-1.5 font-medium">
                        Your Name <span className="text-[#61F4DE]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Rivera"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#050607] border text-white placeholder-[#656A74] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#61F4DE] transition-colors ${
                          errors.name ? "border-[#F87171]" : "border-white/10"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-[#F87171] mt-1 font-sans">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[#989CA5] mb-1.5 font-medium">
                        Work / Personal Email <span className="text-[#61F4DE]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#050607] border text-white placeholder-[#656A74] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#61F4DE] transition-colors ${
                          errors.email ? "border-[#F87171]" : "border-white/10"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#F87171] mt-1 font-sans">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company field */}
                  <div>
                    <label htmlFor="company" className="block text-[#989CA5] mb-1.5 font-medium">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Seed AI Startup / Series B Platform"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050607] border border-white/10 text-white placeholder-[#656A74] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#61F4DE] transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-[#989CA5] mb-1.5 font-medium">
                      Project or Role Context <span className="text-[#61F4DE]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe the problem, engineering requirements, or opportunity..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#050607] border text-white placeholder-[#656A74] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#61F4DE] transition-colors resize-none ${
                        errors.message ? "border-[#F87171]" : "border-white/10"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-[#F87171] mt-1 font-sans">{errors.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#61F4DE] hover:bg-[#4ee6ce] text-[#050607] font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(97,244,222,0.2)] hover:shadow-[0_0_28px_rgba(97,244,222,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#050607] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Packet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
