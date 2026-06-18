
import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import { getNotifications, markNotificationRead } from '../../api/notifications';

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => getNotifications().then((res) => setItems(res.notifications)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    setItems((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">Notifications</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-canvas/60">Approvals, assignments, and certificate updates land here.</p>

      <div className="mt-8 space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-mist py-16 text-center dark:border-white/10">
            <BellOff className="text-ink/30 dark:text-canvas/30" size={28} />
            <p className="mt-3 text-sm text-ink/50 dark:text-canvas/50">Nothing here yet.</p>
          </div>
        ) : (
          items.map((n) => (
            <button
              key={n._id}
              onClick={() => !n.read && handleRead(n._id)}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                n.read
                  ? 'border-mist bg-transparent dark:border-white/10'
                  : 'border-wing/30 bg-wing/5 dark:border-wing/20 dark:bg-wing/10'
              }`}
            >
              <Bell size={16} className={n.read ? 'text-ink/30 dark:text-canvas/30' : 'text-wing'} />
              <div>
                <p className="text-sm font-medium text-ink dark:text-canvas">{n.title}</p>
                <p className="mt-0.5 text-sm text-ink/60 dark:text-canvas/60">{n.message}</p>
                <p className="mt-1 text-xs text-ink/40 dark:text-canvas/40">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
