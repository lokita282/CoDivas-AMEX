import { useState } from 'react';
import './App.css';
import { codivascontext } from './context/MainContext';
import SideDrawer from './components/sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import MainRouter from './router/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const context = {
    user, setUser,
    token, setToken
  }

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
