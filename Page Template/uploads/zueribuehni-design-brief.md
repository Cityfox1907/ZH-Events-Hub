# ZüriBühni — Design-Brief

> Vollständige Beschreibung der visuellen Sprache, des Layout-Aufbaus und der Komponenten-Architektur. Zum Kombinieren mit Design-Referenz-Screenshots.

---

## 1. Design-DNA

ZüriBühni ist die visuelle Antithese zu Eventfrog, Ticketcorner und allen "Listing-Plattformen". Wir bauen ein **editorial Erlebnis** — eine Plattform, die sich anfühlt wie ein gut kuratiertes Print-Magazin, das ins Digitale übersetzt wurde.

**Stil-Norden, an denen wir uns orientieren:**

- **Monocle Magazin** — ruhige Kolumnen-Architektur, viel Weißraum, präzise Typografie, warme Cremefarben, gedämpfte Akzente
- **NZZ Stilmagazin** — editorial Hierarchie, Display-Serifen mit Charakter, Bilder mit Bedeutung statt Dekoration
- **The Infatuation** — modern und nahbar, aber kuratiert, klare Bewertungs-Hierarchie ohne Sterne-Inflation
- **Apple App Store / Apple Music** — generöses Spacing, präzise Mikro-Interaktionen, niemals laut

**Was wir explizit NICHT sind:**

- Keine bunten Gradient-Hintergründe (keine Blau-zu-Lila-Kotzgrenzen)
- Kein Material-Design-Look mit großen Schatten
- Keine Drei-Spalten-Hero-Patterns mit Icon + Titel + Text
- Keine Emoji-Inflation
- Kein "Trust-Badge"-Theater (Lock-Icons, "Sicher seit 2026"-Banner)
- Keine generische SaaS-Optik (Stripe-Blau-Buttons, Linear-Knöpfe, weiße Cards mit Drop-Shadow)

**Ein-Satz-Charakter:**
*Ein warmer, kuratierter Editorial-Atlas für die Stadt — wie ein gedrucktes Stilmagazin, das in deiner Hosentasche lebt und weiß, was heute Abend in Zürich passiert.*

---

## 2. Visuelle Sprache

### Farbpalette

Die Palette ist bewusst schmal. Eine warme Creme-Basis, drei Tinten-Stufen für Text, drei Linien-Stufen für Borders, ein einziger satter Akzent.

| Rolle | Hex | Anwendung |
|---|---|---|
| **Paper** | `#f7f2ea` | Haupthintergrund der gesamten App |
| **Paper Dim** | `#efe7d8` | Sekundäre Hintergrund-Flächen, Hover-States bei Listen |
| **Card** | `#fdfaf3` | Hintergrund von Cards, leicht heller als Paper für sanfte Erhebung |
| **Ink** | `#1c1917` | Haupttext, Headlines |
| **Ink Muted** | `#57534e` | Sekundärtext, Beschreibungen |
| **Ink Faint** | `#a8a29e` | Tertiärtext, Eyebrows, Labels |
| **Line** | `#e7ddc9` | Hairline-Borders (Standard) |
| **Line Strong** | `#d4c4a8` | Verstärkte Borders (Inputs, aktive Pills) |
| **Burgundy** | `#7c1f1f` | EINZIGER Akzent — sparsam: aktive Filter, Going-Button, Selektionen |
| **Burgundy Dark** | `#5a1414` | Hover-Variante des Akzents |
| **Brass** | `#b8893d` | Mikro-Akzent für Verifizierungs-Badges, Stamm-User-Markierungen |

**Wichtige Regel:** Die Farbe Burgund taucht auf jeder Bildschirmseite **maximal an 2 Stellen** auf. Sie ist ein Statement, kein Dekor.

### Typografie

Zwei Schriften, jeweils mit klarer Funktion. Niemals gemischt mit anderen.

