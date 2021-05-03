function renderElement() {	
	var testElem = document.getElementById("test");
	testElem.style = 'background: url("assets/glare.png"), url("assets/lineart.png"), url("assets/highlights.png"), url("assets/shade.png"), url("assets/shade-2.png"), url("'+baseUrls.darkLines+'"), url("'+baseUrls.lightLines+'"), url("'+baseUrls.eyes+'"), url("assets/whites.png"), url("'+baseUrls.nose+'"), url("'+baseUrls.lightBase+'"), url("'+baseUrls.darkBase+'"), url("'+baseUrls.base+'")';
	testElem.style.backgroundBlendMode = 'normal,normal,screen,multiply,multiply,normal,normal,normal,normal,normal,normal,normal,normal';
}


var baseUrls = {base:"", darkBase:"", lightBase:"", nose:"", eyes:"", darkLines:"", lightLines:""};

function main() {
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var nose = new Image();
var base = new Image();
var darkLines = new Image();
var darkBase = new Image();
var lightLines = new Image();
var lightBase = new Image();
var eyes = {base: new Image(), dark: new Image(), pupil: new Image()};


for(var i = 0; i<4; i++){		
	switch(i) {
		case 0: base.onload = 
		function() { 
			ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)'; 			
			ctx.drawImage(this,0,0); 
			baseUrls.base = canvas.toDataURL(); 
			ctx.clearRect(0,0,canvas.width,canvas.height);		
			ctx.drawImage(nose,0,0);
			baseUrls.nose = canvas.toDataURL();
			ctx.clearRect(0,0,canvas.width,canvas.height);		
			
			};  break;
		case 1: darkBase.onload = 
		function() {
			ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)'; 
			ctx.drawImage(this,0,0); 
			baseUrls.darkBase = canvas.toDataURL();		
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.drawImage(darkLines,0,0);
			baseUrls.darkLines = canvas.toDataURL();
			ctx.clearRect(0,0,canvas.width,canvas.height);
		};  break;
		case 2: lightBase.onload = 
		function() {
			ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)'; 
			ctx.drawImage(this,0,0); 
			baseUrls.lightBase = canvas.toDataURL();
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.drawImage(lightLines,0,0);
			baseUrls.lightLines = canvas.toDataURL();
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}; break;	
		case 3: eyes.pupil.onload = 
		function() {
			ctx.filter = 'hue-rotate('+ (Math.random()*360) +'deg)'; 
			ctx.drawImage(eyes.base,0,0); 
			ctx.drawImage(eyes.dark,0,0); 
			ctx.drawImage(this,0,0); 
			baseUrls.eyes = canvas.toDataURL();
			ctx.clearRect(0,0,canvas.width,canvas.height);
			renderElement(); //fix later lol
		}; break;	
		default: break;
	}
	} 
nose.src = "assets/nose.png";
base.src = "assets/base.png";
darkLines.src = "assets/lineart-light-dark.png";
darkBase.src = "assets/dark-base.png"; 
lightLines.src = "assets/lineart-light-light.png";
lightBase.src = "assets/light-base.png"; 
eyes.base.src = "assets/eye-base.png";
eyes.dark.src = "assets/eye-dark.png";
eyes.pupil.src = "assets/eye-pupil.png";

console.log("lol hi");
}