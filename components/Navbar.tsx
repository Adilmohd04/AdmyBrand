"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  Menu, 
  Rocket, 
  ShoppingCart, 
  Building2, 
  Briefcase, 
  Globe, 
  Zap,
  BarChart3,
  Palette,
  Lock,
  BookOpen,
  Users,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            `mt-4 transition-all duration-300 rounded-2xl overflow-visible ` +
            (theme === "dark" 
              ? (isScrolled
                  ? "bg-black/95 border border-gray-700/50 shadow-2xl backdrop-blur-xl"
                  : "bg-black/90 border border-gray-700/30 backdrop-blur-md")
              : (isScrolled
              ? "bg-white/95 border border-gray-200/50 shadow-2xl backdrop-blur-xl"
                  : "bg-white/90 border border-gray-200/30 backdrop-blur-md"))
          }
        >
          <div className={`relative flex items-center justify-between px-4 ${isScrolled ? "h-14" : "h-16"}`}>
            {/* Logo */}
            <Link
              href="/"
              className="font-extrabold text-lg md:text-xl tracking-tight text-transparent bg-clip-text" 
              style={{
                backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundSize: "200% 100%",
                animation: "text-shine 3s linear infinite",
              }}
            >
              ADmyBRAND AI Suite
            </Link>

            {/* Center menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList className="space-x-2">
                  {/* Products */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`bg-transparent ${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} rounded-lg px-3 py-2 transition-all duration-200`}>
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className={`w-64 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-300"} rounded-lg shadow-xl border p-4 z-50`}>
                        <div className={`text-xs font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase mb-3`}>Our Products</div>
                        <div className="space-y-2">
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-blue-100"} transition-colors group`}>
                            <Rocket className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-700"}`}>Campaign Engine</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>AI-powered campaign management</div>
                            </div>
                          </Link>
                          <Link href="#pricing" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-yellow-100"} transition-colors group`}>
                            <BarChart3 className="h-4 w-4 text-yellow-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-yellow-400" : "text-gray-900 group-hover:text-yellow-700"}`}>Insights & Analytics</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Advanced performance tracking</div>
                            </div>
                          </Link>
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-purple-100"} transition-colors group`}>
                            <Palette className="h-4 w-4 text-purple-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-purple-400" : "text-gray-900 group-hover:text-purple-700"}`}>Creative Studio</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>AI-powered design tools</div>
                            </div>
                          </Link>
                          <Link href="#faq" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-green-100"} transition-colors group`}>
                            <Lock className="h-4 w-4 text-green-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-green-400" : "text-gray-900 group-hover:text-green-700"}`}>Security</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Enterprise-grade protection</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Solutions */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`bg-transparent ${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} rounded-lg px-3 py-2 transition-all duration-200`}>
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className={`w-56 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-300"} rounded-lg shadow-xl border p-4 z-50`}>
                        <div className={`text-xs font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase mb-3`}>For Your Business</div>
                        <div className="space-y-2">
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-orange-100"} transition-colors group`}>
                            <ShoppingCart className="h-4 w-4 text-orange-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-orange-400" : "text-gray-900 group-hover:text-orange-700"}`}>E‑commerce</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Boost your online sales</div>
                            </div>
                          </Link>
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-indigo-100"} transition-colors group`}>
                            <Building2 className="h-4 w-4 text-indigo-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-indigo-400" : "text-gray-900 group-hover:text-indigo-700"}`}>Enterprise</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Scale your business</div>
                            </div>
                          </Link>
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-teal-100"} transition-colors group`}>
                            <Briefcase className="h-4 w-4 text-teal-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-teal-400" : "text-gray-900 group-hover:text-teal-700"}`}>Agencies</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Manage multiple clients</div>
                            </div>
                          </Link>
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-pink-100"} transition-colors group`}>
                            <Globe className="h-4 w-4 text-pink-600" />
                            <div>
                              <div className={`font-medium ${theme === "dark" ? "text-gray-200 group-hover:text-pink-400" : "text-gray-900 group-hover:text-pink-700"}`}>SaaS</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Software solutions</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`bg-transparent ${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} rounded-lg px-3 py-2 transition-all duration-200`}>
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className={`w-48 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-300"} rounded-lg shadow-xl border p-4 z-50`}>
                        <div className={`text-xs font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"} uppercase mb-3`}>Learn & Support</div>
                        <div className="space-y-2">
                          <Link href="#blog" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-blue-100"} transition-colors group`}>
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <span className={`${theme === "dark" ? "text-gray-200 group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-700"}`}>Blog</span>
                          </Link>
                          <Link href="#faq" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-green-100"} transition-colors group`}>
                            <HelpCircle className="h-4 w-4 text-green-600" />
                            <span className={`${theme === "dark" ? "text-gray-200 group-hover:text-green-400" : "text-gray-900 group-hover:text-green-700"}`}>FAQ</span>
                          </Link>
                          <Link href="#testimonials" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-purple-100"} transition-colors group`}>
                            <Users className="h-4 w-4 text-purple-600" />
                            <span className={`${theme === "dark" ? "text-gray-200 group-hover:text-purple-400" : "text-gray-900 group-hover:text-purple-700"}`}>Testimonials</span>
                          </Link>
                          <Link href="#features" className={`flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-yellow-100"} transition-colors group`}>
                            <Zap className="h-4 w-4 text-yellow-600" />
                            <span className={`${theme === "dark" ? "text-gray-200 group-hover:text-yellow-400" : "text-gray-900 group-hover:text-yellow-700"}`}>Documentation</span>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuViewport />
              </NavigationMenu>

              {/* Simple links */}
              <Link 
                href="#process" 
                className={`${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} px-3 py-2 rounded-lg transition-colors`}
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className={`${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} px-3 py-2 rounded-lg transition-colors`}
              >
                Pricing
              </Link>
              <Link 
                href="#features" 
                className={`${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} px-3 py-2 rounded-lg transition-colors`}
              >
                Docs
              </Link>
            </div>

            {/* Right cluster */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${theme === "dark" ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"} transition-all duration-200`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className={`${theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500" : "border-gray-400 text-gray-700 hover:bg-gray-200 hover:border-gray-500"} transition-all duration-200`}>
                <Link href="/login">Login</Link>
              </Button>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={`${theme === "dark" ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-200"}`}>
                    <Menu className="size-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`w-80 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-300"}`}>
                  <SheetHeader>
                    <SheetTitle className={`text-left ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-1">
                    <div className={`px-3 py-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} font-semibold`}>Products</div>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-blue-100 text-gray-700"}`}>
                      <Rocket className="size-4 text-blue-600" /> Campaign Engine
                    </Link>
                    <Link href="#pricing" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-yellow-100 text-gray-700"}`}>
                      <BarChart3 className="size-4 text-yellow-600" /> Insights & Analytics
                    </Link>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-purple-100 text-gray-700"}`}>
                      <Palette className="size-4 text-purple-600" /> Creative Studio
                    </Link>
                    <Link href="#faq" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-green-100 text-gray-700"}`}>
                      <Lock className="size-4 text-green-600" /> Security
                    </Link>

                    <div className={`px-3 pt-4 pb-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} font-semibold`}>Solutions</div>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-orange-100 text-gray-700"}`}>
                      <ShoppingCart className="size-4 text-orange-600" /> E‑commerce
                    </Link>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-indigo-100 text-gray-700"}`}>
                      <Building2 className="size-4 text-indigo-600" /> Enterprise
                    </Link>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-teal-100 text-gray-700"}`}>
                      <Briefcase className="size-4 text-teal-600" /> Agencies
                    </Link>
                    <Link href="#features" className={`flex items-center gap-3 rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-pink-100 text-gray-700"}`}>
                      <Globe className="size-4 text-pink-600" /> SaaS
                    </Link>

                    <div className={`px-3 pt-4 pb-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} font-semibold`}>Resources</div>
                    <Link href="#process" className={`rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-200 text-gray-700"}`}>How It Works</Link>
                    <Link href="#blog" className={`rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-200 text-gray-700"}`}>Blog</Link>
                    <Link href="#testimonials" className={`rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-200 text-gray-700"}`}>Testimonials</Link>
                    <Link href="#faq" className={`rounded-md px-3 py-2 ${theme === "dark" ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-200 text-gray-700"}`}>FAQ</Link>

                    <div className={`h-px ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} my-4`} />
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Link href="/signup">Get Started</Link>
                    </Button>
                    <Button variant="outline" asChild className={`w-full ${theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-400 text-gray-700 hover:bg-gray-200"}`}>
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}