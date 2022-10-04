var home = document.getElementById('home'),
section = document.getElementsByClassName('play-boxes'),
goBack = document.getElementsByClassName('arrow-circle-left'),
countFlagButton = document.querySelectorAll('#c-flags button'),
countNameButton = document.querySelectorAll('#names button'),
capNameButton = document.querySelectorAll('#capital button'),
gameover = document.getElementById('game-over'),
nameBox = document.getElementById('name'),
flagBox = document.getElementById('flag'),
timeBox = document.querySelectorAll('.time'),
lifeBox = document.querySelectorAll('.life'),
turnBox = document.querySelectorAll('.turn'),
game_buttons = document.body.querySelectorAll('#home button'),
ans = '', pans = '', life = 3, turn = 1,
time = 1, level = 1, timer, correct = 0, 
totalTime = 0;

game_buttons[0].addEventListener('click', ()=>{
    home.style.opacity = 0;
    setTimeout(()=>
    {
        home.style.display = 'none';
        section[0].style.display = 'flex';
        countryQuestion();
        timer = setInterval(()=>
        {
            timeBox[0].innerText = timeTaken(time);
            time++;
            totalTime++;
        }, 1000);
    }, 500);
});
game_buttons[1].addEventListener('click', ()=>{
    home.style.opacity = 0;
    setTimeout(()=>
    {
        home.style.display = 'none';
        section[1].style.display = 'flex';
        flagsQuestion();
        timer = setInterval(()=>
        {
            timeBox[1].innerText = timeTaken(time);
            time++;
            totalTime++;
        }, 1000);
    }, 500);
});
game_buttons[2].addEventListener('click', ()=>{
    home.style.opacity = 0;
    setTimeout(()=>
    {
        home.style.display = 'none';
        section[2].style.display = 'flex';
        capitalsQuestion();
        timer = setInterval(()=>
        {
            timeBox[2].innerText = timeTaken(time);
            time++;
            totalTime++;
        }, 1000);
    }, 500);
});

goBack[0].addEventListener('click', ()=>{goHome(0)});
goBack[1].addEventListener('click', ()=>{goHome(1)});
goBack[2].addEventListener('click', ()=>{goHome(2)});

countFlagButton.forEach((e)=> e.addEventListener('click', ()=>{countryCheck(e)}));
countNameButton.forEach((e)=> e.addEventListener('click', ()=>{flagsCheck(e)})); 
capNameButton.forEach((e)=> e.addEventListener('click', ()=>{capitalsCheck(e)})); 
   
    var fullscreen = document.getElementById('full-screen'),
    elem = document.documentElement;
    fullscreen.addEventListener('click', ()=> 
    {
        if (fullscreen.firstElementChild.className == 'fa-solid fa-expand') {
            if (elem.requestFullscreen)
                elem.requestFullscreen();
            fullscreen.firstElementChild.className = 'fa-solid fa-compress';
        }
        else if (fullscreen.firstElementChild.className == 'fa-solid fa-compress') {
            if (document.exitFullscreen)
                document.exitFullscreen();
            fullscreen.firstElementChild.className = 'fa-solid fa-expand';
        }
    });
    
function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

window.onload = function () {
for (let i=0; i<country.length; i++)
{
  var img = document.createElement('img');
  img.src = 'assests/'+country[i].name+'.png';
  img.loading = 'eager';
  img.style.width = '1px';
  img.style.height = '1px';
  img.style.position = 'absolute';
  img.style.top = '-100%';
  document.body.appendChild(img)
  if (i==country.length-1) 
      home.style.display = 'flex'
} 
}
