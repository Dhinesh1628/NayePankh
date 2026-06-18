import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ to, label, suffix = '', duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-4xl font-semibold text-wing-light sm:text-5xl">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wider text-canvas/60">{label}</p>
    </div>
  );
};

export default Counter;
