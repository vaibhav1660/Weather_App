const apikey = "afleq30FYhtkGEfYWAArYq6mRBLBRnVA";

async function getWeather(locationKey){
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apikey}`;
    let response = await fetch(url);
    let data = await response.json();
    return data[0];
}

async function getLocation(city){
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${city}`;
    let response = await fetch(url);
    let data = await response.json();
    return data[0];
}
