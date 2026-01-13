"use client";

import { useEffect } from "react";
import { event } from "@/lib/ga";

export default function ScrollTracker() {
    useEffect(() => {
        let lastSent = 0;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const scrollPercent = Math.round(
                ((scrollTop + windowHeight) / docHeight) * 100
            );

            // Fire event at 25%, 50%, 75%, 100%
            if (
                scrollPercent >= 25 &&
                scrollPercent >= lastSent + 25
            ) {
                lastSent = scrollPercent;

                event({
                    action: "scroll_depth",
                    category: "engagement",
                    label: `${Math.min(scrollPercent, 100)}%`,
                    value: Math.min(scrollPercent, 100),
                });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
}
