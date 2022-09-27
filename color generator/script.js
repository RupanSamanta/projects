const display_color = document.getElementById('display-color'),
color_picker = document.getElementById('color-picker'),
generator = document.getElementById('generator'),
roller = document.getElementById('roller'),
go_top = document.getElementById('go-top'),
box = document.getElementsByClassName('box'),
inp = document.getElementsByName('col-val'),
hex_box = document.getElementById('hex'),
rgb_box = document.getElementById('rgb'),
hsv_box = document.getElementById('hsv'),
hsl_box = document.getElementById('hsl'),
copy_button = document.querySelectorAll('#copy'),
theme_button = document.getElementById('theme'),
code_buttons =     [   document.querySelectorAll('#bg button'),
    document.querySelectorAll('#border button'),
    document.querySelectorAll('#color button'),
    document.querySelectorAll('#txt-shw button')];
var hexa, tCount, allColor = 'linear-gradient(to right, ',
codeIndex = [0, 0, 0, 0];
    if (localStorage.getItem('theme') == null)    tCount = 0;
    else    tCount = localStorage.getItem('theme')-1;
go_top.disabled = true;

themeChange();
rgb_box.value = generateColor();
hex_box.value = rgbToHEX(rgb_box.value);
color_picker.value = hex_box.value;
display_color.style.background = color_picker.value;
hsv_box.value = rgbToHSV(rgb_box.value);
hsl_box.value = rgbToHSL(rgb_box.value);
if(tCount % 2 == 0)
    for (let i = 0; i < box.length; i++)
        box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
shadeHueSaturation();
relatedColor();
for (let i = 0; i < 360; i++)
    allColor += 'hsl('+i+', 100%, 50%),';
allColor = allColor.substring(0, allColor.length-2)+')';
roller.style.background = allColor;
rollerColor(); cssSnippets();

color_picker.addEventListener('change', ()=> {
    navigator.vibrate([50, 50]);
    display_color.style.background = color_picker.value;    
    hex_box.value = color_picker.value;
    rgb_box.value = hexToRGB(color_picker.value);
    hsv_box.value = rgbToHSV(rgb_box.value);
    hsl_box.value = rgbToHSL(rgb_box.value);
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});

hex_box.addEventListener('input', ()=> {
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    rgb_box.value = hexToRGB(color_picker.value);
    hsv_box.value = rgbToHSV(rgb_box.value);
    hsl_box.value = rgbToHSL(rgb_box.value);
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});

rgb_box.addEventListener('input', ()=> {
    hex_box.value = rgbToHEX(rgb_box.value);
    hsv_box.value = rgbToHSV(rgb_box.value);
    hsl_box.value = rgbToHSL(rgb_box.value);
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});

hsv_box.addEventListener('input', ()=> {
    rgb_box.value = hsvToRGB(hsv_box.value);
    hex_box.value = rgbToHEX(rgb_box.value);
    hsl_box.value = rgbToHSL(rgb_box.value);
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});

hsl_box.addEventListener('input', ()=> {
    rgb_box.value = hslToRGB(hsl_box.value);
    hex_box.value = rgbToHEX(rgb_box.value);
    hsv_box.value = rgbToHSV(rgb_box.value);
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});

generator.addEventListener('click', ()=> {
    navigator.vibrate(50);
    rgb_box.value = generateColor();
    hex_box.value = rgbToHEX(rgb_box.value);
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    hsv_box.value = rgbToHSV(rgb_box.value);
    hsl_box.value = rgbToHSL(rgb_box.value);
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});
roller.addEventListener('input', ()=> {
    hsl_box.value = roller.value+hsl_box.value.substring(hsl_box.value.indexOf(',')-1, hsl_box.value.length);
    rgb_box.value = hslToRGB(hsl_box.value);
    hex_box.value = rgbToHEX(rgb_box.value);
    hsv_box.value = rgbToHSV(rgb_box.value);
    color_picker.value = hex_box.value;
    display_color.style.background = color_picker.value;
    rollerColor();
    shadeHueSaturation();
    relatedColor();
    cssSnippets();
    if(tCount % 2 == 0)
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
});
for (let i = 0; i < code_buttons.length; i++)
    for (let j=0; j<code_buttons[i].length; j++)
        code_buttons[i][j].addEventListener('click', ()=> {
        codeIndex[i] = j;
        cssSnippets();
    });
