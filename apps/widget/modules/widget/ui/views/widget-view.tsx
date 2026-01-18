'use client'

import { useAtomValue } from 'jotai'
import { WidgetAuthScreen } from '../screens/widget-auth-screen'
import { widgetScreenAtom } from '../../atoms/widget-atoms'
import { WidgetErrorScreen } from '../screens/widget-error-screen'
import { WidgetLoadingScreen } from '../screens/widget-loading-screen'

interface props {
  organizationId: string
}

export const WidgetView = ({ organizationId }: props) => {
  const screen = useAtomValue(widgetScreenAtom)
  const screenComponents = {
    auth: <WidgetAuthScreen />,
    selection: <p>TODO: Selection Screen</p>,
    voice: <p>TODO: Voice Screen</p>,
    inbox: <p>TODO: Inbox Screen</p>,
    chat: <p>TODO: Chat Screen</p>,
    contact: <p>TODO: Contact Screen</p>,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
  }
  return (
    <main className="min-h-screen w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  )
}
