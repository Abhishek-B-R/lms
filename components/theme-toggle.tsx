'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="hover:bg-accent-cyan/10 hover:text-accent-cyan transition-all duration-300 hover:shadow-glow-cyan-sm relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/10 to-accent-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-accent-cyan drop-shadow-[0_0_8px_rgba(0,188,212,0.5)]" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-accent-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
