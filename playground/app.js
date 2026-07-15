// Presets
const polygonPresets = {
  "Triangle": [{ x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }],
  "Trapezoid": [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }],
  "Parallelogram": [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 100 }, { x: 0, y: 100 }],
  "Pentagon": [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }],
  "Hexagon": [{ x: 50, y: 0 }, { x: 100, y: 25 }, { x: 100, y: 75 }, { x: 50, y: 100 }, { x: 0, y: 75 }, { x: 0, y: 25 }],
  "Star (5-point)": [{ x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 }, { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 }, { x: 2, y: 35 }, { x: 39, y: 35 }],
  "Arrow": [{ x: 0, y: 30 }, { x: 60, y: 30 }, { x: 60, y: 0 }, { x: 100, y: 50 }, { x: 60, y: 100 }, { x: 60, y: 70 }, { x: 0, y: 70 }],
  "Cross": [{ x: 35, y: 0 }, { x: 65, y: 0 }, { x: 65, y: 35 }, { x: 100, y: 35 }, { x: 100, y: 65 }, { x: 65, y: 65 }, { x: 65, y: 100 }, { x: 35, y: 100 }, { x: 35, y: 65 }, { x: 0, y: 65 }, { x: 0, y: 35 }, { x: 35, y: 35 }],
  "Custom Star": [{ x: 20, y: 0 }, { x: 0, y: 20 }, { x: 30, y: 50 }, { x: 0, y: 80 }, { x: 20, y: 100 }, { x: 50, y: 70 }, { x: 80, y: 100 }, { x: 100, y: 80 }, { x: 70, y: 50 }, { x: 100, y: 20 }, { x: 80, y: 0 }, { x: 50, y: 30 }]
};

const circlePresets = {
  "Center Circle": { r: 40, cx: 50, cy: 50 },
  "Large Circle": { r: 50, cx: 50, cy: 50 },
  "Corner circle": { r: 40, cx: 0, cy: 0 },
  "Off-center": { r: 30, cx: 30, cy: 70 }
};

const ellipsePresets = {
  "Standard": { rx: 40, ry: 40, cx: 50, cy: 50 },
  "Wide Ellipse": { rx: 50, ry: 30, cx: 50, cy: 50 },
  "Tall Ellipse": { rx: 25, ry: 40, cx: 50, cy: 50 },
  "Diagonal style": { rx: 35, ry: 20, cx: 40, cy: 60 }
};

const insetPresets = {
  "All 10%": { t: 10, r: 10, b: 10, l: 10 },
  "Steep Top/Bottom": { t: 20, r: 5, b: 20, l: 5 },
  "Slender Sides": { t: 5, r: 20, b: 15, l: 10 }
};

// State Variables
let mode = 'polygon';
let theme = 'dark';
let points = []; // Array of {x, y} coordinates (polygon)
let circleState = { r: 40, cx: 50, cy: 50 }; // Circle properties
let ellipseState = { rx: 40, ry: 40, cx: 50, cy: 50 }; // Ellipse properties
let insetState = { t: 10, r: 10, b: 10, l: 10 }; // Inset properties

// Core Elements
const canvasWrapper = document.getElementById('canvas-wrapper');
const clippedElement = document.getElementById('clipped-element');
const svgPolygon = document.getElementById('svg-polygon');
const svgCircle = document.getElementById('svg-circle');
const svgCircleRadiusLine = document.getElementById('svg-circle-radius-line');
const svgEllipse = document.getElementById('svg-ellipse');
const svgInset = document.getElementById('svg-inset');
const handlesContainer = document.getElementById('handles-container');
const pointsList = document.getElementById('points-list');
const codeTailwind = document.getElementById('code-tailwind');
const codeCss = document.getElementById('code-css');

// Init App
window.addEventListener('load', () => {
  // Set initial shape mode
  setShapeMode('polygon');
  
  // Initialize active sidebar tab
  setSidebarTab('editor');

  // Setup main canvas drag/drop for background image
  const canvasEl = document.getElementById('canvas-wrapper');
  canvasEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvasEl.classList.add('ring-4', 'ring-indigo-500/50', 'border-indigo-500');
  });
  canvasEl.addEventListener('dragleave', () => {
    canvasEl.classList.remove('ring-4', 'ring-indigo-500/50', 'border-indigo-500');
  });
  canvasEl.addEventListener('drop', (e) => {
    e.preventDefault();
    canvasEl.classList.remove('ring-4', 'ring-indigo-500/50', 'border-indigo-500');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        clippedElement.style.backgroundImage = `url('${event.target.result}')`;
      };
      reader.readAsDataURL(file);
    } else {
      const url = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
      if (url && (url.startsWith('http') || url.startsWith('data:'))) {
        clippedElement.style.backgroundImage = `url('${url}')`;
      }
    }
  });
});

