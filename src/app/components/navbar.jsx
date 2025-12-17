"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [activeSection, setActiveSection] = useState("#hero");
    const hideTimeout = useRef(null);
    const navRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        // Initial Animation
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(".nav-link",
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" }
            );
        }, navRef);

        const handleScroll = () => {
            const isDesktop = window.innerWidth >= 768;

            if (isDesktop) {
                setShowNavbar(true);

                // Clear previous timeout
                if (hideTimeout.current) clearTimeout(hideTimeout.current);

                // Hide navbar after 2 seconds of no scrolling
                hideTimeout.current = setTimeout(() => {
                    setShowNavbar(false);
                }, 2000);
            } else {
                // Always show on mobile
                setShowNavbar(true);
            }

            // Update active section
            const sections = navLinks.map((link) => document.querySelector(link.href));
            sections.forEach((section, index) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                if (rect.top <= 80 && rect.bottom > 80) {
                    setActiveSection(navLinks[index].href);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            ctx.revert();
        };
    }, []);

    return (
        <header
            ref={navRef}
            className={`fixed top-0 left-0 w-full border-b border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md z-50 transition-transform duration-500 shadow-lg
      ${showNavbar ? "translate-y-0" : "-translate-y-full md:-translate-y-full"}`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
                >
                    Jaswinder
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`nav-link relative text-sm font-medium transition-colors duration-300
                ${activeSection === link.href
                                    ? "text-green-400"
                                    : "text-gray-300 hover:text-green-300"
                                }`}
                        >
                            {link.label}
                            {activeSection === link.href && (
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-gray-300 hover:text-green-400"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[250px] bg-gradient-to-b from-black via-gray-900 to-black border-l border-gray-800 text-white"
                        
                    >
                        <nav className="mt-10 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={` px-3 text-lg font-medium transition-colors duration-300 ${activeSection === link.href
                                        ? "text-green-400"
                                        : "text-gray-400 hover:text-green-300"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
