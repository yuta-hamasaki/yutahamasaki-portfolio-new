import { createClient } from "microcms-js-sdk"


// if (!process.env.MICROCMS_SERVICE_DOMAIN) {
//   throw new Error("MICROCMS_SERVICE_DOMAIN is required")
// }

// if (!process.env.MICROCMS_API_KEY) {
//   throw new Error("MICROCMS_API_KEY is required")
// }

// Create MicroCMS client
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN! || "yutahamasaki",
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
})



// Type definitions for MicroCMS content
export interface Project {
  id: string
  title: string
  description: string
  image: {
    url: string
    alt?: string
  }
  technologies: {
    id: string
    technologies: string
  }[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  thumbnail: {
    url: string
    alt?: string
  }
  tags: string[]
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  profileImage: {
    url: string
    alt?: string
  }
  location: string
  email: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  createdAt: string
  updatedAt: string
}

// export interface Experience {
//   id: string
//   role: string
//   company: string
//   period: string
//   location: string
//   description: string
//   highlights: string[]
//   current: boolean
//   createdAt: string
//   updatedAt: string
// }

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  description: string
  achievements: {
    id: string
    achievements: string
  }[]
  createdAt: string
  updatedAt: string
}

// API functions
export const getProjects = async (limit?: number): Promise<Project[]> => {
  try {
    const response = await client.get({
      endpoint: "projects",
      queries: {
        limit: limit || 100,
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const response = await client.get({
      endpoint: "projects",
      queries: {
        filters: "featured[equals]true",
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const response = await client.get({
      endpoint: "profile",
    })

    return response
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

// export const getExperience = async (): Promise<Experience[]> => {
//   try {
//     const response = await client.get({
//       endpoint: "experience",
//       queries: {
//         orders: "-createdAt",
//       },
//     })
//     return response.contents
//   } catch (error) {
//     console.error("Error fetching experience:", error)
//     return []
//   }
// }

export const getEducation = async (): Promise<Education[]> => {
  try {
    const response = await client.get({
      endpoint: "education",
      queries: {
        orders: "-createdAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching education:", error)
    return []
  }
}

export const getBlogPosts = async (limit?: number): Promise<BlogPost[]> => {
  try {
    const response = await client.get({
      endpoint: "blog",
      queries: {
        limit: limit || 10,
        orders: "-publishedAt",
      },
    })
    return response.contents
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}