// Theme Toggle Handler
function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const btnToggle = document.getElementById('btn-theme-toggle');
  
  if (theme === 'light') {
    body.classList.add('light-theme');
    // Moon Icon
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
    btnToggle.className = "h-9 w-9 bg-black/5 border border-black/10 hover:bg-black/10 text-slate-800 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer";
  } else {
    body.classList.remove('light-theme');
    // Sun Icon
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>`;
    btnToggle.className = "h-9 w-9 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer";
  }
}

// Toggle Modes
function setShapeMode(newMode, keepPoints = false) {
  mode = newMode;
  
  // Update Tab CSS
  ['polygon', 'circle', 'ellipse', 'inset'].forEach(m => {
    const btn = document.getElementById(`tab-${m}`);
    if (m === mode) {
      btn.className = "flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20";
    } else {
      btn.className = "flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 text-body-secondary hover:text-indigo-400";
    }
  });

  // Show/Hide relevant SVG overlays
  svgPolygon.classList.add('hidden');
  svgCircle.classList.add('hidden');
  svgCircleRadiusLine.classList.add('hidden');
  svgEllipse.classList.add('hidden');
  svgInset.classList.add('hidden');

  // Adjust "Add Point" visibility
  const btnAddPoint = document.getElementById('btn-add-point');
  const pointsTitle = document.getElementById('points-panel-title');
  
  if (mode === 'polygon') {
    svgPolygon.classList.remove('hidden');
    btnAddPoint.classList.remove('hidden');
    pointsTitle.textContent = "Coordinates";
    // Default to first preset
    if (!keepPoints) {
      loadPresetPoints(Object.keys(polygonPresets)[0]);
    }
  } else if (mode === 'circle') {
    svgCircle.classList.remove('hidden');
    svgCircleRadiusLine.classList.remove('hidden');
    btnAddPoint.classList.add('hidden');
    pointsTitle.textContent = "Circle Config";
    loadPresetCircle(Object.keys(circlePresets)[0]);
  } else if (mode === 'ellipse') {
    svgEllipse.classList.remove('hidden');
    btnAddPoint.classList.add('hidden');
    pointsTitle.textContent = "Ellipse Config";
    loadPresetEllipse(Object.keys(ellipsePresets)[0]);
  } else if (mode === 'inset') {
    svgInset.classList.remove('hidden');
    btnAddPoint.classList.add('hidden');
    pointsTitle.textContent = "Inset Config";
    loadPresetInset(Object.keys(insetPresets)[0]);
  }

  updatePresetsGrid();
}

// Render presets grid
function updatePresetsGrid() {
  const grid = document.getElementById('presets-grid');
  grid.innerHTML = '';
  
  let list = {};
  let action = null;

  if (mode === 'polygon') {
    list = polygonPresets;
    action = loadPresetPoints;
  } else if (mode === 'circle') {
    list = circlePresets;
    action = loadPresetCircle;
  } else if (mode === 'ellipse') {
    list = ellipsePresets;
    action = loadPresetEllipse;
  } else if (mode === 'inset') {
    list = insetPresets;
    action = loadPresetInset;
  }

  Object.keys(list).forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.onclick = () => action(name);
    btn.className = "py-2 px-3 rounded-xl btn-preset text-xs font-semibold transition-all duration-200 truncate";
    grid.appendChild(btn);
  });
}

// Load Shape Presets
function loadPresetPoints(name) {
  points = JSON.parse(JSON.stringify(polygonPresets[name]));
  updateCanvas();
}
function loadPresetCircle(name) {
  circleState = { ...circlePresets[name] };
  updateCanvas();
}
function loadPresetEllipse(name) {
  ellipseState = { ...ellipsePresets[name] };
  updateCanvas();
}
function loadPresetInset(name) {
  insetState = { ...insetPresets[name] };
  updateCanvas();
}

// Canvas Update Engine
function updateCanvas() {
  handlesContainer.innerHTML = '';
  pointsList.innerHTML = '';

  if (mode === 'polygon') {
    renderPolygon();
  } else if (mode === 'circle') {
    renderCircle();
  } else if (mode === 'ellipse') {
    renderEllipse();
  } else if (mode === 'inset') {
    renderInset();
  }
}

// POLYGON RENDERER
function renderPolygon() {
  // 1. Set SVG properties
  const svgPoints = points.map(p => `${(p.x * 384) / 100},${(p.y * 384) / 100}`).join(' ');
  svgPolygon.setAttribute('points', svgPoints);

  // 2. Set actual CSS clip-path
  const clipPathValue = `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;
  clippedElement.style.clipPath = clipPathValue;

  // 3. Render handles
  points.forEach((p, idx) => {
    const handle = createHandle(p.x, p.y, idx + 1, (newX, newY) => {
      points[idx] = { x: newX, y: newY };
      updateCanvas();
    });
    handlesContainer.appendChild(handle);

    // Render input list
    const pointRow = createCoordinateRow(idx, p.x, p.y, (coord, val) => {
      points[idx][coord] = val;
      updateCanvas();
    }, true);
    pointsList.appendChild(pointRow);
  });

  // 4. Update code blocks
  const classCoords = points.map(p => `${p.x}-${p.y}`).join('-');
  const predefinedPolygons = [
    "50-0-100-100-0-100",
    "20-0-80-0-100-100-0-100",
    "25-0-100-0-75-100-0-100",
    "50-0-100-38-82-100-18-100-0-38",
    "50-0-100-25-100-75-50-100-0-75-0-25",
    "50-0-61-35-98-35-68-57-79-91-50-70-21-91-32-57-2-35-39-35",
    "0-30-60-30-60-0-100-50-60-100-60-70-0-70",
    "35-0-65-0-65-35-100-35-100-65-65-65-65-100-35-100-35-65-0-65-0-35-35-35",
    "20-0-0-20-30-50-0-80-20-100-50-70-80-100-100-80-70-50-100-20-80-0-50-30"
  ];
  let tailwindClass = `clip-path-pol-${classCoords}`;
  
  codeTailwind.textContent = tailwindClass;
  codeCss.textContent = `clip-path: ${clipPathValue};`;
}

