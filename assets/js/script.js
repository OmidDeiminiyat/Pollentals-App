// write cool JS hwere!!

let map
let PopUp = false;

let mapElement = document.getElementById('map')

let currentLat
let currentLong

let currentPage


getLocation();

/* function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(GetAll);
   
  } else {
    document.getElementById("demo").innerHTML = "Geolocation is not supported";
  }
}


 async function GetAll(position) {




    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    makeMap(latitude, longitude)

    let myUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,ragweed_pollen&timezone=Europe%2FBerlin&domains=cams_europe`;

    let geoUrl=`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65fb5ea644244903025253axe09afbb`

  try {
    const res = await Promise.all([
      fetch(myUrl),
      fetch(geoUrl)
    ]);
    const data = await Promise.all(res.map(r => r.json()))

    console.log(data[0]);
    console.log(data[1]);

  } catch {
    throw Error("Promise failed");
  }
}; */




function makeMap(latitude, longitude) {

  map = L.map('map').setView([latitude, longitude], 13);

  //var marker = L.marker([latitude, longitude]).addTo(map);
  map.on('click', onMapClick);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}



function onMapClick(e) {

  //moveMapToMarker(10,10);

  console.log(e.latlng);




  let myContent = `<P>Gem denne placering.</p><button onClick="MapPopupCallBack(${e.latlng.lat},${e.latlng.lng})">ok</button>`
  PopUp = L.popup(e.latlng, { content: myContent }).openOn(map);

  /* var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  getPollenData(e.latlng.lat,e.latlng.lng)  */
}


function moveMapToMarker(latitude, longitude) {
  map.setView([latitude, longitude], 13);
}




function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionSucces);

  } else {
    document.getElementById("demo").innerHTML = "Geolocation is not supported";
  }
}



function positionSucces(position) {
  currentLat = position.coords.latitude
  currentLong = position.coords.longitude

  // makeMap(currentLat, currentLong);
  getPollenData(position.coords.latitude, position.coords.longitude)

}


function getPollenData(latitude, longitude) {


  /* console.log("get pollen data: "+position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude; */

  getLocationName(latitude, longitude);

  let myUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,ragweed_pollen&timezone=Europe%2FBerlin&domains=cams_europe`;

  fetch(myUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data
      //console.log(data);
      PollenDataRecieved(data)
      secondData(data)
      thirdData(data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });
}


function getLocationName(lat, long) {




  fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=65fb5ea644244903025253axe09afbb`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data
     //  console.log(data.address.amenity);
  // console.log(data.address.hamlet+' '+data.address.village);
  document.getElementById('locationName').innerHTML = data.address.amenity;


    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });


}


removeMap()





function navCallBack(myNavItem) {

  switch (myNavItem) {
    case "map":
      console.log("map");
      makeMap(currentLat, currentLong);
      break;
    case "settings":
      console.log("settings");
      map.remove()
      break;
    case "home":
      console.log("home");
      map.remove()
      break;
    default:

      break;
  }

}

function MapPopupCallBack(lat, lng) {
  console.log("pop up");
  map.closePopup(PopUp)
  PopUp = false;

  var marker = L.marker([lat, lng]).addTo(map).bindPopup("Saved Location");
  getPollenData(lat, lng)

}


function PollenDataRecieved(data) {
console.log(data)
  console.log(data.current.alder_pollen);

  const imageUrl = 'https://via.placeholder.com/300'

  const dataContainer = document.getElementById('dataContainer');


const MyDiv = document.createElement('div');
  
const paragraf = document.createElement('h4');
paragraf.classList.add('FirstParaf');
paragraf.innerText = 'Birk:';
MyDiv.appendChild(paragraf);
const cardImage = document.createElement('img');
      cardImage.classList.add('card-image');
      cardImage.src = imageUrl;
      
const Line = document.createElement('h1');
Line.classList.add('SecondParaf');
Line.innerHTML = data.current.alder_pollen;
MyDiv.appendChild(Line);

const Calculator = data.current.alder_pollen * 100 + 'px';
const createchart = document.createElement('Span');
createchart.classList.add('chart');
createchart.style.border = '1px solid #ccc';
createchart.style.width = Calculator + 'px';
createchart.style.backgroundColor = 'orange';
createchart.style.height = '9px';


dataContainer.appendChild(cardImage);
dataContainer.appendChild(MyDiv);
dataContainer.appendChild(createchart);

 
}





function secondData(data) {
    console.log(data)
      console.log(data.current.alder_pollen);
    
      const SecondimageUrl = 'https://via.placeholder.com/300'
    
      const myCont = document.getElementById('SecondContainer');


const SecondDiv = document.createElement('div');
SecondDiv.classList.add('FirstDiv');
  
const Secondparagraf = document.createElement('h4');
Secondparagraf.classList.add('FirstParaf');
Secondparagraf.innerText = 'Elm:';
SecondDiv.appendChild(Secondparagraf);
const SecondImage = document.createElement('img');
SecondImage.classList.add('card-image');
SecondImage.src = SecondimageUrl;
      
const SecondLine = document.createElement('h1');
SecondLine.classList.add('SecondParaf');
SecondLine.innerHTML = data.current.birch_pollen;
SecondDiv.appendChild(SecondLine);

const SecondCalculator = data.current.alder_pollen + 'px';
const Secondcreatechart = document.createElement('Span');
Secondcreatechart.classList.add('chart');
Secondcreatechart.style.border = '1px solid #ccc';
Secondcreatechart.style.width = SecondCalculator + 'px';
Secondcreatechart.style.backgroundColor = 'orange';
Secondcreatechart.style.height = '9px';


myCont.appendChild(SecondImage);
myCont.appendChild(SecondDiv);
myCont.appendChild(Secondcreatechart);

}
// here 






function thirdData(data) {
    console.log(data)
      console.log(data.current.alder_pollen);
    
      const SecondimageUrl = 'https://via.placeholder.com/300'
    
      const myCont = document.getElementById('ThirdContainer');


const SecondDiv = document.createElement('div');
SecondDiv.classList.add('FirstDiv');
  
const Secondparagraf = document.createElement('h4');
Secondparagraf.classList.add('FirstParaf');
Secondparagraf.innerText = 'Fisk:';
SecondDiv.appendChild(Secondparagraf);
const SecondImage = document.createElement('img');
SecondImage.classList.add('card-image');
SecondImage.src = SecondimageUrl;
      
const SecondLine = document.createElement('h1');
SecondLine.classList.add('SecondParaf');
SecondLine.innerHTML = data.current.grass_pollen;
SecondDiv.appendChild(SecondLine);

const SecondCalculator = data.current.alder_pollen + 'px';
const Secondcreatechart = document.createElement('Span');
Secondcreatechart.classList.add('chart');
Secondcreatechart.style.border = '1px solid #ccc';
Secondcreatechart.style.width = SecondCalculator + 'px';
Secondcreatechart.style.backgroundColor = 'orange';
Secondcreatechart.style.height = '9px';


myCont.appendChild(SecondImage);
myCont.appendChild(SecondDiv);
myCont.appendChild(Secondcreatechart);

}
// here 





// save locale storage

