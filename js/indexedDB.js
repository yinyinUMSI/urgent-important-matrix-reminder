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
    clearForm();
    status = (status+1)%2;
  }
}

let dbId = 1;
let cateArr = [0,0,0,0];

function clickCompleteEvent() {
	if (formValidation() == true) {
		addTurnBack();
		hideColumn();
		status = (status+1)%2;
		let formObj = getFormValue();
		console.log(formObj);
		addToDatabase(formObj);	
    clearForm();	
	}
}

function clearForm() {
  document.getElementById("Form").reset();
}

function formValidation() {
	var elements = document.getElementById("notShow").querySelectorAll("input");
	for (let i=0; i< 2; i++ ) {
		if (elements[i].value == null || elements[i].value == "") {
			alert("The form isn't completed!");
			return false;
		}
	}
	return true;
} 

function addToDatabase(formObj) {
	var db;
	(function() {
     'use strict';
  //check for support
    if (!('indexedDB' in window)) {
    	console.log('This browser doesn\'t support IndexedDB');
    	return;
    }
    })();
    var dbRequest = window.indexedDB.open('db2', 1);
    dbRequest.onerror = function() {
    	console.log('error');
    	return	
    };

    dbRequest.onsuccess = function() {
    	console.log('success');
    	db = dbRequest.result;

    };
    dbRequest.onupgradeneeded = function(event) {
    	db = event.target.result;
  		var objectStore;
  		if (!db.objectStoreNames.contains('Events')) {
    		objectStore = db.createObjectStore('Events', {keyPath: 'eventId', autoIncrement:true});
    		objectStore.createIndex('eventTitle', 'eventTitle', { unique: false });
  			objectStore.createIndex('eventTime', 'eventTime', { unique: false });
  			objectStore.createIndex('eventType', 'eventType', { unique: false });
  			objectStore.createIndex('eventMemo', 'eventMemo', { unique: false });
  		}
	};
	(function() {
			var dbRequest = window.indexedDB.open('db2', 1);
    		dbRequest.onerror = function() {
    			console.log('error');
    			return	
    		};

    		dbRequest.onsuccess = function() {
    			console.log('success');
    			db = dbRequest.result;
    			var request = db.transaction('Events', 'readwrite').objectStore('Events').add(formObj);
    			request.onsuccess = function (event) {
    			console.log('success add');
          /*createNewNote(formObj);*/
          var newNote = new oneNote(formObj,dbId);
          newNote.showNote();
          newNote.deleteAnimation();
          dbId += 1;
  				};

  				request.onerror = function (event) {
    			console.log('add error');
  				};
    		};  			
		})();
}
  
function deleteFromDatabase(keyNo) {
  var db;
  var dbRequest = window.indexedDB.open("db2",1);
  dbRequest.onerror = function(event) {
    console.log("open failure");
    return
  }
  dbRequest.onsuccess = function(event) {
    db = dbRequest.result;
    var transaction = db.transaction("Events","readwrite");
    transaction.onerror = function(event) {
      console.log("transaction failure");
      return
    }
    transaction.oncomplete = function(event) {
      console.log("trans complete");
    }

    var objectStore = transaction.objectStore("Events");
    var obStoreRequest = objectStore.delete(`${keyNo}`);
    obStoreRequest.onsuccess = function(event) {
      console.log("delete success");
    }
  }

} 


function getFormValue() {
	var formTitle = document.getElementById("eventTitle").value;
	var formTime = document.getElementById("eventTime").value;
	var typeElements = document.getElementsByName("type");
	var formTypeChecked = "";
	for (let i=0; i<typeElements.length; i++) {
		if (typeElements[i].checked) {
			formTypeChecked = typeElements[i].value;
			break;
		}
	}
	var formMemo = document.getElementById("memo").value;

	var formObj = {};
	formObj.eventTitle = formTitle;
	formObj.eventTime = formTime;
	formObj.eventType = formTypeChecked;
	formObj.eventMemo = formMemo;

	return formObj; 
}

// function createNewNote(formObj) {
//   let parentElement;
//   if (formObj.eventType === "im&ur") {
//     parentElement = document.getElementById("typeOne")
//   }
//   else if (formObj.eventType === "im&Nur") {
//     parentElement = document.getElementById("typeTwo")
//   }
//   else if (formObj.eventType === "Nim&ur") {
//     parentElement = document.getElementById("typeThree")
//   }
//   else if (formObj.eventType === "Nim&Nur") {
//     parentElement = document.getElementById("typeFour")
//   }

//   let wholeNote = document.createElement("li");
//   let noteTitleEle = document.createElement("h4");
//   let noteTitleWords = document.createTextNode(formObj.eventTitle);
//   let noteTitle = noteTitleEle.appendChild(noteTitleWords);

//   let noteTimeEle = document.createElement("p");
//   let noteTimeWords = document.createTextNode(formObj.eventTime);
//   let noteTime = noteTimeEle.appendChild(noteTimeWords);

