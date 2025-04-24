import { SidebarInset, SidebarProvider } from '~/shared/components/ui/sidebar'
import AppSidebar from './AppSidebar'
import DashboardHeader from './DashboardHeader'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <DashboardHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
