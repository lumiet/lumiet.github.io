function toggle(e) { 
/*toggles page content based on nav bar click*/
	let x = document.getElementById(e);
	let y = document.querySelectorAll(`[data="`+e+`"]`)[0];
	let z = document.getElementsByClassName("active");
	let n = document.getElementsByClassName("activeLink");
	for(var i=0;i<z.length;i++) {
	z[i].classList.add("inactive");
	z[i].classList.remove("active");
	}
	for(var i=0;i<n.length;i++) {
	n[i].classList.add("inactiveLink");
	n[i].classList.remove("activeLink");
	}
	x.classList.add("active");
	x.classList.remove("inactive");
	y.classList.add("activeLink");
	y.classList.remove("inactiveLink");
}