import { useState, useCallback, useEffect } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

interface UseLazyImageProps {
  src: string;
  placeholder?: string;
  rootMargin?: string;
}

export const useLazyImage = ({
  src,
  placeholder,
  rootMargin = "100px",
}: UseLazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder || "");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const { elementRef, isVisible } = useIntersectionObserver({
    rootMargin,
    threshold: 0,
    triggerOnce: true,
  });

  const imgRefCallback = useCallback(
    (imgElement: HTMLImageElement) => {
      setImageRef(imgElement);
      elementRef.current = imgElement;
    },
    [elementRef]
  );

  // Load image when visible
  useEffect(() => {
    if (isVisible && src && imageSrc !== src) {
      const img = new Image();

      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        setIsError(false);
      };

      img.onerror = () => {
        setIsError(true);
        setIsLoaded(false);
      };

      img.src = src;
    }
  }, [isVisible, src, imageSrc]);

  return {
    imgRef: imgRefCallback,
    imageSrc,
    isLoaded,
    isError,
    isVisible,
  };
};
