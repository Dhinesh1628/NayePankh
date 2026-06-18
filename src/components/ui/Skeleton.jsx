import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-mist/60 dark:bg-white/10 ${className}`} />
);

export default Skeleton;
