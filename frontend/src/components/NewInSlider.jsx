import React, { useState, useEffect, useCallback } from "react";
import "./NewInSlider.css";

import NewIn1 from "./images/home.png";
import NewIn2 from "./images/image.png";

const slides = [
  {
    image: NewIn1,
    title: "NEW COLLECTION IN ",
    subtitle: "Discover the latest trends",
    ctaText: "DESCOVER",
    ctaLink: "/discover",
  },
  {
    image: NewIn2,
    title: "CLASSY FITS",
    subtitle: "Trendy of this Winter",
    ctaText: "EXPLORE",
    ctaLink: "/discover",
  },
];

export default function NewInSlider() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
    setProgress(0);
  }, []);

  const goPrev = () => {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    setProgress(0);
  };

  useEffect(() => {
    if (hovered) return;

    const autoSlide = setInterval(goNext, 6000);
    const prog = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 20));
    }, 1000);

    return () => {
      clearInterval(autoSlide);
      clearInterval(prog);
    };
  }, [goNext, hovered]);

  return (
    <div
      className="home-slider"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dots Zara top-right */}
      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Image */}
      <div className="slide">
        <img src={slides[index].image} alt="" className="bg" />
        <div className="overlay" />
      </div>

      {/* Content */}
      <div className="text-block">
        <h1>{slides[index].title}</h1>
        <p>{slides[index].subtitle}</p>
        <a href={slides[index].ctaLink} className="cta">
          {slides[index].ctaText}
          <span className="arrow">→</span>
        </a>
      </div>

      {/* NEW — Clean Minimal Arrows */}
      <div className="slider-arrows">
        <button className="arrow-left" onClick={goPrev}>←</button>
        <button className="arrow-right" onClick={goNext}>→</button>
      </div>

      {/* Progress */}
      <div className="bottom-bar">
        <div className="progress">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="numbers">
          <span>0{index + 1}</span>/<span>0{slides.length}</span>
        </div>
      </div>

      {/* Text Nav */}
      <div className="text-nav">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`nav-item ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <span>0{i + 1}</span> {s.title.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
