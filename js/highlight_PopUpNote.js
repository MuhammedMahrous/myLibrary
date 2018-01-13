//getting selected text by setting the "onmouseup" event to document
/*
 this file contains 
 gText() ---> to get selected text 
 popUpNote() --->  to pop up note div 
 saveNote () --->  to save note into localstorage of spacific user and book   
 */

var selectedText = '';
var selectEvent;
var selectedPageNumber = '';


function gText(event) {
    selectedText = (document.all) ? document.selection.createRange().text : document.getSelection();
    if (selectedText != "") {
        selectEvent = event;
        popUpNote(selectedText);

    }

}

//set "onmouseup" event to document
document.onmouseup = gText;
if (!document.all)
    document.captureEvents(Event.MOUSEUP);



//pop up note

function popUpNote(selectedText) {
    console.log("popUpNote");
    var modal = document.getElementById('noteModal');
    var text = document.getElementById('noteText');
    text.value = (selectEvent.ctrlKey) ? (text.value + selectedText) : selectedText;
    //selectedText='';
    if (selectedPageNumber == '') {
        var element = selectEvent.target.parentElement;
        var elementList = [];
        while (element) {
            elementList.unshift(element);
            element = element.parentElement;

            console.log('the node is ----> : ', element);
            if (element.getAttribute("class") == "page") {
                console.log('the page num : ', selectedPageNumber);
                selectedPageNumber = element.getAttribute("data-page-number");
                break;
            }

            // this break to privent an error when loop get to element "html or body"
            if (element.getAttribute("id") == "mainContainer") {
                console.log('the node id  is ////> : mainContainer');
                break;
            }
        }
        console.log('the arr : ', elementList);
        console.log('the page num : ', selectedPageNumber);
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    //that lone pop up note div
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        selectedPageNumber = '';
    };

    // When the user clicks anywhere outside of the modal, close it
    // comminted if needed
    //    window.onclick = function(event) {
    //        if (event.target == modal) {
    //            modal.style.display = "none";
    //            selectedPageNumber='';
    //        }
    //    };


}

function saveNote() {
    selectedText = '';
    var modal = document.getElementById('noteModal');
    // #MAHROUS_COMMENTED
    //var date =  Date.now();
    // #MAHROUS_COMMENTED

    // // #MAHROUS_ADDED
     var mydate = new Date();
     var date = mydate.toISOString();
    // // #MAHROUS_ADDED

    var id = getCurrentUser() + date;
    var finalNoteText = document.getElementById('noteText').value;
    var noteTitle = document.getElementById('noteTitle').value;
    var bookTitle = getCurrentBookTitle();
    noteCreater = getCurrentUser();
    noteObj = {
        "id": id,
        "bookTitle": bookTitle,
        "pageNo": selectedPageNumber,
        "noteTitle": noteTitle,
        "content": finalNoteText,
        "dateOf": date,
        "Class": "colourClass"

    }
    setNote(noteObj, getCurrentUser())
    modal.style.display = "none";
    selectedPageNumber = '';
    document.getElementById('noteTitle').value = '';


}