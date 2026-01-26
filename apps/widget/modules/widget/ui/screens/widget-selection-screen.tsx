import { ChevronRightIcon, MessageSquareTextIcon } from 'lucide-react'
import { WidgetHeader } from '../components/widget-header'
import { Button } from '@workspace/ui/components/button'

import {
  contactSessionAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  widgetScreenAtom,
} from '../../atoms/widget-atoms'

import { useAtomValue } from 'jotai'
import { useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { useSetAtom } from 'jotai/react'
import { useState } from 'react'
export const WidgetSelectionScreen = () => {
  const setScreen = useSetAtom(widgetScreenAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setConversationId = useSetAtom(conversationIdAtom)
  const organizationId = useAtomValue(organizationIdAtom)
  const contactSessionId = useAtomValue(contactSessionAtomFamily(organizationId || ''))
  const createConversationScreen = useMutation(api.public.conversations.create)
  const [isPending, setIsPending] = useState(false)

  const handleNewConversations = async () => {
    if (!organizationId) {
      setScreen('error')
      setErrorMessage('Organization ID is missing.')
      return
    }

    if (!contactSessionId) {
      setScreen('auth')
      return
    }

    setIsPending(true)

    try {
      const conversationId = await createConversationScreen({
        organizationId,
        contactSessionId,
      })
      setConversationId(conversationId)
      setScreen('chat')
    } catch {
      setScreen('auth')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <WidgetHeader>
        <div className="flex flex-col justify-between gay-y-2 px-2 py-6 flex-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos; get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
        <Button
          className="h-full w-full justify-between"
          variant="outline"
          onClick={handleNewConversations}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span>Start Chat</span>
          </div>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}
