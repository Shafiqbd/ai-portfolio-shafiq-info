"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@shafiq-info/ui";
import { askShafiq } from "@/services/ai.service";
import { ASK_SHAFIQ_OPEN_EVENT } from "@/lib/ask-shafiq-event";

interface Turn {
  question: string;
  answer: string;
}

const FALLBACK_ANSWER =
  "I don't have a reviewed answer for that yet — try the Contact page to ask Shafiq directly.";

const SUGGESTIONS = [
  "What does Shafiq specialize in?",
  "Is he available for remote opportunities?",
  "What services does he offer?",
];

export function AskShafiqPanel() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener(ASK_SHAFIQ_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(ASK_SHAFIQ_OPEN_EVENT, handleOpen);
  }, []);

  async function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setQuestion("");
    try {
      const match = await askShafiq(trimmed);
      setTurns((prev) => [
        ...prev,
        { question: trimmed, answer: match?.answer ?? FALLBACK_ANSWER },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Ask Shafiq AI"
          className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-card border border-border bg-background-elevated shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="text-sm font-semibold">Ask Shafiq AI</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="rounded-control cursor-pointer p-1 text-foreground-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
            {turns.length === 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-foreground-muted">
                  Answers come only from a reviewed knowledge base — ask about Shafiq&apos;s
                  experience, stack, or availability.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void ask(suggestion)}
                      className="rounded-control border border-transparent px-3 py-2 text-left text-sm text-foreground-muted transition-all [background:linear-gradient(var(--background),var(--background))_padding-box,var(--gradient-brand-soft)_border-box] hover:text-foreground hover:[background:linear-gradient(var(--background),var(--background))_padding-box,var(--gradient-brand)_border-box]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {turns.map((turn, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="self-end rounded-card bg-gradient-brand px-3 py-2 text-sm text-white">
                  {turn.question}
                </p>
                <p className="self-start rounded-card border border-border bg-background px-3 py-2 text-sm">
                  {turn.answer}
                </p>
              </div>
            ))}

            {loading && <p className="text-sm text-foreground-muted">Thinking…</p>}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="flex-1 rounded-control border border-border bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <Button type="submit" size="sm" disabled={loading} aria-label="Send">
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-sm font-medium text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
      >
        <Bot className="h-4 w-4" aria-hidden="true" />
        {open ? "Close" : "Ask Shafiq AI"}
      </button>
    </div>
  );
}
