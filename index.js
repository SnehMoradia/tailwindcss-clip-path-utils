const fs = require('fs');
const path = require('path');

function scanWorkspaceForClipPaths() {
  const results = { cir: [], eli: [], ins: [], pol: [], rnd: [] };
  
  function scan(dir) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        let stat;
        try {
          stat = fs.statSync(fullPath);
        } catch (e) {
          continue;
        }
        if (stat.isDirectory()) {
          if (file !== 'node_modules' && file !== '.git' && file !== '.vscode' && file !== '.idea' && file !== 'dist' && file !== 'build') {
            scan(fullPath);
          }
        } else {
          const ext = path.extname(file);
          if (['.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'].includes(ext)) {
            let content;
            try {
              content = fs.readFileSync(fullPath, 'utf8');
            } catch (e) {
              continue;
            }
            
            // Regexes for bracketless class names
            const cirRegex = /\bclip-path-cir-([0-9_at-]+)\b/g;
            const eliRegex = /\bclip-path-eli-([0-9_at-]+)\b/g;
            const insRegex = /\bclip-path-ins-([0-9_-]+)\b/g;
            const polRegex = /\bclip-path-pol-([0-9_-]+)\b/g;
            const rndRegex = /\bclip-path-rnd-([0-9_-]+)\b/g;
            
            let match;
            while ((match = cirRegex.exec(content)) !== null) {
              results.cir.push(match[1]);
            }
            while ((match = eliRegex.exec(content)) !== null) {
              results.eli.push(match[1]);
            }
            while ((match = insRegex.exec(content)) !== null) {
              results.ins.push(match[1]);
            }
            while ((match = polRegex.exec(content)) !== null) {
              results.pol.push(match[1]);
            }
            while ((match = rndRegex.exec(content)) !== null) {
              results.rnd.push(match[1]);
            }
          }
        }
      }
    } catch (e) {
      // Ignore directory-level errors
    }
  }

  scan(process.cwd());
  return results;
}

const toObject = (arr) => Object.fromEntries(arr.map(v => [v, v]));

const safeThemeValues = (themeFn, key) => {
  try {
    const val = themeFn(key);
    if (!val || typeof val !== 'object') return {};
    const res = {};
    for (const k of Object.keys(val)) {
      if (!k.startsWith('__')) {
        res[k] = val[k];
      }
    }
    return res;
  } catch (e) {
    return {};
  }
};