for (let i = 0; i < copy_button.length; i++)
 copy_button[i].addEventListener('click', ()=> copyToClipboard(inp[i], i));
    
theme_button.addEventListener('click', ()=> {
    navigator.vibrate(60);
    themeChange();
});

function rgbToHEX(rgb) {
    var r = rgb.substring(0, rgb.indexOf(','))*1,
    g = rgb.substring(rgb.indexOf(',')+1, rgb.lastIndexOf(','))*1,
    b = rgb.substring(rgb.lastIndexOf(',')+1, rgb.length)*1,
    r = r > 100 ? 100 : r;
    g = g > 100 ? 100 : g;
    b = b > 100 ? 100 : b;
    rgb = [r, g, b],
    hex = '';
    for (let i = 0; i < rgb.length; i++) {
        rgb[i] = Math.abs(rgb[i]);
        var temp;
        temp = Math.floor(rgb[i] / 16);
        if(temp.toString() == 'NaN') {
            hex = ' ';
            break;
        }
        if(temp == 10) hex += 'a';
        else if(temp == 11) hex += 'b';
        else if(temp == 12) hex += 'c';
        else if(temp == 13) hex += 'd';
        else if(temp == 14) hex += 'e';
        else if(temp == 15) hex += 'f';
        else hex += temp;
        temp = rgb[i] % 16;
        if(temp == 10) hex += 'a';
        else if(temp == 11) hex += 'b';
        else if(temp == 12) hex += 'c';
        else if(temp == 13) hex += 'd';
        else if(temp == 14) hex += 'e';
        else if(temp == 15) hex += 'f';
        else hex += temp;
    }
    return hex == ' ' ? '':'#'+hex;
}

function hexToRGB(hex) {
    hex = hex.substring(1, hex.length);
    hex = [ hex.substring(0, 1),
            hex.substring(1, 2),
            hex.substring(2, 3),
            hex.substring(3, 4),
            hex.substring(4, 5),
            hex.substring(5, 6)
    ],
    rgb = '', val = 0;
    for (let i = 0, j = 1; i < hex.length; i++) {
        var temp = 1;
        if(hex[i] == 'a') temp = 10;
        else if(hex[i] == 'b') temp = 11;
        else if(hex[i] == 'c') temp = 12;
        else if(hex[i] == 'd') temp = 13;
        else if(hex[i] == 'e') temp = 14;
        else if(hex[i] == 'f') temp = 15;
        else temp = hex[i]*1;
        temp = temp * (16 ** j);
        val += temp;
        if(j == 0) {
            j = 1;
            rgb += val + ', ';
            val = 0;
        }
        else
            j--;
    }
    return rgb.substring(0, rgb.length-2);
}

function rgbToHSV(rgb) {
    var r, g, b, h, s, v, max, min,
    rr, gg, bb;
    r = (rgb.substring(0, rgb.indexOf(','))*1)/255;
    g = (rgb.substring(rgb.indexOf(',')+1, rgb.lastIndexOf(','))*1)/255;
    b = (rgb.substring(rgb.lastIndexOf(',')+1, rgb.length)*1)/255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b); 
    v = max;
    if (max == min)
        return '0°, 0%, '+Math.round(v*100)+'%';
    s = (max - min) / max;
    rr = (max - r) / (max - min);
    gg = (max - g) / (max - min);
    bb = (max - b) / (max - min);
    if (r == max)
        h = 0.0 + bb - gg;
    else if (g == max)
        h = 2.0 + rr - bb;
    else 
        h = 4.0 + gg - rr;
    h = ((h / 6.0) % 1.0) * 360;
    if(h < 0) h = 360 - (h*-1);
    if (h.toString() == 'NaN')
        return '';
    else 
        return Math.round(h)+'°, '+Math.round(s*100)+'%, '+Math.round(v*100)+'%';
}

