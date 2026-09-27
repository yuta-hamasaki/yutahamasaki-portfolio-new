"use client"

import { useEffect, useRef } from "react"
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { gsap } from "gsap"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const root = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const portrait = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const motion = gsap.matchMedia()
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(content.current?.children || [], { opacity: 0, y: 28, duration: .8, stagger: .12, ease: "power3.out" })
      gsap.from(portrait.current, { opacity: 0, y: 16, duration: 0.7, ease: "power2.out", delay: .2 })
    }, root)
    return () => motion.revert()
  }, [])

  return (
    <section id="hero" ref={root} className="relative min-h-[760px] overflow-hidden pt-28 sm:min-h-screen sm:pt-32">
      <div className="container-max section-padding relative grid min-h-[calc(100vh-8rem)] items-center gap-14 pb-20 lg:grid-cols-[1.08fr_.92fr]">
        <div ref={content} className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          <div className="eyebrow"><span className="h-2 w-2 rounded-full bg-primary" />Available for new opportunities</div>
          <h1 className="text-[clamp(3.2rem,8vw,7.4rem)] font-black leading-[.88] tracking-[-.07em] text-foreground">YUTA<br /><span className="gradient-text">HAMASAKI</span><span className="text-accent">.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#work" className="inline-flex h-13 items-center justify-center gap-2 rounded-md bg-primary px-7 font-bold text-primary-foreground transition hover:bg-primary/85">{t.hero.viewWork}<ArrowUpRight className="h-5 w-5" /></a>
            <a href="#contact" className="inline-flex h-13 items-center justify-center rounded-md border border-foreground/15 bg-card px-7 font-bold transition hover:border-primary hover:text-primary">{t.hero.getInTouch}</a>
          </div>
          <div className="mt-9 flex items-center justify-center gap-3 lg:justify-start">
            <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</span>
            {[{ href:"https://github.com/yuta-hamasaki", label:"GitHub", icon:Github },{ href:"https://www.linkedin.com/in/yuta-hamasaki-623400215/", label:"LinkedIn", icon:Linkedin },{ href:"mailto:yutahamasaki.official@gmail.com", label:"Email", icon:Mail }].map(({href,label,icon:Icon}) => <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-md border bg-card text-foreground transition hover:border-primary hover:text-primary"><Icon className="h-4.5 w-4.5" /></a>)}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div ref={portrait} className="relative w-full max-w-[430px]">
            <div className="hero-portrait relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-card">
              <img src="/yutaphoto.webp" alt="Yuta Hamasaki" className="h-full w-full object-cover object-center" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-lg border border-border bg-card px-5 py-4 text-foreground sm:-right-8"><div className="text-2xl font-black text-primary">Web</div><div className="text-xs text-white/65">Developer / Designer</div></div>
          </div>
        </div>
      </div>
      <a href="#work" aria-label="Scroll to projects" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted-foreground lg:flex">SCROLL<ArrowDown className="h-4 w-4" /></a>
    </section>
  )
}
