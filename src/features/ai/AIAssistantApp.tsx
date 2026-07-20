"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, RefreshCw, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { personal } from "@/content/data/personal";
import { generateId } from "@/lib/utils";
import type { ChatMessage, SuggestedPrompt } from "@/types/chat";

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: "1", label: "Tell me about yourself", prompt: "Tell me about yourself", icon: "👤" },
  { id: "2", label: "Your projects", prompt: "What are your main projects?", icon: "🚀" },
  { id: "3", label: "Tech stack", prompt: "What technologies do you know?", icon: "⚡" },
  { id: "4", label: "AI experience", prompt: "Tell me about your AI and ML experience", icon: "🤖" },
  { id: "5", label: "Contact info", prompt: "How can I get in touch with you?", icon: "✉️" },
  { id: "6", label: "Backend skills", prompt: "Explain your backend engineering experience", icon: "⚙️" },
];

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: isUser
            ? "linear-gradient(135deg, #8b5cf6, #3730a3)"
            : "rgba(139, 92, 246,0.1)",
          border: "1px solid rgba(139, 92, 246,0.2)",
        }}
        aria-hidden="true"
      >
        {isUser ? (
          <User size={13} style={{ color: "white" }} />
        ) : (
          <Bot size={13} style={{ color: "#8b5cf6" }} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        style={{
          background: isUser
            ? "linear-gradient(135deg, rgba(139, 92, 246,0.2), rgba(79, 70, 229,0.15))"
            : "rgba(15, 10, 31,0.6)",
          border: "1px solid rgba(139, 92, 246,0.12)",
          color: "#ddd6f3",
        }}
      >
        {msg.isStreaming && msg.content === "" ? (
          <div className="flex items-center gap-1.5 py-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#8b5cf6" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        ) : (
          <ReactMarkdown
            components={{
              code({ className, children }) {
                const isBlock = className?.includes("language-");
                return isBlock ? (
                  <code
                    className={className}
                    style={{
                      display: "block",
                      background: "rgba(0,0,0,0.4)",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                      overflowX: "auto",
                      margin: "8px 0",
                      border: "1px solid rgba(139, 92, 246,0.1)",
                      color: "#22d3ee",
                    }}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    style={{
                      background: "rgba(139, 92, 246,0.08)",
                      padding: "1px 5px",
                      borderRadius: "4px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "#22d3ee",
                    }}
                  >
                    {children}
                  </code>
                );
              },
              p({ children }) {
                return <p style={{ marginBottom: "6px" }}>{children}</p>;
              },
              ul({ children }) {
                return (
                  <ul style={{ paddingLeft: "16px", marginBottom: "6px" }}>{children}</ul>
                );
              },
              li({ children }) {
                return <li style={{ marginBottom: "2px" }}>{children}</li>;
              },
            }}
          >
            {msg.content}
          </ReactMarkdown>
        )}

        {msg.isStreaming && msg.content && (
          <span
            className="inline-block w-0.5 h-3 ml-0.5 align-middle"
            style={{ background: "#8b5cf6", animation: "blink 1s step-end infinite" }}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  );
}

export default function AIAssistantApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "assistant",
      content: `Hi! I'm an AI assistant trained on ${personal.name}'s portfolio. Ask me anything — about their projects, skills, experience, or how to get in touch! 👋`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsLoading(true);
      setShowSuggested(false);

      try {
        abortRef.current = new AbortController();
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error("No response stream");

        let accumulated = "";
        streamLoop: while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break streamLoop;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                accumulated += delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, content: accumulated }
                      : m
                  )
                );
              } catch {
                // continue on parse error
              }
            }
          }
        }

        // Finalize
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, isStreaming: false } : m
          )
        );
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? {
                    ...m,
                    content: "Sorry, I encountered an error. Please check your API configuration.",
                    isStreaming: false,
                  }
                : m
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        content: `Chat cleared! Ask me anything about ${personal.name}'s portfolio.`,
        timestamp: new Date(),
      },
    ]);
    setShowSuggested(true);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "rgba(8, 5, 15,0.4)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(139, 92, 246,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(139, 92, 246,0.1)", border: "1px solid rgba(139, 92, 246,0.2)" }}
            aria-hidden="true"
          >
            <Bot size={13} style={{ color: "#8b5cf6" }} />
          </div>
          <span className="text-xs font-medium" style={{ color: "#ddd6f3" }}>
            AI Assistant
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            style={{ boxShadow: "0 0 4px #4ade80" }}
            aria-label="Online"
          />
        </div>
        <button
          onClick={clearChat}
          className="text-xs flex items-center gap-1 transition-colors"
          style={{ color: "#4d4270" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4d4270")}
          aria-label="Clear chat history"
        >
          <RefreshCw size={11} aria-hidden="true" /> Clear
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* Suggested prompts */}
        <AnimatePresence>
          {showSuggested && messages.length < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2"
            >
              <p className="text-xs mb-2 text-center" style={{ color: "#4d4270" }}>
                Suggested questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => sendMessage(prompt.prompt)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                    style={{
                      background: "rgba(139, 92, 246,0.06)",
                      border: "1px solid rgba(139, 92, 246,0.15)",
                      color: "#9186b0",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(139, 92, 246,0.12)";
                      e.currentTarget.style.color = "#22d3ee";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(139, 92, 246,0.06)";
                      e.currentTarget.style.color = "#9186b0";
                    }}
                    aria-label={`Ask: ${prompt.prompt}`}
                  >
                    <span>{prompt.icon}</span>
                    {prompt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-end gap-2 p-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(139, 92, 246,0.1)" }}
      >
        <div
          className="flex-1 flex items-end rounded-xl overflow-hidden"
          style={{
            background: "rgba(15, 10, 31,0.6)",
            border: "1px solid rgba(139, 92, 246,0.15)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            style={{
              resize: "none",
              background: "transparent",
              color: "#ddd6f3",
              outline: "none",
              flex: 1,
              padding: "10px 12px",
              fontSize: "13px",
              fontFamily: "var(--font-sans)",
              maxHeight: "100px",
              overflowY: "auto",
              lineHeight: 1.5,
            }}
            aria-label="Message input"
            aria-multiline="true"
          />
        </div>
        <motion.button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background:
              input.trim() && !isLoading
                ? "linear-gradient(135deg, #8b5cf6, #3730a3)"
                : "rgba(139, 92, 246,0.08)",
            border: "1px solid rgba(139, 92, 246,0.2)",
            cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
            opacity: input.trim() && !isLoading ? 1 : 0.5,
          }}
          whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
          whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
          aria-label="Send message"
          aria-disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 size={14} style={{ color: "#8b5cf6", animation: "spin 1s linear infinite" }} aria-hidden="true" />
          ) : (
            <Send size={14} style={{ color: input.trim() ? "white" : "#8b5cf6" }} aria-hidden="true" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
