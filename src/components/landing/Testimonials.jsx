
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Ananya Rao', role: 'Volunteer, Education Support', quote: 'NayePankh made it simple to find a tutoring program close to home and actually see the hours add up.' },
  { name: 'Devesh Kulkarni', role: 'Campaign Lead, Environment', quote: 'Assigning volunteers and tracking campaign progress used to be a spreadsheet nightmare. Not anymore.' },
  { name: 'Meher Iqbal', role: 'Monthly Donor', quote: 'I can see exactly which campaign my donation supported and the impact it had. That transparency is rare.' },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-canvas px-6 py-24 dark:bg-ink">
      <div className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto text-wing" size={28} />
        <div className="relative mt-6 min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-display text-xl italic text-ink dark:text-canvas sm:text-2xl">"{current.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-wing">{current.name}</p>
              <p className="text-xs text-ink/50 dark:text-canvas/50">{current.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-mist/60 text-ink hover:bg-wing/10 dark:bg-white/5 dark:text-canvas"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 w-6 rounded-full transition-colors ${i === index ? 'bg-wing' : 'bg-mist dark:bg-white/15'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-mist/60 text-ink hover:bg-wing/10 dark:bg-white/5 dark:text-canvas"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
