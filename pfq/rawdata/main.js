import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

httpRequest();





var dataobj = {
headers: [],
dates: [],
hatched: {
	eggs: [],
	shinies: [],
	albinos: [],
	melans: []
},
boosts: {
	exp: [],
	ip: [],
	scour: [],
	gem: [],
	credit: [],
	shelter: [],
	gp: [],
	shiny: []
}
};

function reqListener() { 
const p = new DOMParser();
const res = this.responseText;
const html = p.parseFromString(res,"text/html");
const data = html.getElementsByTagName("pre")[0].innerHTML;
  console.log(data);
 // document.body.innerHTML = data;
  handleData(data);
}

function httpRequest() {
	const req = new XMLHttpRequest();
	req.addEventListener("load", reqListener);
	req.open("GET", "https://pokefarm.com/shinyhunt/rawdata");
	req.send();	
}
function handleData(data) {
	const dropdown = document.getElementById("graphform");
	dropdown.addEventListener('change', function() {

		const boostoption = dropdown[0].value == "exp" ? dataobj.boosts.exp 
		: dropdown[0].value == "ip" ? dataobj.boosts.ip
		: dropdown[0].value == "scour" ? dataobj.boosts.scour
		: dropdown[0].value == "gem" ? dataobj.boosts.gem
		: dropdown[0].value == "credit" ? dataobj.boosts.credit
		: dropdown[0].value == "shelter" ? dataobj.boosts.shelter
		: dropdown[0].value == "gp" ? dataobj.boosts.gp
		: dropdown[0].value == "shiny" ? dataobj.boosts.shiny
		: null;
		const graphtitle = dropdown[0].value == "exp" ? "Niet/EXP Bonus" 
		: dropdown[0].value == "ip" ? "Garthic/IP Bonus"
		: dropdown[0].value == "scour" ? "Suríya/Scour Bonus"
		: dropdown[0].value == "gem" ? "Ravyne/Gem Bonus"
		: dropdown[0].value == "credit" ? "Novan-chan/Credit Discount"
		: dropdown[0].value == "shelter" ? "Shazi/Shelter Adoption Bonus"
		: dropdown[0].value == "gp" ? "Eltafez/GP Discount"
		: dropdown[0].value == "shiny" ? "Sei/Shiny Bonus"
		: null;
		const timerange = dropdown[1].value;
		console.log(boostoption);
		renderBarGraph(boostoption.filter(n => n!=0), "Multiplier", graphtitle);
	});
	
	console.log(data.split('\n'));
	const lines = data.split('\n');
	dataobj.headers = lines[0].split('\t');
	for(var i=1;i<lines.length;i++) { //for each day
		var currline = lines[i].split('\t');
		//console.log(currline);
		dataobj.dates.push(currline[0]);
		var temp = currline[5].split(',');
		//populate hatched totals for this day
		dataobj.hatched.eggs.push(Number(currline[1]));
		dataobj.hatched.shinies.push(Number(currline[2]));		
		dataobj.hatched.albinos.push(Number(currline[3]));	
		dataobj.hatched.melans.push(Number(currline[4]));
		//populate boost data for this day
		dataobj.boosts.exp.push(temp[0]);
		dataobj.boosts.ip.push(temp[1]);
		dataobj.boosts.scour.push(temp[2]);
		dataobj.boosts.gem.push(temp[3]);
		dataobj.boosts.credit.push(temp[4]);
		dataobj.boosts.shelter.push(temp[5]);
		dataobj.boosts.gp.push(temp[6]);
		dataobj.boosts.shiny.push(temp[7]);
	}
	console.log(dataobj);
	//filtering out days where the bonus = 0
	renderBarGraph(dataobj.boosts.exp.filter(n => n!=0), "Multiplier","Niet/EXP Bonus");
	renderLineGraph(dataobj.hatched,"Date","Eggs Hatched");
}

function renderBarGraph(data, xlabel, title) {
	//https://observablehq.com/@observablehq/plot-bar
	//https://observablehq.com/plot/transforms/group
const myplot = Plot.plot({
	color: {
		legend:true,
	type: "linear",
	range: ["#b5d1ff", "#fc6f8e"],
	interpolate: "hcl"
	},
	//Plot.binX({y:"count"},{x: d=>d, fill: d=>d})
width:960,
height:500,
marks:[
Plot.barY(data, Plot.groupX({y:"count"},{x: d=>d, fill: d=>d})),
Plot.ruleY([0]),
Plot.text([title],{frameAnchor:"top", dy:-20,fontSize:20,fontWeight:600})

],
x: {
	type: "band",
	label: xlabel
},
y: {
	grid: true,
//	label: "Frequency"
}
});
document.getElementById("graphcontainer").innerHTML = "";
document.getElementById("graphcontainer").appendChild(myplot);
}

function renderLineGraph(data, xlabel, title) {
	console.log(data.eggs);
	const boosts = dataobj.boosts;
	
const myplot = Plot.plot({
	width:960,
height:500,
color: {
		legend: true,
	
},
	marks: [
	Plot.ruleY([0]),
	Plot.line(data.eggs, {x: (d,i)=>i, y:d=>d, stroke:"#666666", 
	channels: {"Eggs Hatched":d=>d, "Niet Bonus": (d,i)=>boosts.exp[i], "Shazi Bonus": (d,i)=>boosts.shelter[i], "Sei Bonus": (d,i)=>boosts.shiny[i]}, 
	tip: true}),
	Plot.line(data.shinies, {x: (d,i)=>i, y:d=>d, stroke:"#f59b42", 
	channels: {"Shinies Hatched":d=>d, "Niet Bonus": (d,i)=>boosts.exp[i], "Shazi Bonus": (d,i)=>boosts.shelter[i], "Sei Bonus": (d,i)=>boosts.shiny[i]}, 
	tip: true}),
	Plot.line(data.albinos, {x: (d,i)=>i, y:d=>d, stroke:"#ff6989", 
	channels: {"Albinos Hatched":d=>d, "Niet Bonus": (d,i)=>boosts.exp[i], "Shazi Bonus": (d,i)=>boosts.shelter[i], "Sei Bonus": (d,i)=>boosts.shiny[i]}, 
	tip: true}),
	Plot.line(data.melans, {x: (d,i)=>i, y:d=>d, stroke:"#be69ff", 
	channels: {"Melans Hatched":d=>d, "Niet Bonus": (d,i)=>boosts.exp[i], "Shazi Bonus": (d,i)=>boosts.shelter[i], "Sei Bonus": (d,i)=>boosts.shiny[i]}, 
	tip: true}),
	Plot.crosshair(data.eggs, {x: (d,i)=>i, y:d=>d}),
	Plot.crosshair(data.shinies, {x: (d,i)=>i, y:d=>d})
	],
	x: {
		label: xlabel,
		
	},
	y : {
		type: "log",
		grid: true,
		tickPadding: 0,
		tickSize: 0.1,
		
	}
});
document.getElementById("linegraphcontainer").innerHTML = "";
document.getElementById("linegraphcontainer").appendChild(myplot);
}