"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/ThemeProvider"
import { useEffect, useState } from "react"

interface BackgroundProps {
  variant?: "gradient" | "particles" | "waves" | "geometric" | "aurora" | "mesh" | "liquid"
  intensity?: "low" | "medium" | "high"
  colors?: string[]
  className?: string
  children?: React.ReactNode
}

// Animated Gradient Background
export function GradientBackground({ 
  intensity = "medium", 
  colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
  className = "" 
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const intensityMap = {
    low: isDark ? "opacity-20" : "opacity-60",
    medium: isDark ? "opacity-40" : "opacity-80", 
    high: isDark ? "opacity-60" : "opacity-90"
  }

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div
        className={`absolute inset-0 ${intensityMap[intensity]}`}
        style={{
          backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
          backgroundSize: "400% 400%",
          backgroundPosition: "0% 50%"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Overlay orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-purple-500/20" : "bg-purple-400/40"
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: isDark ? [0.3, 0.6, 0.3] : [0.4, 0.7, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-blue-500/20" : "bg-blue-400/40"
        }`}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: isDark ? [0.4, 0.7, 0.4] : [0.5, 0.8, 0.5],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// Generate deterministic particle positions
const generateParticlePositions = (count: number, colors: string[]) => {
  const positions = []
  for (let i = 0; i < count; i++) {
    positions.push({
      id: i,
      size: (i * 0.3) % 4 + 2, // Deterministic size
      x: (i * 7.891) % 100, // Deterministic positioning
      y: (i * 5.263) % 100,
      color: colors[i % colors.length],
      duration: 15 + (i % 5) * 2,
      delay: i * 0.25
    })
  }
  return positions
}

// Floating Particles Background
export function ParticlesBackground({ 
  intensity = "medium",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  className = ""
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const particleCount = {
    low: 15,
    medium: 25,
    high: 40
  }
  
  const count = particleCount[intensity]

  const particles = generateParticlePositions(count, colors)

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: isDark ? 0.6 : 0.8
          }}
          animate={{
            y: [0, -100, 0],
            opacity: isDark ? [0, 1, 0] : [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Generate deterministic shape positions
const generateShapePositions = (count: number, colors: string[]) => {
  const shapes = []
  const shapeTypes = ['circle', 'square', 'triangle']
  
  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      size: (i * 15) % 200 + 100, // Deterministic size
      x: (i * 8.333) % 100, // Deterministic positioning
      y: (i * 6.789) % 100,
      rotation: (i * 30) % 360,
      color: colors[i % colors.length],
      shape: shapeTypes[i % shapeTypes.length]
    })
  }
  return shapes
}

// Geometric Shapes Background
export function GeometricBackground({ 
  intensity = "medium",
  colors = ["#667eea", "#764ba2", "#f093fb"],
  className = ""
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const shapeCount = {
    low: 8,
    medium: 12,
    high: 18
  }
  
  const count = shapeCount[intensity]

  const shapes = generateShapePositions(count, colors)

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute blur-2xl ${
            isDark ? "opacity-10" : "opacity-20"
          }`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            backgroundColor: shape.color,
            borderRadius: shape.shape === 'circle' ? '50%' : shape.shape === 'square' ? '0%' : '0%',
            clipPath: shape.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + (shape.id % 5) * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Mesh Gradient Background
export function MeshBackground({ 
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"],
  className = ""
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${isDark ? "opacity-30" : "opacity-70"}`}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 40% 20%, ${colors[0]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 80% 0%, ${colors[1]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 0% 50%, ${colors[2]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 80% 50%, ${colors[3]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 0% 100%, ${colors[4]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 80% 100%, ${colors[0]}${isDark ? '40' : '60'} 0px, transparent 50%),
              radial-gradient(at 0% 0%, ${colors[1]}${isDark ? '40' : '60'} 0px, transparent 50%)
            `
          }}
        />
      </div>
      
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            `radial-gradient(at 40% 20%, ${colors[0]}${isDark ? '30' : '50'} 0px, transparent 50%)`,
            `radial-gradient(at 60% 40%, ${colors[1]}${isDark ? '30' : '50'} 0px, transparent 50%)`,
            `radial-gradient(at 40% 20%, ${colors[0]}${isDark ? '30' : '50'} 0px, transparent 50%)`
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// Wave Animation Background
export function WaveBackground({ 
  colors = ["#667eea", "#764ba2"],
  className = ""
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className={`absolute inset-0 w-full h-full ${
          isDark ? "opacity-20" : "opacity-60"
        }`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z"
          fill="url(#waveGradient)"
          animate={{
            d: [
              "M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z",
              "M0,300 C300,500 600,100 1200,300 L1200,800 L0,800 Z",
              "M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z"
          fill={colors[1]}
          fillOpacity={isDark ? "0.5" : "0.7"}
          animate={{
            d: [
              "M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z",
              "M0,600 C400,400 800,200 1200,600 L1200,800 L0,800 Z",
              "M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  )
}

// Liquid Chrome-inspired Background
export function LiquidBackground({ 
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  className = ""
}: BackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Animated liquid blobs */}
      <motion.div
        className={`absolute top-0 left-0 w-full h-full ${
          isDark ? "opacity-30" : "opacity-70"
        }`}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${colors[0]}60 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors[1]}60 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${colors[2]}60 0%, transparent 50%)
          `,
          filter: "blur(40px)"
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, ${colors[0]}60 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${colors[1]}60 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, ${colors[2]}60 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 80%, ${colors[1]}60 0%, transparent 50%),
             radial-gradient(circle at 20% 20%, ${colors[2]}60 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, ${colors[0]}60 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 80%, ${colors[0]}60 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${colors[1]}60 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, ${colors[2]}60 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 100 + i * 20,
            height: 100 + i * 20,
            background: `linear-gradient(45deg, ${colors[i % colors.length]}40, ${colors[(i + 1) % colors.length]}40)`,
            filter: "blur(20px)",
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: isDark ? [0.3, 0.6, 0.3] : [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </div>
  )
}

// Main Enhanced Background Component
export function EnhancedBackground({ 
  variant = "gradient",
  intensity = "medium",
  colors,
  className = "",
  children
}: BackgroundProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const backgroundComponents = {
    gradient: GradientBackground,
    particles: ParticlesBackground,
    waves: WaveBackground,
    geometric: GeometricBackground,
    mesh: MeshBackground,
    aurora: GradientBackground, // Fallback to gradient for aurora
    liquid: LiquidBackground
  }
  
  const BackgroundComponent = backgroundComponents[variant]
  
  return (
    <div className={`relative ${className}`}>
      {mounted && (
        <BackgroundComponent 
          intensity={intensity}
          colors={colors}
        />
      )}
      {children}
    </div>
  )
}