import React from 'react';
import {useGSAP} from '@gsap/react';
import {gsap} from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx';
import VehiclePanel from '../components/VehiclePanel.jsx';
import SelectedVehicle from '../components/SelectedVehicle.jsx';
import LookingForDriver from '../components/LookingForDriver.jsx';
import WaitingForDriver from '../components/WaitingForDriver.jsx';




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
  



  function submitHandler(e){
    e.preventDefault();

  }
  

  useGSAP(function(){
    gsap.to(panelRef.current, {height: panelOpen ? "70%" : "0%"});
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



  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="/Uber.png" alt="uber logo" />
      
      <div className='h-screen w-screen' >
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="/map.jpg" alt="uber map design" />
      </div>

      {/* loction search panel */}
      <div className='flex flex-col justify-end h-screen absolute  absolute w-full  top-0'>


        <div className='h-[30%] p-6 bg-white relative'>

          <h5 ref={closeRef} onClick={
            ()=>{setPanelOpen(!panelOpen)}
          } className='absolute opacity-0 right-6 top-6 text-2xl'>
            <img src="/arrow-down-wide-line.png" alt="arrow down" />
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit ={(e)=> {submitHandler(e)}}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
              <input 
              onClick={()=>{setPanelOpen(true)}}
              value={pickup}
              onChange={(e)=>{ setPickup(e.target.value)}}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' 
              type="text" 
              placeholder='Add a pick-up location' 
              />
              <input 
              onClick={()=>{setPanelOpen(true)}}
              value={destination}
              onChange={(e)=>{ setDestination(e.target.value)}}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg mt-3 w-full' 
              type="text" 
              placeholder='Enter your destination'/>
          </form>

        </div>

        <div ref={panelRef} className='bg-white h-[0]'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>


      </div>


        {/* vehicles Panel for the selected location */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-10 pt-12'>
        <VehiclePanel setSelectVehiclePanel={setSelectVehiclePanel}  setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

        {/* selected vehicle panel */}
      <div ref={SelectedPanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12'>
        <SelectedVehicle setSelectVehiclePanel={setSelectVehiclePanel} setVehicleFound = {setVehicleFound}/>
      </div>


      {/* looking for driver to accept ride */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/> 
      </div>

      {/* waiting for dirver to pickup if i want to see remove tranlate-y-full */}
      {/* make it work properly when driver accepts it should pop up currently it wont */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>

    </div>
  );
}

export default AppHome;