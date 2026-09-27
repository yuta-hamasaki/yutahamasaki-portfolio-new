"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/contexts/language-context"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const techCategories = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 75 },
      { name: "Next.js", level: 75 },
      { name: "Astro", level: 65 },
      { name: "TypeScript", level: 65 },
      { name: "Javascript", level: 65 },
    ],
  },
  {
    category: "Backend & Database",
    technologies: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 70 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Supabase", level: 78 },
      { name: "Firebase", level: 70 },
      { name: "MicroCMS", level: 88 },
    ],
  },
  {
    category: "Styling",
    technologies: [
      { name: "Tailwind CSS", level: 85 },
      { name: "SCSS/Sass", level: 85 },
      { name: "CSS3", level: 85 },
      { name: "StoryBook", level: 40 },
      { name: "GSAP", level: 40 },
    ],
  },
  {
    category: "Tools & Others",
    technologies: [
      { name: "Git", level: 70 },
      { name: "Vite", level: 75 },
      { name: "Jest", level: 20 },
      { name: "Figma", level: 50 },
    ],
  },

]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const motion = gsap.matchMedia()
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 92%",
            once: true,
          },
        },
      )

      // Animate category cards
      const cards = categoriesRef.current?.children
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(card, { opacity: 0, y: 24 }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 2) * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          })
        })
      }

      // Animate progress bars
      const progressBars = sectionRef.current?.querySelectorAll(".progress-bar") ?? []
      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${width}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 92%",
              once: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => motion.revert()
  }, [])

  return (
    <section id="tech" ref={sectionRef} className="section-shell border-y border-border bg-background text-foreground">
      <div className="container-max section-padding">
        <div className="mb-14 text-center sm:mb-16">
          <p className="eyebrow">My toolkit</p>
          <h2 ref={titleRef} className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/65 text-balance">
            {t.tech.subtitle}
          </p>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category) => (
            <TechCategory key={category.category} category={category} />
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Responsive Design",
              "Performance Optimization",
              "API Integration",
              "AI APIs",
              "Jamstack",
              "Communication"
            ].map((skill) => (
              <Badge key={skill} variant="outline" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TechCategory({ category }: { category: (typeof techCategories)[0] }) {
  return (
    <Card className="overflow-hidden rounded-lg border-border bg-card text-foreground shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-semibold">{category.category}</h3>
        </div>
        <div className="space-y-4">
          {category.technologies.map((tech) => (
            <div key={tech.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{tech.name}</span>
                <span className="text-sm text-white/55">{tech.level}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden bg-white/10">
                <div
                  className="progress-bar h-full bg-primary"
                  data-width={tech.level}
                  style={{ width: `${tech.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
