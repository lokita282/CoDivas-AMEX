import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { codivascontext } from '../context/MainContext';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPages';
import DashboardPage from '../pages/DashboardPage';


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