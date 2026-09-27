"use client"

import { useEffect, useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { ArrowUpRight, Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const navItems = [
    { href: "#work", label: t.nav.work }, { href: "#about", label: t.nav.about },
    { href: "#tech", label: t.nav.tech }, { href: "#contact", label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className={`container-max rounded-2xl px-4 transition-all duration-300 sm:px-6 ${scrolled || isOpen ? "border border-white/70 bg-white/90 shadow-[0_12px_40px_rgba(20,70,42,.10)] backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="group flex items-center gap-2.5 font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm text-white shadow-[0_6px_16px_rgba(22,131,84,.25)] transition-transform group-hover:-rotate-6">YH</span>
            <span>Yuta<span className="text-primary">.</span></span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(item => <a key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{item.label}</a>)}
            <LanguageSwitcher />
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary">Let’s talk <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <button type="button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="grid h-10 w-10 place-items-center rounded-full border bg-white text-foreground">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isOpen && <div className="border-t py-3 md:hidden">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold hover:bg-muted">{item.label}<ArrowUpRight className="h-4 w-4 text-primary" /></a>)}</div>}
      </div>
    </nav>
  )
}
