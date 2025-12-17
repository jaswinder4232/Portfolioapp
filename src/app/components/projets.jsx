"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Project One",
        description: "A responsive e-commerce website built with Next.js and TailwindCSS.",
        image: "/projects/project1.png",
        liveLink: "https://projectone.com",
    },
    {
        title: "Project Two",
        description: "Portfolio website showcasing modern web design and animations.",
        image: "/projects/project2.png",
        liveLink: "https://projecttwo.com",
    },
    {
        title: "Project Three",
        description: "A real-time chat application using React and Node.js.",
        image: "/projects/project3.png",
        liveLink: "https://projectthree.com",
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(swiperRef.current, {
                scrollTrigger: {
                    trigger: swiperRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power1.out" });
    };

    const handleMouseLeave = (e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power1.out" });
    };

    return (
        <section ref={sectionRef} className="relative min-h-[60vh] py-10 px-lg-0 px-3" id="projects">
            <h2
                ref={titleRef}
                className="text-4xl font-bold mb-12 text-center text-white"
            >
                Projects
            </h2>

            <div ref={swiperRef}>
                <Swiper
                    modules={[]} // ✅ leave empty or include strings like ["Navigation", "Pagination"] if needed
                    navigation={true} // just enable navigation, no import required
                    pagination={{ clickable: true }} // enable pagination
                    autoplay={{ delay: 4000, disableOnInteraction: false }} // works without import
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="max-w-6xl mx-auto"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform-gpu"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-300 text-sm">{project.description}</p>
                                    </div>
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block text-green-400 font-semibold hover:underline"
                                    >
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
