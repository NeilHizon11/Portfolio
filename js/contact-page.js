function initContactPage() {
  const page = document.querySelector('.contact-page');

  if (!page) return;

  const menuButton = document.querySelector('.site-menu-toggle');
  const menu = document.querySelector('.site-menu');
  const backdrop = document.querySelector('.site-menu-backdrop');
  const menuLinks = document.querySelectorAll('.site-menu a');

  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('contact-form-status');
  const submitButton = form?.querySelector('.contact-form__button');
  const submitLabel = form?.querySelector('.contact-form__button-label');

  const footerYear = document.getElementById('footer-year');
  const backToTop = document.querySelector('.contact-footer__top');

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
    menuButton?.classList.add('is-visible', 'is-active');
    menu?.classList.add('is-active');
    backdrop?.classList.add('is-active');

    menuButton?.setAttribute('aria-expanded', 'true');
    menuButton?.setAttribute('aria-label', 'Close menu');
    menu?.setAttribute('aria-hidden', 'false');
    backdrop?.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuButton?.classList.remove('is-active');
    menu?.classList.remove('is-active');
    backdrop?.classList.remove('is-active');

    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    menu?.setAttribute('aria-hidden', 'true');
    backdrop?.setAttribute('aria-hidden', 'true');

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

  menuButton?.addEventListener('click', toggleMenu);
  backdrop?.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      menu?.classList.contains('is-active')
    ) {
      closeMenu();
    }
  });

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

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!submitButton || !formStatus) return;

      submitButton.disabled = true;

      if (submitLabel) {
        submitLabel.textContent = 'Sending...';
      }

      formStatus.textContent = '';
      formStatus.classList.remove('is-success', 'is-error');

      try {
        const formData = new FormData(form);

        const response = await fetch(
          'https://api.web3forms.com/submit',
          {
            method: 'POST',
            body: formData
          }
        );

        const result = await response.json();

        if (result.success) {
          formStatus.textContent =
            'Message sent successfully. I’ll get back to you soon.';

          formStatus.classList.add('is-success');

          form.reset();

          if (submitLabel) {
            submitLabel.textContent = 'Sent';
          }

          setTimeout(() => {
            if (submitLabel) {
              submitLabel.textContent = 'Send message';
            }
          }, 2500);
        } else {
          throw new Error(
            result.message || 'Unable to send message.'
          );
        }
      } catch (error) {
        console.error(error);

        formStatus.textContent =
          'Something went wrong while sending your message. Please try again.';

        formStatus.classList.add('is-error');

        if (submitLabel) {
          submitLabel.textContent = 'Try again';
        }
      } finally {
        submitButton.disabled = false;
      }
    });
  }

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
      .from('.contact-header', {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from(
        '.contact-hero__eyebrow',
        {
          y: 20,
          opacity: 0,
          duration: 0.6
        },
        '-=0.3'
      )
      .from(
        '.contact-hero__title-text',
        {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.08
        },
        '-=0.35'
      )
      .from(
        '.contact-hero__bottom',
        {
          y: 30,
          opacity: 0,
          duration: 0.8
        },
        '-=0.6'
      );

    gsap.from(
      '.contact-form-section__intro',
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form-section',
          start: 'top 78%'
        }
      }
    );

    document
      .querySelectorAll('.contact-form__field')
      .forEach((field) => {
        gsap.from(field, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: field,
            start: 'top 90%'
          }
        });
      });

    gsap.from(
      '.contact-form__button',
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.contact-form__button',
          start: 'top 92%'
        }
      }
    );

    document
      .querySelectorAll('.contact-details__link')
      .forEach((link) => {
        gsap.from(link, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: link,
            start: 'top 90%'
          }
        });
      });
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
  initContactPage
);