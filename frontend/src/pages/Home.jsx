import React from 'react';
import {Link} from 'react-router-dom';

function Home(){
    return (
        <div className="bg-[url('/trafficlights.jpg')] h-screen pt-8 w-full flex justify-between flex-col bg-cover bg-center">
            <img className='w-16 ml-8' src="/Uber.png" alt="Uber logo" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className='flex justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    );
}
export default Home;