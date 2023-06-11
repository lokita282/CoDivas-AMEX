import React, { useEffect } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import Categories from '../components/coupons/Categories'


const UserGetStarted = () => {
  // const [education, setEducation] = useState([])


  return (
    <SideDrawer>
      <Categories />
    </SideDrawer>
  )
}

export default UserGetStarted
