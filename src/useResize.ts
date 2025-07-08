import { useEffect } from "react";

export default function useResize(fn?: (size: {width: number, height: number}) => void, config?: {target?: HTMLElement}) {
  const { target = document.body } = config || {};
  useEffect(() => {
    if (target) {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          fn && fn({ width: entry.contentRect.width, height: entry.contentRect.height });
        });
      });
      resizeObserver.observe(target);
      return () => {
        resizeObserver.disconnect();
      };
    }
    return () => {};
  }, []);
}
