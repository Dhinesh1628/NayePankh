import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { sendChatMessage } from '../../api/ai';
import { useAuth } from '../../context/AuthContext';

const Assistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi ${user?.name?.split(' ')[0] || ''}! I'm the NayePankh assistant - ask me about events, campaigns, or donations.` },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const res = await sendChatMessage(userMessage.text);
      setMessages((prev) => [...prev, { role: 'assistant', text: res.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong reaching the assistant.' }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] max-w-3xl flex-col">
      <div className="flex items-center gap-2">
        <Sparkles className="text-wing" size={20} />
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-canvas">AI Assistant</h1>
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-mist bg-white/40 p-5 dark:border-white/10 dark:bg-white/[0.02]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}
          >
            {m.role === 'assistant' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-wing/10 text-wing">
                <Bot size={15} />
              </div>
            )}
            <div
              className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                m.role === 'user'
                  ? 'bg-wing text-white'
                  : 'bg-mist/60 text-ink dark:bg-white/5 dark:text-canvas'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron">
                <User size={15} />
              </div>
            )}
          </motion.div>
        ))}
        {sending && <p className="text-xs text-ink/40 dark:text-canvas/40">Assistant is typing...</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about events, campaigns, or donations..."
          className="flex-1 rounded-full border border-mist bg-transparent px-5 py-3 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-wing dark:border-white/10 dark:text-canvas"
        />
        <button
          type="submit"
          disabled={sending}
          aria-label="Send message"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-wing text-white hover:bg-wing-light disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default Assistant;
