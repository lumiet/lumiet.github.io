var baseimg = new Image();
baseimg.src = "assets/lineart.png";

function main() {

var ctx = document.getElementById('img').getContext('2d');

baseimg.onload = function() {
	ctx.drawImage(baseimg,0,0);
}
}