function hsvToRGB(hsv) {
    var h, s, v, c, x, m, r, g, b;
    h = hsv.substring(0, hsv.indexOf(',')-1)*1,
    s = hsv.substring(hsv.indexOf(',')+1, hsv.indexOf('%'))*1/100,
    v = hsv.substring(hsv.lastIndexOf(',')+1, hsv.length-1)*1/100;
    h = h > 360 ? h%180 : h;
    c = v * s;
    x = c * (1 - Math.abs((h/60)%2 - 1));
    m = v - c;
    if (0 <= h && h < 60){
        r = c; g = x; b = 0;
    }
    else if (60 <= h && h < 120){
        r = x; g = c; b = 0;
    }
    else if (120 <= h && h < 180){
        r = 0; g = c; b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    }
    else if (240 <= h && h < 300){
        r = x; g = 0; b = c;
    }
    else {
        r = c; g = 0; b = x;
    }
    if (r.toString() == 'NaN')
        return '';
    else
        return Math.round((r+m)*255)+', '+Math.round((g+m)*255)+', '+Math.round((b+m)*255);
}

function rgbToHSL(rgb) {
    var r, g, b, max, min, dif, h, s, l;
    r = (rgb.substring(0, rgb.indexOf(','))*1)/255;
    g = (rgb.substring(rgb.indexOf(',')+1, rgb.lastIndexOf(','))*1)/255;
    b = (rgb.substring(rgb.lastIndexOf(',')+1, rgb.length)*1)/255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    dif = max - min ;
    l = (max + min)/2;    
    s = dif == 0 ? 0 : dif/(1 - Math.abs(2*l - 1));
    if (dif == 0)
        h = 0;
    else if (max == r)
        h = ((g - b) / dif) % 6;
    else if (max == g)
        h = (b - r) / dif + 2;
    else if (max == b)
        h = (r - g) / dif + 4;
    h *= 60;
    h = h < 0 ? 360 - (h*-1) : h;
    if (h.toString() == 'NaN')
        return '';
    else 
        return Math.round(h)+'°, '+Math.round(s*100)+'%, '+Math.round(l*100)+'%';
}

function hslToRGB(hsl) {
    var h, s, l, c, x, m, r, g, b;
    h = hsl.substring(0, hsl.indexOf(',')-1)*1,
    s = hsl.substring(hsl.indexOf(',')+1, hsl.indexOf('%'))*1/100,
    l = hsl.substring(hsl.lastIndexOf(',')+1, hsl.length-1)*1/100;
    h = h > 360 ? h%180 : h;
    c = (1 - Math.abs(2*l - 1)) * s;
    x = c * (1 - Math.abs((h/60)%2 - 1));
    m = l - c/2;
    if (0 <= h && h < 60){
        r = c; g = x; b = 0;
    }
    else if (60 <= h && h < 120){
        r = x; g = c; b = 0;
    }
    else if (120 <= h && h < 180){
        r = 0; g = c; b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    }
    else if (240 <= h && h < 300){
        r = x; g = 0; b = c;
    }
    else {
        r = c; g = 0; b = x;
    }
    if (r.toString() == 'NaN')
        return '';
    else
        return Math.round((r+m)*255)+', '+Math.round((g+m)*255)+', '+Math.round((b+m)*255);
}

function generateColor() {
    var r = Math.random() * (255 + 1),
    g = Math.random() * (255 + 1),
    b = Math.random() * (255 + 1);
    return Math.round(r)+', '+Math.round(g)+', '+Math.round(b);
}

