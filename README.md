# ZüriBühni

Premium Live-Atlas für Zürich — kuratiert, nicht gelistet.

> Eventbrite trifft Letterboxd trifft Monocle. Drei Säulen: **Aftermath-First**, **Single Event Object**, **radikale Kuration**.

## Quickstart

```bash
npm install
npm run dev
```

Öffne <http://localhost:3000>.

## Stack

- Next.js 15 · App Router · React 19
- TypeScript strict
- Tailwind CSS v4 (`@theme`-Direktive für Tokens)
- Persistence: `localStorage` (kein Backend nötig — bewusst gewählt für Prototyp-Reife ohne Setup)
- Fonts via `next/font/google`: Fraunces (Display) + DM Sans (Body)
- Icons: `lucide-react`

## Architektur

```
app/        — Routes (Server Components by default)
components/ — UI (Client Components nur wo nötig)
  views/    — Client-side gerenderte Listen-/Detail-Views (lesen localStorage)
lib/        — Daten & Logik (types, seed, storage, events, reviews, photos, going)
```

Alle Reads, die `localStorage` betreffen, leben in `components/views/*` oder werden in `useEffect` synchronisiert. Server-rendert nur den Page-Chrome.

## Daten-Modell

Reference-Now ist auf **Sonntag, 17. Mai 2026, 19:00** fixiert (`lib/seed-events.ts → REFERENCE_NOW_ISO`), damit die 28 Seed-Events relativ zu einem stabilen Datum stehen.

- 28 Seed-Events (Konzerte, Klubs, Theater, Kunst, Festivals, Volksfeste, Sport, Gastro, Mode)
- 8 Seed-Reviews für Past-Events (werden beim ersten Mount in `localStorage` importiert)
- User-Events landen in `localStorage` und mischen sich nahtlos in alle Views

## Features

- **Heute Abend** (`/`) — heutige Events + Vorschau auf die Woche
- **Diese Woche** (`/woche`) — chronologisch nach Tag gruppiert
- **Aftermath** (`/aftermath`) — Past-Events mit Reviews/Fotos, sortiert nach Aktivität
- **Detail** (`/event/[slug]`) — Description, Going-Toggle, Reviews, Foto-Upload, Sidebar
- **Event vorschlagen** (`/neuer-event`) — Form mit Validation, dedupliziert via Fingerprint
- Filter nach Kategorie + Größe (Pills)
- Foto-Upload mit clientseitiger Komprimierung (Canvas → JPEG 0.8, max 800px)
- Going-Status in `localStorage`, Counter aktualisiert live über Custom-Event-Channel

## Design-System

- Spacing-Skala: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Eine Akzentfarbe: `--color-burgundy` (`#7c1f1f`)
- Schatten max 16 px Blur
- Border-Radius max 16 px (außer Pills)
- Animationen `cubic-bezier(0.16, 1, 0.3, 1)`, 200–400 ms
- WCAG-AA Kontraste

## Sprache & Format

- Schweizer Hochdeutsch (kein ß, "Velo", "Tram")
- Datum: "Sonntag, 17. Mai 2026"
- Zahlen: "CHF 13'000" (Apostroph-Tausender)
- Du-Form
