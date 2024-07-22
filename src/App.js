import React, { useState, useEffect, useRef } from 'react';
import './App.scss';

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  // Add more images as needed
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSwipeLeft();
      } else if (e.key === 'ArrowRight') {
        handleSwipeRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDragStart = (e) => {
    setDragging(true);
    setDragStartX(e.clientX);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    setDragEndX(e.clientX);
    const dragDistance = dragEndX - dragStartX;
    if (dragDistance > 100) {
      handleSwipeRight();
    } else if (dragDistance < -100) {
      handleSwipeLeft();
    }
  };

  const handleDragOver = (e) => {
    if (dragging) {
      e.preventDefault();
      const dragDistance = e.clientX - dragStartX;
      imageRef.current.style.transform = `translateX(${dragDistance}px)`;
    }
  };

  return (
    <div className="app">
      <div
        className="image-container"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        ref={imageRef}
      >
        <img src={images[currentIndex]} alt="Swipe" className="image" />
      </div>
    </div>
  );
};

export default App;
