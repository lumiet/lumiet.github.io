var img = document.getElementById('zekrom');
var x = 0;
var y = 0;
var amp = 50;

function main() {
img.style.position = 'absolute';
setInterval(move, 20);
}

function move() {
x+=5;
y=Math.sin(x)*amp;
img.style.left = "\(x)px";
img.style.top = "\(y)px";
}
