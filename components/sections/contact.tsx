"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTrackSection } from "@/hooks/use-track-section";
import { analytics } from "@/providers/posthog-provider";

export function Contact() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sectionRef = useTrackSection("contact");
  const calendarViewTracked = useRef(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });

      // Configure UI
      cal("ui", {
        hideEventTypeDetails: isMobile,
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#1E1B4B",
          },
        },
      });

      // Track Cal.com events - only bookingSuccessful is supported in current API
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          analytics.bookingCompleted();
        },
      });

      // Track when calendar first becomes visible/interactive
      if (!calendarViewTracked.current) {
        calendarViewTracked.current = true;
        analytics.bookingCalendarView();
      }
    })();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-6 md:p-10 mb-8"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow mb-4 inline-block">Let&apos;s Talk</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-3 leading-tight">
          Let&apos;s get started
        </h2>
        <p className="text-[var(--text-muted)] text-lg">
          Book a free 30-45 minute blueprint call. We&apos;ll audit your
          workflow and outline 1-3 automations that could save you serious time
          or unlock revenue.
        </p>
      </div>

      {/* Calendar Embed */}
      <motion.div
        className="max-w-4xl mx-auto bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!isMobile && (
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-[var(--text-dark)]">
              Book a time
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Same scheduler, no extra forms.
            </p>
          </div>
        )}

        {/* Cal.com embed */}
        <div
          className="w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-light)] bg-white"
          style={{
            minHeight: isMobile ? "420px" : "580px",
            maxHeight: isMobile ? "500px" : "700px"
          }}
        >
          {isMobile ? (
            <Cal
              namespace="30min"
              calLink="vladimir-ilin-dq2q4k/30min?hideEventTypeDetails=true"
              style={{
                width: "100%",
                height: "100%",
                minHeight: "420px",
                maxHeight: "500px"
              }}
              config={{
                layout: "month_view",
                theme: "light",
              }}
            />
          ) : (
            <Cal
              namespace="30min"
              calLink="vladimir-ilin-dq2q4k/30min"
              style={{ width: "100%", height: "100%", minHeight: "580px" }}
              config={{
                layout: "month_view",
                theme: "light",
              }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}
