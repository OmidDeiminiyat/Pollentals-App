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
      SingleR(data)
      recivedFirstItem(data)

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
//console.log(data)
  //console.log(data.current.alder_pollen);

  const imageUrl = '../image/Birk.png'

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
//console.log(data)
    //  console.log(data.current.alder_pollen);
    
      const SecondimageUrl = '../assets/image/Elm.png'
    
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


const Secondcreatechart = document.createElement('Span');
Secondcreatechart.classList.add('chart');
Secondcreatechart.style.border = '1px solid #ccc';
Secondcreatechart.style.width = '10px';
Secondcreatechart.style.backgroundColor = 'orange';
Secondcreatechart.style.height = '9px';


myCont.appendChild(SecondImage);
myCont.appendChild(SecondDiv);
myCont.appendChild(Secondcreatechart);

}
// here 




function thirdData(data) {
  // console.log(data)
     
    
      const SecondimageUrl = '../assets/image/fisk.png'
    
      const myCont = document.getElementById('ThirdContainer');


const SecondDiv = document.createElement('div');
SecondDiv.classList.add('FirstDiv');
  
const SecondImage = document.createElement('img');
SecondImage.classList.add('card-image');
SecondImage.src = SecondimageUrl;

const Secondparagraf = document.createElement('h4');
Secondparagraf.classList.add('FirstParaf');
Secondparagraf.innerText = 'Fisk:';
SecondDiv.appendChild(Secondparagraf);

      
const SecondLine = document.createElement('h1');
SecondLine.classList.add('SecondParaf');
SecondLine.innerHTML = data.current.grass_pollen;
SecondDiv.appendChild(SecondLine);


const Secondcreatechart = document.createElement('Span');
Secondcreatechart.classList.add('chart');
Secondcreatechart.style.border = '1px solid #ccc';
Secondcreatechart.style.width = '50px';
Secondcreatechart.style.backgroundColor = 'orange';
Secondcreatechart.style.height = '9px';


myCont.appendChild(SecondImage);
myCont.appendChild(SecondDiv);
myCont.appendChild(Secondcreatechart);

}
// here 





// Firest start


function dataFunc(recivedData) {
  const delPage1 = document.getElementById('AllData');
  const showSingle = document.getElementById('singleDataDisplay');
  showSingle.style.display='grid';
  delPage1.style.display = 'none';
  console.log(recivedData);

  recivedFirstItem()
}

