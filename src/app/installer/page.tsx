import { Button, Image } from '@nextui-org/react'
import Selector from '../ui/Selector'
import Link from 'next/link'
import { getAsgardexReleases } from '../lib/api'

export default async function InstallerPage() {
  const { latest, previous } = await getAsgardexReleases()
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
          <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-14 m-auto">
            <div className="flex flex-col items-center w-full rounded-2xl p-4 bg-asgardex-gray-100 bg-opacity-10 backdrop-blur-md">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none invert"
                  src="/windows-black-logo.avif"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold">
                Windows{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.windows.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-asgardex-secondary-500">
                <p>Download</p>
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.windows} />
              )}
            </div>
            <div className="flex flex-col items-center w-full rounded-2xl p-4 bg-asgardex-gray-100 bg-opacity-10 backdrop-blur-md">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none invert"
                  src="/apple-black-logo.png"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold">
                Mac{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.macVent.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-asgardex-secondary-500">
                <p>Download</p>
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.macVent} />
              )}
            </div>
            <div className="flex flex-col items-center w-full rounded-2xl p-4 bg-asgardex-gray-100 bg-opacity-10 backdrop-blur-md">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none invert"
                  src="/apple-black-logo.png"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold">
                Mac{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.macSon.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-asgardex-secondary-500">
                <p>Download</p>
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.macSon} />
              )}
            </div>
            <div className="flex flex-col items-center w-full rounded-2xl p-4 bg-asgardex-gray-100 bg-opacity-10 backdrop-blur-md">
              <div className="flex items-center justify-center w-full h-20 mt-2">
                <Image
                  className="rounded-none invert"
                  src={'/linux-black-logo.avif'}
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <p className="my-2 text-sm font-semibold">
                Linux{latest ? ` - ${latest?.tag_name}` : ''}
              </p>
              <Button
                as={Link}
                href={latest.tag_name ? latest.linux.url : latest.html_url}
                className="mt-4 mb-2 w-full bg-asgardex-secondary-500">
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
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-dark-gray">
            Release notes and signed binaries
          </h3>
          <div className="text-m md:text-lg font-normal mb-8 text-dark-gray">
            <h2>
              Visit our GitHub for the detailed release notes and signed
              binaries
            </h2>
            <div className="flex text-sm justify-center mt-12">
              <ul className="list-disc list-inside text-left text-sm md:text-base">
                <li>Performance improvements & stability efforts</li>
                <li>Fix secured assets swapping</li>
                <li>Supporting TCY & ruji assets on THOR</li>
                <li>See GH for full release notes</li>
                <li>Supporting Mac OS Ventura and Sonoma See GH for you OS</li>
                <li>
                  Mac still experiencing issues when opening, enter settings -
                  privacy & security - scroll down - open anyway
                </li>
                <li>
                  A work around for this issue is to download the asset directly
                  from Github
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:items-center gap-4 py-8">
            <Link
              href={'https://github.com/asgardex/asgardex-desktop/releases'}
              target="_blank">
              <Button className="bg-asgardex-primary-500 cursor-pointer p-4 hover:bg-asgardex-primary-300 outline-none text-asgardex-dark-1000">
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
              target="_blank">
              <Button className="bg-asgardex-primary-500 cursor-pointer p-4 hover:bg-asgardex-primary-300 outline-none text-asgardex-dark-1000">
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
