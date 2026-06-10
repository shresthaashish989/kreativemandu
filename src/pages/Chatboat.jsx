// src/pages/Chatboat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ChatboatPage = () => {
  // State (same as before)
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll & auto-focus (same)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reply logic (unchanged)
  const getBotReply = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    if (msg.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
      return "Hello! 👋 Welcome to Kreativemandu support. How can I assist you today?";
    }
    if (msg.match(/services?|what do you do|offer|provide/)) {
      return "We offer Web Development, App Development, UI/UX Design, Cybersecurity, Cloud Solutions, and DevOps. Which one interests you?";
    }
    if (msg.match(/price|cost|quote|how much|budget/)) {
      return "Pricing depends on your project requirements. Please share your email and we'll send a custom quote within 24h.";
    }
    if (msg.match(/contact|support|email|phone|reach|call/)) {
      return "You can reach us at:\n📧 contact@kreativemandu.com\n📞 +977 1 1234567\n📍 Kathmandu, Nepal\n\nOur support team is available 24/7.";
    }
    if (msg.match(/portfolio|work|projects|examples/)) {
      return "We've delivered 150+ successful projects across fintech, e-commerce, healthcare, and more. Visit our Portfolio page to see case studies!";
    }
    if (msg.match(/team|who are you|founder/)) {
      return "We are a passionate team of 12+ expert developers, designers, and project managers led by our CEO Rajesh Shrestha.";
    }
    if (msg.match(/tech|technology|stack|tools|react|node/)) {
      return "We master React, Node.js, Python, Laravel, Flutter, AWS, Tailwind, MongoDB, and many more. We always choose the right tool for the job.";
    }
    if (msg.match(/timeline|how long|duration|delivery/)) {
      return "Project timelines vary. A typical website takes 4-8 weeks, while a complex web app may take 3-6 months.";
    }
    if (msg.match(/thank|thanks|appreciate/)) {
      return "You're most welcome! 😊 Feel free to ask anything else.";
    }
    return "Thank you for your message. Our team will get back to you shortly. Meanwhile, you can browse our services or portfolio.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botReply = { id: Date.now() + 1, text: getBotReply(input), sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear all chat messages?")) {
      setMessages([
        {
          id: Date.now(),
          text: "Chat history cleared. How can I help you now?",
          sender: "bot",
        },
      ]);
    }
  };

  const quickReplies = [
    { label: "Services", query: "What services do you offer?" },
    { label: "Pricing", query: "How much does a website cost?" },
    { label: "Contact", query: "Contact information" },
    { label: "Portfolio", query: "Show me your portfolio" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header (same as before but with back button) */}
      <header className="bg-brand-blue text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-brand-orange transition flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h1 className="text-xl font-bold">AI Support Assistant</h1>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
          >
            Clear chat
          </button>
        </div>
      </header>

      {/* Main container – chat is now a side card, not full width */}
      <div className="flex-1 flex items-start justify-center p-6">
        {/* Chat card – fixed width on desktop, full width on mobile */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-200">
          {/* Messages area (height constrained) */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-orange text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                  <span className="text-sm text-gray-500">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies (only if there are messages and not typing) */}
          {messages.length > 0 && !isTyping && (
            <div className="px-4 pt-2 pb-1 border-t border-gray-100 bg-white">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(reply.query);
                      inputRef.current?.focus();
                    }}
                    className="text-xs bg-gray-100 hover:bg-brand-orange/20 text-gray-700 px-3 py-1.5 rounded-full transition"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-4 border-t bg-white flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              rows="1"
              className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none max-h-32 text-sm"
              style={{ overflow: "auto" }}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-brand-blue text-white p-2 rounded-full hover:bg-brand-orange transition disabled:opacity-50 w-10 h-10 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Optional footer hint */}
      <p className="text-center text-xs text-gray-400 py-4">
        Our AI assistant is here 24/7. For complex issues, email us directly.
      </p>
    </div>
  );
};

export default ChatboatPage;