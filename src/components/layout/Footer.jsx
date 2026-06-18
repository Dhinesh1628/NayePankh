
import React from 'react';
import { Feather, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-ink text-canvas/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-canvas">
              <Feather size={20} className="text-wing-light" />
              NayePankh
            </div>
            <p className="mt-3 max-w-xs text-sm text-canvas/60">
              New wings for every volunteer. Connecting people to the campaigns and communities that need them most.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-canvas">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-canvas/60">
              <li>hello@nayepankh.org</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-canvas">Follow</h4>
            <div className="mt-3 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-wing/30"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-canvas">Newsletter</h4>
            <p className="mt-3 text-sm text-canvas/60">Monthly updates on campaigns and impact.</p>
            {subscribed ? (
              <p className="mt-3 text-sm text-wing-light">Subscribed - thank you!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full bg-white/5 px-4 py-2 text-sm text-canvas placeholder:text-canvas/40 focus:outline-none focus:ring-1 focus:ring-wing-light"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-wing text-white hover:bg-wing-light"
                >
                  <Mail size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-canvas/40">
          (c) {new Date().getFullYear()} NayePankh Volunteer Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
