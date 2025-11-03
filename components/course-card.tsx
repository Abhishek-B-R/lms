import Image from 'next/image'
import Link from 'next/link'
import { BookOpenIcon } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { IconBadge } from './icon-badge'
import { CourseProgress } from './course-progress'

type CourseCardProps = {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string
}

export default function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-border/50 bg-card p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-cyan/10 hover:border-accent-cyan/50 hover:-translate-y-2 dark:bg-card/50 dark:backdrop-blur-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt={title} src={imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/30 via-accent-purple/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-md" />
        </div>

        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition-colors duration-300 group-hover:text-accent-cyan md:text-base">
            {title}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{category}</p>
          <div className="my-3 flex items-center gap-x-1 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpenIcon} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <div className="mt-3">
              <CourseProgress variant={progress === 100 ? 'success' : 'default'} size="sm" value={progress} />
            </div>
          ) : (
            <p className="text-md font-semibold text-accent-cyan mt-2 md:text-sm">{formatPrice(price)}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
