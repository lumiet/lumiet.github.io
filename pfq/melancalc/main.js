function main() {
		updateValues();
		document.getElementById('baseshiny').addEventListener('change', updateValues);
		document.getElementById('basealbino').addEventListener('change', updateValues);
		document.getElementById('sei').addEventListener('change', updateValues);
		document.getElementById('longchain').addEventListener('change', updateValues);
		document.getElementById('shinycharm').addEventListener('input', updateValues);
		document.getElementById('ubercharm').addEventListener('input', updateValues);
		document.getElementById('z').addEventListener('input', updateValues);
		document.getElementById('typerace').addEventListener('input', updateValues);
		document.getElementById('potd').addEventListener('input', updateValues);
		document.getElementById('eggshatched').addEventListener('input', updateValues);
		
		document.getElementById("lvl").innerHTML = document.getElementById("basealbino").value;
		
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

function updateValues() {
	var baseShiny = document.getElementById("baseshiny").value;	
	var albIndex = document.getElementById("basealbino").value;
	document.getElementById("lvl").innerHTML = document.getElementById("basealbino").value;
	var sei = document.getElementById("sei").value;	
	var longChain = document.getElementById("longchain").value;	
	var eggsHatched = document.getElementById("eggshatched").value;	
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;	
	var typerace = document.getElementById("typerace").checked;
	var potd = document.getElementById("potd").checked;
	longChain = 1 + longChain/100;
	calculateOdds(baseShiny,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,eggsHatched);
}

function calculateOdds(baseShiny,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,eggsHatched) {
	/*
	If your Shiny chances are 1/X, and Sei power is S, then first convert Sei power into a modifier P = 50-S 
	and then your Sei-boosted Shiny chances are 1/(sqrt(X/P)*P) - 
	which now that I'm looking at it is really just 1/(sqrt(X) * sqrt(50-S))
	*/
	var baseAlbino = 4608;
	const albBoost = [1,2,4,8,12.8,22.76,34.14];
	console.log("Albino odds at level " + albIndex + " (before Z): 1/" + baseAlbino/albBoost[albIndex-1]);
	baseAlbino /= albBoost[albIndex-1]; //applies boost from alb radar level
	
	
	if(shinyCharm) baseShiny/=2.5; //2.5x shiny odds
	if(potd) baseShiny /= 1.1; //10% shiny boost
	if(sei>0) baseShiny = Math.sqrt(baseShiny) * Math.sqrt(50-sei); //apply sei boost formula. must be calculated in this order
	console.log("Shiny odds after boosts: 1/" + baseShiny); 
	if(z) baseAlbino /=1.5; //1.5x albino odds (+50%)
	if(typerace) baseAlbino /=1.2; //1.2x albino odds (+20)
		
	var result = baseShiny * baseAlbino; //base melan odds
	if(uberCharm) result/=6; //6x melan odds
	if(longChain!=0) result/=longChain;
	console.log("Calculated melan odds: 1/" + result);
	document.getElementById("results").innerHTML = "Calculated odds: 1/" + Number.parseFloat(result.toFixed(3)) + ", or " + Number.parseFloat((1/result*100).toFixed(3)) + "%";
	document.getElementById("hatchedresults").innerHTML = "Odds of hatching at least one Shiny: " + Number.parseFloat(((1-Math.pow((baseShiny-1)/baseShiny,eggsHatched))*100).toFixed(3))+"%";
	document.getElementById("hatchedresults").innerHTML += "<br>Odds of hatching at least one Albino: " + Number.parseFloat(((1-Math.pow((baseAlbino-1)/baseAlbino,eggsHatched))*100).toFixed(3))+"%";
	document.getElementById("hatchedresults").innerHTML += "<br>Odds of hatching at least one Melan: " + Number.parseFloat(((1-Math.pow((result-1)/result,eggsHatched))*100).toFixed(3))+"%";
	
}

