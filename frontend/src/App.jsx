import React from 'react';
import {Route,Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import AppHome from './pages/AppHome.jsx';
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import Riding from './pages/Riding.jsx';
import CaptainRiding from './pages/CaptainRiding.jsx';
import CaptainLogout from './pages/CaptainLogout.jsx';
import PaymentStatus from './components/PaymentStatus.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />  
        <Route path='/riding' element={
          <UserProtectWrapper>
          <Riding/>
          </UserProtectWrapper> }/>
        <Route path='/captain-riding' element={
          <CaptainProtectWrapper>
          <CaptainRiding/>
          </CaptainProtectWrapper>}/>

        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/home"
         element={
          <UserProtectWrapper>
            <AppHome/>
          </UserProtectWrapper>
         }
        />
        <Route path='/user/logout' 
         element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
         }
        />
        <Route path='/captain-home' 
         element={
            <CaptainProtectWrapper>
            <CaptainHome/>
            </CaptainProtectWrapper>
         }
        />
        <Route path='/captain/logout' 
         element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
         }
        />
        <Route  path='/payment-status' element={  
            <UserProtectWrapper>
              <PaymentStatus/>
            </UserProtectWrapper>
        }
        />
        

      </Routes>
    </div>
  );
}

export default App;