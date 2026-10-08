'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion, useInView } from '@/hooks/useInView';

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  /** Animation length in milliseconds. */
  duration?: number;
  /** Wait this long after entering the viewport before counting. */
  delay?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({ value, decimals = 0, suffix = '', duration = 1600, delay = 0, className = '' }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(value * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
