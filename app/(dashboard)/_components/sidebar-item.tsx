'use client'

import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (pathname === '/' && href === '/') || pathname === href || pathname.startsWith(`${href}/`)

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'group relative flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all duration-300',
        'hover:bg-accent-cyan/10 hover:text-slate-600 dark:hover:text-slate-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-inset',
        isActive && 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/10 text-accent-cyan hover:from-accent-cyan/25 hover:to-accent-purple/15 dark:text-accent-cyan',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22} 
          className={cn(
            'text-slate-500 transition-all duration-300 group-hover:scale-110',
            isActive && 'text-accent-cyan drop-shadow-[0_0_8px_rgba(0,188,212,0.5)]'
          )} 
        />
        <span className={cn('transition-all duration-300', isActive && 'font-semibold')}>{label}</span>
      </div>
      <div
        className={cn(
          'absolute right-0 h-full w-1 bg-gradient-to-b from-accent-cyan to-accent-purple opacity-0 transition-all duration-300',
          isActive && 'opacity-100 shadow-glow-cyan'
        )}
      />
    </button>
  )
}
