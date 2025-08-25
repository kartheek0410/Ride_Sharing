import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';


function CaptainProtectWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    if (!token) {
      navigate('/captain-login');
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/check`,{ withCredentials: true }
        );

        // console.log("Response from captain checkAuth axios: ", response.data);

        if (response.status === 200 && response.data) {
          setCaptain(response.data);
        } else {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      } catch (err) {
        console.log("Error in captain checkAuth axios: ", err.message);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default CaptainProtectWrapper;
