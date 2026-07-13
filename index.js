module.exports = ({ matchUtilities }) => {
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
      values: {
        ...Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, i])),
        "40-at-50-50": "40-at-50-50",
      },
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
        "25_40": "25_40",
        "25-40": "25-40",
        "40_40": "40_40",
        "40-40": "40-40",
        "50_30": "50_30",
        "50-30": "50-30",
      },
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
        "5_20_15_10": "5_20_15_10",
        "5-20-15-10": "5-20-15-10",
        "10_10_10_10": "10_10_10_10",
        "10-10-10-10": "10-10-10-10",
      },
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
        "50-0-100-100-0-100": "50-0-100-100-0-100",
        "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30": "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30",
      },
    }
  );
};