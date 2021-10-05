function toggle() {
	var tab = document.getElementById("info");
	if(tab.classList.contains("hide")) {
		tab.classList.remove("hide");
	}
	else {
		tab.classList.add("hide");
	}
	
}