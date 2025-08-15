"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Sparkles,
  Rocket,
  Lightbulb,
  ChevronRight,
  Play,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Process() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const processRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const isDark = theme === "dark"

  useEffect(() => {
    if (!sectionRef.current) return

    // Enhanced GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Title animation with enhanced effects
    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotationX: -15
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )

    // Subtitle animation
    tl.fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 50,
        skewX: -5
      },
      { 
        opacity: 1, 
        y: 0,
        skewX: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.8"
    )

    // Process steps with enhanced stagger and effects
    tl.fromTo(processRefs.current,
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotationY: -10
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    )

    // Floating animation for icons with enhanced movement
    processRefs.current.forEach((ref, index) => {
      if (ref) {
        const icon = ref.querySelector('.process-icon')
        const card = ref.querySelector('.process-card')
        
        if (icon) {
          gsap.to(icon, {
            y: -15,
            rotation: 5,
            duration: 3,
            delay: 1 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          })
        }

        if (card) {
          gsap.to(card, {
            y: -5,
            duration: 4,
            delay: 1.5 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          })
        }
      }
    })

    // Progress bar animation
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2,
        delay: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          scrub: 1
        }
      })
    }

    // Parallax and floating effects
    gsap.to(".floating-bg", {
      y: -80,
      rotation: 5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2
      }
    })

    // Magnetic effect for cards
    processRefs.current.forEach((ref) => {
      if (ref) {
        ref.addEventListener('mousemove', (e) => {
          const rect = ref.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(ref, {
            x: x * 0.1,
            y: y * 0.1,
            rotationY: x * 0.02,
            rotationX: y * 0.02,
            duration: 0.5,
            ease: "power2.out"
          })
        })

        ref.addEventListener('mouseleave', () => {
          gsap.to(ref, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out"
          })
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const processSteps = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your market, competitors, and audience behavior to create data-driven insights.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/50",
      progress: 85,
      features: ["Market Research", "Competitor Analysis", "Audience Insights"]
    },
    {
      icon: Target,
      title: "Smart Targeting",
      description: "Precisely target your ideal customers using AI-powered audience segmentation and predictive analytics.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/50",
      progress: 92,
      features: ["Audience Segmentation", "Predictive Analytics", "Behavioral Targeting"]
    },
    {
      icon: Zap,
      title: "Automated Campaigns",
      description: "Launch and optimize campaigns automatically with AI that learns and improves performance over time.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/50",
      progress: 78,
      features: ["Auto-Optimization", "A/B Testing", "Performance Learning"]
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Real-time analytics and AI-powered recommendations to maximize your ROI and campaign success.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/50",
      progress: 95,
      features: ["Real-time Analytics", "ROI Optimization", "AI Recommendations"]
    }
  ]

  return (
    <EnhancedBackground 
      variant="gradient"
      intensity="high"
      colors={isDark 
        ? ["#059669", "#0891b2", "#3b82f6", "#8b5cf6"] 
        : ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]
      }
      className={`py-32 ${
        isDark 
          ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
          : "bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100"
      }`}
    >
    <section 
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="floating-bg absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="floating-bg absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="floating-bg absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
            rotate: [180, 0, 180]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-xl border mb-8 shadow-2xl ${
              isDark 
                ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-white/40 text-white/90" 
                : "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-slate-300/50 text-slate-700"
            }`}
          >
            <Sparkles className={`w-6 h-6 animate-pulse ${
              isDark ? "text-purple-300" : "text-purple-500"
            }`} />
            <span className={`text-base font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? "from-purple-300 to-blue-300" : "from-purple-600 to-blue-600"
            }`}>
              How It Works
            </span>
            <Rocket className={`w-5 h-5 ${
              isDark ? "text-blue-300" : "text-blue-500"
            }`} />
          </motion.div>

          <h2 
            ref={titleRef}
            className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Transform Your Marketing in
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>

          <p 
            ref={subtitleRef}
            className={`text-2xl md:text-3xl max-w-5xl mx-auto leading-relaxed ${
              isDark ? "text-white/80" : "text-slate-600"
            }`}
          >
            Our AI-powered platform streamlines your entire marketing workflow, 
            from analysis to optimization, delivering results that drive growth.
          </p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className={`flex items-center justify-between mb-3 ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}>
              <span className="text-sm font-medium">Platform Completion</span>
              <span className="text-sm font-medium">95%</span>
            </div>
            <div className={`w-full rounded-full h-3 overflow-hidden ${
              isDark ? "bg-white/10" : "bg-slate-200"
            }`}>
              <motion.div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "95%" }}
                transition={{ delay: 1.5, duration: 2 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              ref={el => processRefs.current[index] = el}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className={`hidden lg:block absolute top-1/2 left-full w-full h-0.5 transform -translate-y-1/2 z-0 ${
                  isDark ? "bg-gradient-to-r from-white/30 to-transparent" : "bg-gradient-to-r from-slate-300/50 to-transparent"
                }`} />
              )}

              {/* Enhanced Process Card */}
              <Card className={`relative overflow-hidden process-card h-full transition-all duration-700 group-hover:scale-105 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 shadow-2xl shadow-slate-900/20 hover:shadow-slate-900/40" 
                  : "bg-gradient-to-br from-white/90 to-emerald-50/80 border-emerald-200/60 shadow-xl shadow-emerald-900/10 hover:shadow-emerald-900/15"
              } hover:shadow-2xl`}>
                
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: isDark ? 0.08 : 0.03 }}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 process-icon" />
                      
                      {/* Enhanced Glow Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                      
                      {/* Animated Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-white/30"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`${
                        isDark 
                          ? "bg-slate-800/50 text-slate-300 border-slate-600/50" 
                          : "bg-slate-50 text-slate-600 border-slate-300/50"
                      } backdrop-blur-md`}
                    >
                      Step {index + 1}
                    </Badge>
                  </div>
                  
                  <CardTitle className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isDark ? "text-white group-hover:text-white/90" : "text-slate-900 group-hover:text-slate-700"
                  }`}>
                    {step.title}
                  </CardTitle>
                  
                  <CardDescription className={`text-sm leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {step.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-0">
                  {/* Progress Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={isDark ? "text-slate-400" : "text-slate-500"}>Completion</span>
                      <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{step.progress}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden ${
                      isDark ? "bg-slate-700/50" : "bg-slate-200"
                    }`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color} transition-all duration-1000`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${step.progress}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`flex items-center gap-2 text-sm ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full group/btn transition-all duration-300 ${
                      isDark 
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" 
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                      Learn More
                    </span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardFooter>

                {/* Hover Effects */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg ${
                    isDark ? "bg-gradient-to-r from-purple-500/5 to-blue-500/5" : "bg-gradient-to-r from-purple-500/3 to-blue-500/3"
                  }`}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1.2 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className={`relative overflow-hidden shadow-2xl ${
            isDark 
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-teal-50/80 border-teal-200/60"
          }`}>
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Lightbulb className="w-10 h-10 text-yellow-500 animate-pulse" />
                  <CardTitle className={`text-4xl md:text-5xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    Ready to get started?
                  </CardTitle>
                </div>
                <CardDescription className={`text-xl max-w-3xl mx-auto ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  Join thousands of marketers already using our AI platform to transform their marketing results.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardFooter className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden px-10 py-6 text-xl font-bold rounded-xl shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform duration-300" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className={`group px-10 py-6 text-xl font-bold rounded-xl border-2 transition-all duration-300 shadow-xl ${
                    isDark 
                      ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500" 
                      : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Schedule Demo
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
    </EnhancedBackground>
  )
}
