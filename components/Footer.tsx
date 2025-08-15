"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram, Mail, MapPin, Phone, Sparkles, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const footerLinks = {
  product: [
    { name: "How It Works", href: "#process" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
  ],
  support: [
    { name: "Help Center", href: "#help" },
    { name: "Contact", href: "mailto:contact@admybrand.com" },
    { name: "Status", href: "#status" },
    { name: "API Docs", href: "#api" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "GDPR", href: "#gdpr" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
]

export function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <EnhancedBackground 
      variant="liquid"
      intensity="medium"
      colors={isDark 
        ? ["#1e293b", "#334155", "#475569"] 
        : ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]
      }
      className={isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
        : "bg-gradient-to-br from-rose-100 via-teal-100 to-amber-100"
      }
    >
    <footer className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className={`absolute top-1/4 right-1/4 w-96 h-96 ${
            isDark 
              ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10" 
              : "bg-gradient-to-r from-purple-300/20 to-pink-300/20"
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
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 ${
            isDark 
              ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10" 
              : "bg-gradient-to-r from-blue-300/20 to-cyan-300/20"
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
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="py-16 border-b border-slate-200/20"
        >
          <Card className={`${
            isDark 
              ? "bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-rose-50/80 border-rose-200/60"
          } shadow-xl p-8 md:p-12`}>
            <div className="text-center max-w-2xl mx-auto">
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
                className="mb-6"
              >
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto" />
              </motion.div>
              
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Stay in the loop
              </h3>
              <p className={`text-lg mb-8 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}>
                Get the latest updates on AI marketing trends, product releases, and exclusive insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark 
                      ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500" 
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                <Button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>ADmyBRAND</span>
                </div>
                
                <p className={`text-base mb-6 leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  Transforming marketing with AI-powered solutions that drive growth, engagement, and conversion for businesses worldwide.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      contact@admybrand.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className={`text-lg font-semibold mb-4 capitalize ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors duration-200 hover:text-purple-500 ${
                          isDark ? "text-slate-300 hover:text-purple-400" : "text-slate-600 hover:text-purple-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`py-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? "border-slate-700/50" : "border-slate-200/50"
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className={`text-sm ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}>
              © {new Date().getFullYear()} ADmyBRAND. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className={`${
                isDark ? "border-green-500/30 text-green-400" : "border-green-500/30 text-green-600"
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                All systems operational
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? "text-slate-400 hover:text-white hover:bg-slate-800" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? "text-slate-400 hover:text-white hover:bg-slate-800" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
    </EnhancedBackground>
  )
}