
$(document).ready(function () {
    var searchHistoryOfContainer = $('#prev-search');
    var searchForm = $('#search-form');
    var apiKey = '564ecbbf68c5305bd1631046fcfc2982';
    var baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

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
        searchForUserInput(city);

    });


    function searchForUserInput(city) {
        var fullURL = baseURL + "q=" + city + "&appid=" + apiKey;
        console.log(baseURL);
        fetch(fullURL).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
            });

    }

    // API needs to be connected
});