"use client";

import { useEffect, useState } from "react";
import { Mail, Link2, Share2, X, MessageCircle } from "lucide-react";
import { useToast } from "./Toast";

export function ShareButton({
  title,
  variant = "pill",
}: {
  title: string;
  variant?: "pill" | "icon";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={
          variant === "pill"
            ? "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-[13px] font-medium hover:border-burgundy hover:text-burgundy transition-colors"
            : "p-2 rounded-full bg-paper/85 hover:bg-paper text-ink backdrop-blur"
        }
        aria-label="Teilen"
      >
        <Share2 className="w-4 h-4" />
        {variant === "pill" && "Teilen"}
      </button>
      {open && <ShareModal title={title} onClose={() => setOpen(false)} />}
    </>
  );
}

export function ShareModal({
  open,
  title,
  onClose,
}: {
  open?: boolean;
  title: string;
  url?: string;
  onClose: () => void;
}) {
  if (open === false) return null;
  const { push } = useToast();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function copyLink() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    push("✓ Link kopiert (Demo)", "success");
    onClose();
  }

  function fakeShare(channel: string) {
    push(`✓ Geteilt via ${channel} (Demo)`, "success");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-sm bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 relative"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="eyebrow">Teilen</p>
        <h3 className="font-display text-2xl mt-1 leading-tight">{title}</h3>

        <div className="mt-5 space-y-2">
          <ShareRow
            icon={<MessageCircle className="w-5 h-5" />}
            label="WhatsApp"
            onClick={() => fakeShare("WhatsApp")}
          />
          <ShareRow
            icon={<Mail className="w-5 h-5" />}
            label="E-Mail"
            onClick={() => fakeShare("E-Mail")}
          />
          <ShareRow
            icon={<Link2 className="w-5 h-5" />}
            label="Link kopieren"
            onClick={copyLink}
          />
        </div>
      </div>
    </div>
  );
}

function ShareRow({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-line bg-paper hover:border-burgundy hover:text-burgundy transition-colors text-left"
    >
      {icon}
      <span className="text-[14px] font-medium">{label}</span>
    </button>
  );
}
