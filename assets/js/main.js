document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
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
