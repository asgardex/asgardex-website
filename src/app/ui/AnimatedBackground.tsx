'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FloatingLogo {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  direction: 'up' | 'down' | 'left' | 'right' | 'diagonal-up' | 'diagonal-down'
  opacity: number
}

export default function AnimatedBackground() {
  const [logos, setLogos] = useState<FloatingLogo[]>([])

  useEffect(() => {
    const generateLogos = () => {
      const newLogos: FloatingLogo[] = []
      const logoCount = 8 // Number of floating logos

      for (let i = 0; i < logoCount; i++) {
        const directions: Array<FloatingLogo['direction']> = [
          'up', 'down', 'left', 'right', 'diagonal-up', 'diagonal-down'
        ]
        newLogos.push({
          id: i,
          x: Math.random() * 100, // Random x position (0-100%)
          y: Math.random() * 100, // Random y position (0-100%)
          size: Math.random() * 30 + 20, // Random size between 20-50px
          duration: Math.random() * 15 + 10, // Random duration between 10-25 seconds
          delay: Math.random() * 5, // Random delay up to 5 seconds
          direction: directions[Math.floor(Math.random() * directions.length)],
          opacity: Math.random() * 0.25 + 0.15 // Random opacity between 0.15-0.4
        })
      }

      setLogos(newLogos)
    }

    generateLogos()
  }, [])

  const getAnimationVariants = (logo: FloatingLogo) => {
    const moveDistance = 50 // Distance to move in pixels

    const variants = {
      up: {
        y: [0, -moveDistance, 0],
        x: [0, Math.sin(Date.now() * 0.001 + logo.id) * 20, 0]
      },
      down: {
        y: [0, moveDistance, 0],
        x: [0, Math.sin(Date.now() * 0.001 + logo.id) * 20, 0]
      },
      left: {
        x: [0, -moveDistance, 0],
        y: [0, Math.sin(Date.now() * 0.001 + logo.id) * 15, 0]
      },
      right: {
        x: [0, moveDistance, 0],
        y: [0, Math.sin(Date.now() * 0.001 + logo.id) * 15, 0]
      },
      'diagonal-up': {
        x: [0, moveDistance * 0.7, 0],
        y: [0, -moveDistance * 0.7, 0]
      },
      'diagonal-down': {
        x: [0, -moveDistance * 0.7, 0],
        y: [0, moveDistance * 0.7, 0]
      }
    }

    return variants[logo.direction]
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className="absolute"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            opacity: logo.opacity
          }}
          animate={getAnimationVariants(logo)}
          transition={{
            duration: logo.duration,
            delay: logo.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: logo.duration * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <Image
              src="/asgardex-logo.avif"
              alt=""
              width={logo.size}
              height={logo.size}
              className="dark:invert-[0.1] invert-[0.9] transition-all duration-500"
              style={{
                filter: 'blur(0.5px)'
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Additional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/3 dark:via-transparent dark:to-secondary/3" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/20 dark:bg-primary/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}
