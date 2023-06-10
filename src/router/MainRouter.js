import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { codivascontext } from '../context/MainContext';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPages';
import DashboardPage from '../pages/DashboardPage';
import BankDashboardPage from '../pages/BankDashboardPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import UserGetStartedPage from '../pages/UserGetStartedPage'
import HealthcarePage from '../pages/HealthcarePage'
import ElectricityBillPage from '../pages/ElectricityBillPage'


export default function MainRouter() {
    const { user, setUser, setOpen } = useContext(codivascontext)
    function PrivateRouter() {
        return user !== null ? <>
            <Outlet />
        </> : <>
            {
                JSON.parse(localStorage.getItem("codivasUser")) === null && setOpen(true)
            }
            <Navigate to="/usermerch/login" />
        </>
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("codivasUser")))
    }, [])

    return (
        <>
            <Routes>
                <Route exact path='/signup/beneficiary' element={<SignupPage />} />
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/dashboard' element={<DashboardPage />} />
                <Route exact path='/bank/dashboard' element={<BankDashboardPage />} />
                <Route exact path='/user/dashboard' element={<UserDashboardPage />} />
                <Route exact path='/user/getstarted' element={<UserGetStartedPage />} />
                <Route exact path='/user/getstarted/Healthcare' element={<HealthcarePage />} />
                <Route exact path='/user/getstarted/electricity' element={<ElectricityBillPage />} />


                <Route exact path='/' element={<DashboardPage />} />

                {/* not needed for now */}
                <Route exact path='/signup/merchant' element={<SignupPage />} />
                <Route exact path='/signup/bank' element={<SignupPage />} />
                <Route exact path='/signup/organisation' element={<SignupPage />} />
                {/* not needed for now */}

                {/* for open routes */}
                {/* <Route exact path='/' element={<HomePage />} /> */}
                {/* for protected routes */}
                {/* <Route path='/myorganization' element={<PrivateRouter />} >
                    <Route exact path='/myorganization' element={<MyOrg />} />
                </Route> */}
            </Routes>
        </>
    )
}