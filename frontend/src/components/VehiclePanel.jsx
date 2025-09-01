import React from 'react';

function VehiclePanel(props){


    return (
        <div>
            <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
                props.setVehiclePanelOpen(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>  
            
            <div onClick={()=>{
                props.setSelectVehiclePanel(true);
                props.setVehicleType('car');
            }} className='flex border-2 border-gray-100 mb-2 rounded-xl w-full items-center justify-between p-3 active:border-black'>
            <img className='h-12' src="/car.png" alt="car png" />
            <div className='ml-2 w-1/2'>
                <h4 className="font-medium text-base">
                UberGo 
                <span className="inline-flex items-center  ml-2">
                    <img className="w-4 h-4" src="/user-fill.png" alt="user icon" />
                    4
                </span>
                </h4>
                <h5 className='font-medium text-sm'>2 min away</h5>
                <p className='font-normal text-xs'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
            </div>
            <div onClick={()=>{
                props.setSelectVehiclePanel(true);
                props.setVehicleType('moto');
            }} className='flex border-2 border-gray-100 mb-2 rounded-xl w-full items-center justify-between p-3 active:border-black'>
            <img className='h-12' src="/bike.png" alt="bike png" />
            <div className='-ml-3 w-1/2'>
                <h4 className="font-medium text-base">
                Moto 
                <span className="inline-flex items-center  ml-2">
                    <img className="w-4 h-4" src="/user-fill.png" alt="user icon" />
                    1
                </span>
                </h4>
                <h5 className='font-medium text-sm'>4 mins away</h5>
                <p className='font-normal text-xs'>Affordable, motor cycle  rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
            </div>
            <div onClick={()=>{
                props.setSelectVehiclePanel(true);
                props.setVehicleType('auto');
            }} className='flex border-2 border-gray-100 mb-2 rounded-xl w-full items-center justify-between p-3 active:border-black'>
            <img className='h-12' src="/auto.png" alt="auto png" />
            <div className='ml-2 w-1/2'>
                <h4 className="font-medium text-base">
                UberAuto 
                <span className="inline-flex items-center  ml-2">
                    <img className="w-4 h-4" src="/user-fill.png" alt="user icon" />
                    3
                </span>
                </h4>
                <h5 className='font-medium text-sm'>3 mins away</h5>
                <p className='font-normal text-xs'>Affordable auto ride</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel