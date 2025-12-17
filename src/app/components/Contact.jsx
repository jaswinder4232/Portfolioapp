"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(formRef.current.children, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 20,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.2,
                ease: "power2.out"
            });
        }, formRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

        try {
            const res = await fetch(`${baseurl}/api/contact/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });


            const data = await res.json();

            if (!res.ok) {
                alert("Error: " + JSON.stringify(data));
                setLoading(false);
                return;
            }

            // Success
            setFormData({ name: "", email: "", subject: "", message: "" });
            setLoading(false);
            setSuccessOpen(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
            setLoading(false);
        }
    };

    return (
        <>
            {/* Contact Form */}
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col gap-4 px-lg-0 px-3 " id="contact"
            >
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
                    Contact Us
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-400 outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-400 outline-none"
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject (optional)"
                    value={formData.subject}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-400 outline-none"
                />

                <textarea
                    name="message"
                    placeholder="Message*"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-400 outline-none h-32 resize-none"
                />

                <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold hover:from-green-500 hover:to-emerald-600"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </form>

            {/* Success Modal using ShadCN Dialog */}
            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent className="bg-gray-900 text-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-green-400">
                            Message Sent!
                        </DialogTitle>
                        <DialogTitle className="text-gray-300">
                            Your message has been successfully sent. We will get back to you soon.
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            className="bg-green-400 text-black hover:bg-emerald-500"
                            onClick={() => setSuccessOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
