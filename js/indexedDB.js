document.write("<script type='text/javascript' src='show.js'></script>");


function clickCompleteEvent() {
	if (formValidation() == true) {
		addTurnBack();
		hideColumn();
		status = (status+1)%2;
		let formObj = getFormValue();
		console.log(formObj);
		addToDatabase(formObj);		
	}
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
          createNewNote(formObj);
  				};

  				request.onerror = function (event) {
    			console.log('add error');
  				};
    		};
			

  			
		})();
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
  let noteTitleEle = document.createElement("h4");
  let noteTitleWords = document.createTextNode(formObj.eventTitle);
  let noteTitle = noteTitleEle.appendChild(noteTitleWords);

  let noteTimeEle = document.createElement("p");
  let noteTimeWords = document.createTextNode(formObj.eventTime);
  let noteTime = noteTimeEle.appendChild(noteTimeWords);

  let noteMemoEle = document.createElement("p");
  let noteMemoWords = document.createTextNode(formObj.eventMemo);
  let noteMemo = noteMemoEle.appendChild(noteMemoWords);

  wholeNote.style.cssText = "min-height:100px;width:20%;min-width:100px;padding:5px;float:left;list-style-type:none;margin:8px;background-color:pink;";
  noteTitleEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;text-align:center"
  noteTimeEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;font-size:12px"
  noteMemoEle.style.cssText = "display:block;padding:3px 3px;background-color:rgb(248,248,248);margin:2px;font-size:10px"
  wholeNote.appendChild(noteTitleEle);
  wholeNote.appendChild(noteTimeEle);
  wholeNote.appendChild(noteMemoEle);
  parentElement.appendChild(wholeNote);
}