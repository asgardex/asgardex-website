import type { MetadataRoute } from 'next'

const ASGARDEX_URL = 'https://asgardex.com'

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
