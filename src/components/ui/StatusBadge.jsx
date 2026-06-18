import React from 'react';

const styles = {
  pending: 'bg-saffron/15 text-saffron border-saffron/30',
  approved: 'bg-wing/15 text-wing border-wing/30',
  rejected: 'bg-coral/15 text-coral border-coral/30',
  active: 'bg-wing/15 text-wing border-wing/30',
  completed: 'bg-wing/15 text-wing border-wing/30',
  upcoming: 'bg-saffron/15 text-saffron border-saffron/30',
  cancelled: 'bg-coral/15 text-coral border-coral/30',
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${
      styles[status] || styles.pending
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
