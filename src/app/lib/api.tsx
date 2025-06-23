import releases from '../../releases.json'
import type { ItemConfig } from '../ui/Selector'

interface Release {
  id: number
  html_url: string
  tag_name: string
  created_at: string
  assets: Array<{ browser_download_url: string }>
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

export function getAsgardexReleases() {
  try {
    if (!releases.length) throw new Error('No releases found')

    const latest = buildReleaseItem(releases[0] as Release)
    const previous = releases.slice(1).map((item: Release) => buildReleaseItem(item))

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
