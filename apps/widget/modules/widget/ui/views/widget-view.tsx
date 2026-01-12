'use client'

import { WidgetAuthScreen } from '@/components/screens/widget-auth-screen'
// import { WidgetFooter } from '../components/widget-footer'
interface props {
  organizationId: string
}

export const WidgetView = ({ organizationId }: props) => {
  return (
    <main className="min-h-screen w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  )
}
