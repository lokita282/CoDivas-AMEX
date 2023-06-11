import { useState } from 'react';
import './App.css';
import { codivascontext } from './context/MainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from './router/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';


function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const context = {
    user, setUser,
    token, setToken
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('codivasUser')))
    setToken(localStorage.getItem('codivasToken'))
  }, [])

  return (
    <codivascontext.Provider value={context}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {/* <SideDrawer> */}
        <MainRouter />
        {/* </SideDrawer> */}
      </Router>
    </codivascontext.Provider>
  );
}

export default App;
