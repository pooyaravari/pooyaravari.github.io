(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = (markup) => reducedMotion ? '' : markup;

  const processVisuals = {
    observe: `
      <svg viewBox="0 0 260 110" aria-hidden="true">
        <path class="pv-line" d="M18 22 C72 22 82 52 132 54"/>
        <path class="pv-line" d="M18 55 C70 55 92 55 132 54"/>
        <path class="pv-line" d="M18 88 C72 88 86 58 132 54"/>
        <path class="pv-line-strong" d="M132 54 C168 54 187 54 236 54"/>
        <circle class="pv-node-soft" cx="18" cy="22" r="3.5"/><circle class="pv-node-soft" cx="18" cy="55" r="3.5"/><circle class="pv-node-soft" cx="18" cy="88" r="3.5"/>
        <circle class="pv-node pv-glow" cx="132" cy="54" r="5"/><circle class="pv-node" cx="236" cy="54" r="4"/>
        ${animate('<circle class="pv-node" r="2.8"><animateMotion dur="3.8s" repeatCount="indefinite" path="M18 22 C72 22 82 52 132 54"/></circle>')}
        ${animate('<circle class="pv-node" r="2.8"><animateMotion dur="4.6s" repeatCount="indefinite" path="M18 88 C72 88 86 58 132 54"/></circle>')}
        ${animate('<circle class="pv-node pv-glow" r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M132 54 C168 54 187 54 236 54"/></circle>')}
        <text x="8" y="11">MACRO</text><text x="8" y="48">MARKET</text><text x="8" y="104">RESEARCH</text><text x="117" y="39">SIGNALS</text><text x="215" y="40">READ</text>
      </svg>`,
    structure: `
      <svg viewBox="0 0 260 110" aria-hidden="true">
        <rect class="pv-panel" x="112" y="20" width="116" height="70" rx="9"/>
        <path class="pv-line" d="M126 42 H214 M126 68 H214 M154 31 V80 M187 31 V80"/>
        <circle class="pv-node-soft" cx="24" cy="22" r="4"/><circle class="pv-node-soft" cx="78" cy="34" r="4"/><circle class="pv-node-soft" cx="42" cy="82" r="4"/><circle class="pv-node-soft" cx="88" cy="92" r="4"/>
        ${animate('<circle class="pv-node" r="3"><animate attributeName="cx" values="24;132;132" dur="4s" repeatCount="indefinite"/><animate attributeName="cy" values="22;39;39" dur="4s" repeatCount="indefinite"/></circle>')}
        ${animate('<circle class="pv-node" r="3"><animate attributeName="cx" values="78;171;171" dur="4.4s" repeatCount="indefinite"/><animate attributeName="cy" values="34;39;39" dur="4.4s" repeatCount="indefinite"/></circle>')}
        ${animate('<circle class="pv-node" r="3"><animate attributeName="cx" values="42;132;132" dur="4.8s" repeatCount="indefinite"/><animate attributeName="cy" values="82;66;66" dur="4.8s" repeatCount="indefinite"/></circle>')}
        ${animate('<circle class="pv-node" r="3"><animate attributeName="cx" values="88;204;204" dur="5.2s" repeatCount="indefinite"/><animate attributeName="cy" values="92;66;66" dur="5.2s" repeatCount="indefinite"/></circle>')}
        <text x="8" y="105">MESSY INPUTS</text><text x="136" y="104">CONTRACTS / ACTORS / FLOWS</text>
      </svg>`,
    model: `
      <svg viewBox="0 0 260 110" aria-hidden="true">
        <path class="pv-line" d="M18 72 C52 20 84 92 112 54"/>
        <circle class="pv-node pv-glow" cx="132" cy="54" r="16"/>
        <path class="pv-line-strong" d="M148 54 C177 54 188 24 238 30"/>
        <path class="pv-line" d="M148 54 C182 54 193 79 238 78"/>
        ${animate('<circle class="pv-node" r="3"><animateMotion dur="3.2s" repeatCount="indefinite" path="M18 72 C52 20 84 92 112 54"/></circle>')}
        ${animate('<circle class="pv-node pv-glow" r="3"><animateMotion dur="3.2s" begin="1.1s" repeatCount="indefinite" path="M148 54 C177 54 188 24 238 30"/></circle>')}
        ${animate('<circle cx="132" cy="54" r="16" fill="none" stroke="currentColor" stroke-opacity=".28"><animate attributeName="r" values="16;20;16" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".25;.05;.25" dur="3.5s" repeatCount="indefinite"/></circle>')}
        <text x="12" y="100">DATA</text><text x="119" y="58">MODEL</text><text x="209" y="19">FORECAST</text><text x="213" y="96">SCENARIO</text>
      </svg>`,
    decide: `
      <svg viewBox="0 0 260 110" aria-hidden="true">
        <circle class="pv-node-soft" cx="28" cy="25" r="4"/><circle class="pv-node-soft" cx="28" cy="55" r="4"/><circle class="pv-node-soft" cx="28" cy="85" r="4"/>
        <path class="pv-line" d="M28 25 C92 25 105 52 150 55"/>
        <path class="pv-line-strong" d="M28 55 H150"/>
        <path class="pv-line" d="M28 85 C92 85 105 58 150 55"/>
        <circle class="pv-node pv-glow" cx="150" cy="55" r="5"/>
        <path class="pv-line-strong" d="M150 55 C185 55 200 55 236 55"/>
        <circle class="pv-node pv-glow" cx="236" cy="55" r="6"/>
        ${animate('<circle class="pv-node pv-glow" r="3"><animateMotion dur="2.6s" repeatCount="indefinite" path="M28 55 H150 C185 55 200 55 236 55"/></circle>')}
        <text x="8" y="15">OPTIONS</text><text x="130" y="39">EVIDENCE</text><text x="210" y="39">DECIDE</text><text x="190" y="95">PRODUCT / REPORT / ACTION</text>
      </svg>`
  };

  document.querySelectorAll('.process-step[data-process]').forEach((step) => {
    const type = step.dataset.process;
    const visual = step.querySelector('.process-visual');
    if (!visual || !processVisuals[type]) return;
    visual.innerHTML = processVisuals[type] + '<span class="process-hint">MOVE / CLICK TO PAUSE</span>';
    step.tabIndex = 0;
    step.setAttribute('role', 'button');
    step.setAttribute('aria-label', `${step.querySelector('h3')?.textContent || type} process animation. Click to pause or resume.`);

    step.addEventListener('pointermove', (event) => {
      const rect = step.getBoundingClientRect();
      step.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      step.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });

    const toggle = () => {
      const svg = visual.querySelector('svg');
      if (!svg || reducedMotion || typeof svg.pauseAnimations !== 'function') return;
      const paused = step.classList.toggle('is-paused');
      if (paused) svg.pauseAnimations(); else svg.unpauseAnimations();
    };
    step.addEventListener('click', toggle);
    step.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });

  const roleMaps = {
    golrang: {
      index: 'NOW', footer: 'STRATEGIC QUESTIONS → DATA PRODUCTS → MODELS → VALIDATION → DECISIONS',
      nodes: [
        {id:'q',x:42,y:112,label:'STRATEGIC|QUESTIONS'}, {id:'products',x:165,y:62,label:'HAMNAMA +|INTELLIGENCE'},
        {id:'ecosystem',x:165,y:162,label:'RETAIL +|ENVIRONMENT'}, {id:'models',x:300,y:112,label:'FORECAST +|ROOT CAUSE'},
        {id:'quality',x:395,y:62,label:'VALIDATE +|INTERPRET'}, {id:'decision',x:458,y:162,label:'DECISION|SUPPORT',terminal:true}
      ], edges:[['q','products'],['q','ecosystem'],['products','models'],['ecosystem','models'],['models','quality'],['models','decision'],['quality','decision']]
    },
    ecoiran: {
      index: '2025', footer: 'MARKET DATA + NEWS → MODELS → VERIFY → STORY → COVERAGE',
      nodes: [
        {id:'data',x:42,y:62,label:'MARKET|DATA'}, {id:'news',x:42,y:162,label:'NEWS'}, {id:'models',x:170,y:112,label:'PYTHON +|FORECASTS'},
        {id:'verify',x:300,y:112,label:'VERIFY'}, {id:'story',x:395,y:62,label:'ANALYTICAL|STORY'}, {id:'coverage',x:458,y:162,label:'MARKET|COVERAGE',terminal:true}
      ], edges:[['data','models'],['news','models'],['models','verify'],['verify','story'],['verify','coverage'],['story','coverage']]
    },
    markets: {
      index: '2024—25', footer: 'MACRO + RESEARCH → MARKET VIEW → STRATEGY / PRODUCTS → COMMUNICATE',
      nodes: [
        {id:'macro',x:42,y:62,label:'IRAN +|GLOBAL MACRO'}, {id:'research',x:42,y:162,label:'MARKET|RESEARCH'}, {id:'view',x:180,y:112,label:'MARKET|VIEW'},
        {id:'strategy',x:310,y:62,label:'STRATEGY'}, {id:'product',x:310,y:162,label:'PRODUCT|CONCEPTS'}, {id:'comm',x:458,y:112,label:'COURSES +|CONTENT',terminal:true}
      ], edges:[['macro','view'],['research','view'],['view','strategy'],['view','product'],['strategy','comm'],['product','comm']]
    },
    charisma: {
      index: '2022—24', footer: 'MACRO + CREDIT DATA → ECONOMETRICS → FORECAST / SCORE → RISK DECISIONS',
      nodes: [
        {id:'macro',x:42,y:62,label:'MACRO|DATA'}, {id:'credit',x:42,y:162,label:'CREDIT +|LEASING'}, {id:'model',x:180,y:112,label:'ECONOMETRICS +|SCORING'},
        {id:'forecast',x:315,y:62,label:'FX / CPI /|GROWTH'}, {id:'segments',x:315,y:162,label:'RISK|SEGMENTS'}, {id:'reports',x:405,y:62,label:'CRO / CEO|REPORTS'},
        {id:'decision',x:458,y:162,label:'RISK|DECISIONS',terminal:true}
      ], edges:[['macro','model'],['credit','model'],['model','forecast'],['model','segments'],['forecast','reports'],['segments','decision'],['reports','decision']]
    },
    ubc: {
      index: '2018—23', footer: 'ECONOMICS → JULIA METHODS + NETWORKS → QUANTECON / RESEARCH',
      nodes: [
        {id:'econ',x:42,y:112,label:'ECONOMIC|THEORY'}, {id:'julia',x:170,y:62,label:'CONTINUOUS-TIME|JULIA'}, {id:'network',x:170,y:162,label:'PRODUCTION|NETWORKS'},
        {id:'qe',x:310,y:62,label:'QUANTECON|QA'}, {id:'paper',x:310,y:162,label:'PANDEMIC|PAPER'}, {id:'research',x:458,y:112,label:'RESEARCH|OUTPUTS',terminal:true}
      ], edges:[['econ','julia'],['econ','network'],['julia','qe'],['network','paper'],['qe','research'],['paper','research']]
    },
    sharifecon: {
      index: '2015—18', footer: 'ECONOMICS + CRISIS LITERATURE → BANKING NETWORK → POLICY MODEL',
      nodes: [
        {id:'econ',x:42,y:62,label:'M.SC.|ECONOMICS'}, {id:'crisis',x:42,y:162,label:'CRISIS|LITERATURE'}, {id:'network',x:185,y:112,label:'IRAN BANKING|NETWORK'},
        {id:'policy',x:330,y:112,label:'INTEREST-RATE|POLICY'}, {id:'research',x:458,y:112,label:'FINANCIAL|REFORM',terminal:true}
      ], edges:[['econ','network'],['crisis','network'],['network','policy'],['policy','research']]
    },
    sharifee: {
      index: '2010—15', footer: 'CONTROL THEORY → MIMO → COORDINATED CONTROL → ROBOT NAVIGATION',
      nodes: [
        {id:'control',x:42,y:112,label:'CONTROL|THEORY'}, {id:'mimo',x:170,y:112,label:'MIMO|SYSTEMS'}, {id:'coord',x:315,y:112,label:'COORDINATED|CONTROL'},
        {id:'robots',x:458,y:112,label:'ROBOT|NAVIGATION',terminal:true}
      ], edges:[['control','mimo'],['mimo','coord'],['coord','robots']]
    }
  };

  if (typeof window.buildSystemMap === 'function') {
    document.querySelectorAll('[data-role-map]').forEach((slot) => {
      const key = slot.dataset.roleMap;
      const config = roleMaps[key];
      if (!config) return;
      const title = slot.closest('.role-row')?.querySelector('h3')?.textContent || key;
      const map = window.buildSystemMap(title, config, 'CAREER', 'ROLE MAP');
      map.classList.add('work-system-map');
      slot.replaceChildren(map);
    });
  }
})();
