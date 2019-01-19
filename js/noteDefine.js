// function Note(formObj) {
// 	this.eventTitle = formObj.eventTitle;
// 	this.eventTime = formObj.eventTime;
// 	this.eventType = formObj.eventType;
// 	this.eventMemo = formObj.eventMemo;
// 	//this.posX = posX;
// 	//this.posY = posY;
// }



//如果formObj是第一类 则把它放入第一类 先将文字拼接起来 放入
function createNewNote(formObj) {
	let parentElement;
	if (formObj.eventType === "im&ur") {
		parentElement = document.getElementById("typeOne")
	}
	else if (formObj.eventType === "im&Nur") {
		parentElement = document.getElementById("typeTwo")
	}
	else if (formObj.eventType === "Nim&ur") {
		parentElement = document.getElementById("typeThree")
	}
	else if (formObj.eventType === "Nim&Nur") {
		parentElement = document.getElementById("typeFour")
	}

	let wholeNote = document.createElement("li");
	let noteTitleEle = document.createElement("h5");
	let noteTitleWords = document.createTextNode(formObj.eventTitle);
	let noteTitle = noteTitleEle.appendChild(noteTitleWords);

	let noteTimeEle = document.createElement("p");
	let noteTimeWords = document.createTextNode(formObj.eventTime);
	let noteTime = noteTimeEle.appendChild(noteTimeWords);

	let noteMemoEle = document.createElement("p");
	let noteMemoWords = document.createTextNode(formObj.eventMemo;
	let noteMemo = noteMemoEle.appendChild(noteMemoWords);

	wholeNote = wholeNote.appendChild(noteTitle).appendChild(noteTime).appendChild(noteMemo)_
	parentElement.appendChild(wholeNote);
}