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

// Project and work system maps intentionally mirror the visual language of the hero map,
// while keeping every diagram focused on one simple idea: input -> transformation -> output.
const projectSystemsStylesheet = document.createElement('link');
projectSystemsStylesheet.rel = 'stylesheet';
projectSystemsStylesheet.href = 'assets/css/project-systems.css';
document.head.appendChild(projectSystemsStylesheet);

const additionalProjects = [
  {
    name: 'QuantForex',
    topline: '07 / QUANT FINANCE',
    status: 'PRIVATE LAB',
    summary: 'A personal quantitative-FX research workspace combining EURUSD market data, trend experiments, charting, backtesting, simple quantitative strategies, and MT5-oriented code.',
    stack: ['Forex', 'EURUSD', 'Backtesting', 'MT5', 'Quant Research'],
    note: 'PRIVATE BUILD · RESEARCH / LEARNING LAB',
  },
  {
    name: 'Quant Trading Learning Lab',
    topline: '08 / ALGORITHMIC TRADING',
    status: 'PUBLIC FORKS',
    summary: 'A curated learning and adaptation set spanning quantitative trading strategies, Forex with Python, algorithmic trading, and machine learning for markets. These repositories are shown as source-based learning work, not original upstream projects.',
    stack: ['Python', 'Strategies', 'Backtesting', 'Machine Learning', 'Trading'],
    note: 'PUBLIC FORKS · LEARNING / ADAPTATION',
    links: [
      { label: 'Quant strategies ↗', href: 'https://github.com/pooyaravari/Quantitative-Trading-Strategies-Using-Python' },
      { label: 'ML for trading ↗', href: 'https://github.com/pooyaravari/machine-learning-for-trading' },
    ],
  },
  {
    name: 'Global Trade Network Visualization',
    topline: '09 / TRADE NETWORKS',
    status: 'ADAPTATION',
    summary: 'An exploration of international commodity-trade networks, using bilateral flows and network visualization to make trade structure easier to inspect and connect with HamNama trade-data work.',
    stack: ['Trade', 'Networks', 'Comtrade', 'Python', 'Visualization'],
    note: 'PUBLIC FORK · HAMNAMA-RELATED ADAPTATION',
    links: [
      { label: 'View repository ↗', href: 'https://github.com/pooyaravari/Visualizing-GTN-HamNama' },
    ],
  },
  {
    name: 'QuantEcon Contributions',
    topline: '10 / OPEN SOURCE',
    status: 'MERGED PRS',
    summary: 'Open-source contributions to QuantEcon’s Julia lecture source: improving text and links, aligning Julia code with economic mathematics, and replacing verbose operator names with notation such as T and K where that made the lectures clearer.',
    stack: ['Julia', 'Economics', 'Documentation', 'Code / Math', 'Open Source'],
    note: 'CONTRIBUTOR · QUANTECON',
    links: [
      { label: 'Merged PR #246 ↗', href: 'https://github.com/QuantEcon/lecture-source-jl/pull/246' },
      { label: 'Merged PR #508 ↗', href: 'https://github.com/QuantEcon/lecture-source-jl/pull/508' },
    ],
  },
];

function buildAdditionalProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card reveal project-added';
  const links = (project.links || []).map((link) => (
    `<a class="project-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
  )).join('');

  card.innerHTML = `
    <div class="project-topline">
      <span>${project.topline}</span>
      <span class="project-status">${project.status}</span>
    </div>
    <div class="project-body">
      <div>
        <h3>${project.name}</h3>
        <p class="project-summary">${project.summary}</p>
      </div>
      <div class="project-stack">${project.stack.map((item) => `<span>${item}</span>`).join('')}</div>
    </div>
    ${links ? `<div class="project-links">${links}</div>` : ''}
    <div class="project-note">${project.note}</div>
  `;
  return card;
}

const projectsGrid = document.querySelector('.projects');
if (projectsGrid && !projectsGrid.querySelector('.project-added')) {
  const divider = document.createElement('div');
  divider.className = 'project-group-label reveal';
  divider.innerHTML = '<span>ADDITIONAL / QUANT · TRADE · OPEN SOURCE</span><span>SELECTED, NOT EXHAUSTIVE</span>';
  projectsGrid.appendChild(divider);
  additionalProjects.forEach((project) => projectsGrid.appendChild(buildAdditionalProjectCard(project)));
}

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
  QuantForex: {
    index: '07',
    footer: 'FX DATA → EXPLORE → SIGNALS → BACKTEST → MT5',
    nodes: [
      { id: 'data', x: 44, y: 112, label: 'EURUSD|DATA' },
      { id: 'explore', x: 155, y: 62, label: 'CHARTS' },
      { id: 'trends', x: 155, y: 162, label: 'TRENDS' },
      { id: 'signals', x: 285, y: 112, label: 'STRATEGY|IDEAS' },
      { id: 'backtest', x: 385, y: 62, label: 'BACKTEST' },
      { id: 'mt5', x: 455, y: 162, label: 'MT5|CODE', terminal: true },
    ],
    edges: [
      ['data', 'explore'], ['data', 'trends'], ['explore', 'signals'], ['trends', 'signals'],
      ['signals', 'backtest'], ['signals', 'mt5'], ['backtest', 'mt5'],
    ],
  },
  'Quant Trading Learning Lab': {
    index: '08',
    footer: 'SOURCE MATERIAL → NOTEBOOKS → STRATEGIES → TEST → LEARN',
    nodes: [
      { id: 'sources', x: 42, y: 112, label: 'BOOKS|COURSES' },
      { id: 'notebooks', x: 155, y: 112, label: 'PYTHON|NOTEBOOKS' },
      { id: 'strategy', x: 275, y: 62, label: 'STRATEGY|LOGIC' },
      { id: 'ml', x: 275, y: 162, label: 'ML|METHODS' },
      { id: 'test', x: 385, y: 112, label: 'BACKTEST' },
      { id: 'learn', x: 462, y: 112, label: 'APPLIED|LEARNING', terminal: true },
    ],
    edges: [
      ['sources', 'notebooks'], ['notebooks', 'strategy'], ['notebooks', 'ml'],
      ['strategy', 'test'], ['ml', 'test'], ['test', 'learn'],
    ],
  },
  'Global Trade Network Visualization': {
    index: '09',
    footer: 'TRADE FLOWS → NETWORK → STRUCTURE → VISUAL EXPLORER',
    nodes: [
      { id: 'api', x: 44, y: 112, label: 'COMTRADE|API' },
      { id: 'flows', x: 160, y: 112, label: 'BILATERAL|FLOWS' },
      { id: 'graph', x: 280, y: 112, label: 'NETWORK|GRAPH' },
      { id: 'structure', x: 380, y: 62, label: 'NETWORK|STRUCTURE' },
      { id: 'explore', x: 458, y: 162, label: 'VISUAL|EXPLORER', terminal: true },
    ],
    edges: [
      ['api', 'flows'], ['flows', 'graph'], ['graph', 'structure'], ['graph', 'explore'], ['structure', 'explore'],
    ],
  },
  'QuantEcon Contributions': {
    index: '10',
    footer: 'LECTURES → JULIA + MATH → REVIEW → MERGED CONTRIBUTIONS',
    nodes: [
      { id: 'lectures', x: 42, y: 112, label: 'ECON|LECTURES' },
      { id: 'julia', x: 160, y: 62, label: 'JULIA|CODE' },
      { id: 'math', x: 160, y: 162, label: 'MATH|NOTATION' },
      { id: 'align', x: 292, y: 112, label: 'CODE / MATH|ALIGNMENT' },
      { id: 'review', x: 390, y: 112, label: 'REVIEW|CORRECTIONS' },
      { id: 'merged', x: 462, y: 112, label: 'MERGED|PRS', terminal: true },
    ],
    edges: [
      ['lectures', 'julia'], ['lectures', 'math'], ['julia', 'align'], ['math', 'align'],
      ['align', 'review'], ['review', 'merged'],
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

function buildSystemMap(name, config, kind = 'FLOW', stateLabel = 'SYSTEM MAP') {
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
  container.setAttribute('aria-label', `${name} system flow: ${config.footer}`);
  container.innerHTML = `
    <div class="project-system-head">
      <span>${kind} / ${name.toUpperCase()}</span>
      <span class="project-system-state"><i></i> ${stateLabel}</span>
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

  const map = buildSystemMap(projectName, config);
  const stack = body.querySelector('.project-stack');
  if (stack) body.insertBefore(map, stack);
  else body.appendChild(map);
});

