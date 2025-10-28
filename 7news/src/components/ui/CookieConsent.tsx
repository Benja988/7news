// components/ui/CookieConsent.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const closeConsent = () => {
    // Allow closing without making a choice (will show again next visit)
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  if (!showConsent) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative">
          {/* Close button */}
          <button
            onClick={closeConsent}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close cookie consent"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start space-x-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🍪 We Use Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                We use cookies to enhance your browsing experience, serve personalized content,
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                You can learn more about how we use cookies in our{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/cookies"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Policy
                </a>.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptCookies}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Accept All Cookies
                </button>
                <button
                  onClick={declineCookies}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Decline Non-Essential
                </button>
                <a
                  href="/cookies"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-6 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}