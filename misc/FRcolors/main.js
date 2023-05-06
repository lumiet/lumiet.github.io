function main() {
	
const rules = window.document.styleSheets[0].cssRules;
for(var i = 0; i < rules.length; i++) {
var colorName = rules[i].selectorText.split('-')[1];
var colorValue = rules[i].style.background;
var textColor = rules[i].style.color;
const newCanvas = document.body.appendChild(document.createElement("canvas"));
newCanvas.width = 100;
newCanvas.height = 100;
var ctx = newCanvas.getContext("2d");
ctx.fillStyle = colorValue;
ctx.fillRect(0,0,newCanvas.width,newCanvas.height);
ctx.fillStyle = textColor;
ctx.font = "12px serif";
ctx.fillText(colorName, 5, newCanvas.height - 20);
}
}