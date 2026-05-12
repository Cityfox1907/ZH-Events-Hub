"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATIONS } from "@/lib/data";
import { getReadNotifIds, markNotifsRead, onStorageChange } from "@/lib/storage";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSeen(getReadNotifIds());
    return onStorageChange(() => setSeen(getReadNotifIds()));
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const unread = NOTIFICATIONS.filter(
    (n) => n.unread && !seen.includes(n.id)
  ).length;

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    if (next) {
      const unreadIds = NOTIFICATIONS.filter((n) => n.unread).map((n) => n.id);
      setTimeout(() => markNotifsRead(unreadIds), 800);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleOpen}
        aria-label="Benachrichtigungen"
        className="relative p-2 rounded-full border border-line hover:border-burgundy transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-burgundy text-paper text-[10px] font-medium flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-line rounded-2xl card-shadow overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-line flex items-center justify-between">
            <span className="eyebrow">Benachrichtigungen</span>
            <span className="text-[11px] text-ink-faint">Demo</span>
          </div>
          <ul className="max-h-96 overflow-auto divide-y divide-line">
            {NOTIFICATIONS.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-paper-dim transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium uppercase tracking-wider text-burgundy">
                      {n.title}
                    </span>
                    <span className="text-[11px] text-ink-faint ml-auto">{n.ago}</span>
                  </div>
                  <p className="text-[13px] text-ink-muted mt-1">{n.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
