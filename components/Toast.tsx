"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, Info } from "lucide-react";
import type { ToastMessage } from "@/lib/types";

interface ToastContextValue {
  push: (text: string, variant?: ToastMessage["variant"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      push: () => {
        /* no-op outside provider */
      },
    };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const push = useCallback<ToastContextValue["push"]>((text, variant = "default") => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastBubble key={t.id} toast={t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastBubble({ toast }: { toast: ToastMessage }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLeaving(true), 2900);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      role="status"
      className={`pointer-events-auto toast-slide-up flex items-center gap-3 max-w-sm pl-4 pr-5 py-3 rounded-full bg-ink text-card text-[14px] font-medium card-shadow transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {toast.variant === "success" ? (
        <CheckCircle2 className="w-4 h-4 text-brass" strokeWidth={1.75} />
      ) : (
        <Info className="w-4 h-4 text-brass" strokeWidth={1.75} />
      )}
      <span>{toast.text}</span>
    </div>
  );
}
