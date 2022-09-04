/* selecting all necessary elements */
var firstName = document.getElementById('first-name'),
lastName = document.getElementById('last-name'),
rating = document.getElementById('rating'),
position = document.getElementsByClassName('position')[0],
country = document.getElementsByClassName('country')[0],
height = document.getElementById('height'),
foot = document.getElementsByClassName('foot')[0],
boot = document.getElementsByClassName('boot-col')[0],
attr = [document.getElementById('speed'),
								document.getElementById('acceleration'),
								document.getElementById('stamina'),
								document.getElementById('condition'),
								document.getElementById('strength'),
								document.getElementById('tackle'),
					   document.getElementById('pass'),
					   document.getElementById('shoot'), 
					 ],
common = document.getElementById('common'),
rare = document.getElementById('rare'),
legendary = document.getElementById('legendary'),
uploadImg = document.getElementsByClassName('upload-image')[0],
image = document.getElementById('image'),
horiBar = document.getElementById('hori-pos'),
vertBar = document.getElementById('vert-pos'),
down = document.getElementsByClassName('download')[0],
imgWidth = document.getElementById('img-width'),
imgHeight = document.getElementById('img-height'),
canvas = document.getElementsByTagName('canvas')[0],
ctx = canvas.getContext('2d'),
cardURL = 'assests/cards/',
cards = '', boots = '',
red = '#e61419', orange = '#f48410',
yellow = '#eedb10', green = '#10ca08',
sblue = '#19dab2', rblue = '#4d8af2',
grey = '#777a85', white = '#ffffff',
black = '#000', font = '58px Reno',
statsCoord = [[935,292], [935,427], [935,562], [935,697], [1217,292], [1217,427], [1217,562], [1217,697]],
attrCoord = [[795,292], [1077,292], [795,427], [1077,427], [795,562], [1077,562], [795,697],  [1077,697]],
fGK = ['SPE', 'TAC', 'ACC', 'PAS', 'CON', 'GKH', 'STR', 'GKR'],
fOT = ['SPE', 'STR', 'ACC', 'TAC', 'STA', 'PAS', 'CON', 'SHO'],
span = document.querySelectorAll('.stats span'), urls = document.getElementById('urls'),
ratioCheck = document.getElementById('ratio-check'), wh = 'w',
horiPos, vertPos, img = new Image(), uplImg = new Image(), 
uplSrc = 'https://www.futwiz.com/assets/img/fifa21/faces/20801.png';
urls.value = uplSrc;
/* selecting all necessary elements */

/* upload image */
uploadImg.onclick = function ()
{
			image.click();
		 navigator.vibrate(50)
}
/* upload image */

/* set all functions */

			document.body.onload = drawCard;
			common.onchange = drawCard;
			rare.onchange = drawCard;
			legendary.onchange = drawCard;
			firstName.oninput = drawCard;
			lastName.oninput = drawCard;
			position.onchange = drawCard;
			rating.oninput = drawCard;
			foot.onchange = drawCard;
			boot.onchange = drawCard;
			height.oninput = drawCard;
			horiBar.onchange = drawCard;
			vertBar.onchange = drawCard;
			imgWidth.oninput = ()=>{wh = 'w'; drawCard()};
			imgHeight.oninput = ()=>{wh = 'h'; drawCard()}
		 country.onchange = drawCard;
			down.onclick = function ()
			{
						if(confirm('Confirm Download')) download ();
			}
   urls.oninput = function ()
			{
						uplSrc = urls.value;
						drawCard();
			}
			for (let i = 0; i < attr.length; i++)
			{
						attr[i].oninput = drawCard;
			}
			image.onchange = readFile;
/* set all functions */

