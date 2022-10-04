function countryQuestion() {
    var fix = random(0, 3),
    arr = [], cond = true;

    for (let i=0; i<4; i++) {
        arr.push(random (0, country.length-1));
        countFlagButton[i].style.background = 'transparent';
        countFlagButton[i].innerHTML = '';
        countFlagButton[i].disabled = false;
    }
    while (cond) {
        for (let i=0; i<4; i++)
        for (let j=0; j<4; j++) {
            if (arr[i] == arr[j] && i!= j) {
                arr[j] = random (0, country.length-1);
                cond = true;
                i = 0;
                break;
            }
            else cond = false;
        }
    }
    nameBox.innerHTML = country[arr[fix]].name;
    ans = country[arr[fix]].name;
    
    var img1 = new Image();
    img1.src = 'assests/'+country[arr[0]].name+'.png';
    img1.loading = 'eager';
    img1.onload = ()=>{
        countFlagButton[0].style.background = 'url('+img1.src+')';
        countFlagButton[0].value = country[arr[0]].name;
    }
    var img2 = new Image();
    img2.loading = 'eager';
    img2.src = 'assests/'+country[arr[1]].name+'.png';
    img2.onload = ()=>{
        countFlagButton[1].style.background = 'url('+img2.src+')';
        countFlagButton[1].value = country[arr[1]].name;
    }
    var img3 = new Image();
    img3.loading = 'eager';
    img3.src = 'assests/'+country[arr[2]].name+'.png';
    img3.onload = ()=>{
        countFlagButton[2].style.background = 'url('+img3.src+')';
        countFlagButton[2].value = country[arr[2]].name;
    }
    var img4 = new Image();
    img4.loading = 'eager';
    img4.src = 'assests/'+country[arr[3]].name+'.png';
    img4.onload = ()=>{
        countFlagButton[3].style.background = 'url('+img4.src+')';
        countFlagButton[3].value = country[arr[3]].name;
    }
    for (let i = 0; i < 4; i++) {
        countFlagButton[i].disabled = false;
        countFlagButton[i].style.opacity = 1;
    }
}

function countryCheck(e) {
    pans = e.value;
    var cnLife = lifeBox[0].children;
    if (ans == pans) {
        correct++;
        nameBox.style.color = 'lime';
        for (let i=0; i<4; i++) {
            countFlagButton[i].disabled = true;
            countFlagButton[i].style.opacity = 0.5;
        }
        e.style.opacity = 1;
        navigator.vibrate(30);
        setTimeout(()=>
        {
            countryQuestion();
            turnBox[0].innerHTML = turn+'/'+level*5;
            nameBox.style.color = 'gainsboro';
            for (let i=0; i<3; i++) {
                if (i<life)
                    cnLife[i].className = 'fa-solid fa-heart';
                else 
                    cnLife[i].className = 'fa-regular fa-heart';
            }
        }, 800);
        turn++;
    }
    else {
        nameBox.style.color = 'red';
        life--;
        e.disabled = true;
        e.style.opacity = 0.5;
        e.innerHTML = '<mark>'+e.
value+'<mark>';
        for (let i=0; i<3; i++) {
            if (i<life)
                cnLife[i].className = 'fa-solid fa-heart';
            else 
                cnLife[i].className = 'fa-regular fa-heart';
        }
        navigator.vibrate([100, 100]);
        setTimeout(()=> 
        {
            nameBox.style.color = 'gainsboro';
        }, 600);
    }
    if (life == 0) {
        document.body.querySelectorAll('main')[0].appendChild(gameover.content.cloneNode(true));
        clearInterval(timer);
        turnBox[0].innerText = '1/5';
        timeBox[0].innerText = '00:00';        
        for (let i=0; i<3; i++)
            cnLife[i].className = 'fa-solid fa-heart';
        for (let i=0; i<4; i++)
            countFlagButton[i].disabled = true;
         document.getElementById('level').innerText = level;
        document.getElementById('turn').innerText = turn+'/'+level*5; document.getElementById('correct').innerText = correct;
        document.getElementById('time-taken').innerText = timeTaken(totalTime);
        document.querySelectorAll('.replay')[0].addEventListener('click', ()=>replay(0));
        document.querySelectorAll('.go-home')[0].addEventListener('click', ()=>goHome(0));
    }
    if (turn > level*5) {
        turn = 1; level++;
        life = 3; time = 0;
        localStorage.setItem('level', level);
    }    
}

