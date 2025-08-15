"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  TrendingUp, 
  Download,
  Star,
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
  Sparkles,
  FileText,
  Video,
  Headphones
} from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const blogPosts = [
  {
    title: "The Complete Guide to AI Marketing Automation in 2025",
    excerpt: "Master the art of AI-powered marketing automation with our comprehensive guide. Learn advanced strategies, tools, and techniques that top brands use to scale their marketing efforts.",
    author: "Sarah Chen",
    authorRole: "Head of Marketing",
    date: "Mar 15, 2025",
    readTime: "12 min read",
    category: "Strategy",
    type: "article",
    image: "/blog-1.jpg",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    views: "2.4k",
    likes: "156",
    featured: true,
    tags: ["AI", "Automation", "Strategy", "Growth"]
  },
  {
    title: "Building High-Converting Email Sequences with AI",
    excerpt: "Discover how to leverage artificial intelligence to create personalized email sequences that convert prospects into loyal customers. Includes templates and real examples.",
    author: "Mike Rodriguez",
    authorRole: "Email Marketing Expert",
    date: "Mar 12, 2025",
    readTime: "8 min read",
    category: "Email Marketing",
    type: "guide",
    image: "/blog-2.jpg",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    views: "1.8k",
    likes: "89",
    featured: false,
    tags: ["Email", "Conversion", "AI", "Templates"]
  },
  {
    title: "Predictive Analytics: The Future of Marketing Intelligence",
    excerpt: "Explore how predictive analytics is revolutionizing marketing decision-making. Learn to anticipate customer behavior and optimize campaigns before they launch.",
    author: "Emma Thompson",
    authorRole: "Data Scientist",
    date: "Mar 10, 2025",
    readTime: "15 min read",
    category: "Analytics",
    type: "research",
    image: "/blog-3.jpg",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    views: "3.1k",
    likes: "203",
    featured: true,
    tags: ["Analytics", "Prediction", "Data", "Intelligence"]
  },
  {
    title: "Video Marketing Mastery: AI-Powered Content Creation",
    excerpt: "Learn how AI is transforming video marketing. From script generation to automated editing, discover tools and techniques for creating engaging video content at scale.",
    author: "David Kim",
    authorRole: "Creative Director",
    date: "Mar 8, 2025",
    readTime: "10 min read",
    category: "Video Marketing",
    type: "video",
    image: "/blog-4.jpg",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    views: "1.5k",
    likes: "67",
    featured: false,
    tags: ["Video", "Content", "AI", "Creative"]
  },
  {
    title: "The Psychology of AI-Driven Personalization",
    excerpt: "Understand the psychological principles behind effective personalization and how AI can help you create more meaningful customer experiences.",
    author: "Lisa Park",
    authorRole: "UX Researcher",
    date: "Mar 5, 2025",
    readTime: "7 min read",
    category: "Psychology",
    type: "podcast",
    image: "/blog-5.jpg",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    views: "2.2k",
    likes: "134",
    featured: false,
    tags: ["Psychology", "Personalization", "UX", "Behavior"]
  },
  {
    title: "ROI Optimization: Advanced Attribution Modeling",
    excerpt: "Master advanced attribution modeling techniques to accurately measure and optimize your marketing ROI across all channels and touchpoints.",
    author: "Alex Johnson",
    authorRole: "Performance Marketing Lead",
    date: "Mar 3, 2025",
    readTime: "11 min read",
    category: "ROI",
    type: "whitepaper",
    image: "/blog-6.jpg",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    views: "1.9k",
    likes: "98",
    featured: true,
    tags: ["ROI", "Attribution", "Analytics", "Optimization"]
  }
]

const categories = ["All", "Strategy", "Email Marketing", "Analytics", "Video Marketing", "Psychology", "ROI"]

