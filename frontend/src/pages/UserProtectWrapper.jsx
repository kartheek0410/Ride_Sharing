import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

function UserProtectWrapper({children}) {


    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {setUser} = React.useContext(UserDataContext);
    const [isLoading, setIsLoading] = React.useState(true);

    // console.log(token);

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }

        async function checkAuth(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/check`,{ withCredentials: true });
                

                if(response.status===200 && response.data){
                    setUser(response.data);
                }else{
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }catch(err){
                console.log("Error in user checkAuth axios: ", err.message);
                localStorage.removeItem("token");
                navigate("/login");
            }finally{
                setIsLoading(false);
            }
        }
        checkAuth();

    },[token ,navigate,setUser]);

    if(isLoading){
        return <div>Loading...</div>;
    }



    return (
        <>
            {children}
        </>
    );
}

export default UserProtectWrapper;