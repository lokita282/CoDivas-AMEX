import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import Schemes from '../components/schemes/Schemes'

export default function SchemesPage() {
    
  return (
    <>
        <SideDrawer>
            <Schemes/>
        </SideDrawer>
    </>
  )
}
