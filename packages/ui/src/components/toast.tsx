"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const VARIANT_CLASSES: Record<NonNullable<ToastMessage["variant"]>, string> = {
  default: "border-border",
  success: "border-accent",
  error: "border-red-500",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map(({ id, title, description, variant = "default" }) => (
          <RadixToast.Root
            key={id}
            duration={5000}
            onOpenChange={(open) => !open && dismiss(id)}
            className={cn(
              "rounded-card border bg-background-elevated p-4 shadow-lg data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out",
              VARIANT_CLASSES[variant],
            )}
          >
            <RadixToast.Title className="text-sm font-semibold">{title}</RadixToast.Title>
            {description && (
              <RadixToast.Description className="mt-1 text-sm text-foreground-muted">
                {description}
              </RadixToast.Description>
            )}
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-6" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
