import React from 'react';

function WaitingForDriver(props){
    if(props.ride && props.ride.captaininfo){


        const getVehicleImage = (type) => {
            if (type === "car") return "/car.png";
            if (type === "auto") return "/auto.png";
            if (type === "moto") return "/bike.png";
            return "/car.png"; 
        };

    return (
         <div>
            
           <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
                props.setWaitingForDriver(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <div className='flex items-center justify-between'>
                <img className='h-10' src={getVehicleImage(props.ride?.vehicletype)}  alt="car" />
                <div className='text-right'>
                    <h2 className='text-base font-medium capitalize'>{props.ride?.captaininfo.firstname + " "+ props.ride?.captaininfo.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captaininfo.vehicleplate}</h4>
                    <p className='text-sm text-gray-600'>Maruthi Suzuki</p>
                    
                </div>
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
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <img className='text-lg' src="/pass-valid-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.otp}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>OTP</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
    }
}


export default WaitingForDriver;