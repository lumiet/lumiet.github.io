function main() {
		updateValues();
		document.getElementById('baseshiny').addEventListener('change', updateValues);
		document.getElementById('basealbino').addEventListener('change', updateValues);
		document.getElementById('longchain').addEventListener('change', updateValues);
		document.getElementById('shinycharm').addEventListener('input', updateValues);
		document.getElementById('ubercharm').addEventListener('input', updateValues);
		document.getElementById('z').addEventListener('input', updateValues);
		document.getElementById('potd').addEventListener('input', updateValues);
}

function updateValues() {
	var baseShiny = document.getElementById("baseshiny").value;	
	var baseAlbino = document.getElementById("basealbino").value;
	var longChain = document.getElementById("longchain").value;	
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;
	var potd = document.getElementById("potd").checked;
	longChain = 1 + longChain/100;
	calculateOdds(baseShiny,baseAlbino,longChain,shinyCharm,uberCharm,z,potd);
}

function calculateOdds(baseShiny,baseAlbino,longChain,shinyCharm,uberCharm,z,potd) {
	var result = baseShiny * baseAlbino; //base melan odds
	if(shinyCharm) result/=2; //2x shiny odds
	if(uberCharm) result/=8; //8x melan odds
	if(z) result /=2; //2x albino odds
	if(longChain!=0) result/=longChain;
	if(potd) result /= 1.1; //10% shiny boost
	console.log(result);
	document.getElementById("results").innerHTML = "Calculated odds: 1/" + Number.parseFloat(result.toFixed(3)) + ", or " + Number.parseFloat((1/result*100).toFixed(3)) + "%";
}