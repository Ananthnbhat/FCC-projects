$('document').ready(function() {

    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?', function(data) {
        if (data.stream === null) {
            $("#fcc").html("FCC is Offline");
        } else {
            $("#fcc").html("FCC is Online");
        }
    });


    streamers.forEach(function(streame)
        //for(var i=0;i<streamers.length;i++)
        {

            $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streame + "/?callback=?", function(data1) {
                if (data1.stream !== null && data1.stream !== undefined) {

                    var name = data1.stream.channel.display_name;
                    var nname = "https://www.twitch.tv/" + name;
                    var status = data1.stream.channel.status;
                    var available = 'Online';

                    $("#onstreamers").prepend("<div class='row b'>" + "<div class='col-md-4'><a class='link' href=" + nname + " target='_blank'>" + name + "</a></div>" + "<div class='col-md-4'>" + status + "</div>" + "<div class='col-md-4'>" + available + "</div></div>");

                } else if (data1.stream === null) {
                    console.log(data1);


                    var nname = "https://www.twitch.tv/" + streame;
                    var name = streame;
                    var sstatus = "User offline";
                    var aavailable = 'Offline';
                    console.log(data1);

                    $("#offstreamers").append("<div class='row b'>" + "<div class='col-md-4'><a class='link' href=" + nname + " target='_blank'>" + name + "</a></div>" + "<div class='col-md-4'>" + sstatus + "</div>" + "<div class='col-md-4'>" + aavailable + "</div></div>");

                } else {
                    var nname = data1._links.channel;

                    $("#closed").append("<div class='row b'>" + "<div class='col-md-4'>" + nname + "</div>" + "<div class='col-md-4'><p>Banned</p></div>" + "<div class='col-md-4'><p>Unavailable</p></div></div>");

                }



            });
        });
});