function recivedFirstItem(data) {
 
  console.log(data.current.birch_pollen);
 const currentTime = new Date();

 const currentHour = currentTime.getHours();

 let futureHours = [];
 for (let hour = currentHour + 1; hour < 24; hour++) {
     futureHours.push(hour);
 }
 
 console.log(futureHours);
    const imageUrl = '../assets/image/Birk.png'
  
    const SingleData = document.getElementById('singleDataDisplay');
    
  
  const MyDiv = document.createElement('div');
  MyDiv.classList.add('FirstDiv');
    
  const paragraf = document.createElement('h4');
  paragraf.classList.add('FirstParaf');
  paragraf.innerText = 'Birk:';
  MyDiv.appendChild(paragraf);
  const cardImage = document.createElement('img');
        cardImage.classList.add('card-image');
        cardImage.src = imageUrl;
        
  const Line = document.createElement('h1');
  Line.classList.add('SecondParaf');
  Line.innerHTML = data.current.birch_pollen;
  MyDiv.appendChild(Line);
  

  const createchart = document.createElement('Span');
  createchart.classList.add('chart');
  createchart.style.border = '1px solid #ccc';
  createchart.style.height = '18px';
  if (data.current.birch_pollen >= '6') {
    createchart.style.width = '120px';
    createchart.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    createchart.style.width = '60px';
    createchart.style.backgroundColor = 'yellow';
  } else {
    createchart.style.width = '40px';
    createchart.style.backgroundColor = 'green';
  }

  const newDivP = document.createElement('div');
  newDivP.classList.add('divList');
  

  const hourLine = document.createElement('p');
  hourLine.classList.add('hourLine');
  hourLine.innerHTML = currentHour + ":00";
  const firstTal = document.createElement('Span');
  firstTal.classList.add('chart');
  firstTal.style.border = '1px solid #ccc';
  firstTal.style.height = '18px';
  firstTal.style.margin = '14px 0 0 0';
  firstTal.innerText = data.hourly.birch_pollen[currentHour];

  if (data.current.birch_pollen >= '6') {
    firstTal.style.width = '120px';
    firstTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    firstTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    firstTal.style.width = '42px';
    firstTal.style.backgroundColor = 'green';
  }


  const hourLineTwo = document.createElement('p');
  hourLineTwo.classList.add('hourLine');
  hourLineTwo.innerHTML = currentHour + 1 + ":00";
  const secondTal = document.createElement('Span');
  secondTal.classList.add('chart');
  secondTal.style.border = '1px solid #ccc';
  secondTal.style.height = '18px';
  secondTal.style.margin = '14px 0 0 0';
  secondTal.innerText = data.hourly.birch_pollen[currentHour+1];

  if (data.current.birch_pollen >= '6') {
    secondTal.style.width = '120px';
    secondTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    secondTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    secondTal.style.width = '42px';
    secondTal.style.backgroundColor = 'green';
  }


  const hourLineThree = document.createElement('p');
  hourLineThree.classList.add('hourLine');
  hourLineThree.innerHTML = currentHour + 2 + ":00";
     const thirdTal = document.createElement('Span');
  thirdTal.classList.add('chart');
  thirdTal.style.border = '1px solid #ccc';
  thirdTal.style.height = '18px';
  thirdTal.style.margin = '14px 0 0 0';
  thirdTal.innerText = data.hourly.birch_pollen[currentHour+2];

  if (data.current.birch_pollen >= '6') {
    thirdTal.style.width = '120px';
    thirdTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    thirdTal.style.width = '60px';
    thirdTal.style.backgroundColor = 'yellow';
  } else {
    thirdTal.style.width = '42px';
    thirdTal.style.backgroundColor = 'green';
  }

  const hourLinefour = document.createElement('p');
  hourLinefour.classList.add('hourLine');
  hourLinefour.innerHTML = currentHour + 3 + ":00";
     const forthTal = document.createElement('Span');
  forthTal.classList.add('chart');
  forthTal.style.border = '1px solid #ccc';
  forthTal.style.height = '18px';
  forthTal.style.margin = '14px 0 0 0';
  forthTal.innerText = data.hourly.alder_pollen[currentHour+3];

  if (data.current.birch_pollen >= '6') {
    firstTal.style.width = '120px';
    forthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    forthTal.style.width = '60px';
    firstforthTalTal.style.backgroundColor = 'yellow';
  } else {
    forthTal.style.width = '42px';
    forthTal.style.backgroundColor = 'green';
  }


  const hourLineFive = document.createElement('p');
  hourLineFive.classList.add('hourLine');
  hourLineFive.innerHTML = currentHour + 4 + ":00";
     const fifthTal = document.createElement('Span');
  fifthTal.classList.add('chart');
  fifthTal.style.border = '1px solid #ccc';
  fifthTal.style.height = '18px';
  fifthTal.style.margin = '14px 0 0 0';
  fifthTal.innerText = data.hourly.birch_pollen[currentHour+4];
  if (data.current.birch_pollen >= '6') {
    fifthTal.style.width = '120px';
    fifthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    fifthTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    fifthTal.style.width = '42px';
    fifthTal.style.backgroundColor = 'green';
  }



  newDivP.appendChild(hourLine);
  newDivP.appendChild(firstTal);

  newDivP.appendChild(hourLineTwo);
  newDivP.appendChild(secondTal);

  newDivP.appendChild(hourLineThree);
  newDivP.appendChild(thirdTal);

  newDivP.appendChild(hourLinefour);
  newDivP.appendChild(forthTal);

  newDivP.appendChild(hourLineFive);
  newDivP.appendChild(fifthTal);


  MyDiv.appendChild(createchart);
  SingleData.appendChild(cardImage);
  SingleData.appendChild(MyDiv);
  SingleData.appendChild(newDivP);

   console.log(letArr);



}
  
  
  





// here second start

function SecondFunc(SecondDataRecived) {
  const delPage1 = document.getElementById('AllData');
  const mysecond = document.getElementById('singleDataDisplay');
  mysecond.style.display='grid';
  delPage1.style.display = 'none';
  console.log(SecondDataRecived);
  SingleR()


}