**Display-Schrift: Fraunces**
- Verwendung: Headlines, Event-Titel, Hero-Texte, Datum-Anzeigen in Cards
- Optical Sizing aktiv — die Schrift verändert ihren Charakter mit der Größe
- Variant Settings: `"SOFT" 50, "WONK" 0` — verleiht der Schrift den charakteristischen weichen, leicht eigensinnigen Editorial-Touch
- Letter-Spacing: −0.02em (leicht eng) für große Größen
- Niemals fett gesetzt — wir nutzen Größe und Optical Sizing für Hierarchie, nicht Bold

**Body-Schrift: DM Sans**
- Verwendung: Fließtext, Descriptions, UI-Elemente, Labels
- Standard-Weight 400, Medium-Weight 500 für Hervorhebungen
- Letter-Spacing: 0
- Font-Feature-Settings: `"ss01", "cv11"` für Charakter-Alternativen

**Größen-Hierarchie (Desktop):**

| Klasse | Größe | Line-Height | Anwendung |
|---|---|---|---|
| Display 1 | 80px / 5rem | 0.95 | Hero-Headlines ("Heute Abend.") |
| Display 2 | 56px / 3.5rem | 1.0 | Event-Titel auf Detail-Seite |
| Display 3 | 32px / 2rem | 1.1 | Sektion-Headlines |
| Display 4 | 24px / 1.5rem | 1.15 | Card-Titel |
| Body Large | 20px / 1.25rem | 1.5 | Hero-Lead-Paragraphen |
| Body | 16px / 1rem | 1.6 | Standard-Fließtext |
| Body Small | 14px / 0.875rem | 1.5 | Sekundäre Infos, Sidebar-Werte |
| Caption | 12px / 0.75rem | 1.4 | Tertiäre Infos, Counter |
| Eyebrow | 10px / 0.625rem | 1.3 | Uppercase Labels mit `letter-spacing: 0.15em–0.25em` |

**Mobile Skalierung:** Display-1 reduziert auf 48px, Display-2 auf 36px, Display-3 auf 24px. Body-Größen bleiben.

### Spacing-System

Striktes 4px-Raster. Erlaubte Werte: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. **Niemals andere Werte.** Diese Konsistenz ist das, was Apple-Niveau von durchschnittlichem Web-Design unterscheidet.

**Standard-Anwendungen:**
- Card-Padding innen: 20px (5)
- Sektion-Abstände: 64px (16) Desktop, 40px Mobile
- Container-Padding seitlich: 32px Desktop, 20px Mobile
- Element-Abstand innerhalb einer Card: 12–16px
- Hairline-Border-Trennung: 24px Padding davor und danach

### Schatten & Tiefe

Schatten sind extrem zurückhaltend. Niemals "Material"-Schatten mit großen Blurs.

- **Card Default:** `0 1px 2px rgba(28, 25, 23, 0.04), 0 0 0 1px rgba(28, 25, 23, 0.04)` — fast nicht sichtbar, nur subtile Erhebung
- **Card Hover:** `0 4px 16px rgba(28, 25, 23, 0.08), 0 0 0 1px rgba(28, 25, 23, 0.06)` — wahrnehmbar, aber nicht laut
- **Modal/Toast:** `0 20px 50px rgba(28, 25, 23, 0.15), 0 0 0 1px rgba(28, 25, 23, 0.08)` — klar abgehoben, aber elegant

### Border-Radien

- **Cards:** 8px
- **Buttons:** 9999px (vollständige Pills) oder 8px (rechteckig) — niemals dazwischen
- **Inputs:** 6px
- **Badges/Pills:** 9999px (immer pill-shaped)
- **Bilder:** 6–8px (subtil)
- **Niemals über 16px** außer für absichtliche Pills

### Texturen & Atmosphäre

Eine **subtile Papier-Körnung** liegt als SVG-Noise-Layer mit `opacity: 0.025` und `mix-blend-mode: multiply` über dem gesamten Hintergrund. Sie ist kaum sichtbar, aber sie nimmt der Plattform den "digitalen Plastik-Look" und gibt ihr taktile Wärme. Das ist einer der Gründe, warum sich die Plattform "anders" anfühlt als generische Web-UIs.

