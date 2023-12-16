import type { MetadataRoute } from 'next'

const ASGARDEX_URL = 'https://asgardex-landing.vercel.app' // Update with the final URL

export default function sitemap (): MetadataRoute.Sitemap {
  return [
    {
      url: ASGARDEX_URL + '/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: ASGARDEX_URL + '/installer',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]
}
