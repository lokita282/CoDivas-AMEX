import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { codivascontext } from '../context/MainContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ViewEntitiesPage from '../pages/ViewEntitiesPage';


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
          {/* <Route exact path='/signup/beneficiary' element={<SignupPage />} /> */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRouter />}>
            <Route exact path="/" element={<DashboardPage />} />
          </Route>
          <Route path="/viewentities" element={<PrivateRouter />}>
            <Route exact path="/viewentities" element={<ViewEntitiesPage />} />
          </Route>
          {/*<Route path='/scheme' element={<PrivateRouter />} >
                    <Route exact path='/scheme' element={<SchemesPage/>} />
                </Route>
                <Route path='/scheme/:id' element={<PrivateRouter />} >
                    <Route exact path='/scheme/:id' element={<SchemeDetsPage/>} />
                </Route>
                <Route path='/vouchers/utility' element={<PrivateRouter />} >
                    <Route exact path='/vouchers/utility' element={<UtilityVoucherPage/>} />
                </Route>
                <Route path='/bank/createerupi' element={<PrivateRouter />} >
                    <Route exact path='/bank/createerupi' element={<CreateErupi />} />
                </Route>
                <Route path='/viewvouchers' element={<PrivateRouter />} >
                    <Route exact path='/viewvouchers' element={<ViewVouchers />} />
                </Route>
                <Route path='/user/getstarted' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted' element={<UserGetStartedPage />} />
                </Route>
                <Route path='/user/getstarted/:category' element={<PrivateRouter />} >
                    <Route exact path='/user/getstarted/:category' element={<CategoryCoupons />} />
                </Route>
                <Route path='/merchant/list' element={<PrivateRouter />} >
                    <Route exact path='/merchant/list' element={<MerchantList/>} />
                </Route>
                <Route path='/transactions' element={<PrivateRouter />} >
                    <Route exact path='/transactions' element={<TransactionPage/>} />
                </Route> */}
          {/* not needed for now */}
          {/* <Route exact path='/signup/merchant' element={<SignupPage />} />
                <Route exact path='/signup/bank' element={<SignupPage />} />
                <Route exact path='/signup/organisation' element={<SignupPage />} /> */}
          {/* not needed for now */}
        </Routes>
      </>
    )
}