// LinkedIn-backed work system maps. Keep these concise and evidence-based rather than
// trying to turn the background section into a conventional long CV.
const workProfiles = {
  'Golrang Industrial Group': {
    title: 'Golrang Industrial Group',
    summary: 'Current work framed around complex business problems, economic and market context, data-driven decision making, opportunity finding, and turning a systems view into usable decisions.',
    map: {
      index: 'CURRENT',
      footer: 'BUSINESS + MACRO SIGNALS → SYSTEM VIEW → OPPORTUNITIES → DECISIONS',
      nodes: [
        { id: 'business', x: 46, y: 62, label: 'BUSINESS|SIGNALS' },
        { id: 'macro', x: 46, y: 162, label: 'MACRO|CONTEXT' },
        { id: 'data', x: 170, y: 112, label: 'DATA +|EVIDENCE' },
        { id: 'system', x: 295, y: 112, label: 'SYSTEMS|FRAMING' },
        { id: 'opportunity', x: 395, y: 62, label: 'OPPORTUNITY|FINDING' },
        { id: 'decision', x: 458, y: 162, label: 'DECISION|SUPPORT', terminal: true },
      ],
      edges: [
        ['business', 'data'], ['macro', 'data'], ['data', 'system'],
        ['system', 'opportunity'], ['system', 'decision'], ['opportunity', 'decision'],
      ],
    },
  },
  'Quantitative macro & risk modeling': {
    title: 'Charisma Financial Group — Risk Team',
    summary: 'Launched and ran qualitative and quantitative econometric models for inflation, liquidity, exchange rates, and other key macroeconomic variables, using the forecasts and analysis for risk and decision support.',
    map: {
      index: 'RISK',
      footer: 'MACRO DATA → ECONOMETRIC MODELS → FORECASTS → ANALYSIS → RISK',
      nodes: [
        { id: 'data', x: 42, y: 112, label: 'MACRO|DATA' },
        { id: 'inflation', x: 155, y: 52, label: 'INFLATION' },
        { id: 'liquidity', x: 155, y: 112, label: 'LIQUIDITY' },
        { id: 'fx', x: 155, y: 172, label: 'FX' },
        { id: 'models', x: 300, y: 112, label: 'ECONOMETRIC|MODELS' },
        { id: 'forecast', x: 400, y: 62, label: 'FORECASTS' },
        { id: 'risk', x: 458, y: 162, label: 'RISK +|DECISIONS', terminal: true },
      ],
      edges: [
        ['data', 'inflation'], ['data', 'liquidity'], ['data', 'fx'],
        ['inflation', 'models'], ['liquidity', 'models'], ['fx', 'models'],
        ['models', 'forecast'], ['models', 'risk'], ['forecast', 'risk'],
      ],
    },
  },
  'University of British Columbia': {
    title: 'University of British Columbia — Economics',
    summary: 'PhD studies and research with a strong production-network and macroeconomics focus, including a summer paper using Canadian input-output data to study how lockdown policies propagate across industries and the aggregate economy.',
    map: {
      index: '2018—2023',
      footer: 'QUESTION → I-O DATA → PRODUCTION NETWORK → POLICY SHOCKS → EFFECTS',
      nodes: [
        { id: 'question', x: 42, y: 112, label: 'RESEARCH|QUESTION' },
        { id: 'io', x: 160, y: 112, label: 'I-O|DATA' },
        { id: 'network', x: 285, y: 112, label: 'PRODUCTION|NETWORK' },
        { id: 'policy', x: 390, y: 62, label: 'POLICY|SHOCKS' },
        { id: 'effects', x: 458, y: 162, label: 'INDUSTRY +|AGGREGATE', terminal: true },
      ],
      edges: [
        ['question', 'io'], ['io', 'network'], ['network', 'policy'], ['network', 'effects'], ['policy', 'effects'],
      ],
    },
  },
};

document.querySelectorAll('.timeline-row').forEach((row) => {
  const titleElement = row.querySelector('h3');
  const body = titleElement?.parentElement;
  const originalTitle = titleElement?.textContent.trim();
  const profile = workProfiles[originalTitle];
  if (!profile || !titleElement || !body || body.querySelector('.work-system-map')) return;

  titleElement.textContent = profile.title;
  const paragraph = body.querySelector('p');
  if (paragraph) paragraph.textContent = profile.summary;

  const map = buildSystemMap(profile.title, profile.map, 'WORK', 'ROLE MAP');
  map.classList.add('work-system-map');
  body.appendChild(map);
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
