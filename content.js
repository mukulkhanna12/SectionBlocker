
$(document).ready(function(){
    chrome.storage.local.get(["data"], function(r) {
        var dataObj=r.data;                

        if (dataObj.time!=0)
        {
            var dt = new Date(),sec=0,hours=0,min=0;                
            var currentDate=dt.getMonth()+'/'+dt.getDate()+'/'+dt.getFullYear();
            var currentTime=dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
            var combain=currentDate+' '+currentTime;
            var date1 = new Date(combain);
            var date2 = new Date(dataObj.last_time);
            sec = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
            hours = parseInt(sec / 60 / 60);
            sec = sec - hours * 60 * 60;
            min = parseInt(sec / 60);
            sec = sec - min * 60;
            if (sec == 0) {
                sec = 59;
                if (min == 0) {
                    min = 59;
                    hours--;
                }
                else
                    min--;
            }
            else
                sec--;
            if((hours+min+sec)<=0){
                dataObj.time=0;
                dataObj.timeUpReload=false;  
                chrome.storage.local.set({'data': dataObj});
            }
        }

        if(dataObj.time==0)
        {
            if(dataObj.quorts == "show")
            {
                hideVideosAndRunQuorts();
            }
            else{
                hideVideos();
            }
        }
        
        function quortsShow(){

            $("#related").css("background-color","#CCCC99");
                var div=$("<div id='myContent' class='myContentBox'></div>");
                $("#related").append(div);

                var p1=$("<p id='quorts' class='qoutes_header'>If you don’t build your dream someone will hire you to help build theis.</p>");
                $(div).append(p1);

                var p2=$("<p id='speakerName' align='right' class='qoutes_name'>\"Tony Gaskins\"</p>");
                $(div).append(p2);
           
           
            var allQuorts=
            [
                {
                    "qourts" :"The future belongs to those who believe in the beauty of their dreams.",
                    "author" : "Eleanor Roosevelt"
                },
                {
                    "qourts" : "Don’t watch the clock; do what it does. Keep going.",
                    "author" : "W. Clement Stone"
                },
                {
                    "qourts" : "Keep your eyes on the stars, and your feet on the ground.",
                    "author" : "Theodore Roosevelt"
                },
                {
                    "qourts" : "One way to keep momentum going is to have constantly greater goals.",
                    "author" : "Michael Korda"
                },
                {
                    "qourts" : "Change your life today. Don’t gamble on the future, act now, without delay.",
                    "author" : "Simone de Beauvoir"
                },
                {
                    "qourts" : "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.",
                    "author" : "Jeff Bezos"
                },
                {
                    "qourts" : "The difference between the impossible and the possible lies in a person’s determination.",
                    "author" : "Tommy Lasorda"
                },
                {
                    "qourts" : "Take care of your body. It’s the only place you have to live.",
                    "author" : "Jim Rohn"
                },
                {
                    "qourts" : "You just can’t beat the person who never gives up.",
                    "author" : "Babe Ruth"
                }
            ];
          
            function display(i){
                if(i >= allQuorts.length){
                    i = 0;
                }
                setTimeout(function() {
                    $("#quorts").html(allQuorts[i].qourts);
                    $("#speakerName").html('"'+allQuorts[i].author+'"');
                    display(i + 1)
                },10000);
            }

            display(0);
        }
        
        function hideVideos(){
            // var end=setTimeout(function() {
                $("#player-ads").css("display","none");
                $("ytd-watch-next-secondary-results-renderer").css("display","none");
                $("ytd-playlist-panel-renderer").css("display","none");
            //     clearInterval(end);
            // }, 1000);
        }
        function hideVideosAndRunQuorts(){
            // var end=setTimeout(function() {
                $("#player-ads").css("display","none");
                $("ytd-watch-next-secondary-results-renderer").css("display","none");
                $("ytd-playlist-panel-renderer").css("display","none");
                var checkDivExistOrNot=$('div').hasClass('myContentBox');// important line
                if (!checkDivExistOrNot)
                {
                    quortsShow();
                }
            //     clearInterval(end);
            // }, 1000);
        }  
        });
});
