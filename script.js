			var title = document.getElementById('title'),
			figcap = document.getElementsByTagName('figcaption'),
			fig = document.getElementsByTagName('figure'),
			anchor = document.getElementsByTagName('a'),
			tp = document.getElementById('top'),
			article = document.getElementById('article'),
			f = document.getElementsByTagName('footer')[0],
			embButton, downButton,
			colors = [
						'gold', 'skyblue', 'tomato', 'darkviolet'
			],
			links = [
						'Password Generator',
						'Maths Quiz', 'calculator'
			],
			projectTitle = [
						'Random Password Generator',
						'Simple Maths Quiz', 'Calculator'
			],
			fonticons = [
					'<i class="fa-solid fa-key"></i>',
			  		`<i class="fa-solid fa-m"></i>
			   		<i class="fa-solid fa-a"></i>
				  	<i class="fa-solid fa-t"></i>
				        <i class="fa-solid fa-h"></i>
				  	<i class="fa-solid fa-s"></i>`,
                                        '<i class="fa-solid fa-calculator"></i>'
			];
			
			title.style.height = window.innerHeight+'px';
		 
		 for (let i=0; i<projectTitle.length; i++)
		 				genFig(i);
		 	
		 	embButton = document.querySelectorAll('#embed');
			downButton = document.querySelectorAll('#download'); 	
			
		 	for (let i = 0; i < embButton.length; i++) {
		 				embButton[i].onclick = function ()
		 				{
		 		  				navigator.clipboard.writeText('<iframe src="https://rupansamanta.github.io/projects/'+links[i]+'/" style="width: 200px; height: 200px; border: 0;"></iframe>');
									embButton[i].innerHTML = 'Copied!';
									setTimeout(()=>{
												embButton[i].innerHTML = '<i class="fa-solid fa-code"></i>';
									}, 2000);
		 				}
		 				downButton[i].onclick = function ()
		 				{
		 							var a = document.createElement('a');
		 							a.href = 'https://rupansamanta.github.io/projects/assests/zips/'+links[i]+'.zip';
		 							document.body.appendChild(a);
		 							a.click();
		 							document.body.removeChild(a);
		 							sendGetRequest(i);
		 				}
		 	}
		 	
			for(let i=0, j=0; i<figcap.length; i++){
						figcap[i].style.background = colors[i];
						if(j == colors.length-1)
									j = 0;
                                                else j++;
			}
			
			for(let i=0; i<anchor.length; i++)
						anchor[i].setAttribute('target', '_blank');
			
			for(let i=0; i<fig.length; i++)
						fig[i].ondblclick = function ()
						{
									if(confirm('Open in new window?'))
												window.open(links[i], '_blank')
						}
			
			window.onscroll = goTop;
			tp.onclick = ()=>{document.documentElement.scrollTop = 0}
			function goTop()
			{ 
						if(document.documentElement.scrollTop >= f.getBoundingClientRect().top)
									tp.style.display = 'block';
					  else
									tp.style.display = 'none';
			}
			function genFig(ind)
			{
						var fig = document.createElement('figure'),
										figcap = document.createElement('figcaption'),
									 div = document.createElement('div'),
									 but = document.createElement('button');
						div.setAttribute('id', 'emb-down');
						but.innerHTML = '<i class="fa-solid fa-code"></i>';
						but.id = 'embed';
						div.appendChild(but);
						but = document.createElement('button');
						but.innerHTML = '<i class="fa-solid fa-download"></i>';
						but.id = 'download';
						div.appendChild(but);
						figcap.innerHTML = projectTitle[ind];
						fig.appendChild(div);
						fig.innerHTML += fonticons[ind];
						fig.appendChild(figcap);
						article.appendChild(fig);
			}
			   
      function sendGetRequest(i) {
      			var httpRequest = new XMLHttpRequest();   
         httpRequest.onreadystatechange = function ()
         {
               
         if(httpRequest.readyState === 4) {
            if(httpRequest.status == 200) {
               var response = httpRequest.responseText;
               downButton[i].innerHTML = '<i class="fa-solid fa-check"></i>';
            
          setTimeout(()=>{
				downButton[i].innerHTML = '<i class="fa-solid fa-download"></i>';
	           }, 2000);
         } else {
               downButton[i].innerHTML = '<i class="fa-solid fa-xmark"></i>';
            setTimeout(()=>{
				downButton[i].innerHTML = '<i class="fa-solid fa-download"></i>';
	           }, 2000);
         }
         } else {
            downButton[i].innerHTML = '<i class="fa-solid fa-spinner"></i>';
            setTimeout(()=>{
				downButton[i].innerHTML = '<i class="fa-solid fa-download"></i>';
	           }, 2000);
          }
      }
      httpRequest.open('GET', 'https://rupansamanta.github.io/projects/assests/zips/'+links[i]+'.zip');
      httpRequest.send();
   }
