import Logo from './logo'
import { SidebarRoutes } from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-border/50 bg-gradient-to-b from-background to-surface-elevated shadow-lg dark:shadow-xl dark:shadow-accent-cyan/5">
      <div className="p-6 border-b border-border/30 bg-surface-elevated/50">
        <Logo />
      </div>
      <div className="flex w-full flex-col pt-2">
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar
