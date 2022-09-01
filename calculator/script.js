const key = document.getElementsByTagName('button'),
allClearKey = key[0], deleteKey = key[18],
equalsKey = key[19],
numericKey = [
			key[4], key[5], key[6], key[8], key[9],
			key[10], key[12],	key[13], key[14], key[17],
			key[16]
],
operatorKey = [
		 key[1], 	key[2], key[3], key[7], key[11],
		 key[15], key[20], key[21], key[22], key[23],
		 key[24]
],
view = document.getElementById('view'),
viewResult = document.getElementById('view-result');
var vexp = '';

allClearKey.onclick = allClear;
deleteKey.onclick = del;
equalsKey.onclick = result;

for (let i = 0; i < numericKey.length; i++) {
			numericKey[i].onclick = ()=>{
						insert(numericKey[i].value);
						view.style.color = 'white';
						viewResult.style.color = 'gainsboro';
						vres();
			}
}
for (let i = 0; i < operatorKey.length; i++) {
			operatorKey[i].onclick = ()=>{
						insert(operatorKey[i].value); 
						view.style.color = 'white';
						viewResult.style.color = 'gainsboro';
						vres();
			}
}

function allClear()
{
			view.style.color = 'white';
			viewResult.style.color = 'gainsboro';
			view.value = 0;
			viewResult.value = '';
}

function del() {
			let temp = view.value;
			if(temp != '0')
						view.value = temp.substring(0, temp.length-1);
			view.style.color = 'white';
			viewResult.style.color = 'gainsboro';
			vres();
}

function insert(v)
{
			view.style.color = 'white';
			viewResult.style.color = 'gainsboro';
			var temp = view.value;
			if(v != '+' && v != '-' && v != '×' && v != '÷' && v != '.'){
						if(temp.length == 1 && temp[temp.length-1] == '0')
									view.value = '';
						view.value += v;
			}
			else	 view.value += v;
			view.scrollLeft = view.scrollWidth;
}

function result()
{
			var exp, e = 0;
			try{
						exp = formatting();
									console.log('exp: ', exp);
						var ans = eval(exp);
						viewResult.value = ans; console.log('ans: ', ans);
						if(ans == 'Infinity' || ans == '-Infinity' ||  ans.toString() == 'NaN'){
									viewResult.value = 'Math Error';
									viewResult.style.color = 'tomato';
									view.style.color = 'tomato';
						}
					 if(viewResult.value == 'true' || viewResult.value == 'false')
					 			viewResult.style.color = 'aquamarine';
			}
			catch(err) {
					 viewResult.value = 'Syntax Error';
					 viewResult.style.color = 'tomato';
					 view.style.color = 'tomato';
					 
					 console.log(err)
			}	
}

function formatting()
{
					 vexp = view.value;
					 var exp = '', e = 0;										 
					 customize('π');
					 for (let i = 0; i < vexp.length; i++) {
					 				var temp = vexp[i-1];
					 				if(vexp[i] == '(' || vexp[i] == '√')
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.' || temp=='%' || temp=='π' || temp==')')
				 										 vexp = vexp.substring(0, i)+'*'+vexp.substring(i, vexp.length);
				 					if(vexp[i] == 'π')
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.' || temp=='π')
				 										 vexp = vexp.substring(0, i+1)+'*'+vexp.substring(i+1, vexp.length);
				 										 
				 					temp = vexp[i+1];
					 				if(vexp[i] == '%' || vexp[i] == ')')
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.' || temp=='√' || temp=='π' || temp=='(')
				 										 vexp = vexp.substring(0, i+1)+'*'+vexp.substring(i+1, vexp.length);
				 					if(vexp[i] == 'π')
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.' || temp=='√' || temp=='π')
				 										 vexp = vexp.substring(0, i+1)+'*'+vexp.substring(i+1, vexp.length);
				 		}
						exp = vexp;
						exp = exp.replace(/÷/g, '/');
						exp = exp.replace(/×/g, '*');
						exp = exp.replace(/π/g, '3.142857142857143');
						exp = exp.replace(/%/g, '/100');	
						exp = exp.replace(/√/g, 'Math.sqrt');
						for (let i = 0; i < exp.length; i++)
									if(exp[i] == '^') e++;
						for (let i = 0; i < e; i++)
									exp = exp.replace('^', '**');
						return exp;
}

function customize(c)
{
					 for (let i = 0; i < vexp.length; i++) {
					 				var temp = vexp[i+1];
					 				if(vexp[i] == c)
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.')
				 										 vexp = vexp.substring(0, i+1)+'*'+vexp.substring(i+1, vexp.length);
				 						temp = vexp[i-1];
				 						if(vexp[i] == c)
					 							if(temp=='0' || temp=='1' || temp=='2' || temp=='3' || temp=='4' || temp=='5' || temp=='6' || temp=='7' || temp=='8' || temp=='9' || temp=='.' || temp==')')
				 										 vexp = vexp.substring(0, i)+'*'+vexp.substring(i, vexp.length);
					 }
}

function vres()
{
			try{
						var temp = formatting(), ans = eval(temp);
						viewResult.value = ans;
						if(ans == 'Infinity' || ans == '-Infinity' ||  ans.toString() == 'NaN')
					
									viewResult.value = '';
						if(viewResult.value == 'true' || viewResult.value == 'false')
					 			viewResult.style.color = 'aquamarine';
						console.log(ans)
			}
			catch(err){
						viewResult.value = '';
						console.log(err)
			}
}
