const button = document.getElementById("get-location");

const cityName = document.getElementById("city-naam");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const cityLat = document.getElementById("latt");
const cityLong = document.getElementById("longg");

const button1 = document.getElementById("search-button");
const input = document.getElementById("city-name");

const cityName1 = document.getElementById("city-naam1");
const cityTime1 = document.getElementById("city-time1");
const cityTemp1 = document.getElementById("city-temp1");


async function getInformation(cityName1) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=93371ecae4c141c887972912241503&q=${cityName1}&aqi=yes`);
    return await promise.json()
}

button1.addEventListener("click", async () => {
    const value = input.value;
    const result1 = await getInformation(value);
    console.log(result1);
    cityName1.innerText = `${result1.location.name}, ${result1.location.region} - ${result1.location.country}`
    cityTime1.innerText = `Local Time: ${result1.location.localtime}`;
    cityTemp1.innerText = `Temperature(degree Celsius): ${result1.current.temp_c}`;
});

async function getData(lat, long) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=93371ecae4c141c887972912241503&q=${lat}, ${long}&aqi=yes`);
    return await promise.json()
}

async function gotLocation(position) {
    const result = await getData(position.coords.latitude, position.coords.longitude);
    console.log(result);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = `Local Time: ${result.location.localtime}`;
    cityTemp.innerText = `Temperature(degree Celsius): ${result.current.temp_c}`;
    cityLat.innerText = `Latitude: ${result.location.lat}`;
    cityLong.innerText = `Longitutde: ${result.location.lon}`;
}

function failedToGet() {
    console.log("There was some issue");
}

button.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});