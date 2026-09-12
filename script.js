const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const onScroll = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = !mainNav.classList.contains('open');
    mainNav.classList.toggle('open', open);
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


// Teams league dropdown: ABA / PBA
const navDropdowns = document.querySelectorAll('[data-nav-dropdown]');
navDropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  const dropdownLinks = dropdown.querySelectorAll('.nav-dropdown-menu a');

  if (toggle) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = !dropdown.classList.contains('open');
      navDropdowns.forEach(other => {
        other.classList.remove('open');
        const otherToggle = other.querySelector('.nav-dropdown-toggle');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('click', (event) => {
  navDropdowns.forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
