import { ArrowLeftIcon, MenuIcon } from 'lucide-react'
import { WidgetHeader } from '../components/widget-header'
import { Button } from '@workspace/ui/components/button'

import {
  contactSessionAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  widgetScreenAtom,
} from '../../atoms/widget-atoms'

import { useAtomValue, useSetAtom } from 'jotai'
import { api } from '@workspace/backend/_generated/api'
import { useQuery } from 'convex/react'
export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(widgetScreenAtom)
  const setConversationId = useSetAtom(conversationIdAtom)
  const conversationId = useAtomValue(conversationIdAtom)
  const organizationId = useAtomValue(organizationIdAtom)
  const contactSessionId = useAtomValue(contactSessionAtomFamily(organizationId || ''))

  const conversations = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : 'skip'
  )

  const onBack = () => {
    setConversationId(null)
    setScreen('selection')
  }

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <Button variant="transparent" size="icon" onClick={onBack}>
          <ArrowLeftIcon />
          <p>Chat</p>
        </Button>
        <Button variant="transparent" size="icon" onClick={() => {}}>
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4">{JSON.stringify(conversations)}</div>
    </>
  )
}
