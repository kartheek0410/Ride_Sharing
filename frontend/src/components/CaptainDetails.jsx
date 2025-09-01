import React, {useContext} from 'react';
import { CaptainDataContext } from '../context/CaptainContext.jsx';

function CaptainDeatails(){

    const {captain} = useContext(CaptainDataContext);  

    return (
        <div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://as1.ftcdn.net/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
                <h4 className='text-lg font-medium capitalize'>{captain.firstname + " " + captain.lastname}</h4>
              </div>
              <div >
                <h4 className='text-xl font-semibold'>₹295.30</h4>
                <p className='text-sm  text-gray-600'>Earned</p>
              </div>
            </div>

            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
              <div className='text-center'>
                <img className='text-3xl mb-2 ml-7 font-thin' src="/time-line.png" alt="" />
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>

              <div className='text-center'>
                <img  className='text-3xl mb-2 ml-7 font-thin' src="/speed-up-line.png" alt="" />
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>


              <div className='text-center'>
                <img className='text-3xl mb-2 ml-7 font-thin'  src="/booklet-line.png" alt="" />
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>

              </div>
            </div>
        </div>
    );
}

export default CaptainDeatails;