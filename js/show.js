
"use strict";

let status = 0;

function addButtonAnimation() {
	if (status == 0) {
		addTurn();
		showColumn();
		status = (status+1)%2;
	}
	else {
		makeSureDelete();	
	}
}

function hideColumn() {
	document.getElementById("notShow").style.display="none";
}

function addTurnBack() {
	var elem = document.getElementById("addButton");
	var ang = -46;
	var id = setInterval(frame,3);
	function frame() {
		if (ang == 0) {
			clearInterval(id);
		}
		else {
			ang = ang+2;
			elem.style.transform = "rotate("+ ang +"deg)";
		}
	}
}


function showColumn() {
	document.getElementById("notShow").style.display="block";
}
function addTurn() {
	var elem = document.getElementById("addButton");
	var ang = 0;
	var id = setInterval(frame,3);
	function frame() {
		if (ang == -46) {
			clearInterval(id);
		}
		else {
			ang = ang-2;
			elem.style.transform = "rotate("+ ang +"deg)";
		}
	}
}

function makeSureDelete() {
	if (confirm("All your input will not be saved")) {
		addTurnBack();
		hideColumn();
		status = (status+1)%2;
	}
}