"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react"
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
  const sectionRef = React.useRef<HTMLElement>(null)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const [projects, setProjects] = React.useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = React.useState(true)
  const { t } = useLanguage()

  React.useEffect(() => {
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

  React.useEffect(() => {
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

        <div ref={cardsRef} className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const dialogTitleId = `project-dialog-${project.id}`

  return (
    <>
      <Card className="soft-card group h-full overflow-hidden rounded-lg border-border bg-card py-0 shadow-none">
        <img
          src={project.image?.url || "/placeholder.svg"}
          alt={project.image?.alt || project.title}
          className="aspect-[16/10] w-full object-cover"
        />
        <CardContent className="flex min-h-20 items-center justify-between gap-4 p-5">
          <h3 className="line-clamp-2 text-base font-semibold">{project.title}</h3>
          <Button type="button" variant="ghost" size="sm" className="shrink-0" onClick={() => dialogRef.current?.showModal()}>
            Details <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/75"
      >
        <div className="flex items-start justify-between gap-6 p-6 pb-4 sm:p-8 sm:pb-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Project details</p>
            <h3 id={dialogTitleId} className="text-2xl font-bold">{project.title}</h3>
          </div>
          <button type="button" aria-label="Close project details" onClick={() => dialogRef.current?.close()} className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        {project.image?.url && <img src={project.image.url} alt={project.image.alt || project.title} className="max-h-80 w-full object-cover" />}
        <div className="space-y-6 p-6 sm:p-8">
          <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{project.description}</p>
          {project.technologies.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech.id} variant="outline" className="rounded-md">{tech.technologies}</Badge>
                ))}
              </div>
            </div>
          )}
          {(project.liveUrl && project.liveUrl !== "#" || project.githubUrl && project.githubUrl !== "#") && (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && project.liveUrl !== "#" && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live project <ExternalLink className="h-4 w-4" /></a>
                </Button>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <Github className="h-4 w-4" /></a>
                </Button>
              )}
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
