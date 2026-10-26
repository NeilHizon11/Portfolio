async function loadSection(id, path) {
  const target = document.getElementById(id);

  if (!target) return;

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function initSections() {
  await Promise.all([
    loadSection('hero', 'sections/hero.html'),
    loadSection('work', 'sections/work.html'),
    loadSection('about', 'sections/about.html'),
    loadSection('contact-cta', 'sections/contact-cta.html'),
    loadSection('footer', 'sections/footer.html')
  ]);

  if (typeof initHero === 'function') {
    initHero();
  }

  if (typeof initWork === 'function') {
    initWork();
  }

  if (typeof initAbout === 'function') {
    initAbout();
  }

  if (typeof initContactCTA === 'function') {
    initContactCTA();
  }

  if (typeof initFooter === 'function') {
    initFooter();
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

document.addEventListener('DOMContentLoaded', initSections);