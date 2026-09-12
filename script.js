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

// Homepage featured ABA team treatment.
// Circle City Pythons is currently the only ABA team featured on the homepage,
// so remove placeholder cards and give the real team a premium centered layout.
const homepageTeamsSection = document.querySelector('section.teams#teams');
if (homepageTeamsSection) {
  homepageTeamsSection.classList.add('featured-team-section');

  const teamGrid = homepageTeamsSection.querySelector('.team-grid');
  const teamCards = teamGrid ? Array.from(teamGrid.querySelectorAll('.team-card')) : [];
  const featuredCard = teamCards[0];

  teamCards.slice(1).forEach(card => card.remove());

  if (teamGrid) teamGrid.classList.add('featured-team-grid');

  const sectionKicker = homepageTeamsSection.querySelector('.section-head .section-kicker');
  const sectionTitle = homepageTeamsSection.querySelector('.section-head h2');
  const sectionDescription = homepageTeamsSection.querySelector('.section-head > p');

  if (sectionKicker) sectionKicker.textContent = '02 / FEATURED ABA TEAM';
  if (sectionTitle) sectionTitle.innerHTML = 'CIRCLE CITY.<br><em>PYTHONS.</em>';
  if (sectionDescription) {
    sectionDescription.textContent = 'A&T Sports’ featured ABA program in Dothan, Alabama. Built around competition, development, and a growing basketball community.';
  }

  if (featuredCard) {
    featuredCard.classList.add('featured-team-card');

    const teamImage = featuredCard.querySelector('.team-image');
    if (teamImage && !teamImage.querySelector('.featured-team-badge')) {
      const badge = document.createElement('span');
      badge.className = 'featured-team-badge';
      badge.textContent = 'FEATURED ABA PROGRAM';
      teamImage.appendChild(badge);
    }

    const metaLabel = featuredCard.querySelector('.team-meta small');
    if (metaLabel) metaLabel.textContent = 'FEATURED TEAM';

    const cardLink = featuredCard.querySelector('.team-meta a');
    if (cardLink) {
      cardLink.setAttribute('href', '#schedule');
      cardLink.setAttribute('aria-label', 'View Circle City Pythons schedule');
      cardLink.setAttribute('title', 'View schedule');
    }
  }

  const featuredStyles = document.createElement('style');
  featuredStyles.id = 'featured-team-homepage-styles';
  featuredStyles.textContent = `
    .featured-team-section .section-head {
      max-width: 1120px;
      margin-left: auto;
      margin-right: auto;
    }

    .featured-team-section .section-head > p {
      max-width: 460px;
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
      padding: 42px 64px;
      border: 1px solid rgba(201, 158, 49, .3);
      background:
        radial-gradient(circle at 50% 45%, rgba(40, 115, 59, .2), transparent 38%),
        linear-gradient(145deg, #0a1710 0%, #06100b 58%, #080b0d 100%);
      box-shadow: 0 34px 90px rgba(0, 0, 0, .34), inset 0 0 0 1px rgba(255, 255, 255, .025);
    }

    .featured-team-card .team-logo-img {
      filter: drop-shadow(0 18px 28px rgba(0, 0, 0, .32));
    }

    .featured-team-card:hover .team-logo-img {
      transform: scale(1.035);
      filter: brightness(1.07) drop-shadow(0 22px 34px rgba(0, 0, 0, .36));
    }

    .featured-team-badge {
      position: absolute;
      top: 22px;
      right: 22px;
      z-index: 4;
      padding: 10px 13px;
      background: #c99e31;
      color: #07100b;
      font-size: 9px;
      font-weight: 950;
      letter-spacing: .14em;
      text-transform: uppercase;
      box-shadow: 0 10px 24px rgba(0, 0, 0, .24);
    }

    .featured-team-card .team-number {
      font-size: 92px;
      color: rgba(255, 255, 255, .045);
    }

    .featured-team-card .team-meta {
      margin-top: 28px;
      align-items: end;
    }

    .featured-team-card .team-meta h3 {
      max-width: none;
      font-size: clamp(42px, 5vw, 64px);
      letter-spacing: .01em;
    }

    .featured-team-card .team-meta small,
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

      .featured-team-section .section-head > p {
        margin-top: 24px;
      }

      .featured-team-grid {
        grid-template-columns: 1fr !important;
      }

      .featured-team-card .team-image {
        height: 430px;
        min-height: 430px;
        padding: 34px;
      }
    }

    @media (max-width: 520px) {
      .featured-team-card .team-image {
        height: 350px;
        min-height: 350px;
        padding: 26px 18px;
      }

      .featured-team-badge {
        top: 16px;
        right: 16px;
        padding: 8px 10px;
        font-size: 8px;
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
