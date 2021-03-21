
$(document).ready(function () {
    var searchHistoryOfContainer = $('#prev-search');
    var searchForm = $('#search-form');
    var apiKey = '564ecbbf68c5305bd1631046fcfc2982';
    var first_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    var second_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
    var first_IconURL = '';
    
    var currentWeatherContainer = $('#current-weather');
    var fiveDayWeatherContainer = $('#five-day-weather-forecast');


    //WHEN I search for a city
    searchForm.submit(function (event) {
        event.preventDefault();
        //console.log(event);
        var formValues = $(this).serializeArray(); // $(this) form that just submitted
        //console.log(formValues);
        var city = formValues[0].value; // 0 cause entering only one value

        // SELECTING THE DIV CLASS FOR JQUERY SELECTORS
        var searchTermDiv = $('<div class="prev-search">');
        searchTermDiv.text(city);
        searchHistoryOfContainer.append(searchTermDiv);
        console.log(formValues, city);
        // Real value received from form submission
        searchForUserInput(city); // call for current weather
        searchForFiveDayForcast(city) // call for future weather list

    });


    function searchForUserInput(city) {
        var fullURL = first_URL + "q=" + city + "&appid=" + apiKey;
        console.log(first_URL);

        //WHEN I view current weather conditions for that city <br>
        //THEN I am presented with the city name, the date, an icon representation of 
        //weather conditions, the temperature, the humidity, the wind speed, and the UV index <br>
        fetch(fullURL).then(function (response) {
            return response.json();
        })
            .then(function (data) { // once the data is recieved
                console.log(data);
                var cityName = data.name;
                var temp = data.main.temp;
                var weather = data.weather;
                var iconURL = first_IconURL + weather[0].icon + '.png';
                var wind = data.wind;
                var humidity = data.main.humidity;
                console.log(temp, humidity, weather, wind);

                var nameDiv = $('<div class="city-name">');
                var tempDiv = $('<div class="temp-name">');
                var humidityDiv = $('<div class="humidity-name">');
                var weatherDiv = $('<img class="icon-name">');
                var windDiv = $('<div class="wind-name">');
                nameDiv.text("City: " + cityName);
                weatherDiv.attr('src', iconURL);
                tempDiv.text("Temperature: " + temp + " F");
                humidityDiv.text("Humidity: " + humidity + "%");
                windDiv.text("Wind Speed: " + wind.speed + " MPH");

                currentWeatherContainer.append(weatherDiv);
                currentWeatherContainer.append(nameDiv);
                currentWeatherContainer.append(tempDiv);
                currentWeatherContainer.append(humidityDiv);
                currentWeatherContainer.append(windDiv);

            });

    }

    // API is connected

    // WHEN I view future weather conditions for that city <br>
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    function searchForFiveDayForcast(city) {
        var forcast_URL = second_URL + "q=" + city + "&appid=" + apiKey;
        fetch(forcast_URL).then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log("5 Day Forcast ", data);

            for (var i = 0; i < data.list.length; i++) {
                var isThree = data.list[i].dt_txt.search('15:00:00');
                var cityName = data.city.name;
                if (isThree > -1) {
                    var forcast = data.list[i];
                    var temp = forcast.main.temp;
                    var weather = forcast.weather;
                    var wind = forcast.wind;
                    var humidity = forcast.main.humidity;
                    var day = moment(forcast.dt_txt).format('dddd, MMMM Do');
                    console.log(forcast, temp, humidity, weather, wind, day);
                    var rowDiv = $('<div class="col-5">');
                    var dayDiv = $('<div class="day-name">');
                    var nameDiv = $('<div class="city-name">');
                    var tempDiv = $('<div class="temp-name">');
                    var humidityDiv = $('<div class="humidity-name">');
                    var cityweatherDiv = $('<div class="weather-name">');
                    var windDiv = $('<div class="wind-name">');
                    dayDiv.text(day);

                    nameDiv.text("City: " + cityName);
                    tempDiv.text("Temperature: " + temp + " F");
                    humidityDiv.text("Humidity: " + humidity + "%");
                    windDiv.text("Wind Speed: " + wind.speed + " MPH");

                    rowDiv.append(dayDiv);
                    rowDiv.append(tempDiv);
                    rowDiv.append(humidityDiv);
                    rowDiv.append(windDiv);

                    fiveDayWeatherContainer.append(rowDiv);



                }
            }
        });

    }
});