---

## 3. Layout-System

### Container

- **Max-Breite:** 1152px (`max-w-6xl` in Tailwind)
- **Zentriert horizontal**
- **Seitliches Padding:** 32px Desktop, 20px Mobile

### Breakpoints

- **Mobile:** 360–768px (1 Spalte)
- **Tablet:** 768–1024px (2 Spalten)
- **Desktop:** 1024px+ (3 Spalten Hauptgrids, oder Asymmetrie 1fr + 320px für Detail-Seiten)

### Grid für Event-Listen

- **Mobile:** 1 Spalte, 24px Gap
- **Tablet:** 2 Spalten, 24px Gap
- **Desktop:** 3 Spalten, 24px Gap
- Bei Aftermath-Variante: 2 Spalten Desktop für größere visuelle Präsenz

---

## 4. Bildschirme im Detail

Hier wird jede Hauptseite Pixel-für-Pixel im Aufbau beschrieben. Diese Beschreibung ist die Basis für die visuelle Umsetzung.

### 4.1 Globale Navigation (auf jeder Seite)

**Position:** Sticky-Top, leicht transparenter Paper-Hintergrund mit Backdrop-Blur (`backdrop-blur-md`).

**Aufbau (links nach rechts):**

- **Links:** Logo "ZüriBühni" in Fraunces 24px medium, daneben kleines Eyebrow "EST. 2026" in Caption-Größe, Ink-Faint-Farbe, uppercase, tracking 0.2em — nur auf Desktop sichtbar
- **Rechts:** Nav-Pills für drei Modi: "Heute Abend" / "Diese Woche" / "Aftermath"
  - Aktiver Modus: Ink-Hintergrund, Paper-Text, vollständig pill-shaped
  - Inaktive Modi: transparent, Ink-Muted-Text, Hover wechselt zu Ink

**Höhe:** 64px (16) inklusive Padding
**Border-Bottom:** 1px Hairline-Line

**Mobile:** Logo links, drei Pills rechts in einem horizontal scrollbaren Container falls nötig (aber bei drei Pills ist das nicht nötig).

### 4.2 Startseite "Heute Abend" (`/`)

**Hero-Header:**

- **Eyebrow oberhalb des Titels:** "Sonntag · 17. Mai 2026 · Zürich" in Caption-Größe, uppercase, Letter-Spacing 0.25em, Ink-Faint
- **Display 1 Headline:** "Heute Abend." — Fraunces, 80px Desktop / 48px Mobile, Tracking-tight, Line-Height 0.95
- **Lead-Paragraph darunter:** Maximale Breite 600px, Body Large 20px, Ink-Muted: "8 kuratierte Events, von der Tonhalle bis zum kleinen Jazz-Klub."
- **Padding-Top:** 64px Desktop, 32px Mobile
- **Padding-Bottom:** 40px
- **Border-Bottom:** Hairline

**Filter-Bar direkt unter Hero:**

- Horizontale Reihe von Pill-Buttons, scrollbar auf Mobile
- Erste Pill "Alle" (Ink-Hintergrund wenn aktiv)
- Danach Kategorie-Pills: "Konzert", "Klassik", "Klubs", "Comedy", "Theater", "Kunst", "Festival", "Volksfest", "Sport", "Gastro", "Mode"
- Größen-Filter rechts (kleines Dropdown oder Toggle): "Alle Größen / Mega / Major / Mid / Intimate"
- Pills haben Hairline-Border, sind transparent. Aktive Pill: Burgundy-Hintergrund, Paper-Text.
- Höhe: 36px, horizontaler Padding 16px innen, Margin zwischen Pills 8px

**Event-Grid:**

- 3 Spalten Desktop, 24px Gap
- Jede Card siehe Komponenten-Beschreibung 5.1
- Animation: Staggered Fade-Up (60ms Delay pro Card, max 600ms total)

**Sektion "Diese Woche kommt" (unter dem Grid):**

