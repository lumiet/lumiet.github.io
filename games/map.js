var table = document.createElement('table');
var size = 15;
var td = create2DArray(size);
var moves = 500;
var encounter = Math.floor(size/3);
var character = {
name: "Chrom",
x: 0,
y: 0,
hp: 0,
maxhp: 10,
img: new Image()
};
function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function move(moven, cTd){
	
if(moven==0){return;}
var dir = Math.floor((Math.random()*4)) % 4;
cTd.classList.replace("wall","path");
var x = Number(cTd.getAttribute('x')); 
var y = Number(cTd.getAttribute('y'));
	
switch(dir) {

case 0: //move up
if((y-1) <0){ break;}
else { cTd = td[y-1][x];} 
break;

case 1: //move right
if((x+1) >= size){break;} 
else{cTd = td[y][x+1];}			
break;

case 2: // move down
if((y+1) >= size){ break;}
else { cTd = td[y+1][x];} 
break;

case 3: // move left
if((x-1) <0){break;} 
else{cTd = td[y][x-1];}
break;

}
move(moven-1, cTd);
}
function charaMove(x, y) {
	var oldSq = document.getElementsByClassName('char')[0];
	var oldX = Number(oldSq.getAttribute('x'));
	var oldY = Number(oldSq.getAttribute('y'));
	console.log(oldY + " " + oldX);
	console.log((oldX+1==x||oldX==x||oldX-1==x) + " " + (oldY+1==y||oldY==y||oldY-1==y) + " " + !td[x][y].classList.contains('wall'));
	if((oldX+1==x||oldX==x||oldX-1==x)&&(oldY+1==y||oldY==y||oldY-1==y)&&!td[x][y].classList.contains('wall')) {
	oldSq.classList.remove('char');
	td[x][y].classList.add('char');
	}
}
function main() {
console.log("hewwo?");
document.body.appendChild(table);

  for(var i =0;i<size;i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(var j=0;j<size;j++) {
      td[i][j] = document.createElement('td');
	td[i][j].classList.add("wall");
	td[i][j].setAttribute("y", i);
	td[i][j].setAttribute("x", j);
	 td[i][j].setAttribute("onclick", "charaMove(Number(this.getAttribute('y')), Number(this.getAttribute('x')))");
	if(i==size-1&&j==Math.floor(size/2)) {
	td[i][j].id = "start";
	}
      tr.appendChild(td[i][j]);
    }
  }
start = document.getElementById("start");
	character.x = start.x;
	character.y = start.y;
	character.img.url = "https://i.imgur.com/9BxbowV.png";
	start.classList.add('char');
  move(moves,start);
var path = document.getElementsByClassName("path");
for(var i = 0; i<encounter;){
var chosen = path[Math.floor((Math.random()*path.length))];
	 if(!chosen.classList.contains("encounter")){
		chosen.classList.add("encounter");
		i++;
	}
}
//end main
}
