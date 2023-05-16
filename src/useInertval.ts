import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from './useMemoizedFn';

type ResType = boolean | number | void

/**
 * 轮询的hook
 * @param fn 轮询的副作用函数, 返回的是数字那就是通知写一次轮询的时间
 * @param delay 间隔的时间
 * @param immediate 立即运行，初始化的时候有效
 * @returns 
 */
const useInertval = (fn: () => ResType | Promise<ResType>, delay?: number, immediate?: boolean) => {
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const timerCallback = useMemoizedFn(async(d?: number) => {
    clear()
    const res = await fn()
    if (res || res === 0 || res === undefined) {
      const delayNext = typeof res === 'number' ? res : (d || delay)
      timerRef.current = setTimeout(timerCallback, delayNext)
    }
  });

  useEffect(() => {
    if (!(typeof delay === 'number') || delay < 0) {
      return;
    }
    if (immediate) {
      timerCallback()
    } else {
      timerRef.current = setTimeout(timerCallback, delay);
    }
    return clear;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clear, runContinue: timerCallback }
};

export default useInertval;
