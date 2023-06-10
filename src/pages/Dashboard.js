import React from 'react'
import ResponsiveDrawer from '../components/sidebar/SideDrawer'
import DashboardScreen from '../components/dashboard/DashboardScreen'

export default function Dashboard() {
    return (
        <>
            <ResponsiveDrawer>
                <DashboardScreen />
            </ResponsiveDrawer>
        </>
    )
}
