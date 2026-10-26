function initAboutPage() {
  const page = document.querySelector('.about-page');

  if (!page) return;

  const menuButton = document.querySelector('.site-menu-toggle');
  const menu = document.querySelector('.site-menu');
  const backdrop = document.querySelector('.site-menu-backdrop');
  const menuLinks = document.querySelectorAll('.site-menu a');

  const portrait = document.querySelector('.about-profile__image');

  const footerYear = document.getElementById('footer-year');
  const backToTop = document.querySelector('.about-footer__top');

  const desktopBreakpoint = window.matchMedia('(min-width: 1025px)');
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function updateMenuVisibility() {
    if (!menuButton) return;

    if (!desktopBreakpoint.matches) {
      menuButton.classList.add('is-visible');
      return;
    }

    const triggerPoint = window.innerHeight * 0.3;

    if (window.scrollY > triggerPoint) {
      menuButton.classList.add('is-visible');
    } else if (!menu?.classList.contains('is-active')) {
      menuButton.classList.remove('is-visible');
    }
  }

  function openMenu() {
    menuButton?.classList.add(
      'is-visible',
      'is-active'
    );

    menu?.classList.add('is-active');
    backdrop?.classList.add('is-active');

    menuButton?.setAttribute(
      'aria-expanded',
      'true'
    );

    menuButton?.setAttribute(
      'aria-label',
      'Close menu'
    );

    menu?.setAttribute(
      'aria-hidden',
      'false'
    );

    backdrop?.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuButton?.classList.remove('is-active');
    menu?.classList.remove('is-active');
    backdrop?.classList.remove('is-active');

    menuButton?.setAttribute(
      'aria-expanded',
      'false'
    );

    menuButton?.setAttribute(
      'aria-label',
      'Open menu'
    );

    menu?.setAttribute(
      'aria-hidden',
      'true'
    );

    backdrop?.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.style.overflow = '';

    updateMenuVisibility();
  }

  function toggleMenu() {
    if (menu?.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuButton?.addEventListener(
    'click',
    toggleMenu
  );

  backdrop?.addEventListener(
    'click',
    closeMenu
  );

  menuLinks.forEach((link) => {
    link.addEventListener(
      'click',
      closeMenu
    );
  });

  document.addEventListener(
    'keydown',
    (event) => {
      if (
        event.key === 'Escape' &&
        menu?.classList.contains('is-active')
      ) {
        closeMenu();
      }
    }
  );

  window.addEventListener(
    'scroll',
    updateMenuVisibility,
    {
      passive: true
    }
  );

  window.addEventListener(
    'resize',
    updateMenuVisibility
  );

  updateMenuVisibility();

  if (
    !reduceMotion &&
    window.gsap &&
    window.ScrollTrigger
  ) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({
      defaults: {
        ease: 'power4.out'
      }
    });

    heroTimeline
      .from('.about-header', {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from(
        '.about-page-hero__eyebrow',
        {
          y: 20,
          opacity: 0,
          duration: 0.6
        },
        '-=0.3'
      )
      .from(
        '.about-page-hero__title-text',
        {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.08
        },
        '-=0.35'
      )
      .from(
        '.about-page-hero__bottom',
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.6'
      );

    if (portrait) {
      gsap.fromTo(
        portrait,
        {
          scale: 1.1
        },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-profile',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }

    gsap.from(
      '.about-profile__content',
      {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-profile__content',
          start: 'top 82%'
        }
      }
    );

    document
      .querySelectorAll('.experience-row')
      .forEach((row) => {
        gsap.from(
          row,
          {
            y: 35,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%'
            }
          }
        );
      });

    document
      .querySelectorAll('.capability-card')
      .forEach((card) => {
        gsap.from(
          card,
          {
            y: 40,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%'
            }
          }
        );
      });

    gsap.from(
      '.about-stack__list span',
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stack__list',
          start: 'top 88%'
        }
      }
    );

    document
      .querySelectorAll('.process-item')
      .forEach((item) => {
        gsap.from(
          item,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%'
            }
          }
        );
      });

    gsap.from(
      '.about-contact__text',
      {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-contact',
          start: 'top 75%'
        }
      }
    );

    gsap.from(
      '.about-contact__button',
      {
        scale: 0.75,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.about-contact__button',
          start: 'top 90%'
        }
      }
    );
  }

  if (footerYear) {
    footerYear.textContent =
      new Date().getFullYear();
  }

  backToTop?.addEventListener(
    'click',
    () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion
          ? 'auto'
          : 'smooth'
      });
    }
  );
}

document.addEventListener(
  'DOMContentLoaded',
  initAboutPage
);