function initWorkPage() {
  const page = document.querySelector('.work-page');

  if (!page) return;

  const menuButton = document.querySelector('.site-menu-toggle');
  const menu = document.querySelector('.site-menu');
  const backdrop = document.querySelector('.site-menu-backdrop');
  const menuLinks = document.querySelectorAll('.site-menu a');

  const filterButtons = document.querySelectorAll('.work-filter__button');
  const projects = document.querySelectorAll('.work-project');

  const preview = document.querySelector('.work-preview');
  const previewImage = document.querySelector('.work-preview__image');

  const footerYear = document.getElementById('footer-year');
  const backToTop = document.querySelector('.work-footer__top');

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
    } else if (!menu.classList.contains('is-active')) {
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

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter =
        button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove('is-active');
      });

      button.classList.add('is-active');

      projects.forEach((project) => {
        const category =
          project.dataset.category;

        const shouldShow =
          filter === 'all' ||
          category === filter;

        project.classList.toggle(
          'is-hidden',
          !shouldShow
        );
      });

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    });
  });

  if (
    preview &&
    previewImage &&
    desktopBreakpoint.matches
  ) {
    projects.forEach((project) => {
      project.addEventListener(
        'mouseenter',
        () => {
          const image =
            project.dataset.image;

          if (!image) return;

          previewImage.src = image;
          preview.classList.add(
            'is-visible'
          );
        }
      );

      project.addEventListener(
        'mouseleave',
        () => {
          preview.classList.remove(
            'is-visible'
          );
        }
      );
    });

    document.addEventListener(
      'mousemove',
      (event) => {
        if (
          !preview.classList.contains(
            'is-visible'
          )
        ) {
          return;
        }

        const offsetX = 30;
        const offsetY = -20;

        const previewWidth =
          preview.offsetWidth;

        const previewHeight =
          preview.offsetHeight;

        let x =
          event.clientX +
          previewWidth / 2 +
          offsetX;

        let y =
          event.clientY +
          previewHeight / 2 +
          offsetY;

        const rightEdge =
          window.innerWidth -
          previewWidth / 2 -
          20;

        const leftEdge =
          previewWidth / 2 +
          20;

        const bottomEdge =
          window.innerHeight -
          previewHeight / 2 -
          20;

        const topEdge =
          previewHeight / 2 +
          20;

        x = Math.min(
          Math.max(x, leftEdge),
          rightEdge
        );

        y = Math.min(
          Math.max(y, topEdge),
          bottomEdge
        );

        if (window.gsap) {
          gsap.to(preview, {
            x,
            y,
            duration: 0.35,
            ease: 'power3.out'
          });
        } else {
          preview.style.left = `${x}px`;
          preview.style.top = `${y}px`;
        }
      }
    );
  }

  if (
    !reduceMotion &&
    window.gsap &&
    window.ScrollTrigger
  ) {
    gsap.registerPlugin(
      ScrollTrigger
    );

    const heroTimeline =
      gsap.timeline({
        defaults: {
          ease: 'power4.out'
        }
      });

    heroTimeline
      .from(
        '.work-header',
        {
          y: -30,
          opacity: 0,
          duration: 0.8
        }
      )
      .from(
        '.work-hero__eyebrow',
        {
          y: 20,
          opacity: 0,
          duration: 0.6
        },
        '-=0.3'
      )
      .from(
        '.work-hero__title-text',
        {
          yPercent: 115,
          duration: 1.25
        },
        '-=0.35'
      )
      .from(
        '.work-hero__bottom',
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.65'
      );

    gsap.from(
      '.work-filter',
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.work-archive',
          start: 'top 80%'
        }
      }
    );

    projects.forEach((project) => {
      gsap.from(
        project,
        {
          y: 40,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 90%'
          }
        }
      );
    });

    gsap.from(
      '.work-contact__text',
      {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.work-contact',
          start: 'top 75%'
        }
      }
    );

    gsap.from(
      '.work-contact__button',
      {
        scale: 0.75,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger:
            '.work-contact__button',
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
  initWorkPage
);