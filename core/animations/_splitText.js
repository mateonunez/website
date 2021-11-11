import { randomDirection, randomNumber } from 'core/utils/numbers';

import gsap from 'gsap';

export default function SplitText(element, { words = 1, chars = 1, spacing = 5 }) {
  const searchTextNodes = element => {
    let foundTextNodes = [];

    if (!element) {
      return foundTextNodes;
    }

    for (let i = 0; i <= element.childNodes.length - 1; i++) {
      const node = element.childNodes[i];

      if (node.nodeName === '#text') {
        foundTextNodes.push(node);
      } else {
        foundTextNodes = foundTextNodes.concat(searchTextNodes(node));
      }
    }

    return foundTextNodes;
  };

  const createElement = (text, relatedNode) => {
    const node = document.createElement('div');
    const nodeText = document.createTextNode(text);

    node.nodeText = nodeText;
    node.appendChild(nodeText);

    node.style.dispaly = 'inline-block';
    node.style.position = 'relative';

    if (text.trim() === '') {
      node.style.width = `${String(spacing)}px`;
    }

    relatedNode.parentNode.insertBefore(node, relatedNode);

    return node;
  };

  const splitCharacters = textNode => {
    const characters = textNode.nodeValue.toString();
    let chars = [];

    if (characters.trim() !== '') {
      for (let i = 0; i < characters.length; i++) {
        const character = characters.substr(i, 1);
        const char = createElement(character, textNode);

        if (character.trim() !== '') {
          chars.push(char);
        }
      }
    }

    return chars;
  };

  const splitWords = textNode => {
    const textWords = textNode.nodeValue.toString().split('');
    let words = [];

    for (let i = 0; i <= textWords.length; i++) {
      const textWord = textWords[i];
      const word = createElement(textWord, textNode);

      if (textWord.trim() !== '') {
        words.push(word);
      }

      if (i < textWords.length - 1) {
        createElement(' ', textNode);
      }
    }
  };

  const splitTextNodes = textNodes => {
    const splitText = {
      words: [],
      chars: []
    };

    for (let i = 0; i <= textNodes.length - 1; i++) {
      const textNode = textNodes[i];

      if (words === 0) {
        splitText.chars = splitText.chars.concat(splitCharacters(textNode));
      } else {
        const words = splitWords(textNode);

        if (chars === 1) {
          for (let w = 0; w <= words.length - 1; w++) {
            const word = words[w];
            const chars = splitCharacters(word.nodeText);

            splitText.chars = splitText.chars.concat(chars);

            word.chars = chars;
          }
        }
        splitText.words = splitText.words.concat(words);
      }
    }

    return splitText;
  };

  const animateChar = char => {
    const timeline = gsap.timeline();

    timeline.from(char, randomNumber(3, 5) / 10, {
      top: randomDirection(randomNumber(10, 50)),
      rotationZ: randomDirection(randomNumber(90, 360)),
      rotationX: randomDirection(randomNumber(90, 360)),
      opacity: 0
    });

    return timeline;
  };

  const animateWord = word => {
    const timeline = gsap.timeline();

    timeline.from(word, randomNumber(3, 5) / 10, {
      top: randomDirection(randomNumber(10, 50)),
      rotationX: randomDirection(randomNumber(90, 360)),
      opacity: 0
    });

    return timeline;
  };

  const splitText = splitWords(element);

  return splitText;
}
