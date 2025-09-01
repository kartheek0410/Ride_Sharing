import React from 'react';

function LocationSearchPanel(props) {
    // console.log(props);

    function handleSuggestionClick(suggestion, latitude, longitude) {
        if (props.activeField === 'pickup') {  
            props.setlat1(latitude);
            props.setlng1(longitude);
            props.setPickup(suggestion);
        } else if (props.activeField === 'destination') {
            props.setlat2(latitude);
            props.setlng2(longitude);
            props.setDestination(suggestion);
        }
    }

    const suggestions = Array.isArray(props.suggestions.suggestions) ? props.suggestions.suggestions : [];

    return (
        <div>
            {suggestions.length === 0 ? (
                <p>No suggestions available.</p>
            ) : (
                suggestions.map((loc, index) => (
                    <div
                        key={index}
                        onClick={() => handleSuggestionClick(loc.display_name, loc.latitude, loc.longitude)}
                        className='flex items-center gap-4 p-3 rounded-xl border-2 border-gray-100 active:border-black my-2 justify-start'>
                        <h2 className='bg-[#eee] flex items-center justify-center h-8 w-10 rounded-full'>
                            <img src="/map-pin-line.png" alt="map pin" />
                        </h2>
                        <h4 className='font-medium'>{loc.display_name}</h4>
                    </div>
                ))
            )}
        </div>
    );
}

export default LocationSearchPanel;
