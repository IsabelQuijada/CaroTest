// ── Carrusel genérico ──────────────────────────────────────────────────────
// Avanza solo cuando el usuario hace hover. Manual con flechas siempre activo.
function initCarousel({ id, visible, hasBar, barId }) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const track  = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const dots   = carousel.querySelectorAll('.carousel__dot');
  const bar    = barId ? document.getElementById(barId) : null;
  const max    = slides.length - visible;
  let current  = 0;
  let timer;

  // Asigna el ancho correcto a cada slide según cuántos son visibles
  slides.forEach(s => s.style.width = `${100 / visible}%`);

  function goTo(index) {
    current = ((index % (max + 1)) + (max + 1)) % (max + 1);
    track.style.transform = `translateX(-${current * (100 / visible)}%)`;
    if (bar) bar.style.width = max > 0 ? `${(current / max) * 100}%` : '100%';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Flechas — siempre manuales
  carousel.querySelector('.carousel__btn--next')
    .addEventListener('click', () => { clearInterval(timer); next(); });
  carousel.querySelector('.carousel__btn--prev')
    .addEventListener('click', () => { clearInterval(timer); prev(); });

  // Dots
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => { clearInterval(timer); goTo(i); })
  );

  // Hover → avanza automáticamente solo mientras el puntero está encima
  carousel.addEventListener('mouseenter', () => { timer = setInterval(next, 1600); });
  carousel.addEventListener('mouseleave', () => { clearInterval(timer); });

  goTo(0);
}

// ── Instancias ──────────────────────────────────────────────────────────────
initCarousel({ id: 'navidadCarousel',    visible: 3, barId: 'navidadProgress' });
initCarousel({ id: 'virgencitasCarousel',visible: 1 });
initCarousel({ id: 'floresCarousel',     visible: 1 });
initCarousel({ id: 'especialesCarousel', visible: 1, barId: 'especialesProgress' });
initCarousel({ id: 'animalitosCarousel', visible: 1 });

// ── Nav scroll ──────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Burger menu ─────────────────────────────────────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Fade-in on scroll ───────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.work-card, .step, .fact, .section-header, .about__text, .about__portrait, .contact__left, .contact__form, .process__text, .process__steps'
).forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// ── Contact form ─────────────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '¡Enviado! ✓';
  btn.style.background = 'var(--sage)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});

// ── Active nav highlight ─────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--terracotta)' : '';
  });
});
