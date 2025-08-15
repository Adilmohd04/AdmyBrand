"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Users, TrendingUp, Sparkles } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    quote: "Our conversion rates increased by 340% in just 3 months. The AI-powered campaigns are incredibly smart and save us hours of manual work every day.",
    img: "/avatar1.png",
    rating: 5,
    results: "340% increase in conversions",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "GrowthLab",
    quote: "This platform revolutionized our marketing strategy. The ROI tracking and automated optimization features are game-changers for our business.",
    img: "/avatar2.png",
    rating: 5,
    results: "500% ROI improvement",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Emily Watson",
    role: "Growth Manager",
    company: "StartupX",
    quote: "The best marketing platform we've ever used. The analytics are incredibly detailed and the automation saves us 20+ hours per week.",
    img: "/avatar3.png",
    rating: 5,
    results: "20+ hours saved weekly",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "David Kim",
    role: "Marketing VP",
    company: "ScaleUp Co.",
    quote: "Incredible results from day one. The AI recommendations are spot-on and have helped us scale our campaigns efficiently across all channels.",
    img: "/avatar4.png",
    rating: 5,
    results: "250% revenue growth",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Lisa Thompson",
    role: "Digital Marketing Lead",
    company: "InnovateCorp",
    quote: "The customer segmentation and targeting features are phenomenal. We've never had such precise control over our marketing campaigns.",
    img: "/avatar5.png",
    rating: 5,
    results: "180% engagement boost",
    gradient: "from-indigo-500 to-purple-500"
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className={`relative py-32 overflow-hidden ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
        : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    }`} id="testimonials">
      
      {/* Enhanced Background */}
      <EnhancedBackground 
        variant="mesh"
        intensity="medium"
        colors={
          isDark 
            ? ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"]
            : ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"]
        }
      />

      {/* Additional animated elements */}
      <div className="absolute inset-0 -z-5">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" : "bg-gradient-to-r from-purple-400/30 to-pink-400/30"
          }`}
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
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20" : "bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
          }`}
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
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className={`mb-6 px-6 py-3 backdrop-blur-md border ${
              isDark 
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/30 text-white/90" 
                : "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-300/50 text-purple-700"
            }`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Customer Success Stories
            </Badge>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              10,000+ marketers
            </span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-white/80" : "text-slate-600"
          }`}>
            See how businesses like yours are achieving incredible results with our AI-powered marketing platform
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className={`relative overflow-hidden backdrop-blur-xl shadow-2xl ${
                isDark 
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50" 
                  : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60"
              }`}>
                <CardContent className="p-12">
                  {/* Quote Icon */}
                  <div className="absolute top-8 left-8 opacity-20">
                    <Quote className={`w-16 h-16 ${isDark ? "text-white" : "text-slate-600"}`} />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className={`text-2xl md:text-3xl font-medium leading-relaxed mb-8 relative z-10 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    "                    &ldquo;{testimonials[currentIndex].quote}&rdquo;"
                  </blockquote>

                  {/* Results Badge */}
                  <div className="mb-8">
                    <Badge className={`px-4 py-2 bg-gradient-to-r ${testimonials[currentIndex].gradient} text-white border-0 text-sm font-semibold`}>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {testimonials[currentIndex].results}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <Avatar className={`w-16 h-16 ring-4 ${
                      isDark ? "ring-white/20" : "ring-slate-200/50"
                    }`}>
                      <AvatarImage src={testimonials[currentIndex].img} alt={testimonials[currentIndex].name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                        {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {testimonials[currentIndex].name}
                      </div>
                      <div className={`${isDark ? "text-white/70" : "text-slate-600"}`}>
                        {testimonials[currentIndex].role}
                      </div>
                      <div className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[currentIndex].gradient} ${
                    isDark ? "opacity-5" : "opacity-3"
                  } pointer-events-none`} />
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className={`group px-6 py-3 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 ${
                isDark 
                  ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50" 
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
              }`}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-125' 
                      : isDark 
                        ? 'bg-white/30 hover:bg-white/50'
                        : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className={`group px-6 py-3 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 ${
                isDark 
                  ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50" 
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
              }`}
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "10,000+", label: "Happy Customers" },
            { number: "500%", label: "Average ROI Increase" },
            { number: "99.9%", label: "Uptime Guarantee" },
            { number: "24/7", label: "Customer Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <Card className={`backdrop-blur-md shadow-xl p-6 transition-all duration-300 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-slate-700/50 hover:border-slate-600/60" 
                  : "bg-gradient-to-br from-white/80 to-slate-50/60 border-slate-200/60 hover:border-slate-300/80"
              }`}>
                <CardContent className="p-0">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>{stat.number}</div>
                  <div className={`text-sm ${
                    isDark ? "text-white/60" : "text-slate-600"
                  }`}>{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}