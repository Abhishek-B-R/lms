import { AlertTriangle, CheckCircleIcon, Info } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva('border text-center p-4 text-sm flex items-center w-full transition-all duration-300 backdrop-blur-sm', {
  variants: {
    variant: {
      warning: 'bg-yellow-200/80 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-200 shadow-md',
      success: 'bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 border-emerald-800 dark:border-emerald-900 text-white shadow-lg shadow-emerald-500/20',
      info: 'bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 dark:from-accent-cyan/10 dark:to-accent-purple/10 border-accent-cyan/50 dark:border-accent-cyan/30 text-foreground shadow-md',
    },
  },
  defaultVariants: {
    variant: 'warning',
  },
})

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
  info: Info,
}

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning']

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </div>
  )
}
