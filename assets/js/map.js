
const checkboxInput = document.getElementById('checkboxInput');

checkboxInput.addEventListener('change', function() {
  if (checkboxInput.checked) {
    if (checkboxInput) {
        const MyData = 'Birk';
        console.log(MyData);
      
    console.log('Checkbox is checked');
    const data = {MyData};
    localStorage.setItem('checkboxData', JSON.stringify(data));
    console.log('Data inserted into local storage:', data);
    }
  } else {
    console.log('Checkbox is not checked');
    localStorage.removeItem('checkboxData');
    console.log('Data removed from local storage');
  }
});





const myButton = document.getElementById('checkboxInput');

    if (localStorage.getItem('myData') !== null) {
        myButton.classList.add('active');
      } else {
        myButton.classList.remove('active');
      }


