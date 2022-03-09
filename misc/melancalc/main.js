function main() {
		updateValues();
		document.getElementById('baseshiny').addEventListener('change', updateValues);
		document.getElementById('basealbino').addEventListener('change', updateValues);
		document.getElementById('sei').addEventListener('change', updateValues);
		document.getElementById('longchain').addEventListener('change', updateValues);
		document.getElementById('shinycharm').addEventListener('input', updateValues);
		document.getElementById('ubercharm').addEventListener('input', updateValues);
		document.getElementById('z').addEventListener('input', updateValues);
		document.getElementById('potd').addEventListener('input', updateValues);
}

function updateValues() {
	var baseShiny = document.getElementById("baseshiny").value;	
	var baseAlbino = document.getElementById("basealbino").value;
	var sei = document.getElementById("sei").value;	
	var longChain = document.getElementById("longchain").value;	
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;
	var potd = document.getElementById("potd").checked;
	longChain = 1 + longChain/100;
	calculateOdds(baseShiny,baseAlbino,sei,longChain,shinyCharm,uberCharm,z,potd);
}

function calculateOdds(baseShiny,baseAlbino,sei,longChain,shinyCharm,uberCharm,z,potd) {
	/*
	If your Shiny chances are 1/X, and Sei power is S, then first convert Sei power into a modifier P = 50-S 
	and then your Sei-boosted Shiny chances are 1/(sqrt(X/P)*P) - 
	which now that I'm looking at it is really just 1/(sqrt(X) * sqrt(50-S))
	*/
	
	if(shinyCharm) baseShiny/=2; //2x shiny odds
	if(potd) baseShiny /= 1.1; //10% shiny boost
	if(sei>0) baseShiny = Math.sqrt(baseShiny) * Math.sqrt(50-sei); //apply sei boost formula. must be calculated in this order
	
	var result = baseShiny * baseAlbino; //base melan odds
	if(uberCharm) result/=8; //8x melan odds
	if(z) result /=2; //2x albino odds
	if(longChain!=0) result/=longChain;
	console.log(result);
	document.getElementById("results").innerHTML = "Calculated odds: 1/" + Number.parseFloat(result.toFixed(3)) + ", or " + Number.parseFloat((1/result*100).toFixed(3)) + "%";
}