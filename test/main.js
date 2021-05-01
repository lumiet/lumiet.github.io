var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function main() {
var base = new Image();
base.src = "assets/base.png";
console.log(base.src);
var darkBase = new Image();
darkBase.src = "assets/dark-base.png";
console.log(darkBase.src);
var lightBase = new Image();
lightBase.src = "assets/light-base.png";


for(var i = 0; i<3; i++){	
	ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)';	
	console.log(ctx.filter);
	switch(i) {
		case 0: base.onload = function() {ctx.drawImage(this,0,0);}; base.src = canvas.toDataURL("image/png"); console.log(base.src); break;
		case 1: darkBase.onload = function() {ctx.drawImage(this,0,0);}; darkBase.src = canvas.toDataURL("image/png"); console.log(darkBase.src); break;
		case 2: lightBase.onload = function() {ctx.drawImage(lightBase,0,0);}; lightBase.src = canvas.toDataURL("image/png"); console.log(lightBase.src); break;	
		default: break;
	}
	console.log(i);
	//ctx.clearRect(0,0,canvas.width,canvas.height);
} 

console.log("lol hi");
var testElem = document.getElementById("test");
test.style = 'background: url("'+base.src+'");';


/*	console.log("losdfsdf");
amnt = Math.random()*360;
console.log(amnt);
document.getElementById("shading").style = "filter: hue-rotate(" + amnt + "deg);"; */

}