$(document).ready(function () {
    chrome.storage.local.get(["data","defaultDetails"], function (r) {
        var dataObj = r.data;
        var sliderSpeed = dataObj.sliderSpeed;
        var backgroundColor = dataObj.backgroundColor;

        if (dataObj.time != 0) {
            var dt = new Date(),
                sec = 0,
                hours = 0,
                min = 0;
            var currentDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
            var currentTime = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
            var combain = currentDate + ' ' + currentTime;
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
                } else
                    min--;
            } else
                sec--;
            if ((hours + min + sec) <= 0) {
                dataObj.time = 0;
                dataObj.timeUpReload = false;
                chrome.storage.local.set({
                    'data': dataObj
                });
            }
        }

        if (dataObj.time == 0) {
            if (dataObj.quorts == "show") {
                hideVideosAndRunQuorts();
            } else {
                hideVideos();
            }
        }

        function quortsShow() {

            $("#related").css({"background-color":backgroundColor, "margin-left":"20px", "min-width": "450px"});
            var main_body = $("<div id='myContent' class='myContentBox cart'></div>");
            $("#related").append(main_body);
            
            var pointers = $('<div class="btn-bar">'+
                                '<div id="buttons">'+
                                    '<a id="prev" href="#"><</a>'+
                                    '<a id="next" href="#">></a>'+
                                '</div>'+
                            '</div>');
            $(main_body).append(pointers);

            var slidesSection = $('<div id="slides"><ul id="ul_area"></ul></div>');
            $(main_body).append(slidesSection);

            var allQuorts = [{
                    "quorts": "The future belongs to those who believe in the beauty of their dreams.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quorts": "Don’t watch the clock; do what it does. Keep going.",
                    "author": "W. Clement Stone"
                },
                {
                    "quorts": "Keep your eyes on the stars, and your feet on the ground.",
                    "author": "Theodore Roosevelt"
                },
                {
                    "quorts": "One way to keep momentum going is to have constantly greater goals.",
                    "author": "Michael Korda"
                },
                {
                    "quorts": "Change your life today. Don’t gamble on the future, act now, without delay.",
                    "author": "Simone de Beauvoir"
                },
                {
                    "quorts": "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.",
                    "author": "Jeff Bezos"
                },
                {
                    "quorts": "The difference between the impossible and the possible lies in a person’s determination.",
                    "author": "Tommy Lasorda"
                },
                {
                    "quorts": "Take care of your body. It’s the only place you have to live.",
                    "author": "Jim Rohn"
                },
                {
                    "quorts": "You just can’t beat the person who never gives up.",
                    "author": "Babe Ruth"
                }
            ];

            for (var i = 0; i < allQuorts.length; i++) {
                var quorts = '<li class="slide">'+
                                '<div class="quoteContainer">'+
                                    '<p class="quote-phrase">'+
                                        '<span class="quote-marks">"</span>'+
                                         allQuorts[i].quorts
                                        +'<class="quote-marks">"</span>'+
                                    '</p>'+
                                '</div>'+
                                '<div class="authorContainer">'+
                                    '<p class="quote-author">'+
                                    allQuorts[i].author
                                +'</div>'+
                            '</li>';
                $('#ul_area').append(quorts);
            }
            var run = setInterval(rotate, sliderSpeed);
            var slides = $('.slide');
            var container = $('#slides ul');
            var elm = container.find(':first-child').prop("tagName");
            var item_width = container.width();
            var previous = 'prev'; //id of previous button
            var next = 'next'; //id of next button
            slides.width(item_width); //set the slides to the correct pixel width
            container.parent().width(item_width);
            container.width(slides.length * item_width); //set the slides container to the correct total width
            container.find(elm + ':first').before(container.find(elm + ':last'));
            resetSlides();

            $('#buttons a').click(function (e) {
                if (container.is(':animated')) {
                    return false;
                }
                if (e.target.id == previous) {
                    container.stop().animate({
                        'left': 0
                    }, 1500, function () {
                        container.find(elm + ':first').before(container.find(elm + ':last'));
                        resetSlides();
                    });
                }
                
                if (e.target.id == next) {
                    container.stop().animate({
                        'left': item_width * -2
                    }, 1500, function () {
                        container.find(elm + ':last').after(container.find(elm + ':first'));
                        resetSlides();
                    });
                }
                
                //cancel the link behavior            
                return false;
                
            });
            
            //if mouse hover, pause the auto rotation, otherwise rotate it    
            container.parent().mouseenter(function () {
                clearInterval(run);
            }).mouseleave(function () {
                run = setInterval(rotate, sliderSpeed);
            });
            
            
            function resetSlides() {
                //and adjust the container so current is in the frame
                container.css({
                    'left': -1 * item_width
                });
            }
        }

        function hideVideos() {
            // var end=setTimeout(function() {
            $("#player-ads").css("display", "none");
            $("ytd-watch-next-secondary-results-renderer").css("display", "none");
            $("ytd-playlist-panel-renderer").css("display", "none");
            //     clearInterval(end);
            // }, 1000);
        }

        function hideVideosAndRunQuorts() {
            $("#player-ads").css("display", "none");
            $("ytd-watch-next-secondary-results-renderer").css("display", "none");
            $("ytd-playlist-panel-renderer").css("display", "none");
            var checkDivExistOrNot = $('div').hasClass('myContentBox'); // important line
            if (!checkDivExistOrNot) {
                quortsShow();
            }
        }
    });
});

function rotate() {
    $('#next').click();
}