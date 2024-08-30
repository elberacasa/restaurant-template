import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

function Carousel({ items, itemsToShow, itemsToScroll, onItemClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Ensure we have at least 3 * itemsToShow items
  const extendedItems = [...items, ...items, ...items];

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: itemsToShow,
      spacing: 15,
    },
    loop: true,
    duration: 1000,
    dragStart: () => {
      autoplay(false);
    },
    dragEnd: () => {
      autoplay(true);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    updated(slider) {
      slider.track.details.slides.forEach((slide) => {
        slide.distance = (slide.distance % items.length) - items.length;
      });
    },
  });

  function autoplay(run) {
    clearTimeout(instanceRef.current.autoplayTimeout);
    if (run && instanceRef.current) {
      instanceRef.current.autoplayTimeout = setTimeout(() => {
        instanceRef.current?.next();
      }, 1000); // Change slide every 3 seconds
    }
  }

  useEffect(() => {
    if (loaded && instanceRef.current) {
      autoplay(true);
    }
  }, [loaded, instanceRef]);

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {extendedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="keen-slider__slide">
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => onItemClick(item)}
            >
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="absolute top-0 right-0 bg-yellow-400 text-blue-800 px-2 py-1 rounded-bl-lg font-bold">
                ${item.price.toFixed(2)}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{item.name}</h3>
                <p className="text-gray-600 text-sm">Ver detalles</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-4">
          {[...Array(Math.min(5, items.length)).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx * itemsToShow);
              }}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentSlide % items.length === idx * itemsToShow % items.length ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;