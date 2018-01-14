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
        var userName =  getCurrentUser();

        // YOU CAN'T REFORM IT LIKE THIS
        // var tempD = new Date(cDate.val());
        // var tempDISO = tempD.toISOString();
        //  var note_id = userName+tempDISO;
        var note_id = e.id;
        var usrn = getCurrentUser();
        var tempDate = note_id.replace(usrn,"");
        /* #ADDED-MAHROUS */
        /* 
            Instead of directly adding note to local storage, the data API is
            called to add a note to current user notes.

        */
        setNote({
            id:note_id,
            //Index: i,
            bookTitle: bName.val(),
            pageNo: pNo.val(),
            noteTitle: title.val(),
            content: content.val(),
            dateOf: tempDate,
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
    mydate = new Date(cDate);
    creationDate = mydate.toISOString();
    //creationDate = cDate;
    
    userName =  getCurrentUser();
    if (!className) {
        className = "colour" + Math.ceil(Math.random() * 3);
    }
    notes.append("<li><div id='"+userName+creationDate+"'class='" + className + "'>" + 
                "<textarea class='book-name' placeholder='Book Name' maxlength='15' />" + 
                "<textarea class='note-title' placeholder='Enter Title:' maxlength='10' disabled/>" + 
                "<textarea class='note-content' placeholder='Your content here:'/>" + 
                "<textarea class='page-no' placeholder='pageNo' maxlength='3' disabled/>" + 
                "<textarea class='creation-date'disabled>"+mydate+"</textarea>" + 
                "<img class='hide' src='img/Delete_Icon.png' height=20 width=20 />" +   
                "</div></li>");

    var newNote = notes.find("li:last");
    
    addNoteEvent(newNote);
    if (bookTitle) {
        newNote.find("textarea.book-name").val(bookTitle);
        newNote.find("textarea.book-name").click(function(){
        	 window.location = '../web/viewer.html?bookName=' + newNote.find("textarea.book-name").val() + '&bookPage=' 
        	 + newNote.find("textarea.page-no").val();
        })
    }
    if (noteTitle) {
        newNote.find("textarea.note-title").val(noteTitle);
    }
    if (content) {
        newNote.find("textarea.note-content").val(content);
    }
    if (pageNo) {
        newNote.find("textarea.page-no").val( pageNo);
    }
    if (cDate) {
        newNote.find("textarea.creation-date").val(mydate);
    }
    newNote.find("img").click(function () {
        deleteNoteById(newNote.find("div")[0].id); 
        newNote.remove();
        saveNotes();
    });
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
        addNewNote(i, storedNote.Class, storedNote.bookTitle, storedNote.pageNo, storedNote.noteTitle, storedNote.content, storedNote.dateOf);

    }
    /* #COMMENTED-MAHROUS */
    //}
    /* #COMMENTED-MAHROUS */
}
$(document).ready(function () {
    var validated = validateUsername();
    if ( !validated )
    {
        window.location = "index.html";
    }

    // get references to the 'notes' list
    notes = $("#notes");
    // load notes from local storage if one's available
    loadNotes();
});