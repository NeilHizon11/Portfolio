function initHero() {
  const hero = document.querySelector('.hero');

  if (!hero) return;

  const menuButton = hero.querySelector('.hero__menu-toggle');
  const mobileMenu = hero.querySelector('.hero__mobile-menu');
  const backdrop = hero.querySelector('.hero__menu-backdrop');
  const mobileLinks = hero.querySelectorAll('.hero__mobile-menu a');
  const portrait = hero.querySelector('.hero__portrait');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopBreakpoint = window.matchMedia('(min-width: 1025px)');

  function updateMenuVisibility() {
    if (!menuButton) return;

    if (!desktopBreakpoint.matches) {
      menuButton.classList.add('is-visible');
      return;
    }

    const triggerPoint = window.innerHeight * 0.35;

    if (window.scrollY > triggerPoint) {
      menuButton.classList.add('is-visible');
    } else if (!mobileMenu.classList.contains('is-active')) {
      menuButton.classList.remove('is-visible');
    }
  }

  function openMenu() {
    menuButton.classList.add('is-active', 'is-visible');
    mobileMenu.classList.add('is-active');
    backdrop?.classList.add('is-active');

    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');

    mobileMenu.setAttribute('aria-hidden', 'false');
    backdrop?.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuButton.classList.remove('is-active');
    mobileMenu.classList.remove('is-active');
    backdrop?.classList.remove('is-active');

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');

    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop?.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    updateMenuVisibility();
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('is-active');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.addEventListener(
    'scroll',
    updateMenuVisibility,
    {
      passive: true
    }
  );

  window.addEventListener('resize', updateMenuVisibility);

  menuButton?.addEventListener('click', toggleMenu);
  backdrop?.addEventListener('click', closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      mobileMenu.classList.contains('is-active')
    ) {
      closeMenu();
    }
  });

  updateMenuVisibility();

  if (!reduceMotion && window.gsap) {
    const timeline = gsap.timeline({
      defaults: {
        ease: 'power4.out'
      }
    });

    timeline
      .from('.hero__nav', {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from(
        '.hero__title-text',
        {
          yPercent: 115,
          duration: 1.25,
          stagger: 0.12
        },
        '-=0.35'
      )
      .from(
        '.hero__portrait',
        {
          y: 100,
          opacity: 0,
          scale: 0.94,
          duration: 1.2
        },
        '-=1'
      )
      .from(
        [
          '.hero__intro',
          '.hero__location',
          '.hero__scroll',
          '.hero__availability'
        ],
        {
          y: 20,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08
        },
        '-=0.65'
      );
  }

  if (
    !reduceMotion &&
    portrait &&
    window.gsap &&
    desktopBreakpoint.matches
  ) {
    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(portrait, {
        x: x * 14,
        y: y * 8,
        rotation: x * 0.7,
        duration: 1,
        ease: 'power3.out'
      });
    });

    hero.addEventListener('mouseleave', () => {
      gsap.to(portrait, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
  }
}