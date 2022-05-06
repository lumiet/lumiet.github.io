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
}

function tdClick(e) {
	let table = document.getElementById("dpvalues");
	var tds = table.getElementsByTagName("td");
	for(var i=0;i<tds.length;i++) {
		if(tds[i].id!="exp") {
			tds[i].removeAttribute('id');
		}
	}
	console.log(e);
	e.id = "selected";
	updateValues();
}

function updateValues() {
	let vs = document.getElementById('vouchersize').value;
	let vc = document.getElementById('vouchercost').value.replace(/\D/g,'');
	var calculation = vc/vs;
	document.getElementById('calculation').innerHTML = Number.parseFloat(calculation.toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " credits, " + Number.parseFloat((calculation/1000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " GP, or " + Number.parseFloat((calculation/5000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " ZC";
	var currentDP = document.getElementById('selected').innerHTML;
	var cr = currentDP*calculation;
	document.getElementById('specialcost').innerHTML = Number.parseFloat(cr.toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " credits, " + Number.parseFloat((cr/1000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " GP, or " + Number.parseFloat((cr/5000).toFixed(3)).toLocaleString(undefined, {minimumFractionDigits: 0}) + " ZC";
}