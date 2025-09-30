import React, { useContext } from 'react'; // <-- ADDED 'useContext' here
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/socketContext.jsx';


function CaptainRiding(props){

    const navigate = useNavigate();
    const [finishRidePanel,setFinishRidePanel]=React.useState(false);
    const finishRidePanelRef =React.useRef(null);
    const {sendMessage,receiveMessage} = useContext(SocketContext); 
   
    receiveMessage("ride-ended" , ()=>{
        localStorage.removeItem("captainCurrentRide");
        navigate('/captain-home');
    });


    const location = useLocation();
    let rideData = location.state?.ride;

    if(!rideData){
  
        const storedRide = localStorage.getItem("captainCurrentRide");
        if (storedRide) {
            rideData = JSON.parse(storedRide);
        }
    
    }

    // console.log(rideData);


    useGSAP(function(){
        if(finishRidePanel){
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
        })
        }else{
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
        }
    },[finishRidePanel]);    


    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex item-center justify-between w-screen'>
            <img className='w-16 h-6 mt-1' src="/Uber.png" alt="uber png" />
            <Link to="/captain-home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <img className='text-lg font-medium' src="/logout-box-r-line.png" alt="" />
            </Link>
            </div>

            <div className='h-4/5'>
                <LiveTracking/>

            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
                onClick={()=>setFinishRidePanel(true)}
            >
                <h5 className='p-1 w-[95%] text-center absolute top-0  flex items-center justify-center' onClick={(e)=>{
                    
                }}><img className='text-3xl  text-gray-200'src="/arrow-up-wide-line.png" alt="arrow down" /></h5>

                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='bg-green-600 text-white  font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-10  bottom-0 translate-y-full bg-white  px-3 py-6 pt-12'>
               <FinishRide 
                rideData = {rideData}
                setFinishRidePanel={setFinishRidePanel}
             
               />
            </div>    
        </div> 
    )
}

export default CaptainRiding;