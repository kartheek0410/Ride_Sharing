import React from 'react';

function SelectedVehicle(props){
   const getVehicleImage = (type) => {
    if (type === "car") return "/car.png";
    if (type === "auto") return "/auto.png";
    if (type === "moto") return "/bike.png";
    return "/car.png"; // fallback image if nothing matches
    };

    return (
        <div>
           <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
                props.setSelectVehiclePanel(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3> 
            
            <div className='flex gap-2 justify-between flex-col items-center w-full'>
                <img className='h-20' src={getVehicleImage(props.vehicleType)}  alt="car" />
                <div className='w-full mt-5'>

                    <div  className='flex items-center gap-5 p-3 border-b-2 border-gray-200' > 
                        <img className='text-lg' src="/map-pin-user-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <img className='text-lg' src="/map-pin-fill.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>
                <button onClick={()=>{
                    props.createride();
                    props.setVehicleFound(true);
                    props.setSelectVehiclePanel(false);
                }} className='w-full mt-3 bg-green-600 text-white  font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default SelectedVehicle;