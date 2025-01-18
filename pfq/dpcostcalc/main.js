function main() {
	let vs = document.getElementById('vouchersize');
	let vc = document.getElementById('vouchercost');

	vs.addEventListener('input', updateValues);	
	vc.addEventListener('change', updateValues);
		
	let table = document.getElementById("dpvalues");
	var tds = table.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++) {
		if(i==1) {
			tds[i].id="selected";
		}
		if(tds[i].id!="exp") {
			tds[i].onclick = function() { tdClick(this); };
		}
	}
	updateValues();
	
	var styleToAppend = `
		body {
		background: url('assets/bg` + Math.floor(Math.random()*28 + 1) + `.jpg'), rgba(0,0,0,.5);
		background-blend-mode: multiply;
		background-attachment: fixed;
		}`;
		var newstyle = document.createElement("style");
		newstyle.innerHTML = styleToAppend;
		document.head.appendChild(newstyle);
}

function tdClick(e) {
	let table = document.getElementById("dpvalues");
	var tds = table.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++) {
		if(tds[i].id!="exp") {
			tds[i].removeAttribute('id');
		}
	}
	//console.log(e); //debug
	//console.log(e.getAttribute("data-label")); //debug
	e.id = "selected";
	updateValues(e.getAttribute("data-label"));
}

function updateValues(x) {
	let vs = document.getElementById('vouchersize').value;
	let vc = document.getElementById('vouchercost').value.replace(/\D/g,'');
	var calculation = vc/vs;
	if(x!="[object Event]") document.getElementById('label').innerHTML = x; //don't change the label if just the dp price is changing
	if(typeof x =="undefined") document.getElementById('label').innerHTML = "1,280 Egg EXP Delta"; //default
	document.getElementById('calculation').innerHTML = Number.parseFloat(calculation.toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " credits, " + Number.parseFloat((calculation/1000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " GP, or " + Number.parseFloat((calculation/5000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " ZC";
	var currentDP = document.getElementById('selected').innerHTML;
	var cr = currentDP*calculation;
	document.getElementById('specialcost').innerHTML = Number.parseFloat(cr.toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " credits, " + Number.parseFloat((cr/1000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " GP, or " + Number.parseFloat((cr/5000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " ZC";
}