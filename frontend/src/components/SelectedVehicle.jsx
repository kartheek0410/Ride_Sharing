import React from 'react';

function SelectedVehicle(props){
   

    return (
        <div>
           <h5 className='p-1 w-[93%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
                props.setSelectVehiclePanel(false);
            }}><img className='text-3xl  text-gray-200'src="/arrow-down-wide-line.png" alt="arrow down" /></h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3> 
            
            <div className='flex gap-2 justify-between flex-col items-center w-full'>
                <img className='h-20' src="/car.png" alt="car" />
                <div className='w-full mt-5'>

                    <div  className='flex items-center gap-5 p-3 border-b-2 border-gray-200' > 
                        <img className='text-lg' src="/map-pin-user-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>MG Road city center, Ongole</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <img className='text-lg' src="/map-pin-fill.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>MG Road city center, Ongole</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                        <div>
                            <h3 className='text-lg font-medium'>₹193.16</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>
                <button onClick={()=>{
                   
                    props.setVehicleFound(true);
                    props.setSelectVehiclePanel(false);
                }} className='w-full mt-5 bg-green-600 text-white  font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default SelectedVehicle;