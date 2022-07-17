const displayPassword = document.getElementById('password'),
length = document.getElementById('length'),
passLength = document.getElementById('password-length'),
checkbox = document.querySelectorAll('#checkbox'),
button = document.getElementById('button'),
temp = document.getElementsByTagName('template'),
up = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
num = [0,1,2,3,4,5,6,7,8,9],
spk = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '~'], low = [];
for(let i=0; i<up.length; i++)
			low[i] = up[i].toLowerCase();
const far = [up, low, num, spk];
var arr, pL = 8, ps = '';

displayPassword.innerHTML = '<span style="color: lightgray">Tap to Copy</span>';
setTimeout(()=>{
			generate();
}, 2500);
button.onclick = generate;
passLength.oninput = ()=>{
			pL = passLength.value;
			length.innerHTML = pL;
}
displayPassword.onclick = copy;

for (let i = 0; i < checkbox.length; i++) {
			checkbox[i].onclick = disable;
}

function generate()
{
			arr = [];
			for (let i = 0; i < checkbox.length; i++) {
						if(checkbox[i].checked)			
									arr = arr.concat(far[i]);					
			}
			for (let i = 0; i < pL; i++) {
						var rand = random(arr.length, 4);
						ps += arr[rand];
			}
			displayPassword.innerHTML = ps;
			ps = '';
}
function disable()
{
			var uc = 0;
			for (let i = 0; i < checkbox.length; i++)
						if(!checkbox[i].checked)
									uc++;
			for (let i = 0; i < checkbox.length; i++) {
						if(checkbox[i].checked)
									if(uc == 3) checkbox[i].disabled = true;
						else
									checkbox[i].disabled = false;
			}
}
function random(max, min)
{
			return Math.floor(Math.random() * (max - min) +1)
}
function copy()
{
			navigator.clipboard.writeText(displayPassword.textContent);
			var clon = temp[0].content.cloneNode(true);
  	 document.body.appendChild(clon);
  	 setTimeout(()=>{
  	 				document.getElementsByClassName('copied')[0].remove();
  	 	}, 2200);
}
