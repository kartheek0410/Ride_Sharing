import React from 'react';

function RidePopUp(props){
    return (
        <div>
            <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
               props.setRidePopUpPanel(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-4'>New Ride Available! </h3> 
            
            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="/user-fill.png" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.userinfo.firstname + " "+props.ride?.userinfo.firstname}</h2>
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
                <div className='flex w-full mt-5 items-center justify-between'>
                    <button onClick={()=>{
                    props.setRidePopUpPanel(false);
                    }} className=' mt-1 bg-gray-300 text-gray-700  font-semibold p-3 px-10 rounded-lg'>Ignore</button>

                    <button onClick={()=>{
                    props.confirmRide();
                    props.setConfirmRidePopUpPanel(true);
                    }} className='bg-green-600 text-white  font-semibold p-3 px-10 rounded-lg'>Accept</button>
                    
                </div>
            </div>
        </div>
    );
}

export default RidePopUp;