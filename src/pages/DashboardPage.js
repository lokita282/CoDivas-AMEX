import React, { useContext } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { codivascontext } from '../context/MainContext'
import BeneDashboard from '../components/dashboard/BeneDashboard'
import BankDashboardPage from './BankDashboardPage'
import OrgDashboard from '../components/dashboard/OrgDashboard'
import UserDashboardPage from './UserDashboardPage'

export default function DashboardPage() {
    const { user } = useContext(codivascontext)
    return (
        <SideDrawer>
            {
                user?.type === "beneficiary" ? <UserDashboardPage />
                    : user?.type === "bank" ? <BankDashboardPage />
                        : <OrgDashboard />
            }
        </SideDrawer>
    )
}
