function initAbout() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const about = document.querySelector('.about');

  if (!about) return;

  const statementLines = about.querySelectorAll('.about__statement-text');
  const copy = about.querySelector('.about__copy');
  const skills = about.querySelectorAll('.about__skills span');
  const visual = about.querySelector('.about__visual-frame');
  const image = about.querySelector('.about__visual-shape img');

  gsap.from(statementLines, {
    yPercent: 110,
    duration: 1.1,
    stagger: 0.08,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: about,
      start: 'top 72%'
    }
  });

  gsap.from(copy, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: copy,
      start: 'top 82%'
    }
  });

  gsap.from(skills, {
    y: 18,
    opacity: 0,
    duration: 0.55,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about__skills',
      start: 'top 88%'
    }
  });

  if (image && visual) {
    gsap.fromTo(
      image,
      {
        scale: 1.1
      },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: visual,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  }
}