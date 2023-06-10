import React from 'react'
import ResponsiveDrawer from '../components/sidebar/SideDrawer'
import Scan from '../components/scanner/Scan'

export default function ScanPage() {
    return (
        <ResponsiveDrawer>
            <Scan />
        </ResponsiveDrawer>
    )
}