// CIRCLE RENDERER
function renderCircle() {
  const cxPx = (circleState.cx * 384) / 100;
  const cyPx = (circleState.cy * 384) / 100;
  const rPx = (circleState.r * 384) / 100;

  // 1. Set SVG guides
  svgCircle.setAttribute('cx', cxPx);
  svgCircle.setAttribute('cy', cyPx);
  svgCircle.setAttribute('r', rPx);

  // Line connecting center to radius handle
  svgCircleRadiusLine.setAttribute('x1', cxPx);
  svgCircleRadiusLine.setAttribute('y1', cyPx);
  svgCircleRadiusLine.setAttribute('x2', cxPx + rPx);
  svgCircleRadiusLine.setAttribute('y2', cyPx);

  // 2. Set CSS clip-path
  const clipPathValue = `circle(${circleState.r}% at ${circleState.cx}% ${circleState.cy}%)`;
  clippedElement.style.clipPath = clipPathValue;

  // 3. Render handles (Center handle & Radius handle)
  const centerHandle = createHandle(circleState.cx, circleState.cy, 'C', (newX, newY) => {
    circleState.cx = newX;
    circleState.cy = newY;
    updateCanvas();
  });
  centerHandle.classList.add('bg-purple-600');
  
  // Radius handle sits on the circle's horizontal edge
  const radX = Math.min(100, Math.max(0, circleState.cx + circleState.r));
  const radiusHandle = createHandle(radX, circleState.cy, 'R', (newX, newY) => {
    circleState.r = Math.max(0, Math.abs(newX - circleState.cx));
    updateCanvas();
  });
  radiusHandle.classList.add('bg-pink-600');

  handlesContainer.appendChild(centerHandle);
  handlesContainer.appendChild(radiusHandle);

  // 4. Render sliders
  pointsList.appendChild(createSliderRow("Radius (r)", circleState.r, 0, 100, (val) => {
    circleState.r = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Center X (cx)", circleState.cx, 0, 100, (val) => {
    circleState.cx = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Center Y (cy)", circleState.cy, 0, 100, (val) => {
    circleState.cy = val;
    updateCanvas();
  }));

  // 5. Update code blocks
  const classVal = `${circleState.r}-at-${circleState.cx}-${circleState.cy}`;
  const predefinedCircles = [
    "40-at-50-50",
    "50-at-50-50",
    "40-at-0-0",
    "30-at-30-70"
  ];
  let tailwindClass = predefinedCircles.includes(classVal)
    ? `clip-path-cir-${classVal}`
    : `clip-path-cir-[${classVal}]`;
  codeTailwind.textContent = tailwindClass;
  codeCss.textContent = `clip-path: ${clipPathValue};`;
}

// ELLIPSE RENDERER
function renderEllipse() {
  const cxPx = (ellipseState.cx * 384) / 100;
  const cyPx = (ellipseState.cy * 384) / 100;
  const rxPx = (ellipseState.rx * 384) / 100;
  const ryPx = (ellipseState.ry * 384) / 100;

  // 1. Set SVG guides
  svgEllipse.setAttribute('cx', cxPx);
  svgEllipse.setAttribute('cy', cyPx);
  svgEllipse.setAttribute('rx', rxPx);
  svgEllipse.setAttribute('ry', ryPx);

  // 2. Set CSS clip-path
  const clipPathValue = `ellipse(${ellipseState.rx}% ${ellipseState.ry}% at ${ellipseState.cx}% ${ellipseState.cy}%)`;
  clippedElement.style.clipPath = clipPathValue;

  // 3. Render handles (Center + Horizontal Radius + Vertical Radius)
  const centerHandle = createHandle(ellipseState.cx, ellipseState.cy, 'C', (newX, newY) => {
    ellipseState.cx = newX;
    ellipseState.cy = newY;
    updateCanvas();
  });
  centerHandle.classList.add('bg-purple-600');

  const rxX = Math.min(100, Math.max(0, ellipseState.cx + ellipseState.rx));
  const rxHandle = createHandle(rxX, ellipseState.cy, 'X', (newX, newY) => {
    ellipseState.rx = Math.max(0, Math.abs(newX - ellipseState.cx));
    updateCanvas();
  });
  rxHandle.classList.add('bg-pink-600');

  const ryY = Math.min(100, Math.max(0, ellipseState.cy + ellipseState.ry));
  const ryHandle = createHandle(ellipseState.cx, ryY, 'Y', (newX, newY) => {
    ellipseState.ry = Math.max(0, Math.abs(newY - ellipseState.cy));
    updateCanvas();
  });
  ryHandle.classList.add('bg-emerald-600');

  handlesContainer.appendChild(centerHandle);
  handlesContainer.appendChild(rxHandle);
  handlesContainer.appendChild(ryHandle);

  // 4. Render sliders
  pointsList.appendChild(createSliderRow("Radius X (rx)", ellipseState.rx, 0, 100, (val) => {
    ellipseState.rx = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Radius Y (ry)", ellipseState.ry, 0, 100, (val) => {
    ellipseState.ry = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Center X (cx)", ellipseState.cx, 0, 100, (val) => {
    ellipseState.cx = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Center Y (cy)", ellipseState.cy, 0, 100, (val) => {
    ellipseState.cy = val;
    updateCanvas();
  }));

  // 5. Update code blocks
  const classVal = `${ellipseState.rx}-${ellipseState.ry}-at-${ellipseState.cx}-${ellipseState.cy}`;
  const predefinedEllipses = [
    "40-40-at-50-50",
    "50-30-at-50-50",
    "25-40-at-50-50",
    "35-20-at-40-60"
  ];
  let tailwindClass = predefinedEllipses.includes(classVal)
    ? `clip-path-eli-${classVal}`
    : `clip-path-eli-[${classVal}]`;
  codeTailwind.textContent = tailwindClass;
  codeCss.textContent = `clip-path: ${clipPathValue};`;
}

