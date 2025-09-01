import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ConfirmRidePopUp(props){

    const [otp,setOtp]=useState("");
    const navigate = useNavigate();



    async function submitHandler(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
            { ride: props.ride, otp },   
            { withCredentials: true }   
            );

            if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopUpPanel(false);
            navigate("/captain-riding",{state : {ride : response.data}});
            localStorage.setItem("captainCurrentRide", JSON.stringify(response.data));

            }
        } catch (err) {
            console.log("Error starting ride:", err);
        }
    }


    return (
        <div >
            <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
               props.setConfirmRidePopUpPanel(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-4'>Confirm this ride to start  </h3> 
            
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="/user-fill.png" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.userinfo.firstname +" "+ props.ride?.userinfo.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center w-full'>
                <div className='w-full mt-5'>

                    <div  className='flex items-center gap-5 p-3 border-b-2 border-gray-200' > 
                        <img className='text-lg' src="/map-pin-user-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <img className='text-lg' src="/map-pin-fill.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>


                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)}className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'  type="text" placeholder='Enter OTP' />

                        <button className='w-full mt-5 flex justify-center bg-green-600 text-white text-lg font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={()=>{
                        props.setConfirmRidePopUpPanel(false);
                        props.setRidePopUpPanel(false);
                        }} className='w-full mt-2 bg-red-500 text-white text-lg font-semibold p-3 rounded-lg mb-5'>Cancel</button>
                    
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ConfirmRidePopUp;