- 64px Margin-Top zur Trennung
- **Sektion-Header:** Display 3 "Diese Woche kommt" links, Link-Text "Alle anzeigen →" rechts in Caption-Größe, uppercase
- **Border-Bottom unter Header:** Hairline mit 16px Padding-Bottom
- **Liste in Compact-Card-Variante:** vertikale Liste, 6 Events, jede Card durch Hairline-Border getrennt
- Compact-Card siehe Komponenten-Beschreibung 5.2

### 4.3 Wochen-Seite (`/woche`)

**Hero:**
- Eyebrow: "Vorschau · Kalenderwoche 20"
- Display 1: "Diese Woche."
- Lead: "23 Events in den nächsten sieben Tagen. Vom Stadion bis zum Underground-Klub."

**Content-Bereich:**

- Events nach Tag gruppiert
- Pro Tag eine Sektion:
  - **Tages-Header:** Display 3 in Fraunces, z.B. "Montag, 18. Mai 2026" — Margin-Bottom 20px
  - **Compact-Cards** für die Events des Tages, durch Hairline getrennt
- Tage-Sektionen durch 48px vertikales Margin getrennt

### 4.4 Aftermath-Seite (`/aftermath`)

**Hero:**
- Eyebrow: "Was war · Letzte sieben Tage"
- Display 1: "Aftermath."
- Lead: "Wie war's wirklich? Reviews, Fotos und Diskussionen von Besucher:innen."

**Content-Grid:**

- 2 Spalten Desktop (größere visuelle Präsenz pro Card)
- 1 Spalte Mobile
- Aftermath-Card-Variante (siehe Komponenten 5.3) — größeres Cover, prominente Rating-Anzeige

**Empty-State** (wenn keine Reviews da sind):
- Zentriert, Body-Large-Text "Noch keine Reviews aus dieser Woche.", Ink-Muted

### 4.5 Event-Detail-Seite (`/event/[slug]`)

**Hero-Block (volle Breite, breaking out of container):**

- **Aspect-Ratio:** 21:9 Desktop / 16:9 Mobile
- **Hintergrund:** Deterministischer Radial-Gradient basierend auf Event-ID (siehe Gradient-System 5.10) — KEIN Stockfoto, keine flat color
- **Overlay:** Linear-Gradient von Schwarz 70% (unten) zu transparent (oben), damit Text lesbar bleibt
- **Innerer Container** mit max-w-6xl, zentriert
- **Position des Inhalts:** Bottom-Left
- **Aufbau (von oben nach unten):**
  - SizeBadge + CategoryBadge in einer Zeile mit 12px Gap
  - Display 2 Event-Titel in Paper-Farbe (auf dem Gradient lesbar)
  - Subtitle in Body-Large, Opacity 0.9

**Zwei-Spalten-Layout darunter (Desktop):**

- **Linke Spalte (1fr, max ~720px):** Hauptinhalt
- **Rechte Spalte (320px fix):** Sticky-Sidebar
- **Gap:** 48px

**Linke Spalte — Hauptinhalt:**

1. **Description-Paragraph** in Body-Large, Ink-Muted-Farbe, max-Breite 64ch
2. **Aktions-Sektion:** Going-Button (groß, Burgundy) + Tickets-Link (sekundär, outlined)
3. **Reviews-Sektion** (falls Past-Event):
   - Border-Top Hairline, Padding-Top 40px
   - Sektion-Header: "Reviews" (Display 3) links, durchschnittliches Rating rechts (große Display-Zahl)
   - Liste der Reviews — siehe Review-Komponente 5.5
   - "Review schreiben"-Button am Ende der Liste (öffnet Review-Form)
4. **Foto-Stream-Sektion:**
   - Border-Top Hairline, Padding-Top 40px
   - Header: "Fotos vom Abend (12)" (Display 3)
   - Grid 3 Spalten Desktop, 2 Spalten Mobile, 8px Gap
   - Jede Foto-Cell quadratisch, leicht abgerundet (6px)
   - "Foto hochladen"-Button am Ende — siehe Komponente 5.7

