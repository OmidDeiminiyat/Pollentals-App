
function FromAalborg(){
    resetFunctionState();
}



function Copenhagen(first, second)  {
   
    var latitude = first;
    var longitude = second;
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
      //  console.log("map");
        makeMap(currentLat, currentLong);
        break;
      case "settings":
     //   console.log("settings");
        map.remove()
        break;
      case "home":
     //   console.log("home");
        map.remove()
        break;
      default:
  
        break;
    }
  
  }
  
  function MapPopupCallBack(lat, lng) {
   // console.log("pop up");
    map.closePopup(PopUp)
    PopUp = false;
  
    var marker = L.marker([lat, lng]).addTo(map).bindPopup("Saved Location");
    getPollenData(lat, lng)
  
  }
  
      
  function PollenDataRecieved(data) {
 
    const Mycalculator = data.current.birch_pollen + '%';
  
    const imageUrl = '../assets/image/Birk.png'
  
    const dataContainer = document.getElementById('dataContainer');
  
  
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
  createchart.style.height = '9px';
  createchart.style.width = Mycalculator;
  if (data.current.birch_pollen >= '6') {
    createchart.style.backgroundColor = 'red';
  } else if (data.current.birch_pollen >= '3' && data.current.birch_pollen <= '6' ) {
    createchart.style.backgroundColor = 'yellow';
  } else {
    createchart.style.backgroundColor = 'green';
  }

  MyDiv.appendChild(createchart);
  
  
  dataContainer.appendChild(cardImage);
  dataContainer.appendChild(MyDiv);

  
    
   
  }
  
  
  
  
  function secondData(data) {
     // console.log(data)
      //  console.log(data.current.alder_pollen);
      const calculator = data.current.alder_pollen + '%';
      console.log('myCalculator=' + calculator);
      
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
  SecondLine.innerHTML = data.current.alder_pollen;
  SecondDiv.appendChild(SecondLine);
  
  const Secondcreatechart = document.createElement('Span');
  Secondcreatechart.classList.add('chart');
  Secondcreatechart.style.border = '1px solid #ccc';
  Secondcreatechart.style.height = '9px';
  Secondcreatechart.style.width = calculator;
  if (data.current.alder_pollen >= '6') {
    Secondcreatechart.style.backgroundColor = 'red';
  } else if (data.current.alder_pollen >= '3' && data.current.alder_pollen <= '6' ) {
   
    Secondcreatechart.style.backgroundColor = 'yellow';
  } else {
   
    Secondcreatechart.style.backgroundColor = 'green';
  }
 

  SecondDiv.appendChild(Secondcreatechart);
  
  
  myCont.appendChild(SecondImage);
  myCont.appendChild(SecondDiv);
  
  
  }
  // here 
  
  
  
  
  
  
  function thirdData(data) {
    const Thirdcalculator = data.current.grass_pollen + '%';      
        const SecondimageUrl = '../assets/image/fisk.png'
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
  

  const Secondcreatechart = document.createElement('Span');
  Secondcreatechart.classList.add('chart');
  Secondcreatechart.style.border = '1px solid #ccc';
  Secondcreatechart.style.height='9px';
  Secondcreatechart.style.width = Thirdcalculator;
  if (data.current.grass_pollen >= '2') {
    Secondcreatechart.style.backgroundColor = 'red';
  } else if (data.current.grass_pollen >= '1' && data.current.grass_pollen <= '2' ) {
    Secondcreatechart.style.backgroundColor = 'yellow';
  } else {
    Secondcreatechart.style.backgroundColor = 'green';
  }

  SecondDiv.appendChild(Secondcreatechart);
  

  myCont.appendChild(SecondImage);
  myCont.appendChild(SecondDiv);

  
  }
    
  function resetFunctionState() {
    document.getElementById('dataContainer').innerHTML = ''; 
    document.getElementById('SecondContainer').innerHTML = ''; 
    document.getElementById('ThirdContainer').innerHTML = ''; 

   // console.log('Function state reset!');
  }
  
  


  
 
  