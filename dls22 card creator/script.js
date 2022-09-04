const positionSel = document.getElementsByClassName('position')[0],
countrySel = document.getElementsByClassName('country')[0],
footSel = document.getElementsByClassName('foot')[0],
bootCol = document.getElementsByClassName('boot-col')[0],
posValue = ['WF', 'CF', 'LM', 'AM', 'CM', 'DM', 'RM', 'LB', 'CB', 'RB', 'GK'],
colName = ['Random', 'Black', 'White', 'Gold', 'Red', 'Blue', 'Pink', 'Yellow', 'Orange', 'Violet', 'Brown', 'Green', 'Grey'],
footType = ['Left', 'Right', 'Both'],
countryName = ["Afghanistan", 	"Albania", 	"Algeria", 	"American Samoa", 	"Andorra", 	"Angola", 	"Anguilla", 	"Antarctica", 	"Antigua and Barbuda", 	"Argentina", 	"Armenia", 	"Aruba", 	"Australia", 	"Austria", 	"Azerbaijan", 	"Bahamas", 	"Bahrain", 	"Bangladesh", 	"Barbados", 	"Belarus", 	"Belgium", 	"Belize", 	"Benin", 	"Bermuda", 	"Bhutan", 	"Bolivia", 	"Bonaire, Sint Eustatius and Saba", 	"Bosnia and Herzegovina", 	"Botswana", 	"Bouvet Island", 	"Brazil", 	"British Indian Ocean Territory", 	"Brunei Darussalam", 	"Bulgaria", 	"Burkina Faso", 	"Burundi", 	"Cabo Verde", 	"Cambodia", 	"Cameroon", 	"Canada", 	"Cayman Islands", 	"Central African Republic", 	"Chad", 	"Chile", 	"China", 	"Christmas Island", 	"Cocos Islands", 	"Colombia", 	"Comoros", 	"Democratic Republic of Congo",  "Republic of the Congo", 	"Cook Islands", 	"Costa Rica", 	"Croatia", 	"Cuba", 	"Curaçao", 	"Cyprus", 	"Czechia", 	"Ivory Coast", 	"Denmark", 	"Djibouti", 	"Dominica", 	"Dominican Republic", 	"Ecuador", 	"Egypt", 	"El Salvador", 	"England", 	"Eritrea", 	"Estonia", 	"Eswatini", 	"Ethiopia", "Equitorial Guinea", 	"Falkland Islands", 	"Faroe Islands", 	"Fiji", 	"Finland", 	"France", 	"French Guiana", 	"French Polynesia", 	"French Southern Territories", 	"Gabon", 	"Gambia", 	"Georgia", 	"Germany", 	"Ghana", 	"Gibraltar", 	"Greece", 	"Greenland", 	"Grenada", 	"Guadeloupe", 	"Guam", 	"Guatemala", 	"Guernsey", 	"Guinea", 	"Guinea-Bissau", 	"Guyana", 	"Haiti", 	"Heard Island and McDonald Islands", 	"Honduras", 	"Hong Kong", 	"Hungary", 	"Iceland", 	"India", 	"Indonesia", 	"Iran", 	"Iraq", 	"Ireland", 	"Isle of Man", 	"Israel", 	"Italy", 	"Jamaica", 	"Japan", 	"Jersey", 	"Jordan", 	"Kazakhstan", 	"Kenya", 	"Kiribati", 	"Kuwait", 	"Kyrgyzstan", 	"Laos", 	"Latvia", 	"Lebanon", 	"Lesotho", 	"Liberia", 	"Libya", 	"Liechtenstein", 	"Lithuania", 	"Luxembourg", 	"Macao", 	"Madagascar", 	"Malawi", 	"Malaysia", 	"Maldives", 	"Mali", 	"Malta", 	"Marshall Islands", 	"Martinique", 	"Mauritania", 	"Mauritius", 	"Mayotte", 	"Mexico", 	"Micronesia", 	"Moldova", 	"Monaco", 	"Mongolia", 	"Montenegro", 	"Montserrat", 	"Morocco", 	"Mozambique", 	"Myanmar", 	"Namibia", 	"Nauru", 	"Nepal", 	"Netherlands", 	"New Caledonia", 	"New Zealand", 	"Nicaragua", 	"Niger", 	"Nigeria", 	"Niue", 	"Norfolk Island", "North Korea", "North Macedonia", 	"Northern Mariana Islands", 	"Norway", 	"Oman", 	"Pakistan", 	"Palau", 	"Palestine, State of", 	"Panama", 	"Papua New Guinea", 	"Paraguay", 	"Peru", 	"Philippines", 	"Pitcairn", 	"Poland", 	"Portugal", 	"Puerto Rico", 	"Qatar",	"Romania", 	"Russia", 	"Rwanda", 	"Réunion", 	"Saint Barthélemy", 	"Saint Helena, Ascension and Tristan da Cunha", 	"Saint Kitts and Nevis", 	"Saint Lucia", 	"Saint Martin", 	"Saint Pierre and Miquelon", 	"Saint Vincent and the Grenadines", 	"Samoa", 	"San Marino", 	"Sao Tome and Principe", 	"Saudi Arabia", "Scotland", 	"Senegal", 	"Serbia", 	"Seychelles", 	"Sierra Leone", 	"Singapore", 	"Sint Maarten", 	"Slovakia", 	"Slovenia", 	"Solomon Islands", 	"Somalia", 	"South Africa", 	"South Georgia and the South Sandwich Islands", "South Korea", 	"South Sudan", 	"Spain", 	"Sri Lanka", 	"Sudan", 	"Suriname", 	"Svalbard and Jan Mayen", 	"Sweden", 	"Switzerland", 	"Syria", 	"Taiwan", 	"Tajikistan", 	"Tanzania", 	"Thailand", 	"Timor-Leste", 	"Togo", 	"Tokelau", 	"Tonga", 	"Trinidad and Tobago", 	"Tunisia", 	"Turkey", 	"Turkmenistan", 	"Turks and Caicos Islands", 	"Tuvalu", 	"Uganda", 	"Ukraine", 	"United Arab Emirates", 	"United Kingdom of Great Britain and Northern Ireland", "United States of America", 	"Uruguay", 	"Uzbekistan", 	"Vanuatu", "Vatican City", 	"Venezuela", 	"Vietnam", 	"Virgin Islands (British)", 	"Virgin Islands (U.S.)", 	"Wales", "Wallis and Futuna", 	"Western Sahara", 	"Yemen", 	"Zambia", 	"Zimbabwe", 	"Åland Islands"],
countryVal = ['af','al','dz','ws','ad','ao','ai','aq','ag','ar','am','aw','au','at','az','bs','bh','bd','bb','by','be','bz','bj','bm','bt','bo','bq','ba','bw','bv','br','io','bn','bg','bf','bi','cv','kh','cm','ca','ky','cf','td','cl','tw','cx','cc','co','km','cd','cg','ck','cr','hr','cu','cw','cy','cz','ci','dk','dj','dm','do','ec','eg','sv','eng','er','ee','sz','et','gq','fk','fo','fj','fi','fr','gf','pf','tf','ga','gm','gs','de','gh','gi','gr','gl','gd','gp','gu','gt','gg','gn','gw','gy','ht','hm','hn','hk','hu','is','in','id','ck','iq','ie','im','il','it','jm','jp','je','jo','kz','ke','ki','kw','kg','la','lv','lb','ls','lr','ly','li','lt','lu','mo','mg','mw','my','mv','ml','mt','mh','mq','mr','mu','yt','mx','fm','md','mc','mn','me','ms','ma','mz','mm','na','nr','np','nl','nc','nz','ni','ne','ng','nu','nf','kp','mk','mp','no','om','pk','pw','ps','pa','pg','py','pe','ph','pn','pl','pt','pr','qa','ro','ru','rw','re','bl','sh','kn','lc','mf','pm','vc','ws','sm','st','sa','scot','sn','rs','sc','sl','sg','sx','sk','si','sb','so','za','gs','kr','ss','es','lk','sd','sr','sj','se','ch','sy','tw','tj','tz','th','tl','tg','tk','to','tt','tn','tr','tm','tc','tv','ug','ua','ae','gb','us','uy','uz','vu','va','ve','vn','vg','vi','wales','wf','eh','ye','zm','zw','ax'];
/* Select options for position */