**Rechte Spalte — Sidebar:**

Sticky positioniert, Top-Offset 80px (unter Navigation).

**Eine Card mit Definition-List:**

| Label (Eyebrow) | Wert (Display 4) |
|---|---|
| Datum | Sonntag, 17. Mai |
| Beginn | 19:30 |
| Venue | Tonhalle Zürich · Enge |
| Größe | Major · 1'000–5'000 Plätze |
| Preis | ab CHF 65 |

Jede Zeile durch 16px Vertical-Padding getrennt. Card hat Hairline-Border, Card-Background.

**Eine zweite Card darunter** mit "Live"-Counter:
- Eyebrow "Live"
- Große Zahl in Display 3: "324"
- Caption darunter: "Personen gehen hin"

**Tags-Pills** ganz unten:
- Horizontal flowing Pills mit Hairline-Border, Caption-Größe, uppercase, Letter-Spacing 0.15em
- Beispiele: "klassik", "sinfonie", "premium"

**Mobile-Layout:** Sidebar wandert unter den Hauptinhalt, kein Sticky.

### 4.6 Neuer-Event-Form (`/neuer-event`)

**Hero:**
- Eyebrow: "Hilf der Community, Zürich abzubilden"
- Display 1: "Event vorschlagen."
- Lead: "Erzähle anderen Zürcher:innen, was du als nächstes erlebst."

**Form-Layout:**

- **Max-Breite:** 640px, zentriert
- **Vertical-Spacing zwischen Feldern:** 24px
- **Padding-Top der Form:** 48px nach Hero

**Felder von oben nach unten:**

1. **Titel** (Text-Input, full-width, Pflichtfeld)
2. **Subtitle** (Text-Input, full-width, optional)
3. **Zwei-Spalten-Reihe:** Kategorie (Select) + Größe (Select)
4. **Zwei-Spalten-Reihe:** Datum (Date) + Uhrzeit (Time)
5. **Venue-Name** (Text)
6. **Quartier** (Text)
7. **Beschreibung** (Textarea, 4 Zeilen, Character-Counter rechts unten "0/500")
8. **Preis ab** (Number, Suffix "CHF", optional)
9. **Tags** (Text, kommasepariert, Helper-Text "z.B. techno, underground, international")

**Submit-Button:** Volle Breite oder rechtsbündig, Burgundy-Hintergrund, "Event veröffentlichen", 48px hoch
**Cancel-Link:** Sekundär, "Abbrechen", führt zurück zur Startseite

**Form-Validation:**
- Inline-Errors in Burgundy-Farbe, Caption-Größe, mit 4px Margin-Top zum Feld
- Disabled Submit-Button bis alle Pflichtfelder gefüllt

**Success-State:**
- Toast-Notification unten rechts: "Event erstellt — wird in der Wochen-Übersicht angezeigt"
- Redirect zur neuen Event-Detail-Seite nach 1.5s

---

## 5. Komponenten-Bibliothek

### 5.1 EventCard — Default-Variante

Die wichtigste Komponente der Plattform. Wird in Heute-Abend-Grid verwendet.

**Aufbau (Top-to-Bottom):**

1. **Cover-Bereich** (Aspect-Ratio 3:2)
   - Hintergrund: Deterministischer Gradient (Event-ID-basiert)
   - Linear-Overlay schwarz 40% am unteren Rand
   - **Top-Left:** SizeBadge
   - **Bottom-Right:** Uhrzeit als Display 3 in Paper, darunter Datum als Eyebrow in Caption-Größe

2. **Content-Bereich** (Padding 20px)
   - **Eyebrow-Zeile:** "Konzert · Hallenstadion · Oerlikon" — Caption, Uppercase, Letter-Spacing 0.15em, Ink-Faint, separiert durch Bullet-Punkte
   - **Titel:** Display 4 in Fraunces, Line-Height 1.15
   - **Subtitle:** Body Small, Ink-Muted, max 1 Zeile (truncate)
   - **Footer:** Border-Top Hairline, Padding-Top 16px, Flex-Layout
     - Links: "324 gehen hin" — Caption, Ink-Muted
     - Rechts: "ab CHF 145" oder "Eintritt frei" — Caption, Ink-Muted

