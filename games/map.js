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
var dir = Math.floor((Math.random()*10)) % 4;
switch(dir) {
case 0: //move up
if(cTd.y-1<0){ break;}
else { cTd = td[cTd.y-1][cTd.x];} 
break;
case 1: //move right

break;
case 2: // move down

break;
case 3: // move left

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
