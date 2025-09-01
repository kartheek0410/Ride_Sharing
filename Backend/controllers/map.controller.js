import axios from "axios";
import { request } from 'undici';


export async function getCoordinates  (req,res){
  const address = req.body.address;

    console.log(address);

  if (!address) {
    return res.status(400).json({ error: "Address is required and cannot be empty." });
  }

  const apiKey = process.env.OLA_API_KEY;  // API key from environment
  const url = `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(address)}&api_key=${encodeURIComponent(apiKey)}`;

  try {
    const { statusCode, body } = await request(url);

    if (statusCode !== 200) {
      console.error('API request failed with status code:', statusCode);
      return res.status(statusCode).json({ error: 'Failed to fetch data from API' });
    }

    const responseBody = await body.json();

    if (responseBody.geocodingResults && responseBody.geocodingResults.length > 0) {
      const location = responseBody.geocodingResults[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      return { latitude, longitude };
    } else {
      console.warn('No geocoding results found for address:', address);
      return res.status(404).json({ error: "No geocoding results found for the provided address." });
    }
  } catch (error) {
    console.error('Error occurred while fetching geocoding data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch geocoding data from the API.' });
  }
};


export const getFare = async (req, res) => {
    const { Lat1, Lng1, Lat2, Lng2 } = req.body;

    try {
       
        const apiKey = process.env.OLA_API_KEY;
        const url = `https://api.olamaps.io/routing/v1/distanceMatrix/basic?origins=${encodeURIComponent(Lat1 + ',' + Lng1)}&destinations=${encodeURIComponent(Lat2 + ',' + Lng2)}&api_key=${encodeURIComponent(apiKey)}`;

        const response = await request(url);
        
     
        const bodyText = await response.body.text();
        
       
        const body = JSON.parse(bodyText);

   
        if (body.status !== 'SUCCESS') {
            return res.status(500).json({ error: 'Failed to fetch data from the API' });
        }

        const distance = body.rows[0].elements[0].distance;
        const duration = body.rows[0].elements[0].duration;
        console.log(distance,duration);

        
        const baseFare = {
            auto: 30,
            car: 50,
            moto: 20,
        };

        const perKmRate = {
            auto: 8,
            car: 12,
            moto: 6,
        };

        const perMinRate = {
            auto: 1.5,
            car: 2.5,
            moto: 1,
        };

        const fare = {
            auto: Math.round(baseFare.auto + ((distance / 1000) * perKmRate.auto) + ((duration / 60) * perMinRate.auto)),
            car: Math.round(baseFare.car + ((distance / 1000) * perKmRate.car) + ((duration / 60) * perMinRate.car)),
            moto: Math.round(baseFare.moto + ((distance / 1000) * perKmRate.moto) + ((duration / 60) * perMinRate.moto)),
        };

        return res.status(200).json(fare);

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Error in fetching fare details' });
    }
};



export const getSuggestions = async (req, res) => {
  const input = req.body.input; 

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  const apiKey = process.env.OLA_API_KEY; 
  const radius = 1500; 

  const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&radius=${radius}&strictbounds=false&api_key=${encodeURIComponent(apiKey)}`;

  try {
    const { statusCode, body } = await request(url);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: 'Failed to fetch data from the API' });
    }

    const responseBody = await body.json();

    
    if (responseBody.predictions && responseBody.predictions.length > 0) {
      const suggestions = responseBody.predictions.map(place => ({
        display_name: place.description, 
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      }));

      return res.status(200).json({ suggestions });
    } else {
      return res.status(404).json({ message: "No suggestions found." });
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};


