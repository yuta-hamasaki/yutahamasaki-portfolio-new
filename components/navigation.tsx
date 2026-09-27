"use client"

import { useEffect, useRef, useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { ArrowUpRight, Menu, X } from "lucide-react"

export function Navigation() {
  const progressRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const navItems = [
    { href: "#work", label: t.nav.work }, { href: "#about", label: t.nav.about },
    { href: "#tech", label: t.nav.tech }, { href: "#contact", label: t.nav.contact },
  ]

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    const observer = new ResizeObserver(onScroll)
    observer.observe(document.body)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div data-scrolled={scrolled || isOpen} className={`container-max rounded-lg px-4 transition-all duration-300 sm:px-6 ${scrolled || isOpen ? "border border-border bg-background/95 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="group flex items-center gap-2.5 font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">YH</span>
            <span>Yuta<span className="text-primary">.</span></span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(item => <a key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{item.label}</a>)}
            <LanguageSwitcher />
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85">Let’s talk <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <button type="button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="grid h-10 w-10 place-items-center rounded-md border bg-card text-foreground">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isOpen && <div className="border-t py-3 md:hidden">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted">{item.label}<ArrowUpRight className="h-4 w-4 text-primary" /></a>)}</div>}
      </div>
    </nav>
  )
}
