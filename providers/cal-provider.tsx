"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, createContext, useContext, useState } from "react";
import { analytics } from "./posthog-provider";

interface CalContextType {
  isReady: boolean;
  openCalPopup: () => void;
}

const CalContext = createContext<CalContextType>({
  isReady: false,
  openCalPopup: () => {},
});

export function CalProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "blueprint" });

      // Configure UI for popup
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#1E1B4B",
          },
        },
      });

      // Track booking success
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          analytics.bookingCompleted();
        },
      });

      setIsReady(true);
    })();
  }, []);

  const openCalPopup = () => {
    // The popup is triggered via data attributes, but we track the click
    analytics.ctaClick("Blueprint Popup", "cal-button");
  };

  return (
    <CalContext.Provider value={{ isReady, openCalPopup }}>
      {children}
    </CalContext.Provider>
  );
}

export function useCalPopup() {
  return useContext(CalContext);
}
