import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import SchemeDetails from '../components/schemes/SchemeDetails'

export default function SchemeDetsPage() {
  return (
    <>
        <SideDrawer>
            <SchemeDetails/>
        </SideDrawer>
    </>
  )
}