function SingleR(data) {
  console.log(data)
 //const letArr = data.hourly.birch_pollen;
 const currentTime = new Date();

 const currentHour = currentTime.getHours();

 let futureHours = [];
 for (let hour = currentHour + 1; hour < 24; hour++) {
     futureHours.push(hour);
 }
 
 console.log(futureHours);
    const imageUrl = '../assets/image/Elm.png'
  
    const SecondSingle = document.getElementById('singleDataDisplay');
    
  
  const MyDiv = document.createElement('div');
  MyDiv.classList.add('FirstDiv');
    
  const paragraf = document.createElement('h4');
  paragraf.classList.add('FirstParaf');
  paragraf.innerText = 'Elm:';
  MyDiv.appendChild(paragraf);
  const cardImage = document.createElement('img');
        cardImage.classList.add('card-image');
        cardImage.src = imageUrl;
        
  const Line = document.createElement('h1');
  Line.classList.add('SecondParaf');
  Line.innerHTML = data.current.birch_pollen;
  MyDiv.appendChild(Line);
  

  const createchart = document.createElement('Span');
  createchart.classList.add('chart');
  createchart.style.border = '1px solid #ccc';
  createchart.style.height = '18px';
  if (data.current.birch_pollen >= '6') {
    createchart.style.width = '120px';
    createchart.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    createchart.style.width = '60px';
    createchart.style.backgroundColor = 'yellow';
  } else {
    createchart.style.width = '42px';
    createchart.style.backgroundColor = 'green';
  }

  const newDivP = document.createElement('div');
  newDivP.classList.add('divList');
  

  const hourLine = document.createElement('p');
  hourLine.classList.add('hourLine');
  hourLine.innerHTML = currentHour + ":00";
  const firstTal = document.createElement('Span');
  firstTal.classList.add('chart');
  firstTal.style.border = '1px solid #ccc';
  firstTal.style.height = '18px';
  firstTal.style.margin = '14px 0 0 0';
  firstTal.innerText = data.hourly.birch_pollen[currentHour];

  if (data.current.birch_pollen >= '6') {
    firstTal.style.width = '120px';
    firstTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    firstTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    firstTal.style.width = '42px';
    firstTal.style.backgroundColor = 'green';
  }


  const hourLineTwo = document.createElement('p');
  hourLineTwo.classList.add('hourLine');
  hourLineTwo.innerHTML = currentHour + 1 + ":00";
  const secondTal = document.createElement('Span');
  secondTal.classList.add('chart');
  secondTal.style.border = '1px solid #ccc';
  secondTal.style.height = '18px';
  secondTal.style.margin = '14px 0 0 0';
  secondTal.innerText = data.hourly.birch_pollen[currentHour+1];

  if (data.current.birch_pollen >= '6') {
    secondTal.style.width = '120px';
    secondTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    secondTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    secondTal.style.width = '42px';
    secondTal.style.backgroundColor = 'green';
  }


  const hourLineThree = document.createElement('p');
  hourLineThree.classList.add('hourLine');
  hourLineThree.innerHTML = currentHour + 2 + ":00";
     const thirdTal = document.createElement('Span');
  thirdTal.classList.add('chart');
  thirdTal.style.border = '1px solid #ccc';
  thirdTal.style.height = '18px';
  thirdTal.style.margin = '14px 0 0 0';
  thirdTal.innerText = data.hourly.birch_pollen[currentHour+2];

  if (data.current.birch_pollen >= '6') {
    thirdTal.style.width = '120px';
    thirdTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    thirdTal.style.width = '60px';
    thirdTal.style.backgroundColor = 'yellow';
  } else {
    thirdTal.style.width = '42px';
    thirdTal.style.backgroundColor = 'green';
  }

  const hourLinefour = document.createElement('p');
  hourLinefour.classList.add('hourLine');
  hourLinefour.innerHTML = currentHour + 3 + ":00";
     const forthTal = document.createElement('Span');
  forthTal.classList.add('chart');
  forthTal.style.border = '1px solid #ccc';
  forthTal.style.height = '18px';
  forthTal.style.margin = '14px 0 0 0';
  forthTal.innerText = data.hourly.birch_pollen[currentHour+3];

  if (data.current.birch_pollen >= '6') {
    firstTal.style.width = '120px';
    forthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    forthTal.style.width = '60px';
    forthTal.style.backgroundColor = 'yellow';
  } else {
    forthTal.style.width = '42px';
    forthTal.style.backgroundColor = 'green';
  }


  const hourLineFive = document.createElement('p');
  hourLineFive.classList.add('hourLine');
  hourLineFive.innerHTML = currentHour + 4 + ":00";
     const fifthTal = document.createElement('Span');
  fifthTal.classList.add('chart');
  fifthTal.style.border = '1px solid #ccc';
  fifthTal.style.height = '18px';
  fifthTal.style.margin = '14px 0 0 0';
  fifthTal.innerText = data.hourly.birch_pollen[currentHour+4];
  if (data.current.birch_pollen >= '6') {
    fifthTal.style.width = '100px';
    fifthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '' && data.current.birch_pollen <= '6' ) {
    fifthTal.style.width = '60px';
    firstTal.style.backgroundColor = 'yellow';
  } else {
    fifthTal.style.width = '42px';
    fifthTal.style.backgroundColor = 'green';
  }



  newDivP.appendChild(hourLine);
  newDivP.appendChild(firstTal);

  newDivP.appendChild(hourLineTwo);
  newDivP.appendChild(secondTal);

  newDivP.appendChild(hourLineThree);
  newDivP.appendChild(thirdTal);

  newDivP.appendChild(hourLinefour);
  newDivP.appendChild(forthTal);

  newDivP.appendChild(hourLineFive);
  newDivP.appendChild(fifthTal);


  MyDiv.appendChild(createchart);
  SecondSingle.appendChild(cardImage);
  SecondSingle.appendChild(MyDiv);
  SecondSingle.appendChild(newDivP);




   
  }
  
  