// INSET RENDERER
function renderInset() {
  const topPx = (insetState.t * 384) / 100;
  const leftPx = (insetState.l * 384) / 100;
  const widthPx = 384 - ((insetState.l + insetState.r) * 384) / 100;
  const heightPx = 384 - ((insetState.t + insetState.b) * 384) / 100;

  // 1. Set SVG guides
  svgInset.setAttribute('x', leftPx);
  svgInset.setAttribute('y', topPx);
  svgInset.setAttribute('width', Math.max(0, widthPx));
  svgInset.setAttribute('height', Math.max(0, heightPx));

  // 2. Set CSS clip-path
  const clipPathValue = `inset(${insetState.t}% ${insetState.r}% ${insetState.b}% ${insetState.l}%)`;
  clippedElement.style.clipPath = clipPathValue;

  // 3. Render border/guide handles (Drag T, R, B, L)
  const topHandle = createHandle(50, insetState.t, 'T', (newX, newY) => {
    insetState.t = Math.max(0, Math.min(100 - insetState.b, newY));
    updateCanvas();
  });
  const rightHandle = createHandle(100 - insetState.r, 50, 'R', (newX, newY) => {
    insetState.r = Math.max(0, Math.min(100 - insetState.l, 100 - newX));
    updateCanvas();
  });
  const bottomHandle = createHandle(50, 100 - insetState.b, 'B', (newX, newY) => {
    insetState.b = Math.max(0, Math.min(100 - insetState.t, 100 - newY));
    updateCanvas();
  });
  const leftHandle = createHandle(insetState.l, 50, 'L', (newX, newY) => {
    insetState.l = Math.max(0, Math.min(100 - insetState.r, newX));
    updateCanvas();
  });

  handlesContainer.appendChild(topHandle);
  handlesContainer.appendChild(rightHandle);
  handlesContainer.appendChild(bottomHandle);
  handlesContainer.appendChild(leftHandle);

  // 4. Render sliders
  pointsList.appendChild(createSliderRow("Top (t)", insetState.t, 0, 100 - insetState.b, (val) => {
    insetState.t = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Right (r)", insetState.r, 0, 100 - insetState.l, (val) => {
    insetState.r = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Bottom (b)", insetState.b, 0, 100 - insetState.t, (val) => {
    insetState.b = val;
    updateCanvas();
  }));
  pointsList.appendChild(createSliderRow("Left (l)", insetState.l, 0, 100 - insetState.r, (val) => {
    insetState.l = val;
    updateCanvas();
  }));

  // 5. Update code blocks
  const classVal = `${insetState.t}-${insetState.r}-${insetState.b}-${insetState.l}`;
  const predefinedInsets = [
    "10-10-10-10",
    "20-5-20-5",
    "5-20-15-10"
  ];
  let tailwindClass = predefinedInsets.includes(classVal)
    ? `clip-path-ins-${classVal}`
    : `clip-path-ins-[${classVal}]`;
  codeTailwind.textContent = tailwindClass;
  codeCss.textContent = `clip-path: ${clipPathValue};`;
}

