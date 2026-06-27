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

// Hook to track PageView on component mount
// Note: fbq is initialized globally in index.html, so just track PageView here
export const useMetaPixelPageView = () => {
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);
};

// Function to track Lead event
// Called after successful form submission
export const trackMetaPixelLead = (data?: Record<string, unknown>) => {
  if (window.fbq) {
    window.fbq("track", "Lead", data || {});
  }
};