**Card-Container:**
- Border 1px Hairline
- Border-Radius 8px
- Background Card-Color
- Hover: Translation -2px, Box-Shadow auf Hover-Variante (300ms cubic-bezier(0.16, 1, 0.3, 1))

**Klickbar:** komplette Card ist Link

### 5.2 EventCard — Compact-Variante

Wird in Wochen-Liste und "Diese Woche kommt"-Sektion verwendet.

**Layout:** Horizontaler Block, durch Hairline-Border-Bottom getrennt zur nächsten

**Aufbau (Left-to-Right):**

1. **Mini-Cover** (56×56px, Border-Radius 6px, Gradient)
2. **Mittel-Spalte** (flex 1):
   - Eyebrow-Zeile: "Konzert · Tonhalle"
   - Titel in Display 4 (truncate)
   - Subtitle in Body Small Ink-Muted (truncate)
3. **Rechts-Spalte:**
   - Uhrzeit Display 3 ("19:30")
   - Datum Caption ("Mo, 18. Mai")

**Padding:** 16px vertikal
**Hover:** Hintergrund wird zu Paper-Dim mit 40% Opacity

### 5.3 EventCard — Aftermath-Variante

Wird auf der Aftermath-Seite verwendet, größere visuelle Präsenz.

**Aufbau:**

1. **Cover-Bereich** (Aspect-Ratio 16:9, größer als Default)
   - Gradient mit dunklerem Schwarz-Overlay (60%)
   - **Bottom-Left:** Eyebrow + Display 4 Titel — beides in Paper-Farbe
2. **Content-Bereich** (Padding 20px)
   - Flex-Layout horizontal:
     - **Links:** Großes Rating in Display 3 (z.B. "4.8") + "/ 5" in Caption
     - **Rechts:** "384 Reviews · 1247 Fotos" in Caption Ink-Muted

### 5.4 SizeBadge

Pille zur visuellen Größen-Klassifikation.

**Vier Varianten** (visuell unterschiedlich, damit auf einen Blick erkennbar):

- **Mega:** Burgundy-Hintergrund, Paper-Text, 4 schwarze Mini-Punkte vor dem Label
- **Major:** Ink-Hintergrund, Paper-Text, 3 Punkte
- **Mid:** Paper-Dim-Hintergrund, Ink-Text, Hairline-Border, 2 Punkte
- **Intimate:** Transparenter Hintergrund, Ink-Muted-Text, Hairline-Border, 1 Punkt

**Standard-Stil:**
- Border-Radius 9999px (Pill)
- Padding: 2px vertikal, 10px horizontal
- Caption-Größe (10px), Uppercase, Letter-Spacing 0.15em
- Höhe ca. 20px

### 5.5 Review-Komponente

Eine einzelne Review im Detail-View.

**Aufbau:**

- **Linker Border 2px in Burgundy-Farbe**, Padding-Left 20px
- **Header-Zeile:**
  - Author-Name in Body-Medium-Weight
  - Verifizierungs-Badge (falls verifiziert): kleine Pill mit Hairline-Border, Caption-Text "Saisonkarte verifiziert", Brass-Akzent
  - Bullet-Punkt
  - Sterne als Unicode-Zeichen: gefüllte Sterne in Ink, leere in Line-Strong-Farbe
- **Review-Text** in Body, Ink-Farbe
- **Optionale Detail-Zeile** unten (falls Sitzplatz/Akustik angegeben):
  - Caption, Ink-Faint
  - Format: "Sitzplatz: Block C · Akustik: 5/5"

### 5.6 ReviewForm

Klappt aus, wenn "Review schreiben" geklickt wird.

**Aufbau:**

