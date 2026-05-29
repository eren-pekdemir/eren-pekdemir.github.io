/* ===================================================
   THEME TOGGLE
   =================================================== */
const GITHUB_USER = 'eren-pekdemir';
// Repos to skip in the dynamic grid (already shown as featured)
const FEATURED_REPOS = ['PSI', 'psi'];

const html      = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  localStorage.setItem('theme', theme);
}

// Init theme from storage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ===================================================
   NAVBAR SCROLL EFFECT
   =================================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===================================================
   SMOOTH SCROLL FOR NAV LINKS
   =================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===================================================
   GITHUB API — FETCH PUBLIC REPOS
   =================================================== */
const LANG_COLORS = {
  'C++':        '#f34b7d',
  'C':          '#555555',
  'Python':     '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#2b7489',
  'HTML':       '#e34c26',
  'CSS':        '#563d7c',
  'HLSL':       '#aace60',
  'Rust':       '#dea584',
  'Go':         '#00ADD8',
  'Java':       '#b07219',
  'C#':         '#178600',
  'Shell':      '#89e051',
  'Makefile':   '#427819',
};

function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e';
}

function buildCard(repo) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const lang     = repo.language || 'Text';
  const color    = langColor(lang);
  const desc     = repo.description || 'No description provided.';
  const stars    = repo.stargazers_count;
  const forks    = repo.forks_count;

  card.innerHTML = `
    <div class="card-header">
      <span class="lang-dot" style="--lang-color: ${color};"></span>
      <span class="card-lang">${lang}</span>
      ${stars > 0 ? `<span class="card-lang" style="margin-left:auto;">★ ${stars}</span>` : ''}
    </div>
    <h3 class="card-title">
      <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
    </h3>
    <p class="card-desc">${desc}</p>
    <div class="card-footer">
      <a class="card-link" href="${repo.html_url}" target="_blank" rel="noopener">
        <i class="ph ph-github-logo"></i> View on GitHub
      </a>
      ${forks > 0 ? `<span class="card-link" style="pointer-events:none;">⑂ ${forks}</span>` : ''}
    </div>
  `;

  // Animate in
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  return card;
}

async function loadRepos() {
  const grid    = document.getElementById('projectsGrid');
  const loading = document.getElementById('projectsLoading');
  const errBox  = document.getElementById('projectsError');

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();

    // Filter: no forks, skip featured, sort by stars then updated
    const filtered = repos
      .filter(r => !r.fork && !FEATURED_REPOS.some(f => r.name.toLowerCase() === f.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

    loading.remove();

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color:var(--text-muted);padding:24px;">No additional public repositories found.</p>';
      return;
    }

    filtered.forEach((repo, i) => {
      const card = buildCard(repo);
      grid.appendChild(card);
      // Staggered entrance animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, i * 60);
      });
    });

  } catch (err) {
    console.error('GitHub API error:', err);
    loading.remove();
    errBox.classList.remove('hidden');
  }
}

loadRepos();

/* ===================================================
   INTERSECTION OBSERVER — section fade-in
   =================================================== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.section, .skill-group, .contact-card').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Make already-visible sections show immediately
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity   = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Polyfill: add .visible class when observed
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