// Helper: Create HTML handle node
function createHandle(x, y, label, dragCallback) {
  const handle = document.createElement('div');
  handle.className = "absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing z-10 flex items-center justify-center text-[10px] text-white font-bold select-none transition-transform duration-100 hover:scale-110 active:scale-95 touch-none";
  handle.style.left = `${x}%`;
  handle.style.top = `${y}%`;
  handle.textContent = label;
  
  // Select appropriate handle color
  if (label === 'C') {
    handle.classList.add('bg-indigo-500');
  } else if (label === 'R' || label === 'X') {
    handle.classList.add('bg-pink-500');
  } else if (label === 'Y') {
    handle.classList.add('bg-emerald-500');
  } else {
    handle.classList.add('bg-indigo-500');
  }

  // Drag and drop event handlers
  handle.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    
    const onPointerMove = (moveEvent) => {
      const rect = canvasWrapper.getBoundingClientRect();
      let newX = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      let newY = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      
      // Clamp values to 0 - 100 bounds, round to whole numbers
      newX = Math.max(0, Math.min(100, Math.round(newX)));
      newY = Math.max(0, Math.min(100, Math.round(newY)));

      dragCallback(newX, newY);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  });

  return handle;
}

// Helper: Create coordinate card row in sidepanel
function createCoordinateRow(idx, x, y, changeCallback, allowDelete) {
  const row = document.createElement('div');
  row.className = "flex items-center gap-3 input-row p-3 rounded-xl";
  
  row.innerHTML = `
    <span class="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-400 select-none">${idx + 1}</span>
    <div class="flex-1 grid grid-cols-2 gap-2">
      <div class="flex items-center gap-1.5 input-box px-2.5 py-1.5 rounded-lg">
        <span class="text-[10px] text-slate-500 font-bold uppercase select-none">X</span>
        <input type="number" min="0" max="100" value="${x}" class="bg-transparent focus:outline-none w-full text-sm text-indigo-300 font-semibold text-center select-all" />
      </div>
      <div class="flex items-center gap-1.5 input-box px-2.5 py-1.5 rounded-lg">
        <span class="text-[10px] text-slate-500 font-bold uppercase select-none">Y</span>
        <input type="number" min="0" max="100" value="${y}" class="bg-transparent focus:outline-none w-full text-sm text-indigo-300 font-semibold text-center select-all" />
      </div>
    </div>
    ${allowDelete && points.length > 3 ? `
      <button class="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all" onclick="deletePoint(${idx})">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    ` : ''}
  `;

  // Event listener bindings
  const inputs = row.querySelectorAll('input');
  inputs[0].addEventListener('input', (e) => {
    const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
    changeCallback('x', val);
  });
  inputs[1].addEventListener('input', (e) => {
    const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
    changeCallback('y', val);
  });

  return row;
}

// Helper: Create Slider row for Radius/Dimensions
function createSliderRow(label, value, min, max, changeCallback) {
  const row = document.createElement('div');
  row.className = "flex flex-col gap-1.5 slider-row p-3.5 rounded-xl";
  row.innerHTML = `
    <div class="flex items-center justify-between text-xs font-semibold text-slate-400">
      <span>${label}</span>
      <span class="text-indigo-400 font-bold">${value}%</span>
    </div>
    <input type="range" min="${min}" max="${max}" value="${value}" class="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
  `;
  row.querySelector('input').addEventListener('input', (e) => {
    changeCallback(parseInt(e.target.value) || 0);
  });
  return row;
}

// Dynamic Polygon Nodes: Add/Delete Point
function addPoint() {
  if (mode !== 'polygon') return;
  // Interpolate a point in the center or between first/last
  const last = points[points.length - 1] || { x: 50, y: 50 };
  const first = points[0] || { x: 50, y: 50 };
  const newPoint = {
    x: Math.round((last.x + first.x) / 2),
    y: Math.round((last.y + first.y) / 2)
  };
  points.push(newPoint);
  updateCanvas();
}

// Delete Point
function deletePoint(idx) {
  if (mode !== 'polygon') return;
  if (points.length <= 3) return; // Keep at least a triangle
  points.splice(idx, 1);
  updateCanvas();
}

// Background customizer
function changeBgImage(url) {
  const customInput = document.getElementById('input-bg-url');
  if (url === 'custom') {
    customInput.classList.remove('hidden');
    customInput.focus();
  } else {
    customInput.classList.add('hidden');
    clippedElement.style.backgroundImage = `url('${url}')`;
  }
}

// Handle Custom BG URL
function handleCustomBgUrl(url) {
  if (url.trim()) {
    clippedElement.style.backgroundImage = `url('${url}')`;
  }
}

// Copy to Clipboard Utility
function copyToClipboard(elementId, buttonId) {
  const code = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById(buttonId);
    const originalText = btn.textContent;
    btn.textContent = "Copied! ✓";
    btn.classList.replace('bg-white/5', 'bg-emerald-500/20');
    btn.classList.replace('text-white', 'text-emerald-400');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.replace('bg-emerald-500/20', 'bg-white/5');
      btn.classList.replace('text-emerald-400', 'text-white');
    }, 1500);
  });
}

// Extractor State & Event Listeners
let originalExtractorImage = null;
let extractedPoints = [];

// File inputs & controls
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('extractor-file-input');
const extractorControls = document.getElementById('extractor-controls');
const thresholdInput = document.getElementById('input-threshold');
const thresholdNumInput = document.getElementById('input-threshold-num');
const pointsCountInput = document.getElementById('input-points-count');
const pointsCountNumInput = document.getElementById('input-points-count-num');
const invertCheckbox = document.getElementById('input-invert-detection');
const detectionModeSelect = document.getElementById('select-detection-mode');
const previewCanvas = document.getElementById('extractor-preview-canvas');
const previewCtx = previewCanvas.getContext('2d');

