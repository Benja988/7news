// components/home/NewsletterSection.tsx
// components/home/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { Mail, Check, Shield, Zap, Send, Bell } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail("");
    
    // Reset after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success State */}
          {isSubscribed ? (
            <div className="text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome Aboard! 🎉
              </h2>
              <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
                Thank you for subscribing! We've sent a confirmation email to your inbox. 
                Get ready for the latest news delivered straight to you.
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all backdrop-blur-sm border border-white/20"
              >
                <Send className="w-5 h-5" />
                <span>Subscribe Another Email</span>
              </button>
            </div>
          ) : (
            /* Main Newsletter Content */
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Stay Informed</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Never Miss
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Breaking News
                  </span>
                </h2>
                
                <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                  Join thousands of informed readers who get curated news, 
                  exclusive insights, and early access to our best stories.
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Zap, text: "Real-time breaking news alerts" },
                    { icon: Shield, text: "No spam, just quality content" },
                    { icon: Mail, text: "Weekly curated digest" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-purple-200">
                      <feature.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-lg">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-purple-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15K+</div>
                    <div>Subscribers</div>
                  </div>
                  <div className="w-px h-8 bg-purple-600"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div>Stay Rate</div>
                  </div>
                  <div className="w-px h-8 bg-purple-600"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24h</div>
                    <div>Delivery</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Join Our Newsletter
                  </h3>
                  <p className="text-purple-200">
                    Get started in seconds
                  </p>
                </div>

                <NewsletterForm
                  email={email}
                  setEmail={setEmail}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />

                {/* Privacy Note */}
                <div className="text-center mt-6">
                  <p className="text-xs text-purple-300">
                    🔒 We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </section>
  );
}

interface NewsletterFormProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function NewsletterForm({ email, setEmail, isSubmitting, onSubmit }: NewsletterFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          required
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={!email || isSubmitting || !email.includes('@')}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Subscribing...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Subscribe Now</span>
          </>
        )}
      </button>

      {/* Quick Benefits */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-purple-300">
        <div className="bg-white/5 rounded-lg py-2">📰 Daily Brief</div>
        <div className="bg-white/5 rounded-lg py-2">🚀 Exclusive</div>
        <div className="bg-white/5 rounded-lg py-2">🎯 Curated</div>
      </div>
    </form>
  );
}