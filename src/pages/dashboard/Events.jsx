
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { getEvents, registerForEvent } from '../../api/events';
import { useAuth } from '../../context/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState(null);

  const load = () => getEvents().then((res) => setEvents(res.events)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleRegister = async (id) => {
    setRegisteringId(id);
    try {
      await registerForEvent(id);
      toast.success('Registered - awaiting approval');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not register');
    } finally {
      setRegisteringId(null);
    }
  };

  const myStatus = (event) => event.registrations?.find((r) => r.volunteer === user._id || r.volunteer?._id === user._id)?.status;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Events</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Browse and register for upcoming events.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44" />)
        ) : events.length === 0 ? (
          <p className="text-sm text-ink/50 dark:text-canvas/50">No events scheduled yet - check back soon.</p>
        ) : (
          events.map((event) => {
            const status = myStatus(event);
            return (
              <div key={event._id} className="flex flex-col rounded-2xl border border-mist bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <h3 className="font-display text-base font-semibold text-ink dark:text-canvas">{event.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink/60 dark:text-canvas/60">{event.description}</p>
                <div className="mt-3 space-y-1 text-xs text-ink/50 dark:text-canvas/50">
                  <p className="flex items-center gap-1.5"><CalendarDays size={13} /> {new Date(event.date).toLocaleDateString()}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={13} /> {event.location}</p>
                  <p className="flex items-center gap-1.5"><Users size={13} /> {event.seatsLeft ?? event.capacity} seats left</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {status ? (
                    <StatusBadge status={status} />
                  ) : (
                    <Button onClick={() => handleRegister(event._id)} disabled={registeringId === event._id} className="!px-4 !py-2 text-xs">
                      {registeringId === event._id ? 'Registering...' : 'Register'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Events;
