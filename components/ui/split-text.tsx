"use client"

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SplitTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  onLetterAnimationComplete?: () => void
}

export function SplitText({
  children,
  className = "",
  delay = 0.1,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const linesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return

    const text = textRef.current
    const container = containerRef.current

    // Split text based on type
    let elements: HTMLSpanElement[] | HTMLDivElement[] = []
    
    if (splitType === 'chars') {
      const textContent = text.textContent || ''
      text.innerHTML = ''
      
      for (let i = 0; i < textContent.length; i++) {
        const char = textContent[i]
        if (char === ' ') {
          text.appendChild(document.createTextNode(' '))
        } else {
          const span = document.createElement('span')
          span.textContent = char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(40px)'
          text.appendChild(span)
          charsRef.current.push(span)
        }
      }
      elements = charsRef.current
    } else if (splitType === 'words') {
      const textContent = text.textContent || ''
      const words = textContent.split(' ')
      text.innerHTML = ''
      
      words.forEach((word, index) => {
        const span = document.createElement('span')
        span.textContent = word + (index < words.length - 1 ? ' ' : '')
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(40px)'
        text.appendChild(span)
        wordsRef.current.push(span)
      })
      elements = wordsRef.current
    } else if (splitType === 'lines') {
      const textContent = text.textContent || ''
      const lines = textContent.split('\n')
      text.innerHTML = ''
      
      lines.forEach((line) => {
        const div = document.createElement('div')
        div.textContent = line
        div.style.opacity = '0'
        div.style.transform = 'translateY(40px)'
        text.appendChild(div)
        linesRef.current.push(div)
      })
      elements = linesRef.current
    }

    // Set initial styles
    elements.forEach((element) => {
      gsap.set(element, from)
    })

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      onComplete: onLetterAnimationComplete
    })

    // Animate elements
    elements.forEach((element, elementIndex) => {
      tl.to(element, {
        ...to,
        duration: duration,
        ease: ease,
        delay: delay * elementIndex
      }, elementIndex * delay)
    })

    // Cleanup
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [children, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ textAlign }}
    >
      <div ref={textRef}>
        {children}
      </div>
    </div>
  )
}
