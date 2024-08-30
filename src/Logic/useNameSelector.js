// useNameSelector.js
import { useEffect, useState } from 'react';
import egg1 from '../assets/egg1.png';
import egg2 from '../assets/egg2.png';
import egg3 from '../assets/egg3.png';
import egg4 from '../assets/egg4.png';
import egg5 from '../assets/egg5.png';
import egg6 from '../assets/egg6.png';

const eggImages = {
  egg1,
  egg2,
  egg3,
  egg4,
  egg5,
  egg6
};

const useNameSelector = () => {
  const [eggImageSrc, setEggImageSrc] = useState(egg1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedEggId = localStorage.getItem('selectedEgg');
    setEggImageSrc(eggImages[savedEggId] || egg1);

    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const nameDisplay = document.querySelectorAll('.name-display .letter');

      if (key === 'BACKSPACE') {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          nameDisplay[newIndex].textContent = '_';
          setCurrentIndex(newIndex);
        }
      } else if (/^[A-Z-]$/.test(key)) {
        if (currentIndex < nameDisplay.length) {
          nameDisplay[currentIndex].textContent = key;
          setCurrentIndex(currentIndex + 1);
        }
      } else if (key === 'ENTER') {
        const confirmBtn = document.getElementById('confirmBtn');
        if (confirmBtn) {
          confirmBtn.click();
        } else {
          console.error('Confirm button not found');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const createAlphabetGrid = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');
    const gridContainer = document.querySelector('.alphabet-grid');
    if (gridContainer) {
      gridContainer.innerHTML = '';
      alphabet.forEach((letter) => {
        const letterElement = document.createElement('div');
        letterElement.className =
          'alphabet-letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D]';
        letterElement.textContent = letter;
        gridContainer.appendChild(letterElement);

        letterElement.addEventListener('click', () => {
          const nameDisplay = document.querySelectorAll('.name-display .letter');
          if (currentIndex < nameDisplay.length) {
            nameDisplay[currentIndex].textContent = letter;
            setCurrentIndex(currentIndex + 1);
          }
        });
      });
    }
  };

  return { eggImageSrc, createAlphabetGrid, setCurrentPage: () => {} };
};

export default useNameSelector;