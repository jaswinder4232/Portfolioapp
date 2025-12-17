"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Next.js", level: 90 },
    { name: "React", level: 85 },
    { name: "TailwindCSS", level: 80 },
    { name: "ShadcnUI", level: 95 },
    { name: "JavaScript", level: 78 },
    { name: "Bootstrap", level: 99 },
];

export default function AboutMe() {
    const containerRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);
    const headingRef = useRef(null);
    const underlineRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax on subtle grid background
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    y: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Animate heading words
            if (headingRef.current) {
                const words = gsap.utils.toArray(headingRef.current.children);
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                });

                // Underline reveal
                if (underlineRef.current) {
                    gsap.fromTo(
                        underlineRef.current,
                        { scaleX: 0, transformOrigin: "left center" },
                        {
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                            scaleX: 1,
                            duration: 0.8,
                            ease: "power2.out",
                        }
                    );
                }
            }
            // Animate Left Column
            gsap.from(leftColRef.current, {
                scrollTrigger: {
                    trigger: leftColRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animate Right Column (Skills container)
            gsap.from(rightColRef.current, {
                scrollTrigger: {
                    trigger: rightColRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animate individual skill bars
            const bars = gsap.utils.toArray(".skill-bar-fill");
            bars.forEach((bar) => {
                const level = bar.getAttribute("data-level");
                gsap.fromTo(bar,
                    { width: "0%" },
                    {
                        width: `${level}%`,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );

                // Animate numeric counter next to skill name
                const labelContainer = bar.parentElement?.previousElementSibling;
                const levelEl = labelContainer?.querySelector('.skill-level');
                if (levelEl) {
                    const target = parseInt(levelEl.getAttribute('data-level') || '0', 10);
                    const counter = { value: 0 };
                    gsap.to(counter, {
                        value: target,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: () => {
                            levelEl.textContent = `${Math.round(counter.value)}%`;
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative container mx-auto min-h-[56vh] flex items-center justify-center px-lg-0 px-3 overflow-hidden" id="about">
            {/* grid overlay */}
            <div ref={bgRef} className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative z-10  w-full mx-auto text-white flex flex-col lg:flex-row gap-12">
                {/* Left Column: About Me */}
                <div
                    ref={leftColRef}
                    className="lg:w-1/2"
                >
                    <h2 ref={headingRef} className="text-4xl font-bold mb-2 flex gap-2">
                        <span className="inline-block">About</span>
                        <span className="inline-block text-green-400">Me</span>
                    </h2>
                    <div ref={underlineRef} className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4" />
                    <p className="text-gray-300 text-lg">
                        Hi, I’m <span className="text-green-400 font-semibold">Jaswinder singh</span>,
                        a passionate front-end developer who loves crafting beautiful,
                        responsive, and performant web applications. I enjoy working with modern
                        web technologies and building projects that make an impact.
                    </p>
                </div>

                {/* Right Column: Skills */}
                <div
                    ref={rightColRef}
                    className="lg:w-1/2 grid grid-cols-1 gap-6"
                >
                    {skills.map((skill, i) => (
                        <SkillBar key={i} name={skill.name} level={skill.level} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillBar({ name, level }) {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{name}</span>
                <span className="skill-level text-sm text-gray-400" data-level={level}>0%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                    className="skill-bar-fill h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg"
                    data-level={level}
                    style={{ width: 0 }} // Initial state for JS animation, though GSAP handles it
                />
            </div>
        </div>
    );
}
