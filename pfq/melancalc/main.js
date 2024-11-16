function main() {
		updateValues();
		document.getElementById('hypermode').addEventListener('change', updateValues);
		document.getElementById('basealbino').addEventListener('change', updateValues);
		document.getElementById('sei').addEventListener('change', updateValues);
		document.getElementById('longchain').addEventListener('change', updateValues);
		document.getElementById('shinycharm').addEventListener('input', updateValues);
		document.getElementById('ubercharm').addEventListener('input', updateValues);
		document.getElementById('z').addEventListener('input', updateValues);
		document.getElementById('typerace').addEventListener('input', updateValues);
		document.getElementById('goldamulet').addEventListener('input', updateValues);
		document.getElementById('silveramulet').addEventListener('input', updateValues);
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
	var hypermode = document.getElementById("hypermode").checked;	
	var albIndex = document.getElementById("basealbino").value;
	document.getElementById("lvl").innerHTML = document.getElementById("basealbino").value;
	var sei = document.getElementById("sei").value;	
	var longChain = document.getElementById("longchain").value;	
	var eggsHatched = document.getElementById("eggshatched").value;	
	var goldAmulet = document.getElementById("goldamulet").checked;
	var silverAmulet = document.getElementById("silveramulet").checked;
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;	
	var typerace = document.getElementById("typerace").checked;
	var potd = document.getElementById("potd").checked;
	longChain = 1 + longChain/100;
	calculateOdds(hypermode,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,eggsHatched,silverAmulet,goldAmulet);
}

function calculateOdds(hypermode,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,eggsHatched,silverAmulet,goldAmulet) {

	var baseAlbino = 6144;
	const albBoost = [6144, 3072, 1536, 768, 480, 270, 180];
	baseAlbino = albBoost[albIndex-1]; //applies boost from alb radar level
	if(silverAmulet) baseAlbino = Math.ceil(baseAlbino/(4/3));
	
	
	var baseShiny = 400;
	if(hypermode) baseShiny = Math.ceil(baseShiny/2); //hypermode users will have 1/200
	if(shinyCharm) baseShiny = Math.ceil(baseShiny/2.5); //2.5x shiny odds
	if(potd) baseShiny = Math.ceil(baseShiny/1.1); //10% shiny boost
	if(goldAmulet) baseShiny = Math.ceil(baseShiny/1.25); //1.25x shiny odds
	if(sei>0) baseShiny = Math.ceil(Math.sqrt(baseShiny) * Math.sqrt(50-sei)); //apply sei boost formula. must be calculated in this order
	console.log("Shiny odds after boosts: 1/" + baseShiny); 
	if(z) baseAlbino = Math.ceil(baseAlbino/1.5); //1.5x albino odds (+50%)
	if(typerace) baseAlbino =Math.ceil(baseAlbino/1.2); //1.2x albino odds (+20)
	
	var trueAlbino = baseAlbino; //...since melan modifiers technically should be calculated via albino odds

	//note: melan modifiers are technically applied to albino odds, and rounding 
	if(uberCharm) baseAlbino = Math.ceil(baseAlbino/6); //6x melan odds
	if(longChain!=0) baseAlbino=Math.ceil(baseAlbino/longChain);
	var result = baseShiny * baseAlbino; //base melan odds
	console.log("Calculated melan odds: 1/" + result);
	document.getElementById("results").innerHTML = 
	"<b>Shiny odds:</b> 1/" + Number.parseFloat(baseShiny.toFixed(3)) + ", or " + Number.parseFloat((1/baseShiny*100).toFixed(3)) + "%<br>" +
	"<b>Albino odds:</b> 1/" + Number.parseFloat(trueAlbino.toFixed(3)) + ", or " + Number.parseFloat((1/trueAlbino*100).toFixed(3)) + "%<br>" +
	"<b>Melan odds:</b> 1/" + Number.parseFloat(result.toFixed(3)) + ", or " + Number.parseFloat((1/result*100).toFixed(3)) + "%"
	;
	document.getElementById("hatchedresults").innerHTML = "Odds of hatching at least one Shiny: " + Number.parseFloat(((1-Math.pow((baseShiny-1)/baseShiny,eggsHatched))*100).toFixed(3))+"%";
	document.getElementById("hatchedresults").innerHTML += "<br>Odds of hatching at least one Albino: " + Number.parseFloat(((1-Math.pow((trueAlbino-1)/trueAlbino,eggsHatched))*100).toFixed(3))+"%";
	document.getElementById("hatchedresults").innerHTML += "<br>Odds of hatching at least one Melan: " + Number.parseFloat(((1-Math.pow((result-1)/result,eggsHatched))*100).toFixed(3))+"%";
	
}

