import { useEffect } from "react";

// Declare global fbq function
declare global {
  interface Window {
    fbq: {
      (action: string, event: string, data?: Record<string, unknown>): void;
      q?: unknown[];
    };
    _fbq: unknown;
  }
}

// Initialize Meta Pixel globally
export const initMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;

  if (!pixelId) {
    console.warn("Meta Pixel ID not configured");
    return;
  }

  // Initialize fbq function if not already done
  if (!window.fbq) {
    window.fbq = function () {
      (window.fbq.q = window.fbq.q || []).push(arguments);
    };
  }
  window._fbq = window._fbq || [];

  // Initialize Meta Pixel with pixel ID
  window.fbq("init", pixelId);
  
  // Fire initial PageView
  window.fbq("track", "PageView");
};

// Hook to track PageView on component mount
export const useMetaPixelPageView = () => {
  useEffect(() => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (pixelId && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);
};

// Function to track Lead event
export const trackMetaPixelLead = (data?: Record<string, unknown>) => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (pixelId && window.fbq) {
    window.fbq("track", "Lead", data || {});
  }
};
