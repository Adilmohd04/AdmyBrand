"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  email: string
  rememberMe: boolean
}

// Constants moved outside component for better performance
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_NAME_LENGTH = 3

// Optimized color constants
const NEON_COLORS = {
  cyan: '#00ffff',
  purple: '#ff00ff',
  yellow: '#ffff00',
  green: '#00ff00',
  white: 'rgba(255,255,255,0.2)'
} as const

// Animation configurations
const ANIMATION_CONFIG = {
  floatingOrbs: 12,
  gridMoveSpeed: '20s',
  waveSpeed: ['8s', '10s'],
  pulseSpeed: '1s',
  gradientShift: '2s'
} as const

export default function NeonLogin() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rememberMe: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoized validation for performance
  const nameValid = useMemo(() => formData.name.length >= MIN_NAME_LENGTH, [formData.name])
  const emailValid = useMemo(() => EMAIL_REGEX.test(formData.email), [formData.email])
  const allValid = useMemo(() => nameValid && emailValid && formData.rememberMe, [nameValid, emailValid, formData.rememberMe])

  // Memoized style objects to prevent recreation
  const floatingOrbStyles = useMemo(() => {
    if (!mounted) return []

    return Array.from({ length: ANIMATION_CONFIG.floatingOrbs }, (_, i) => ({
      left: `${10 + (i * 8)}%`,
      top: `${20 + (i % 4) * 20}%`,
      width: `${20 + (i % 3) * 10}px`,
      height: `${20 + (i % 3) * 10}px`,
      background: `radial-gradient(circle, ${Object.values(NEON_COLORS)[i % 4]}40 0%, transparent 70%)`,
      boxShadow: `0 0 ${20 + (i % 3) * 10}px ${Object.values(NEON_COLORS)[i % 4]}60`,
      animationDelay: `${i * 0.5}s`,
      animationDuration: `${6 + (i % 3)}s`,
      animationName: 'float',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite'
    }))
  }, [mounted])

  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (allValid) {
      setIsLoading(true)
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/')
    }
  }, [allValid, router])

  // Memoized input styles for performance
  const nameInputStyle = useMemo(() => ({
    boxShadow: activeField === 'name' || nameValid
      ? '0 0 20px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.1)'
      : 'none'
  }), [activeField, nameValid])

  const emailInputStyle = useMemo(() => ({
    boxShadow: activeField === 'email' || emailValid
      ? '0 0 20px rgba(255,0,255,0.3), inset 0 0 20px rgba(255,0,255,0.1)'
      : 'none'
  }), [activeField, emailValid])

  const rememberMeStyle = useMemo(() => ({
    boxShadow: formData.rememberMe
      ? '0 0 20px rgba(255,255,0,0.3), inset 0 0 20px rgba(255,255,0,0.1)'
      : 'none'
  }), [formData.rememberMe])

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Neon Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-move 20s linear infinite'
          }}
        />

        {/* Animated Waves */}
        <div className="absolute inset-0">
          <div
            className="absolute w-full h-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
              animation: 'wave1 8s ease-in-out infinite'
            }}
          />
          <div
            className="absolute w-full h-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10"
            style={{
              clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
              animation: 'wave2 10s ease-in-out infinite reverse'
            }}
          />
        </div>

        {/* Optimized Floating Orbs */}
        {mounted && (
          <div className="absolute inset-0">
            {floatingOrbStyles.map((style, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={style}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Container */}
          <div className="relative group">
            {/* Outer Neon Glow */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-75 blur-sm animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 4s ease infinite, neon-pulse 2s ease-in-out infinite'
              }}
            />

            {/* Main Card */}
            <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/30 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl relative"
                    style={{
                      background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                      boxShadow: '0 0 30px #00ffff, inset 0 0 30px rgba(255,255,255,0.2)'
                    }}
                  >
                    🚀
                    <div
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, #00ffff, transparent)',
                        animation: 'spin 3s linear infinite'
                      }}
                    />
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 relative">
                  <span
                    className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    style={{
                      textShadow: '0 0 30px rgba(0,255,255,0.5)',
                      animation: 'text-glow 2s ease-in-out infinite alternate'
                    }}
                  >
                    NEON LOGIN
                  </span>
                </h1>
                <p className="text-cyan-300/80 text-sm tracking-wider">ENTER THE DIGITAL REALM</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 bg-transparent border-2 border-cyan-400/30 rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 hover:border-cyan-400/60 focus:border-cyan-400"
                      style={nameInputStyle}
                    />

                    {/* Animated Border */}
                    {(activeField === 'name' || nameValid) && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'border-flow 2s linear infinite',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'xor',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          padding: '2px'
                        }}
                      />
                    )}

                    {/* Success Animation */}
                    {nameValid && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
                          style={{
                            background: 'radial-gradient(circle, #00ff00, #00aa00)',
                            boxShadow: '0 0 15px #00ff00'
                          }}
                        >
                          <span className="text-black font-bold text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Field Label */}
                  <label
                    className="absolute -top-3 left-4 px-2 text-cyan-400 text-sm font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #000, #001122, #000)',
                      textShadow: '0 0 10px #00ffff'
                    }}
                  >
                    USERNAME
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 bg-transparent border-2 border-purple-400/30 rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 hover:border-purple-400/60 focus:border-purple-400"
                      style={emailInputStyle}
                    />

                    {(activeField === 'email' || emailValid) && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, #ff00ff, transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'border-flow 2s linear infinite',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'xor',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          padding: '2px'
                        }}
                      />
                    )}

                    {emailValid && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
                          style={{
                            background: 'radial-gradient(circle, #00ff00, #00aa00)',
                            boxShadow: '0 0 15px #00ff00'
                          }}
                        >
                          <span className="text-black font-bold text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <label
                    className="absolute -top-3 left-4 px-2 text-purple-400 text-sm font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #000, #220011, #000)',
                      textShadow: '0 0 10px #ff00ff'
                    }}
                  >
                    EMAIL
                  </label>
                </div>

                {/* Remember Me */}
                <div className="relative">
                  <div
                    className="flex items-center space-x-4 p-4 border-2 border-yellow-400/30 rounded-2xl cursor-pointer hover:border-yellow-400/60 transition-all duration-300 group"
                    onClick={() => handleInputChange('rememberMe', !formData.rememberMe)}
                    style={rememberMeStyle}
                  >
                    <div className="relative">
                      <div
                        className="w-6 h-6 rounded-lg border-2 border-yellow-400 transition-all duration-300 flex items-center justify-center"
                        style={{
                          background: formData.rememberMe
                            ? 'radial-gradient(circle, #ffff00, #cccc00)'
                            : 'transparent',
                          boxShadow: formData.rememberMe ? '0 0 15px #ffff00' : 'none'
                        }}
                      >
                        {formData.rememberMe && (
                          <span className="text-black font-bold text-sm animate-scale-in">✓</span>
                        )}
                      </div>

                      {formData.rememberMe && (
                        <div
                          className="absolute inset-0 rounded-lg animate-pulse"
                          style={{
                            background: 'radial-gradient(circle, rgba(255,255,0,0.3), transparent)',
                            filter: 'blur(4px)'
                          }}
                        />
                      )}
                    </div>

                    <span className="text-white/90 font-medium">Remember Me</span>

                    {formData.rememberMe && (
                      <div className="ml-auto">
                        <div
                          className="w-3 h-3 rounded-full animate-ping"
                          style={{
                            background: '#ffff00',
                            boxShadow: '0 0 10px #ffff00'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {formData.rememberMe && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #ffff00, transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'border-flow 2s linear infinite',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        padding: '2px'
                      }}
                    />
                  )}
                </div>

                {/* Submit Button */}
                <div className="relative">
                  <button
                    type="submit"
                    disabled={!allValid || isLoading}
                    className="w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 disabled:scale-95 disabled:cursor-not-allowed relative overflow-hidden"
                    style={{
                      background: allValid && !isLoading
                        ? 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)'
                        : 'rgba(255,255,255,0.1)',
                      backgroundSize: '400% 400%',
                      animation: allValid && !isLoading ? 'gradient-shift 3s ease infinite' : 'none',
                      color: allValid && !isLoading ? '#000' : '#ffffff60',
                      textShadow: allValid && !isLoading ? '0 0 10px rgba(0,0,0,0.8)' : 'none',
                      boxShadow: allValid && !isLoading
                        ? '0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(255,0,255,0.3)'
                        : 'none'
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
                        />
                        <span>CONNECTING...</span>
                      </span>
                    ) : allValid ? (
                      <span className="flex items-center justify-center space-x-2">
                        <span>⚡</span>
                        <span>ENTER MATRIX</span>
                        <span>⚡</span>
                      </span>
                    ) : (
                      <span>COMPLETE AUTHENTICATION</span>
                    )}
                  </button>

                  {/* Button Glow Effect */}
                  {allValid && !isLoading && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse"
                      style={{
                        background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 3s ease infinite, button-glow 1s ease-in-out infinite alternate',
                        filter: 'blur(10px)',
                        opacity: 0.6
                      }}
                    />
                  )}
                </div>

                {/* Progress Indicators */}
                {mounted ? (
                  <div className="flex justify-center space-x-4 mt-8">
                    <div
                      className="w-4 h-4 rounded-full transition-all duration-500"
                      style={{
                        background: nameValid ? 'radial-gradient(circle, #00ff00, #00aa00)' : 'rgba(255,255,255,0.2)',
                        boxShadow: nameValid ? '0 0 15px #00ff00' : 'none',
                        animationName: nameValid ? 'pulse-green' : 'none',
                        animationDuration: nameValid ? '1s' : 'none',
                        animationTimingFunction: nameValid ? 'ease-in-out' : 'none',
                        animationIterationCount: nameValid ? 'infinite' : 'none'
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-full transition-all duration-500"
                      style={{
                        background: emailValid ? 'radial-gradient(circle, #ff00ff, #aa00aa)' : 'rgba(255,255,255,0.2)',
                        boxShadow: emailValid ? '0 0 15px #ff00ff' : 'none',
                        animationName: emailValid ? 'pulse-purple' : 'none',
                        animationDuration: emailValid ? '1s' : 'none',
                        animationTimingFunction: emailValid ? 'ease-in-out' : 'none',
                        animationIterationCount: emailValid ? 'infinite' : 'none',
                        animationDelay: '0.2s'
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-full transition-all duration-500"
                      style={{
                        background: formData.rememberMe ? 'radial-gradient(circle, #ffff00, #aaaa00)' : 'rgba(255,255,255,0.2)',
                        boxShadow: formData.rememberMe ? '0 0 15px #ffff00' : 'none',
                        animationName: formData.rememberMe ? 'pulse-yellow' : 'none',
                        animationDuration: formData.rememberMe ? '1s' : 'none',
                        animationTimingFunction: formData.rememberMe ? 'ease-in-out' : 'none',
                        animationIterationCount: formData.rememberMe ? 'infinite' : 'none',
                        animationDelay: '0.4s'
                      }}
                    />
                    <div
                      className="w-5 h-5 rounded-full transition-all duration-500"
                      style={{
                        background: allValid
                          ? 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)'
                          : 'rgba(255,255,255,0.2)',
                        backgroundSize: '400% 400%',
                        animationName: allValid ? 'gradient-shift, pulse-rainbow' : 'none',
                        animationDuration: allValid ? '2s, 0.8s' : 'none',
                        animationTimingFunction: allValid ? 'ease, ease-in-out' : 'none',
                        animationIterationCount: allValid ? 'infinite, infinite' : 'none',
                        boxShadow: allValid ? '0 0 20px rgba(0,255,255,0.8)' : 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center space-x-4 mt-8">
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <div className="w-4 h-4 rounded-full bg-white/20" />
                    <div className="w-5 h-5 rounded-full bg-white/20" />
                  </div>
                )}

                {/* Status Message */}
                {allValid && !isLoading && (
                  <div className="text-center mt-6 animate-fade-in">
                    <p
                      className="text-lg font-bold animate-pulse"
                      style={{
                        background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-shift 2s ease infinite, text-glow 1s ease-in-out infinite alternate',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      ⚡ SYSTEM READY ⚡
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes neon-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes text-glow {
          0% { text-shadow: 0 0 20px rgba(0,255,255,0.5); }
          100% { text-shadow: 0 0 30px rgba(0,255,255,0.8), 0 0 40px rgba(255,0,255,0.3); }
        }
        
        @keyframes button-glow {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes wave1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%); }
          50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%); }
        }
        
        @keyframes wave2 {
          0%, 100% { clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 70%); }
          50% { clip-path: polygon(0 0, 100% 30%, 100% 70%, 0 100%); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 15px #00ff00; }
          50% { box-shadow: 0 0 25px #00ff00, 0 0 35px #00ff00; }
        }
        
        @keyframes pulse-purple {
          0%, 100% { box-shadow: 0 0 15px #ff00ff; }
          50% { box-shadow: 0 0 25px #ff00ff, 0 0 35px #ff00ff; }
        }
        
        @keyframes pulse-yellow {
          0%, 100% { box-shadow: 0 0 15px #ffff00; }
          50% { box-shadow: 0 0 25px #ffff00, 0 0 35px #ffff00; }
        }
        
        @keyframes pulse-rainbow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.3) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}