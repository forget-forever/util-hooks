import { useRef } from "react";

function useMemoizedFn<F extends (...args: any) => any>(fn: F) {

  // 这里可以拿到每次最新的 fn，并把它更新到 ref 中，这可以保证此 ref 能够持有最新的 fn 引用
  const latestFn = useRef<F>(fn);
  latestFn.current = fn;

  // 我们通过这个只初始化一次的 useRef 来构建一个函数调用外壳，保证这个外壳函数的引用不会发生变化
  // 并且通过在内部持有最新函数的引用，来保证调用准确性
  const memoizedFn = useRef((...args: Parameters<F>) => {
    latestFn.current?.(...args as any);
  });

  return memoizedFn.current as F;
}

export default useMemoizedFn;