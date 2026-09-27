"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getProjects, type Project } from "@/lib/microcms"
import { useLanguage } from "@/contexts/language-context"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Fallback projects for when MicroCMS is not available
const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A modern, responsive e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, user authentication, and payment processing.",
    image: { url: "/modern-ecommerce-interface.png", alt: "E-Commerce Platform" },
    technologies: [
      {id:"technologies", technologies:"Next.js"}, 
    ],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  }

]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects(6)
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects)
        }
      } catch (error) {
        console.error("Failed to fetch projects, using fallback data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (loading) return

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

      // Animate project cards
      const cards = cardsRef.current?.children
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
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => motion.revert()
  }, [loading])

  if (loading) {
    return (
      <section id="work" className="section-shell bg-muted/45">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-full max-w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="work" ref={sectionRef} className="section-shell relative overflow-hidden bg-muted/45">
      <div className="container-max section-padding">
        <div className="mb-14 text-center sm:mb-16">
          <p className="eyebrow">Selected work</p>
          <h2 ref={titleRef} className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t.work.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={`soft-card project-card group overflow-hidden rounded-lg transition-colors duration-300 hover:border-primary/40 ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image?.url || "/placeholder.svg"}
          alt={project.image?.alt || project.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View live project</span>
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">View source code</span>
              </a>
            </Button>
          )}
        </div>
        {project.featured && (
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">Featured</Badge>
        )}
      </div>

      <CardContent className="p-7">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech.technologies}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
