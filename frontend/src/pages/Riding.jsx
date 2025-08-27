import React from 'react';
import { Link } from 'react-router-dom';

function Riding(props){
    return (
        <div className='h-screen'>
            <Link to="/home" className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <img className='text-lg font-medium' src="/home-4-line.png" alt="" />
            </Link>

            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="/map.jpg" alt="uber map design" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-10' src="/car.png" alt="car" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>kartheek</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>Ap 27 AB 6969</h4>
                        <p className='text-sm text-gray-600'>Ford Mustang </p>
                    </div>
                </div>
                
                <div className='flex gap-2 justify-between flex-col items-center w-full'>
                    <div className='w-full mt-5'>

                       
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
                </div>
                <button className='w-full mt-5 bg-green-600 text-white  font-semibold p-2 rounded-lg'>Make a Payment</button>

            </div>
        </div>
    )
}

export default Riding;