function main() {
		updateValues();
		document.getElementById('baseshiny').addEventListener('change', updateValues);
		document.getElementById('basealbino').addEventListener('change', updateValues);
		document.getElementById('longchain').addEventListener('change', updateValues);
		document.getElementById('shinycharm').addEventListener('input', updateValues);
		document.getElementById('ubercharm').addEventListener('input', updateValues);
		document.getElementById('z').addEventListener('input', updateValues);
}

function updateValues() {
	var baseShiny = document.getElementById("baseshiny").value;	
	var baseAlbino = document.getElementById("basealbino").value;
	var longChain = document.getElementById("longchain").value;	
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;
	longChain = 1 + longChain/100;
	console.log(longChain);
	calculateOdds(baseShiny,baseAlbino,longChain,shinyCharm,uberCharm,z);
}

function calculateOdds(baseShiny,baseAlbino,longChain,shinyCharm,uberCharm,z) {
	var result = baseShiny * baseAlbino;
	if(shinyCharm) result/=2;
	if(uberCharm) result/=8;
	if(z) result /=2;
	if(longChain!=0) result/=longChain;
	console.log(result);
	document.getElementById("results").innerHTML = "Calculated odds: 1/" + Number.parseFloat(result.toFixed(3)) + ", or " + Number.parseFloat((1/result*100).toFixed(3)) + "%";
}