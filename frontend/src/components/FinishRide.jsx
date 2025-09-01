import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function FinishRide(props){

    const Navigate = useNavigate();

    async function endRide(){
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
                rideid : props.rideData?.id , ride : props.rideData
            });

            if(response.status === 200){
                props.setFinishRidePanel(false);
                localStorage.removeItem("captainCurrentRide");
                Navigate('/captain-home');
            }
        } catch (error) {
            console.error('Error ending ride:', error);
        }
    }

    return (
        <div >
            <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
               props.setFinishRidePanel(false );
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-4'>Finish this ride</h3> 
            
            <div className='flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="/user-fill.png" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.rideData?.userinfo.firstname+ " "+ props.rideData?.userinfo.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center w-full'>
                <div className='w-full mt-5'>

                    <div  className='flex items-center gap-5 p-3 border-b-2 border-gray-200' > 
                        <img className='text-lg' src="/map-pin-user-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>PICK UP</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <img className='text-lg' src="/map-pin-fill.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>DESTINATION</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>


                <div className='mt-6 w-full'>
                  
                    <button 
                    onClick ={endRide} 
                    className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white  font-semibold p-3 rounded-lg'>Finish Ride</button>
                    
                </div>
            </div>
        </div>
    );

}


export default FinishRide;