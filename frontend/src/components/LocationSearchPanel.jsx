import React from 'react';

function LocationSearchPanel(props) {

    // console.log(props);
    const locations =["24B Near Kapoor's cafe, Sheryians Coding School, Ongole",
    "42A MG Road, Ongole City Center",
    "18C Near Railway Station, Ongole"];

    return (
        <div >
            {locations.map((loc,index)=>(
                <div key={index} onClick={()=>{
                    props.setVehiclePanelOpen(true);
                    props.setPanelOpen(false);
                }}
                className='flex items-center gap-4  p-3 rounded-xl border-2 border-gray-100 active:border-black  my-2 justify-start '>
                    <h2 className='bg-[#eee]  flex items-center justify-center h-8 w-10 rounded-full'> <img src="/map-pin-line.png" alt="map pin" /></h2>
                    <h4 className='font-medium'>{loc}</h4>
                </div>
            ))}
           
        </div>
    );
}

export default LocationSearchPanel;