function relatedColor() {
    var hsl = hsl_box.value, lig = hsl.substring(hsl.lastIndexOf(',')+1, hsl.lastIndexOf('%')),
    val = hsl.substring(0, hsl.lastIndexOf(',')+1),
    related_color = document.getElementById('related-color'),
    p = document.createElement('p');
    p.innerHTML = 'Related Colors';
    p.className = 'caption';
    related_color.innerHTML = '';
    related_color.appendChild(p);
    for (let i=0; i < 8; i++) {
        lig = i<=1 ? lig - 3 : i == 8/2 ?  hsl.substring(hsl.lastIndexOf(',')+1, hsl.lastIndexOf('%')) : lig;
        lig = i>1 ? lig*1 + 5 : lig;
        var wrap = document.createElement('div'),
        box = document.createElement('div'),
        col = document.createElement('span');
        wrap.className = 'related-color-box';
        col.innerHTML = rgbToHEX(hslToRGB(val+lig+'%'));
        box.style.background = 'rgb('+hslToRGB(val+lig+'%')+')';
        wrap.appendChild(box);
        wrap.appendChild(col);
        related_color.appendChild(wrap);
    }
}

function shadeHueSaturation() {
    var shade_box = document.getElementById('shades'),
    saturation_box = document.getElementById('saturation'),
    hue_box = document.getElementById('hue'),
    tbl = document.createElement('table'),
    hsl = hsl_box.value, temp = hsl,
    tr, th = document.createElement('th'),
    hex, rgb, hsv, arr = ['Color', 'HEX', 'RGB', 'HSV', 'HSL'], c = false,
    para = ['l', 's', 'h'],
    ind = [100, 100, 360], inc = 5;
    if (hsl == '') {
        return '';
    }
    if (para == 'l')
        tbl.id = 'shade-table';
    else if (para == 's')
        tbl.id = 'saturation-table';
    else if (para == 'h')
        tbl.id = 'hue-table';

    for (let i = 0; i < para.length ; i++) { 
        inc = i > 1 ? 15 : 5;
        tr = document.createElement('tr');
        for (let x = 0; x < arr.length; x++){
            th.innerHTML = arr[x];
            tr.appendChild(th);
            th = document.createElement('th');
        }
        tbl.appendChild(tr);
    for (let j = ind[i]; j >= 0; j-= inc) {
        if (para[i] == 'l') {
            hsl = hsl.substring(0, hsl.lastIndexOf(',')+1)+' '+j+'%';
            temp = c ? ' ': hsl_box.value.substring(hsl_box.value.lastIndexOf(',')+1, hsl_box.value.lastIndexOf('%'));
        }
        else if (para[i] == 's') {
            hsl = hsl.substring(0, hsl.indexOf(',')+1) +' '+j+'%'+hsl.substring(hsl.lastIndexOf(','), hsl.length);
            temp = c ? ' ':hsl_box.value.substring(hsl_box.value.indexOf(',')+1, hsl_box.value.indexOf('%'));
        }
        else if (para[i] == 'h') {
            hsl = j+hsl.substring(hsl.indexOf('°'), hsl.length);
            temp = c ? ' ': hsl_box.value.substring(0, hsl_box.value.indexOf('°'));
        }
        tr = document.createElement('tr');
        if (temp > j) {
            tr.style.fontWeight = '700';
            tr.style.background = 'rgba('+rgb_box.value+', 0.2)';
            rgb = hslToRGB(hsl_box.value);
            hex = rgbToHEX(rgb);
            hsv = rgbToHSV(rgb);
 
            for (let k = 0; k < 5; k++) {
                var td = document.createElement('td');
                if (k == 0)
                    td.style.background = 'hsl('+hsl.replace('°', '')+')';
                else if (k == 1)
                    td.innerHTML = hex;
                else if (k == 2)
                    td.innerHTML = rgb;
                else if (k == 3)
                    td.innerHTML = hsv;
                else 
                    td.innerHTML = hsl_box.value;
                tr.appendChild(td);
            }
            tr.style.boxShadow = '0 0 5px 1px rgba(0, 0, 0, 0.05)';
            tbl.appendChild(tr); 
             tr = document.createElement('tr');
             c = true;
        }
        else if (temp < j){
            rgb = hslToRGB(hsl);
            hex = rgbToHEX(rgb);
            hsv = rgbToHSV(rgb);
        }
        else if (temp == j && c == false){
            tr.style.fontWeight = '700';
            tr.style.background = 'rgba('+rgb_box.value+', 0.2)';
            tr.style.boxShadow = '0 0 5px 1px rgba(0, 0, 0, 0.05)';
            rgb = hslToRGB(hsl);
            hex = rgbToHEX(rgb);
            hsv = rgbToHSV(rgb);
            c = true;
        }
        
        for (let k = 0; k < 5; k++) {
            var td = document.createElement('td');
            if (k == 0)
                td.style.background = 'hsl('+hsl.replace('°', '')+')';          
            else if (k == 1)
                td.innerHTML = hex;
            else if (k == 2)
                td.innerHTML = rgb;
            else if (k == 3)
                td.innerHTML = hsv;
            else 
                td.innerHTML = hsl;
            tr.appendChild(td);
        }
        tbl.appendChild(tr); 
    }
        if (para[i] == 'l') {
            shade_box.innerHTML = '<p class="caption">Shades</p>'; 
            shade_box.appendChild(tbl);
    }
        else if (para[i] == 's') {
            saturation_box.innerHTML = '<p class="caption">Saturation</p>'; 
            saturation_box.appendChild (tbl);
    }
        else if (para[i] == 'h') {
            hue_box.innerHTML = '<p class="caption">Hue</p>'; 
            hue_box.appendChild(tbl);
    } 
        tbl = document.createElement('table');
        hsl = hsl_box.value; 
        temp = hsl_box.value;
        c = false;
    }
}

