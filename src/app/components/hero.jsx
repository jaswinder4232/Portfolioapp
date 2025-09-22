"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import profileImage from "../../../public/profilepic.jpg";

export default function Home() {
    return (
        <section className="relative container mx-auto min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black bg-fixed px-6" id="hero">
            {/* Subtle background effect */}
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />

            <div className="relative w-full grid md:grid-cols-2 gap-10 items-center z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-left"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                        Hi, I’m <span className="text-green-400">Jaswinder Singh</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-4">
                        Frontend Developer &amp; UI/UX Enthusiast
                    </p>
                    <p className="text-gray-400 mt-3 max-w-lg text-sm sm:text-base md:text-lg">
                        I craft scalable web applications and design seamless digital
                        experiences that users love.
                    </p>

                    {/* Quick highlights */}
                    <div className="flex gap-6 mt-6 text-gray-300">
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
                        <Button
                            size="lg"
                            className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-5 rounded-xl text-sm sm:text-base md:text-lg"
                        >
                            View My Work
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-black border-gray-500 hover:bg-gray-800 text-sm sm:text-base md:text-lg"
                        >
                            Download Resume
                        </Button>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-4 mt-6 text-gray-400">
                        <a href="https://github.com/" target="_blank">
                            <Github className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition" />
                        </a>
                        <a href="https://linkedin.com/" target="_blank">
                            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition" />
                        </a>
                        <a href="mailto:your@email.com">
                            <Mail className="h-5 w-5 sm:h-6 sm:w-6 hover:text-green-400 transition" />
                        </a>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center"
                >
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.5)] border-4 border-green-500">
                        <Image
                            src={profileImage}
                            alt="Jaswinder Singh"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