const contentTypes = [
  { type: "article", icon: FileText, label: "Articles" },
  { type: "guide", icon: BookOpen, label: "Guides" },
  { type: "video", icon: Video, label: "Videos" },
  { type: "podcast", icon: Headphones, label: "Podcasts" },
  { type: "research", icon: TrendingUp, label: "Research" },
  { type: "whitepaper", icon: Download, label: "Whitepapers" }
]

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [, setHoveredPost] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { theme } = useTheme()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  useInView(containerRef, { once: false, amount: 0.1 })

  const isDark = theme === "dark"

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesType = selectedType === "all" || post.type === selectedType
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesType && matchesSearch
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const getTypeIcon = (type: string) => {
    const typeObj = contentTypes.find(t => t.type === type)
    return typeObj ? typeObj.icon : FileText
  }

  return (
    <section 
      ref={containerRef}
      className={`relative py-32 overflow-hidden ${
        isDark 
          ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
          : "bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50"
      }`}
    >
      {/* Enhanced Background */}
      <EnhancedBackground 
        variant="particles"
        intensity="medium"
        colors={
          isDark 
            ? ["#10b981", "#8b5cf6", "#ec4899", "#f59e0b"]
            : ["#10b981", "#8b5cf6", "#ec4899", "#f59e0b"]
        }
      />

      {/* Additional animated elements */}
      <div className="absolute inset-0 -z-5">
        <motion.div
          style={{ y: backgroundY }}
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark 
              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20" 
              : "bg-gradient-to-r from-green-400/30 to-emerald-400/30"
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
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className={`absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark 
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" 
              : "bg-gradient-to-r from-purple-400/30 to-pink-400/30"
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
          className="text-center mb-16"
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
              Resources & Insights
            </Badge>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Master{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI marketing
            </span>
          </h2>
          
          <p className={`text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? "text-white/80" : "text-slate-600"
          }`}>
            Stay ahead with cutting-edge insights, strategies, and resources from marketing experts
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className={`backdrop-blur-xl shadow-2xl p-6 ${
            isDark 
              ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60"
          }`}>
            <CardContent className="p-0">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-white/50" : "text-slate-400"
                }`} />
                <Input
                  placeholder="Search articles, guides, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 h-12 text-lg focus:border-purple-400 focus:ring-purple-400/20 ${
                    isDark 
                      ? "bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400" 
                      : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                  }`}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : isDark
                        ? "bg-slate-800/50 text-white/80 hover:bg-slate-700/60"
                        : "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Content Type Filters */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => setSelectedType("all")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedType === "all"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : isDark
                      ? "bg-slate-800/50 text-white/80 hover:bg-slate-700/60"
                      : "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  All Types
                </motion.button>
                {contentTypes.map((type) => (
                  <motion.button
                    key={type.type}
                    onClick={() => setSelectedType(type.type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedType === type.type
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : isDark
                        ? "bg-slate-800/50 text-white/80 hover:bg-slate-700/60"
                        : "bg-slate-200/80 text-slate-700 hover:bg-slate-300/80"
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h3 className={`text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>Featured Content</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPost(index)}
                  onHoverEnd={() => setHoveredPost(null)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className={`relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-500 h-full ${
                    isDark 
                      ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 hover:border-slate-600/60" 
                      : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60 hover:border-slate-300/80"
                  }`}>
                    <CardContent className="p-0">
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>

                      {/* Image */}
                      <div className={`h-64 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Content Type Icon */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-10 h-10 rounded-full ${
                            isDark ? "bg-white/20" : "bg-black/20"
                          } backdrop-blur-sm flex items-center justify-center`}>
                            {(() => {
                              const Icon = getTypeIcon(post.type)
                              return <Icon className="w-5 h-5 text-white" />
                            })()}
                          </div>
                        </div>

                        {/* Animated Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <div className="p-8">
                        {/* Category and Meta */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge className={`${
                            isDark ? "bg-purple-500/20 text-purple-300 border-purple-400/30" 
                                   : "bg-purple-500/10 text-purple-600 border-purple-400/20"
                          } px-3 py-1`}>
                            {post.category}
                          </Badge>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className={`flex items-center gap-1 ${
                              isDark ? "text-white/60" : "text-slate-500"
                            }`}>
                              <Eye className="w-4 h-4" />
                              {post.views}
                            </div>
                            <div className={`flex items-center gap-1 ${
                              isDark ? "text-white/60" : "text-slate-500"
                            }`}>
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-2xl font-bold mb-4 ${
                          isDark ? "text-white" : "text-slate-900"
                        } group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300`}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className={`${
                          isDark ? "text-white/70" : "text-slate-600"
                        } text-lg leading-relaxed mb-6`}>
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-1 text-xs rounded-lg ${
                                isDark ? "bg-white/10 text-white/70" : "bg-slate-200/50 text-slate-600"
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Author and Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${
                              isDark ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                                     : "bg-gradient-to-br from-purple-400 to-pink-400"
                            } flex items-center justify-center text-white font-bold`}>
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className={`font-semibold ${
                                isDark ? "text-white" : "text-slate-900"
                              }`}>{post.author}</div>
                              <div className={`text-sm ${
                                isDark ? "text-white/60" : "text-slate-500"
                              }`}>{post.authorRole}</div>
                            </div>
                          </div>
                          
                          <div className={`text-sm ${
                            isDark ? "text-white/60" : "text-slate-500"
                          }`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <div className="mt-6">
                          <Button
                            className="group w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white border-0 shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            Read Full {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>

                      {/* Hover Gradient Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>Latest Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className={`relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-500 h-full ${
                  isDark 
                    ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 hover:border-slate-600/60" 
                    : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60 hover:border-slate-300/80"
                }`}>
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          isDark ? "bg-white/20 text-white" : "bg-black/20 text-white"
                        } backdrop-blur-sm border-0 px-3 py-1`}>
                          {post.category}
                        </Badge>
                      </div>

                      {/* Content Type Icon */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-8 h-8 rounded-full ${
                          isDark ? "bg-white/20" : "bg-black/20"
                        } backdrop-blur-sm flex items-center justify-center`}>
                          {(() => {
                            const Icon = getTypeIcon(post.type)
                            return <Icon className="w-4 h-4 text-white" />
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Meta Info */}
                      <div className={`flex items-center gap-4 text-xs mb-4 ${
                        isDark ? "text-white/60" : "text-slate-500"
                      }`}>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? "text-white" : "text-slate-900"
                      } group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2`}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`${
                        isDark ? "text-white/70" : "text-slate-600"
                      } text-sm leading-relaxed mb-4 line-clamp-3`}>
                        {post.excerpt}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className={`flex items-center gap-1 ${
                            isDark ? "text-white/60" : "text-slate-500"
                          }`}>
                            <Eye className="w-4 h-4" />
                            {post.views}
                          </div>
                          <div className={`flex items-center gap-1 ${
                            isDark ? "text-white/60" : "text-slate-500"
                          }`}>
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`group/btn p-2 h-auto ${
                            isDark ? "text-purple-400 hover:text-purple-300 hover:bg-white/10" 
                                   : "text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                          }`}
                        >
                          <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        </Button>
                      </div>

                      {/* Read More */}
                      <Button
                        variant="outline"
                        size="sm"
                        className={`group/btn w-full ${
                          isDark 
                            ? "border-white/20 text-white hover:bg-white/10" 
                            : "border-slate-300 text-slate-700 hover:bg-slate-100"
                        } backdrop-blur-sm transition-all duration-300`}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>

                    {/* Hover Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className={`backdrop-blur-xl shadow-2xl p-12 max-w-4xl mx-auto ${
            isDark 
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60"
          }`}>
            <CardContent className="p-0">
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
              >
                <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              </motion.div>
              
              <h3 className={`text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Never miss an insight
              </h3>
              
              <p className={`text-xl mb-8 ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}>
                Get weekly updates on the latest AI marketing trends, strategies, and exclusive resources
              </p>
              
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`flex-1 h-12 focus:border-purple-400 focus:ring-purple-400/20 ${
                        isDark 
                          ? "bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400" 
                          : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                      }`}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    <h4 className={`text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}>
                      Welcome aboard! 🎉
                    </h4>
                    <p className={`${
                      isDark ? "text-white/70" : "text-slate-600"
                    }`}>
                      Check your inbox for a confirmation email
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <p className={`text-sm mt-6 ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}>
                Join 10,000+ marketers • Unsubscribe anytime • No spam, ever
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
