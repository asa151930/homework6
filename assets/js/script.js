
$(document).ready(function () {
    var searchHistoryOfContainer = $('#prev-search');
    var searchForm = $('#search-form');
    var apiKey = '';
    var baseURL = '';

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
        console.log(city);
    }

});