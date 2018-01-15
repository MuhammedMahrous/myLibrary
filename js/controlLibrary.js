
var booksPath = escape("E:/ITI files/Client side/Project/Your shelfs/pdfjs-1.9.426-dist/web");



// Handle the file when droped 
function handleFileSelect(evt) {
    evt.stopPropagation(); // prevent default behaviour
    evt.preventDefault();
    var shelfTitle = evt.target.id;
    var files;
    //check if from button or drag.
    if (evt.dataTransfer == undefined) {

        files = document.getElementById(shelfTitle).files;
        shelfTitle = shelfTitle.replace("btnNewBook", "");

    } else {
        files = evt.dataTransfer.files; // FileList object.sss
        shelfTitle = shelfTitle.replace("sh_","");
    }


    // files is a FileList of File objects. List some properties.
    var output = "";
    for (var i = 0; i < files.length; i++) {
        file = files[i];
        if (!file.type.match('pdf')) { //check the type of the file droped
            var msg="Only PDF files are allowed !";
			dialog(msg);
		   // alert("Only PDF files are allowed !");
            continue;
        }
        var bookAdded = {
            "title": file.name.replace(".pdf", ""),
            "filePath": booksPath, // Path to the pdf file.
            "imgPath": "../img/book-image.png" // Path to the icon image representing the book in the view. Same Folder
        };

        if (setBook(currentUser, shelfTitle.replace("sh_", ""), bookAdded)) { 
            var output = `<div id="bID` + bookAdded.title + `" class="book-wrapper" style="height: 240px;margin-top: 40px;">
            <i class='fa fa-remove fa-3x deletebtn' style='float: right; color:white;' id="btnRem`    
            + bookAdded.title + `" onclick="removeBook(this);"></i>
            <img src="img/book-image.png" alt="`+bookAdded.title+`" id="btnView` + bookAdded.title + `" style="cursor: pointer;" onclick="viewBook(this);">  
            <span class="bookTitleStyle" onclick="document.getElementById('btnView` + bookAdded.title +`').click()">` + bookAdded.title.split('_').join(' ') + `</span>  
            </div>`
            
            //invokeSaveAsDialog(file, file.name); // force download book to the folder of the Project /Books "Make it manually"
        } else {
           	var msg="Book alrady added !";
			dialog(msg);
        }

        
    if (evt.dataTransfer == undefined) {
        document.getElementById("sh_" + shelfTitle).onchange = handleFileSelect;
        document.getElementById("sh_" + shelfTitle).innerHTML += output; //added new book item to the list
    } else {
        document.getElementById("sh_" + shelfTitle).innerHTML += output; //added new book item to the list

    }
}

    
}


//function to view a book opened 
function viewBook(objToView) {
    var viewedBookTitle = escape(objToView.id.replace("btnView", "")); //get book title
    //open the viewer page with page 1 and book title
    window.location = '../web/viewer.html?bookName=' + viewedBookTitle + '&bookPage=1';

}

//function to remove book from view and list
function removeBook(objToBeRemoved) {
    var removedBookTitle = objToBeRemoved.id.replace("btnRem", "");
    var div = objToBeRemoved.parentNode.parentNode; //get Parent div
   
    if (deleteBook(currentUser, div.id.replace("sh_", ""), removedBookTitle)) { //NEED TO CHANGE IT LATER ON
        document.getElementById("bID" + removedBookTitle).remove();
    }

   }

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function dialog ( msg ) {
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
document.getElementById("msg").innerHTML= msg;

 modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
 }}



////////////////////////////////////////////////Function to force downloading the PDF////////////////////////////////////

/**
 * @param {Blob} file - File or Blob object. This parameter is required.
 * @param {string} fileName - Optional file name e.g. "image.png"
 */
function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    var fileExtension = (file.type).split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.download = fileFullName;

    hyperlink.style = 'display:none;opacity:0;color:transparent;';
    (document.body || document.documentElement).appendChild(hyperlink);

    if (typeof hyperlink.click === 'function') {
        hyperlink.click();
    } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }

    (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
}