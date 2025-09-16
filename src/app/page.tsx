'use client'
import { Button, Divider } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from './ui/Card'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:gap-y-20">
      <section className="relative flex flex-col max-w-7xl w-full h-[calc(100vh-64px)] items-center justify-between pt-12 pb-32 px-4 lg:px-8">
        <div />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-[80px] font-extrabold mb-6 text-foreground leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-midgard-turquoise to-bifrost-blue bg-clip-text text-transparent drop-shadow-sm">
              Asgardex
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-10 text-foreground/90 max-w-4xl leading-relaxed">
            A Seamless Multi-Chain L1 Exchange at Your Fingertips
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              as={Link}
              href="/installer"
              className="bg-gradient-primary text-primary-foreground p-8 text-lg font-bold border-outline-none rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 ease-in-out">
              Download Now
            </Button>
            <Link href="https://discord.gg/AZDtabWFJF" target="_blank" rel="noopener noreferrer">
              <Button className="border-2 border-primary bg-transparent rounded-full p-8 font-bold w-full text-foreground text-lg hover:bg-primary/10 hover:border-primary/80 hover:shadow-glow-blue transition-all duration-300 ease-in-out">
                Join Discord
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end w-full">
          <div className="flex items-center justify-center gap-6 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-solid border-asgardex-gray-800 hover:bg-white/15 transition-all duration-300 shadow-lg">
            <Link href="https://twitter.com/asgardex" target="_blank" rel="noopener noreferrer">
              <Image
                className="dark:invert hover:scale-125 transition-transform duration-200"
                src="/x-black-logo.avif"
                alt="Follow Asgardex on X (Twitter)"
                width={24}
                height={24}
                loading="lazy"
                quality={90}
              />
            </Link>
            <Link href="https://discord.gg/AZDtabWFJF" target="_blank" rel="noopener noreferrer">
              <Image
                className="dark:invert hover:scale-125 transition-transform duration-200"
                src="/discord-black-logo.avif"
                alt="Join Asgardex Discord community"
                width={28}
                height={28}
                loading="lazy"
                quality={90}
              />
            </Link>
            <Link
              href="https://github.com/asgardex/asgardex-desktop/releases"
              target="_blank"
              rel="noopener noreferrer">
              <Image
                className="dark:invert hover:scale-125 transition-transform duration-200"
                src="/github-black-logo.avif"
                alt="View Asgardex source code on GitHub"
                width={28}
                height={28}
                loading="lazy"
                quality={90}
              />
            </Link>
            <Link href="https://thorchain.org/" target="_blank" rel="noopener noreferrer">
              <Image
                className="dark:invert hover:scale-125 transition-transform duration-200"
                src="/thorchain-black-logo.avif"
                alt="Learn more about THORChain protocol"
                width={24}
                height={24}
                loading="lazy"
                quality={90}
              />
            </Link>
            <Link href="https://www.mayaprotocol.com/" target="_blank" rel="noopener noreferrer">
              <Image
                className="dark:invert hover:scale-125 transition-transform duration-200"
                src="/maya-black-logo.avif"
                alt="Learn more about Maya Protocol"
                width={36}
                height={36}
                loading="lazy"
                quality={90}
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full max-w-7xl items-center justify-center text-center px-6 md:px-16 lg:px-8 gap-12 py-16">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
            Dive into the world of <span className="bg-gradient-secondary bg-clip-text text-transparent">decentralized finance</span> with Asgardex
          </h2>
        </div>
        <div className="max-w-4xl space-y-6">
          <p className="text-base md:text-xl lg:text-2xl font-medium mt-8 text-foreground/90 leading-relaxed">
            The open-source desktop application designed exclusively for
            THORChain and Maya Protocol.
          </p>
          <p className="text-base md:text-xl lg:text-2xl font-medium text-foreground/80 leading-relaxed">
            Get started in seconds with a simple and secure download process. We
            ensure a smooth and hassle-free experience, allowing you to focus on
            what matters most.
          </p>
        </div>

        <div className="bg-white/10 p-3 rounded-2xl border border-solid border-white/20 shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
          <Image
            className="rounded-xl border border-solid border-white/20"
            src="/pools-home.png"
            alt="Asgardex application interface showing liquidity pools management"
            width={1024}
            height={554}
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

      </section>
      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-16 bg-gradient-subtle">
        <div className="max-w-[1000px] text-center py-20">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-tight">
            Our Core Values: <span className="bg-gradient-accent bg-clip-text text-transparent">Decentralization</span>, Censorship Resistance, and
            Security
          </h2>
          <p className="text-base md:text-xl lg:text-2xl font-medium mb-12 text-foreground/90 leading-relaxed max-w-4xl mx-auto">
            Asgardex is more than an app – it&apos;s a commitment to financial
            freedom. Operated by the community, for the community, it stands as
            a bastion against censorship and centralization, ensuring your
            assets remain yours alone.
          </p>
        </div>
        <div className="w-full">
          <div className="max-w-[1085px] text-center py-8 m-auto">
            <div className="pt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card>
                <div className="w-10 md:w-[70px] h-10 md:h-[70px]">
                  <Image
                    src="/decentralization-logo.avif"
                    alt="Decentralization icon"
                    layout="responsive"
                    width={70}
                    height={70}
                  />
                </div>
                <h4 className="mt-4 text-md md:text-2xl font-bold text-foreground">
                  Decentralization
                </h4>
                <p className="mt-3 text-xs md:text-base font-normal text-foreground">
                  Avoids web apps, uses public servers, and is open-source to
                  prevent service interruption even by the app’s team.
                </p>
              </Card>
              <Card>
                <div className="w-10 md:w-[70px] h-10 md:h-[70px]">
                  <Image
                    src="/censorship-logo.avif"
                    alt="Censorship resistance icon"
                    width={70}
                    height={70}
                  />
                </div>
                <h4 className="mt-4 text-md md:text-2xl font-bold text-foreground">
                  Censorship Resistance
                </h4>
                <p className="mt-3 text-xs md:text-base font-normal text-foreground">
                  The installer can be easily distributed and used without
                  domains or a centralized responsible party.
                </p>
              </Card>
              <Card>
                <div className="w-10 md:w-[70px] h-10 md:h-[70px]">
                  <Image
                    src="/security-logo.avif"
                    alt="Security icon"
                    width={70}
                    height={70}
                  />
                </div>
                <h4 className="mt-4 text-md md:text-2xl font-bold text-foreground">
                  Security
                </h4>
                <p className="mt-3 text-xs md:text-base font-normal text-foreground">
                  Developed and maintained by the community, reducing the risk
                  of errors and fund loss.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-20">
        <div className="max-w-[1000px] text-center flex flex-col items-center py-20">
          <div className="max-w-[900px] m-auto">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-tight">
              Empowering You with <span className="bg-gradient-primary bg-clip-text text-transparent">Wallet Flexibility</span>
            </h2>
            <p className="text-base md:text-xl lg:text-2xl font-medium text-foreground/90 leading-relaxed">
              Your assets, your control. Create a new wallet stored locally for
              enhanced security, or load an existing wallet using your secret
              phrase. Plus, enjoy seamless integration with Ledger hardware for
              ultimate peace of mind.
            </p>
          </div>

          <div className="my-16 bg-white/10 p-4 rounded-2xl border border-solid border-white/20 shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-[1.02]">
            <Image
              className="rounded-xl border border-solid border-white/20"
              src="/wallets-management-home.png"
              alt="Asgardex wallet management interface showing multiple wallet options"
              width={1000}
              height={200}
              loading="lazy"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">Local Wallets</h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Create and manage locally.
              </h5>
            </div>
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">Secret Phrase</h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Load wallet with a phrase.
              </h5>
            </div>
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">Ledger Support</h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Integrated with Ledger devices.
              </h5>
            </div>
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">User-Friendly</h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Effortless navigation and usage.
              </h5>
            </div>
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">Earn interest</h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Also in native assets like BTC, DOGE, BCH...
              </h5>
            </div>
            <div className="text-left p-4 rounded-xl bg-default-50/50 hover:bg-default-100/70 transition-all duration-300 border border-default-200/50">
              <h4 className="font-bold text-base lg:text-xl text-foreground mb-2">
                Node & Bond Management
              </h4>
              <h5 className="font-medium text-sm lg:text-base text-foreground/80">
                Monitor validators behaviour.
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[1000px] flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Experience Asgardex in Action
            </h2>
            <p className="text-sm md:text-lg lg:text-xl font-normal mb-8">
              Not sure what Asgardex can do for you? Watch our informative
              videos, showcasing the applications features and user-friendly
              interface.
            </p>
          </div>
          <div className="aspect-video w-full p-2 rounded-xl border border-solid border-white/20">
            <iframe
              className="w-full h-full rounded-xl border border-solid border-white/20"
              src="https://www.youtube.com/embed/hlox7PCZLKo?si=rRybl_qr466XKUCS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[1085px] text-center flex flex-col items-center py-16">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Stay Informed and Ahead
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-normal mb-8">
            Explore the future with us. Our roadmap teases exciting developments