/* draw cards */
function drawCard()
{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if(common.checked)
						cards = cardURL+'common.png';
			else if(rare.checked)
		 			cards = cardURL+'rare.png';
		 else if(legendary.checked)
		 			cards = cardURL+'legendary.png';
	  //img.crossOrigin="anonymous"; 
	  img.src = cards;
			img.onload = function ()
			{
						ctx.drawImage(img, 0, 0, 1280, 890);
						uplImg.crossOrigin="anonymous"; 
						uplImg.src = uplSrc;
					 uplImg.onload = function ()
					 {
					 			var x = ratio(uplImg.width, uplImg.height, 'w'),
						    y = ratio(uplImg.width, uplImg.height, 'h');
					 			horiPos = horiBar.value;
					 			vertPos = vertBar.value;
					 			if(ratioCheck.checked){
					 			if(wh == 'w'){
					 						x = Math.round(imgWidth.value/x);
					 					 y = y*x;
					 					 imgHeight.value = y;
					 			}
					 			else if (wh == 'h') {
					 						y = Math.round(imgHeight.value/y);
					 					 x = y*x;
					 					 imgWidth.value = x;
					 			}
					 			}
					 			ctx.drawImage(uplImg, horiPos, vertPos, imgWidth.value, imgHeight.value);
				  }
				  ctx.textAlign = 'center';		    
		    ctx.font = '50px Reno';
		    ctx.fillStyle = grey;
		    ctx.fillText(firstName.value, 360, 790);		    
		  	  ctx.textAlign = 'center';
					 ctx.font = '70px Reno';
					 ctx.fillStyle = white;
		    ctx.fillText(lastName.value, 362, 858);   	
		    	    
		    ctx.beginPath()		    
		    ctx.arc(616, 118, 88, 0, 2*Math.PI);
		    ctx.fillStyle = rateColor();
		    ctx.fill();
		    
		    ctx.font = '80px Reno';
		    ctx.fillStyle = white;
		    ctx.fillText(Math.round(rating.value), 615, 151);
		    
		    ctx.fillStyle = posColor();
		    ctx.fillRect(554, 250, 142, 86);
		    var cnt = new Image();
		    if(country.value == 'eng')
		    			cnt.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/250px-Flag_of_England.svg.png';
		    else if(country.value == 'scot')
		    			cnt.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/250px-Flag_of_Scotland.svg.png';
		    else if(country.value == 'wales')
		    			cnt.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/250px-Flag_of_Wales.svg.png';
		    else	
		                        cnt.src = 'https://flagcdn.com/w320/'+country.value+'.png';
		    cnt.crossOrigin = 'anonymous';
		    cnt.onload = function ()
		    {
		    			ctx.drawImage(cnt,554,356,142,90)
		    }
		    ctx.textAlign = 'center';
		    ctx.font = '66px Reno';
		    ctx.fillStyle = black;
		    ctx.fillText(position.value, 624, 318);
		    
		    ctx.font = '62px Reno';
		    ctx.fillStyle = black;
		    ctx.fillText(Math.round(height.value), 908, 159);
		    
		    var bt = new Image();
		    bt.src = 'assests/boots/'+boot.value+'.png';		    
		    bt.onload = function ()
		    {		
		    			ctx.drawImage(bt, 1020, 84, 110, 110);
		    }
		    
		    ctx.font = '62px Reno';
		    ctx.fillStyle = black;
		    ctx.fillText(foot.value[0], 1185, 159);
		    
                    attrName();
		    writeAttributes();
			}
}
function attrName()
{
			ctx.textAlign = 'center';
			if(position.value == 'GK')
						for(let i=0; i<fGK.length; i++)
						{
									ctx.fillStyle = '#000';
									ctx.font = '62px Reno';
		    			ctx.fillText(fGK[i], attrCoord[i][0], attrCoord[i][1]);
		    			span[i].innerText = fGK[i];
						}
			else
						for(let i=0; i<fOT.length; i++)
						{
									ctx.fillStyle = '#000';
									ctx.font = '62px Reno';
		    			ctx.fillText(fOT[i], attrCoord[i][0], attrCoord[i][1]);
		    			span[i].innerText = fOT[i];
						}
}
function writeAttributes()
{
			for(let i=0; i<attr.length; i++)
			{
						var v = Math.round(attr[i].value);						
						if(v < 60)
									ctx.fillStyle = red;
						else if(v >= 60 && v < 70)
									ctx.fillStyle = orange;
						else if(v >= 70 && v < 80)
									ctx.fillStyle = yellow;
						else if(v >= 80 && v < 90)
									ctx.fillStyle = green;
						else if(v > 89)
									ctx.fillStyle = sblue;
						ctx.font = '62px Reno';
                                                if(v >= 100)
						{
									ctx.save();									
									ctx.translate(statsCoord[i][0], statsCoord[i][1]);
									ctx.save();
									ctx.scale(0.85, 1);
									ctx.fillText(v, 0, 0);
									ctx.restore();
									ctx.restore();
						}
						else
		    ctx.fillText(v, statsCoord[i][0], statsCoord[i][1]);
			}
}
function rateColor()
{
			var r = '', rv = rating.value;
			if(rv < 60)
						r = red;
			else if(rv >= 60 && rv < 70)
						r = orange;
			else if(rv >= 70 && rv < 80)
						r = yellow;
			else if(rv >= 80 && rv < 90)
						r = green;
			else if(rv >= 90)
						r = rblue;
			return r;
}
function posColor()
{
			var pv = position.value.toLowerCase(),
			pc = '';
			if(pv == 'cf' || pv == 'wf')
						pc = red;
			else if(pv == 'lm' || pv == 'am' || pv == 'cm' || pv == 'dm' || pv == 'rm')
						pc = yellow;
			else if(pv == 'lb' || pv == 'cb' || pv == 'rb')
						pc = green;
			else if(pv == 'gk')
						pc = rblue;
			return pc;
}
function readFile()
{
			var reader = new FileReader(),
   file = image.files[0];
   reader.onload = function(e)
   {
   			uplSrc = e.target.result;
   			drawCard();
   }
   reader.readAsDataURL(file);
}
/*function downLoad()
{
			down.download = firstName.value+' '+lastName.value+'.png';
			down.href = canvas.toDataURL('image/png;base64');
}*/
/* draw cards */
/* download */

function download()
{
        var a = document.createElement('a');
        a.href = canvas.toDataURL('image/png;base64');
	if(firstName.value.length != 0 && lastName.value.length != 0)
           a.download = firstName.value+' '+lastName.value+'.png';
	else 
           a.download = firstName.value+lastName.value+'.png';	
        document.body.appendChild(a)
	a.click();
	document.body.removeChild(a);
}

/* download */
function ratio(a, b, r)
{
			for (;;) {
				if (a % 2 == 0 && b % 2 == 0) {
					a /= 2;
					b /= 2;
				} else if (a % 3 == 0 && b % 3 == 0) {
					a /= 3;
					b /= 3;
				} else if (a % 5 == 0 && b % 5 == 0) {
					a /= 5;
					b /= 5;
				} else if ((a % 2 != 0 || a % 3 != 0 || a % 5 != 0) || (b % 2 != 0 || b % 3 != 0 || b % 5 != 0)) {
							if(r == 'w') return(a);
							else if(r == 'h') return(b);
							else if(r == 'wh') return(a+':'+b);
							break;
				}
		}
}
