# ZurichTonight

> Zürich, jetzt. — Klickbarer Prototyp für eine kuratierte Zürcher Premium-Plattform.

Fünf Module unter einem Dach:

- **Tonight** — Was läuft heute / am Wochenende / diese Woche
- **Dine** — Restaurant- & Bar-Reservierungen
- **Experience** — Erlebnisse mit lokalen Hosts
- **Pulse** — Premium-Networking & Community
- **Live** — Pop-up & Premium-Events

## Status: Prototyp

Dies ist ein **klickbarer Prototyp**. Alle Aktionen sind Mock:

- Keine echten Buchungen, keine echten Reservierungen, keine Zahlungen
- Toast-Feedback mit "(Demo)"-Markierung bei jeder Aktion
- Mock-Auth, Bookmarks und Buchungen werden im `localStorage` gehalten
- Demo-Einträge sind hardcoded in `lib/data.ts`
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
- Persistence: `localStorage` (Bookmarks, Mock-Bookings, Mock-User)
- Fonts: Fraunces (Display) + DM Sans (Body)
- Icons: `lucide-react`

## Routes

```
/                  Home — Hero, 5 Modul-Cards, Heute-Abend-Vorschau, Newsletter
/tonight           Event-Liste mit Tabs (Heute / Wochenende / Woche) + Filter
/tonight/[id]      Event-Detail mit Tickets-Mock
/dine              Restaurants & Bars mit Date/Time/People-Picker
/dine/[id]         Venue-Detail mit Reservierungs-Formular und Reviews
/experience        Erlebnisse mit Filter
/experience/[id]   Detail mit Booking-Kalender (3 Slots)
/pulse             Membership-Pricing (Free / Premium / VIP) + Events
/pulse/[id]        Pulse-Event mit RSVP (Tier-gesperrt)
/live              Hero-Karussell + Liste
/live/[id]         Detail mit Mock-Checkout-Step (Select → Details → Done)
/profile           Tabs: Bookmarks, Buchungen, Membership, Einstellungen
```

## Sprache & Format

Schweizer Hochdeutsch (kein ß). Du-Form. CHF mit Ziffern.
