"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Mail, Phone, User } from "lucide-react";
import { personal } from "@/content/data/personal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ContactApp() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "rgba(15, 10, 31,0.6)",
    border: "1px solid rgba(139, 92, 246,0.15)",
    borderRadius: "10px",
    color: "#ddd6f3",
    outline: "none",
    width: "100%",
    padding: "10px 12px",
    fontSize: "13px",
    fontFamily: "var(--font-sans)",
    transition: "border-color 0.2s",
  };

  const errorStyle = { color: "#f87171", fontSize: "11px", marginTop: "4px" };

  return (
    <div
      className="h-full overflow-y-auto p-6"
      style={{ background: "rgba(8, 5, 15,0.4)" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2
          className="text-xl font-display font-bold mb-1"
          style={{ color: "#8b5cf6" }}
        >
          Get In Touch
        </h2>
        <p className="text-sm" style={{ color: "#9186b0" }}>
          I&apos;m always open to new opportunities. Send me a message!
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "#4d4270" }}>
          <Mail size={11} aria-hidden="true" />
          <a
            href={`mailto:${personal.email}`}
            className="hover:underline"
            style={{ color: "#22d3ee" }}
          >
            {personal.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-xs" style={{ color: "#4d4270" }}>
          <Phone size={11} aria-hidden="true" />
          <a
            href={`tel:${personal.phone.replace(/\s+/g, "")}`}
            className="hover:underline"
            style={{ color: "#22d3ee" }}
          >
            {personal.phone}
          </a>
        </div>
      </div>

      {/* Success/Error states */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
            }}
            role="alert"
          >
            <CheckCircle size={16} style={{ color: "#4ade80", flexShrink: 0 }} aria-hidden="true" />
            <div>
              <div className="text-sm font-medium" style={{ color: "#4ade80" }}>
                Message sent! 🎉
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#9186b0" }}>
                I&apos;ll get back to you within 24 hours.
              </div>
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
            role="alert"
          >
            <AlertCircle size={16} style={{ color: "#f87171", flexShrink: 0 }} aria-hidden="true" />
            <div className="text-sm" style={{ color: "#f87171" }}>
              Something went wrong. Please try again or email directly.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        aria-label="Contact form"
        noValidate
      >
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: "#9186b0" }}>
            <User size={11} aria-hidden="true" /> Name
          </label>
          <input
            id="contact-name"
            {...register("name")}
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.15)")}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" style={errorStyle} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: "#9186b0" }}>
            <Phone size={11} aria-hidden="true" /> Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            {...register("phone")}
            placeholder="+91 XXXXXXXXXX"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.15)")}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p id="phone-error" style={errorStyle} role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: "#9186b0" }}>
            <Mail size={11} aria-hidden="true" /> Email
          </label>
          <input
            id="contact-email"
            type="email"
            {...register("email")}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(139, 92, 246,0.15)")}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" style={errorStyle} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Send contact message"
          aria-disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <motion.div
                className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              <Send size={14} aria-hidden="true" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
