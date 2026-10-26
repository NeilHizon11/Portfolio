function initWork() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray('.work-card');

  cards.forEach((card) => {
    const meta = card.querySelector('.work-card__meta');
    const image = card.querySelector('.work-card__image');

    gsap.from(meta, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 78%'
      }
    });

    gsap.fromTo(
      image,
      {
        scale: 1.08
      },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  });
}