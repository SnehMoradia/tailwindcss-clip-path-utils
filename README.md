<div align="center">

# ✂️ tailwindcss-clip-path-utils

A Tailwind CSS plugin that provides intuitive **clip-path utilities** for circles, ellipses, polygons, and insets—without relying on verbose arbitrary value syntax.

✅ Tailwind CSS v3 & v4 • 🚀 Zero Configuration • ✂️ Dynamic Clip-Path Utilities

[![NPM Version](https://img.shields.io/npm/v/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![NPM Downloads](https://img.shields.io/npm/dt/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![License](https://img.shields.io/npm/l/tailwindcss-clip-path-utils?style=flat-square)](LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3%20%26%20v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

# ✂️ tailwindcss-clip-path-utils

A Tailwind CSS plugin that provides configurable clip-path utilities for **circles**, **ellipses**, **polygons**, and **insets**.

Compatible with both **Tailwind CSS v3** and **Tailwind CSS v4**.

## Installation

Install the package via npm (or your preferred package manager):

```bash
npm install tailwindcss-clip-path-utils
```

## Configuration

### Tailwind CSS v4

Add the plugin directive directly to your main CSS entry point:

```css
@import "tailwindcss";

@plugin "tailwindcss-clip-path-utils";
```

### Tailwind CSS v3

Add the plugin to your `tailwind.config.js` file:

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

## Usage

### Circle (`clip-path-cir-*`)

| Class | Output |
|-------|--------|
| `clip-path-cir-40` | `clip-path: circle(40%);` |
| `clip-path-cir-40-at-50-50` | `clip-path: circle(40% at 50% 50%);` |
| `clip-path-cir-[20px_at_10px_10px]` | `clip-path: circle(20px at 10px 10px);` |

---

### Ellipse (`clip-path-eli-*`)

| Class | Output |
|-------|--------|
| `clip-path-eli-25-40` | `clip-path: ellipse(25% 40%);` |
| `clip-path-eli-[20%_30%]` | `clip-path: ellipse(20% 30%);` |

---

### Inset (`clip-path-ins-*`)

| Class | Output |
|-------|--------|
| `clip-path-ins-10-10-10-10` | `clip-path: inset(10% 10% 10% 10%);` |

---

### Polygon (`clip-path-pol-*`)

| Class | Output |
|-------|--------|
| `clip-path-pol-50-0-100-100-0-100` | `clip-path: polygon(50% 0%, 100% 100%, 0% 100%);` |
| `clip-path-pol-[50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%]` | `clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);` |

## License

[MIT](LICENSE)