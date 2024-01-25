import type { ItemConfig } from '../ui/Selector'

export interface Release {
  id: number
  html_url: string
  tag_name: string
  created_at: string
  assets: any[]
  linux: any
  windows: any
  mac: any

}

const buildReleaseItem = (releaseItem: Release) => {
  const title = releaseItem.tag_name
  const linuxAsset = releaseItem.assets.find((asset: any) => { return asset.browser_download_url.endsWith('.AppImage') })
  const macAsset = releaseItem.assets.find((asset: any) => { return asset.browser_download_url.endsWith('.dmg') })
  const windowsAsset = releaseItem.assets.find((asset: any) => { return asset.browser_download_url.endsWith('.exe') })

  return {
    tag_name: title,
    html_url: releaseItem.html_url,
    linux: {
      title,
      url: linuxAsset.browser_download_url
    },
    mac: {
      title,
      url: macAsset.browser_download_url
    },
    windows: {
      title,
      url: windowsAsset.browser_download_url
    }
  }
}

export async function getAsgardexReleases () {
  try {
    const cacheBuster = new Date().getTime()
    const res = await fetch(`https://api.github.com/repos/asgardex/asgardex-desktop/releases?nocache=${cacheBuster}`)
    const releases = await res.json()
    const latest = buildReleaseItem(releases.shift() as Release)
    const previous = releases.map((item: Release) => buildReleaseItem(item))
    return {
      latest,
      previous:
      {
        linux: previous.map((prev: Release) => prev.linux) as ItemConfig[],
        mac: previous.map((prev: Release) => prev.mac) as ItemConfig[],
        windows: previous.map((prev: Release) => prev.windows) as ItemConfig[]
      }
    }
  } catch {
    return { latest: { tag_name: null, html_url: 'https://github.com/asgardex/asgardex-desktop/releases/latest' }, previous: null }
  }
}
