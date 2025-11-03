import { NavbarRoutes } from '@/components/navbar-routes'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b border-border/50 bg-gradient-to-r from-background via-surface-elevated to-background p-4 shadow-md backdrop-blur-sm dark:shadow-lg dark:shadow-accent-cyan/5">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}
