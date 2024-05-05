import { RefObject, useEffect } from 'react';

interface UseObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

function useObserver(
  elementRef: RefObject<Element>,
  callback: () => void,
  options: UseObserverOptions,
): void {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef, callback, options]);
}

export default useObserver;
