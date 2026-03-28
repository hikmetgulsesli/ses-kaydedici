# Design System Document

## 1. Creative North Star: "The Sonic Laboratory"
This design system rejects the "utility-first" clutter of traditional recording software in favor of a high-end, editorial experience. The "Sonic Laboratory" aesthetic treats audio data as art. By utilizing **Space Grotesk’s** brutalist geometry alongside deep, layered obsidian surfaces, we create a space that feels authoritative, silent, and professional. 

The layout breaks the standard grid through **Intentional Asymmetry**: large-scale display typography for timecodes offset against compact, high-density control clusters. We do not use borders to define space; we use light and depth.

---

## 2. Color & Atmosphere
The palette is rooted in absolute darkness to ensure the waveform—the "soul" of the app—remains the undisputed protagonist.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning. Boundaries must be defined solely through background color shifts.
- To separate the "Library" from the "Recorder," use `surface-container-low` (#1C1B1B) against the main `surface` (#131313).
- **Glassmorphism:** For floating playback controllers, use `surface-container-highest` (#353534) at 60% opacity with a `24px` backdrop-blur.

### Signature Textures
Main CTAs (like the "Kaydet" button) should not be flat. Use a subtle linear gradient:
- **Recording State:** `primary` (#4BE277) to `primary-container` (#22C55E).
- **Playback State:** `secondary` (#C0C1FF) to `secondary-container` (#3131C0).

---

## 3. Typography: Editorial Authority
We pair the technical, wide-set stance of **Space Grotesk** with the functional clarity of **Inter** (replacing DM Sans for better screen legibility at small scales).

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Timecodes (e.g., 00:42:12) |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | "Tüm Kayıtlar", "Yeni Ses Kaydı" |
| **Title** | `title-md` | Inter | 1.125rem | Track Names, Modal Titles |
| **Body** | `body-md` | Inter | 0.875rem | Metadata, Descriptions |
| **Label** | `label-sm` | Space Grotesk | 0.6875rem | Uppercase micro-copy (e.g., KB/S) |

**Hierarchy Note:** Use `on-surface-variant` (#BCCBB9) for secondary text to create a sophisticated "receded" effect against the primary `fafafa` text.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "web-like." This system uses physical stacking.

*   **The Layering Principle:** Place a `surface-container-lowest` (#0E0E0E) card on a `surface-container-low` (#1C1B1B) section to create a "sunken" well for the waveform.
*   **Ambient Shadows:** For floating action buttons, use a tinted shadow: `0 20px 40px rgba(0, 0, 0, 0.4)`. Never use pure black shadows; they muddy the dark theme.
*   **The Ghost Border Fallback:** If a divider is required for accessibility, use `outline-variant` (#3D4A3D) at **15% opacity**.

---

## 5. Components

### The "Pulse" Record Button (Primary)
- **Shape:** `full` (9999px) roundedness.
- **Color:** `primary-container` (#22C55E).
- **State:** When active ("Kayıt Yapılıyor"), apply a `surface-tint` outer glow with a 10% opacity pulse animation.

### Waveform Visualizer
- **Inactive:** `surface-variant` (#353534).
- **Active Recording:** `primary` (#4BE277).
- **Active Playback:** `secondary` (#C0C1FF).
- **Style:** Use rounded bar caps (`rounded-sm`) to maintain a premium feel.

### Track Cards & Lists
- **Rule:** Forbid divider lines. 
- **Structure:** Use `spacing-6` (1.5rem) vertical padding to separate items.
- **Hover State:** Shift background from `surface` to `surface-container-high` (#2A2A2A). Use a "Ghost Border" on the left edge only to indicate selection.

### Micro-Interactions (Lucide React Icons)
- Icons must use `stroke-width={1.5}`. Bold icons feel "cheap"; thinner strokes feel "precision-engineered."
- **Interaction:** Icons should transition from `on-surface-variant` to `primary` on hover.

---

## 6. Do's and Don'ts

### Do
- **Do** use Turkish terminology: "Kaydet" (Record), "Duraklat" (Pause), "Paylaş" (Share), "Düzenle" (Edit).
- **Do** use `spacing-10` or `12` for margins around the waveform to let the audio "breathe."
- **Do** use `Space Grotesk` for all numeric values; its tabular figures are perfect for timers.

### Don't
- **Don't** use 100% white text. Stick to `#fafafa` to prevent "eye-bleed" on OLED screens.
- **Don't** use standard `rounded-md` for everything. Use `none` for top-level containers and `xl` for interactive cards to create a "Modular" look.
- **Don't** use "Delete" icons in red. Use `on-surface-variant` and only reveal `error` (#FFB4AB) during the confirmation state ("Silmek istediğinize emin misiniz?").

---

## 7. Interaction States (Turkish)

| Component | State | Label | Visual Feedback |
| :--- | :--- | :--- | :--- |
| **Record Button** | Idle | "Kayda Başla" | Flat Green |
| **Record Button** | Recording | "Durdur" | Pulsing Green Glow |
| **Playback** | Playing | "Oynatılıyor" | Indigo Waveform |
| **Empty State** | Empty | "Henüz kayıt yok" | `surface-variant` icon |