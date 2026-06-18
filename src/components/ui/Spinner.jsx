
import React from 'react';

const Spinner = ({ size = 24 }) => (
  <div
    className="animate-spin rounded-full border-2 border-wing/30 border-t-wing"
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
