"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { gsap } from "gsap"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, socialRef.current], {
        opacity: 0,
        y: 50,
      })
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
      })
      gsap.set(scrollRef.current, {
        opacity: 0,
        y: 20,
      })

      // Create timeline
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )

      // Floating animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image (mobile first) */}
          <div className="flex justify-center lg:order-2 order-1 mb-4 lg:mb-0">
        <div
          ref={imageRef}
          className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
        >
          <img src="/yutaphoto.webp" alt="Profile" className="w-full h-full object-cover" />
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/30 rounded-full animate-pulse delay-1000" />
        </div>
          </div>

          {/* Content */}
          <div className="space-y-8 lg:order-1 order-2">
        <div className="space-y-4">
          <p className="text-l sm:text-xl text-muted-foreground max-w-2xl text-pretty font-bold md:text-left text-center">
            Web Developer
          </p>
          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance md:text-left text-center">
            Yuta Hamasaki
          </h1>
          <p ref={subtitleRef} className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty md:text-left text-center">
            {t.hero.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleScrollToWork}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Connect with me:</span>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hover:text-primary" onClick={() => window.open("https://github.com/yuta-hamasaki", "_blank")}>
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-primary" onClick={() => window.open("https://www.linkedin.com/in/yuta-hamasaki-623400215/", "_blank")}>
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-primary" onClick={() => window.location.href = "mailto:yutahamasaki.official@gmail.com"}>
          <Mail className="h-5 w-5" />
          <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hidden lg:flex"
        onClick={handleScrollToWork}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm">{t.hero.scrollToExplore}</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  )
}
