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
		document.getElementById('eggcount').addEventListener('change', updateValues);
		document.getElementById('minusEgg').addEventListener('click', (e) => {
			document.getElementById('eggcount').value = parseInt(document.getElementById('eggcount').value) - 1;
			updateValues();
		});
		document.getElementById('plusEgg').addEventListener('click', (e) => {
			document.getElementById('eggcount').value = parseInt(document.getElementById('eggcount').value) + 1;
			updateValues();
		});
}
function updateValues() {
	var hypermode = document.getElementById("hypermode").checked;	
	var albIndex = document.getElementById("basealbino").value;
	document.getElementById("lvl").innerHTML = "Albino radar level: " + document.getElementById("basealbino").value;
	var sei = parseInt(document.getElementById("sei").value);	
	var longChain = parseInt(document.getElementById("longchain").value);
	var goldAmulet = document.getElementById("goldamulet").checked;
	var silverAmulet = document.getElementById("silveramulet").checked;
	var shinyCharm = document.getElementById("shinycharm").checked;
	var uberCharm = document.getElementById("ubercharm").checked;
	var z = document.getElementById("z").checked;	
	var typerace = document.getElementById("typerace").checked;
	var potd = document.getElementById("potd").checked;
	var eggcount = document.getElementById("eggcount").value;
	document.getElementById("count").innerHTML = eggcount + " Eggs since last Shiny";
	calculateOdds(hypermode,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,silverAmulet,goldAmulet,eggcount);
}

function calculateOdds(hypermode,albIndex,sei,longChain,shinyCharm,uberCharm,z,typerace,potd,silverAmulet,goldAmulet,eggcount) {
	var txt = document.getElementById("shinyexplanation");
	txt.innerHTML = "";
	var baseOdds = 1000; 
	txt.innerHTML += "<li>Base odds: 1/" + baseOdds + "</li>";
	if(hypermode) {
		baseOdds /= 2;
		txt.innerHTML += "<li>Hypermode (2x bonus) reduces base odds to 1/" + format(baseOdds) + "</li>";
	}
	if(goldAmulet) {
		baseOdds /= 1.5;
		txt.innerHTML += "<li>Gold Amulet (1.5x bonus) reduces base odds to 1/" + format(baseOdds) + "</li>";
	};
	if(shinyCharm) {		
		baseOdds /= 2.5;
		txt.innerHTML += "<li>Shiny Charm (2.5x bonus) reduces base odds to 1/" + format(baseOdds) + "</li>";
	}
	if(potd) {
		baseOdds /= 2;
		txt.innerHTML += "<li>PotD (2x bonus) reduces base odds to 1/" + format(baseOdds) + "</li>";
	}
	var decay = .99;
	if(sei) {
		decay = .99 - sei/25 * 0.01;
		txt.innerHTML += "<li>"+ sei + " Sei Power means decay is " + format(decay) + " (down from 0.99 on non-Sei days). This means your mini-chain Shiny boost increases faster!</li>" 
	}
	txt.innerHTML += "<li>Final base odds: 1/" + Math.ceil(baseOdds) + "</li>";
	var odds = [];
	var freq = [];
	var negate = [];
	var exact = [];
	var avglength = 0;
	for(var i=0; i<500; i++) {
		if(i==0) {
			odds.push(baseOdds);
			freq.push(1/Math.ceil(baseOdds));
			exact.push(1/Math.ceil(baseOdds));
			negate.push(1-(1/Math.ceil(baseOdds)));
		}
		else {
			var x = (odds[i-1]-1) * decay + 1;
			var f = (1/Math.ceil(x));
			odds.push(x);
			freq.push(f);
			exact.push(f*negate.reduce((a,b)=>a*b,1));
			negate.push(1-f);
			avglength+=(i+1)*exact[i];
		}
	}
	odds.push(1); //for 500th egg
	console.log(odds);
	console.log(freq);
	console.log(exact);
	console.log(avglength);
	document.getElementById("shinyaverage").innerHTML = "On average, these boosts will produce a Shiny every " + format(avglength) + " eggs.";
	txt.innerHTML += "If there have been " + eggcount + " egg(s) since your last Shiny, the odds that this egg will be a Shiny are <b>1/" + Math.ceil(odds[eggcount]) + "</b>."; 
	
	
	const albBoost = [6144, 3072, 1536, 768, 480, 270, 180];
	var baseAlbino = albBoost[albIndex-1];
	
	txt = document.getElementById("melanexplanation");
	txt.innerHTML = "";
	txt.innerHTML += "<li>Albino odds at level "+ albIndex + ": 1/" + format(baseAlbino) + "</li>"; 
	if(silverAmulet) {
		baseAlbino /= (4/3);
		txt.innerHTML += "<li>Silver Amulet (1.33x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	if(z) {
		baseAlbino /= 1.5;
		txt.innerHTML += "<li>Z-Crystal (1.5x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	if(typerace) {
		baseAlbino/=1.2;
		txt.innerHTML += "<li>Type Race (1.2x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	var success = 100 //base success threshold of 100
	baseAlbino *= 100 //multiplying by 100 on both reduces rounding issues when generating a random integer later
	
	if(uberCharm) {
		txt.innerHTML += "<li>Übercharm increases success threshold from "+ success + " to " + (success*6) + " for an effective 6x boost to odds.</li>";
		success *= 6;
	}
	if(longChain) {
		txt.innerHTML += "<li>Cobalt Amulet (Long Chain Bonus)  increases success threshold from " + success + " to " + Math.ceil(success*(1+longChain*.01)) + " for an effective "+longChain+"% boost to odds.</li>";
		success *= (1+longChain*.01);
	}
	console.log(success)
	console.log(baseAlbino)
	txt.innerHTML += "Final odds that this Shiny will become a Melanistic: <b>" + Math.ceil(success) + "/" + Math.ceil(baseAlbino) + ", or 1/"+format(Math.ceil(baseAlbino)/Math.ceil(success))+"</b>."
	+ "<br>This means the overall odds that this egg will become a Melanistic is <b>1/" + Math.ceil(Math.ceil(baseAlbino) * Math.ceil(odds[eggcount])/ Math.ceil(success)) + "</b>.";

	var baseAlbino = albBoost[albIndex-1];
	txt = document.getElementById("albinoexplanation");
	txt.innerHTML="";
	txt.innerHTML += "<li>Albino odds at level "+ albIndex + ": 1/" + format(baseAlbino) + "</li>"; 
	if(silverAmulet) {
		baseAlbino /= (4/3);
		txt.innerHTML += "<li>Silver Amulet (1.33x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	if(z) {
		baseAlbino /= 1.5;
		txt.innerHTML += "<li>Z-Crystal (1.5x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	if(typerace) {
		baseAlbino/=1.2;
		txt.innerHTML += "<li>Type Race (1.2x bonus) reduces base odds to 1/" + format(baseAlbino) + "</li>";
	}
	txt.innerHTML += "Final odds that this egg will be an albino: <b>1/" + Math.ceil(baseAlbino) + "</b>.";
}

function format(n) {
	return Number.parseFloat((n).toFixed(3));
}