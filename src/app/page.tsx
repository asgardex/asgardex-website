'use client'
import { Button, Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { IconTrendingUp, IconShield, IconServer, IconWallet, IconBrandGithub, IconExternalLink } from '@tabler/icons-react'

import LiveMetricsWidget from './ui/LiveMetricsWidget'
import LiveMayaMetricsWidget from './ui/LiveMayaMetricsWidget'
import LiveChainflipMetricsWidget from './ui/LiveChainflipMetricsWidget'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col max-w-7xl w-full h-[calc(100vh-64px)] items-center justify-center pt-12 pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center text-center max-w-6xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8">
            <IconTrendingUp size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground/90">Premier Desktop DEX</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-foreground leading-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Multi-Chain Trading
            </span>{' '}
            Platform
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-10 text-foreground/80 max-w-4xl leading-relaxed">
            The only desktop application providing native access to THORChain, MayaChain, and Chainflip ecosystems with enterprise-grade security and complete user sovereignty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              as={Link}
              href="/installer"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 text-lg font-bold rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 ease-in-out min-w-[200px]">
              <IconExternalLink size={20} className="mr-2" />
              Download AsgardEX
            </Button>
            <Button
              as={Link}
              href="/getting-started"
              className="border-2 border-secondary bg-transparent rounded-full px-8 py-4 font-bold text-foreground text-lg hover:bg-secondary/10 hover:border-secondary/80 hover:shadow-glow-blue transition-all duration-300 ease-in-out min-w-[200px]">
              <IconExternalLink size={20} className="mr-2" />
              Getting Started
            </Button>
          </div>

          <div className="flex justify-center mb-12">
            <Button
              as={Link}
              href="https://github.com/asgardex/asgardex-desktop"
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              className="text-foreground/70 hover:text-foreground">
              <IconBrandGithub size={16} className="mr-2" />
              View Source Code
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">19+</div>
              <div className="text-sm text-foreground/70">Blockchains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">100%</div>
              <div className="text-sm text-foreground/70">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">0.3%</div>
              <div className="text-sm text-foreground/70">Max Fee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">No KYC</div>
              <div className="text-sm text-foreground/70">Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Protocol Metrics Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl w-full">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6 px-2">
              Live Protocol{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Metrics
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
              Real-time network statistics from THORChain, MayaChain, and Chainflip protocols
            </p>
          </div>

          {/* Triple Protocol Metrics */}
          <div className="space-y-12">
            {/* Top Row - THORChain and MayaChain */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <LiveMetricsWidget />
              </div>
              <div>
                <LiveMayaMetricsWidget />
              </div>
            </div>

            {/* Bottom Row - Chainflip */}
            <div className="max-w-4xl mx-auto">
              <LiveChainflipMetricsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Professional Traders
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-2">
              Everything you need for advanced cross-chain DeFi operations in a single desktop application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                    <IconTrendingUp size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Multi-Chain Trading</h3>
                </div>
                <p className="text-foreground/80 mb-4">Cross-chain swaps across 19+ blockchains including BTC, ETH, AVAX, BSC, COSMOS, TRON, and more with real-time price discovery.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Advanced trading features with trade assets</li>
                  <li>• Liquidity provision with symmetrical deposits</li>
                  <li>• Real-time transaction monitoring</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                    <IconWallet size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Professional Wallet</h3>
                </div>
                <p className="text-foreground/80 mb-4">Complete wallet management with hardware integration, multi-asset support, and enterprise-grade security features.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Ledger hardware wallet support</li>
                  <li>• Advanced derivation paths for UTXO chains</li>
                  <li>• Encrypted local keystore management</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                    <IconServer size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Node Operations</h3>
                </div>
                <p className="text-foreground/80 mb-4">Complete node management interface for THORChain and MayaChain operators with professional monitoring tools.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Bond/unbond functionality</li>
                <li>• Node status monitoring and alerts</li>
                <li>• THORName and MAYAName registration</li>
              </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                    <IconShield size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Enterprise Security</h3>
                </div>
                <p className="text-foreground/80 mb-4">100% open-source with local execution ensuring your data never leaves your device. No KYC requirements.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• MIT licensed for transparency</li>
                  <li>• Follows Electron security best practices</li>
                  <li>• Community-audited codebase</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                    <IconBrandGithub size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Developer Friendly</h3>
                </div>
                <p className="text-foreground/80 mb-4">Built with modern tech stack and comprehensive API integrations. Extensive documentation and testing suite.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• React, TypeScript, Electron stack</li>
                  <li>• Multi-language support (7 languages)</li>
                  <li>• Storybook component library</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                    <IconTrendingUp size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Advanced Analytics</h3>
                </div>
                <p className="text-foreground/80 mb-4">Comprehensive pool analytics, transaction history tracking, and detailed performance metrics for professional users.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Pool overview and detailed analytics</li>
                  <li>• Transaction history with filters</li>
                  <li>• Real-time portfolio tracking</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          {/* App Preview */}
          <div className="text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-solid border-white/20 shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-[1.02] inline-block">
              <Image
                className="rounded-xl border border-solid border-white/20"
                src="/pools-home.png"
                alt="AsgardEX desktop application interface showing advanced trading features"
                width={1024}
                height={554}
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>
      {/* Supported Chains Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Trade Across{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                19+ Blockchains
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-2">
              Native cross-chain support for major blockchains with deep liquidity and competitive rates
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {[
              { name: 'Bitcoin', symbol: 'BTC', color: 'text-orange-400' },
              { name: 'Ethereum', symbol: 'ETH', color: 'text-blue-400' },
              { name: 'Avalanche', symbol: 'AVAX', color: 'text-red-400' },
              { name: 'BSC', symbol: 'BNB', color: 'text-yellow-400' },
              { name: 'Cosmos', symbol: 'ATOM', color: 'text-purple-400' },
              { name: 'Dogecoin', symbol: 'DOGE', color: 'text-yellow-500' },
              { name: 'Litecoin', symbol: 'LTC', color: 'text-gray-400' },
              { name: 'Bitcoin Cash', symbol: 'BCH', color: 'text-green-400' },
              { name: 'Dash', symbol: 'DASH', color: 'text-blue-500' },
              { name: 'Kuji', symbol: 'KUJI', color: 'text-pink-400' },
              { name: 'Arbitrum', symbol: 'ARB', color: 'text-blue-300' },
              { name: 'Maya', symbol: 'MAYA', color: 'text-teal-400' },
              { name: 'Zcash', symbol: 'ZEC', color: 'text-yellow-300' },
              { name: 'Cardano', symbol: 'ADA', color: 'text-blue-600' },
              { name: 'Ripple', symbol: 'XRP', color: 'text-blue-500' },
              { name: 'Solana', symbol: 'SOL', color: 'text-purple-500' },
              { name: 'Base', symbol: 'BASE', color: 'text-blue-400' },
              { name: 'Radix', symbol: 'XRD', color: 'text-green-500' },
              { name: 'Tron', symbol: 'TRX', color: 'text-red-500' }
            ].map((chain, index) => (
              <div key={index} className="flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${chain.color} mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {chain.symbol}
                </div>
                <div className="text-xs sm:text-sm text-foreground/70">{chain.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-foreground/80 mb-8">
              All major assets supported with hardware wallet integration and advanced derivation paths
            </p>
          </div>
        </div>
      </section>

      {/* Security & Open Source Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Enterprise-Grade{' '}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Security & Privacy
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-2">
              100% open-source with local execution ensuring your data never leaves your device
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-primary/20 mx-auto mb-4 w-fit">
                <IconShield size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Open Source</h3>
              <p className="text-foreground/80 text-sm">MIT licensed for complete transparency and community auditing</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-secondary/20 mx-auto mb-4 w-fit">
                <IconWallet size={32} className="text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Hardware Wallet</h3>
              <p className="text-foreground/80 text-sm">Ledger integration for ultimate security across all chains</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-primary/20 mx-auto mb-4 w-fit">
                <IconServer size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Local Execution</h3>
              <p className="text-foreground/80 text-sm">All operations run locally - no data ever leaves your device</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-secondary/20 mx-auto mb-4 w-fit">
                <IconBrandGithub size={32} className="text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No KYC</h3>
              <p className="text-foreground/80 text-sm">Complete privacy with no identity verification required</p>
            </Card>
          </div>

          {/* App Preview */}
          <div className="text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-solid border-white/20 shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-[1.02] inline-block">
              <Image
                className="rounded-xl border border-solid border-white/20"
                src="/wallets-management-home.png"
                alt="AsgardEX wallet management showing hardware wallet integration"
                width={1000}
                height={200}
                loading="lazy"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Node Operations Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Professional{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Node Operations
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-2">
              Complete THORChain and MayaChain node management with professional monitoring and control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                    <IconServer size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Bond Management</h3>
                </div>
                <p className="text-foreground/80 mb-4">Complete bond/unbond functionality with real-time monitoring and automated alerts for node operators.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>• Automated bond calculations</li>
                  <li>• Real-time status monitoring</li>
                  <li>• Leave request management</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                  <IconTrendingUp size={32} className="text-secondary" />
                </div>
                  <h3 className="text-xl font-bold text-foreground">Node Analytics</h3>
              </div>
                <p className="text-foreground/80 mb-4">Advanced analytics dashboard showing performance metrics, rewards tracking, and health monitoring.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Performance metrics tracking</li>
                <li>• Reward calculations</li>
                <li>• Health status alerts</li>
              </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                  <IconWallet size={32} className="text-primary" />
                </div>
                  <h3 className="text-xl font-bold text-foreground">Name Services</h3>
              </div>
                <p className="text-foreground/80 mb-4">THORName and MAYAName registration and management directly from the desktop application.</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                <li>• THORName registration</li>
                <li>• MAYAName management</li>
                <li>• Address aliasing</li>
              </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Community & Development Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Open Source{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Community Driven
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-2">
              Built by the community, for the community with active development and continuous innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-lg font-semibold text-foreground mb-1">GitHub Stars</div>
              <div className="text-sm text-foreground/70">Active contributors</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-lg font-semibold text-foreground mb-1">Contributors</div>
              <div className="text-sm text-foreground/70">Global developers</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">7</div>
              <div className="text-lg font-semibold text-foreground mb-1">Languages</div>
              <div className="text-sm text-foreground/70">Multi-language support</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-lg font-semibold text-foreground mb-1">Community</div>
              <div className="text-sm text-foreground/70">Discord support</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-primary/20 mx-auto mb-4 w-fit">
                <IconBrandGithub size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Open Development</h3>
              <p className="text-foreground/80 mb-6">All development happens in the open with community input and code reviews.</p>
              <Button
                as={Link}
                href="https://github.com/asgardex/asgardex-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary text-primary-foreground px-6 py-2 text-sm font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                View Repository
              </Button>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-secondary/20 mx-auto mb-4 w-fit">
                <IconServer size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Active Community</h3>
              <p className="text-foreground/80 mb-6">Join thousands of users and developers building the future of DeFi.</p>
              <Button
                as={Link}
                href="https://discord.gg/AZDtabWFJF"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-secondary text-secondary-foreground px-6 py-2 text-sm font-bold rounded-lg hover:shadow-glow-blue hover:scale-105 transition-all duration-300">
                Join Discord
              </Button>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-3 rounded-xl bg-primary/20 mx-auto mb-4 w-fit">
                <IconTrendingUp size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Continuous Innovation</h3>
              <p className="text-foreground/80 mb-6">Regular updates with new features, security improvements, and protocol integrations.</p>
              <Button
                as={Link}
                href="https://github.com/asgardex/asgardex-desktop/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-accent text-primary-foreground px-6 py-2 text-sm font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                View Releases
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Download Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Download{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AsgardEX Desktop
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed mb-12">
              Get started with professional cross-chain trading in minutes. Available for all major operating systems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center">
                <div className="text-6xl mb-4">🪟</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Windows</h3>
                <p className="text-foreground/70 mb-6">Windows 10 or later</p>
                <Button
                  as={Link}
                  href="/installer"
                  className="bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 w-full">
                  Download for Windows
                </Button>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center">
                <div className="text-6xl mb-4">🍎</div>
                <h3 className="text-xl font-bold text-foreground mb-2">macOS</h3>
                <p className="text-foreground/70 mb-6">macOS 10.15 or later</p>
                <Button
                  as={Link}
                  href="/installer"
                  className="bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 w-full">
                  Download for Mac
                </Button>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center">
                <div className="text-6xl mb-4">🐧</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Linux</h3>
                <p className="text-foreground/70 mb-6">Ubuntu 18.04 or later</p>
                <Button
                  as={Link}
                  href="/installer"
                  className="bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 w-full">
                  Download for Linux
                </Button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Why Choose AsgardEX Desktop?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/20 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">True Decentralization</h4>
                    <p className="text-sm text-foreground/70">No web dependencies, runs entirely on your machine</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/20 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Professional Features</h4>
                    <p className="text-sm text-foreground/70">Advanced trading tools and node management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/20 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Enterprise Security</h4>
                    <p className="text-sm text-foreground/70">Hardware wallet support and local key storage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/20 mt-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Transparent Fees</h4>
                    <p className="text-sm text-foreground/70">Only 0.3% on swaps over $1,001 (30 bps affiliate fee)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 bg-gradient-subtle">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Experience{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Professional DeFi?
            </span>
          </h2>
          <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
            Join thousands of users already trading with the most advanced cross-chain desktop application
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              as={Link}
              href="/installer"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 text-lg font-bold rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 ease-in-out min-w-[200px]">
              <IconExternalLink size={20} className="mr-2" />
              Download Now
            </Button>
            <Button
              as={Link}
              href="https://thorchain.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary bg-transparent rounded-full px-8 py-4 font-bold text-foreground text-lg hover:bg-primary/10 hover:border-primary/80 hover:shadow-glow-blue transition-all duration-300 ease-in-out min-w-[200px]">
              Learn More
            </Button>
          </div>

          <div className="text-center text-foreground/70">
            <p className="text-lg mb-4">
              <span className="font-bold text-primary">0.3% fee</span> on swaps over $1,001 •
              <span className="font-bold text-secondary"> No KYC</span> required •
              <span className="font-bold text-primary"> Open Source</span>
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
