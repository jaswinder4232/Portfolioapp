"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    return (
        <section className="relative min-h-[60vh] py-10 px-lg-0 px-3" id="projects">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center text-white"
            >
                Projects
            </motion.h2>

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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
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
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
