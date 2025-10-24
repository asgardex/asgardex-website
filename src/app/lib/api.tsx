import type { ItemConfig } from '../ui/Selector'

interface Release {
  id: number
  html_url: string
  tag_name: string
  created_at: string
  body: string
  assets: Array<{ browser_download_url: string }>
}

/*
RELEASE NOTES STANDARD:
- First line: # ASGARDEX v{version} 🚀
- Second section: Brief description paragraph (this is what we extract)
- Third section: ## What's Changed (bullet points)
- Footer: Full changelog link and signatures

Expected format:
# ASGARDEX v1.41.0 🚀

Brief description of the main features/improvements in this release.

## What's Changed
* feature 1
* feature 2
*/
function cleanDescription(text: string): string {
  return text
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links to text
    .replace(/<[^>]*>/g, '') // Remove HTML
    .replace(/🚀/g, '') // Remove emojis
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

function extractReleaseSummary(body: string): string {
  const fallback = 'Latest release with new features and improvements'

  if (!body || body.length < 50) return fallback

  try {
    // Method 1: Regex-based extraction (more reliable)
    const contentMatch = body.match(/^#\s*ASGARDEX[^\n]*\n\s*(.*?)\s*(?=##?\s*What's Changed|$)/i)

    if (contentMatch?.[1]) {
      const cleaned = cleanDescription(contentMatch[1].trim())
      if (cleaned.length > 20 && cleaned.length < 300) {
        return cleaned
      }
    }

    // Method 2: Section-based fallback
    const sections = body.split(/^##?\s+/m)
    const introSection = sections.find(section =>
      !section.match(/^(What's Changed|New Contributors|Full Changelog)/i) &&
      section.length > 50
    )

    if (introSection) {
      const paragraphs = introSection
        .replace(/^#\s*ASGARDEX[^\n]*\n?/i, '')
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p && p.length > 20)

      if (paragraphs[0]) {
        const cleaned = cleanDescription(paragraphs[0])
        if (cleaned.length > 20 && cleaned.length < 300) {
          return cleaned
        }
      }
    }

    // Method 3: Line-by-line fallback (original approach as backup)
    const lines = body.split(/\r?\n/).map(line => line.trim()).filter(line => line)
    let descriptionStart = -1

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.match(/^#\s*ASGARDEX/i)) continue
      if (!line || line.startsWith('<img') || line.startsWith('![')) continue
      if (line.match(/^#{1,6}\s*(What's Changed|New Contributors|Full Changelog)/i)) break

      if (line.length > 20) {
        descriptionStart = i
        break
      }
    }

    if (descriptionStart >= 0) {
      return cleanDescription(lines[descriptionStart])
    }

    return fallback
  } catch (error) {
    console.warn('Failed to extract release summary:', error)
    return fallback
  }
}

// Dynamically import releases to reduce initial bundle size
async function loadReleases(): Promise<Release[]> {
  try {
    const releasesModule = await import('../../releases.json')
    return releasesModule.default as Release[]
  } catch (error) {
    console.error('Failed to load releases:', error)
    return []
  }
}

const buildReleaseItem = (releaseItem: Release) => {
  const baseTitle = releaseItem.tag_name || 'Unknown'
  const defaultAsset = { browser_download_url: releaseItem.html_url, title: baseTitle }

  const linuxAsset = releaseItem.assets.find((asset) =>
    asset.browser_download_url.endsWith('.AppImage')
  ) || defaultAsset
  const macAssetSon = releaseItem.assets.find((asset) =>
    asset.browser_download_url.includes('Sonoma') &&
    asset.browser_download_url.endsWith('.dmg')
  ) || defaultAsset
  const macAssetVent = releaseItem.assets.find((asset) =>
    asset.browser_download_url.includes('Ventura') &&
    asset.browser_download_url.endsWith('.dmg')
  ) || defaultAsset
  const macAssetSequ = releaseItem.assets.find((asset) =>
    asset.browser_download_url.includes('Sequoia') &&
    asset.browser_download_url.endsWith('.dmg')
  ) || defaultAsset
  const windowsAsset = releaseItem.assets.find((asset) =>
    asset.browser_download_url.endsWith('.exe')
  ) || defaultAsset

  return {
    tag_name: baseTitle,
    html_url: releaseItem.html_url,
    body: releaseItem.body,
    summary: extractReleaseSummary(releaseItem.body),
    linux: {
      title: baseTitle,
      url: linuxAsset.browser_download_url
    },
    macSon: {
      title: `Sonoma - ${baseTitle}`,
      url: macAssetSon.browser_download_url
    },
    macVent: {
      title: `Ventura - ${baseTitle}`,
      url: macAssetVent.browser_download_url
    },
    macSequ: {
      title: `Sequoia - ${baseTitle}`,
      url: macAssetSequ.browser_download_url
    },
    windows: {
      title: baseTitle,
      url: windowsAsset.browser_download_url
    }
  }
}

export async function getAsgardexReleases() {
  try {
    const releases = await loadReleases()
    if (!releases.length) throw new Error('No releases found')

    const latest = buildReleaseItem(releases[0])
    const previous = releases.slice(1, 11).map((item) => buildReleaseItem(item)) // Limit to 10 previous releases

    return {
      latest,
      previous: {
        linux: previous.map((prev: any) => prev.linux) as ItemConfig[],
        macSon: previous.map((prev: any) => prev.macSon) as ItemConfig[],
        macVent: previous.map((prev: any) => prev.macVent) as ItemConfig[],
        macSequ: previous.map((prev: any) => prev.macSequ) as ItemConfig[],
        windows: previous.map((prev: any) => prev.windows) as ItemConfig[]
      }
    }
  } catch {
    return {
      latest: {
        tag_name: '',
        html_url: 'https://github.com/asgardex/asgardex-desktop/releases/latest',
        body: '',
        summary: 'Latest features and improvements',
        linux: { title: '', url: '' },
        macSon: { title: '', url: '' },
        macVent: { title: '', url: '' },
        macSequ: { title: '', url: '' },
        windows: { title: '', url: '' }
      },
      previous: null
    }
  }
}