// Drag-drop events
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('border-indigo-500/80', 'bg-indigo-500/5');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('border-indigo-500/80', 'bg-indigo-500/5');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('border-indigo-500/80', 'bg-indigo-500/5');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    loadExtractorImage(e.dataTransfer.files[0]);
  } else {
    const url = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
      loadExtractorImageFromUrl(url);
    }
  }
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    loadExtractorImage(e.target.files[0]);
  }
});

// Handle inputs
thresholdInput.addEventListener('input', (e) => {
  thresholdNumInput.value = e.target.value;
  if (originalExtractorImage) processExtractedImage();
});
thresholdNumInput.addEventListener('input', (e) => {
  let val = parseInt(e.target.value);
  if (isNaN(val)) return;
  val = Math.max(0, Math.min(255, val));
  thresholdInput.value = val;
  if (originalExtractorImage) processExtractedImage();
});

pointsCountInput.addEventListener('input', (e) => {
  pointsCountNumInput.value = e.target.value;
  if (originalExtractorImage) processExtractedImage();
});
pointsCountNumInput.addEventListener('input', (e) => {
  let val = parseInt(e.target.value);
  if (isNaN(val)) return;
  val = Math.max(3, Math.min(24, val));
  pointsCountInput.value = val;
  if (originalExtractorImage) processExtractedImage();
});
invertCheckbox.addEventListener('change', () => {
  if (originalExtractorImage) processExtractedImage();
});
detectionModeSelect.addEventListener('change', (e) => {
  const thresholdContainer = document.getElementById('threshold-container');
  const invertLabel = invertCheckbox.parentElement;
  if (e.target.value === 'alpha') {
    thresholdContainer.classList.add('hidden');
    invertLabel.classList.add('hidden');
  } else {
    thresholdContainer.classList.remove('hidden');
    invertLabel.classList.remove('hidden');
  }
  customCentroid = null;
  if (originalExtractorImage) processExtractedImage();
});

let customCentroid = null;
let draggingExtractorPointIndex = -1; // -1 = none, -2 = centroid, >=0 = node index

function loadExtractorImage(file) {
  customCentroid = null;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      originalExtractorImage = img;
      extractorControls.classList.remove('hidden');
      
      // Trigger change event to set correct initial visibility for threshold slider
      detectionModeSelect.dispatchEvent(new Event('change'));
      
      // Auto-extract immediately!
      processExtractedImage();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function loadExtractorUrl() {
  const urlInput = document.getElementById('input-extractor-url');
  const url = urlInput.value.trim();
  if (!url) return;

  loadExtractorImageFromUrl(url);
}

function loadExtractorImageFromUrl(url) {
  customCentroid = null;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    originalExtractorImage = img;
    extractorControls.classList.remove('hidden');
    
    // Trigger change event to set correct initial visibility for threshold slider
    detectionModeSelect.dispatchEvent(new Event('change'));
    
    // Auto-extract immediately!
    processExtractedImage();
  };
  img.onerror = () => {
    alert("CORS or Load Error: Could not load the image from the URL. Make sure the URL is valid, direct to an image, and supports CORS (Cross-Origin Resource Sharing). If it fails, please download the image to your computer and drag it in!");
  };
  
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (url.startsWith('data:') || !isLocal) {
    img.src = url;
  } else {
    img.src = `/proxy?url=${encodeURIComponent(url)}`;
  }
}

