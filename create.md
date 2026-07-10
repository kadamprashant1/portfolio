# Code Generation Prompt: "Mission Control" 3D Space-Flight Portfolio

Use this prompt with an AI coding assistant (or as a spec for yourself) to build a
portfolio site in the style of the "Mission Control" space-flight portfolio.

---

## PROMPT

Build a single-page personal portfolio website with a **3D spaceship flight-simulator
interface** as its primary navigation metaphor, with a traditional scrollable fallback
page underneath. Style: sci-fi mission-control HUD, dark space background, monospace
typography, neon accent color (cyan/green), retro-terminal framing.

### 1. Concept & Framing
- Visitor "pilots a rocket" through a 3D starfield and docks with **6 orbital stations**,
  each representing a resume section:
  1. Bio Station → About Me
  2. Experience Log → Work Experience
  3. Academy Archive → Education
  4. Weapons Rack → Skills / Technical Expertise
  5. Research Lab → Research / Thesis
  6. Mission Archive → Projects
- Landing screen shows the pilot's name as a call sign, a version tag
  (e.g. "MISSION CONTROL // PORTFOLIO v3.0"), brief instructions, and two entry buttons:
  - **BEGIN MISSION** — launches the 3D flight experience
  - **SKIP TO DOCS** — jumps straight to the standard scrollable version (accessibility /
    low-effort escape hatch — always include this)

### 2. 3D Flight Mechanics (use Three.js or a lightweight WebGL wrapper)
- Free-flight rocket/ship controllable in 3D space with a starfield backdrop and 6
  glowing station markers placed at different coordinates.
- Controls (desktop):
  - `W/A/S/D` — pitch & yaw
  - `SPACE` — thrust
  - `SHIFT` — boost
  - `X` — brake
  - `E` / `F` / `Enter` — dock with a nearby station
  - `T` — auto-navigate to nearest/next station
  - `R` — reset position
  - `ESC` — close active overlay
- On-screen HUD (always visible during flight):
  - Position readout (e.g. `POS 0, 0, 0`)
  - Stations visited counter (e.g. `STATIONS 0 / 6`)
  - "Next station" directional indicator
  - Keybind legend, collapsible
- Mobile: detect small/touch screens, force **landscape orientation** with a "rotate your
  phone" interstitial, and swap keyboard controls for on-screen virtual joystick/thrust
  buttons.
- Docking at a station opens a **modal/overlay panel** styled like a terminal readout
  (title in all-caps with a sci-fi label, e.g. "## BIO STATION"), containing that
  section's real content. Overlay has a close (×) control and ESC support.

### 3. Content per Station (replace with real data)
- **Bio Station**: headshot photo, 1-paragraph bio, 3–4 bullet highlights with emoji
  icons, a short italicized personal quote/tagline, and 2 stat counters (e.g. "5+ Years
  Coding", "10+ Projects").
- **Experience Log**: reverse-chronological list of roles — title, organization, date
  range, 1–3 sentence description each.
- **Academy Archive**: reverse-chronological education entries — degree/level,
  institution, date range, grade/GPA, notable detail (thesis title, honors).
- **Weapons Rack**: skills grouped into categories (e.g. "Programming Languages", "Core
  Competencies") shown as tag/pill lists.
- **Research Lab**: 2 short paragraphs describing current research/thesis focus, methods,
  and milestones, with key terms bolded.
- **Mission Archive**: project cards, each with title, 2–3 tech-stack tags, 2-sentence
  description, and a "View Source" link with a GitHub icon.

### 4. Fallback Traditional Page (below or accessible via "Skip to Docs")
- Standard vertically-scrolling single-page resume with the **same content** duplicated
  in plain semantic HTML sections: Hero (name, title, tagline, key credential badges),
  About, Work Experience, Education, Technical Expertise, Research & Thesis, Featured
  Projects, Footer.
- Hero section includes profile photo, name, subtitle (role), and 3–4 credential badges.
- Footer styled like a system status bar: short "about me" blurb, quick links (GitHub,
  LinkedIn icons), contact emails, and a small system tag (e.g. "SYS v3.0",
  coordinates, "ONLINE" status indicator).

### 5. Visual Style
- Color palette: near-black/deep-navy background, one bright accent (cyan, green, or
  amber), white/light-gray body text.
- Font: monospace or techy sans-serif for headings/HUD; clean sans-serif for body copy.
- Iconography: emoji or simple line icons for bullet highlights; brand icons (GitHub,
  LinkedIn) for links.
- Motion: subtle starfield parallax, glowing/pulsing station markers, smooth camera
  easing, fade/slide transitions for overlay panels.

### 6. Tech Stack Suggestion
- Three.js (or react-three-fiber) for the 3D flight scene.
- Vanilla JS or React for UI/overlay state management.
- CSS variables for the color system; CSS Grid/Flexbox for the fallback page layout.
- Responsive breakpoints with a dedicated mobile/touch control scheme.
- SEO: meta title/description/OG tags/Twitter card tags populated with real name,
  role, and headline achievements, plus a profile image for social previews.

### 7. Non-negotiable UX requirements
- The 3D experience must never be the *only* way to reach the content — always keep the
  "Skip to Docs" fallback and make sure all content is present as real HTML (not
  canvas-only) for accessibility and crawlability.
- Provide clear onboarding text before the flight starts so first-time visitors
  understand the controls.

---

**Placeholders to fill in before use:** name, tagline, credentials/badges, profile photo,
bio paragraph, work experience entries, education entries, skills list, research
description, project list (with GitHub links), contact email(s), social links, and
brand accent color.