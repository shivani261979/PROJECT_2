

// COVID API 


function throttleLiveData(){

        // fetch the last run time in seconds since epoch - Jan 1, 1970
    var lastRun = localStorage.getItem('lastRunTime')

        // fetch current time since epoch in seconds
    var curTime = seconds_since_epoch();

    console.log("curTime: " + curTime + " lastRunTime: " + lastRun);

    if( (curTime - 30)  < lastRun ){    
                // if last api call was less than 30 seconds ago, use cached values from local Storage

        console.log("using data from localStorage");
        var totalCases = localStorage.getItem('totalCases')
        var newCases = localStorage.getItem('newCases')

            // populate banner using values from local storage
        populateBanner(totalCases, newCases);

    } else {    // else make an api call to fetch latest stats on COVID

        console.log("fetching live using api");
        fetchLiveData();
    }

}

function fetchLiveData(){
    // makes ajax call to retrieve live stats on COVID for all countries 

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-live-stats.p.rapidapi.com/livestats",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-live-stats.p.rapidapi.com",
            "x-rapidapi-key": "c5de5819dfmsh0cabf373f4e4d56p18a05bjsn8cbfe5ee0079"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

            // we're interested in stats for USA only.
        fetchUsaAndpopulateBanner(response);
    });
}



function fetchUsaAndpopulateBanner(jsonPkt){

    var jsonUSA = getDataForUSA(jsonPkt);

    saveToLocalStorage(jsonUSA.totalCases, jsonUSA.newCases);
    populateBanner(jsonUSA.totalCases, jsonUSA.newCases);
}

function getDataForUSA(jsonPkt){
    // goes through response received from COVID api call to find and return JSON data for USA only.

    // we want to go through all countries in array - i.e. property 'countryWise'
    for(var x=0; x < jsonPkt.countryWise.length; x++){

        console.log("checking - " , jsonPkt.countryWise[x]);

        if(jsonPkt.countryWise[x].country == "USA")
            return jsonPkt.countryWise[x];  // return jsonBlock for USA

    }

    return null;
}

function saveToLocalStorage(totalCases, newCases ){
    // stores totalCases, newCases and lastRunTime to localStorage

    var curTime = seconds_since_epoch();

    localStorage.setItem('totalCases', totalCases);
    localStorage.setItem('newCases', newCases);
    localStorage.setItem('lastRunTime', curTime);

}

function populateBanner(totalCases, newCases){
    $(".footerBanner").text("Covid-19 USA:   Total Cases - " +  totalCases + "   New Cases today - " + newCases );
}


function seconds_since_epoch(){ 
    return Math.floor( Date.now() / 1000 )  // dividing by 1000 because we don't want time in milliseconds
}


    // wait for document to load
$(document).ready(function() {

        // throttles api calls because we have only 50 calls per day
    throttleLiveData();

});




