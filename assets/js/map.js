
const checkboxInput = document.getElementById('checkboxInput');
const second = document.getElementById('second');
const third = document.getElementById('third');
const forth = document.getElementById('forth');
const fifth = document.getElementById('fifth');


checkboxInput.addEventListener('change', function() {
  if (checkboxInput.checked) {
    if (checkboxInput) {
        const getContainer = document.getElementById('dataContainer');
        getContainer.style.display='grid';

    } 
    console.log('Checkbox is checked');
    const data = { isChecked: true };
    localStorage.setItem('Birk', JSON.stringify(data));
    console.log('Data inserted into local storage:', data);
  }   
  else {
    console.log('Checkbox is not checked');
    localStorage.removeItem('Birk');
    console.log('Data removed from local storage');
    const getContainer = document.getElementById('dataContainer');
        getContainer.style.display='none';
  }
});



second.addEventListener('change', function() {
    if (second.checked) {
      if (second) {
          var MyData = 'Elm';
          console.log(MyData);
      } 
      console.log('Checkbox is checked');
      const data = { isChecked: true };
      localStorage.setItem('Elm', JSON.stringify(data));
      console.log('Data inserted into local storage:', data);
      const getContainer = document.getElementById('SecondContainer');
      getContainer.style.display='grid';
    }   
    else {
      console.log('Checkbox is not checked');
      localStorage.removeItem('Elm');
      console.log('Data removed from local storage');
      const getContainer = document.getElementById('SecondContainer');
      getContainer.style.display='none';
    }
  });

  third.addEventListener('change', function() {
    if (third.checked) {
      if (third) {
          var MyData = 'Fisk';
          console.log(MyData);
      } 
      console.log('Checkbox is checked');
      const data = { isChecked: true };
      localStorage.setItem('Fisk', JSON.stringify(data));
      console.log('Data inserted into local storage:', data);
      const getContainer = document.getElementById('ThirdContainer');
      getContainer.style.display='grid';
    }   
    else {
      console.log('Checkbox is not checked');
      localStorage.removeItem('Fisk');
      console.log('Data removed from local storage');
      const getContainer = document.getElementById('ThirdContainer');
      getContainer.style.display='none';
    }
  });

  forth.addEventListener('change', function() {
    if (forth.checked) {
      if (forth) {
          var MyData = 'Test';
          console.log(MyData);
      } 
      console.log('Checkbox is checked');
      const data = { isChecked: true };
      localStorage.setItem('Test', JSON.stringify(data));
      console.log('Data inserted into local storage:', data);
    }   
    else {
      console.log('Checkbox is not checked');
      localStorage.removeItem('Test');
      console.log('Data removed from local storage');
    }
  });


  fifth.addEventListener('change', function() {
    if (fifth.checked) {
      if (fifth) {
          var MyData = 'secondTest';
          console.log(MyData);
      } 
      console.log('Checkbox is checked');
      const data = { isChecked: true };
      localStorage.setItem('secondTest', JSON.stringify(data));
      console.log('Data inserted into local storage:', data);
    }   
    else {
      console.log('Checkbox is not checked');
      localStorage.removeItem('secondTest');
      console.log('Data removed from local storage');
    }
  });






 
    if (localStorage.getItem('Birk') !== null) {
        checkboxInput.checked = true;
        console.log('true');
        const getContainer = document.getElementById('dataContainer');
        getContainer.style.display='grid';


        
      } else {
        console.log('Localstorage is empty');
        const getContainer = document.getElementById('dataContainer');
        getContainer.style.display='none';
      }



      if (localStorage.getItem('Elm') !== null) {
        second.checked = true;
        console.log('true');
        const secondCount = document.getElementById('SecondContainer');
        secondCount.style.display='grid';
      } else {
        console.log('Localstorage is empty');
        const secondCount = document.getElementById('SecondContainer');
        secondCount.style.display='none';
      }

      if (localStorage.getItem('Fisk') !== null) {
        third.checked = true;
        console.log('true');
        const thirdCount = document.getElementById('ThirdContainer');
        thirdCount.style.display='grid';
      } else {
        console.log('Localstorage is empty');
        const thirdCount = document.getElementById('ThirdContainer');
        thirdCount.style.display='none';
      }

      if (localStorage.getItem('Test') !== null) {
        forth.checked = true;
        console.log('true');
      } else {
        console.log('Localstorage is empty');
      }

      if (localStorage.getItem('secondTest') !== null) {
        fifth.checked = true;
        console.log('true');
      } else {
        console.log('Localstorage is empty');
      }




      function openButs() {
        const openBox = document.getElementById('myBus');
        openBox.style.display='block';

      }


      function closeBox() {
        const closeBox = document.getElementById('myBus');
        closeBox.style.display='none';
      }
  


      function openCities() {
        const AllCity = document.getElementById('cities');
        AllCity.style.display='block';
      }

      function closeCitie() {
        const closeCity = document.getElementById('cities');
        closeCity.style.display='none';
      }



     