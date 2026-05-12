"use client";

import { useToast } from "./Toast";

export function TicketCTA({
  label,
  toast,
  variant = "primary",
}: {
  label: string;
  toast: string;
  variant?: "primary" | "secondary";
}) {
  const { push } = useToast();

  return (
    <button
      onClick={() => push(toast, "success")}
      className={`w-full py-3 rounded-lg font-medium transition-colors ${
        variant === "primary"
          ? "bg-burgundy text-paper hover:bg-burgundy-dark"
          : "bg-ink text-paper hover:bg-burgundy"
      }`}
    >
      {label}
    </button>
  );
}