1. **Star-Selector:** Fünf Sterne, klickbar, hover-effect (Sterne füllen sich beim Hover bis zur Hover-Position)
2. **Textarea:** Placeholder "Wie war's wirklich?", 4 Zeilen, max 1000 Zeichen
3. **Optional-Sektion** (collapsibel "Sitzplatz und Akustik bewerten"):
   - Sitzplatz (Text)
   - Akustik-Rating (1–5)
4. **Submit-Button:** "Review veröffentlichen" in Burgundy

### 5.7 PhotoUploader

**Aufbau:**

- **Drop-Zone**: Große rechteckige Fläche mit gestricheltem Hairline-Border, Padding 32px, Border-Radius 8px
- **Inhalt der Drop-Zone:**
  - Icon (Foto-Plus aus lucide-react)
  - Body-Text: "Foto vom Abend hochladen"
  - Caption: "Klicke oder ziehe Foto hierher"
- **Hover-State:** Border wechselt zu Burgundy-Farbe, Hintergrund wird zu Paper-Dim
- **Nach Upload:** Foto erscheint sofort im Foto-Stream darüber, Drop-Zone bleibt für weitere Uploads

### 5.8 GoingButton

**Aufbau:**

- **Default-State:** Burgundy-Hintergrund, Paper-Text, Pille-shaped, "Ich gehe hin"
- **Going-State (geklickt):** Ink-Hintergrund, Paper-Text, "✓ Du gehst hin"
- **Hover:** dunklere Variante des Hintergrunds
- **Höhe:** 44px, Padding-X 24px

### 5.9 Filter-Pills (FilterBar)

**Container:** Horizontaler Flex, 8px Gap, scrollbar auf Mobile

**Einzelne Pill:**

- **Inaktiv:** Hairline-Border, transparent, Ink-Muted-Text, Caption-Größe Uppercase Letter-Spacing 0.1em
- **Aktiv:** Burgundy-Hintergrund, Paper-Text, kein Border
- **Hover (inaktiv):** Hintergrund wird zu Paper-Dim
- **Höhe:** 32px, Padding-X 14px, Border-Radius 9999px
- **Transition:** 200ms cubic-bezier

### 5.10 Gradient-System (Cover-Fallbacks)

Da wir keine Stockfotos verwenden (Premium-Brand-Risiko), generieren wir aus jedem Event einen einzigartigen Cover-Gradient.

**Algorithmus:**
- Aus Event-ID wird ein Hash berechnet
- Hash wählt aus 6 Farbpaletten aus
- Jede Palette ist ein Radial-Gradient mit 3 Farb-Stops

**Die 6 Paletten:**

1. Burgundy → Dark Red → Black (für Klassik, Konzerte mit Tiefe)
2. Deep Blue → Night → Black (für Klubs, Nightlife)
3. Bronze → Coffee → Dark (für Gastro, Wein-Events)
4. Forest → Moss → Dark Green (für Open-Air, Volksfeste)
5. Plum → Wine → Dark Purple (für Theater, Oper)
6. Ochre → Umber → Dark Brown (für Kunst, Vernissagen)

**Charakter:** Die Gradients sind warm und gedämpft, niemals laut. Sie wirken wie Print-Cover eines Magazins, nicht wie Tech-UI-Gradients.

### 5.11 Toast-Notification

**Position:** Bottom-Right, fixed, 24px vom Rand
**Aufbau:**
- Card-Background, Hairline-Border, Modal-Schatten
- Padding 16px 20px
- Body-Small-Text in Ink
- Optional kleines Icon links (Check für Success, X für Error)
- Auto-dismiss nach 3 Sekunden mit Fade-Out

---

## 6. Motion & Mikro-Interaktionen

**Animation-Curve:** Durchgängig `cubic-bezier(0.16, 1, 0.3, 1)` für ease-out. Niemals lineare Animationen.

**Standard-Durations:**
- Hover-Übergänge: 200ms
- Card-Reveal-Animationen: 500ms
- Page-Transitions: 400ms
- Toast-Fade: 300ms in, 200ms out

**Konkrete Mikro-Interaktionen:**

