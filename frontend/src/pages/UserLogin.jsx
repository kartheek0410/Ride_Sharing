import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogin(){
    const  [email,setEmail] = React.useState('');
    const  [password,setPassword] = React.useState('');
    const [userData,setUserData] = React.useState({});


    const {user,setUser}=React.useContext(UserDataContext);
    const navigate = useNavigate();



    async function submitHandler(e){
        e.preventDefault();
        
        const userData={
            email:email,
            password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);

        if(response.status === 200){
            // console.log(response.data);
           
            setUser({
                email : response.data.user.email,
                firstName : response.data.user.firstname,
                lastName : response.data.user.lastname,
            });
            localStorage.setItem('token',response.data.token);
            navigate('/home');
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
                <img className='w-16 mb-10' src="/Uber.png" alt="Uber logo" />
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
             <p className='text-center'>New here?<Link to='/signup' className='text-blue-600'> Create new Account</Link></p>
            </div> 
            <div>
                <Link 
                    to='/captain-login'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full  text-lg  placeholder:text-base '
                >Sign in as Captain</Link>
            </div>
        </div>
    );
}

export default UserLogin;