var img = document.getElementById('zekrom');
var height = img.offsetHeight;
var amp = 25;
var x = 0;
var y = 0;
var init = window.innerHeight - (amp*2) - 3 - height;

function main() {
img.style.position = 'absolute';
setInterval(move, 20);
}

function move() {
if(x<0||x>window.innerWidth) {
  amp*=-1;
}
x+=1;
y=Math.sin(x/10)*amp + init;
img.style.left = x+"px";
img.style.top = y+"px";
}
