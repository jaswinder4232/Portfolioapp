"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const year = new Date().getFullYear();
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(footerRef.current.children, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-gradient-to-r from-black via-gray-900 to-black text-gray-300 py-12 mt-15">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                {/* About / Logo */}
                <div className="flex flex-col gap-4">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
                    >
                        Jaswinder
                    </Link>
                    <p className="text-gray-400">
                        A portfolio showcasing my projects, skills, and passion for web development.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                            GitHub
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                            LinkedIn
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                            Twitter
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-green-400">Contact</h3>
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-green-400" />
                        <span>Jaswindersingh4232@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-green-400" />
                        <span>+91 700-9530-021</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <span>Punjab, India</span>
                    </div>
                </div>

                {/* Quick Links / Contact Form Link */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-green-400">Quick Links</h3>
                    <nav className="flex flex-col gap-2">
                        <a href="#hero" className="hover:text-green-400 transition-colors">Home</a>
                        <a href="#about" className="hover:text-green-400 transition-colors">About</a>
                        <a href="#projects" className="hover:text-green-400 transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-green-400 transition-colors">Contact</a>
                    </nav>
                    <Button
                        variant="outline"
                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold hover:from-green-500 hover:to-emerald-600"
                        asChild
                    >
                        <a href="#contact">Send a Message</a>
                    </Button>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-12 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
                &copy; {year} MyPortfolio. All rights reserved.
            </div>
        </footer>
    );
}
