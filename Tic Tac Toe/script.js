const button = document.querySelectorAll('#board button'),
board = document.getElementById('board'),
replay = document.getElementById('replay'),
turn = document.getElementById('turn'),
X = document.getElementsByClassName('x'),
O = document.getElementsByClassName('o'),
svg = document.getElementsByTagName('svg')[0],
arr = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
var v = 'X', draw = 0, x = 0, o = 0, color = '';

for (let i = 0; i < button.length; i++) {
    button[i].value = i;
}

button.forEach(function (e) {
    e.addEventListener('click', function () {
        e.value = v;    
        e.textContent = v;
        e.disabled = true;
        navigator.vibrate([100, 100]);
        if (v == 'X') {
            color = 'rgba(0,0,0,0.65)';
            v = 'O';
        }
        else {
            color = 'burlywood';            
            v = 'X';
        }
        e.style.color = color;
        turn.innerText = v+"'s Turn";
        check();
    });
});

replay.addEventListener('click', restart);

function check() {
    for (let i = 0; i < arr.length; i++) {
        var b1 = button[arr[i][0]].value;
        var b2 = button[arr[i][1]].value;
        var b3 = button[arr[i][2]].value;
        if ((b1 == b2) && (b2 == b3) && (b3 == b1)) {
            generateLine(button[arr[i][0]], button[arr[i][2]]);
            if (v == 'X') {
                v = 'O';
                setTimeout(()=> O[1].innerHTML = ++o, 500);
            }
            else {
                v = 'X';
                setTimeout(()=> X[1].innerHTML = ++x, 500);
            }
            turn.innerText = v+" Won";
            for (let i = 0; i < button.length; i++)
                button[i].disabled = true;
            setTimeout(()=> navigator.vibrate([200, 200, 200]), 500);
            break;
        }
        else draw++;
    }
    if (draw == 72)
        turn.innerText = 'Draw';
}

function restart() {
    for (let i = 0; i < button.length; i++) {
        button[i].disabled = false;
        button[i].value = i;        
        button[i].textContent = '';
        button[i].style.color = 'transparent';
    }
    draw = 0;
    v = 'X';
    turn.innerText = v+"' turn";
    svg.style.display = "none";
    navigator.vibrate([50, 50]);
}

function generateLine(btn1, btn2) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line"),
    x1 = btn1.getBoundingClientRect().left,
    y1 = btn1.getBoundingClientRect().top,
    x2 = btn2.getBoundingClientRect().left,
    y2 = btn2.getBoundingClientRect().top;
    
    x1 = x1 + btn1.clientWidth/2;
    y1 = y1 + btn1.clientHeight/2;
    x2 = x2 + btn2.clientWidth/2;
    y2 = y2 + btn2.clientHeight/2;

    x1 = x1 - board.getBoundingClientRect().left;
    y1 = y1 - board.getBoundingClientRect().top;
    x2 = x2 - board.getBoundingClientRect().left;
    y2 = y2 - board.getBoundingClientRect().top;
    
    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    line.style.stroke = color;
    line.style.strokeWidth = "5px";
    
    svg.style.display = 'block';
    svg.innerHTML = '';
    svg.style.top = board.getBoundingClientRect().top+'px';
    svg.style.left = board.getBoundingClientRect().left+'px';
    svg.appendChild(line);
}
