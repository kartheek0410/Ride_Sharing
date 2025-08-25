import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainLogin(){
    const  [email,setEmail] = React.useState('');
    const  [password,setPassword] = React.useState('');
    

    const {captain, setCaptain} = React.useContext(CaptainDataContext);
    const navigate = useNavigate();

    async function submitHandler(e){
        e.preventDefault();
        const captian={
            email : email,
            password : password
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captian);

        if(response.status===200){
            setCaptain(response.data.captain);
            localStorage.setItem('token',response.data.token);
            navigate('/captain-home');
        }
        


        setEmail('');
        setPassword('');
    }
    
    function updateEmail(e){
        setEmail(e.target.value);
    }

    function updatePassword(e){
        setPassword(e.target.value);    
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-18 mb-3' src="/driver-logo.png" alt="Uber logo" />
                <form onSubmit={submitHandler}>
                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                <input 
                type="email" 
                onChange={updateEmail}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full  text-lg  placeholder:text-base '
                placeholder='email@example.com' 
                value={email}
                required
                />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                <input type="password" 
                onChange={updatePassword}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full  text-lg  placeholder:text-base '
                placeholder='password' 
                value={password}
                required 
                />

                <button  
                    className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full  text-lg  placeholder:text-base '  
                    type='submit'
                >Login
                </button>
            </form>
             <p className='text-center'>join the fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </div> 
            <div>
                <Link 
                    to='/login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full  text-lg  placeholder:text-base '
                >Sign in as User</Link>
            </div>
        </div>
    );
}

export default CaptainLogin;