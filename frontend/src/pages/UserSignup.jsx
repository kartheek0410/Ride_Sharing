import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserDataContext } from '../context/UserContext.jsx';

function UserSignup() {

    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');    
    const [firstName,setFirstName]=React.useState('');
    const [lastName,setLastName]=React.useState('');
    const [userData,setUserData]=React.useState({});

    const {user,setUser}=React.useContext(UserDataContext);

    const navigate = useNavigate();

    async function submitHandler(e){
        e.preventDefault();
        const newUser={
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`,newUser);

       if(response.status===200){
            // console.log(response.data);
            setUser({
                firstName:response.data.user.firstname,
                lastName:response.data.user.lastname,
                email:response.data.user.email
            });
            localStorage.setItem('token',response.data.token);
            navigate('/home');
        }
        console.log(user);
        setEmail('');
        setPassword('');    
        setFirstName('');
        setLastName('');

    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="/Uber.png" alt="Uber logo" />
                <form onSubmit={(e)=>submitHandler(e)}>

                    <h3 className='text-base font-medium mb-2'>What's your name?</h3>
                    <div className='flex gap-4 mb-6'>
                        <input 
                        type="text" 
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2  w-full  text-base  placeholder:text-sm '
                        placeholder='First name' 
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        
                        required
                        />
                        <input 
                        type="text" 
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2  w-full  text-base  placeholder:text-sm '
                        placeholder='Last name' 
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        required
                        />
                    </div>
                    

                    <h3 className='text-base font-medium mb-2'>What's your email?</h3>
                    <input 
                    type="email" 
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full  text-base  placeholder:text-sm '
                    placeholder='email@example.com' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />

                    <h3 className='text-base font-medium mb-2'>Enter Password</h3>

                    <input type="password" 
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full  text-base  placeholder:text-sm '
                    placeholder='password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                    />

                    <button  
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full  text-base  placeholder:text-base '  
                        type='submit'
                    >Create account
                    </button>
                </form>
                <p className='text-center'>Already have an account?<Link to='/login' className='text-blue-600'> Login here</Link></p>
            </div> 
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    );
}

export default UserSignup;