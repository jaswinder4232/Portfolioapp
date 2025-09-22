'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Aboutme from "./components/Aboutme"
import Projets from "./components/projets"
import WelcomeAnimation from "./components/WelcomeAnimation"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  const [open, setOpen] = useState(false)
  // const [showWelcome, setShowWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black bg-fixed  mx-auto " >
      {!showContent && (
        <WelcomeAnimation onComplete={() => setShowContent(true)} />
      )}

      {showContent && (
        <>
          <Navbar />
          <Hero />
          <Aboutme />
          <Projets />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}