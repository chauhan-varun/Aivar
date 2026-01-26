'use client'

import { useAtomValue } from 'jotai'
import { WidgetAuthScreen } from '../screens/widget-auth-screen'
import { widgetScreenAtom } from '../../atoms/widget-atoms'
import { WidgetErrorScreen } from '../screens/widget-error-screen'
import { WidgetLoadingScreen } from '../screens/widget-loading-screen'
import { WidgetSelectionScreen } from '../screens/widget-selection-screen'
import { WidgetChatScreen } from '../screens/widget-chat-screen'

interface props {
  organizationId: string
}

export const WidgetView = ({ organizationId }: props) => {
  const screen = useAtomValue(widgetScreenAtom)
  const screenComponents = {
    auth: <WidgetAuthScreen />,
    selection: <WidgetSelectionScreen />,
    voice: <p>TODO: Voice Screen</p>,
    inbox: <p>TODO: Inbox Screen</p>,
    chat: <WidgetChatScreen />,
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
