"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  BarChart3, 
  Zap, 
  Users, 
  Target, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Globe,
  Rocket,
  Play,
  Eye,
  Layers,
  Cpu,
  Database,
  Network,
  Code,
  Smartphone
} from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const mainFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Campaign Creation",
    description: "Our advanced AI analyzes your brand, audience, and goals to create high-converting campaigns automatically. Watch as machine learning optimizes every element in real-time.",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    benefits: ["Auto-optimization", "Smart targeting", "Predictive analytics", "Real-time adjustments"],
    stats: { value: "340%", label: "Conversion Increase" },
    demoVideo: "/demo-ai-campaigns.mp4"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics Dashboard",
    description: "Get deep insights with our comprehensive analytics suite. Track performance, identify trends, and make data-driven decisions with beautiful, interactive dashboards.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    benefits: ["Real-time data", "Custom dashboards", "Performance insights", "Trend analysis"],
    stats: { value: "500%", label: "ROI Improvement" },
    demoVideo: "/demo-analytics.mp4"
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Streamline your entire marketing workflow with smart automation that learns from your preferences and continuously improves performance.",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    benefits: ["24/7 automation", "Smart triggers", "Custom workflows", "Performance learning"],
    stats: { value: "20+", label: "Hours Saved Weekly" },
    demoVideo: "/demo-automation.mp4"
  },
  {
    icon: Users,
    title: "Dynamic Customer Segmentation",
    description: "Automatically segment your audience using advanced behavioral analysis, demographic data, and engagement patterns for hyper-targeted campaigns.",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    benefits: ["Smart segmentation", "Behavioral analysis", "Dynamic updates", "Personalization"],
    stats: { value: "180%", label: "Engagement Boost" },
    demoVideo: "/demo-segmentation.mp4"
  },
  {
    icon: Target,
    title: "Precision Targeting Engine",
    description: "Reach your ideal customers with surgical precision using our advanced targeting algorithms, lookalike modeling, and predictive audience insights.",
    gradient: "from-red-500 via-pink-500 to-purple-500",
    benefits: ["Lookalike audiences", "Behavioral targeting", "Geo-targeting", "Interest mapping"],
    stats: { value: "250%", label: "Audience Quality" },
    demoVideo: "/demo-targeting.mp4"
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization Suite",
    description: "Continuously optimize your marketing funnel with AI-driven recommendations, automated A/B testing, and growth hacking strategies.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    benefits: ["A/B testing", "Funnel optimization", "Growth hacking", "Performance scaling"],
    stats: { value: "400%", label: "Growth Rate" },
    demoVideo: "/demo-growth.mp4"
  }
]

const bonusFeatures = [
  { icon: Shield, title: "Enterprise Security", description: "Bank-level security with SOC 2 compliance", color: "text-blue-400" },
  { icon: Clock, title: "24/7 AI Support", description: "Round-the-clock intelligent customer support", color: "text-green-400" },
  { icon: Globe, title: "Global Scale", description: "Deploy campaigns worldwide with multi-language support", color: "text-purple-400" },
  { icon: Rocket, title: "Lightning Fast", description: "Sub-second response times with edge computing", color: "text-orange-400" },
  { icon: Database, title: "Data Integration", description: "Connect with 500+ marketing tools and platforms", color: "text-cyan-400" },
  { icon: Smartphone, title: "Mobile First", description: "Optimized for mobile with native app experience", color: "text-pink-400" }
]

const techStack = [
  { icon: Cpu, name: "Advanced AI", description: "GPT-4 powered intelligence" },
  { icon: Network, name: "Real-time Processing", description: "Edge computing network" },
  { icon: Layers, name: "Scalable Architecture", description: "Cloud-native infrastructure" },
  { icon: Code, name: "API-First", description: "Headless and flexible" }
]

// Generate consistent particle positions
const generateParticlePositions = () => {
  const positions = []
  for (let i = 0; i < 20; i++) {
    positions.push({
      left: (i * 5.263) % 100, // Deterministic positioning
      top: (i * 7.891) % 100,
      delay: i * 0.25,
      duration: 15 + (i % 5) * 2
    })
  }
  return positions
}

const particlePositions = generateParticlePositions()

