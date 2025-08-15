"use client"

import { useEffect, useRef, useState } from 'react'

interface AuroraProps {
  colorStops?: string[]
  blend?: number
  amplitude?: number
  speed?: number
  className?: string
}

export function Aurora({ 
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"], 
  blend = 0.5, 
  amplitude = 1.0, 
  speed = 0.5,
  className = ""
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
    const canvas = canvasRef.current
    if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size
      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      let time = 0
      const animate = () => {
        time += speed * 0.02
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Create aurora effect using 2D canvas
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, colorStops[0] || '#3A29FF')
        gradient.addColorStop(0.5, colorStops[1] || '#FF94B4')
        gradient.addColorStop(1, colorStops[2] || '#FF3232')
        
        ctx.fillStyle = gradient
        ctx.globalAlpha = blend * 0.6
        
        // Draw flowing aurora shapes
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(0, canvas.height)
          
          for (let x = 0; x <= canvas.width; x += 10) {
            const y = canvas.height * 0.3 + 
                     Math.sin(x * 0.01 + time + i * 2) * 50 * amplitude +
                     Math.sin(x * 0.02 + time * 0.5) * 30 * amplitude
            ctx.lineTo(x, y)
          }
          
          ctx.lineTo(canvas.width, canvas.height)
          ctx.closePath()
          ctx.fill()
        }
        
        animationIdRef.current = requestAnimationFrame(animate)
      }

      animate()

    // Cleanup
    return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
      }
        window.removeEventListener('resize', resizeCanvas)
      }
    } catch (error) {
      console.error('Error initializing Aurora component:', error)
      }
  }, [isClient, colorStops, blend, amplitude, speed])

  if (!isClient) {
    return null
    }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        mixBlendMode: 'screen',
        pointerEvents: 'none'
      }}
    />
  )
}
