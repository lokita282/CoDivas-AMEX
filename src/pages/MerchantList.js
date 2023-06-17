import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import FindMerchant from '../components/findmerchants/FindMerchant'

export default function MerchantList() {
  return (
    <SideDrawer>
        <FindMerchant/>
    </SideDrawer>
  )
}
