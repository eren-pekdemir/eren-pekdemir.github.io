/* ===================================================
   config
   =================================================== */
const GITHUB_USER  = 'eren-pekdemir';

// Repos to hide from the page entirely (lowercase names).
const EXCLUDE_REPOS = ['psi', 'eren-pekdemir.github.io'];

// Force these repos into the "Game development" group (lowercase names).
// Add any game project here whose name/topics don't obviously say "game".
const GAME_DEV_REPOS = [];

// A repo is treated as game-dev if it's in GAME_DEV_REPOS above, OR its
// name / description / topics mention any of these, OR it's a C# project.
const GAME_KEYWORDS = ['game', 'gamedev', 'unreal', 'ue4', 'ue5', 'unity', 'godot', 'engine', 'shader', 'gameplay'];

/* ===================================================
   theme toggle (remembers choice, respects system)
   =================================================== */
const root      = document.documentElement;
const themeBtn  = document.getElementById('themeBtn');
const themeLbl  = document.getElementById('themeLabel');

function setTheme(t) {
  root.setAttribute('data-theme', t);
  themeLbl.textContent = t;
  localStorage.setItem('theme', t);
}
const saved = localStorage.getItem('theme');
setTheme(saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

themeBtn.addEventListener('click', () =>
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
);

/* ===================================================
   nav: border/blur after scrolling a touch
   =================================================== */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 24), { passive: true });

/* ===================================================
   GitHub repos
   =================================================== */
const LANG_COLORS = {
  'C++': '#f34b7d', 'C': '#555555', 'Python': '#3572A5', 'JavaScript': '#f1e05a',
  'TypeScript': '#2b7489', 'HTML': '#e34c26', 'CSS': '#563d7c', 'HLSL': '#aace60',
  'ShaderLab': '#222c37', 'Rust': '#dea584', 'Go': '#00ADD8', 'Java': '#b07219',
  'C#': '#178600', 'Shell': '#89e051', 'Lua': '#000080', 'GLSL': '#5686a5',
};
const langColor = l => LANG_COLORS[l] || 'var(--muted)';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

function isGameDev(r) {
  if (GAME_DEV_REPOS.includes(r.name.toLowerCase())) return true;
  const hay = (r.name + ' ' + (r.description || '') + ' ' + (r.topics || []).join(' ')).toLowerCase();
  if (GAME_KEYWORDS.some(k => hay.includes(k))) return true;
  if (r.language === 'C#') return true; // usually Unity / game work
  return false;
}

function repoEl(r) {
  const el = document.createElement('article');
  el.className = 'repo';
  const lang = r.language || 'Text';
  el.innerHTML = `
    <div class="repo-top">
      <span class="repo-name"><a href="${r.html_url}" target="_blank" rel="noopener">${esc(r.name)}</a></span>
      ${r.stargazers_count ? `<span class="repo-stars">★ ${r.stargazers_count}</span>` : ''}
    </div>
    <p class="repo-desc">${esc(r.description || 'No description yet.')}</p>
    <div class="repo-foot">
      <span class="repo-lang"><span class="sw" style="--c:${langColor(lang)}"></span>${esc(lang)}</span>
      <a href="${r.html_url}" target="_blank" rel="noopener">open →</a>
    </div>`;
  return el;
}

function fillGroup(groupId, gridId, repos) {
  if (!repos.length) return;
  const grid = document.getElementById(gridId);
  repos.forEach(r => grid.appendChild(repoEl(r)));
  document.getElementById(groupId).classList.remove('hidden');
}

async function loadRepos() {
  const loading = document.getElementById('workLoading');
  const errBox  = document.getElementById('workError');
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error('GitHub ' + res.status);

    const repos = (await res.json())
      .filter(r => !r.fork && !EXCLUDE_REPOS.includes(r.name.toLowerCase()))
      .sort((a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at) - new Date(a.updated_at)
      );

    const games = repos.filter(isGameDev);
    const other = repos.filter(r => !isGameDev(r));

    loading.remove();

    if (!repos.length) {
      errBox.textContent = 'No public repositories to show yet.';
      errBox.classList.remove('hidden');
      return;
    }

    fillGroup('gameGroup',  'gameRepos',  games);
    fillGroup('otherGroup', 'otherRepos', other);
  } catch (err) {
    console.error(err);
    loading.remove();
    errBox.classList.remove('hidden');
  }
}
loadRepos();

/* ===================================================
   subtle reveal on scroll (once per element)
   =================================================== */
const toReveal = document.querySelectorAll('.block-head, .about, .repo-group, .skill-col, .contact-lede, .contact-list');
toReveal.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

toReveal.forEach(el => io.observe(el));
