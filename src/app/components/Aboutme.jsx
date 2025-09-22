"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
    { name: "Next.js", level: 90 },
    { name: "React", level: 85 },
    { name: "TailwindCSS", level: 80 },
    { name: "ShadcnUI", level: 95 },
    { name: "JavaScript", level: 78 },
    { name: "Bootstrap", level: 99 },
];

export default function AboutMe() {
    return (
        <section className="relative container mx-auto min-h-[56vh] flex items-center justify-center px-lg-0 px-3 overflow-hidden" id="about">
            {/* grid overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative z-10  w-full mx-auto text-white flex flex-col lg:flex-row gap-12">
                {/* Left Column: About Me */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2"
                >
                    <h2 className="text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-gray-300 text-lg">
                        Hi, I’m <span className="text-green-400 font-semibold">Jaswinder singh</span>,
                        a passionate front-end developer who loves crafting beautiful,
                        responsive, and performant web applications. I enjoy working with modern
                        web technologies and building projects that make an impact.
                    </p>
                </motion.div>

                {/* Right Column: Skills */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 grid grid-cols-1 gap-6"
                >
                    {skills.map((skill, i) => (
                        <SkillBar key={i} name={skill.name} level={skill.level} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function SkillBar({ name, level }) {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div ref={ref} className="flex flex-col">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-sm text-gray-400">{level}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${level}%` : "0%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg"
                />
            </div>
        </div>
    );
}
