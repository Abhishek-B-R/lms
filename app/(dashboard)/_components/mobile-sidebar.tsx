import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SideBar from './sidebar'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition-all duration-300 hover:text-accent-cyan hover:scale-110 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 rounded-sm">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gradient-to-b from-background to-surface-elevated p-0 border-r border-border/50">
        <SideBar />
      </SheetContent>
    </Sheet>
  )
}
