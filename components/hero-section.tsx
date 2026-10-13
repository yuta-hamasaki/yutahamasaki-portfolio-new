"use client"

import * as React from "react"
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { gsap } from "gsap"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const root = React.useRef<HTMLElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const portrait = React.useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(content.current?.children || [], { opacity: 0, y: 28, duration: .8, stagger: .12, ease: "power3.out" })
      gsap.from(portrait.current, { opacity: 0, scale: .92, rotate: 3, duration: 1.1, ease: "back.out(1.4)", delay: .2 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={root} className="relative min-h-[760px] overflow-hidden pt-28 sm:min-h-screen sm:pt-32">
      <div className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="absolute -left-28 top-28 h-80 w-80 rounded-full bg-secondary/35 blur-3xl" />
      <div className="container-max section-padding relative grid min-h-[calc(100vh-8rem)] items-center gap-14 pb-20 lg:grid-cols-[1.08fr_.92fr]">
        <div ref={content} className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          <h1 className="text-[clamp(3.2rem,8vw,7.4rem)] font-black leading-[.88] tracking-[-.07em] text-foreground">YUTA<br /><span className="gradient-text">HAMASAKI</span><span className="text-accent">.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#work" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-7 font-bold text-primary-foreground shadow-[0_12px_30px_rgba(182,255,0,.12)] transition hover:-translate-y-1 hover:bg-secondary">{t.hero.viewWork}<ArrowUpRight className="h-5 w-5" /></a>
            <a href="#contact" className="inline-flex h-13 items-center justify-center rounded-full border border-foreground/15 bg-card/70 px-7 font-bold transition hover:border-primary hover:text-primary">{t.hero.getInTouch}</a>
          </div>
          <div className="mt-9 flex items-center justify-center gap-3 lg:justify-start">
            <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Connect</span>
            {[{ href:"https://github.com/yuta-hamasaki", label:"GitHub", icon:Github },{ href:"https://www.linkedin.com/in/yuta-hamasaki-623400215/", label:"LinkedIn", icon:Linkedin },{ href:"mailto:yutahamasaki.official@gmail.com", label:"Email", icon:Mail }].map(({href,label,icon:Icon}) => <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border bg-white text-foreground shadow-sm transition hover:-translate-y-1 hover:border-primary hover:text-primary"><Icon className="h-4.5 w-4.5" /></a>)}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div ref={portrait} className="relative w-full max-w-[430px]">
            <div className="absolute -inset-3 rotate-3 rounded-[3rem] bg-secondary/90" />
            <div className="absolute -inset-3 -rotate-3 rounded-[3rem] border-2 border-primary/30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.6rem] bg-[#171b14] shadow-[0_30px_80px_rgba(0,0,0,.45)]">
              <img src="/yutaphoto.webp" alt="Yuta Hamasaki" className="h-full w-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
      <a href="#work" aria-label="Scroll to projects" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted-foreground lg:flex">SCROLL<ArrowDown className="h-4 w-4 animate-bounce" /></a>
    </section>
  )
}
