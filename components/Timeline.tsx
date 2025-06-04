import type { LucideIcon } from "lucide-react"

interface TimelineItem {
  id: number
  timestamp: string
  label: string
  description: string
  icon: LucideIcon
  color: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="relative pl-8">
          {/* Vertical line */}
          {index < items.length - 1 && (
            <div
              className={`absolute left-[15px] top-[28px] bottom-[-24px] w-[2px] bg-${item.color}-200`}
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          <div
            className={`absolute left-0 top-1 p-1 rounded-full bg-${item.color}-100 border border-${item.color}-200`}
          >
            <item.icon className={`h-4 w-4 text-${item.color}-600`} />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
              <span className="ml-2 text-xs text-gray-500">{item.timestamp}</span>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
