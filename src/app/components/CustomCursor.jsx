"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const handleMouseEnter = () => {
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll("a, button, .interactive");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-green-400 rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-green-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
        </>
    );
}