function processExtractedImage() {
  if (!originalExtractorImage) return;

  const mode = detectionModeSelect.value;
  const threshold = parseInt(thresholdInput.value);
  const pointsCount = parseInt(pointsCountInput.value);
  const invert = invertCheckbox.checked;

  const w = previewCanvas.width;
  const h = previewCanvas.height;

  // Temporary canvas to scan pixel brightness/alpha
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext('2d');
  
  // Draw image stretched to cover the square canvas (matching percentage coordinates)
  tempCtx.drawImage(originalExtractorImage, 0, 0, w, h);
  
  let imgData;
  try {
    imgData = tempCtx.getImageData(0, 0, w, h);
  } catch (err) {
    console.error(err);
    alert("CORS Protection Alert: Cannot analyze this image directly because it is hosted on a 3rd party domain. Please download the image to your computer and drag it into the upload box!");
    // Hide controls and reset
    extractorControls.classList.add('hidden');
    originalExtractorImage = null;
    return;
  }
  
  const pixels = imgData.data;
  
  let cx, cy;
  if (customCentroid) {
    cx = (customCentroid.x * w) / 100;
    cy = (customCentroid.y * h) / 100;
  } else {
    // Calculate Centroid of Foreground
    let sumX = 0, sumY = 0, count = 0;
    
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];
        
        let isForeground = false;
        if (mode === 'alpha') {
          isForeground = (a >= 50);
        } else {
          // Brightness mode
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          if (a >= 50) {
            isForeground = invert ? (brightness > threshold) : (brightness < threshold);
          }
        }
        
        if (isForeground) {
          sumX += x;
          sumY += y;
          count++;
        }
      }
    }
    
    cx = count > 0 ? sumX / count : w / 2;
    cy = count > 0 ? sumY / count : h / 2;
    customCentroid = { x: Math.round((cx / w) * 100), y: Math.round((cy / h) * 100) };
  }
  
  // Radar sweep to detect coordinates
  extractedPoints = [];
  const maxDist = Math.sqrt(w * w + h * h);
  
  for (let i = 0; i < pointsCount; i++) {
    const angle = (i * 2 * Math.PI) / pointsCount;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    let lastFDist = 0;
    for (let dist = 0; dist < maxDist; dist += 0.5) {
      const px = Math.round(cx + dist * cos);
      const py = Math.round(cy + dist * sin);
      
      if (px < 0 || px >= w || py < 0 || py >= h) break;
      
      const idx = (py * w + px) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const a = pixels[idx + 3];
      
      let isF = false;
      if (mode === 'alpha') {
        isF = (a >= 50);
      } else {
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        if (a >= 50) {
          isF = invert ? (brightness > threshold) : (brightness < threshold);
        }
      }
      
      if (isF) {
        lastFDist = dist;
      }
    }
    
    // Target coordinates
    const targetX = cx + lastFDist * cos;
    const targetY = cy + lastFDist * sin;
    extractedPoints.push({
      x: Math.round((targetX / w) * 100),
      y: Math.round((targetY / h) * 100)
    });
  }
  
  // Auto-sync extracted points with main editor in real time!
  points = JSON.parse(JSON.stringify(extractedPoints));
  setShapeMode('polygon', true);
  updateCanvas();
  
  drawPreviewCanvas(cx, cy);
}

function drawPreviewCanvas(cx, cy) {
  const w = previewCanvas.width;
  const h = previewCanvas.height;

  // Clear preview
  previewCtx.clearRect(0, 0, w, h);
  
  // Draw binarized/translucent view of original image for contrast
  previewCtx.globalAlpha = 0.45;
  previewCtx.drawImage(originalExtractorImage, 0, 0, w, h);
  previewCtx.globalAlpha = 1.0;
  
  // Draw detected centroid (larger green dot with border)
  previewCtx.fillStyle = '#10b981';
  previewCtx.strokeStyle = '#ffffff';
  previewCtx.lineWidth = 1.5;
  previewCtx.beginPath();
  previewCtx.arc(cx, cy, 6, 0, 2 * Math.PI);
  previewCtx.fill();
  previewCtx.stroke();
  
  // Draw outer contour line
  previewCtx.strokeStyle = '#6366f1';
  previewCtx.lineWidth = 1.5;
  previewCtx.beginPath();
  extractedPoints.forEach((p, idx) => {
    const px = (p.x * w) / 100;
    const py = (p.y * h) / 100;
    if (idx === 0) previewCtx.moveTo(px, py);
    else previewCtx.lineTo(px, py);
  });
  previewCtx.closePath();
  previewCtx.stroke();
  
  // Draw nodes (slightly larger blue dots for dragging)
  extractedPoints.forEach((p, idx) => {
    const px = (p.x * w) / 100;
    const py = (p.y * h) / 100;
    previewCtx.fillStyle = '#6366f1';
    previewCtx.strokeStyle = '#ffffff';
    previewCtx.lineWidth = 1.5;
    previewCtx.beginPath();
    previewCtx.arc(px, py, 5.5, 0, 2 * Math.PI);
    previewCtx.fill();
    previewCtx.stroke();
  });
}

// Drag and drop for preview canvas points
previewCanvas.addEventListener('pointerdown', (e) => {
  if (!originalExtractorImage) return;

  const rect = previewCanvas.getBoundingClientRect();
  const clickX = ((e.clientX - rect.left) / rect.width) * previewCanvas.width;
  const clickY = ((e.clientY - rect.top) / rect.height) * previewCanvas.height;

  const w = previewCanvas.width;
  const h = previewCanvas.height;

  // 1. Check if clicked near centroid
  const cx = (customCentroid ? customCentroid.x : 50) * w / 100;
  const cy = (customCentroid ? customCentroid.y : 50) * h / 100;
  
  const distToCentroid = Math.hypot(clickX - cx, clickY - cy);
  if (distToCentroid <= 10) {
    draggingExtractorPointIndex = -2; // Centroid
    previewCanvas.setPointerCapture(e.pointerId);
    return;
  }

  // 2. Check if clicked near any node
  for (let i = 0; i < extractedPoints.length; i++) {
    const px = (extractedPoints[i].x * w) / 100;
    const py = (extractedPoints[i].y * h) / 100;
    const distToNode = Math.hypot(clickX - px, clickY - py);
    if (distToNode <= 10) {
      draggingExtractorPointIndex = i; // Node index
      previewCanvas.setPointerCapture(e.pointerId);
      return;
    }
  }
});

