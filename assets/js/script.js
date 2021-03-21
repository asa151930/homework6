
$(document).ready(function () {
    var searchHistoryOfContainer = $('#prev-search');
    var searchForm = $('#search-form');
    var apiKey = '564ecbbf68c5305bd1631046fcfc2982';
    var first_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    var second_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
    var currentContainer = $('#current-weather');

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
                var wind = data.wind;
                var humidity = data.main.humidity;
                console.log(temp, humidity, weather, wind);

                var cityNameDiv = $('<div class="city-name">');
                var cityTempDiv = $('<div class="temp-name">');
                var cityhumidityDiv = $('<div class="humidity-name">');
                var cityweatherDiv = $('<div class="weather-name">');
                var citywindDiv = $('<div class="wind-name">');
                cityNameDiv.text("City: " + cityName);
                cityTempDiv.text("Temperature: " + temp + " F");
                cityhumidityDiv.text("Humidity: " + humidity + "%");
                citywindDiv.text("Wind Speed: " + wind.speed + " MPH");

                currentContainer.append(cityNameDiv);
                currentContainer.append(cityTempDiv);
                currentContainer.append(cityhumidityDiv);
                currentContainer.append(citywindDiv);
                
            });

    }

    // API is connected

    function searchForFiveDayForcast (city) {
        var forcast_URL = second_URL + "q=" + city + "&appid=" + apiKey;
        fetch(forcast_URL).then(function(response) {
            return response.json()
        }).then(function(data){
            console.log("5 Day Forcast ", data);
            var nextFive = [];
            for (var i = 0; i < data.list.length; i++)
            {
                
            }
        })
        // WHEN I view future weather conditions for that city <br>
        // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    }
});