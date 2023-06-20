/* es-lisnt disable */
import './App.css';
import { merchant } from './context/MainContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from './router/MainRouter';
import { useEffect, useState } from 'react';

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
    <merchant.Provider value={context}>
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
        <MainRouter />
      </Router>
    </merchant.Provider>
  );
}

export default App;
