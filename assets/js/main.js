document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const headerLinks = document.querySelector('.header-links');
let themeToggle = document.getElementById('theme-toggle');

if (!themeToggle && headerLinks) {
  themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.className = 'theme-toggle';
  themeToggle.type = 'button';
  themeToggle.innerHTML = '<span class="theme-symbol" aria-hidden="true"></span><span class="theme-text"></span>';
  headerLinks.prepend(themeToggle);
}

const themeSymbol = themeToggle?.querySelector('.theme-symbol');
const themeText = themeToggle?.querySelector('.theme-text');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light' || storedTheme === 'dark') {
  root.dataset.theme = storedTheme;
}

function currentTheme() {
  return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
}

function renderThemeControl() {
  if (!themeToggle) return;
  const active = currentTheme();
  const next = active === 'dark' ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
  themeToggle.setAttribute('title', `Switch to ${next} mode`);
  themeToggle.setAttribute('aria-pressed', active === 'dark' ? 'true' : 'false');
  if (themeSymbol) themeSymbol.textContent = active === 'dark' ? '☀' : '☾';
  if (themeText) themeText.textContent = active === 'dark' ? 'Light' : 'Dark';

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', active === 'dark' ? '#0b0e0d' : '#f6f7f5');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    renderThemeControl();
  });
}

systemDark.addEventListener?.('change', () => {
  if (!localStorage.getItem('theme')) renderThemeControl();
});

renderThemeControl();

// Project system maps intentionally mirror the visual language of the hero map,
// while keeping each project focused on one simple flow: input -> transformation -> output.
const projectSystemsStylesheet = document.createElement('link');
projectSystemsStylesheet.rel = 'stylesheet';
projectSystemsStylesheet.href = 'assets/css/project-systems.css';
document.head.appendChild(projectSystemsStylesheet);

const projectFlows = {
  HamNama: {
    index: '01',
    footer: 'SOURCES → CONTRACTS → ANALYSIS → FORECAST → APP',
    nodes: [
      { id: 'sources', x: 48, y: 112, label: 'SOURCES' },
      { id: 'data', x: 155, y: 62, label: 'DATA' },
      { id: 'signals', x: 155, y: 164, label: 'NEWS|MARKETS' },
      { id: 'analysis', x: 290, y: 72, label: 'ANALYSIS' },
      { id: 'forecast', x: 290, y: 160, label: 'FORECAST' },
      { id: 'app', x: 452, y: 112, label: 'APP', terminal: true },
    ],
    edges: [
      ['sources', 'data'], ['sources', 'signals'], ['data', 'analysis'],
      ['signals', 'analysis'], ['analysis', 'forecast'], ['analysis', 'app'], ['forecast', 'app'],
    ],
  },
  TahlilNama: {
    index: '02',
    footer: 'MACRO DATA → METHODS → ECONOMETRICS → EVIDENCE',
    nodes: [
      { id: 'macro', x: 45, y: 112, label: 'MACRO|DATA' },
      { id: 'cpi', x: 165, y: 52, label: 'CPI' },
      { id: 'labor', x: 165, y: 112, label: 'LABOR' },
      { id: 'gdp', x: 165, y: 172, label: 'GDP' },
      { id: 'models', x: 315, y: 112, label: 'ECONOMETRICS' },
      { id: 'reports', x: 455, y: 112, label: 'CHARTS|REPORTS', terminal: true },
    ],
    edges: [
      ['macro', 'cpi'], ['macro', 'labor'], ['macro', 'gdp'],
      ['cpi', 'models'], ['labor', 'models'], ['gdp', 'models'], ['models', 'reports'],
    ],
  },
  PishbiniNama: {
    index: '03',
    footer: 'SERIES → COMPARE → VALIDATE → SELECT → PUBLISH',
    nodes: [
      { id: 'series', x: 42, y: 112, label: 'SERIES' },
      { id: 'candidates', x: 150, y: 112, label: 'CANDIDATE|MODELS' },
      { id: 'backtest', x: 265, y: 58, label: 'BACKTEST' },
      { id: 'validate', x: 265, y: 165, label: 'VALIDATE' },
      { id: 'select', x: 370, y: 112, label: 'SELECT' },
      { id: 'bundle', x: 460, y: 112, label: 'FORECAST|BUNDLE', terminal: true },
    ],
    edges: [
      ['series', 'candidates'], ['candidates', 'backtest'], ['candidates', 'validate'],
      ['backtest', 'select'], ['validate', 'select'], ['select', 'bundle'],
    ],
  },
  EconDataNama: {
    index: '04',
    footer: 'SOURCE → INGEST → NORMALIZE → VALIDATE → PUBLISH',
    nodes: [
      { id: 'sources', x: 42, y: 112, label: 'SOURCES' },
      { id: 'ingest', x: 142, y: 112, label: 'INGEST' },
      { id: 'normalize', x: 252, y: 62, label: 'NORMALIZE' },
      { id: 'lineage', x: 252, y: 162, label: 'LINEAGE' },
      { id: 'validate', x: 360, y: 112, label: 'VALIDATE' },
      { id: 'publish', x: 458, y: 112, label: 'PUBLISH', terminal: true },
    ],
    edges: [
      ['sources', 'ingest'], ['ingest', 'normalize'], ['ingest', 'lineage'],
      ['normalize', 'validate'], ['lineage', 'validate'], ['validate', 'publish'],
    ],
  },
  Wavelength: {
    index: '05',
    footer: 'VIDEO + MUSIC → FEATURES → VIBE → EXPLAIN → CONNECT',
    nodes: [
      { id: 'video', x: 48, y: 62, label: 'VIDEO' },
      { id: 'music', x: 48, y: 162, label: 'MUSIC' },
      { id: 'motion', x: 170, y: 62, label: 'MOTION|FEATURES' },
      { id: 'taste', x: 170, y: 162, label: 'MUSIC|TASTE' },
      { id: 'vibe', x: 300, y: 112, label: 'VIBE|MODEL' },
      { id: 'explain', x: 395, y: 62, label: 'WHY YOU|MAY VIBE' },
      { id: 'connect', x: 458, y: 160, label: 'MUTUAL|CONNECT', terminal: true },
    ],
    edges: [
      ['video', 'motion'], ['music', 'taste'], ['motion', 'vibe'], ['taste', 'vibe'],
      ['vibe', 'explain'], ['vibe', 'connect'], ['explain', 'connect'],
    ],
  },
  'Production Network & Pandemic': {
    index: '06',
    footer: 'I-O DATA + POLICY SHOCK → PROPAGATION → OUTPUT',
    nodes: [
      { id: 'policy', x: 48, y: 62, label: 'POLICY|SHOCK' },
      { id: 'io', x: 48, y: 162, label: 'I-O|TABLES' },
      { id: 'network', x: 190, y: 162, label: 'PRODUCTION|NETWORK' },
      { id: 'propagate', x: 315, y: 112, label: 'PROPAGATION' },
      { id: 'industry', x: 445, y: 62, label: 'INDUSTRY|EFFECTS' },
      { id: 'aggregate', x: 445, y: 162, label: 'AGGREGATE|OUTPUT', terminal: true },
    ],
    edges: [
      ['io', 'network'], ['policy', 'propagate'], ['network', 'propagate'],
      ['propagate', 'industry'], ['propagate', 'aggregate'],
    ],
  },
};

