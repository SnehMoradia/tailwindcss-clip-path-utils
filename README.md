<div align="center">

# ✂️ tailwindcss-clip-path-utils

Powerful **clip-path utilities** for Tailwind CSS with an interactive visual generator to create custom shapes in seconds.

✅ Tailwind CSS v3 & v4 • 🚀 Zero Configuration • 🎨 Visual Clip-Path Generator

[![NPM Version](https://img.shields.io/npm/v/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![NPM Downloads](https://img.shields.io/npm/dt/tailwindcss-clip-path-utils?style=flat-square&logo=npm)](https://www.npmjs.com/package/tailwindcss-clip-path-utils)
[![License](https://img.shields.io/npm/l/tailwindcss-clip-path-utils?style=flat-square)](LICENSE)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3%20%26%20v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

### 🌐 Visual Generator

**Create your own clip-path visually**

👉 **https://tailwindcss-clip-path-utils.vercel.app/**

No math. No guessing. Just drag points and copy the generated Tailwind class.

</div>

---

# ✨ Features

- ✅ Tailwind CSS v3 & v4 support
- ✅ Zero configuration
- ✅ Circle utilities
- ✅ Ellipse utilities
- ✅ Polygon utilities
- ✅ Inset utilities
- ✅ Clean bracketless syntax
- ✅ Supports arbitrary values
- ✅ Interactive visual clip-path generator
- ✅ Export directly as Tailwind utility classes

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
  plugins: [
    require("tailwindcss-clip-path-utils"),
  ],
};
```

---

# 🎨 Create Your Own Clip Path

Instead of manually calculating coordinates, build your own clip-path visually.

## 🌐 Online Generator

**https://tailwindcss-clip-path-utils.vercel.app/**

### Features

- 🎯 Drag points visually
- 🖼 Upload an image and trace its shape
- 🎨 Live preview
- 📍 Move polygon vertices freely
- 📋 Copy generated Tailwind class
- ⚡ Works directly in the browser
- 🚀 No installation required

Example generated class:

```html
<div class="clip-path-pol-81-11-61-78-19-73-38-6"></div>
```

---

# 💻 Local Visual Generator

Prefer working locally?

### Inside the plugin repository

```bash
npm run dev
```

### From any project where the plugin is installed

```bash
npx clip-path-generator
```

The generator automatically opens in your browser.

```
http://localhost:3000
```

If port **3000** is occupied, it will automatically use **3001**, **3002**, etc.

---

# 🚀 Usage

## Circle

| Class | CSS Output |
|--------|------------|
| `clip-path-cir-40` | `clip-path: circle(40%);` |
| `clip-path-cir-40-at-50-50` | `clip-path: circle(40% at 50% 50%);` |
| `clip-path-cir-[20px_at_10px_10px]` | `clip-path: circle(20px at 10px 10px);` |

---

## Ellipse

| Class | CSS Output |
|--------|------------|
| `clip-path-eli-25-40` | `clip-path: ellipse(25% 40%);` |
| `clip-path-eli-25-40-at-50-50` | `clip-path: ellipse(25% 40% at 50% 50%);` |
| `clip-path-eli-[20%_30%]` | `clip-path: ellipse(20% 30%);` |

---

## Inset

| Class | CSS Output |
|--------|------------|
| `clip-path-ins-10-10-10-10` | `clip-path: inset(10% 10% 10% 10%);` |
| `clip-path-ins-10-20-15-10` | `clip-path: inset(10% 20% 15% 10%);` |

---

## Polygon

| Class | CSS Output |
|--------|------------|
| `clip-path-pol-50-0-100-100-0-100` | `clip-path: polygon(50% 0%,100% 100%,0% 100%);` |
| `clip-path-pol-81-11-61-78-19-73-38-6` | `clip-path: polygon(81% 11%,61% 78%,19% 73%,38% 6%);` |
| `clip-path-pol-[50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%]` | `clip-path: polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%);` |

---

# 💡 Example

```html
<div class="clip-path-cir-40 bg-red-500 size-40"></div>

<div class="clip-path-eli-25-40 bg-blue-500 size-40"></div>

<div class="clip-path-pol-50-0-100-100-0-100 bg-green-500 size-40"></div>

<div class="clip-path-ins-10-20-15-10 bg-yellow-500 size-40"></div>
```

---

# 🚀 Workflow

### 1. Open the Generator

https://tailwindcss-clip-path-utils.vercel.app/

↓

### 2. Design or Trace Your Shape

↓

### 3. Copy the Generated Tailwind Class

↓

### 4. Paste It Into Your HTML

```html
<div class="clip-path-pol-81-11-61-78-19-73-38-6"></div>
```

That's it! 🎉

---

# 📄 License

Licensed under the **MIT License**

```
MIT © Sneh Moradia
```