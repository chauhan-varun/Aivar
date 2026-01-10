'use client'
import { Button } from '@workspace/ui/components/button'
import { HomeIcon } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
export const WidgetFooter = () => {
  const selection = 'selection'
  return (
    <footer className="flex items-center justify-between border-t bg-background ">
      <Button className="h-14 flex-1 rounded-none" onClick={() => {}} size="icon" variant="ghost">
        <HomeIcon className={cn('size-5', selection === 'selection' && 'text-primary')} />
      </Button>
      <Button className="h-14 flex-1 rounded-none" onClick={() => {}} size="icon" variant="ghost">
        <HomeIcon className={cn('size-5', selection === 'selection' && 'text-primary')} />
      </Button>
    </footer>
  )
}