function cssSnippets() {
    var output_box = document.getElementsByClassName('output'),
    bg_button = document.querySelectorAll('.bg-buttons button'),
    val = document.getElementsByClassName('value'),
    hsl = 'hsl('+hsl_box.value.replace('°', '')+')',
    rgb = 'rgb('+rgb_box.value+')',
    bord = 'solid 5px ',
    shw = '0 0 5px ';
    
    output_box[0].style.background = hsl;
    if (codeIndex[0] == 0)
        val[0].innerHTML = hex_box.value;
    else if(codeIndex[0] == 1)
        val[0].innerHTML = rgb;
    else
        val[0].innerHTML = hsl;
    
    output_box[1].style.border = bord+hsl;
    if (codeIndex[1] == 0)
        val[1].innerHTML =  bord+hex_box.value;
    else if(codeIndex[1] == 1)
        val[1].innerHTML =  bord+rgb;
    else
        val[1].innerHTML =  bord+hsl;

    output_box[2].style.color = hsl;
    if (codeIndex[2] == 0)
        val[2].innerHTML = hex_box.value;
    else if(codeIndex[2] == 1)
        val[2].innerHTML =  rgb;
    else
        val[2].innerHTML =  hsl;

    output_box[3].style.textShadow = '0 0 15px '+hex_box.value;
    if (codeIndex[3] == 0)
        val[3].innerHTML =  shw+hex_box.value;
    else if(codeIndex[3] == 1)
        val[3].innerHTML =  shw+rgb;
    else
        val[3].innerHTML =  shw+hsl;
}