export function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <EnhancedBackground 
      variant="particles"
      intensity="high"
      colors={isDark 
        ? ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"] 
        : ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]
      }
      className={`py-32 ${
        isDark 
          ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      }`}
    >
    <section 
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Primary Background Orbs */}
        <motion.div
          style={{ y: backgroundY }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${
            isDark 
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20" 
              : "bg-gradient-to-r from-blue-300/40 to-purple-300/40"
          } rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${
            isDark 
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" 
              : "bg-gradient-to-r from-purple-300/40 to-pink-300/40"
          } rounded-full blur-3xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Floating Elements */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${
            isDark 
              ? "bg-gradient-to-r from-green-500/15 to-emerald-500/15" 
              : "bg-gradient-to-r from-green-300/30 to-emerald-300/30"
          } rounded-full blur-3xl`}
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

        {/* Animated Grid Pattern */}
        <div className={`absolute inset-0 ${
          isDark ? "opacity-5" : "opacity-10"
        }`}>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        {/* Floating Particles */}
        {mounted && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              isDark ? "bg-white/20" : "bg-slate-400/30"
            } rounded-full`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className={`mb-6 px-6 py-3 ${
              isDark 
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/30 text-white/90" 
                : "bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-slate-300/50 text-slate-700"
            }`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful AI Features
            </Badge>
          </motion.div>
          
          <motion.h2 
            className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Everything you need to{" "}
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              dominate your market
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className={`text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? "text-white/80" : "text-slate-600"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the most advanced AI-powered marketing platform that transforms how businesses grow, engage, and convert customers.
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <Card className={`relative overflow-hidden h-full transition-all duration-500 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 shadow-2xl shadow-slate-900/20" 
                  : "bg-gradient-to-br from-white/90 to-indigo-50/80 border-indigo-200/60 shadow-xl shadow-indigo-900/10"
              } hover:shadow-2xl ${
                isDark ? "hover:shadow-slate-900/40" : "hover:shadow-slate-900/10"
              } hover:border-opacity-80`}>
                
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: isDark ? 0.08 : 0.03 }}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    {/* Animated Icon */}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Stats Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    >
                      <Badge variant="outline" className={`${
                        isDark ? "bg-green-500/10 text-green-400 border-green-500/30" 
                               : "bg-green-50 text-green-600 border-green-200"
                      } px-2.5 py-1`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {feature.stats.value}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <CardTitle className={`text-xl font-bold mt-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  } group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300`}>
                    {feature.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className={`${
                    isDark ? "text-slate-300" : "text-slate-600"
                  } text-sm leading-relaxed mt-2`}>
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Benefits List */}
                  <div className="space-y-2.5 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (benefitIndex * 0.1) + 0.4 }}
                        className="flex items-center gap-2.5"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        </motion.div>
                        <span className={`${
                          isDark ? "text-slate-300" : "text-slate-700"
                        } text-sm font-medium`}>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  {/* Demo Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={`group w-full ${
                        isDark 
                          ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" 
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      } transition-all duration-300`}
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Watch Demo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardFooter>

                {/* Animated Border Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'
                  }`}
                  animate={{
                    x: hoveredCard === index ? ['-100%', '100%'] : '-100%',
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === index ? Infinity : 0,
                    ease: "linear"
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h3 className={`text-3xl font-bold mb-12 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>Built on cutting-edge technology</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <Card className={`${
                  isDark 
                    ? "bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-slate-700/50" 
                    : "bg-gradient-to-br from-white/90 to-purple-50/80 border-purple-200/60"
                } shadow-lg transition-all duration-300 hover:shadow-xl p-6`}>
                  <CardContent className="p-0 text-center">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                        isDark ? "bg-gradient-to-br from-slate-700/50 to-slate-600/30" 
                               : "bg-gradient-to-br from-slate-100 to-slate-200/50"
                      } mb-4`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <tech.icon className={`w-6 h-6 ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`} />
                    </motion.div>
                    <h4 className={`text-lg font-semibold mb-2 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>{tech.name}</h4>
                    <p className={`text-sm ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bonus Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h3 className={`text-3xl font-bold mb-12 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>Plus these essential features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonusFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <Card className={`${
                  isDark 
                    ? "bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-slate-700/50" 
                    : "bg-gradient-to-br from-white/90 to-pink-50/80 border-pink-200/60"
                } shadow-lg transition-all duration-300 hover:shadow-xl`}>
                  <CardHeader className="text-center pb-2">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                        isDark ? "bg-gradient-to-br from-slate-700/50 to-slate-600/30" 
                               : "bg-gradient-to-br from-slate-100 to-slate-200/50"
                      } mx-auto mb-3`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </motion.div>
                    <CardTitle className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <CardDescription className={`text-sm ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className={`${
            isDark 
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-indigo-50/80 border-indigo-200/60"
          } shadow-2xl max-w-4xl mx-auto`}>
            <CardHeader className="text-center pb-6">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mx-auto mb-6"
              >
                <Sparkles className="w-16 h-16 text-purple-500 mx-auto" />
              </motion.div>
              
              <CardTitle className={`text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Ready to transform your marketing?
              </CardTitle>
              
              <CardDescription className={`text-xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}>
                Join thousands of businesses already using our AI-powered platform to achieve unprecedented growth.
              </CardDescription>
            </CardHeader>
            
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-xl transition-all duration-300"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className={`group px-8 py-4 text-lg font-semibold rounded-xl ${
                    isDark 
                      ? "border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500" 
                      : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                  } transition-all duration-300`}
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">Demo video would play here</p>
                  <p className="text-sm opacity-70 mt-2">Click anywhere to close</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </EnhancedBackground>
  )
}