function curvedEdge(from, to) {
  const middleX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${middleX} ${from.y}, ${middleX} ${to.y}, ${to.x} ${to.y}`;
}

function nodeLabel(node) {
  const lines = node.label.split('|');
  const firstDy = lines.length > 1 ? 22 : 22;
  return lines.map((line, index) => (
    `<tspan x="${node.x}" dy="${index === 0 ? firstDy : 12}">${line}</tspan>`
  )).join('');
}

function buildProjectSystem(projectName, config) {
  const nodeById = Object.fromEntries(config.nodes.map((node) => [node.id, node]));
  const edges = config.edges.map(([fromId, toId]) => {
    const from = nodeById[fromId];
    const to = nodeById[toId];
    return `<path class="project-flow-line" d="${curvedEdge(from, to)}" />`;
  }).join('');

  const nodes = config.nodes.map((node) => `
    <g class="project-flow-node${node.terminal ? ' is-terminal' : ''}">
      <circle cx="${node.x}" cy="${node.y}" r="5.5"></circle>
      <text x="${node.x}" y="${node.y}">${nodeLabel(node)}</text>
    </g>
  `).join('');

  const container = document.createElement('div');
  container.className = 'project-system-map';
  container.setAttribute('aria-label', `${projectName} system flow: ${config.footer}`);
  container.innerHTML = `
    <div class="project-system-head">
      <span>FLOW / ${projectName.toUpperCase()}</span>
      <span class="project-system-state"><i></i> SYSTEM MAP</span>
    </div>
    <div class="project-system-canvas" aria-hidden="true">
      <svg viewBox="0 0 500 220" role="img" preserveAspectRatio="xMidYMid meet">
        <g>${edges}</g>
        <g>${nodes}</g>
      </svg>
    </div>
    <div class="project-system-foot">
      <span>${config.footer}</span>
      <span>${config.index}</span>
    </div>
  `;
  return container;
}

document.querySelectorAll('.project-card').forEach((card) => {
  const projectName = card.querySelector('h3')?.textContent.trim();
  const config = projectFlows[projectName];
  const body = card.querySelector('.project-body');
  if (!config || !body || body.querySelector('.project-system-map')) return;

  const map = buildProjectSystem(projectName, config);
  const stack = body.querySelector('.project-stack');
  if (stack) body.insertBefore(map, stack);
  else body.appendChild(map);
});

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealItems.forEach((item) => observer.observe(item));
}
