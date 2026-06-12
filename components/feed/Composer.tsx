"use client";

import { useState } from "react";
import { Image as ImageIcon, Smile, MapPin, CalendarClock, ListTodo } from "lucide-react";
import { FEED_ME } from "@/lib/feed";

const MAX_LENGTH = 280;

export function Composer({ onPost }: { onPost: (text: string) => void }) {
  const [text, setText] = useState("");
  const remaining = MAX_LENGTH - text.length;
  const canPost = text.trim().length > 0 && remaining >= 0;

  function submit() {
    if (!canPost) return;
    onPost(text.trim());
    setText("");
  }

  return (
    <div className="flex gap-3 px-4 py-3 border-b border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FEED_ME.avatar}
        alt={FEED_ME.name}
        className="w-10 h-10 rounded-full bg-paper-dim shrink-0 object-cover"
      />
      <div className="flex-1 min-w-0">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
          }}
          placeholder="Was läuft in Zürich?"
          rows={text.length > 80 ? 3 : 2}
          className="w-full resize-none bg-transparent text-[17px] placeholder:text-ink-faint focus:outline-none pt-1.5"
        />
        <div className="flex items-center justify-between border-t border-line pt-2 mt-1">
          <div className="flex items-center -ml-2 text-burgundy">
            {[
              { Icon: ImageIcon, label: "Bild anhängen" },
              { Icon: ListTodo, label: "Umfrage erstellen" },
              { Icon: Smile, label: "Emoji" },
              { Icon: CalendarClock, label: "Planen" },
              { Icon: MapPin, label: "Quartier markieren" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="p-2 rounded-full hover:bg-burgundy/10 transition-colors"
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {text.length > 0 && (
              <span
                className={`text-[12px] tabular-nums ${
                  remaining < 0
                    ? "text-rose-600 font-medium"
                    : remaining <= 20
                      ? "text-amber-600"
                      : "text-ink-faint"
                }`}
              >
                {remaining}
              </span>
            )}
            <button
              onClick={submit}
              disabled={!canPost}
              className="px-4 py-1.5 rounded-full bg-burgundy text-white text-[14px] font-bold hover:bg-burgundy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Posten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
