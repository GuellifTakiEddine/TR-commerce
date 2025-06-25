import React, { useEffect, useRef, useState } from 'react';
import './NewInSlider.css';

import NewIn1 from './images/2400NewIn.webp';
import NewIn2 from './images/2400CasualSport.webp';

const NewInSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLight, setIsLight] = useState(false); 

  const images = [NewIn1, NewIn2]; 
  const getImageBrightness = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = pixels.data;
      let r = 0, g = 0, b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixelCount = data.length / 4;
      r = r / pixelCount;
      g = g / pixelCount;
      b = b / pixelCount;

      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      
      setIsLight(brightness > 128); 
    };
  };

  useEffect(() => {
    getImageBrightness(images[currentIndex]);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      setProgress(0); 
    }, 6000); 

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress === 100 ? 0 : prevProgress + 25; 
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [images.length, currentIndex]);

  // Fonction pour naviguer à gauche
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setProgress(0); // Réinitialiser la barre de progression quand on clique sur la flèche gauche
    getImageBrightness(images[currentIndex]);
  };

  // Fonction pour naviguer à droite
  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setProgress(0); // Réinitialiser la barre de progression quand on clique sur la flèche droite
    getImageBrightness(images[currentIndex]);
  };

  return (
    <div className="newin-wrapper">
      <div className="newin-slider-horizontal" ref={sliderRef}>
        {/* Conteneur image + label */}
        <div className="image-container">
          <img 
            src={images[currentIndex]} 
            alt={`New In ${currentIndex + 1}`} 
            className="newin-slide-horizontal"
          />
          <div 
            className={`newin-label-inside ${isLight ? 'light' : 'dark'}`}>NEW IN</div>
        </div>
      </div>

      {/* Flèches sous les images */}
      <div className="slider-arrows">
        <button onClick={goToPrevious} className="arrow-left">←</button>
        <button onClick={goToNext} className="arrow-right">→</button>
      </div>

      {/* Barre de progression sous les images */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default NewInSlider;