function flagsQuestion() {
    var flag = document.querySelectorAll('#flag img')[0],
    img, fix = random(0, 3), 
    arr = [], cond = true;

    for (let i=0; i<4; i++) {
        arr.push(random (0, country.length-1));
        countNameButton[i].innerHTML = '';
        countNameButton[i].disabled = false;
    }
    while (cond) {
        for (let i=0; i<4; i++)
        for (let j=0; j<4; j++) {
            if (arr[i] == arr[j] && i!= j) {
                arr[j] = random (0, country.length-1);
                cond = true;
                i = 0;
                break;
            }
            else cond = false;
        }
    }
    img = new Image();
    img.src = 'assests/'+country[arr[fix]].name+'.png';
    img.loading = 'eager';
    img.onload = ()=> flag.src = img.src;
    ans = country[arr[fix]].name;
    for (let i=0; i<arr.length; i++) {
        countNameButton[i].value = country[arr[i]].name;
        countNameButton[i].innerHTML = country[arr[i]].name;
        countNameButton[i].style.opacity = 1;
        countNameButton[i].disabled = false;
    }
}

function flagsCheck(e) {
    pans = e.value;
    var fgLife = lifeBox[1].children;
    if (ans == pans) {
        correct++;
        for (let i=0; i<4; i++) {
            countNameButton[i].disabled = true;
            countNameButton[i].style.opacity = 0.5;
        }
        e.style.opacity = 1;
        navigator.vibrate(30);
        setTimeout(()=>
        {
            flagsQuestion();
            turnBox[1].innerHTML = turn+'/'+level*5;
            for (let i=0; i<3; i++) {
                if (i<life)
                    fgLife[i].className = 'fa-solid fa-heart';
                else 
                    fgLife[i].className = 'fa-regular fa-heart';
            }
        }, 800);
        turn++;
    }
    else {
        life--;
        e.disabled = true;
        e.style.opacity = 0.5;
        for (let i=0; i<3; i++) {
            if (i<life)
                fgLife[i].className = 'fa-solid fa-heart';
            else 
                fgLife[i].className = 'fa-regular fa-heart';
        }
        navigator.vibrate([100, 100]);
    }
    if (life == 0) {
        document.body.querySelectorAll('main')[0].appendChild(gameover.content.cloneNode(true));
        clearInterval(timer);
        turnBox[1].innerText = '1/5';
        timeBox[1].innerText = '00:00';        
        for (let i=0; i<3; i++)
            fgLife[i].className = 'fa-solid fa-heart';
        for (let i=0; i<4; i++)
            countNameButton[i].disabled = true;
        document.getElementById('level').innerText = level;
        document.getElementById('turn').innerText = turn+'/'+level*5; document.getElementById('correct').innerText = correct;
        document.getElementById('time-taken').innerText = timeTaken(totalTime);
        document.querySelectorAll('.replay')[0].addEventListener('click', ()=>replay(1));
        document.querySelectorAll('.go-home')[0].addEventListener('click', ()=>goHome(1));
    }
    if (turn > level*5) {
        turn = 1; level++;
        life = 3; time = 0;
        localStorage.setItem('level', level);
    }
}

function capitalsQuestion() {
    var flag = document.querySelectorAll('#flag-name img')[0],
    name = document.querySelectorAll('#flag-name p')[0],
    img, fix = random(0, 3), 
    arr = [], cond = true;

    for (let i=0; i<4; i++) {
        arr.push(random (0, country.length-1));
        capNameButton[i].innerHTML = '';
        capNameButton[i].disabled = false;
    }
    while (cond) {
        for (let i=0; i<4; i++)
        for (let j=0; j<4; j++) {
            if (arr[i] == arr[j] && i!= j) {
                arr[j] = random (0, country.length-1);
                cond = true;
                i = 0;
                break;
            }
            else cond = false;
        }
    }
    img = new Image();
    img.src = 'assests/'+country[arr[fix]].name+'.png';
    img.loading = 'eager';
    img.onload = ()=> flag.src = img.src;
    name.innerText = country[arr[fix]].name;
    ans = country[arr[fix]].capital;
    for (let i=0; i<arr.length; i++) {
        capNameButton[i].value = country[arr[i]].capital;
        capNameButton[i].innerHTML = country[arr[i]].capital;
        capNameButton[i].style.opacity = 1;
        capNameButton[i].disabled = false;
    }
}

