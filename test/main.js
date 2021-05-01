var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function main() {
var base = new Image();
var darkBase = new Image();
console.log(darkBase.src);
var lightBase = new Image();


for(var i = 0; i<3; i++){	
	ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)';	
	console.log(ctx.filter);
	switch(i) {
		case 0: base.onload = function() {this.src = "assets/base.png"; ctx.drawImage(this,0,0);console.log("kdfjgf");}; base.src = canvas.toDataURL(); console.log(base.src); break;
		case 1: darkBase.onload = function() {this.src = "assets/dark-base.png"; ctx.drawImage(this,0,0);}; darkBase.src = canvas.toDataURL(); console.log(darkBase.src); break;
		case 2: lightBase.onload = function() {this.src = "assets/light-base.png"; ctx.drawImage(this,0,0);}; lightBase.src = canvas.toDataURL(); console.log(lightBase.src); break;	
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