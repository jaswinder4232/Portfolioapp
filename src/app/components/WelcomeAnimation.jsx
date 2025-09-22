"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WelcomeAnimation({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete, // callback to show the rest of the page
        });

        tl.to(containerRef.current, {
            duration: 0,
            css: { visibility: "visible" },
        })
            .from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(textRef.current, {
                scale: 1.2,
                duration: 0.5,
                ease: "power1.inOut",
                repeat: 1,
                yoyo: true,
            })
            .to(textRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: "power2.in",
            });
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999] text-white"
            style={{ visibility: "hidden" }}
        >
            <h1
                ref={textRef}
                className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
            >
                Welcome to My Portfolio
            </h1>
        </div>
    );
}
