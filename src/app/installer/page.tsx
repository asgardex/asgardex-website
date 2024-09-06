import { Button, Image } from '@nextui-org/react'
import Selector from '../ui/Selector'
import Link from 'next/link'
import { getAsgardexReleases } from '../lib/api'

export default async function InstallerPage () {
  const { latest, previous } = await getAsgardexReleases()
  return <main className="flex flex-col items-center pt-20">
    <section className='flex flex-col w-full items-center justify-center bg-asgardex-secondary-1000 px-20 lg:px-0'>
      <div className='max-w-[1085px] text-center py-16'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4'>
          Download the Latest Version Easily
        </h1>
        <p className='text-sm md:text-lg font-normal mb-8'>
          Stay up-to-date effortlessly. Whether you&apos;re using Windows, Mac, or Linux, downloading the
          latest version of Asgardex is just a click away. Keep track of updates.
        </p>
        <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-14 m-auto">
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold">Installer for</p>
            {latest.tag_name
              ? <p className="text-sm font-semibold">Windows - {latest.windows.title}</p>
              : <p className="text-sm font-semibold">Windows</p>
            }
            <Button as={Link} href={latest.tag_name ? latest.windows.url : latest.html_url} className="my-3 w-full ">
              <Image className="rounded-none" src={'/windows-black-logo.avif'} alt='' width={12} height={12} />
              <p>Download</p>
            </Button>
            {previous && <Selector label='Previous Versions' items={previous.windows} />}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold">Installer for</p>
            {latest?.tag_name
              ? <p className="text-sm font-semibold">Mac - {latest.mac.title}</p>
              : <p className="text-sm font-semibold">Mac</p>
            }
            <Button as={Link} href={latest.tag_name ? latest.mac.url : latest.html_url} className="my-3 w-full">
              <Image className="rounded-none" src={'/apple-black-logo.avif'} alt='' width={12} height={12} />
              <p>Download</p>
            </Button>
            {previous && <Selector label='Previous Versions' items={previous.mac} />}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold">Installer for</p>
            {latest?.tag_name
              ? <p className="text-sm font-semibold">Linux - {latest.linux.title}</p>
              : <p className="text-sm font-semibold">Linux</p>
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
    <section className='flex flex-col max-w-[1085px] w-full items-center justify-center px-6 md:px-16 lg:px-8'>
      <div className='text-center py-16'>
      <h3 className='text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-dark-gray'>
          Visit our github for detailed release notes and signed binaries
        </h3>
        <div className='text-m md:text-lg font-normal mb-8 text-dark-gray'>
          <h2>v1.22.4 Release notes</h2>
          <div className='flex text-sm justify-center'>
            <ul className='list-disc list-inside text-left text-sm md:text-base'>
              <li>Added RunePool UI</li>
              <li>Added Storing of trusted address v1 Address book</li>
              <li>Updated rpc end points for TC Ledger</li>
              <li>Mac still experiencing issues when opening even though we have a valid dev cert, enter settings - privacy & security - scroll down - open anyway</li>
              <li>If you know how to fix the above or want to see the mac build process see `develop/.github/workflows/build-macos.yml`</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-row md:items-center gap-4 py-8">
          <Link href={'https://github.com/asgardex/asgardex-desktop/releases'} target='_blank'>
            <Button className='bg-asgardex-primary-500 cursor-pointer p-2 hover:bg-asgardex-primary-300 outline-none text-asgardex-dark-1000'>
              <p className="text-base md:text-lg">
                Check out the latest releases on GitHub
              </p>
              <Image src={'/github-black-logo.avif'} alt={'GitHub Release Page'} width={35} height={35} />
            </Button>
          </Link>
          <Link href={'https://github.com/asgardex/asgardex-desktop/issues'} target='_blank'>
            <Button className='bg-asgardex-primary-500 cursor-pointer p-2 hover:bg-asgardex-primary-300 outline-none text-asgardex-dark-1000'>
              <p className="text-base md:text-lg">
                Found an bug? report it here
              </p>
              <Image src={'/github-black-logo.avif'} alt={'GitHub Release Page'} width={35} height={35} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </main>
}
