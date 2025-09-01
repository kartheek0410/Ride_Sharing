import React ,{useEffect,useContext} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { SocketContext } from '../context/socketContext.jsx';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking.jsx';


function Riding(props){

    const getVehicleImage = (type) => {
            if (type === "car") return "/car.png";
            if (type === "auto") return "/auto.png";
            if (type === "moto") return "/bike.png";
            return "/car.png"; 
    };

    const navigatec = useNavigate();
   const {sendMessage,receiveMessage} = useContext(SocketContext);

    receiveMessage("ride-ended" , ()=>{
        localStorage.removeItem("currentRide");
        navigatec('/home');
    })

    const location = useLocation();
    let ride = location.state?.ride;
    
    if (!ride) {
        const storedRide = localStorage.getItem("currentRide");
        if (storedRide) {
            ride = JSON.parse(storedRide);
        }
    }

        

    return (
        <div className='h-screen'>
            <Link to="/home" className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <img className='text-lg font-medium' src="/home-4-line.png" alt="" />
            </Link>

            <div className='h-1/2'>
                <LiveTracking/>

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-10' src={getVehicleImage(ride?.vehicletype)}  alt="car" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captaininfo.firstname + " "+ ride?.captaininfo.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captaininfo.vehicleplate}</h4>
                        <p className='text-sm text-gray-600'>Maruthi Suzuki</p>
                    </div>
                </div>
                
                <div className='flex gap-2 justify-between flex-col items-center w-full'>
                    <div className='w-full mt-5'>

                       
                        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                            <img className='text-lg' src="/map-pin-fill.png" alt="" />
                            <div>
                                <h3 className='text-lg font-medium'>DESTINATION</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <img className='text-lg' src="/bank-card-2-line.png" alt="" />
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>

                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white  font-semibold p-2 rounded-lg'>Make a Payment</button>

            </div>
        </div>
    );
}

export default Riding;