previewCanvas.addEventListener('pointermove', (e) => {
  if (!originalExtractorImage) return;

  const rect = previewCanvas.getBoundingClientRect();
  const cursorX = ((e.clientX - rect.left) / rect.width) * previewCanvas.width;
  const cursorY = ((e.clientY - rect.top) / rect.height) * previewCanvas.height;

  const w = previewCanvas.width;
  const h = previewCanvas.height;

  if (draggingExtractorPointIndex === -1) {
    // Just hover check to change cursor styling
    const cx = (customCentroid ? customCentroid.x : 50) * w / 100;
    const cy = (customCentroid ? customCentroid.y : 50) * h / 100;
    
    const distToCentroid = Math.hypot(cursorX - cx, cursorY - cy);
    if (distToCentroid <= 10) {
      previewCanvas.style.cursor = 'move';
      return;
    }

    for (let i = 0; i < extractedPoints.length; i++) {
      const px = (extractedPoints[i].x * w) / 100;
      const py = (extractedPoints[i].y * h) / 100;
      const distToNode = Math.hypot(cursorX - px, cursorY - py);
      if (distToNode <= 10) {
        previewCanvas.style.cursor = 'move';
        return;
      }
    }
    
    previewCanvas.style.cursor = 'default';
  } else {
    // Dragging update logic
    let percentX = ((e.clientX - rect.left) / rect.width) * 100;
    let percentY = ((e.clientY - rect.top) / rect.height) * 100;

    percentX = Math.max(0, Math.min(100, Math.round(percentX)));
    percentY = Math.max(0, Math.min(100, Math.round(percentY)));

    const cx = (customCentroid ? customCentroid.x : 50) * w / 100;
    const cy = (customCentroid ? customCentroid.y : 50) * h / 100;

    if (draggingExtractorPointIndex === -2) {
      customCentroid = { x: percentX, y: percentY };
      processExtractedImage();
    } else if (draggingExtractorPointIndex >= 0) {
      extractedPoints[draggingExtractorPointIndex] = { x: percentX, y: percentY };
      
      // Auto-sync dragged nodes with main editor in real time!
      points = JSON.parse(JSON.stringify(extractedPoints));
      updateCanvas();
      
      drawPreviewCanvas(cx, cy);
    }
  }
});

const stopDragging = (e) => {
  if (draggingExtractorPointIndex !== -1) {
    try {
      previewCanvas.releasePointerCapture(e.pointerId);
    } catch(err) {}
    draggingExtractorPointIndex = -1;
  }
};

previewCanvas.addEventListener('pointerup', stopDragging);
previewCanvas.addEventListener('pointercancel', stopDragging);

function applyExtractedShape() {
  if (extractedPoints.length < 3) return;
  
  // Set shape mode to polygon
  points = JSON.parse(JSON.stringify(extractedPoints));
  setShapeMode('polygon');
  updateCanvas();
  
  // Scroll to canvas
  canvasWrapper.scrollIntoView({ behavior: 'smooth' });
}

// Sidebar Tabs Controller
let activeSidebarTab = 'editor';

function setSidebarTab(tabName) {
  activeSidebarTab = tabName;

  const tabEditor = document.getElementById('sidebar-tab-editor');
  const tabCanvas = document.getElementById('sidebar-tab-canvas');
  const tabExtractor = document.getElementById('sidebar-tab-extractor');

  const panelEditor = document.getElementById('sidebar-panel-editor');
  const panelCanvas = document.getElementById('sidebar-panel-canvas');
  const panelExtractor = document.getElementById('sidebar-panel-extractor');

  // Reset Tab Styles
  [tabEditor, tabCanvas, tabExtractor].forEach(btn => {
    btn.className = "flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 text-center cursor-pointer text-body-secondary hover:text-indigo-400";
  });

  // Hide all panels
  panelEditor.classList.add('hidden');
  panelCanvas.classList.add('hidden');
  panelExtractor.classList.add('hidden');

  // Show Selected Panel and Style Tab
  if (tabName === 'editor') {
    tabEditor.className = "flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 text-center cursor-pointer bg-indigo-600 text-white shadow-lg shadow-indigo-600/20";
    panelEditor.classList.remove('hidden');
  } else if (tabName === 'canvas') {
    tabCanvas.className = "flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 text-center cursor-pointer bg-indigo-600 text-white shadow-lg shadow-indigo-600/20";
    panelCanvas.classList.remove('hidden');
  } else if (tabName === 'extractor') {
    tabExtractor.className = "flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 text-center cursor-pointer bg-indigo-600 text-white shadow-lg shadow-indigo-600/20";
    panelExtractor.classList.remove('hidden');
  }
}

// Expose all onclick-called functions to the global window scope.
// This is required for inline HTML onclick handlers to work correctly
// when deployed on platforms like Vercel that serve static files.
window.toggleTheme = toggleTheme;
window.setShapeMode = setShapeMode;
window.setSidebarTab = setSidebarTab;
window.copyToClipboard = copyToClipboard;
window.addPoint = addPoint;
window.changeBgImage = changeBgImage;
window.loadExtractorUrl = loadExtractorUrl;
window.applyExtractedShape = applyExtractedShape;
