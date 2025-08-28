import React from 'react';
import { Link } from 'react-router-dom';
import CaptainDeatails from '../components/CaptainDetails.jsx';
import RidePopUp from '../components/RidePopUp.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp.jsx';

function CaptainHome() {
  const [ridePopUpPanel,setRidePopUpPanel] =React.useState(true);
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = React.useState(false);

  
  const ridePopUpPanelRef = React.useRef(null);
  const confirmRidePopUpPanelRef = React.useRef(null);


  useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[ridePopUpPanel]);

   useGSAP(function(){
    if(confirmRidePopUpPanel){
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePopUpPanel]);




  return (
    
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex item-center justify-between w-screen'>
          <img className='w-16 h-6 mt-1' src="/Uber.png" alt="uber png" />
          <Link to="/captain-home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <img className='text-lg font-medium' src="/logout-box-r-line.png" alt="" />
          </Link>
        </div>

        <div className='h-3/5'>
            <img className='h-full w-full object-cover' src="/map.jpg" alt="uber map design" />

        </div>
        <div className='h-2/5 p-6'>
          <CaptainDeatails/>
        </div>

        <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white  px-3 py-6 pt-12'>
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>
        <div ref={confirmRidePopUpPanelRef} className='fixed w-full z-10 h-screen  bottom-0 translate-y-full bg-white  px-3 py-6 pt-12'>
          <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
        </div>

      </div>      
  );
}

export default CaptainHome;