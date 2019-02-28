var table = document.createElement('table');
var size = 8;
var li = create2DArray(size);

function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function move(moves){

}

function main() {
console.log("hewwo?");
document.appendChild(table);

  for(var i =0;i<size;i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(var j=0;j<size;j++) {
      li[i][j] = document.createElement('li');
      tr.appendChild(li[i][j]);
    }
  }
  
  //end main
}
