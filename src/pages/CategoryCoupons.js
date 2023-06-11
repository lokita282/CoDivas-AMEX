import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import Coupons from '../components/coupons/Coupons'

export default function CategoryCoupons() {
    return (
        <>
            <SideDrawer>
                <Coupons />
            </SideDrawer>
        </>
    )
}
