import { useEffect, useState } from "react";

export interface IntersectionObserverOptions {
  ref: React.RefObject<HTMLDivElement>;
  rootMargin: string;
}

export const useIsVisible = ({
  ref,
  rootMargin,
}: IntersectionObserverOptions) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};
