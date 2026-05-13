import { MessagesSquare, Users, Hash } from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";

export const metadata = {
  title: "Puls · Chat · ZurichTonight",
  description: "Quartier-Chats und Themen-Räume — folgt in Phase 2.",
};

const ROOMS = [
  { Icon: Hash, name: "kreis-5-allgemein", members: "1'247", lastMsg: "[Nachricht folgt]" },
  { Icon: Hash, name: "wochenmarkt-tipps", members: "842", lastMsg: "[Nachricht folgt]" },
  { Icon: Users, name: "expats-zürich-nord", members: "316", lastMsg: "[Nachricht folgt]" },
  { Icon: Hash, name: "concerts-jazz", members: "523", lastMsg: "[Nachricht folgt]" },
];

export default function PulsChatPage() {
  return (
    <>
      <PulsSubNav />
      <section className="container-editorial py-10">
        <p className="eyebrow">Puls · Chat</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Quartier-Chats &amp; Themen-Räume
        </h1>
        <p className="text-ink-muted text-[15px] mt-3 max-w-xl">
          Inhalte folgen in Phase 2 — hier entstehen die Chat-Räume nach
          Stadtteil und Thema.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROOMS.map((r) => (
            <div
              key={r.name}
              className="bg-card border border-line rounded-2xl card-shadow p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-paper-dim flex items-center justify-center text-burgundy shrink-0">
                <r.Icon className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg leading-tight">#{r.name}</p>
                <p className="text-[11.5px] text-ink-faint mt-0.5">
                  {r.members} Mitglieder
                </p>
                <p className="text-[12.5px] text-ink-muted mt-2 truncate">
                  {r.lastMsg}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-paper-dim/60 border border-line rounded-2xl flex items-start gap-4">
          <MessagesSquare
            className="w-5 h-5 text-burgundy shrink-0 mt-0.5"
            strokeWidth={1.6}
          />
          <p className="text-[13px] text-ink-muted">
            [Sektion: Chat-Architektur folgt in Phase 2 — Quartier-Räume,
            Themen-Räume, Direkt-Nachrichten, Moderations-Tools.]
          </p>
        </div>
      </section>
    </>
  );
}
