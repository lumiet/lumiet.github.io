var table = document.createElement('table');
var size = 12;
var td = create2DArray(size);
var moves = 50;

function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function move(move, cTd){
	
if(move==0){return;}
	var dir = Math.floor((Math.random()*10)) % 4;
cTd.classList.replace("wall","path");
	var x = cTd.getAttribute(x); 
	var y = cTd.getAttribute(y);
	
	
	switch(dir) {
case 0: //move up
if(y-1<0){ break;}
else { cTd = td[y-1][x];} 
break;
case 1: //move right
if(x+1>=size){break;} 
			else{cTd=td[y][x+1];}
			
break;
case 2: // move down
if(y+1>=size){ break;}
else { cTd = td[y+1][x];} 
break;
case 3: // move left
if(x-1<0){break;} 
			else{cTd=td[y][x-1];}
break;
}
move(move-1, cTd);
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
	if(i==size-1&&j==Math.floor(size/2)) {
	td[i][j].id = "start";
	}
      tr.appendChild(td[i][j]);
    }
  }
start = document.getElementById("start");
  move(50,start);
  //end main
}