- **Card-Reveal beim Page-Load:** Stagger-Animation mit 60ms Delay pro Card, max 600ms Total. Cards faden von Opacity 0 + translateY(8px) zu Opacity 1 + translateY(0).
- **Going-Button-Klick:** Button-Background-Übergang, Counter-Zahl flippt mit subtle Scale (1.0 → 1.1 → 1.0 in 300ms)
- **Filter-Pill-Klick:** Background-Übergang 200ms, der gefilterte Grid faded out (150ms) und neu ein (300ms)
- **Review-Submit:** Form schiebt nach oben in die Liste (translateY-Animation), Form selbst kollabiert, Toast erscheint
- **Foto-Upload:** Foto erscheint mit Scale-In-Animation (0.95 → 1.0 + Opacity 0 → 1) in 300ms
- **Hover auf Card:** translateY(-2px) + Shadow-Übergang, beides 300ms cubic-bezier

---

## 7. Mobile-Anpassungen

Mobile ist nicht "Desktop kleiner gemacht" — es ist eine eigene Komposition.

**Top-Anpassungen:**

- **Hero-Headlines reduziert:** Display 1 von 80px auf 48px
- **Container-Padding seitlich:** 20px statt 32px
- **Grid:** Immer 1 Spalte
- **Sidebar auf Detail-Seite:** Wandert UNTER den Hauptinhalt, ohne Sticky
- **Filter-Bar:** Horizontal scrollbar mit `-webkit-overflow-scrolling: touch`
- **Navigation:** Logo + 3 Pills nebeneinander, Pills werden enger gepackt (padding-x 12px statt 16px)
- **Event-Detail-Hero:** Aspect-Ratio wechselt von 21:9 zu 16:9 für mehr Höhe

**Touch-Targets:** Minimum 44×44px (Apple HIG-Standard). Pills bekommen erweiterten Tap-Bereich via Padding.

---

## 8. Tonalität in Texten

Die Wort-Wahl ist Teil des Designs.

**Charakter:** Du-Form, kuratiert, knapp, niemals werblich.

**Beispiele für Plattform-Texte:**

| Schwach (vermeiden) | Gut (verwenden) |
|---|---|
| "Discover Amazing Events!" | "Was läuft in Zürich. Kuratiert." |
| "Click here to RSVP" | "Ich gehe hin" |
| "🎉 New event added!" | "Event erstellt — erscheint im Wochenkalender." |
| "Be the first to comment!" | "Sei die erste Stimme." |
| "Share with your friends" | "Mit Freunden teilen" |
| "Loading more events..." | "Mehr Events werden geladen" |

**Datums-Format:** "Sonntag, 17. Mai 2026" (Long), "So, 17. Mai" (Short)
**Zahlen:** "CHF 13'000" mit Apostroph, niemals Komma
**Zeit:** "19:30", niemals "7:30 PM"

---

## 9. Was diese Plattform UNVERWECHSELBAR macht

Wenn du am Ende fragst: *Woran erkennt man ZüriBühni in einem Stack von 20 Screenshots?* — die Antwort ist:

1. **Die warme Creme-Farbe `#f7f2ea`** statt sterilem Weiß
2. **Fraunces als Display-Schrift** mit ihrem optischen Charakter — niemals die Standard-Sans-Serifs
3. **Die deterministischen Farb-Gradients als Cover** — kein einziges Stockfoto
4. **Hairline-Borders überall** statt fetter Schatten — die Plattform "atmet"
5. **Sparsames Burgund** als einziger Akzent — niemals Regenbogen-Paletten
6. **Großzügiges Spacing** — die Plattform ist nicht voll, sie ist kuratiert
7. **Die Papier-Körnung als unsichtbarer Layer** — gibt der Plattform taktile Wärme
8. **Editorial Tonalität** in jedem Text — niemals Marketing-Sprech

---

*Diese Beschreibung ist als Komplement zu den vorhandenen Design-Referenz-Screenshots gedacht. Die Screenshots zeigen die Atmosphäre, dieses Dokument liefert die strukturelle Architektur.*
