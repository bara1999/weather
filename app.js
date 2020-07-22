const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperature-value p");
const descElement= document.querySelector(".temperature-description p");
const locationElement= document.querySelector(".location p");
const notificationElement= document.querySelector(".notification");
 
  
// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const weather={};
weather.temperature={
    unit: "celsius"
}

const  KELVEN =273;

const key = "c8f8bd6aa62001e311433c249ad18d6f";
 if('geolocation' in navigator){
     navigator.geolocation.getCurrentPosition(setPosition, showError);
 }
else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support Geolocation</p>";

}

function setPosition(position){
    console.log(position)
    let longitude = position.coords.longitude;
    let latitude= position.coords.latitude;
    getWeather(latitude, longitude);
   

}

function showError(error){
    
    notificationElement.style.display="block";
    notificationElement.innerHTML= `<p> ${error.message} </p>`;
}

 function getWeather(latitude,longitude)
 {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
       weather.temperature.value= Math.floor(data.main.temp - KELVEN);
       weather.descripition=data.weather[0].descripition;
       weather.iconId = data.weather[0].icon;
       weather.city = data.name;
       weather.country = data.sys.country;

    })
    .then(function(){
        displayWeather();
    })
    
    function displayWeather(){
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML= `${weather.temperature.value}°<span>C</span>`;
        descElement.innerHTML= weather.descripition;
        locationElement.innerHTML= `${weather.city}, ${weather.country}`;

    }

    function celsiusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    }

    tempElement.addEventListener( "click",function(){
        if(weather.temperature.value=== undefined)
        return;

        if(weather.temperature.unit==="celsius"){
            let fehren =celsiusToFahrenheit(weather.temperature.value);
            fehren=Math.floor(fehren);

            tempElement.innerHTML= `${fehren}°<span>F</span>`;
            weather.temperature.unit="fahrenheit";
        }
        else{
            tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit = "celsius";
        }


    })

   
    

}