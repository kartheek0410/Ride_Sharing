import React, {useContext, useState,useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import {gsap} from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx';
import VehiclePanel from '../components/VehiclePanel.jsx';
import SelectedVehicle from '../components/SelectedVehicle.jsx';
import LookingForDriver from '../components/LookingForDriver.jsx';
import WaitingForDriver from '../components/WaitingForDriver.jsx';
import { mapStore } from '../../store/mapStore.js';
import { SocketContext } from '../context/socketContext.jsx';
import { UserDataContext } from '../context/UserContext.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking.jsx';



function AppHome() {

  const panelRef = React.useRef(null);
  const closeRef = React.useRef(null); 
  const vehiclePanelRef = React.useRef(null);
  const SelectedPanelRef  =React.useRef(null);
  const vehicleFoundRef = React.useRef(null);
  const waitingForDriverRef = React.useRef(null);

  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [vehiclePanelOpen , setVehiclePanelOpen ] = React.useState(false);
  const [selectVehiclePanel,setSelectVehiclePanel] = React.useState(false);
  const [vehicleFound,setVehicleFound] = React.useState(false); 
  const [waitingForDriver,setWaitingForDriver] =React.useState(false);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([]);
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([]) ;
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)
  const [lat1, setlat1] = useState(null);
  const [lat2, setlat2] = useState(null);
  const [lng1, setlng1] = useState(null);
  const [lng2, setlng2] = useState(null); 
  const [fullData ,setFullData] = useState(null);
  const {user} = useContext(UserDataContext);

  const {getSuggestions,getFare} = mapStore();
  const {sendMessage,receiveMessage} = useContext(SocketContext);
  const navigate = useNavigate();
  
  let pickupTimeout;
  let destinationTimeout;

  useEffect(()=>{
   sendMessage("join", { id: user.id, userType: "user" });
  })

  receiveMessage('ride-confirmed',ride=>{
    // console.log("📩 Ridedata combined confirmed:", ride); 
    setRide(ride);
    setFullData(ride);
    setWaitingForDriver(true);
  });

  receiveMessage('ride-started', ride=>{
    // console.log("ride-started event:",ride);
    setWaitingForDriver(false);
    navigate('/riding', { state: { ride: fullData } });
    localStorage.setItem('currentRide', JSON.stringify(fullData));
  });

  receiveMessage('ride-ended',()=>{
    localStorage.removeItem("currentRide");
    setWaitingForDriver(false);
    setVehicleFound(false);
  })


  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    clearTimeout(pickupTimeout);

    pickupTimeout = setTimeout(async () => {
      setPickupSuggestions(await getSuggestions(value));
    }, 500);
    return;
  }

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    clearTimeout(destinationTimeout);

    destinationTimeout = setTimeout(async () => {
      setDestinationSuggestions(await getSuggestions(value));
    }, 500);
    return;
  }


  function submitHandler(e){
    e.preventDefault();

  }
  
  

  useGSAP(function(){
    gsap.to(panelRef.current, {height: panelOpen ? "65%" : "0%"});
    gsap.to(panelRef.current, {padding: panelOpen ? 24 : 0});
    gsap.to(closeRef.current, {opacity: panelOpen ? 1 : 0});
  },[panelOpen]);

  useGSAP(function(){
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanelOpen]);

  useGSAP(function(){
    if(selectVehiclePanel){
      gsap.to(SelectedPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(SelectedPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[selectVehiclePanel]);

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound]);

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver]);


  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    setFare(await getFare(lat1,lat2,lng1,lng2));
  }

async function createride() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pickup,
        destination: destination,
        vehicleType: vehicleType,
        fare: fare[vehicleType],
      },
      { withCredentials: true } 
    );

    if (response.status === 200) {
      setRide(response.data);
    }
  } catch (err) {
    console.log("error in createride frontend", err.message);
  }
}



  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 z-[2]' src="/Uber.png" alt="uber logo" />
      
      <div className='h-[65%]  w-[100%] z-[-1]' >
        {/* image for temporary use */}
        {/* changed w-full and h-full */}
        {/* <img className='h-full w-full object-cover' src="/map.jpg" alt="uber map design" /> */}
          <LiveTracking />
      </div>

      {/* loction search panel */}
      <div className='flex flex-col justify-end h-screen absolute w-full  top-0 z-[3]'>


        <div className='h-[35%] p-6 bg-white relative'>

          <h5 ref={closeRef} onClick={
            ()=>{setPanelOpen(false)}
          } className='absolute opacity-0 right-6 top-6 text-2xl'>
            <img src="/arrow-down-wide-line.png" alt="arrow down" />
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form className='relative py-3' onSubmit ={(e)=> {submitHandler(e)}}>
            <div className='line absolute h-16 w-1 top-[50%] left-5 -translate-y-1/2 bg-gray-900 rounded-full'></div>
              <input 
              onClick={()=>{
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full ' 
              type="text" 
              placeholder='Add a pick-up location' 
              />
              <input 
              onClick={()=>{
                setActiveField('destination')
                setPanelOpen(true)
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full' 
              type="text" 
              placeholder='Enter your destination'/>
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-2 w-full'>
            Find Trip
          </button>



        </div>

        <div ref={panelRef} className='bg-white h-[0] '>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setlat1={setlat1}
            setlat2={setlat2}
            setlng1={setlng1}
            setlng2={setlng2}
            setPanelOpen={setPanelOpen} 
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>


        {/* vehicles Panel for the selected location */}
      <div ref={vehiclePanelRef}  className={`fixed w-full z-${vehiclePanelOpen ? 10 : 0} bottom-0 bg-white translate-y-full px-3 py-10 pt-12`}>
        <VehiclePanel 
          fare={fare}
          setVehicleType={setVehicleType}
          setSelectVehiclePanel={setSelectVehiclePanel}  
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

        {/* selected vehicle panel */}
      <div ref={SelectedPanelRef}  className={`fixed w-full z-${selectVehiclePanel ? 10 : 0} bottom-0 bg-white translate-y-full px-3 py-6 pt-12`}>
        <SelectedVehicle 
          vehicleType={vehicleType}
          pickup ={pickup}
          destination={destination}
          fare={fare}
          createride={createride}
          setSelectVehiclePanel={setSelectVehiclePanel} 
          setVehicleFound = {setVehicleFound}
        />
      </div>


      {/* looking for driver to accept ride */}
      <div ref={vehicleFoundRef} className={`fixed w-full z-${vehicleFound ? 10 : 0} bottom-0 bg-white translate-y-full px-3 py-6 pt-12`}>
        <LookingForDriver  
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setVehicleFound={setVehicleFound}
        /> 
      </div>

      
      <div ref={waitingForDriverRef} className={`fixed w-full z-${waitingForDriver ? 10 : 0} bottom-0 bg-white  px-3 py-6 pt-12`}>
        <WaitingForDriver 
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
        />
      </div>

    </div>
  );
}

export default AppHome;