
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center dark:bg-ink">
    <p className="font-mono text-sm uppercase tracking-widest text-wing">404</p>
    <h1 className="mt-3 font-display text-3xl font-semibold text-ink dark:text-canvas">This page took flight</h1>
    <p className="mt-2 text-sm text-ink/60 dark:text-canvas/60">We couldn't find what you were looking for.</p>
    <Button as={Link} to="/" className="mt-6">Back home</Button>
  </div>
);

export default NotFound;
