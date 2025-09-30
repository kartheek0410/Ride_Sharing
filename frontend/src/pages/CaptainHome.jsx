import React ,{useEffect , useContext}from 'react';
import { data, Link } from 'react-router-dom';
import CaptainDeatails from '../components/CaptainDetails.jsx';
import RidePopUp from '../components/RidePopUp.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp.jsx';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import { SocketContext } from '../context/socketContext.jsx';
import axios from "axios";
import LiveTracking from '../components/LiveTracking.jsx';



function CaptainHome() {
  const [ridePopUpPanel,setRidePopUpPanel] =React.useState(false);
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = React.useState(false);
  const [ride,setRide] = React.useState(null)
  
  const ridePopUpPanelRef = React.useRef(null);
  const confirmRidePopUpPanelRef = React.useRef(null);
  
  const {captain} = useContext(CaptainDataContext);
  const {sendMessage , receiveMessage} = useContext(SocketContext);

  useEffect(()=>{
    // console.log(captain);
    sendMessage("join", { id: captain.id, userType: "captain" });  


    const updateLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position.coords.latitude,position.coords.longitude);
          sendMessage('update-captain-location', {
            id: captain.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      }
    };
    updateLocation();

    const locationInterval = setInterval(updateLocation,10000);

    // return () => clearInterval(locationInterval);

  });


  receiveMessage('new-ride',(data)=>{
    // console.log("in frontend captain-home: ",data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  receiveMessage('ride-ended',()=>{
    localStorage.removeItem("captainCurrentRide");
  });
  

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideid: ride.id, captainid: captain.id },
        { withCredentials: true } 
      );

      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);

      // console.log("Ride confirmed:", response.data);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }






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
        <div className='fixed p-6 top-0 flex item-center justify-between w-screen z-[1]'>
          <img className='w-16 h-6 mt-1' src="/Uber.png" alt="uber png" />
          <Link to="/captain-home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <img className='text-lg font-medium' src="/logout-box-r-line.png" alt="" />
          </Link>
        </div>

        <div className='h-3/5'>
            <LiveTracking/>

        </div>
        <div className='h-2/5 p-6'>
          <CaptainDeatails/>
        </div>

        <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white  px-3 py-6 pt-12'>
          <RidePopUp 
            ride={ride}
            setRidePopUpPanel={setRidePopUpPanel} 
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            confirmRide={confirmRide}
          />
        </div>
        <div ref={confirmRidePopUpPanelRef} className='fixed w-full z-10 h-screen  bottom-0 translate-y-full bg-white  px-3 py-6 pt-12'>
          <ConfirmRidePopUp 
            ride={ride}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
            setRidePopUpPanel={setRidePopUpPanel}/>
        </div>

      </div>      
  );
}

export default CaptainHome;