
function toggleTab(newTab, oldTab) {
	
var mainBg = "url('https://i.imgur.com/cH1C6vY.png'),#555";
var maintwoBg = "url('https://i.imgur.com/1E3CCZV.png'),#fff";
var mainthreeBg = "url('https://i.imgur.com/By4e6Hn.png'),#fff";
	
var newElem = document.getElementById(newTab);
newElem.classList.remove("hidden");
var oldElem = document.getElementById(oldTab);
oldElem.classList.add("hidden");

var bgFade = document.getElementById("bgFade");

if(oldTab=="main") {
	bgFade.style.background = mainBg;
	bgFade.classList = '';	
	void bgFade.offsetWidth;
	bgFade.className = "fadeOut";
}
else if(oldTab=="maintwo") {
	bgFade.style.background = maintwoBg;
	bgFade.classList = '';
	void bgFade.offsetWidth;	
	bgFade.className = "fadeOut";
}
else if(oldTab=="mainthree") {
	bgFade.style.background = mainthreeBg;	
	document.getElementById("bgFade").classList = '';	
	void bgFade.offsetWidth;
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
