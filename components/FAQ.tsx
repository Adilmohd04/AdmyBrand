"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Minus, HelpCircle, MessageCircle, Mail, Sparkles } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const faqs = [
  {
    q: "What is our AI-powered marketing platform?",
    a: "Our platform is a comprehensive AI-driven marketing suite that automates campaign creation, optimizes performance in real-time, and provides deep analytics to help businesses scale their marketing efforts efficiently. It combines machine learning, predictive analytics, and automation to deliver exceptional ROI.",
    category: "Platform"
  },
  {
    q: "How secure is my data?",
    a: "We take security extremely seriously. Our platform uses enterprise-grade encryption, SOC 2 compliance, GDPR compliance, and follows industry best practices. Your data is stored in secure, redundant data centers with 24/7 monitoring and regular security audits.",
    category: "Security"
  },
  {
    q: "Can I try the platform for free?",
    a: "Yes! We offer a comprehensive 14-day free trial with full access to all features. No credit card required. You can explore our AI campaigns, analytics, automation workflows, and see real results before making any commitment.",
    category: "Pricing"
  },
  {
    q: "What kind of support do you provide?",
    a: "We provide 24/7 customer support through multiple channels. Starter plans include email support, Professional plans get priority support with live chat, and Enterprise customers receive dedicated account managers and phone support.",
    category: "Support"
  },
  {
    q: "How quickly can I see results?",
    a: "Most customers see initial improvements within the first week, with significant results typically visible within 30 days. Our AI learns from your data and continuously optimizes campaigns, so performance improves over time.",
    category: "Results"
  },
  {
    q: "Can I integrate with my existing tools?",
    a: "Absolutely! We offer 100+ integrations with popular marketing tools, CRMs, analytics platforms, and social media channels. Our API also allows for custom integrations to fit your specific workflow needs.",
    category: "Integrations"
  },
  {
    q: "What if I need to cancel my subscription?",
    a: "You can cancel anytime with no penalties or hidden fees. We offer month-to-month billing, and if you're not satisfied, we provide a 30-day money-back guarantee. Your data remains accessible for 90 days after cancellation.",
    category: "Billing"
  },
  {
    q: "Do you offer training and onboarding?",
    a: "Yes! All plans include comprehensive onboarding. Professional and Enterprise plans include personalized training sessions, best practice guides, and ongoing strategic consultation to ensure you maximize your ROI.",
    category: "Training"
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`relative py-32 overflow-hidden ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950" 
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    }`} id="faq">
      
      {/* Enhanced Background */}
      <EnhancedBackground 
        variant="geometric"
        intensity="medium"
        colors={
          isDark 
            ? ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"]
            : ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"]
        }
      />

      {/* Additional animated elements */}
      <div className="absolute inset-0 -z-5">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20" : "bg-gradient-to-r from-blue-400/30 to-purple-400/30"
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
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" : "bg-gradient-to-r from-purple-400/30 to-pink-400/30"
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

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
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
              Frequently Asked Questions
            </Badge>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Got{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              questions?
            </span>
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-white/80" : "text-slate-600"
          }`}>
            Find answers to the most common questions about our AI-powered marketing platform
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden backdrop-blur-xl shadow-xl transition-all duration-300 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-slate-700/50 hover:border-slate-600/60" 
                  : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60 hover:border-slate-300/80"
              }`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-8 text-left flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`px-3 py-1 text-xs ${
                          isDark 
                            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white/80" 
                            : "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700"
                        }`}>
                          {faq.category}
                        </Badge>
                      </div>
                      <h3 className={`text-xl font-bold transition-all duration-300 ${
                        isDark 
                          ? "text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text" 
                          : "text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text"
                      }`}>
                        {faq.q}
                      </h3>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                        isDark 
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20" 
                          : "bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                      }`}>
                        {openIndex === index ? (
                          <Minus className={`w-4 h-4 ${isDark ? "text-white" : "text-slate-700"}`} />
                        ) : (
                          <Plus className={`w-4 h-4 ${isDark ? "text-white" : "text-slate-700"}`} />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className={`h-px bg-gradient-to-r from-transparent to-transparent mb-6 ${
                            isDark ? "via-white/20" : "via-slate-300/50"
                          }`}></div>
                          <p className={`text-lg leading-relaxed ${
                            isDark ? "text-white/80" : "text-slate-600"
                          }`}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className={`backdrop-blur-xl shadow-2xl p-8 ${
            isDark 
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50" 
              : "bg-gradient-to-br from-white/90 to-slate-50/80 border-slate-200/60"
          }`}>
            <CardContent className="p-0">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>Still have questions?</h3>
              <p className={`mb-8 ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}>
                Our support team is here to help you get the most out of our platform
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Live Chat Support
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`group px-8 py-4 text-lg font-semibold rounded-2xl border-2 backdrop-blur-md transition-all duration-300 ${
                    isDark 
                      ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50" 
                      : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                  }`}
                >
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}