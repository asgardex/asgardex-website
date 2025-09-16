import { Button, Image } from '@nextui-org/react'
import Selector from '../ui/Selector'
import Link from 'next/link'
import { getAsgardexReleases } from '../lib/api'
import DownloadChart from '../ui/DownloadChart'
import { Card } from '../ui/Card'
import { IconDownload, IconShield, IconBrandGithub, IconCheck, IconInfoCircle, IconQuestionMark } from '@tabler/icons-react'

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
  const { latest, previous } = await getAsgardexReleases()
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-16 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6 sm:mb-8 text-xs sm:text-sm">
            <IconDownload size={16} className="text-primary sm:w-5 sm:h-5" />
            <span className="font-medium text-foreground/90">Professional Desktop Application</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 text-foreground leading-tight px-2">
            Download{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AsgardEX Desktop
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-8 sm:mb-12 text-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            Get the most advanced cross-chain trading platform for Windows, macOS, and Linux.
            Secure, open-source, and built by the community.
          </p>

          {/* Latest Version Info */}
          {latest && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 inline-block mx-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <IconCheck size={16} className="text-primary sm:w-5 sm:h-5" />
                </div>
                <span className="text-base sm:text-lg font-bold text-foreground">Latest Version: {latest.tag_name}</span>
              </div>
              <p className="text-sm sm:text-base text-foreground/70">Released with enhanced security and performance improvements</p>
            </div>
          )}
        </div>
      </section>

      {/* Download Section */}
      <section className="flex flex-col w-full items-center justify-center px-4 sm:px-6 md:px-16 lg:px-8 py-16 sm:py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6 px-2">
              Choose Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Platform
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
              Download AsgardEX for your operating system and start trading across 12+ blockchains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Windows */}
            <Card className="p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 flex flex-col h-full">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-blue-500/20">
                <Image
                  className="rounded-none dark:invert"
                  src="/windows-black-logo.avif"
                  alt="Windows"
                  width={28}
                  height={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Windows</h3>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">Windows 10 or later</p>
              {latest && (
                <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-6">Version {latest.tag_name}</p>
              )}
              <div className="flex-grow"></div>
              <Button
                as={Link}
                href={latest?.tag_name ? latest.windows.url : latest?.html_url || '#'}
                className="w-full mb-3 sm:mb-4 bg-gradient-primary text-primary-foreground px-4 sm:px-6 py-3 text-sm sm:text-base font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                <IconDownload size={16} className="mr-2 sm:w-5 sm:h-5" />
                Download for Windows
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.windows} />
              )}
            </Card>
            {/* macOS */}
            <Card className="p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 flex flex-col h-full">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gray-500/20">
                <Image
                  className="rounded-none dark:invert"
                  src="/apple-black-logo.png"
                  alt="macOS"
                  width={28}
                  height={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">macOS</h3>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">macOS 10.15 or later</p>
              {latest && (
                <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-6">Version {latest.tag_name}</p>
              )}
              <div className="flex-grow"></div>
              <Button
                as={Link}
                href={latest?.macSequ?.url || latest?.macSon?.url || latest?.macVent?.url || latest?.html_url || '#'}
                className="w-full mb-3 sm:mb-4 bg-gradient-primary text-primary-foreground px-4 sm:px-6 py-3 text-sm sm:text-base font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                <IconDownload size={16} className="mr-2 sm:w-5 sm:h-5" />
                Download for Mac
              </Button>
              <div className="space-y-2">
                {latest && Object.entries({
                  macSequ: 'Sequoia',
                  macSon: 'Sonoma',
                  macVent: 'Ventura'
                }).map(([key, version]) => {
                  const asset = (latest as ReleaseItem)[key]
                  return (typeof asset === 'object' && asset?.url) && (
                    <Button
                      key={key}
                      as={Link}
                      href={asset.url}
                      size="sm"
                      variant="bordered"
                      className="w-full text-xs">
                      {version}
                    </Button>
                  )
                })}
              </div>
            </Card>

            {/* Linux */}
            <Card className="p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 flex flex-col h-full">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-orange-500/20">
                <Image
                  className="rounded-none dark:invert"
                  src="/linux-black-logo.avif"
                  alt="Linux"
                  width={28}
                  height={28}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Linux</h3>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">Ubuntu 18.04 or later</p>
              {latest && (
                <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-6">Version {latest.tag_name}</p>
              )}
              <div className="flex-grow"></div>
              <Button
                as={Link}
                href={latest?.linux?.url || latest?.html_url || '#'}
                className="w-full mb-3 sm:mb-4 bg-gradient-primary text-primary-foreground px-4 sm:px-6 py-3 text-sm sm:text-base font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                <IconDownload size={16} className="mr-2 sm:w-5 sm:h-5" />
                Download for Linux
              </Button>
              {previous && (
                <Selector label="Previous Versions" items={previous.linux} />
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* System Requirements Section */}
      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              System{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Requirements
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Ensure your system meets the minimum requirements for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20 mr-4">
                  <Image src="/windows-black-logo.avif" alt="Windows" width={32} height={32} className="dark:invert" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Windows</h3>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />Windows 10 (64-bit) or later</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />4GB RAM minimum</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />2GB available storage</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />Internet connection required</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gray-500/20 mr-4">
                  <Image src="/apple-black-logo.png" alt="macOS" width={32} height={32} className="dark:invert" />
                </div>
                <h3 className="text-xl font-bold text-foreground">macOS</h3>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />macOS 10.15 (Catalina) or later</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />4GB RAM minimum</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />2GB available storage</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />Intel or Apple Silicon</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-orange-500/20 mr-4">
                  <Image src="/linux-black-logo.avif" alt="Linux" width={32} height={32} className="dark:invert" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Linux</h3>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />Ubuntu 18.04 or equivalent</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />4GB RAM minimum</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />2GB available storage</li>
                <li className="flex items-center"><IconCheck size={16} className="text-primary mr-2" />GTK 3.0 or later</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Verification Section */}
      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Security{' '}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Verification
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              All releases are cryptographically signed and can be verified for authenticity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-primary/20 mr-4">
                  <IconShield size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Signed Binaries</h3>
              </div>
              <p className="text-foreground/80 mb-6">All downloads are cryptographically signed to ensure integrity and authenticity.</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• SHA256 checksums provided</li>
                <li>• GPG signatures available</li>
                <li>• Code signing certificates</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-secondary/20 mr-4">
                  <IconBrandGithub size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Open Source</h3>
              </div>
              <p className="text-foreground/80 mb-6">Full source code is available for review and audit by the community.</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• MIT licensed</li>
                <li>• Community audited</li>
                <li>• Transparent development</li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as={Link}
                href="https://github.com/asgardex/asgardex-desktop/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary text-primary-foreground px-8 py-4 font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300">
                <IconBrandGithub size={20} className="mr-2" />
                View Releases & Signatures
              </Button>
              <Button
                as={Link}
                href="https://github.com/asgardex/asgardex-desktop/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary bg-transparent rounded-lg px-8 py-4 font-bold text-foreground hover:bg-primary/10 hover:border-primary/80 hover:shadow-glow-blue transition-all duration-300">
                <IconInfoCircle size={20} className="mr-2" />
                Report Issues
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-20">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Frequently Asked{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Get answers to common questions about installation and usage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/20 mt-1">
                  <IconQuestionMark size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Is AsgardEX safe to use?</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    Yes, AsgardEX is 100% open-source, community-audited, and uses industry-standard security practices.
                    Your keys remain local and are never shared with external services.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-secondary/20 mt-1">
                  <IconQuestionMark size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">macOS won&apos;t let me open the app</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    Go to System Preferences → Security & Privacy → General, then click &quot;Open Anyway&quot; next to the blocked app message.
                    This is normal for apps downloaded outside the App Store.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/20 mt-1">
                  <IconQuestionMark size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Do I need to create an account?</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    No! AsgardEX is completely decentralized. You can create or import wallets locally without any registration or KYC requirements.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-secondary/20 mt-1">
                  <IconQuestionMark size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">What are the fees?</h3>
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    AsgardEX charges a 0.3% affiliate fee only on swaps over $1,001.
                    Liquidity provision and smaller swaps have no additional fees beyond network costs.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Analytics Section */}
      <section className="flex flex-col w-full items-center justify-center px-6 md:px-16 lg:px-8 py-20 bg-gradient-subtle">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Download{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Analytics
              </span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Track AsgardEX adoption across different operating systems and releases over time
            </p>
          </div>
          <DownloadChart variant="area" height={400} showStats={true} />
        </div>
      </section>
    </main>
  )
}
