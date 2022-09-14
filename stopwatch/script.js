var watch = document.getElementById('watch-inner'),
watch_out = document.getElementById('watch-outer'),
span = document.querySelectorAll('#watch-inner span'),
second = span[0], 
millisecond = span[1],
laps = document.getElementById('laps'),
viewLap =  document.getElementById('view-lap'),
latestLap = document.getElementById('lap'),
buttons = document.querySelectorAll('button'),
reset = buttons[0], 
play_pause = buttons[1],
laper = buttons[2];

var count = 0,
dataCount = 1,
hour = 0,
min = 0,
sec = 0,
ms = 0,
millisec = 0,
interval,
elapsed;

play_pause.addEventListener('click', function () {
    if(count % 2 == 0){
        interval = setInterval(stopwatch, 10);
        
        elapsed = setInterval(function () {
        latestLap.innerHTML = printLaps();
    }, 10);
        play_pause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        play_pause.style.width = '140px';
        play_pause.style.borderRadius = '20px';
        laper.disabled = false;
        laper.style.opacity = 1;
    }
    else{
        clearInterval(interval);
        clearInterval(elapsed);
        play_pause.innerHTML = '<i class="fa-solid fa-play"></i>';
        play_pause.style.width = '100px';
        play_pause.style.borderRadius = '50%';
        laper.disabled = true;
        laper.style.opacity = 0;
    }
    if(count == 0){
        reset.disabled = false;
        reset.style.opacity = 1;
    }        
    count++;
});

reset.addEventListener('click', function () {
    clearInterval(interval);
    clearInterval(elapsed);
    laper.disabled = true;
    reset.disabled = true;
    laper.style.opacity = 0;
    reset.style.opacity = 0;
    play_pause.innerHTML = '<i class="fa-solid fa-play"></i>';
    play_pause.style.width = '100px';
    play_pause.style.borderRadius = '50%';
    ms = 0;
    hour = 0;
    min = 0;
    sec = 0;
    millisec = 0;
    count = 0;
    dataCount = 1;
    second.innerHTML = '00';
    millisecond.innerHTML = '00';
    laps.innerHTML = `<div id="lap"></div>
                <div id="view-lap"></div>`;
    laps.style.height = 0;
    watch.style.width = '280px';
    watch.style.height = '280px';
    second.style.fontSize = '60px';
    millisecond.style.fontSize = '40px';
    laps = document.getElementById('laps');
    viewLap =  document.getElementById('view-lap');
    latestLap = document.getElementById('lap');
});

laper.addEventListener('click', function () {
    var d = printLaps(),
    div = document.createElement('div');
    div.innerHTML = d;
    viewLap.appendChild(div);
    laps.scrollTop = '-'+laps.scrollHeight;
    watch.style.width = '220px';
    watch.style.height = '220px';
    laps.style.height = '100px';
    second.style.fontSize = '33px';
    millisecond.style.fontSize = '22px';
    if(dataCount >= 98){
        laper.disabled = true;
        laper.style.opacity = 0;
        clearInterval(elapsed);
    }
    dataCount++;
    clearInterval(elapsed);
    elapsed = setInterval(function () {
        latestLap.innerHTML = printLaps();
    }, 10);
    ms = 0;
});

function stopwatch() {
    if(millisec == 99){
        sec++;
        millisec = 0;
    }
    else
        millisec++;
    if (sec > 59) {
        sec = 0;
        min++;
    }
    if(min > 59){
        min = 0;
        hour++;
    }    
    if(min > 0){
        if(hour > 0)
            second.innerHTML = (hour < 10 ? '0'+hour: hour) +':'+ (min < 10 ? '0'+min : min) +':'+ (sec < 10 ? '0'+sec : sec);
        else
            second.innerHTML = (min < 10 ? '0'+min : min) +':'+ (sec < 10 ? '0'+sec : sec);
    }
    else{
        if(hour > 0)
            second.innerHTML = (hour < 10 ? '0'+hour: hour) +':00:'+ (sec < 10 ? '0'+sec : sec);
        else
            second.innerHTML = sec < 10 ? '0'+sec : sec;
    }
    
    millisecond.innerHTML = millisec < 10 ? '0'+millisec : millisec;
    ms++;
}

function printLaps() {
    var data, tMs, tSec, tMin, tHour;
    data = '# ' + (dataCount < 10 ? '0'+dataCount : dataCount) + ' &nbsp;&nbsp;';
    tMs = Math.floor(ms % 100);
    tSec = Math.floor((ms / 100) % 60);
    tMin = Math.floor((ms / 100 / 60) % 60);
    tHour = Math.floor(ms / 100 / 3600);
    data += tMin < 10 ? '0'+tMin : tMin;
    data += ' ' + (tSec < 10 ? '0'+tSec : tSec);
    data += '.' + (tMs < 10 ? '0'+tMs : tMs);
    data +=  ' &nbsp;&nbsp;' + (min < 10 ? '0'+min : min);
    data += ' ' + (sec < 10 ? '0'+sec : sec);
    data += '.' + (millisec < 10 ? '0'+millisec : millisec);
    return data;
}
