import axios from "axios";

export const getCoordinates= async(req,res)=>{
    const city = req.body.city;

    try{
        const result = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
        const data = result.data;
        const nearbyAreas = [];
        data.forEach(element =>{
            nearbyAreas.push({
                "lattitude" : element.lat,
                "longitude" : element.lon,
                "name" : element.name,
                "display_name" : element.display_name
            })
        });

        // console.log(data);
        return res.send(nearbyAreas);
    }catch(err){
        return res.json({"Error in Fetching coordinates" : err?.message});
    }


}

export const getFare =async (req,res)=>{
    const {Lat1,Lng1,Lat2,Lng2} = req.body;
    // console.log(Lat1,Lng1,Lat2,Lng2);
    try{
        let result = await axios.get(`http://router.project-osrm.org/route/v1/driving/${Lng1},${Lat1};${Lng2},${Lat2}`);

        const distance = result.data.routes[0].distance;
        const time = (result.data.routes[0].duration);
        console.log(distance,time);
        const baseFare ={
            auto : 30,
            car : 50 ,
            moto : 20
        };
        const perKmRate={
            auto : 10,
            car: 15,
            moto : 8
        };
        const perMinRate ={
            auto : 2,
            car : 3,
            moto : 1.5
        };

        const fare ={
            auto : Math.round(baseFare.auto + ((distance/1000) * perKmRate.auto) + ((time/60)* perMinRate.auto) ),
            car : Math.round(baseFare.car + ((distance/1000) * perKmRate.car) + ((time/60)* perMinRate.car) ),
            moto : Math.round(baseFare.moto + ((distance/1000)* perKmRate.moto )+ ((time/60)*perMinRate.moto))
        };

        // console.log(fare);

        return res.status(200).json(fare);

    }catch(err){
        return res.status(404).send("Error");
        console.log(err);
    }

}


