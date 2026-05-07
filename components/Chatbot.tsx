'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, MessageCircle, Home, Calendar, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/types';

// ─── Quick Actions ───────────────────────────────────────────
const QUICK_ACTIONS = [
  { id: 'listing', label: 'View Rooms', icon: Home, prompt: 'What rooms do you have available?' },
  { id: 'tour', label: 'Book a Tour', icon: Calendar, prompt: 'I want to schedule a tour' },
  { id: 'booking', label: 'Book Now', icon: BookOpen, prompt: 'I want to book a room' },
];

// ─── Welcome Message ─────────────────────────────────────────
const WELCOME_MSG: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi! Welcome to SF Affordable Short Term Rentals! 🏠

I\'m your AI concierge for San Francisco hotel sublease rooms.

📍 Location: 4 min walk to Powell BART
💰 Price: $1,350~$1,850/mo
✅ Minimum 1 month stay

I can help you:
• Learn about our rooms and pricing
• Schedule a tour
• Book a room directly

For fastest response, reach out to Cynthia`,
  timestamp: Date.now(),
};

// ─── Fallback Responses ──────────────────────────────────────
const FALLBACK_RESPONSES: Record<string, string> = {
  'greeting': `Hi! Welcome to SF Affordable Short Term Rentals! 🏠

I\'m your AI concierge for San Francisco hotel sublease rooms.

📍 Location: 4 min walk to Powell BART
💰 Price: $1,350~$1,850/mo
✅ Minimum 1 month stay

I can help you:
• Learn about our rooms and pricing
• Schedule a tour
• Book a room directly

For fastest response, reach out to Cynthia`,

  'listings': `Our rooms are at The Herbert Hotel, 4 min walk from Powell BART:

**Room A: Private Room + Private Bathroom**
• $1,850/mo/person
• Deposit: $1,850 (fully refundable)
• Queen bed, private bathroom
• Available from April 8, 2026

**Room B: Private Room + Shared Bathroom (Recommended)** ⭐
• $1,350/mo/person
• Deposit: $1,350 (fully refundable)
• Queen bed, 6 rooms share 2 bathrooms (cleaned multiple times daily)
• Available now

🔑 Minimum stay: 1 month
👥 2 guests: price increases due to insurance — contact Cynthia

Which room interests you?`,

  'tour': `Scheduling a tour is easy!

📅 Tours available on weekdays, every 30 min (9am–2:30pm)
📍 Location: The Herbert Hotel

**Recommended steps:**
1. Text Cynthia
2. Tell her your preferred time (e.g., "Tuesday 10:30am")
3. Cynthia will arrange everything

Tours are available on weekdays, come see for yourself!

Contact Cynthia anytime with questions.`,

  'booking': `Ready to book? Great! Please provide:

1. **Name** (your full legal name)
2. **Email** (for receiving the lease)
3. **Phone** (for follow-up)
4. **Move-in date** (preferred)
5. **Duration** (how many months)
6. **Room preference** (private bath or shared bath)

Or reach out to Cynthia directly for fastest booking

💡 Tips:
• Deposit is fully refunded on move-out
• Pay via Zelle or PayPal
• Minimum 1 month
• Check-in: after 3pm (need to pay + sign 2 days in advance)`,

  'payment': `Payment details:

💰 **Rent Payment**
• **Zelle**: Zelle (Yan Luo)
• **PayPal**: contact Cynthia for details

⚠️ PayPal fees are the sender\'s responsibility — we need to receive the exact amount.

📧 After signing the lease, complete payment to confirm your booking.`,

  'default': `Hi there! Thanks for reaching out.

I can help you with:
• 📋 Room details and pricing
• 📅 Tour scheduling (weekdays 9am–2:30pm)
• ✅ Direct booking

For fastest response, reach out directly:
📱 <a href="tel:+14152839224" class="hover:underline">Text Cynthia directly</a>
📧 contact Cynthia for details

