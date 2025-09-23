'use client'
import { Button, Card, CardBody, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { IconDownload, IconArrowRight, IconCheck, IconShield, IconWallet } from '@tabler/icons-react'

const steps = [
  {
    id: 1,
    title: 'Download AsgardEX',
    description: 'Get the latest version for your operating system',
    content: 'Download the AsgardEX desktop application from our secure servers. Choose the version that matches your operating system (Windows, macOS, or Linux).',
    screenshot: '/getting-started/download-page.png',
    action: {
      text: 'Download Now',
      href: '/installer'
    }
  },
  {
    id: 2,
    title: 'Install & Launch',
    description: 'Follow the installation wizard',
    content: "Run the downloaded installer file to begin the installation process. The installation wizard will guide you through the setup. On macOS, you may need to allow the app in System Preferences > Security & Privacy. On Windows, Windows Defender might show a warning - click 'Run anyway' as the app is digitally signed.",
    screenshot: '/getting-started/installation-wizard.png',
    tips: [
      "On macOS: Right-click and select 'Open' if blocked by Gatekeeper",
      "On Windows: Click 'More info' then 'Run anyway' if Windows Defender blocks it",
      'Make sure you have administrator privileges for installation',
      'Verify the digital signature for security'
    ]
  },
  {
    id: 3,
    title: 'Create or Import Wallet',
    description: 'Set up your wallet securely',
    content: 'Choose to create a new wallet or import an existing one. AsgardEX supports multiple wallet types including mnemonic phrases, keystore files, and hardware wallets like Ledger.',
    screenshot: '/getting-started/wallet-setup.png',
    tips: [
      'Write down your mnemonic phrase and store it safely',
      'Never share your private keys with anyone',
      'Consider using a hardware wallet for maximum security'
    ]
  },
  {
    id: 4,
    title: 'Connect to Networks',
    description: 'Access multi-chain protocols',
    content: 'AsgardEX automatically connects to THORChain, MayaChain, and Chainflip networks. You can view network status and switch between different protocols in the network selector.',
    screenshot: '/getting-started/network-selection.png'
  },
  {
    id: 5,
    title: 'Make Your First Swap',
    description: 'Start trading across chains',
    content: 'Navigate to the Swap section to exchange assets across different blockchains. Select your source and destination assets, enter the amount, and confirm the transaction.',
    screenshot: '/getting-started/first-swap.png',
    tips: [
      'Start with small amounts to test the process',
      'Check network fees before confirming',
      'Allow time for cross-chain transactions to complete'
    ]
  },
  {
    id: 6,
    title: 'Explore Advanced Features',
    description: 'Discover liquidity pools and node operations',
    content: 'Once comfortable with basic swaps, explore liquidity provision, savings vaults, and node management features for earning yield on your assets.',
    screenshot: '/getting-started/advanced-features.png'
  }
]

export default function GettingStartedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <IconCheck size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground/90">Step-by-Step Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-foreground leading-tight">
            Getting Started with{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AsgardEX
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Learn how to set up and use AsgardEX for secure cross-chain trading.
            Follow our comprehensive guide to get started in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="/installer"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 text-lg font-bold rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 ease-in-out min-w-[200px]">
              <IconDownload size={20} className="mr-2" />
              Download First
            </Button>
            <Button
              as={Link}
              href="#guide"
              variant="bordered"
              className="border-2 border-primary bg-transparent rounded-full px-8 py-4 font-bold text-foreground text-lg hover:bg-primary/10 hover:border-primary/80 transition-all duration-300 ease-in-out min-w-[200px]">
              Start Guide
              <IconArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">6 Steps</div>
              <div className="text-sm text-foreground/70">Complete Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">~10 Min</div>
              <div className="text-sm text-foreground/70">Time to Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">18+ Chains</div>
              <div className="text-sm text-foreground/70">Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 bg-gradient-subtle">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Before You Start
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 mr-4">
                    <IconShield size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">System Requirements</h3>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2 flex-shrink-0" />Windows 10+ / macOS 10.15+ / Linux</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2 flex-shrink-0" />4GB RAM minimum</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2 flex-shrink-0" />2GB available storage</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2 flex-shrink-0" />Stable internet connection</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                    <IconWallet size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">What You&apos;ll Need</h3>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-center"><IconCheck size={16} className="text-secondary mr-2 flex-shrink-0" />Crypto assets to trade (optional)</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-secondary mr-2 flex-shrink-0" />Hardware wallet (recommended)</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-secondary mr-2 flex-shrink-0" />Basic knowledge of DeFi</li>
                  <li className="flex items-center"><IconCheck size={16} className="text-secondary mr-2 flex-shrink-0" />Backup storage for seed phrases</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="guide" className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 text-center">
            Step-by-Step{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Walkthrough
            </span>
          </h2>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <Chip
                      color="primary"
                      variant="flat"
                      size="lg"
                      className="text-lg font-bold px-3 py-2"
                    >
                      Step {step.id}
                    </Chip>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{step.title}</h3>
                  </div>

                  <p className="text-lg text-primary/80 font-medium">{step.description}</p>
                  <p className="text-foreground/80 leading-relaxed">{step.content}</p>

                  {step.tips && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">💡 Pro Tips:</h4>
                      <ul className="space-y-1 text-sm text-foreground/80">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.action && (
                    <Button
                      as={Link}
                      href={step.action.href}
                      className="bg-gradient-primary text-primary-foreground px-6 py-3 font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                      {step.action.text}
                      <IconArrowRight size={16} className="ml-2" />
                    </Button>
                  )}
                </div>

                {/* Screenshot */}
                <div className="flex-1 max-w-lg">
                  <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
                    <CardBody className="p-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={step.screenshot}
                          alt={`${step.title} screenshot`}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                          priority={index < 2}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 bg-gradient-subtle">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Help?
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Our community and support team are here to help you succeed
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="font-bold text-foreground mb-2">Discord Community</h3>
                <p className="text-sm text-foreground/70 mb-4">Join thousands of users for real-time help</p>
                <Button
                  as={Link}
                  href="https://discord.gg/AZDtabWFJF"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="bg-gradient-secondary text-secondary-foreground">
                  Join Discord
                </Button>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="font-bold text-foreground mb-2">Documentation</h3>
                <p className="text-sm text-foreground/70 mb-4">Detailed guides and API references</p>
                <Button
                  as={Link}
                  href="https://github.com/asgardex/asgardex-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="bg-gradient-primary text-primary-foreground">
                  View Docs
                </Button>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 sm:col-span-2 lg:col-span-1">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-4">🐛</div>
                <h3 className="font-bold text-foreground mb-2">Report Issues</h3>
                <p className="text-sm text-foreground/70 mb-4">Found a bug? Let us know on GitHub</p>
                <Button
                  as={Link}
                  href="https://github.com/asgardex/asgardex-desktop/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="bordered"
                  className="border-primary text-foreground">
                  Report Bug
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
