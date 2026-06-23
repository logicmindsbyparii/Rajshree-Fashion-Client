import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * useGsapReveal - Triggers a fade-in + slide-up animation when element enters viewport
 * @param {Object} options - Animation options
 * @param {number} options.y - Vertical offset (default: 60)
 * @param {number} options.duration - Animation duration (default: 1)
 * @param {number} options.delay - Animation delay (default: 0)
 * @param {string} options.ease - GSAP ease (default: 'power3.out')
 * @param {number} options.stagger - Stagger delay for children (default: 0)
 * @param {number} options.start - ScrollTrigger start position (default: 'top 85%')
 * @returns {React.RefObject} ref - Attach to the element to animate
 */
export function useGsapReveal(options = {}) {
  const ref = useRef(null);
  const {
    y = 60,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    stagger = 0,
    start = 'top 85%'
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (stagger > 0) {
        const children = el.children;
        gsap.set(children, { y, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start,
          onEnter: () => {
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration,
              stagger,
              delay,
              ease,
              overwrite: 'auto'
            });
          },
          once: true
        });
      } else {
        gsap.set(el, { y, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start,
          onEnter: () => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration,
              delay,
              ease,
              overwrite: 'auto'
            });
          },
          once: true
        });
      }
    }, [el]);

    return () => ctx.revert();
  }, [y, duration, delay, ease, stagger, start]);

  return ref;
}

/**
 * useGsapSplitText - Creates a split-text letter-by-letter animation
 * @param {Object} options
 * @param {number} options.duration - Per-letter animation duration
 * @param {number} options.stagger - Stagger between letters
 * @param {string} options.ease - GSAP ease
 * @param {string} options.fromVars - GSAP from vars like { opacity: 0, y: 50 }
 * @returns {React.RefObject} ref - Attach to element containing text
 */
export function useGsapSplitText(options = {}) {
  const ref = useRef(null);
  const {
    duration = 0.8,
    stagger = 0.04,
    ease = 'power2.out',
    fromVars = { opacity: 0, y: 40, rotateX: -40 }
  } = options;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Wrap each letter in a span
    const text = el.textContent;
    el.textContent = '';
    const chars = text.split('');
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      el.appendChild(span);
    });

    const ctx = gsap.context(() => {
      gsap.from(el.children, {
        ...fromVars,
        duration,
        stagger,
        ease,
        overwrite: 'auto'
      });
    }, [el]);

    return () => ctx.revert();
  }, [duration, stagger, ease, fromVars]);

  return { ref, animate };
}

/**
 * useGsapHover - Adds GSAP hover animation to an element
 * @param {Object} options
 * @param {Object} options.enter - GSAP vars for mouse enter
 * @param {Object} options.leave - GSAP vars for mouse leave
 * @returns {React.RefObject} ref
 */
export function useGsapHover(options = {}) {
  const ref = useRef(null);
  const {
    enter = { scale: 1.05, duration: 0.4, ease: 'power2.out' },
    leave = { scale: 1, duration: 0.4, ease: 'power2.out' }
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { ...enter, overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { ...leave, overwrite: 'auto' });
      });
    }, [el]);

    return () => ctx.revert();
  }, [enter, leave]);

  return ref;
}

/**
 * useGsapParallax - Creates a parallax scroll effect
 * @param {Object} options
 * @param {number} options.speed - Parallax speed factor (default: 0.3)
 * @returns {React.RefObject} ref
 */
export function useGsapParallax(options = {}) {
  const ref = useRef(null);
  const { speed = 0.3 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.set(el, { y: self.progress * speed * 200 });
        }
      });
    }, [el]);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export { gsap, ScrollTrigger };
