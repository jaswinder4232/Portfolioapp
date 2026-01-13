"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import profileImage from "../../../public/profilepic.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { event } from "@/lib/ga";

export default function Home() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Text Animations
            tl.from(".hero-text-element", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            })
                // Image Animation
                .from(imageRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    rotation: -10,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.5");

            // Interactive Parallax Effect on Image
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const x = (clientX - window.innerWidth / 2) / 20;
                const y = (clientY - window.innerHeight / 2) / 20;

                gsap.to(imageRef.current, {
                    x: x,
                    y: y,
                    duration: 0.5,
                    ease: "power1.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative container mx-auto min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black bg-fixed px-6" id="hero">
            {/* Subtle background effect */}
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />

            <div className="relative w-full grid md:grid-cols-2 gap-10 items-center z-10">
                {/* Left Content */}
                <div
                    ref={textRef}
                    className="text-left"
                >
                    <h1 className="hero-text-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                        Hi, I’m <span className="text-green-400">Jaswinder Singh</span>
                    </h1>
                    <p className="hero-text-element text-gray-300 text-lg sm:text-xl md:text-2xl mt-4">
                        Frontend Developer &amp; UI/UX Enthusiast
                    </p>
                    <p className="hero-text-element text-gray-400 mt-3 max-w-lg text-sm sm:text-base md:text-lg">
                        I craft scalable web applications and design seamless digital
                        experiences that users love.
                    </p>

                    {/* Quick highlights */}
                    <div className="hero-text-element flex gap-6 mt-6 text-gray-300">
                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">1+</h3>
                            <p className="text-xs sm:text-sm">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">10+</h3>
                            <p className="text-xs sm:text-sm">Projects Completed</p>
                        </div>
                        {/* <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">10+</h3>
                            <p className="text-xs sm:text-sm">Happy Clients</p>
                        </div> */}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Button onClick={() => event({ action: "click", category: "view-my-work", label: "view-my-work" })}
                            size="lg"
                            className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-5 rounded-xl text-sm sm:text-base md:text-lg hover:scale-105 transition-transform"
                        >
                            View My Work
                        </Button>
                        <Button onClick={() => event({ action: "click", category: "download-resume", label: "download-resume" })}
                            size="lg"
                            variant="outline"
                            className="text-black border-gray-500 hover:bg-gray-800 text-sm sm:text-base md:text-lg hover:scale-105 transition-transform"
                        >
                            Download Resume
                        </Button>
                    </div>

                    {/* Social links */}
                    <div className="hero-text-element flex gap-4 mt-6 text-gray-400">
                        <a href="https://github.com/" target="_blank">
                            <Github className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition hover:scale-110" />
                        </a>
                        <a href="https://linkedin.com/" target="_blank">
                            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition hover:scale-110" />
                        </a>
                        <a href="mailto:your@email.com">
                            <Mail className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition hover:scale-110" />
                        </a>
                    </div>
                </div >

                {/* Right Image */}
                < div
                    className="flex justify-center"
                >
                    <div ref={imageRef} className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.5)] border-4 border-green-500">
                        <Image
                            src={profileImage}
                            alt="Jaswinder Singh"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div >
            </div >
        </section >
    );
}
