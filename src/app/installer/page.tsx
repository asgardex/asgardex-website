import { Button, Image } from '@nextui-org/react'
import Selector from '../ui/Selector'
import Link from 'next/link'
import { getAsgardexReleases } from '../lib/api'

interface ReleaseItem {
  tag_name: string
  html_url: string
  linux: { title: string, url: string }
  macSon: { title: string, url: string }
  macVent: { title: string, url: string }
  macSequ: { title: string, url: string }
  windows: { title: string, url: string }
  [key: string]: { title: string, url: string } | string
}

export default async function InstallerPage() {
  const { latest, previous } = getAsgardexReleases()
  return (
    <main className="flex flex-col items-center pt-20">
      <section className="flex flex-col w-full items-center justify-center px-20 lg:px-0">
        <div className="max-w-[1085px] text-center py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Download the Latest Version Easily
          </h1>
          <p className="text-sm md:text-lg font-normal mb-16">
            Stay up-to-date effortlessly. Whether you&apos;re using Windows,
            Mac, or Linux, downloading the latest version of Asgardex is just a
            click away. Keep track of updates.
          </p>
          <div className="max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6 m-auto">
            <div className="flex flex-col items-center w-full rounded-2xl p-6 bg-default-100/50 backdrop-blur-md border border-default-200">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none dark:invert"
                  src="/windows-black-logo.avif"
                  alt="Windows operating system logo"
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold text-foreground">
                Windows{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.windows.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <p>Download</p>
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.windows} />
              )}
            </div>
            {latest && Object.entries({
              macVent: 'Ventura',
              macSon: 'Sonoma',
              macSequ: 'Sequoia'
            }).map(([key, version]) => {
              const asset = (latest as ReleaseItem)[key]
              return (typeof asset === 'object' && asset?.url) && (
                <div key={`mac-${key}`} className="flex flex-col items-center w-full rounded-2xl p-6 bg-default-100/50 backdrop-blur-md border border-default-200">
                  <div className="flex items-center justify-center w-full h-20 mt-2">
                    <Image
                      className="rounded-none dark:invert"
                      src="/apple-black-logo.png"
                      alt="Apple logo"
                      width={64}
                      height={64}
                    />
                  </div>
                  <p className="my-2 text-sm font-semibold text-foreground text-center">
                    Mac {version}{latest.tag_name ? ` - ${latest.tag_name}` : ''}
                  </p>
                  <Button
                    as={Link}
                    href={asset.url || latest.html_url || '#'}
                    className="mt-4 mb-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!asset.url}
                  >
                    <p>Download</p>
                  </Button>
                  {previous && (
                    <Selector label="Previous Versions" items={previous[key as keyof typeof previous]} />
                  )}
                </div>
              )
            })}
            <div className="flex flex-col items-center w-full rounded-2xl p-6 bg-default-100/50 backdrop-blur-md border border-default-200">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none dark:invert"
                  src={'/linux-black-logo.avif'}
                  alt="Linux operating system logo"
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold text-foreground">
                Linux{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.linux.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <p>Download</p>
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.linux} />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col max-w-[1085px] w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="text-center py-16">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-foreground">
            Release notes and signed binaries
          </h3>
          <div className="text-m md:text-lg font-normal mb-8 text-foreground">
            <h2>
              Visit our GitHub for the detailed release notes and signed
              binaries
            </h2>
            <div className="flex text-sm justify-center mt-12">
              <ul className="list-disc list-inside text-left text-sm md:text-base">
                <li>Performance improvements & stability efforts</li>
                <li>See GH for full release notes</li>
                <li>Supporting Mac OS Ventura, Sonoma & Sequoia See GH for your OS</li>
                <li>
                  Mac still experiencing issues when opening, enter settings -
                  privacy & security - scroll down - open anyway
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:items-center gap-4 py-8">
            <Link
              href={'https://github.com/asgardex/asgardex-desktop/releases'}
              target="_blank"
              rel="noopener noreferrer">
              <Button className="bg-secondary cursor-pointer p-4 hover:bg-secondary/90 outline-none text-primary-foreground">
                <p className="text-base md:text-lg">
                  Check out the latest releases on GitHub
                </p>
                <Image
                  src={'/github-black-logo.avif'}
                  alt={'GitHub Release Page'}
                  width={35}
                  height={35}
                />
              </Button>
            </Link>
            <Link
              href={'https://github.com/asgardex/asgardex-desktop/issues'}
              target="_blank"
              rel="noopener noreferrer">
              <Button className="bg-secondary cursor-pointer p-4 hover:bg-secondary/90 outline-none text-primary-foreground">
                <p className="text-base md:text-lg">
                  Found an issue? Report it here
                </p>
                <Image
                  src={'/github-black-logo.avif'}
                  alt={'GitHub Release Page'}
                  width={35}
                  height={35}
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
