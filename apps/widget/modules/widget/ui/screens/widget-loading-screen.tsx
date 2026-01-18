import { WidgetHeader } from '../components/widget-header'
import { useAtomValue } from 'jotai'
import {
  contactSessionAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  widgetScreenAtom,
} from '../../atoms/widget-atoms'
import { LoaderIcon } from 'lucide-react'
import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useAction, useQuery } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'

type InitStep = 'org' | 'session' | 'setting' | 'vapi' | 'done'
export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
  const [step, setStep] = React.useState<InitStep>('org')
  const [sessionValid, setSessionValid] = React.useState<boolean | null>(null)

  const loadingMessage = useAtomValue(loadingMessageAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom)
  const setScreen = useSetAtom(widgetScreenAtom)
  const setOrganizationId = useSetAtom(organizationIdAtom)

  const contactSessionId = useAtomValue(contactSessionAtomFamily(organizationId || ''))

  // Step 1: Validate Organization 
  const validateOrganization = useAction(api.public.organizations.validate)
  useEffect(() => {
    if (step !== 'org') return

    setLoadingMessage('Finding organization ID...')

    if (!organizationId) {
      setErrorMessage('Organization ID is missing.')
      setScreen('error')
      return
    }

    setLoadingMessage('Verifying organization...')
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId)
          setStep('session')
        } else {
          setErrorMessage(result.reason || 'Invalid organization ID.')
          setScreen('error')
        }
      })
      .catch((error) => {
        setErrorMessage('Error validating organization: ' + error.message)
        setScreen('error')
      })
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    setLoadingMessage,
    validateOrganization,
  ])

  // Step 2: Validate Session
  // useQuery returns data directly (not a function), pass args as second parameter
  // Use 'skip' to prevent query from running when we don't have a session ID yet
  const sessionValidationResult = useQuery(
    api.public.contactSessions.validate,
    step === 'session' && contactSessionId ? { contactSessionId } : 'skip'
  )
  // useEffect 3: Final decision
  useEffect(() => {
    if (step !== 'session') return

    setLoadingMessage('Validating session...')

    // No session ID - go straight to auth
    if (!contactSessionId) {
      setSessionValid(false)
      setStep('done')
      return
    }

    // Waiting for query result
    if (sessionValidationResult === undefined) {
      setLoadingMessage('Verifying session...')
      return
    }

    // Got result - update state
    setSessionValid(sessionValidationResult.valid)
    setStep('done')
  }, [step, contactSessionId, sessionValidationResult, setLoadingMessage])

  useEffect(() => {
    if (step !== 'done') return

    const hasValidSession = contactSessionId && sessionValid
    setScreen(hasValidSession ? 'selection' : 'auth')
  }, [step, setScreen, contactSessionId, sessionValid])
  return (
    <div className="flex flex-col h-full">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <LoaderIcon className="animate-spin mx-auto mb-4 h-8 w-8 text-primary" />
        <p className="text-small">{loadingMessage || 'Loading...'}</p>
      </div>
    </div>
  )
}
