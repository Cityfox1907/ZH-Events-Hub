# ZurichTonight

> Zürich, jetzt. — Klickbarer Prototyp für eine kuratierte Zürcher Premium-Plattform.

Fünf Module unter einem Dach + Anbieter-Sicht:

- **Tonight** — Was läuft heute / am Wochenende / diese Woche
- **Dine** — Restaurant- & Bar-Reservierungen
- **Experience** — Erlebnisse mit lokalen Hosts
- **Pulse** — Premium-Networking & Community
- **Live** — Pop-up & Premium-Events
- **For Providers** — Anbieter-Landing + Mock-Dashboard

## Status: Phase-2-Prototyp

Voller, lebendiger Prototyp — alles Mock, kein Backend.

- Keine echten Buchungen, keine echten Reservierungen, keine Zahlungen
- Toast-Feedback mit "(Demo)"-Markierung bei jeder Aktion
- Mock-Auth, Bookmarks, Bookings, Recently-Viewed, Notifications-Read-State im `localStorage`
- Demo-Einträge (≥6 pro Modul) hardcoded in `lib/data.ts`
- Disintermediation visuell: keine Telefonnummern, alle Kontakte über Plattform-Formulare

## Quickstart

```bash
npm install
npm run dev
```

Öffne <http://localhost:3000>.

## Stack

- Next.js 15 · App Router · React 19
- TypeScript strict
- Tailwind CSS v4 (`@theme`-Direktive)
- Persistence: `localStorage`
- Fonts: Fraunces (Display) + DM Sans (Body)
- Icons: `lucide-react`

## Routes

```
/                  Home — Hero-Slider, Live-Counter, Trending, Stadtteile, Recently-Viewed, Pulse-Banner, Newsletter
/tonight           12 Events · Tabs (Heute / Wochenende / Woche) · funktionierende Filter mit Chips
/tonight/[id]      Detail · Tabs (Übersicht / Lage / FAQ) · Trust-Badges · Share · Similar Items
/dine              10 Venues · Date/Time/People-Picker · Filter · Skeleton Loading
/dine/[id]         Detail · Tabs (Übersicht / Bewertungen / Lage / FAQ) · Galerie · Reviews
/experience        8 Erlebnisse · Filter (Kategorie / Sprache / Dauer / Quartier)
/experience/[id]   Detail · Booking-Kalender (3 Monate, Zeitfenster, +/- Personen) · Host-Bio
/pulse             Membership-Pricing · 6 Pulse-Events
/pulse/[id]        Detail · RSVP · Belegungs-Bar · Curator-Notes
/live              Hero-Karussell (Auto-Rotate) · 8 Events · Filter
/live/[id]         Detail · Multi-Step Checkout · Tickets-Sold-Bar
/favorites         Alle gespeicherten Items, gruppiert nach Modul
/profile           Tabs: Favoriten · Buchungen (Anstehend/Vergangen/Storniert) · Bewertungen · Membership · Einstellungen
/for-providers     Anbieter-Landing · 4-Stufen-Pricing · Erfolgsstorys · Onboarding-Modal (3 Steps)
/provider/dashboard Mock-KPIs · Inquiries-Liste · Spotlight-Upgrade-CTA
```

## Phase-2-Highlights

- **Lebendige Home**: Hero-Image-Slider, Live-Counter, Trending-Listen, Stadtteil-Explorer, Recently-Viewed-Karussell
- **Funktionierende Filter** auf allen Modul-Listen (mit Chip-Anzeige, Reset, Counter)
- **Bookmarks** mit Herz-Icon, Pop-Animation, Counter im Header
- **Share-Modal** auf jeder Detail-Page (WhatsApp / E-Mail / Link kopieren)
- **Notification-Center** im Header mit Demo-Notifications & Read-State
- **Globale Suche** (⌘K) mit Trending-Suchen und Live-Resultaten
- **Recently-Viewed** wird beim Detail-Besuch getrackt und auf Home angezeigt
- **Loading-States** mit Skeleton-Cards
- **Booking-Kalender** mit echtem 3-Monats-Picker, Zeitfenster, Sold-Out-Slots, +/- Personen
- **Trust-Badges** (Verifiziert, Seit 2024, Top-Rated) auf Detail-Seiten
- **Mini-Map** (SVG) mit Standort-Pin
- **Provider-Sicht** mit Landing, Pricing-Tiers, Testimonials, Onboarding-Modal, Mock-Dashboard

## Sprache & Format

Schweizer Hochdeutsch (kein ß). Du-Form. CHF mit Ziffern.