for (let i = 0; i < posValue.length; i++)
{
			var opt = document.createElement('option');
			opt.value = posValue[i];
			opt.innerHTML = posValue[i];
			if(posValue[i].toLowerCase() == 'cf')
						opt.selected = true;
			positionSel.appendChild(opt);
}
/* Select options for foot type */
for (let i = 0; i < footType.length; i++)
{
			var opt = document.createElement('option');
			opt.value = footType[i];
			opt.innerHTML = footType[i];
			if(footType[i].toLowerCase() == 'both')
						opt.selected = true;
			footSel.appendChild(opt);
}
/* Select options for color names */
for (let i = 0; i < colName.length; i++)
{
			var opt = document.createElement('option');
			opt.value = colName[i].toLowerCase();
			opt.innerHTML = colName[i];
			if(colName[i].toLowerCase() == 'red')
						opt.selected = true;
			bootCol.appendChild(opt);
}

for (let i = 0; i < countryName.length; i++)
{
			var opt = document.createElement('option');
		 opt.value = countryVal[i].toLowerCase();
			opt.innerHTML = countryName[i];
			if(countryName[i].toLowerCase() == 'portugal')
			opt.selected = true;
			countrySel.appendChild(opt);
}

var goTop = document.createElement('button');
goTop.className = 'goTop';
goTop.disabled = true;
goTop.innerHTML = '<i class="fa-solid fa-circle-chevron-up"></i>';
goTop.onclick = function()
{
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
}
document.body.appendChild(goTop);
window.onscroll = function ()
{
			var top = document.getElementsByClassName('goTop')[0];
			if(document.body.scrollTop > 400 || document.documentElement.scrollTop > 400)
			{
						top.style.visibility = 'visible';
						top.disabled = false;
			}
			else
			{
						top.style.visibility = 'hidden';
						top.disabled = false;
			}
}

document.getElementById('max').onclick = ()=>{alert('Max Card will be added soon please have patience');}
