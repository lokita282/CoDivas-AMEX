import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { merchant } from '../context/MainContext';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import ScanPage from '../pages/ScanPage';
import Verify from '../pages/Verify';
import Tick from '../components/verification/Tick';
import Gst from '../components/auth/Gst';


export default function MainRouter() {
    const { user, setUser, setOpen } = useContext(merchant)
    function PrivateRouter() {
        return user !== null ? <>
            <Outlet />
        </> : <>
            {
                JSON.parse(localStorage.getItem("codivasUser")) === null && <Navigate to="/" />
            }

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
                <Route exact path='/gst' element={<Gst />} />

                <Route path='/dashboard' element={<PrivateRouter />} >
                    <Route exact path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/scan' element={<PrivateRouter />} >
                    <Route exact path='/scan' element={<ScanPage />} />
                </Route>
                <Route path='/scan-verify' element={<PrivateRouter />} >
                    <Route exact path='/scan-verify' element={<Verify />} />
                </Route>
                <Route path='/scan-tick' element={<PrivateRouter />} >
                    <Route exact path='/scan-tick' element={<Tick />} />
                </Route>
            </Routes>
        </>
    )
}