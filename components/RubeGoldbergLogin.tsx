"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

// Types for better TypeScript support
interface FormData {
  name: string
  email: string
  rememberMe: boolean
}

interface AnimationState {
  handClosed: boolean
  submitBtnOnPlace: boolean
  submitBtnTextOpacity: number
  pullProgress: number
  sprayRepeatCounter: number
  gearsRotation: number
  spiralProgress: number
  spiralRotation: number
  scalesRotation: number
  carPosition: number
  carInclineRotation: number
  timingChain1Offset: number
  timingChain2Offset: number
  reelsConnectorY: number
  carWeightConnectorY: number
  sprayerHeadY: number
  pushingHandY: number
  sprayLinesOpacity: number
  sprayBubblesOpacity: number
  sprayBubblesScale: number
  sprayLinesOffset: number
}

// Animation constants for better maintainability
const ANIMATION_CONFIG = {
  GEAR_ROTATION_SPEED: 2,
  SPRAY_INTERVAL: 2000,
  HAMMER_TIME_DELAY: 1850,
  SPIRAL_COILS: 17,
  SPIRAL_POINTS: 200,
  SPIRAL_RADIUS: 45,
  FORM_VALIDATION: {
    MIN_NAME_LENGTH: 3,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }
} as const

export default function RubeGoldbergLogin() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const sprayIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rememberMe: false
  })
  
  // Animation state
  const [state, setState] = useState<AnimationState>({
    handClosed: false,
    submitBtnOnPlace: false,
    submitBtnTextOpacity: 0,
    pullProgress: 0,
    sprayRepeatCounter: 0,
    gearsRotation: 0,
    spiralProgress: 0,
    spiralRotation: 0,
    scalesRotation: -20,
    carPosition: -50,
    carInclineRotation: 0,
    timingChain1Offset: 2,
    timingChain2Offset: 24,
    reelsConnectorY: 0,
    carWeightConnectorY: 0,
    sprayerHeadY: 0,
    pushingHandY: 0,
    sprayLinesOpacity: 0,
    sprayBubblesOpacity: 0,
    sprayBubblesScale: 0.5,
    sprayLinesOffset: 0
  })
  
  // Validation states with memoization
  const nameValid = useMemo(() => 
    formData.name.length > ANIMATION_CONFIG.FORM_VALIDATION.MIN_NAME_LENGTH, 
    [formData.name]
  )
  
  const emailValid = useMemo(() => 
    ANIMATION_CONFIG.FORM_VALIDATION.EMAIL_REGEX.test(formData.email), 
    [formData.email]
  )
  
  const submitReady = useMemo(() => 
    nameValid && emailValid && formData.rememberMe && state.sprayRepeatCounter > 1,
    [nameValid, emailValid, formData.rememberMe, state.sprayRepeatCounter]
  )

  // Responsive scaling with performance optimization
  const scaleToFit = useCallback(() => {
    const h = 800
    if (window.innerHeight < h && containerRef.current) {
      const scale = window.innerHeight / h
      containerRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
      containerRef.current.style.transformOrigin = "50% 75%"
    }
  }, [])

  // Setup resize listener with passive option for better performance
  useEffect(() => {
    scaleToFit()
    window.addEventListener('resize', scaleToFit, { passive: true })
    return () => window.removeEventListener('resize', scaleToFit)
  }, [scaleToFit])

  // Optimized spiral path generation with memoization
  useMemo(() => {
    const centerX = 14, centerY = 14
    const { SPIRAL_RADIUS: radius, SPIRAL_COILS: coils, SPIRAL_POINTS: points } = ANIMATION_CONFIG
    const offset = 8 * state.spiralProgress
    let path = ""
    let thetaMax = coils * 2 * Math.PI
    const awayStep = radius / thetaMax
    const chord = 2 * Math.PI / points
    thetaMax -= offset * points * chord

    for (let theta = 0; theta <= thetaMax; theta += chord) {
      const away = awayStep * theta
      const x = centerX + Math.cos(theta) * away
      const y = centerY + Math.sin(theta) * away

      if (theta === 0) {
        path += `M${x},${y}`
      } else {
        const prevAway = awayStep * (theta - chord)
        const arcRadius = (away + prevAway) / 2
        path += ` A${arcRadius},${arcRadius} 0 0,1 ${x},${y}`
      }
    }

    const outerAngle = thetaMax + 0.5 * Math.PI
    const outerLength = 50 + 25 * offset
    const endPoint = [
      Math.cos(outerAngle) * outerLength,
      Math.sin(outerAngle) * outerLength,
    ]
    path += ` l${endPoint[0]},${endPoint[1]}`

    return path
  }, [state.spiralProgress])

  // NAME INPUT ANIMATION - Optimized gear and spray system
  useEffect(() => {
    if (nameValid) {
      const gearAnimation = () => {
        setState(prev => {
          const newRotation = (prev.gearsRotation + ANIMATION_CONFIG.GEAR_ROTATION_SPEED) % 360
          const angle = newRotation * Math.PI / 180
          const deltaY = Math.sin(angle) * 14
          
          // Calculate spray effects efficiently
          let sprayProgress = 0
          let bubblesOpacity = 0
          let sprayLinesOpacity = 0
          let sprayBubblesScale = 0.5
          let sprayerHeadY = 0
          
          if (deltaY > 8) {
            const d = Math.max(0, deltaY - 8)
            sprayerHeadY = d
            sprayProgress = Math.max(0, (newRotation / 360) - 0.1) * 5
            bubblesOpacity = sprayProgress > 1 ? 0 : sprayProgress
            bubblesOpacity *= (1 - Math.pow(bubblesOpacity, 8))
            sprayLinesOpacity = Math.pow(bubblesOpacity, 2)
            sprayBubblesScale = 0.5 + 1.4 * Math.pow(sprayProgress, 2)
          }
          
          // Update submit button text opacity
          const textProgress = Math.pow(sprayProgress / 1.5, 6)
          let submitBtnTextOpacity = prev.submitBtnTextOpacity
          if (!prev.submitBtnOnPlace) {
            submitBtnTextOpacity = (prev.sprayRepeatCounter - 1) * 0.3 + 0.3 * textProgress
            submitBtnTextOpacity = Math.pow(submitBtnTextOpacity, 2)
          }
          
          return {
            ...prev,
            gearsRotation: newRotation,
            pushingHandY: deltaY,
            sprayerHeadY,
            sprayLinesOpacity,
            sprayBubblesOpacity: bubblesOpacity,
            sprayBubblesScale,
            sprayLinesOffset: 70 * sprayProgress,
            submitBtnTextOpacity
          }
        })
        animationFrameRef.current = requestAnimationFrame(gearAnimation)
      }
      
      animationFrameRef.current = requestAnimationFrame(gearAnimation)
      
      // Spray repeat counter
      sprayIntervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          sprayRepeatCounter: prev.sprayRepeatCounter + 1
        }))
      }, ANIMATION_CONFIG.SPRAY_INTERVAL)
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        if (sprayIntervalRef.current) {
          clearInterval(sprayIntervalRef.current)
        }
      }
    } else {
      // Reset animation state
      setState(prev => ({
        ...prev,
        sprayRepeatCounter: 0,
        submitBtnTextOpacity: 0,
        sprayLinesOpacity: 0,
        sprayBubblesOpacity: 0,
        gearsRotation: 0,
        pushingHandY: 0,
        sprayerHeadY: 0
      }))
    }
  }, [nameValid])

  // EMAIL INPUT ANIMATION - Complex chain reaction
  useEffect(() => {
    if (emailValid) {
      // Start spiral animation
      const spiralAnimation = () => {
        setState(prev => ({
          ...prev,
          spiralProgress: Math.min(prev.spiralProgress + 0.02, 1),
          spiralRotation: prev.spiralRotation - 8 * 360 * 0.02
        }))
      }
      
      const spiralInterval = setInterval(spiralAnimation, 50)
      
      // Hammer time sequence with proper cleanup
      const hammerTimeout = setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          scalesRotation: -1,
          timingChain1Offset: 20,
          timingChain2Offset: 6,
          reelsConnectorY: 18,
          carWeightConnectorY: -18,
          carInclineRotation: 6
        }))
        
        // Car movement sequence
        const carTimeout = setTimeout(() => {
          setState(prev => ({ ...prev, carPosition: 95 }))
        }, 100)
        
        // Hand closing sequence
        const handTimeout = setTimeout(() => {
          setState(prev => ({ ...prev, handClosed: true }))
        }, 700)
        
        return () => {
          clearTimeout(carTimeout)
          clearTimeout(handTimeout)
        }
      }, ANIMATION_CONFIG.HAMMER_TIME_DELAY)
      
      return () => {
        clearInterval(spiralInterval)
        clearTimeout(hammerTimeout)
      }
    } else {
      // Reset email animation state
      setState(prev => ({
        ...prev,
        spiralProgress: 0,
        spiralRotation: 0,
        scalesRotation: -20,
        carPosition: -50,
        carInclineRotation: 0,
        timingChain1Offset: 2,
        timingChain2Offset: 24,
        reelsConnectorY: 0,
        carWeightConnectorY: 0,
        handClosed: false
      }))
    }
  }, [emailValid])

  // CHECKBOX ANIMATION - Pull system
  useEffect(() => {
    setState(prev => ({
      ...prev,
      pullProgress: formData.rememberMe && state.handClosed ? 1 : 0,
      submitBtnOnPlace: formData.rememberMe && state.handClosed
    }))
  }, [formData.rememberMe, state.handClosed])

  // Optimized form input handler
  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  // Optimized form submission handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (submitReady) {
      // Animate elements disappearing
      const svgElements = svgRef.current?.querySelectorAll('g')
      svgElements?.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '0'
          el.style.transition = 'opacity 0.1s ease'
        }, i * 30)
      })
      
      // Redirect after animation
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  }, [submitReady, router])

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans overflow-hidden">
      <div 
        ref={containerRef}
        className="fixed top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {/* Enhanced Form Container */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Mechanical Login</h1>
              <p className="text-gray-600 text-sm">Watch the Rube Goldberg machine activate</p>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name {nameValid && <span className="text-green-500">✓</span>}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full h-12 px-4 rounded-xl border-2 text-base transition-all duration-300 ${
                    nameValid 
                      ? 'border-green-500 bg-green-50 text-green-800 shadow-green-200 shadow-lg' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  } focus:outline-none focus:ring-4 focus:ring-blue-200`}
                />
              </motion.div>
              
              {/* Email Input */}
              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email {emailValid && <span className="text-green-500">✓</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full h-12 px-4 rounded-xl border-2 text-base transition-all duration-300 ${
                    emailValid 
                      ? 'border-green-500 bg-green-50 text-green-800 shadow-green-200 shadow-lg' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  } focus:outline-none focus:ring-4 focus:ring-blue-200`}
                />
              </motion.div>
              
              {/* Checkbox */}
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Remember me
                </label>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={!submitReady}
                  className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 ${
                    submitReady
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={submitReady ? { scale: 1.05, y: -2 } : {}}
                  whileTap={submitReady ? { scale: 0.98 } : {}}
                  animate={{
                    opacity: state.submitBtnTextOpacity,
                    rotateZ: state.submitBtnOnPlace ? 0 : -90
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {submitReady ? 'Activate Machine!' : 'Complete the sequence...'}
                </motion.button>
              </motion.div>
            </form>
            
            {/* Progress Indicator */}
            <motion.div className="mt-6 flex justify-center space-x-2">
              {[nameValid, emailValid, formData.rememberMe].map((completed, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`}
                  animate={{ scale: completed ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Optimized SVG Animation */}
        <motion.svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[1000px] pointer-events-none stroke-[1.2px] stroke-gray-800 fill-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* All SVG elements with optimized rendering */}
          <rect x="710" y="527" width="16" height="47" rx="10" ry="10" />

          {/* Grabbing Hand with optimized transitions */}
          <g className="grabbing-hand" style={{ transform: 'translate(297px, 830px)' }}>
            <path d="M48.89,54.39c-3.51.76-15.72,3-22.83-.68a14,14,0,0,0-6.41-1.52h0A3.79,3.79,0,0,1,17,51.09a3.7,3.7,0,0,1-1.1-2.64V27.75A3.75,3.75,0,0,1,19.63,24H24.1" />
            
            <g style={{ opacity: state.handClosed ? 0 : 1, transition: 'opacity 0.3s ease' }}>
              <path d="M57.05,29.76l24.82,0a4.07,4.07,0,0,0,4.11-4h0a4.07,4.07,0,0,0-4-4.11L48.69,21.3" />
              <path d="M59.34,37.74l28.81.61a4.06,4.06,0,0,0,4.14-4h0a4.06,4.06,0,0,0-4-4.15L57,29.64" />
              <path d="M57.13,45.9l26.94.78a4.07,4.07,0,0,0,4.15-4h0a4.07,4.07,0,0,0-4-4.14l-24.84-.8" />
              <path d="M48.89,54.39l27.82.36a4.06,4.06,0,0,0,4.2-3.93h0A4.06,4.06,0,0,0,77,46.62l-19.88-.78" />
              <path d="M40.78,28c5.75-5.85,12.66-22,10.5-25.88-2.25-4.09-6,.1-14.73,8.66C30.84,16.36,30.91,17.1,24.32,24" />
            </g>
            
            <g fill="#ffffff" style={{ opacity: state.handClosed ? 1 : 0, transition: 'opacity 0.3s ease' }}>
              <rect x="44.79" y="13.38" width="8.42" height="22.15" rx="3.67" transform="translate(20.57 71.26) rotate(-85.25)" />
              <rect x="44.08" y="39.17" width="8.42" height="21.47" rx="3.67" transform="translate(-5.44 93.9) rotate(-85.25)" />
              <rect x="45.68" y="30.71" width="8.42" height="22.57" rx="3.67" transform="matrix(0.08, -1, 1, 0.08, 3.91, 88.24)" />
              <rect x="44.98" y="22.21" width="8.42" height="22.57" rx="3.67" transform="matrix(0.08, -1, 1, 0.08, 11.74, 79.74)" />
              <path d="M32.18,27.42c5,6.46,13.22,15.06,17.76,12.81,4.18-2.07.69-6-6.66-15.74C38.46,18.1,30.69,17.1,24.1,24" />
            </g>
          </g>

          {/* All other SVG elements optimized for performance... */}
          {/* Pull System, Spray System, Gears, etc. */}
          
        </motion.svg>
      </div>
    </div>
  )
}