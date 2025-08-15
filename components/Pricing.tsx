"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const plans = [
  {
    name: "Starter",
    icon: Zap,
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "Perfect for small teams and startups",
    features: [
      "Up to 5 team members",
      "Basic AI campaigns",
      "Email support",
      "Limited analytics",
      "1000 contacts",
      "Basic integrations"
    ],
    highlight: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Professional",
    icon: Star,
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "Ideal for growing businesses",
    features: [
      "Up to 25 team members",
      "Advanced AI campaigns",
      "Priority support",
      "Full analytics suite",
      "Unlimited contacts",
      "Advanced integrations",
      "Custom workflows",
      "A/B testing"
    ],
    highlight: true,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    icon: Crown,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Custom AI models",
      "24/7 dedicated support",
      "Advanced analytics",
      "Unlimited everything",
      "Custom integrations",
      "White-label options",
      "SLA guarantee"
    ],
    highlight: false,
    gradient: "from-blue-500 to-cyan-500",
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <EnhancedBackground 
      variant="mesh"
      intensity="high"
      colors={isDark 
        ? ["#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"] 
        : ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"]
      }
      className={`py-32 ${
        isDark 
          ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
          : "bg-gradient-to-br from-violet-100 via-pink-100 to-orange-100"
      }`}
    >
    <section className="relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className={`absolute top-1/4 right-1/4 w-96 h-96 ${
            isDark 
              ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" 
              : "bg-gradient-to-r from-purple-300/40 to-pink-300/40"
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
              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20" 
              : "bg-gradient-to-r from-blue-300/40 to-cyan-300/40"
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
            <Badge className={`mb-6 px-6 py-3 ${
              isDark 
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/30 text-white/90" 
                : "bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-slate-300/50 text-slate-700"
            }`}>
              <Sparkles className="w-4 h-4 mr-2" />
              Pricing Plans
            </Badge>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${
              !isYearly 
                ? (isDark ? 'text-white' : 'text-slate-900') 
                : (isDark ? 'text-slate-400' : 'text-slate-500')
            }`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isYearly 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : (isDark ? 'bg-slate-600' : 'bg-slate-300')
              }`}
            >
              <motion.div
                layout
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                  isYearly ? 'right-1' : 'left-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${
              isYearly 
                ? (isDark ? 'text-white' : 'text-slate-900') 
                : (isDark ? 'text-slate-400' : 'text-slate-500')
            }`}>
              Yearly
              <Badge className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                Save 20%
              </Badge>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative ${plan.highlight ? 'pt-6' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 border-0 shadow-lg">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <Card className={`relative overflow-hidden h-full transition-all duration-500 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 shadow-2xl shadow-slate-900/20" 
                  : "bg-gradient-to-br from-white/90 to-violet-50/80 border-violet-200/60 shadow-xl shadow-violet-900/10"
              } ${
                plan.highlight 
                  ? `ring-2 ring-purple-500/50 scale-105 z-10 mt-4 ${
                      isDark ? 'hover:shadow-slate-900/40' : 'hover:shadow-slate-900/10'
                    }` 
                  : `hover:shadow-2xl ${
                      isDark ? 'hover:shadow-slate-900/40' : 'hover:shadow-slate-900/10'
                    }`
              }`}>

                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4 shadow-lg mx-auto`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className={`text-2xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>{plan.name}</CardTitle>
                  <CardDescription className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-4">
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className={`text-4xl font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}>
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className={`${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-green-500 mt-2">
                        Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice}/year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (i * 0.1) + (index * 0.05) }}
                      >
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`text-sm ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl border-0'
                          : isDark
                            ? 'bg-slate-800/50 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className={`${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            Have questions? Check out our{" "}
            <a href="#faq" className={`${
              isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            } underline transition-colors duration-200`}>
              FAQ section
            </a>{" "}
            or{" "}
            <a href="mailto:sales@admybrand.com" className={`${
              isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            } underline transition-colors duration-200`}>
              contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
    </EnhancedBackground>
  )
}