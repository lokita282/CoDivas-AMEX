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
import Coupons from '../components/coupons/Coupons';
import CategoryCoupons from '../pages/CategoryCoupons';


export default function MainRouter() {
    const { user, setUser, setOpen } = useContext(codivascontext)
    function PrivateRouter() {
        return user !== null ? <>
            <Outlet />
        </> : <>
            {
                JSON.parse(localStorage.getItem("codivasUser")) === null && <Navigate to="/login" />
            }
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
                <Route path='/dashboard' element={<PrivateRouter />} >
                    <Route exact path='/dashboard' element={<DashboardPage />} />
                </Route>
                <Route path='/bank/dashboard' element={<PrivateRouter />} >
                    <Route exact path='/bank/dashboard' element={<BankDashboardPage />} />
                </Route>
                <Route path='/user/dashboard' element={<PrivateRouter />} >
                    <Route exact path='/user/dashboard' element={<UserDashboardPage />} />
                </Route>
                <Route path='/user/getstarted' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted' element={<UserGetStartedPage />} />
                </Route>
                <Route path='/user/getstarted/Healthcare' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted/Healthcare' element={<HealthcarePage />} />
                </Route>
                <Route path='/user/getstarted/electricity' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted/electricity' element={<ElectricityBillPage />} />
                </Route>

                <Route path='/user/getstarted/:category' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted/:category' element={<CategoryCoupons />} />
                </Route>
                {/* not needed for now */}
                <Route exact path='/signup/merchant' element={<SignupPage />} />
                <Route exact path='/signup/bank' element={<SignupPage />} />
                <Route exact path='/signup/organisation' element={<SignupPage />} />
                {/* not needed for now */}
            </Routes>
        </>
    )
}