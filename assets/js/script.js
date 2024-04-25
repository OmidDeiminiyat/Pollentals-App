// write cool JS hwere!!

let map
let PopUp = false;

let mapElement = document.getElementById('map')

let currentLat
let currentLong

let currentPage


getLocation();


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






// Firest start


function dataFunc(recivedData) {
  const delPage1 = document.getElementById('AllData');
  const showSingle = document.getElementById('singleDataTwo');
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
  
    const SingleData = document.getElementById('singleDataTwo');
    
  
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
  const CalculFirst = data.hourly.birch_pollen[currentHour];
  if (CalculFirst <= '1' ) {
    const calculone = '10%';
    firstTal.style.width = calculone;
  } else {
    firstTal.style.width = CalculFirst + 50 + '%';
  }

  if (data.current.birch_pollen >= '6') {
    firstTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    firstTal.style.backgroundColor = 'yellow';
  } else {
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
  const CalcuSecond = data.hourly.birch_pollen[currentHour+1];
  if (CalcuSecond <= '1' ) {
    const calcutwo = '10%';
    secondTal.style.width = calcutwo;
  } else {
    secondTal.style.width = CalcuSecond + 50 + '%';
  }

  if (data.current.birch_pollen >= '6') {
    secondTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    secondTal.style.backgroundColor = 'yellow';
  } else {
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
  const CalcuThird = data.hourly.birch_pollen[currentHour+2];
  if (CalcuThird <= '1' ) {
    const CalcuThree = '10%';
    thirdTal.style.width = CalcuThree;
  } else {
    thirdTal.style.width = CalcuThird + 50 + '%';
  }

  if (data.current.birch_pollen >= '6') {
    thirdTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    thirdTal.style.backgroundColor = 'yellow';
  } else {
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
  const calcuForth = data.hourly.birch_pollen[currentHour+3];
  if (calcuForth <= '1' ) {
    const CalcuFour = '10%';
    forthTal.style.width = CalcuFour;
  } else {
    forthTal.style.width = calcuForth + 50 + '%';
  }

  if (data.current.birch_pollen >= '6') {
    forthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    firstforthTalTal.style.backgroundColor = 'yellow';
  } else {
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
  const calcuFifth = data.hourly.birch_pollen[currentHour+4];
  if (calcuFifth <= '1' ) {
    const CalcuFive = '10%';
    fifthTal.style.width = CalcuFive;
  } else {
    fifthTal.style.width = calcuFifth + 50 + '%';
  }

  
  if (data.current.birch_pollen >= '6') {
    fifthTal.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    firstTal.style.backgroundColor = 'yellow';
  } else {
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
  Line.innerHTML = data.current.alder_pollen;
  MyDiv.appendChild(Line);
  

  const createchart = document.createElement('Span');
  createchart.classList.add('chart');
  createchart.style.border = '1px solid #ccc';
  createchart.style.height = '18px';

  if (data.current.alder_pollen >= '6') {
    createchart.style.width = '120px';
    createchart.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
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
  firstTal.innerText = data.hourly.alder_pollen[currentHour];
  const calculator = data.hourly.alder_pollen[currentHour];

if (calculator <= '1' ) {
  const  firstCalculator = '10%';
  firstTal.style.width = firstCalculator;
} else {
  firstTal.style.width = calculator + 50 + '%';
}

  if (data.current.alder_pollen >= '6') {
    firstTal.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
    firstTal.style.backgroundColor = 'yellow';
  } else {
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
  secondTal.innerText = data.hourly.alder_pollen[currentHour+1];
  const Firstcalculator = data.hourly.alder_pollen[currentHour+1];

if (Firstcalculator <= '1' ) {
  const myFirst = '10%';
  secondTal.style.width = myFirst;
} else {
  secondTal.style.width = Firstcalculator + 50 + '%';
}

  if (data.current.alder_pollen >= '6') {
        secondTal.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
    firstTal.style.backgroundColor = 'yellow';
  } else {
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
  thirdTal.innerText = data.hourly.alder_pollen[currentHour+2];
  const thirdCal = data.hourly.alder_pollen[currentHour+2];

  if (thirdCal <= '1' ) {
    const mythirtd = '10%';
    thirdTal.style.width = mythirtd;
  } else {
    thirdTal.style.width = thirdCal + 50 + '%';
  }
  

  if (data.current.alder_pollen >= '6') {
    thirdTal.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
    thirdTal.style.backgroundColor = 'yellow';
  } else {
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
  const ForthCall = data.hourly.alder_pollen[currentHour+3];
  if (ForthCall <= '1' ) {
    const myForthCall = '10%';
    forthTal.style.width = myForthCall;
  } else {
    forthTal.style.width = ForthCall + 50 + '%';
  }

  if (data.current.alder_pollen >= '6') {
    forthTal.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
    forthTal.style.backgroundColor = 'yellow';
  } else {
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
  fifthTal.innerText = data.hourly.alder_pollen[currentHour+4];
  const fifthCall = data.hourly.alder_pollen[currentHour+4];
  if (fifthCall <= '1' ) {
    const myFifthCall = '10%';
    fifthTal.style.width = myFifthCall;
  } else {
    fifthTal.style.width = fifthCall + 50 + '%';
  }



  if (data.current.alder_pollen >= '6') {
    fifthTal.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
    firstTal.style.backgroundColor = 'yellow';
  } else {
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
  
  