function capitalsCheck(e) {
    pans = e.value;
    var fgLife = lifeBox[2].children,
    name = document.querySelectorAll('#flag-name p')[0];
    if (ans == pans) {
        correct++;
        name.style.color = 'lime';
        for (let i=0; i<4; i++) {
            capNameButton[i].disabled = true;
            capNameButton[i].style.opacity = 0.5;
        }
        e.style.opacity = 1;
        navigator.vibrate(30);
        setTimeout(()=>
        {
            capitalsQuestion();
            turnBox[2].innerHTML = turn+'/'+level*5;
            for (let i=0; i<3; i++) {
                if (i<life)
                    fgLife[i].className = 'fa-solid fa-heart';
                else 
                    fgLife[i].className = 'fa-regular fa-heart';
            }
        }, 800);
        turn++;
    }
    else {
        life--;
        name.style.color = 'red';
        e.disabled = true;
        e.style.opacity = 0.5;
        for (let i=0; i<3; i++) {
            if (i<life)
                fgLife[i].className = 'fa-solid fa-heart';
            else 
                fgLife[i].className = 'fa-regular fa-heart';
        }
        navigator.vibrate([100, 100]);
    }
    if (life == 0) {
        document.body.querySelectorAll('main')[0].appendChild(gameover.content.cloneNode(true));
        clearInterval(timer);
        turnBox[2].innerText = '1/5';
        timeBox[2].innerText = '00:00';        
        for (let i=0; i<3; i++)
            fgLife[i].className = 'fa-solid fa-heart';
        for (let i=0; i<4; i++)
            capNameButton[i].disabled = true;
        document.getElementById('level').innerText = level;
        document.getElementById('turn').innerText = turn+'/'+level*5; document.getElementById('correct').innerText = correct;
        document.getElementById('time-taken').innerText = timeTaken(totalTime);
        document.querySelectorAll('.replay')[0].addEventListener('click', ()=>replay(2));
        document.querySelectorAll('.go-home')[0].addEventListener('click', ()=>goHome(2));
    }
    if (turn > level*5) {
        turn = 1; level++;
        life = 3; time = 0;
        localStorage.setItem('level', level);
    }
    setTimeout(
    ()=>{name.style.color = 'gainsboro'}, 600);
}

function timeTaken(t) {
    var m = Math.floor(t/60),
    s = Math.floor(t%60);
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;
    return m+':'+s;
}

function replay(e) {
        document.body.querySelectorAll('.alert-box')[0].remove();
        clearInterval(timer);
        time = 1;
        turn = 1;
        level = 1;
        life = 3;
        correct = 0;
        totalTime = 0;
        setTimeout(()=> {
        if (e == 0) countryQuestion();
        else if (e == 1) flagsQuestion();
        else if (e == 2) capitalsQuestion();
        timer = setInterval(()=>
        {
            timeBox[e].innerText = timeTaken(time);
            time++;
            totalTime++;
        }, 1000);
        }, 800);
}
function goHome(e) {
         if (document.body.querySelectorAll('.alert-box').length > 0)
          document.body.querySelectorAll('.alert-box')[0].remove();
        clearInterval(timer);
        turnBox[e].innerText = '1/5';
        timeBox[e].innerText = '00:00';        
        for (let i=0; i<3; i++)
            lifeBox[e].children[i].className = 'fa-solid fa-heart';
        time = 1;
        turn = 1;
        level = 1;
        life = 3;
        correct = 0;
        totalTime = 0;
        home.style.display = 'flex';
        home.style.opacity = 1;
        section[e].style.display = 'none';
}
