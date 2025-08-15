"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Users, DollarSign, Zap, ArrowRight, Sparkles } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

interface CalculatorState {
  monthlyVisitors: number
  conversionRate: number
  averageOrderValue: number
  marketingBudget: number
}

export function InteractiveCalculator() {
  const { theme } = useTheme()
  const [values, setValues] = useState<CalculatorState>({
    monthlyVisitors: 10000,
    conversionRate: 2.5,
    averageOrderValue: 100,
    marketingBudget: 5000
  })

  const [results, setResults] = useState({
    currentRevenue: 0,
    projectedRevenue: 0,
    roiIncrease: 0,
    additionalRevenue: 0
  })

  useEffect(() => {
    const currentRevenue = (values.monthlyVisitors * (values.conversionRate / 100) * values.averageOrderValue)
    const projectedRevenue = currentRevenue * 2.5 // 150% improvement with our platform
    const additionalRevenue = projectedRevenue - currentRevenue
    const roiIncrease = ((projectedRevenue - currentRevenue) / values.marketingBudget) * 100

    setResults({
      currentRevenue,
      projectedRevenue,
      roiIncrease,
      additionalRevenue
    })
  }, [values])

  const updateValue = (key: keyof CalculatorState, value: number[]) => {
    setValues(prev => ({ ...prev, [key]: value[0] }))
  }

  return (
    <EnhancedBackground 
      variant="waves"
      intensity="high"
      colors={theme === "dark" 
        ? ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"] 
        : ["#667eea", "#764ba2", "#f093fb", "#f5576c"]
      }
      className={`py-32 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" 
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
      }`}
    >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/30 text-white/90">
            <Calculator className="w-4 h-4 mr-2" />
            ROI Calculator
          </Badge>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}>
            Calculate your{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark" 
                ? "from-blue-400 via-purple-400 to-pink-400" 
                : "from-purple-600 via-pink-600 to-orange-600"
            }`}>
              potential ROI
            </span>
          </h2>
          
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            theme === "dark" ? "text-white/80" : "text-slate-700"
          }`}>
            See how much revenue you could generate with our AI-powered marketing platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Card className={`backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20" 
                : "bg-gradient-to-br from-white/90 to-white/70 border border-white/50"
            }`}>
              <CardContent className="space-y-6 sm:space-y-8 p-0">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}>Your Current Metrics</h3>
                  <p className={`text-sm sm:text-base ${theme === "dark" ? "text-white/70" : "text-slate-600"}`}>Adjust the sliders to match your business</p>
                </div>

                {/* Monthly Visitors */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <label className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <Users className="w-5 h-5 text-blue-500" />
                      Monthly Visitors
                    </label>
                    <span className={`text-xl sm:text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}>
                      {values.monthlyVisitors.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[values.monthlyVisitors]}
                    onValueChange={(value) => updateValue('monthlyVisitors', value)}
                    max={100000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                  <div className={`flex justify-between text-sm ${
                    theme === "dark" ? "text-white/60" : "text-slate-600"
                  }`}>
                    <span>1K</span>
                    <span>100K</span>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Conversion Rate
                    </label>
                    <span className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {values.conversionRate}%
                    </span>
                  </div>
                  <Slider
                    value={[values.conversionRate]}
                    onValueChange={(value) => updateValue('conversionRate', value)}
                    max={10}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <DollarSign className="w-5 h-5 text-yellow-500" />
                      Average Order Value
                    </label>
                    <span className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      ${values.averageOrderValue}
                    </span>
                  </div>
                  <Slider
                    value={[values.averageOrderValue]}
                    onValueChange={(value) => updateValue('averageOrderValue', value)}
                    max={1000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>$10</span>
                    <span>$1000</span>
                  </div>
                </div>

                {/* Marketing Budget */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <Zap className="w-5 h-5 text-purple-500" />
                      Monthly Marketing Budget
                    </label>
                    <span className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      ${values.marketingBudget.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[values.marketingBudget]}
                    onValueChange={(value) => updateValue('marketingBudget', value)}
                    max={50000}
                    min={500}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>$500</span>
                    <span>$50K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className={`backdrop-blur-xl shadow-2xl p-8 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20" 
                : "bg-gradient-to-br from-white/80 to-white/60 border border-gray-200/50"
            }`}>
              <CardContent className="p-0">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>Your Projected Results</h3>
                  <p className={theme === "dark" ? "text-white/70" : "text-gray-600"}>With our AI-powered platform</p>
                </div>

                <div className="space-y-6">
                  {/* Current Revenue */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-white/10" 
                      : "bg-gradient-to-r from-gray-200/50 to-gray-300/50 border-gray-300/30"
                  }`}>
                    <div className="text-center">
                      <p className={`text-sm mb-2 ${
                        theme === "dark" ? "text-white/70" : "text-gray-600"
                      }`}>Current Monthly Revenue</p>
                      <p className={`text-3xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        ${results.currentRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Projected Revenue */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/20" 
                      : "bg-gradient-to-r from-green-200/50 to-emerald-200/50 border-green-400/30"
                  }`}>
                    <div className="text-center">
                      <p className={`text-sm mb-2 ${
                        theme === "dark" ? "text-green-300" : "text-green-700"
                      }`}>Projected Monthly Revenue</p>
                      <p className={`text-4xl font-bold ${
                        theme === "dark" ? "text-green-300" : "text-green-800"
                      }`}>
                        ${results.projectedRevenue.toLocaleString()}
                      </p>
                      <Badge className={`mt-2 border ${
                        theme === "dark" 
                          ? "bg-green-500/20 text-green-300 border-green-400/30" 
                          : "bg-green-200/80 text-green-800 border-green-400/50"
                      }`}>
                        +150% Growth
                      </Badge>
                    </div>
                  </div>

                  {/* Additional Revenue */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20" 
                      : "bg-gradient-to-r from-blue-200/50 to-purple-200/50 border-blue-400/30"
                  }`}>
                    <div className="text-center">
                      <p className={`text-sm mb-2 ${
                        theme === "dark" ? "text-blue-300" : "text-blue-700"
                      }`}>Additional Monthly Revenue</p>
                      <p className={`text-3xl font-bold ${
                        theme === "dark" ? "text-blue-300" : "text-blue-800"
                      }`}>
                        +${results.additionalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className={`p-6 rounded-2xl border ${
                    theme === "dark" 
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/20" 
                      : "bg-gradient-to-r from-purple-200/50 to-pink-200/50 border-purple-400/30"
                  }`}>
                    <div className="text-center">
                      <p className={`text-sm mb-2 ${
                        theme === "dark" ? "text-purple-300" : "text-purple-700"
                      }`}>ROI on Marketing Spend</p>
                      <p className={`text-3xl font-bold ${
                        theme === "dark" ? "text-purple-300" : "text-purple-800"
                      }`}>
                        {results.roiIncrease.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0"
                  >
                    <span className="relative z-10 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Start Your Free Trial
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                  
                  <p className={`text-sm mt-4 ${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}>
                    No credit card required • 14-day free trial
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              <div className={`text-center p-3 sm:p-4 rounded-xl backdrop-blur-sm border ${
                theme === "dark" 
                  ? "bg-white/5 border-white/10" 
                  : "bg-white/30 border-gray-200/30"
              }`}>
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>10K+</div>
                <div className={`text-xs ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}>Happy Customers</div>
              </div>
              <div className={`text-center p-3 sm:p-4 rounded-xl backdrop-blur-sm border ${
                theme === "dark" 
                  ? "bg-white/5 border-white/10" 
                  : "bg-white/30 border-gray-200/30"
              }`}>
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>500%</div>
                <div className={`text-xs ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}>Avg ROI Increase</div>
              </div>
              <div className={`text-center p-3 sm:p-4 rounded-xl backdrop-blur-sm border ${
                theme === "dark" 
                  ? "bg-white/5 border-white/10" 
                  : "bg-white/30 border-gray-200/30"
              }`}>
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>24/7</div>
                <div className={`text-xs ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}>AI Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </EnhancedBackground>
  )
}