"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight, Sparkles, Star, Rocket } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { Aurora } from "@/components/ui/aurora"

// TypeScript declaration for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      init: () => void;
      isInitialized: boolean;
    };
  }
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)
  const [unicornStudioLoaded, setUnicornStudioLoaded] = useState(true)

  useEffect(() => {
    setIsClient(true)
    console.log('Hero component mounted, checking UnicornStudio availability...')
  }, [])

  // Initialize UnicornStudio when component mounts
  useEffect(() => {
    if (!isClient) return

    // Inject UnicornStudio script dynamically
    const injectUnicornStudio = () => {
      if (!window.UnicornStudio) {
        console.log('Injecting UnicornStudio script...')
        
        // Create and inject the script
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
        script.async = true
        
                        script.onload = () => {
                  console.log('UnicornStudio script loaded successfully')
                  // Wait for DOM to be ready, then initialize
                  setTimeout(() => {
                    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                      try {
                        console.log('Initializing UnicornStudio after script load...')
                        window.UnicornStudio.init()
                        window.UnicornStudio.isInitialized = true
                        console.log('UnicornStudio initialized successfully')
                        
                        // Check if content actually rendered
                        setTimeout(() => {
                          const container = document.getElementById('unicorn-studio-container')
                          if (container && container.children.length > 0) {
                            console.log('UnicornStudio content rendered successfully')
                            setUnicornStudioLoaded(true)
                          } else {
                            console.log('Container is empty, retrying initialization...')
                            // Retry initialization
                            if (window.UnicornStudio) {
                              window.UnicornStudio.init()
                            }
                          }
                        }, 1000)
                        
                      } catch (error) {
                        console.error('Error initializing UnicornStudio:', error)
                      }
                    }
                  }, 500) // Wait 500ms for DOM to be ready
                }
        
        script.onerror = () => {
          console.error('Failed to load UnicornStudio script')
        }
        
        document.head.appendChild(script)
      } else if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        // If script is already loaded but not initialized
        try {
          console.log('Initializing existing UnicornStudio...')
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
          console.log('UnicornStudio initialized successfully')
          setUnicornStudioLoaded(true)
        } catch (error) {
          console.error('Error initializing UnicornStudio:', error)
        }
      }
    }

    // Wait for DOM to be fully ready, then inject
    const timer = setTimeout(() => {
      injectUnicornStudio()
    }, 200)

    return () => clearTimeout(timer)
  }, [isClient])



  return (
    <section 
      ref={containerRef} 
      className={`relative min-h-screen overflow-hidden flex items-center pt-20 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" 
          : "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      }`}
    >
      {/* Enhanced Background with Aurora Effect */}
      <div className={`absolute inset-0 -z-10 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-950/90 via-purple-950/40 to-slate-950/90" 
          : "bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80"
      }`} />
      
      {/* Aurora Background Effect */}
      {isClient && (
      <Aurora 
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.3}
        amplitude={0.8}
        speed={0.3}
        className="opacity-60"
      />
      )}
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12 relative z-10">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left: Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced Badge with Sparkles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/30 text-white/90 mb-6 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                AI-Powered Marketing Suite
              </span>
              <Star className="w-4 h-4 text-blue-300" />
            </motion.div>

            {/* Enhanced Headline with Advanced Text Animations */}
            <div className="mb-6">
              {/* Main Headline with Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-white">
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 100, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="block"
              >
                The all-in-one
                    </motion.span>
                  </span>
                </h1>
              </motion.div>

              {/* AI-Powered Marketing Suite with Glowing Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="mb-4"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                  <span className="relative">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                  AI-powered marketing suite
                </span>
                    {/* Glowing effect */}
                    <motion.div
                      className={`absolute inset-0 blur-2xl ${
                        theme === "dark" 
                          ? "bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20" 
                          : "bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
                      }`}
                      animate={{
                        opacity: theme === "dark" ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </span>
                </h2>
              </motion.div>

              {/* Subtitle with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="mb-4"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                  <span className="relative">
                    <span className="text-white/90">
                      to supercharge your brand&apos;s growth
                    </span>
                    {/* Animated underline */}
                    <motion.div
                      className={`absolute -bottom-2 left-0 h-1 rounded-full ${
                        theme === "dark" 
                          ? "bg-gradient-to-r from-blue-400 to-purple-400" 
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    />
                  </span>
                </h3>
              </motion.div>
            </div>

            {/* Enhanced Subtitle with Better Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8 max-w-3xl"
            >
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-medium mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent font-semibold">
                  Automate campaigns, unlock insights, and drive results
                </span>
              </motion.p>
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/70 font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                with our intelligent marketing platform powered by cutting-edge AI technology.
            </motion.p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="whitespace-nowrap">Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`group px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 backdrop-blur-md transition-all duration-300 shadow-xl ${
                  theme === "dark" 
                    ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50" 
                    : "border-gray-300 text-gray-800 hover:bg-gray-100/50 hover:border-gray-400"
                }`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-300" />
                <span className="whitespace-nowrap">Watch Demo</span>
              </Button>
            </motion.div>

            {/* Enhanced Stats with Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6"
            >
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`backdrop-blur-md transition-all duration-300 ${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/20 hover:border-white/40" 
                    : "bg-gradient-to-br from-blue-200/30 to-purple-200/30 border-gray-300/30 hover:border-gray-400/50"
                }`}>
                  <CardContent className="p-2 sm:p-4 lg:p-6">
                    <div className={`text-lg sm:text-2xl lg:text-4xl font-black mb-1 sm:mb-2 transition-colors duration-300 ${
                      theme === "dark" 
                        ? "text-white group-hover:text-blue-300" 
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}>10K+</div>
                    <div className={`text-xs sm:text-sm font-medium ${
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}>Active Users</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`backdrop-blur-md transition-all duration-300 ${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/20 hover:border-white/40" 
                    : "bg-gradient-to-br from-purple-200/30 to-pink-200/30 border-gray-300/30 hover:border-gray-400/50"
                }`}>
                  <CardContent className="p-2 sm:p-4 lg:p-6">
                    <div className={`text-lg sm:text-2xl lg:text-4xl font-black mb-1 sm:mb-2 transition-colors duration-300 ${
                      theme === "dark" 
                        ? "text-white group-hover:text-purple-300" 
                        : "text-gray-900 group-hover:text-purple-600"
                    }`}>500%</div>
                    <div className={`text-xs sm:text-sm font-medium ${
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}>ROI Increase</div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`backdrop-blur-md transition-all duration-300 ${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-white/20 hover:border-white/40" 
                    : "bg-gradient-to-br from-green-200/30 to-emerald-200/30 border-gray-300/30 hover:border-gray-400/50"
                }`}>
                  <CardContent className="p-2 sm:p-4 lg:p-6">
                    <div className={`text-lg sm:text-2xl lg:text-4xl font-black mb-1 sm:mb-2 transition-colors duration-300 ${
                      theme === "dark" 
                        ? "text-white group-hover:text-green-300" 
                        : "text-gray-900 group-hover:text-green-600"
                    }`}>24/7</div>
                    <div className={`text-xs sm:text-sm font-medium ${
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}>AI Support</div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Enhanced UnicornStudio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <div className={`relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border ${
              theme === "dark" 
                ? "bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 border-white/20" 
                : "bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-indigo-200/30 border-gray-300/30"
            }`}>
              {/* Enhanced UnicornStudio Embed with proper dimensions and script */}
              {isClient ? (
                <div className="relative w-full h-full">
                <div 
                  data-us-project="vgxQctpD3I3qTtboJP7W" 
                    data-us-production="1"
                  style={{width: "100%", height: "100%"}}
                  className="w-full h-full"
                    id="unicorn-studio-container"
                  />
                  {/* Loading state */}
                  {!unicornStudioLoaded && (
                    <div className={`absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl lg:rounded-3xl ${
                      theme === "dark" ? "bg-black/50" : "bg-white/50"
                    }`}>
                      <div className="text-center px-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <div className={`text-xs sm:text-sm mb-3 ${
                          theme === "dark" ? "text-white/80" : "text-gray-700"
                        }`}>Loading 3D Project...</div>
                        <button 
                          onClick={() => {
                            console.log('Manual retry clicked')
                            if (window.UnicornStudio) {
                              try {
                                window.UnicornStudio.init()
                                console.log('Manual retry successful')
                              } catch (error) {
                                console.error('Manual retry failed:', error)
                              }
                            }
                          }}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  theme === "dark" 
                    ? "bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10" 
                    : "bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-indigo-200/20"
                }`}>
                  <div className={`text-base sm:text-lg ${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}>Loading 3D Scene...</div>
                </div>
              )}
              

              

              
              {/* Enhanced Border Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            
            {/* Enhanced Floating Elements Around UnicornStudio */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-80 shadow-lg"
              animate={{
                y: [0, -15, 0],
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80 shadow-lg"
              animate={{
                y: [0, 15, 0],
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-70 shadow-lg"
              animate={{
                x: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 -right-6 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-70 shadow-lg"
              animate={{
                x: [0, 10, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>


    </section>
  )
}