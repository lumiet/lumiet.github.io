function main() {
	
const rules = window.document.styleSheets[0].cssRules;
for(var i = 0; i < rules.length; i++) {
console.log(rules[i].selectorText);
}
}