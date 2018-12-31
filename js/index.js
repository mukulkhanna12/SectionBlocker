$(document).ready(function(){
    $(function(){
        chrome.storage.local.get(['data'], function(r) {
          var obj = r.data;   

          if (obj.quorts=='show')
            {
                $("#idOfShow").prop('checked',true);
            }
            else{
                $("#idOfHide").prop('checked',true);
            }
        var dt = new Date(),sec=0,hours=0,min=0;                
        if(obj.timeUpReload)
        {   
            var currentDate=dt.getMonth()+'/'+dt.getDate()+'/'+dt.getFullYear();
            var currentTime=dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
            var combain=currentDate+' '+currentTime;
            var date1 = new Date(combain);
            var date2 = new Date(obj.last_time);
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
                    obj.time=0;
                    obj.timeUpReload=false;  
                    chrome.storage.local.set({'data': obj});
            }
        }
            if(obj.timeUpReload)
            {        
                $("#ifVideosBlock").css('display','none');
                $("#ifVideosShow").css('display','block');

                var getH=$("#hours");
                var getM=$("#mint");
                var getS=$("#secd");   
                getH.text(hours);
                getM.text(min);
                getS.text(sec);
                var $worked=hours+":"+min+":"+sec;

                var interval = setInterval(function() 
                {
                    var myTime = $worked;
                    var ss = myTime.split(":");
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                
                    var dt2 = new Date(dt.valueOf() - 1000);
                    var ts = dt2.toTimeString().split(" ")[0];
                    
                        if(ts=="00:00:00" || ts=="00:00:0"){
                                obj.time=0;   
                                obj.timeUpReload=false;   
                                var newtime=dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
                                obj.last_time=newtime;
                                chrome.storage.local.set({'data': obj});
                                clearInterval(interval);                        
                            }
                        else{
                            var ss1 = ts.split(":");
                            getH.text(ss1[0]);
                            getM.text(ss1[1]);
                            getS.text(ss1[2]);
                            $worked=ts;
                    }
                    }, 1000);
                }
        else{
                $("#ifVideosBlock").css('display','block');
                $("#ifVideosShow").css('display','none');
            }
                
        });
    });
    
    $("#blockVideos").click(function(){
        chrome.storage.local.get(['data'], function(r) {
        var obj2=r.data;
        var today = new Date();
        var time=today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        var date=today.getMonth()+'/'+today.getDate()+'/'+today.getFullYear();
            
            obj2.last_time=date+' '+time;
            obj2.time=0;               
            obj2.timeUpReload=false;

            chrome.storage.local.set({'data': obj2},function(){
                chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                    var url=arrayOfTabs[0].url;
                    var youtubeLink = url.slice(0,31);
                    if (youtubeLink=="https://www.youtube.com/watch?v"){
                        chrome.tabs.reload(arrayOfTabs[0].id);
                    }
                });
                window.close();  
            });    
        });
        });
  

    $("#submit").click(function(){
        chrome.storage.local.get(['data'], function(r) {
        var obj2=r.data;
        var arrTime=[15,30,60,120];
        var getTime=parseInt(document.getElementById('time').value);
        var quotes=$('input[name=groupOfDefaultRadios]:checked').val();

        if(quotes=='show' || quotes=='hide')
        {
            obj2.quorts=quotes;                
            obj2.time=getTime;

            if(arrTime.indexOf(getTime)>= 0){
                var today = new Date();        
                today.setMinutes(today.getMinutes() + getTime);
                var time=today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
                var date=today.getMonth()+'/'+today.getDate()+'/'+today.getFullYear();
                obj2.last_time=date+' '+time;
                obj2.timeUpReload=true;
            }
            chrome.storage.local.set({'data': obj2},function(){
                chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                    var url=arrayOfTabs[0].url;
                    var youtubeLink = url.slice(0,31);
                    if (youtubeLink=="https://www.youtube.com/watch?v"){
                        chrome.tabs.reload(arrayOfTabs[0].id);
                    }
                });
                window.close();  
            });    
        }
        });
    });
    
});