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

// Homepage ABA team treatment.
const homepageTeamsSection = document.querySelector('section.teams#teams');
if (homepageTeamsSection) {
  homepageTeamsSection.classList.add('featured-team-section');

  const teamGrid = homepageTeamsSection.querySelector('.team-grid');
  const teamCards = teamGrid ? Array.from(teamGrid.querySelectorAll('.team-card')) : [];
  const featuredCard = teamCards[0];

  // Keep only Circle City Pythons on the homepage.
  teamCards.slice(1).forEach(card => card.remove());
  if (teamGrid) teamGrid.classList.add('featured-team-grid');

  const sectionKicker = homepageTeamsSection.querySelector('.section-head .section-kicker');
  const sectionTitle = homepageTeamsSection.querySelector('.section-head h2');
  const sectionDescription = homepageTeamsSection.querySelector('.section-head > p');

  if (sectionKicker) sectionKicker.textContent = '02 / ABA TEAM';
  if (sectionTitle) sectionTitle.innerHTML = 'CIRCLE CITY.<br><em>PYTHONS.</em>';
  if (sectionDescription) sectionDescription.remove();

  if (featuredCard) {
    featuredCard.classList.add('featured-team-card');

    // Remove all visible "featured" labels.
    const existingBadge = featuredCard.querySelector('.featured-team-badge');
    if (existingBadge) existingBadge.remove();

    const metaLabel = featuredCard.querySelector('.team-meta small');
    if (metaLabel) metaLabel.remove();

    const cardLink = featuredCard.querySelector('.team-meta a');
    if (cardLink) {
      cardLink.setAttribute('href', '#schedule');
      cardLink.setAttribute('aria-label', 'View Circle City Pythons schedule');
      cardLink.setAttribute('title', 'View schedule');
    }
  }

  // The PBA teams are already available from the Teams navigation dropdown,
  // so keep this homepage section focused only on Circle City Pythons.
  const pbaBridge = homepageTeamsSection.querySelector('.pba-bridge');
  if (pbaBridge) pbaBridge.remove();

  const featuredStyles = document.createElement('style');
  featuredStyles.id = 'featured-team-homepage-styles';
  featuredStyles.textContent = `
    .featured-team-section .section-head {
      max-width: 1120px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 44px;
    }

    .featured-team-grid {
      grid-template-columns: minmax(0, 780px) !important;
      justify-content: center;
      align-items: stretch;
    }

    .featured-team-card {
      width: 100%;
      position: relative;
      border-top: 2px solid rgba(201, 158, 49, .9) !important;
      padding-top: 22px;
    }

    .featured-team-card .team-image {
      height: 560px;
      min-height: 560px;
      padding: 34px;
      border: 1px solid rgba(201, 158, 49, .3);
      background:
        radial-gradient(circle at 50% 50%, rgba(40, 115, 59, .2), transparent 42%),
        linear-gradient(145deg, #0a1710 0%, #06100b 58%, #080b0d 100%);
      box-shadow: 0 34px 90px rgba(0, 0, 0, .34), inset 0 0 0 1px rgba(255, 255, 255, .025);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .featured-team-card .team-logo-img {
      width: 82% !important;
      height: 82% !important;
      max-width: 610px;
      max-height: 470px;
      object-fit: contain !important;
      object-position: center center !important;
      display: block;
      margin: auto;
      transform: none !important;
      filter: drop-shadow(0 18px 28px rgba(0, 0, 0, .32));
    }

    .featured-team-card:hover .team-logo-img {
      transform: scale(1.015) !important;
      filter: brightness(1.05) drop-shadow(0 22px 34px rgba(0, 0, 0, .36));
    }

    .featured-team-card .team-number {
      font-size: 92px;
      color: rgba(255, 255, 255, .045);
      z-index: 2;
    }

    .featured-team-card .team-meta {
      margin-top: 28px;
      align-items: end;
    }

    .featured-team-card .team-meta h3 {
      max-width: none;
      font-size: clamp(42px, 5vw, 64px);
      letter-spacing: .01em;
      margin-top: 0;
    }

    .featured-team-card .team-sub {
      font-size: 10px;
    }

    .featured-team-card .team-meta a {
      width: 58px;
      height: 58px;
      border-color: rgba(201, 158, 49, .5);
      font-size: 18px;
    }

    .featured-team-card .team-meta a:hover {
      background: #c99e31;
    }

    .featured-team-card .team-sub {
      padding-top: 16px;
      margin-top: 22px;
    }

    @media (max-width: 800px) {
      .featured-team-section .section-head {
        display: block;
      }

      .featured-team-grid {
        grid-template-columns: 1fr !important;
      }

      .featured-team-card .team-image {
        height: 430px;
        min-height: 430px;
        padding: 28px;
      }

      .featured-team-card .team-logo-img {
        width: 86% !important;
        height: 86% !important;
      }
    }

    @media (max-width: 520px) {
      .featured-team-card .team-image {
        height: 350px;
        min-height: 350px;
        padding: 22px 14px;
      }

      .featured-team-card .team-logo-img {
        width: 90% !important;
        height: 90% !important;
      }

      .featured-team-card .team-number {
        font-size: 68px;
      }

      .featured-team-card .team-meta h3 {
        font-size: 40px;
      }

      .featured-team-card .team-meta a {
        width: 50px;
        height: 50px;
      }
    }
  `;

  if (!document.getElementById(featuredStyles.id)) {
    document.head.appendChild(featuredStyles);
  }
}
