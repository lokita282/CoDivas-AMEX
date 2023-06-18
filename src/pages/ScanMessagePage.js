import React from 'react'
import ResponsiveDrawer from '../components/sidebar/SideDrawer'
import ScanMessage from '../components/scanner/ScanMessage'

export default function ScanMessagePage() {
  return (
    <>
        <ResponsiveDrawer>
            <ScanMessage/>
        </ResponsiveDrawer>
    </>
  )
}
