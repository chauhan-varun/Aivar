import { atom } from 'jotai'
import { WidgetScreen } from '../types'
import { atomWithStorage } from 'jotai/utils'
import { atomFamily } from 'jotai-family'
import { CONTACT_SESSION_KEY } from '../constants'
import { Id } from '@workspace/backend/_generated/dataModel'

export const widgetScreenAtom = atom<WidgetScreen>('loading')
export const errorMessageAtom = atom<string | null>(null)
export const organizationIdAtom = atom<string | null>(null)
export const contactSessionAtomFamily = atomFamily((organizationId: string) =>
  atomWithStorage<Id<'contactSessions'> | null>(`${CONTACT_SESSION_KEY}_${organizationId}`, null)
)
export const conversationIdAtom = atom<Id<'conversations'> | null>(null)
export const loadingMessageAtom = atom<string | null>(null)
