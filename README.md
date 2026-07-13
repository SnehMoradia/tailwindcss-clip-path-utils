<div align="center">

# ✂️ tailwindcss-clip-path-utils

A Tailwind CSS plugin that provides intuitive **clip-path utilities** for **circles**, **ellipses**, **polygons**, and **insets**—without relying on verbose arbitrary value syntax.

✅ Tailwind CSS v3 & v4 • 🚀 Zero Configuration • ✂️ Dynamic Clip-Path Utilities

[![NPM Version](https://img.shields.io/npm/v/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![NPM Downloads](https://img.shields.io/npm/dt/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![License](https://img.shields.io/npm/l/tailwindcss-clip-path-utils?style=flat-square)](LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3%20%26%20v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Features

- ✅ **Tailwind CSS v3 & v4** support out of the box
- ✅ **Zero configuration** required to get started
- ✅ **Circle utilities** with radius and coordinates positioning
- ✅ **Ellipse utilities** with vertical/horizontal radii and positions
- ✅ **Polygon utilities** with multi-node coordinate paths
- ✅ **Inset utilities** with customizable top, right, bottom, left offsets
- ✅ **Bracketless Syntax** for clean, inline, fully dynamic coordinates
- ✅ **Supports arbitrary JIT values** for custom fallback formats
- ✅ **Interactive Visual Generator** built directly into the local environment

---

# 📦 Installation

```bash
npm install tailwindcss-clip-path-utils
```

---

# ⚙️ Configuration

## Tailwind CSS v4

```css
@import "tailwindcss";

@plugin "tailwindcss-clip-path-utils";
```

## Tailwind CSS v3

```js
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-clip-path-utils"),
  ],
};
```

---

# 🎨 Interactive Visual Generator

Need to trace an image or build complex clip-paths visually?

### Running from the plugin repository:
Run:
```bash
npm run dev
```

### Running from a host project (installed as a dependency):
Run:
```bash
npx clip-path-generator
```

This launches the local development server and automatically opens the visual editor in your browser (defaulting to port `3000`, or automatically incrementing to `3001`, `3002`, etc. if the port is already in use):

```text
http://localhost:3000 (or fallback port)
```

### Key Visual Generator Features:
- **Organized Control Tabs**: Clean interface divided into **Editor** controls, **Canvas** background customizers, and **Image Shape Extractor** panels.
- **Canvas Drag-and-Drop**: Drag images from your computer or other browser tabs directly onto the canvas to serve as tracing guides.
- **Image Shape Extractor**: Upload transparent PNG/SVGs or solid JPEG silhouettes, configure detection thresholds/nodes, and automatically compute coordinates.
- **Draggable Preview Anchors**: Interactively drag the green centroid point to shift tracing origins, or drag coordinate handles directly in the preview window with real-time workspace updates.

---

# 🚀 Usage

## Circle

| Class | CSS Output | Description |
|--------|------------|-------------|
| `clip-path-cir-40` | `clip-path: circle(40%);` | Standard circle radius |
| `clip-path-cir-40-at-50-50` | `clip-path: circle(40% at 50% 50%);` | Custom position coordinates |
| `clip-path-cir-[20px_at_10px_10px]` | `clip-path: circle(20px at 10px 10px);` | Arbitrary JIT syntax |

---

## Ellipse

| Class | CSS Output | Description |
|--------|------------|-------------|
| `clip-path-eli-25-40` | `clip-path: ellipse(25% 40%);` | Standard ellipse radii |
| `clip-path-eli-25-40-at-50-50` | `clip-path: ellipse(25% 40% at 50% 50%);` | Custom radii at center point |
| `clip-path-eli-[20%_30%]` | `clip-path: ellipse(20% 30%);` | Arbitrary JIT syntax |

---

## Inset

| Class | CSS Output | Description |
|--------|------------|-------------|
| `clip-path-ins-10-10-10-10` | `clip-path: inset(10% 10% 10% 10%);` | Uniform top-right-bottom-left offset |
| `clip-path-ins-10-20-15-10` | `clip-path: inset(10% 20% 15% 10%);` | Non-uniform offsets |

---

## Polygon

| Class | CSS Output | Description |
|--------|------------|-------------|
| `clip-path-pol-50-0-100-100-0-100` | `clip-path: polygon(50% 0%, 100% 100%, 0% 100%);` | Triangle layout |
| `clip-path-pol-81-11-61-78-19-73-38-6` | `clip-path: polygon(81% 11%, 61% 78%, 19% 73%, 38% 6%);` | Dynamic multi-point shape |
| `clip-path-pol-[50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%]` | `clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);` | Arbitrary JIT syntax |

---

# 💡 Example

```html
<!-- Bracketless Utilities -->
<div class="clip-path-cir-40 bg-red-500 size-40"></div>
<div class="clip-path-eli-25-40 bg-blue-500 size-40"></div>
<div class="clip-path-pol-50-0-100-100-0-100 bg-green-500 size-40"></div>
<div class="clip-path-ins-10-20-15-10 bg-yellow-500 size-40"></div>
```

---

# 📄 License

Licensed under the **MIT License**.

```
MIT © Sneh Moradia
```