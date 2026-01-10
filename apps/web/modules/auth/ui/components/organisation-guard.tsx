'use client'
import { useOrganization } from '@clerk/nextjs'
import { OrgSelectView } from '../view/org-select-view'

export const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {
  const { organization } = useOrganization()
  if (!organization) {
    return <OrgSelectView />
  }
  return <>{children}</>
}
