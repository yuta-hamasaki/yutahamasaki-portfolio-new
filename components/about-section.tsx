"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  getProfile, 
  getEducation, 
  // getExperience, 
  type Profile, 
  type Education, 
  // type Experience
} from "@/lib/microcms"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Fallback data
const fallbackProfile: Profile = {
  id: "1",
  name: "Frontend Developer",
  title: "Frontend Engineer & Designer",
  bio: "Data",
  profileImage: { url: "/placeholder.svg", alt: "Profile" },
  location: "New York, NY",
  email: "hello@example.com",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

const fallbackEducation: Education[] = [
  {
    id: "1",
    degree: "test",
    institution: "University of Technology",
    year: "2018-2022",
    description: "Specialized in Software Engineering and Web Development",
    achievements: [{
      id: "achievements" , 
      achievements: "Magna Cum Laude"
    },
    {id: "achievements",achievements: "Dean's List"
    }],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
]

// const fallbackExperience: Experience[] = [
//   {
//     id: "1",
//     role: "Senior Frontend Developer",
//     company: "Tech Solutions Inc.",
//     period: "2023 - Present",
//     location: "Remote",
//     description:
//       "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern development practices.",
//     highlights: ["Led team of 5 developers", "Improved performance by 40%", "Implemented design system"],
//     current: true,
//     createdAt: "2024-01-01",
//     updatedAt: "2024-01-01",
//   },
// ]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)

  const [profile, setProfile] = useState<Profile>(fallbackProfile)
  const [education, setEducation] = useState<Education[]>(fallbackEducation)
  // const [experience, setExperience] = useState<Experience[]>(fallbackExperience)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileData, 
          educationData, 
          // experienceData
        ] = await Promise.all([
          getProfile(),
          getEducation(),
          // getExperience(),
        ])

        if (profileData) setProfile(profileData)
        if (educationData.length > 0) setEducation(educationData)
        // if (experienceData.length > 0) setExperience(experienceData)
      } catch (error) {
        console.error("Failed to fetch about data, using fallback:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (loading) return

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

      // Animate content sections
      const sections = [contentRef.current, educationRef.current, experienceRef.current]
      sections.forEach((section, index) => {
        if (section) {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [loading])



  if (loading) {
    return (
      <section id="about" className="py-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mx-auto mb-4" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <p className="text-xl sm:text-xl font-bold mb-1">私について</p>
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Story */}
          <div ref={contentRef} className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6">
                <Image 
                src={profile.profileImage.url} 
                alt="{profile.profileImage.alt}"
                width={150}
                height={150}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-[14px] text-center font-semibold">Yuta Hamasaki</h3>
                <h3 className="text-[14px] text-center font-semibold mb-4">濱﨑雄太</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>{profile.bio}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Based in {profile.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education */}
          <div ref={educationRef} className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[14px]">{edu.degree}</h4>
                      <Badge variant="outline" className="text-xs">
                        {edu.year}
                      </Badge>
                    </div>
                    <p className="text-green-700 font-bold text-[18px] mb-2">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mb-3">{edu.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.achievements.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {item.achievements}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience */}
          {/* <div ref={experienceRef} className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{exp.role}</h4>
                      <Badge variant="outline" className="text-xs">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                    <div className="space-y-1">
                      {exp.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
