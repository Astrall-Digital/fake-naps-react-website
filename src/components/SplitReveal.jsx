import React, { useEffect, useRef } from 'react';
import './SplitReveal.css';

/**
 * SplitReveal Component
 * Ported from Astro to React for NAPS
 */
const SplitReveal = ({
  lang = 'fr',
  imageFront = 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop', // Example: Traditional terminal
  imageBack = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',  // Example: Digital NAPS payment
  labelFront = lang === 'fr' ? 'Avant NAPS' : 'Before NAPS',
  labelBack = lang === 'fr' ? 'Avec NAPS' : 'With NAPS',
  tagline = lang === 'fr'
    ? 'Une gestion transformée.'
    : 'Management transformed.',
}) => {
  const sectionRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const rafIdRef = useRef(null);
  const currentRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    if (!section || !front || !back) return;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const isMobile = () => window.innerWidth < 768;

    const travelPx = () => isMobile()
      ? front.offsetHeight * 0.6
      : front.offsetWidth * 0.6;

    function tick() {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      // 0→1 over the full section scroll distance
      const raw = Math.max(0, Math.min(1, scrolled / total));

      // split only happens in the second half: remap [0.5, 1] → [0, 1]
      const target = easeInOutCubic(Math.max(0, (raw - 0.5) / 0.5));

      // smooth lerp
      currentRef.current += (target - currentRef.current) * 0.07;

      const travel = travelPx() * currentRef.current;

      if (isMobile()) {
        // front slides DOWN, back slides UP
        front.style.transform = `translateY(${travel}px)`;
        back.style.transform = `translateY(${-travel}px)`;
      } else {
        // front slides LEFT, back slides RIGHT
        front.style.transform = `translateX(${-travel}px)`;
        back.style.transform = `translateX(${travel}px)`;
      }

      if (currentRef.current > 0.04) {
        section.classList.add('is-splitting');
      } else {
        section.classList.remove('is-splitting');
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    // Only animate while section is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        }
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    observer.observe(section);

    const handleResize = () => {
      front.style.transform = '';
      back.style.transform = '';
      currentRef.current = 0;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="split-reveal-section" className="sr-wrapper" ref={sectionRef}>
      <div className="sr-stage">
        {/* shared image frame */}
        <div className="sr-frame">
          {/* BACK image — underneath, slides right (desktop) / up (mobile) */}
          <div className="sr-card sr-card--back" id="sr-back" ref={backRef}>
            <img src={imageBack} alt={labelBack} className="sr-img" loading="lazy" />
            <span className="sr-label">{labelBack}</span>
          </div>

          {/* FRONT image — on top, slides left (desktop) / down (mobile) */}
          <div className="sr-card sr-card--front" id="sr-front" ref={frontRef}>
            <img src={imageFront} alt={labelFront} className="sr-img" loading="lazy" />
            <span className="sr-label">{labelFront}</span>
          </div>
        </div>

        {/* tagline fades in once split begins */}
        <p className="sr-tagline">{tagline}</p>
      </div>
    </section>
  );
};

export default SplitReveal;
