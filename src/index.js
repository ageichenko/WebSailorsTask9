function init() {

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

  autocomplete.addListener('place_changed', function() {
    // infowindow.close();
    // marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    console.log(place);
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    console.log(lat, lng);
    

    let xhr = new XMLHttpRequest();

   // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
   xhr.open('GET', `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=9538c914476f1e736a5cfc9cac3d269e`, false);
   
   // 3. Отсылаем запрос
   xhr.send();
   
   // 4. Если код ответа сервера не 200, то это ошибка
   if (xhr.status != 200) {
     // обработать ошибку
     alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
   } else {

    let data = JSON.parse(xhr.responseText);
    console.log(data);
    let row = document.createElement('tr');

    let date = document.createElement('td');
    date.innerHTML = 'Date';

    let temp = document.createElement('td');
    temp.innerHTML = 'Temperature (Celsium)';

    let cond = document.createElement('td');
    cond.innerHTML = 'Weather condition';

    row.appendChild(date);
    row.appendChild(temp);
    row.appendChild(cond);

    weather.appendChild(row);
    data.list.forEach( (item) => {
      let rowValue = document.createElement('tr');

     let dateValue = document.createElement('td');
     dateValue.innerHTML= item.dt_txt;
     
     let tempValue = document.createElement('td');
     tempValue.innerHTML= item.main.temp;

     let condValue = document.createElement('td');
     condValue.innerHTML = item.weather[0].main;

     rowValue.appendChild(dateValue);
     rowValue.appendChild(tempValue);
     rowValue.appendChild(condValue);
     
     weather.appendChild(rowValue);
   });
  }
 });
}


init();


