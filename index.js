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
        "50-at-50-50": "50-at-50-50",
        "40-at-0-0": "40-at-0-0",
        "30-at-30-70": "30-at-30-70",
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
        "40-40-at-50-50": "40-40-at-50-50",
        "50-30-at-50-50": "50-30-at-50-50",
        "25-40-at-50-50": "25-40-at-50-50",
        "35-20-at-40-60": "35-20-at-40-60",
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
        "20-5-20-5": "20-5-20-5",
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
        "20-0-80-0-100-100-0-100": "20-0-80-0-100-100-0-100",
        "25-0-100-0-75-100-0-100": "25-0-100-0-75-100-0-100",
        "50-0-100-38-82-100-18-100-0-38": "50-0-100-38-82-100-18-100-0-38",
        "50-0-100-25-100-75-50-100-0-75-0-25": "50-0-100-25-100-75-50-100-0-75-0-25",
        "50-0-61-35-98-35-68-57-79-91-50-70-21-91-32-57-2-35-39-35": "50-0-61-35-98-35-68-57-79-91-50-70-21-91-32-57-2-35-39-35",
        "0-30-60-30-60-0-100-50-60-100-60-70-0-70": "0-30-60-30-60-0-100-50-60-100-60-70-0-70",
        "35-0-65-0-65-35-100-35-100-65-65-65-65-100-35-100-35-65-0-65-0-35-35-35": "35-0-65-0-65-35-100-35-100-65-65-65-65-100-35-100-35-65-0-65-0-35-35-35",
        "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30": "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30",
      },
    }
  );
};