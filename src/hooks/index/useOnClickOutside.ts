import { useEffect, useRef } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: (event: Event) => void,
  mouseEvent: "mousedown" | "mouseup" | "touchstart" = "mousedown"
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener(mouseEvent, listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler]);

  return ref;
};

export { useOnClickOutside };
