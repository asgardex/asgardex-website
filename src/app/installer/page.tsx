import { Button, Image } from '@nextui-org/react'
import Selector from '../ui/Selector'
import Link from 'next/link'
import { getAsgardexReleases } from '../lib/api'

export default async function InstallerPage () {
  const { latest, previous } = await getAsgardexReleases()
  return <main className="flex flex-col items-center pt-20">
    <section className='flex flex-col w-full items-center justify-center bg-asgardex-secondary-1000 px-20 lg:px-0'>
      <div className='max-w-[1085px] text-center py-16'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white'>
          Download the Latest Version Easily
        </h1>
        <p className='text-sm md:text-lg font-normal mb-8 text-white'>
          Stay up-to-date effortlessly. Whether you&apos;re using Windows, Mac, or Linux, downloading the
          latest version of Asgardex is just a click away. Keep track of updates.
        </p>
        <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-14 m-auto">
          <div className="flex flex-col items-center">
            <p className="text-sm text-white font-semibold">Installer for</p>
            {latest.tag_name
              ? <p className="text-sm text-white font-semibold">Windows - {latest.windows.title}</p>
              : <p className="text-sm text-white font-semibold">Windows</p>
            }
            <Button as={Link} href={latest.tag_name ? latest.windows.url : latest.html_url} className="my-3 w-full">
              <Image className="rounded-none" src={'/windows-black-logo.avif'} alt='' width={12} height={12} />
              <p>Download</p>
            </Button>
            {previous && <Selector label='Previous Versions' items={previous.windows} />}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-white font-semibold">Installer for</p>
            {latest?.tag_name
              ? <p className="text-sm text-white font-semibold">Mac - {latest.mac.title}</p>
              : <p className="text-sm text-white font-semibold">Mac</p>
            }
            <Button as={Link} href={latest.tag_name ? latest.mac.url : latest.html_url} className="my-3 w-full">
              <Image className="rounded-none" src={'/apple-black-logo.avif'} alt='' width={12} height={12} />
              <p>Download</p>
            </Button>
            {previous && <Selector label='Previous Versions' items={previous.mac} />}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-white font-semibold">Installer for</p>
            {latest?.tag_name
              ? <p className="text-sm text-white font-semibold">Linux - {latest.linux.title}</p>
              : <p className="text-sm text-white font-semibold">Linux</p>
            }
            <Button as={Link} href={latest.tag_name ? latest.linux.url : latest.html_url} className="my-3 w-full">
              <Image className="rounded-none" src={'/linux-black-logo.avif'} alt='' width={12} height={12} />
              <p>Download</p>
            </Button>
            {previous && <Selector label='Previous Versions' items={previous.linux} />}
          </div>
        </div>
      </div>
    </section>
  </main>
}
