import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from "axios";


function CaptainSignup() {
    
    const navigate = useNavigate();

    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');    
    const [firstName,setFirstName]=React.useState('');
    const [lastName,setLastName]=React.useState('');
    const [vehicleColour, setVehicleColour] = React.useState('');
    const [vehiclePlate, setVehiclePlate] = React.useState('');
    const [vehicleCapacity, setVehicleCapacity] = React.useState('');
    const [vehicleType, setVehicleType] = React.useState('');


    const {captain, setCaptain} = React.useContext(CaptainDataContext);

    async function submitHandler(e){
        e.preventDefault();
        const captainData ={
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            vehiclecolor : vehicleColour,
            vehicleplate : vehiclePlate,
            vehiclecapacity : vehicleCapacity,
            vehicletype : vehicleType
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/signup`,captainData);

        if(response.status===201){
            setCaptain(response.data.captain);
            localStorage.setItem('token',response.data.token);
            navigate('/captain-home');
        }

      

        setEmail('');
        setPassword('');    
        setFirstName('');
        setLastName('');
        setVehicleCapacity('');
        setVehiclePlate('');
        setVehicleColour('');
        setVehicleType('');

    }

    return (
       <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-18 mb-3' src="/driver-logo.png" alt="Uber logo" />
                <form onSubmit={(e)=>submitHandler(e)}>

                    <h3 className='text-base font-medium mb-2'>What's our Captain name?</h3>
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
                    

                    <h3 className='text-base font-medium mb-2'>What's our Captain email?</h3>
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
                    
                    <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
                    <input 
                        type="text" 
                        className='bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-base placeholder:text-sm'
                        placeholder='Vehicle Color' 
                        value={vehicleColour}
                        onChange={(e)=>setVehicleColour(e.target.value)}
                        required
                    />

                    <input 
                        type="text" 
                        className='bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-base placeholder:text-sm'
                        placeholder='Vehicle Plate Number' 
                        value={vehiclePlate}
                        onChange={(e)=>setVehiclePlate(e.target.value)}
                        required
                    />

                    <input 
                        type="number" 
                        className='bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-base placeholder:text-sm'
                        placeholder='Vehicle Capacity' 
                        value={vehicleCapacity}
                        onChange={(e)=>setVehicleCapacity(e.target.value)}
                        required
                    />

                    <select 
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base'
                        value={vehicleType}
                        onChange={(e)=>setVehicleType(e.target.value)}
                        required
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                    </select>


                    <button  
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full  text-base  placeholder:text-base '  
                        type='submit'
                    >Create captain account
                    </button>
                </form>
                <p className='text-center mb-7'>Already have an account?<Link to='/captain-login' className='text-blue-600'> Login here</Link></p>
            </div> 
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    );
}

export default CaptainSignup;