like order book trading, and leveraged futures. Stay
            tuned for what is coming next in Asgardex&apos;s journey.
          </p>
          <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-row items-start">
              <div className="mr-4">
                <Image
                  src="/order-books-logo.avif"
                  alt="Order books trading icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold mb-2">Order Books</h4>
                <h5 className="text-sm font-medium">
                  Efficient order book trading methods
                </h5>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="mr-4">
                <Image
                  src="/base-trading-logo.avif"
                  alt="Base trading feature icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold mb-2">Based Trading</h4>
                <h5 className="text-sm font-medium">
                  Leveraged futures trading simplified
                </h5>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="mr-4">
                <Image
                  src="/leverage-future-logo.avif"
                  alt="Leveraged futures trading icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold mb-2">
                  Leveraged Future Trading
                </h4>
                <h5 className="text-sm font-medium">
                  Stay ahead with our features
                </h5>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="mr-4">
                <Image
                  src="/trading-futures-logo.avif"
                  alt="Trading futures feature icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold mb-2">Trading Features</h4>
                <h5 className="text-sm font-medium">
                  Trade efficiently with Roadmap
                </h5>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="mr-4">
                <Image
                  src="/future-implementations-logo.avif"
                  alt="Future implementations roadmap icon"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold mb-2">
                  Future Implementations
                </h4>
                <h5 className="text-sm font-medium">
                  Exciting features coming soon
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[900px] text-center py-16">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Asgardex vs. CEXs
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-normal mb-8">
            Discover how Asgardex stands out with superior price efficiency for
            large transactions and native cross-chain exchanges, outperforming
            Centralized Exchanges (CEXs) in many aspects.
          </p>
          <div className="w-full">
            <div className="flex flex-row items-start w-full justify-between py-6">
              <h4 className="text-left text-8xl font-bold w-1/3">1</h4>
              <div className="text-left w-2/3">
                <h4 className="text-lg font-bold mb-2">Aspect One</h4>
                <h5 className="text-sm md:text-xl font-normal">
                  Sign up and explore the Asgardex platform.
                </h5>
              </div>
            </div>
            <Divider />
          </div>
          <div className="w-full">
            <div className="flex flex-row items-start w-full justify-between py-6">
              <h4 className="text-left text-8xl font-bold w-1/3">2</h4>
              <div className="text-left w-2/3">
                <h4 className="text-lg font-bold mb-2">Aspect Two</h4>
                <h5 className="text-sm md:text-xl font-normal">
                  Start comparing transaction costs with CEX.
                </h5>
              </div>
            </div>
            <Divider />
          </div>
          <div className="w-full">
            <div className="flex flex-row items-start w-full justify-between py-6">
              <h4 className="text-left text-8xl font-bold w-1/3">3</h4>
              <div className="text-left w-2/3">
                <h4 className="text-lg font-bold mb-2">Aspect Three</h4>
                <h5 className="text-sm md:text-xl font-normal">
                  Experience lower slippage and start trading.
                </h5>
              </div>
            </div>
            <Divider />
          </div>
          <Button className="bg-gradient-accent font-semibold text-lg rounded-2xl px-20 py-8 mt-12 text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300">
            Start Comparing
          </Button>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[1085px] flex flex-col lg:flex-row text-center items-center justify-around py-16 gap-x-20">
          <div className="w-full">
            <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold mb-8">
              Learn and Grow with THORChain University (DYOR)
            </h2>
            <p className="text-sm md:text-lg font-normal">
              Go deeper into the mechanics of THORChain with our curated
              articles and resources. Expand your knowledge and make informed
              decisions.
            </p>
            <Button
              as={Link}
              href="https://crypto-university.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-primary font-semibold text-lg rounded-2xl px-20 py-8 my-12 text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300">
              Start Learning
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full">
            <Link
              href={
                'https://crypto-university.medium.com/under-the-hood-liquidity-pool-apr-3e5e662e6675'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={
                'flex flex-col items-center border-solid border-2 border-asgardex-gray-300 hover:bg-asgardex-gray-100/10 rounded-2xl p-2'
              }>
              <Image
                src="/liquidity-logo.avif"
                alt="Liquidity logo"
                width={75}
                height={75}
              />
              <p className="font-bold text-primary-foreground text-lg mt-4">
                Liquidity
              </p>
            </Link>
            <Link
              href={
                'https://crypto-university.medium.com/under-the-hood-streaming-swaps-660708ab9dc0'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={
                'flex flex-col items-center border-solid border-2 border-asgardex-gray-300 hover:bg-asgardex-gray-100/10 rounded-2xl p-2'
              }>
              <Image
                src="/swaps-logo.avif"
                alt="Swaps logo"
                width={75}
                height={75}
              />
              <p className="font-bold text-primary-foreground text-lg mt-4">
                Swaps
              </p>
            </Link>
            <Link
              href={
                'https://crypto-university.medium.com/synthetic-assets-79df3e3af113'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={
                'flex flex-col items-center border-solid border-2 border-asgardex-gray-300 hover:bg-asgardex-gray-100/10 rounded-2xl p-2'
              }>
              <Image
                src="/synthetic-assets-logo.avif"
                alt="Synthetic assets logo"
                width={75}
                height={75}
              />
              <p className="font-bold text-primary-foreground text-lg mt-4">
                Synthetic Assets
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[1085px] flex flex-col lg:flex-row-reverse text-center items-center justify-around py-16 gap-x-20">
          <div className="mb-10 lg:mb-0 w-full">
            <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold mb-8">
              Transparent Fee Policy
            </h2>
            <p className="text-sm md:text-lg font-normal mb-2">
              Clear and fair - a standard 0.3% commission on all swaps above
              1001 dollars, swaps below are affiliate free. No hidden fees, no
              surprises.
            </p>
            <p className="text-sm md:text-lg font-normal">
              Learn and Grow with THORChain University (DYOR).
            </p>
            <Button
              as={Link}
              href="https://crypto-university.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-primary font-semibold text-lg rounded-2xl px-20 py-8 mt-12 text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300">
              Start Learning
            </Button>
          </div>
          <h4 className="w-full font-extrabold text-9xl md:text-[150px] text-asgardex-primary-500">
            0.3%
          </h4>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8">
        <div className="max-w-[1085px] text-center py-28">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Join Our Vibrant Community
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-normal mb-8">
            Connect, learn, and grow with us on Discord, Twitter, and GitHub. Be
            a part of the movement shaping the future of decentralized finance.
          </p>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-default-50/30 hover:bg-default-100/50 transition-all duration-300 border border-default-200/30 hover:shadow-lg hover:scale-105">
              <div className="w-[100px] md:w-[120px] h-[100px] md:h-[120px] mb-6">
                <Image
                  src="/discord-big-logo.avif"
                  alt="Discord community logo"
                  layout="responsive"
                  width={120}
                  height={120}
                />
              </div>
              <h5 className="text-base md:text-xl font-bold mb-3">
                Discord Community
              </h5>
              <p className="text-sm md:text-base mb-6 text-center text-foreground/80">
                Find and share Discord links easily.
              </p>
              <Link
                className="w-full"
                href="https://discord.gg/AZDtabWFJF"
                target="_blank"
                rel="noopener noreferrer">
                <Button className="bg-gradient-secondary font-bold rounded-lg w-full text-secondary-foreground text-lg hover:shadow-glow-blue transition-all duration-300">
                  Join
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
                <Image
                  src="/x-big-logo.avif"
                  alt="X (Twitter) community logo"
                  layout="responsive"
                  width={150}
                  height={150}
                />
              </div>
              <h5 className="text-sm md:text-xl font-bold mt-8">X Community</h5>
              <p className="text-xs md:text-sm mt-2">
                Discover and distribute X links.
              </p>
              <Link
                className="w-full"
                href="https://twitter.com/asgardex"
                target="_blank"
                rel="noopener noreferrer">
                <Button className="bg-secondary font-bold rounded-lg w-full mt-8 text-secondary-foreground text-lg hover:bg-secondary/90">
                  Join
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
                <Image
                  src="/github-big-logo.avif"
                  alt="GitHub community logo"
                  layout="responsive"
                  width={150}
                  height={150}
                />
              </div>
              <h5 className="text-sm md:text-xl font-bold mt-8">
                GitHub Community
              </h5>
              <p className="text-xs md:text-sm mt-2">
                Manage and multiply GitHub links.
              </p>
              <Link
                className="w-full"
                href="https://github.com/asgardex/asgardex-desktop/releases"
                target="_blank"
                rel="noopener noreferrer">
                <Button className="bg-secondary font-bold rounded-lg w-full mt-8 text-secondary-foreground text-lg hover:bg-secondary/90">
                  Join
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
                <Image
                  src="/xchain-big-logo.avif"
                  alt="XChainJS library logo"
                  layout="responsive"
                  width={150}
                  height={150}
                />
              </div>
              <h5 className="text-sm md:text-xl font-bold mt-8">
                XChainJS Community
              </h5>
              <p className="text-xs md:text-sm mt-2">
                Manage and multiply GitHub links.
              </p>
              <Link
                className="w-full"
                href="https://github.com/xchainjs/xchainjs-lib"
                target="_blank"
                rel="noopener noreferrer">
                <Button className="bg-secondary font-bold rounded-lg w-full mt-8 text-secondary-foreground text-lg hover:bg-secondary/90">
                  Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
