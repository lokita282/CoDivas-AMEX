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
                <Route exact path='/signup' element={<SignupPage />} />
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/gst' element={<Gst />} />

                <Route path='/' element={<PrivateRouter />} >
                    <Route exact path='/' element={<Dashboard />} />
                </Route>
                <Route path='/scan' element={<PrivateRouter />} >
                    <Route exact path='/scan' element={<ScanPage />} />
                </Route>
                <Route path='/scan-verify/:id/:amount' element={<PrivateRouter />} >
                    <Route exact path='/scan-verify/:id/:amount' element={<Verify />} />
                </Route>
                <Route path='/scan-tick' element={<PrivateRouter />} >
                    <Route exact path='/scan-tick' element={<Tick />} />
                </Route>
            </Routes>
        </>
    )
}