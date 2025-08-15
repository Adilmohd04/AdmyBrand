"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  User, 
  Building, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Sparkles
} from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { EnhancedBackground } from "@/components/ui/enhanced-backgrounds"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 shadow-2xl p-8">
          <CardContent className="p-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
            <p className="text-white/80 text-lg">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <EnhancedBackground 
      variant="liquid"
      intensity="high"
      colors={theme === "dark" 
        ? ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"] 
        : ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"]
      }
      className={`py-32 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" 
          : "bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100"
      }`}
    >

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/30 text-white/90">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}>
            Ready to{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark" 
                ? "from-blue-400 via-purple-400 to-pink-400" 
                : "from-orange-600 via-pink-600 to-purple-600"
            }`}>
              get started?
            </span>
          </h2>
          
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            theme === "dark" ? "text-white/80" : "text-slate-700"
          }`}>
            Let&apos;s discuss how our AI-powered marketing platform can transform your business
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className={`backdrop-blur-xl shadow-2xl ${
            theme === "dark" 
              ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20" 
              : "bg-gradient-to-br from-white/90 to-white/70 border border-white/50"
          }`}>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}>
                      <User className="w-4 h-4 text-blue-500" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className={`border-2 focus:ring-2 transition-all duration-200 ${
                        theme === "dark" 
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20" 
                          : "bg-white/90 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20"
                      }`}
                    />
                    {errors.name && (
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}>
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className={`font-semibold flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <Mail className="w-4 h-4 text-green-500" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                      className={`border-2 focus:ring-2 transition-all duration-200 ${
                        theme === "dark" 
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20" 
                          : "bg-white/90 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20"
                      }`}
                    />
                    {errors.email && (
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}>
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label htmlFor="company" className={`font-semibold flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    <Building className="w-4 h-4 text-yellow-500" />
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="Enter your company name"
                    className={`border-2 focus:ring-2 transition-all duration-200 ${
                      theme === "dark" 
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20" 
                        : "bg-white/90 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                    }`}
                  />
                  {errors.company && (
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.company.message}
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className={`font-semibold flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us about your marketing goals and how we can help..."
                    rows={5}
                    className={`border-2 focus:ring-2 transition-all duration-200 resize-none ${
                      theme === "dark" 
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20" 
                        : "bg-white/90 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
                    }`}
                  />
                  {errors.message && (
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="group relative overflow-hidden w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                          <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </div>

                {/* Privacy Notice */}
                <div className="text-center pt-4">
                  <p className="text-white/60 text-sm">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                      Terms of Service
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16"
        >
          {[
            {
              icon: Mail,
              title: "Email Us",
              description: "Get in touch via email",
              contact: "hello@yourcompany.com",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: MessageSquare,
              title: "Live Chat",
              description: "Chat with our team",
              contact: "Available 24/7",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: Building,
              title: "Office",
              description: "Visit our headquarters",
              contact: "San Francisco, CA",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md border border-white/10 shadow-xl p-6 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm mb-2">{item.description}</p>
                <p className="text-white/80 font-medium">{item.contact}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </EnhancedBackground>
  )
}