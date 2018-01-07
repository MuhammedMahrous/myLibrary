var notes, count = 0;

/*Save the note in json file*/
function saveNotes() {
	var notesArray = [];
	notes.find("li > div").each(function (i, e) {
		var colourClass = $(e).attr("class");
		var bName = $(e).find("textarea.book-name");
		var pNo = $(e).find("textarea.page-no");
		var title = $(e).find("textarea.note-title");
		var content = $(e).find("textarea.note-content");
		var cDate = $(e).find("textarea.creation-date");
		/* #ADDED-MAHROUS */
		/* 
			Instead of directly adding note to local storage, the data API is
			called to add a note to current user notes.

		*/
		setNote({
			id: i,
			bookTitle: bName.val(),
			pageNo: pNo.val(),
			noteTitle: title.val(),
			content: content.val(),
			dateOf: cDate.val(),
			Class: colourClass
		});
		/* #ADDED-MAHROUS */

		/* #COMMENTED-MAHROUS */
		/* notesArray.push({ id: i,
								bookTitle: bName.val(),
								pageNo: pNo.val(), 
								noteTitle: title.val(), 
								content: content.val(), 
								dateOf:cDate.val(), 
								Class: colourClass});
			});


			var jsonStr = JSON.stringify(notesArray);
			localStorage.setItem("notes", jsonStr);*/
		/* #COMMENTED-MAHROUS */
	});

}

function addNoteEvent(noteElement) {
	var div = noteElement.children("div");
	var closeImg = div.find("img");
	div.focus(function () {
		closeImg.removeClass("hide");
	});
	div.children().focus(function () {
		closeImg.removeClass("hide");
	});
	div.hover(function () {
		closeImg.removeClass("hide");
	}, function () {
		closeImg.addClass("hide");
		saveNotes();
	});
	div.children().hover(function () {
		closeImg.removeClass("hide");
	}, function () {
		closeImg.addClass("hide");
	});
}

function addNewNote(i, className, bookTitle, pageNo, noteTitle, content, cDate) {
	if (!className) {
		className = "colour" + Math.ceil(Math.random() * 3);
	}
	notes.append("<li><div id='noteid" + i + className + "'class='" + className + "'>" +
		"<textarea class='book-name' placeholder='Book Name' maxlength='15'/>" +
		"<textarea class='note-title' placeholder='Enter Title:' maxlength='10'/>" +
		"<textarea class='note-content' placeholder='Your content here:'/>" +
		"<textarea class='page-no' placeholder='pageNo' maxlength='3'/>" +
		"<textarea class='creation-date' placeholder='creation date'maxlength='10'/>" +
		"<img class='hide' src='img/Delete_Icon.png' height=30 width=30 />" +
		"</div></li>");

	var newNote = notes.find("li:last");
	newNote.find("img").click(function () {
		newNote.remove();
		saveNotes();
	});

	addNoteEvent(newNote);
	if (bookTitle) {
		newNote.find("textarea.book-name").val(bookTitle);
	}
	if (noteTitle) {
		newNote.find("textarea.note-title").val(noteTitle);
	}
	if (content) {
		j
		newNote.find("textarea.note-content").val(content);
	}
	if (pageNo) {
		newNote.find("textarea.page-no").val(pageNo);
	}
	if (cDate) {
		newNote.find("textarea.creation-date").val(cDate);
	}
	saveNotes();
}

//loading notes from json file	
function loadNotes() {

	/* #COMMENTED-MAHROUS */
	//var storedNotes = localStorage.getItem("notes");

	//if (storedNotes) {
	/* #COMMENTED-MAHROUS */

	// passes the stored json back into an array of note objects
	var notesArray =

		/* #MODIFIED-MAHROUS */
		getNotes();
	/* #MODIFIED-MAHROUS */

	/* #COMMENTED-MAHROUS */
	//JSON.parse(storedNotes);
	/* #COMMENTED-MAHROUS */

	count = notesArray.length;
	var i;
	//this loop to reset notes id after delete one
	for (i = 0; i < count; i++) {
		var storedNote = notesArray[i];
		addNewNote(i, storedNote.Class, storedNote.bookTitle, storedNote.pageNo, storedNote.noteTitle, storedNote.Content, storedNote.dateOf);

	}
	/* #COMMENTED-MAHROUS */
	//}
	/* #COMMENTED-MAHROUS */
}
$(document).ready(function () {
	// get references to the 'notes' list
	notes = $("#notes");
	// load notes from local storage if one's available
	loadNotes();
	// clicking the 'New Note' button adds a new note to the list
	$("#btnNew").click(function () {
		addNewNote();
	});

	/* #COMMENTED-MAHROUS */
	// add a note to the list if there aren't any
	//	if (count === 0) {
	//		$("#btnNew").click();
	//	}
	/* #COMMENTED-MAHROUS */

});