import SplitText from './_splitText';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

/**
 * Fade animation
 */
const animateSimpleText = element => {
  gsap.from(element, {
    xPercent: -20,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    scale: -1,
    ease: 'back'
  });
};

/**
 * Reveal
 */
const animateSplitText = element => {
  const timeline = gsap.timeline();
  const {
    current: { textContent: text = '' }
  } = element;

  const splittedText = text.split(' ');
  const node = document.createElement('div');

  splittedText.forEach((value, index) => {
    const nodeText = document.createTextNode(value);
    const tl = gsap.timeline();

    node.nodeText = nodeText;
    node.appendChild(nodeText);

    tl.set(element.current, { attr: { x1: -1000, x2: 0 } });
    tl.to(element.current, {
      duration: 3,
      attr: { x1: 1000, x2: 2000 },
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      ease: 'none'
    });

    timeline.add(tl, index * 0.02);
  });
};

export { animateSimpleText, animateSplitText };
