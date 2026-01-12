import { WidgetHeader } from '@/modules/widget/ui/components/widget-header'

export const WidgetAuthScreen = () => {
  return (
    <WidgetHeader>
      <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold ">
        <p className="text-3xl">Hi There! 👋 </p>
        <p className="text-lg">How can we help you today?</p>
      </div>
    </WidgetHeader>
  )
}
