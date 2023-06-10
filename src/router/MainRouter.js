import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { merchant } from '../context/MainContext';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import ScanPage from '../pages/ScanPage';
import Verify from '../pages/Verify';
import Tick from '../components/verification/Tick';


export default function MainRouter() {
    const { user, setUser, setOpen } = useContext(merchant)
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
                <Route exact path='/signup' element={<SignupPage />} />
                <Route exact path='/' element={<LoginPage />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/scan' element={<ScanPage />} />
                <Route exact path='/scan-verify' element={<Verify />} />
                <Route exact path='/scan-tick' element={<Tick />} />

            </Routes>
        </>
    )
}