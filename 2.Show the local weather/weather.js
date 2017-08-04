var API_KEY = "4cc84491d0876660177b93d3c74f5642";
var cel = false;
var wd;

function dispTemp(num, c) {
    if (c) return Math.round((num - 32) * (5 / 9)) + " C";
    return Math.round(num) + " F";
}

function renderFunc(wd) {
    var cLoc = wdata.name;
    var cWt = wdata.weather[0].description;
    var cTemp = dispTemp(wdata.main.temp, cel);
    var icon = wdata.weather[0].icon;

    $('#cLoc').html(cLoc);
    $('#cWt').html(cWt);
    $('#cTemp').html(cTemp);


    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#cTemp').prepend('<img src="' + iconSrc + '">');
}



$(function() {
    var loc;
    $.getJSON('http://ipinfo.io', function(data) {
        console.log("assigning data...")
        loc = data.loc.split(",");
        console.log(loc);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData) {

            wdata = apiData;
            renderFunc(apiData, cel);
            $('#toggle').click(function() {
                cel = !cel;
                renderFunc(apiData, cel);
            })

        })
    })

})