module.exports = ({ matchUtilities, theme }) => {
  console.log("✅ Clip Path Plugin Loaded");
  const scanned = scanWorkspaceForClipPaths();
  
  // Circle
  matchUtilities(
    {
      "clip-path-cir": (value) => {
        const valStr = String(value);
        if (valStr.includes("-at-")) {
          const parts = valStr.split("-at-");
          const radius = parts[0];
          const coords = parts[1].split("-").map(c => `${c}%`).join(" ");
          return { clipPath: `circle(${radius}% at ${coords})` };
        }
        if (valStr.includes(" ") || valStr.includes("at")) {
          return { clipPath: `circle(${valStr})` };
        }
        return { clipPath: `circle(${valStr}%)` };
      },
    },
    {
      values: {
        ...toObject(scanned.cir),
        ...safeThemeValues(theme, "clipPathCir"),
        ...Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, i])),
        "40-at-50-50": "40-at-50-50",
        "50-at-50-50": "50-at-50-50",
        "40-at-0-0": "40-at-0-0",
        "30-at-30-70": "30-at-30-70",
      },
      type: "any",
    }
  );

  // Ellipse
  matchUtilities(
    {
      "clip-path-eli": (value) => {
        const valStr = String(value);
        if (valStr.includes("-at-")) {
          const parts = valStr.split("-at-");
          const dims = parts[0].split(/[-_]/);
          const coords = parts[1].split(/[-_]/).map(c => `${c}%`).join(" ");
          return { clipPath: `ellipse(${dims[0]}% ${dims[1]}% at ${coords})` };
        }
        if (valStr.includes(" ") || valStr.includes("%")) {
          return { clipPath: `ellipse(${valStr})` };
        }
        const [x, y] = valStr.split(/[-_]/);
        return {
          clipPath: `ellipse(${x}% ${y}%)`,
        };
      },
    },
    {
      values: {
        ...toObject(scanned.eli),
        ...safeThemeValues(theme, "clipPathEli"),
        "25_40": "25_40",
        "25-40": "25-40",
        "40_40": "40_40",
        "40-40": "40-40",
        "50_30": "50_30",
        "50-30": "50-30",
        "40-40-at-50-50": "40-40-at-50-50",
        "50-30-at-50-50": "50-30-at-50-50",
        "25-40-at-50-50": "25-40-at-50-50",
        "35-20-at-40-60": "35-20-at-40-60",
      },
      type: "any",
    }
  );

  // Inset
  matchUtilities(
    {
      "clip-path-ins": (value) => {
        const valStr = String(value);
        if (valStr.includes(" ") || valStr.includes("%")) {
          return { clipPath: `inset(${valStr})` };
        }
        const parts = valStr.split(/[-_]/);
        return {
          clipPath: `inset(${parts.map(p => `${p}%`).join(" ")})`,
        };
      },
    },
    {
      values: {
        ...toObject(scanned.ins),
        ...safeThemeValues(theme, "clipPathIns"),
        "5_20_15_10": "5_20_15_10",
        "5-20-15-10": "5-20-15-10",
        "10_10_10_10": "10_10_10_10",
        "10-10-10-10": "10-10-10-10",
        "20-5-20-5": "20-5-20-5",
      },
      type: "any",
    }
  );

  // Polygon
  matchUtilities(
    {
      "clip-path-pol": (value) => {
        const valStr = String(value);
        if (valStr.includes(",") || valStr.includes("%")) {
          return { clipPath: `polygon(${valStr})` };
        }
        const points = valStr.split(/[-_]/);
        const pairs = [];
        for (let i = 0; i < points.length; i += 2) {
          if (points[i] !== undefined && points[i+1] !== undefined) {
            pairs.push(`${points[i]}% ${points[i+1]}%`);
          }
        }
        return {
          clipPath: `polygon(${pairs.join(", ")})`,
        };
      },
    },
    {
      values: {
        ...toObject(scanned.pol),
        ...safeThemeValues(theme, "clipPathPol"),
        "50-0-100-100-0-100": "50-0-100-100-0-100",
        "20-0-80-0-100-100-0-100": "20-0-80-0-100-100-0-100",
        "25-0-100-0-75-100-0-100": "25-0-100-0-75-100-0-100",
        "50-0-100-38-82-100-18-100-0-38": "50-0-100-38-82-100-18-100-0-38",
        "50-0-100-25-100-75-50-100-0-75-0-25": "50-0-100-25-100-75-50-100-0-75-0-25",
        "50-0-61-35-98-35-68-57-79-91-50-70-21-91-32-57-2-35-39-35": "50-0-61-35-98-35-68-57-79-91-50-70-21-91-32-57-2-35-39-35",
        "0-30-60-30-60-0-100-50-60-100-60-70-0-70": "0-30-60-30-60-0-100-50-60-100-60-70-0-70",
        "35-0-65-0-65-35-100-35-100-65-65-65-65-100-35-100-35-65-0-65-0-35-35-35": "35-0-65-0-65-35-100-35-100-65-65-65-65-100-35-100-35-65-0-65-0-35-35-35",
        "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30": "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30",
      },
      type: "any",
    }
  );

  // Rounded (inset with per-corner border-radius)
  matchUtilities(
    {
      "clip-path-rnd": (value) => {
        const valStr = String(value);
        // Expect format: t-r-b-l-r1-r2-r3-r4 (all in %)
        const parts = valStr.split(/[-_]/);
        if (parts.length >= 8) {
          const [t, r, b, l, r1, r2, r3, r4] = parts;
          return {
            clipPath: `inset(${t}% ${r}% ${b}% ${l}% round ${r1}% ${r2}% ${r3}% ${r4}%)`,
          };
        }
        if (parts.length === 4) {
          const [t, r, b, l] = parts;
          return { clipPath: `inset(${t}% ${r}% ${b}% ${l}%)` };
        }
        return { clipPath: `inset(${valStr})` };
      },
    },
    {
      values: {
        ...toObject(scanned.rnd),
        ...safeThemeValues(theme, "clipPathRnd"),
        "5-5-5-5-20-20-20-20":    "5-5-5-5-20-20-20-20",
        "10-5-10-5-50-50-50-50":  "10-5-10-5-50-50-50-50",
        "5-5-5-5-40-40-0-0":      "5-5-5-5-40-40-0-0",
        "5-5-5-5-0-0-40-40":      "5-5-5-5-0-0-40-40",
        "5-5-5-5-40-0-0-40":      "5-5-5-5-40-0-0-40",
        "8-8-8-8-30-30-30-30":    "8-8-8-8-30-30-30-30",
        "5-5-5-5-40-10-40-10":    "5-5-5-5-40-10-40-10",
        "15-10-15-10-50-10-50-10": "15-10-15-10-50-10-50-10",
        "5-0-5-5-15-0-18-0":       "5-0-5-5-15-0-18-0",
      },
      type: "any",
    }
  );
};