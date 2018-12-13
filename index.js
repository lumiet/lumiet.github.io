var img = document.getElementById('zekrom');
var amp = 25;
var x = 0;
var y = window.innerHeight - (amp*2) - 3;


function main() {
img.style.position = 'absolute';
setInterval(move, 20);
}

function move() {
x+=1;
y=Math.sin(x/10)*amp;
img.style.left = x+"px";
img.style.top = y+"px";
}
