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

const createProxyValues = (defaultValues, themeFn, themeKey) => {
  const themeValues = safeThemeValues(themeFn, themeKey);
  const base = { ...defaultValues, ...themeValues };
  return new Proxy(base, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      if (typeof prop === "string" && !prop.startsWith("__") && prop !== "constructor" && prop !== "toString" && prop !== "valueOf" && prop !== "prototype" && prop !== "toJSON" && prop !== "then") {
        return prop;
      }
      return undefined;
    },
    has(target, prop) {
      if (typeof prop === "string" && !prop.startsWith("__") && prop !== "constructor" && prop !== "toString" && prop !== "valueOf" && prop !== "prototype" && prop !== "toJSON" && prop !== "then") {
        return true;
      }
      return prop in target;
    },
    getOwnPropertyDescriptor(target, prop) {
      if (prop in target) {
        return Reflect.getOwnPropertyDescriptor(target, prop);
      }
      if (typeof prop === "string" && !prop.startsWith("__") && prop !== "constructor" && prop !== "toString" && prop !== "valueOf" && prop !== "prototype" && prop !== "toJSON" && prop !== "then") {
        return {
          enumerable: true,
          configurable: true,
          value: prop
        };
      }
      return undefined;
    }
  });
};

module.exports = ({ matchUtilities, theme }) => {
  console.log("✅ Clip Path Plugin Loaded");

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
      values: createProxyValues(
        {
          ...Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, i])),
          "40-at-50-50": "40-at-50-50",
          "50-at-50-50": "50-at-50-50",
          "40-at-0-0": "40-at-0-0",
          "30-at-30-70": "30-at-30-70",
        },
        theme,
        "clipPathCir"
      ),
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
      values: createProxyValues(
        {
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
        theme,
        "clipPathEli"
      ),
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
      values: createProxyValues(
        {
          "5_20_15_10": "5_20_15_10",
          "5-20-15-10": "5-20-15-10",
          "10_10_10_10": "10_10_10_10",
          "10-10-10-10": "10-10-10-10",
          "20-5-20-5": "20-5-20-5",
        },
        theme,
        "clipPathIns"
      ),
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
      values: createProxyValues(
        {
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
        theme,
        "clipPathPol"
      ),
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
      values: createProxyValues(
        {
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
        theme,
        "clipPathRnd"
      ),
      type: "any",
    }
  );
};