//   let noteMemoEle = document.createElement("p");
//   let noteMemoWords = document.createTextNode(formObj.eventMemo);
//   let noteMemo = noteMemoEle.appendChild(noteMemoWords);

//   wholeNote.style.cssText = "min-height:100px;width:20%;min-width:100px;padding:5px;float:left;list-style-type:none;margin:8px;background-color:pink;";
//   noteTitleEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;text-align:center"
//   noteTimeEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;font-size:12px"
//   noteMemoEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;font-size:10px"
//   wholeNote.appendChild(noteTitleEle);
//   wholeNote.appendChild(noteTimeEle);
//   wholeNote.appendChild(noteMemoEle);
//   parentElement.appendChild(wholeNote);
// }

//notes
//attribute: color title time memo type 
//method: set color, get the title, get the time, get the type, get the memo, show a note & set the style
//*important method: delete a note

function oneNote(formObj,idNo) {
  this.eventTitle = formObj.eventTitle;
  this.eventTime = formObj.eventTime;
  this.eventMemo = formObj.eventMemo;
  this.eventType = formObj.eventType;
  this.eventId = idNo;
  this.cateId = cateArr
  this.deleteIcon = function () {
    return document.createElement('li');
  }
}

oneNote.prototype.getColor = function() {
    if (this.eventType === "im&ur") {
      return '#F1996A';
    }
    else if (this.eventType === "im&Nur") {
      return '#BF79DB';
    }
    else if (this.eventType === "Nim&ur") {
      return '#4EACF2';
    }
    else if (this.eventType === "Nim&Nur") {
      return '#5CB83B';
    }
} //this part is subject to change

oneNote.prototype.getCateId = function() {
    if (this.eventType === "im&ur") {
      cateArr[0]++;
      return cateArr[0];
    }
    else if (this.eventType === "im&Nur") {
      cateArr[1]++;
      return cateArr[1];
    }
    else if (this.eventType === "Nim&ur") {
      cateArr[2]++;
      return cateArr[2];
    }
    else if (this.eventType === "Nim&Nur") {
      cateArr[3]++;
      return cateArr[3];
    }
} 

oneNote.prototype.getParent = function() {
    if (this.eventType === "im&ur") {
      return document.getElementById("typeOne");
    }
    else if (this.eventType === "im&Nur") {
      return document.getElementById("typeTwo");
    }
    else if (this.eventType === "Nim&ur") {
      return document.getElementById("typeThree");
    }
    else if (this.eventType === "Nim&Nur") {
      return document.getElementById("typeFour");
    }
} //this part is subject to change

oneNote.prototype.getTitle = function () {
  return this.eventTitle;
}

oneNote.prototype.getTime = function() {
  return this.eventTime;
}

oneNote.prototype.getMemo = function() {
  return this.eventMemo;
}

oneNote.prototype.showNote = function() {

  let parentElement = this.getParent();
  let wholeNote = document.createElement("li");
  let icon = this.deleteIcon();
  icon.setAttribute("class","far fa-check-circle");
  let noteTitleEle = document.createElement("h4");
  let noteTitleWords = document.createTextNode(this.getTitle());
  let noteTitle = noteTitleEle.appendChild(noteTitleWords);

  let noteTimeEle = document.createElement("p");
  let noteTimeWords = document.createTextNode(this.getTime());
  let noteTime = noteTimeEle.appendChild(noteTimeWords);

  let noteMemoEle = document.createElement("p");
  let noteMemoWords = document.createTextNode(this.getMemo());
  let noteMemo = noteMemoEle.appendChild(noteMemoWords);
  wholeNote.appendChild(icon);
  wholeNote.appendChild(noteTitleEle);
  wholeNote.appendChild(noteTimeEle);
  wholeNote.appendChild(noteMemoEle);
  parentElement.appendChild(wholeNote);
  wholeNote.style.cssText = `min-height:100px;width:20%;min-width:100px;border-radius:4px;padding:5px;float:left;list-style-type:none;margin:8px;background-color:${this.getColor()}BF;color:white`;
  icon.style.cssText = `float:right;color:${this.getColor()};`;
  noteTitleEle.style.cssText = "display:block;padding:3px 3px;margin:2px;text-align:center";
  noteTimeEle.style.cssText = "display:block;padding:3px 3px;margin:2px;font-size:12px";
  noteMemoEle.style.cssText = "display:block;padding:3px 3px;margin:2px;font-size:10px";
}

oneNote.prototype.deleteAnimation = function() {
  let This = this;
  $(document).ready(function() {
    $(".fa-check-circle").on("click",function() {
      deleteFromDatabase(This.eventId);
      $(this).parents("li").fadeOut('fast',function() {
        $(this).remove();
      });
    });
    $(".fa-check-circle").on("mouseenter",function() {
    console.log(This.getCateId());
    $(this).css("transform","scale(1.2)");
    });
    $(".fa-check-circle").on("mouseleave",function() {
    console.log("this is mouseleave");
    $(this).css("transform","scale(1)");
    });
  });
 
}
