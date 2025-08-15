"use client"

import React, { useEffect, useRef } from 'react'
import './LightRays/LightRays.css'

interface LightRaysProps {
  raysOrigin?: "top-center" | "top-left" | "top-right" | "center" | "bottom-center"
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
  className?: string
  children?: React.ReactNode
}

export function LightRays({
  raysOrigin = "top-center",
  raysColor = "#00ffff",
  raysSpeed = 1.5,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.05,
  className = "",
  children
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!followMouse) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [followMouse])

  const getOriginStyles = () => {
    switch (raysOrigin) {
      case "top-left":
        return { left: "0%", top: "0%" }
      case "top-right":
        return { right: "0%", top: "0%" }
      case "center":
        return { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
      case "bottom-center":
        return { left: "50%", bottom: "0%", transform: "translateX(-50%)" }
      default:
        return { left: "50%", top: "0%", transform: "translateX(-50%)" }
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Light rays container */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={getOriginStyles()}
      >
        {/* Generate multiple light rays */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30"
            style={{
              left: `${(i / 11) * 100}%`,
              transform: `rotate(${(i - 5.5) * 15}deg)`,
              transformOrigin: 'top',
              color: raysColor,
              animation: `lightRay ${3 / raysSpeed}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Additional scattered rays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`scattered-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-20"
            style={{
              left: `${20 + (i / 7) * 60}%`,
              transform: `rotate(${(i - 3.5) * 25}deg)`,
              transformOrigin: 'top',
              color: raysColor,
              animation: `lightRay ${4 / raysSpeed}s ease-in-out infinite`,
              animationDelay: `${i * 0.3 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Volumetric light effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${raysColor}20 60%, ${raysColor}40 80%, transparent 100%)`
        }}
      />

      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: `noise ${2}s linear infinite`
        }}
      />

      {/* Content */}
      {children}

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes lightRay {
          0%, 100% {
            opacity: 0.1;
            transform: rotate(var(--rotation)) scaleY(0.5);
          }
          50% {
            opacity: 0.6;
            transform: rotate(var(--rotation)) scaleY(1.2);
          }
        }
        
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 10%); }
          80% { transform: translate(-15%, 0%); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  )
}
