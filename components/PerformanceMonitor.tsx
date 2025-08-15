"use client"

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Log performance metrics (replace with your analytics service)
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
        }
        
        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput?: boolean }
          if (!clsEntry.hadRecentInput) {
            console.log('CLS:', clsEntry.value)
          }
        }
      })
    })

    // Observe performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance monitoring not fully supported')
    }

    return () => observer.disconnect()
  }, [])

  return null
}