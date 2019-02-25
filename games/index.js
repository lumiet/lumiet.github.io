var img = document.getElementById('ani');
var height = img.offsetHeight;
var amp = 25;
var step = 1;
var x = 0;
var y = 0;
var init = window.innerHeight - (amp*2) - 3 - height;

function main() {
img.style.position = 'absolute';
setInterval(move, 20);
}

function move() {
if(x<0||x>(window.innerWidth-(height))) {
  step*=-1;
}
x+=step;
y=Math.sin(x/10)*amp + init;
img.style.left = x+"px";
img.style.top = y+"px";
}
