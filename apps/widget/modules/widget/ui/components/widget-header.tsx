import { cn } from '@workspace/ui/lib/utils'

export const WidgetHeader = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <header
      className={cn(
        'bg-gradient-to-b from-primary to-[#0b63f3] p-4 text-primary-foreground',
        className
      )}
    >
      {children}
    </header>
  )
}
