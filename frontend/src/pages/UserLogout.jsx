import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout(){
    const navigate = useNavigate();
    

    axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`).then((response)=>{
        if(response.status===200){
            // console.log(response.data.message);
            localStorage.removeItem('token');
            navigate('/login');
        }
    });

    
    return (
        <div>
            Logging out...
        </div>
    );
}

export default UserLogout;