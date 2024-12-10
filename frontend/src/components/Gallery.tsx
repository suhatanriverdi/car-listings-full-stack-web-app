import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";

interface CarImageSliderProps {
  images: string[];
}

export default function CarImageSlider({ images }: CarImageSliderProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [zoomScale, setZoomScale] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNextImage = (isRight: boolean) => {
    if (!swiper) return;

    const len = images.length;
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = isRight
      ? (currentIndex + 1) % len
      : (currentIndex - 1 + len) % len;
    const nextImage = images[nextIndex];

    swiper.slideTo(nextIndex);
    setSelectedImage(nextImage);
  };

  useEffect(() => {
    if (!isFullScreen) {
      setZoomScale(1);
    }
  }, [isFullScreen]);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev * 1.1, 3));
    } else {
      setZoomScale((prev) => Math.max(prev * 0.9, 1));
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isFullScreen) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isFullScreen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNextImage(true);
      } else if (event.key === "ArrowLeft") {
        handleNextImage(false);
      } else if (event.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStartX) return;
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      handleNextImage(true);
    } else if (swipeDistance < -50) {
      handleNextImage(false);
    }

    setTouchStartX(null);
  };

  return (
    <div className="flex flex-col items-center gap-y-[10px] w-full h-full">
      <div className="bg-card-bg rounded-lg w-full h-full relative overflow-hidden">
        <img
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          src={selectedImage}
          alt="Car image"
          className="object-cover w-full h-full cursor-pointer"
          onClick={() => setIsFullScreen(true)}
        />

        <div
          onClick={() => handleNextImage(false)}
          className="cursor-pointer absolute w-[1.5rem] sm:w-[2rem] md:w-[3rem] h-full bg-white bg-opacity-30 backdrop-blur-md top-1/2 left-0 transform -translate-y-1/2 flex justify-center items-center"
        >
          <FaChevronLeft
            size={10}
            style={{ color: "white", fontSize: "24px" }}
          />
        </div>
        <div
          onClick={() => handleNextImage(true)}
          className="cursor-pointer absolute w-[1.5rem] sm:w-[2rem] md:w-[3rem] h-full bg-white bg-opacity-30 backdrop-blur-md top-1/2 right-0 transform -translate-y-1/2 flex justify-center items-center"
        >
          <FaChevronRight
            size={10}
            style={{ color: "white", fontSize: "24px" }}
          />
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        className="w-full h-full"
        speed={400}
        touchRatio={2.5}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} onClick={() => setSelectedImage(image)}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`object-cover w-full h-20 cursor-pointer rounded-lg ${
                selectedImage === image ? "border-2 border-green-600" : ""
              }`}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isFullScreen && (
        <div className="fixed top-0 left-0 w-screen h-full bg-black backdrop-blur-md bg-opacity-70 flex justify-center items-center z-50">
          <img
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            src={selectedImage}
            alt="Displayed car image"
            className="object-contain"
            style={{
              transform: `scale(${zoomScale})`,
              transition: "transform 0.2s",
            }}
            loading="lazy"
            onClick={() => setIsFullScreen(false)} // Close full view on click
          />
        </div>
      )}
    </div>
  );
}
