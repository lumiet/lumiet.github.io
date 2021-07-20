
function toggleTab(newTab, oldTab) {
	
var mainBg = "url('https://i.imgur.com/cH1C6vY.png'),#555";
var maintwoBg = "url('https://i.imgur.com/iWaiOFQ.png'),#555";
var mainthreeBg = "url('https://i.imgur.com/a0Jms1M.png'),#555";
	
var newElem = document.getElementById(newTab);
newElem.classList.remove("hidden");
var oldElem = document.getElementById(oldTab);
oldElem.classList.add("hidden");

var bgFade = document.getElementById("bgFade");

if(oldTab=="main") {
	bgFade.style.background = mainBg;
	bgFade.classList = '';	
	void bgFade.offsetWidth;
	console.log(bgFade.classList);
	bgFade.className = "fadeOut";
}
else if(oldTab=="maintwo") {
	bgFade.style.background = maintwoBg;
	bgFade.classList = '';
	void bgFade.offsetWidth;	
	console.log(bgFade.classList);
	bgFade.className = "fadeOut";
}
else if(oldTab=="mainthree") {
	bgFade.style.background = mainthreeBg;	
	document.getElementById("bgFade").classList = '';	
	void bgFade.offsetWidth;
	console.log(bgFade.classList);
	bgFade.className = "fadeOut";
}


if(newTab=="main") {
	document.body.style.background = mainBg;
}
else if(newTab=="maintwo") {
	document.body.style.background = maintwoBg;
}
else if(newTab=="mainthree") {
	document.body.style.background = mainthreeBg;	
}
}
