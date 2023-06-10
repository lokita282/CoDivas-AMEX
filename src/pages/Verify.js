import React from 'react'
import ResponsiveDrawer from '../components/sidebar/SideDrawer'
import VerificationCode from '../components/verification/VerificationCode'

export default function Verify() {
    return (
        <ResponsiveDrawer>
            <VerificationCode />
        </ResponsiveDrawer>
    )
}
