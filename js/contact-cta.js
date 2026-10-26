function initContactCTA() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.contact-cta');

  if (!section) return;

  const text = section.querySelectorAll('.contact-cta__text');
  const button = section.querySelector('.contact-cta__button');
  const intro = section.querySelector('.contact-cta__intro');
  const bottom = section.querySelector('.contact-cta__bottom');

  gsap.from(text, {
    yPercent: 110,
    duration: 1.15,
    stagger: 0.1,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 72%'
    }
  });

  gsap.from(intro, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 78%'
    }
  });

  gsap.from(button, {
    scale: 0.75,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: button,
      start: 'top 90%'
    }
  });

  gsap.from(bottom, {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: bottom,
      start: 'top 94%'
    }
  });
}