Looking forward to helping you! 🏠`,
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('room') || lower.includes('房源') || lower.includes('available') || lower.includes('what do you have') || lower.includes('listing')) {
    return FALLBACK_RESPONSES['listings'];
  }
  if (lower.includes('tour') || lower.includes('看房') || lower.includes('visit') || lower.includes('see')) {
    return FALLBACK_RESPONSES['tour'];
  }
  if (lower.includes('book') || lower.includes('预订') || lower.includes('租') || lower.includes('reserve') || lower.includes('rent')) {
    return FALLBACK_RESPONSES['booking'];
  }
  if (lower.includes('payment') || lower.includes('pay') || lower.includes('zelle') || lower.includes('transfer') || lower.includes('支付')) {
    return FALLBACK_RESPONSES['payment'];
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('你好') || lower.includes('您好')) {
    return FALLBACK_RESPONSES['greeting'];
  }

  return FALLBACK_RESPONSES['default'];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSeenBubble, setHasSeenBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sfaffordable_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (parsed.length > 0) setMessages(parsed);
        else setMessages([WELCOME_MSG]);
      } else {
        setMessages([WELCOME_MSG]);
      }
    } catch {
      setMessages([WELCOME_MSG]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try { localStorage.setItem('sfaffordable_chat_messages', JSON.stringify(messages)); } catch {}
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setHasSeenBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content: content.trim(), timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content.trim(), history }),
      });
      const data = (await res.json()) as { response: string; error?: string };
      const aiMsg: Message = { id: `assistant-${Date.now()}`, role: 'assistant', content: data.error || data.response, timestamp: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = { id: `error-${Date.now()}`, role: 'assistant', content: 'Network error. Please try again or text Cynthia', timestamp: Date.now() };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const resetChat = () => {
    setMessages([WELCOME_MSG]);
    localStorage.removeItem('sfaffordable_chat_messages');
  };

  return (
    <>
      {/* Chat Panel */}
      <div className={cn(
        'fixed z-50 bottom-4 right-4 w-[calc(100vw-32px)] sm:w-[400px] h-[600px] sm:h-[580px]',
        'bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden',
        'transition-all duration-300 ease-out',
        'border border-gray-100',
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none sm:bottom-20 sm:right-6'
      )}
      style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {/* Header */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">AI Concierge</h3>
              <p className="text-white/60 text-xs">Chat with us · If AI can't help, text Cynthia directly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetChat} className="text-white/60 hover:text-white text-xs transition-colors px-2 py-1 rounded-md hover:bg-white/10" title="Clear chat">Clear</button>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" aria-label="Close"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex animate-slide-up', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed', msg.role === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100')}
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100 px-4 py-3 flex items-center gap-1">
                <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full" />
              </div>
            </div>
          )}

          {messages.length === 1 && !isTyping && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {QUICK_ACTIONS.map((action) => (
                <button key={action.id} onClick={() => sendMessage(action.prompt)}
                  className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium', 'bg-primary/10 text-primary border border-primary/20', 'hover:bg-primary hover:text-white transition-all duration-200', 'shadow-sm')}>
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-end gap-2">
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Type a message... (Enter to send)"
              rows={1} className={cn('flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50', 'text-gray-900 placeholder-gray-400 text-sm resize-none', 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary', 'transition-all')}
              style={{ maxHeight: '120px' }}
              onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px'; }} />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
              className={cn('w-11 h-11 rounded-xl flex items-center justify-center transition-all', 'bg-primary text-white hover:bg-primary-600', 'disabled:opacity-40 disabled:cursor-not-allowed', 'shadow-sm hover:shadow-md flex-shrink-0')} aria-label="Send">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-300 mt-2">AI-assisted response, for reference only</p>
        </div>
      </div>

      {/* Floating Bubble */}
      <button onClick={() => setIsOpen(!isOpen)}
        className={cn('fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6', 'w-14 h-14 rounded-full shadow-lg flex items-center justify-center', 'bg-primary text-white transition-all duration-300', 'hover:shadow-xl hover:scale-105 active:scale-95', isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100')}
        aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}>
        {isOpen ? <X className="w-6 h-6" /> : <><MessageCircle className="w-6 h-6" /><span className={cn('absolute inset-0 rounded-full bg-primary', !hasSeenBubble && 'animate-ping opacity-30')} /></>}
      </button>
    </>
  );
}