const boardwidth = 15;
const bombcount = 50;
const board = document.getElementById('board');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}




function setUp() {
	for(var i=0; i<bombcount;) {
		targetCell = board.rows[getRndInteger(0,boardwidth)].cells[getRndInteger(0,boardwidth)];
		if (targetCell.id != "bomb") {
			targetCell.id = "bomb";
			i++;
		}
	}

	for(var i=0; i<boardwidth;i++) {
		for(var j=0; j<boardwidth; j++) {
			board.rows[i].cells[j].addEventListener('click', function() {
				checkClick(this, true, 0,0);
			});
			board.rows[i].cells[j].addEventListener('contextmenu', function() {
				checkClick(this, false, 0, 0);
			});
			if(targetCell.id !="bomb") checkCount(board.rows[i].cells[j], i, j);
			else targetCell.innerHTML = '<img src="https://canvas.allenisd.org/images/thumbnails/42505944/C7xI0ihDEp4j7J24duYtqDkOWlns1s4BS5B1nQqA" \>'
		}
	}

}


function checkClick(element, click, i, j) {
	if(click && element.className!="flagged") {
		element.className += "clicked";
		/*if(element.innerHTML == '<div id="numb">0</div>') {
			if(i-1>=0) {
				if(j-1>=0) {
					if(board.rows[i-1].cells[j-1].innerHTML == '<div id="numb">0</div>' && board.rows[i-1].cells[j-1].className != "clicked") {
						checkClick(board.rows[i-1].cells[j-1],true, i-1, j-1);
					}		
				}				
				if (board.rows[i-1].cells[j].innerHTML == '<div id="numb">0</div>' && board.rows[i-1].cells[j].className != "clicked") {
					checkClick(board.rows[i-1].cells[j],true, i-1, j);
				}			
				if(j+1<boardwidth) {
					if (board.rows[i-1].cells[j+1].innerHTML == '<div id="numb">0</div>' && board.rows[i-1].cells[j+1].className != "clicked") {
 						checkClick(board.rows[i-1].cells[j+1],true, i-1, j+1);
					}
				}
			}
			if(j-1>=0) {
				if(board.rows[i].cells[j-1].innerHTML == '<div id="numb">0</div>' && board.rows[i].cells[j-1].className != "clicked") {
					checkClick(board.rows[i].cells[j-1],true, i, j-1);
				}
			}
			if(j+1<boardwidth) {
				if(board.rows[i].cells[j+1].innerHTML == '<div id="numb">0</div>' && board.rows[i].cells[j+1].className != "clicked") {
					checkClick(board.rows[i].cells[j+1],true, i, j+1);
				}
			}
			if(i+1<boardwidth) {
				if(j-1>=0) {
					if(board.rows[i+1].cells[j-1].innerHTML == '<div id="numb">0</div>' && board.rows[i+1].cells[j-1].className != "clicked") {
						checkClick(board.rows[i].cells[j+1],true, i+1, j-1);
					}
				}
			
				if(board.rows[i+1].cells[j].innerHTML == '<div id="numb">0</div>' && board.rows[i+1].cells[j].className != "clicked") {		
					checkClick(board.rows[i+1].cells[j],true, i+1, j);
				}
			
				if(j+1<boardwidth) {
					if(board.rows[i+1].cells[j+1].innerHTML == '<div id="numb">0</div>' && board.rows[i+1].cells[j+1].className != "clicked") {
						checkClick(board.rows[i+1].cells[j+1],true, i+1, j+1);
					}
				}
			}
		}*/
	}
	else if(element.className != "clicked" && element.className == "flagged") {
		element.className = "";	
	}
	else if (element.className !="clicked") element.className = "flagged";
}

function checkCount(cell, i, j) {
	var count=0;
	if(i-1>=0) {
		if(j-1>=0) {
			if(board.rows[i-1].cells[j-1].id == "bomb") count++;
		}
	}
	if(i-1>=0) {
		if (board.rows[i-1].cells[j].id == "bomb") count++;
	}
	if(i-1>=0) {
		if(j+1<boardwidth) {
			if (board.rows[i-1].cells[j+1].id == "bomb") count++;
		}
	}
	if(j-1>=0) {
		if(board.rows[i].cells[j-1].id == "bomb") count++;
	}
	if(j+1<boardwidth) {
		if(board.rows[i].cells[j+1].id == "bomb") count++;
	}
	if(i+1<boardwidth) {
		if(j-1>=0) {
			if(board.rows[i+1].cells[j-1].id == "bomb") count++;
		}
	}
	if(i+1<boardwidth) {
		if(board.rows[i+1].cells[j].id == "bomb") count++;
	}
	if(i+1<boardwidth) {
		if(j+1<boardwidth) if(board.rows[i+1].cells[j+1].id == "bomb") count++;
	}
	cell.innerHTML = '<div id="numb">' + count + '</div>';
}
