import { AuthGuard } from '@/modules/auth/ui/components/auth-guard'
import { OrganizationGuard } from '@/modules/auth/ui/components/organisation-guard'
import { SidebarProvider } from '@workspace/ui/components/sidebar'
import { cookies } from 'next/headers'
import { DashboardSidebar } from '../components/dashboard-sidebar'

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col w-full">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  )
}