function themeChange() {
    var body = document.body,
    meta = document.getElementsByName('theme-color')[0],
    label = document.getElementsByTagName('label'),
    code_box = document.getElementsByClassName('code'),
    output_box = document.getElementsByClassName('output'),
    fa = document.getElementsByTagName('i');
    if(tCount % 2 == 0) {
        theme_button.innerHTML = '<i class="fa-solid fa-moon"></i>';
        body.style.color = 'gainsboro';
        body.style.background = '#1f1f1f';
        for (let i = 0; i < inp.length; i++)
            inp[i].style.color = 'gainsboro';
        for (let i = 0; i < fa.length; i++)
            fa[i].style.color = 'gainsboro';
        meta.content = '#1f1f1f';
        display_color.style.borderColor = 'lightgrey';
        roller.style.borderColor = 'lightgrey';
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba(255, 255, 255, 0.15)';
        for (let i = 0; i < label.length; i++)
            label[i].style.background = 'rgba(0, 0, 0, 0.5)';
        for (let i = 0; i < code_box.length; i++) {
            code_box[i].style.background = 'rgba(0, 0, 0, 0.5)';
            output_box[i].style.background = 'rgba(0, 0, 0, 0.5)';
            }
    }
    else {
        theme_button.innerHTML = '<i class="fa-solid fa-sun"></i>';
        body.style.color = 'black';
        body.style.background = 'ghostwhite';
        meta.content = 'ghostwhite';
        display_color.style.borderColor = 'black';
        roller.style.borderColor = 'black';
        for (let i = 0; i < inp.length; i++)
            inp[i].style.color = 'black';
        for (let i = 0; i < fa.length; i++)
            fa[i].style.color = 'black';
        for (let i = 0; i < label.length; i++)
            label[i].style.background = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < box.length; i++)
            box[i].style.background = 'rgba('+rgb_box.value+', 0.1)';
        for (let i = 0; i < code_box.length; i++) {
            code_box[i].style.background = 'rgba(255, 255, 255, 0.6)';
            output_box[i].style.background = 'rgba(255, 255, 255, 0.6)';
            }
    }
    tCount++;
    localStorage.setItem('theme', tCount);
}

function copySnippets() {
    var cd_box = document.querySelectorAll('.code pre'),
    copy_code = document.getElementsByClassName('code-copy');
    for (let i=0; i<copy_code.length; i++) {
        copy_code[i].addEventListener('click', function () {
            navigator.clipboard.writeText(cd_box[i].textContent);
        copy_code[i].disabled = true;
        copy_code[i].innerHTML = '<i class="fa-solid fa-check"></i>';    
        navigator.vibrate(40);
        if (tCount % 2 != 0)
            copy_code[i].style.color = 'gainsboro';
        else
            copy_code[i].style.color = 'black';
        setTimeout(function () {
            copy_code[i].innerHTML = '<i class="fa-regular fa-clone"></i>';
            copy_code[i].disabled = false;
            if (tCount % 2 != 0)
                copy_code[i].style.color = 'gainsboro';
            else
                copy_code[i].style.color = 'black';
            }, 1500);
        });
    }
}copySnippets();

function copyToClipboard(e, i) {
    navigator.clipboard.writeText(e.value);
    copy_button[i].disabled = true;
    copy_button[i].innerHTML = '<i class="fa-solid fa-check"></i>';    
    navigator.vibrate(40);
    if (tCount % 2 != 0)
        copy_button[i].style.color = 'gainsboro';
    else
        copy_button[i].style.color = 'black';
    setTimeout(function () {
        copy_button[i].innerHTML = '<i class="fa-regular fa-clone"></i>';
        copy_button[i].disabled = false;
        if (tCount % 2 != 0)
            copy_button[i].style.color = 'gainsboro';
        else
            copy_button[i].style.color = 'black';
    }, 1500);
}

function rollerColor() {
    roller.value = hsl_box.value.substring(0, hsl_box.value.indexOf(',')-1);
    roller.style.setProperty('--thumbColor', hex_box.value);
}

window.onscroll = function () {
    if(document.documentElement.scrollTop >= 650) {
        go_top.style.opacity = 1;
        go_top.disabled = false;
        if ( tCount % 2 == 0) {
            
            go_top.style.background = 'rgba('+rgb_box.value+', 0.5)';
            go_top.style.boxShadow = '0 0 10px 2px rgba(0, 0, 0, 0.15)';
        }
        else {
            go_top.style.background = 'rgba(255, 255, 255, 0.15)';  
            go_top.style.boxShadow = '0 0 10px 2px rgba(0, 0, 0, 0.5)';
        }     
    }
    else {
        go_top.style.opacity = 0;
        go_top.disabled = true;
    }
}
go_top.addEventListener('click', ()=> document.documentElement.scrollTop = 0)
