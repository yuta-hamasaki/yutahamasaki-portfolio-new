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
    icon: "🎨",
    technologies: [
      { name: "React", level: 75, color: "bg-blue-500" },
      { name: "Next.js", level: 75, color: "bg-gray-800" },
      { name: "Astro", level: 65, color: "bg-red-500" },
      { name: "TypeScript", level: 65, color: "bg-yellow-500" },
      { name: "Javascript", level: 65, color: "bg-green-500" },
    ],
  },
  {
    category: "Backend & Database",
    icon: "⚡",
    technologies: [
      { name: "Node.js", level: 70, color: "bg-green-600" },
      { name: "Express.js", level: 70, color: "bg-red-500" },
      { name: "MongoDB", level: 75, color: "bg-green-700" },
      { name: "PostgreSQL", level: 70, color: "bg-blue-800" },
      { name: "Supabase", level: 78, color: "bg-green-500" },
      { name: "Firebase", level: 70, color: "bg-yellow-600" },
      { name: "MicroCMS", level: 88, color: "bg-blue-500" },
    ],
  },
  {
    category: "Styling",
    icon: "💅",
    technologies: [
      { name: "Tailwind CSS", level: 85, color: "bg-cyan-500" },
      { name: "SCSS/Sass", level: 85, color: "bg-pink-500" },
      { name: "CSS3", level: 85, color: "bg-blue-400" },
      { name: "StoryBook", level: 40, color: "bg-blue-700" },
      { name: "GSAP", level: 40, color: "bg-red-700" },
    ],
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    technologies: [
      { name: "Git", level: 70, color: "bg-orange-500" },
      { name: "Vite", level: 75, color: "bg-purple-500" },
      { name: "Jest", level: 20, color: "bg-red-400" },
      { name: "Figma", level: 50, color: "bg-purple-600" },
    ],
  },

]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate category cards
      const cards = categoriesRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 80%",
            },
          },
        )
      }

      // Animate progress bars
      const progressBars = document.querySelectorAll(".progress-bar")
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
              start: "top 90%",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="tech" ref={sectionRef} className="section-shell bg-[#153c28] text-white">
      <div className="container-max section-padding">
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-secondary">My toolkit</p>
          <h2 ref={titleRef} className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">
            Tech <span className="text-secondary">Stack</span>
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
    <Card className="overflow-hidden rounded-[1.75rem] border-white/10 bg-white/8 text-white shadow-none backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{category.icon}</span>
          <h3 className="text-xl font-semibold">{category.category}</h3>
        </div>
        <div className="space-y-4">
          {category.technologies.map((tech) => (
            <div key={tech.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{tech.name}</span>
                <span className="text-sm text-white/55">{tech.level}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`progress-bar h-full ${tech.color} rounded-full transition-all duration-300`}
                  data-width={tech.level}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
