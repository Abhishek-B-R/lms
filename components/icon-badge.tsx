import { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const backgroundVariants = cva('rounded-full flex items-center justify-center transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-accent-cyan/10 hover:bg-accent-cyan/20 hover:shadow-glow-cyan-sm dark:bg-accent-cyan/20',
      success: 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30',
    },
    size: {
      default: 'p-2',
      sm: 'p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const iconVariants = cva('transition-all duration-300', {
  variants: {
    variant: {
      default: 'text-accent-cyan drop-shadow-[0_0_4px_rgba(0,188,212,0.3)]',
      success: 'text-emerald-700 dark:text-emerald-400',
    },
    size: {
      default: 'h-8 w-8',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>
type IconVariantsProps = VariantProps<typeof iconVariants>

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  )
}
