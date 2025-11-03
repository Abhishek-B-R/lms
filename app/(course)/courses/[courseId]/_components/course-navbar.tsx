import { Prisma } from '@prisma/client'
import CourseMobileSidebar from './course-mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

type CourseNavbarProps = {
  course: Prisma.CourseGetPayload<{ include: { chapters: { include: { userProgress: true } } } }>
  progressCount: number
}

export default function CourseNavbar({ course, progressCount }: CourseNavbarProps) {
  return (
    <div className="flex h-full items-center border-b border-border/50 bg-gradient-to-r from-background via-surface-elevated to-background p-4 shadow-md backdrop-blur-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}
