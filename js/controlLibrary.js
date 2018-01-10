//Will get an array of shelfs from DB now is temp one

/*var shelf = {
    "title": "Test Shelf", // id
    "books": []
};*/

//var shelf = JSON.parse(shelfJSON);

var booksPath = escape("E:/ITI files/Client side/Project/Your shelfs/pdfjs-1.9.426-dist/web");

/*
shelfs = 
        [
            "USERNAME" : [ SHELF_OBJ, SHELF_OBJ, SHELF_OBJ ],
            "USERNAME" : [ SHELF_OBJ, SHELF_OBJ, SHELF_OBJ ] // Shelf list per user
        ]
        

SHELF = 
        {
            "title" : "SHELF_TITLE", // id
            "books" : [ BOOK_OBJ, BOOK_OBJ, BOOK_OBJ ]
        }


BOOK = 
        {
            "title" : "TITLE",     
            "filePath" : "FILE_PATH", // Path to the pdf file.
            "imgPath" : "IMG_PATH"    // Path to the icon image representing the book in the view.
        }

        TODO
        -move book location to the folder -- DONE with some minor problems
        -check if name is dublicated in same shelf -- DONE
        -create book obj and add it to shelf books array -- DONE
        -make transition and make a book visible --DONE without animation
        -add multible books within the same shelf -- DONE
        -remove a book from shelf and data -- DONE
        -view a book -- DONE
*/

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

    }


    // files is a FileList of File objects. List some properties.
    var output = "";
    for (var i = 0; i < files.length; i++) {
        file = files[i];
        if (!file.type.match('pdf')) { //check the type of the file droped
            alert("Only PDF files are allowed !");
            continue;
        }
        var bookAdded = {
            "title": file.name.replace(".pdf", ""),
            "filePath": booksPath, // Path to the pdf file.
            "imgPath": "../img/book-image.png" // Path to the icon image representing the book in the view. Same Folder
        };

        if (setBook(currentUser, shelfTitle.replace("sh_", ""), bookAdded)) { // RETURNS AN ERROR
            //shelf.books.push(bookAdded); // add book to books array in the selected shelf if there is old books
            output += '<div id="bID' + bookAdded.title + '" class="card"> <img src="img/book-image.png" alt="Conver" class="bookCard"> <div class="container"> <h4><b>' + bookAdded.title + '</b></h4><button id="btnRem' + bookAdded.title + '" onclick="removeBook(this);">Remove</button><button id="btnView' + bookAdded.title + '" onclick="viewBook(this);">View</button></div></div>';

            //invokeSaveAsDialog(file, file.name); // force download book to the folder of the Project /Books "Make it manually"
        } else {
            alert("Book alrady added !");

        }

        /*if (shelf.books.length > 0) { //check if there is any books in shelf and not a dublicate
            var bookDublicated = false;
            for (var index = 0; index < shelf.books.length; index++) {
                var element = shelf.books[index];
                if (element.title == bookAdded.title) {
                    bookDublicated = true;
                }
            }

            
        } else {
            shelf.books.push(bookAdded); // add book to books array in the selected shelf if it's empty

            output += '<div id="bID' + bookAdded.title + '" class="card"> <img src="book-image.png" alt="Conver" class="bookCard"> <div class="container"> <h4><b>' + bookAdded.title + '</b></h4><button id="btnRem' + bookAdded.title + '" onclick="removeBook(this);">Remove</button> <button id="btnView' + bookAdded.title + '" onclick="viewBook(this);">View</button></div></div>';

            //invokeSaveAsDialog(file, file.name); // force download book to the folder of the Project /Books "Make it manually"
        }*/
    }
    if (evt.dataTransfer == undefined) {
        document.getElementById("sh_" + shelfTitle).onchange = handleFileSelect;
        document.getElementById("sh_" + shelfTitle).innerHTML += output; //added new book item to the list
    } else {
        document.getElementById("sh_" + shelfTitle).innerHTML += output; //added new book item to the list

    }

    //Working on for animation when added elemnt
    /*for (var fadeCounter = 0; fadeCounter < files.length; fadeCounter++) {
        file = files[fadeCounter];
        if (!file.type.match('pdf')) { //check the type of the file droped
            continue;
        }
        var bookDivId = "#bID" + file.name.replace(".pdf", "");
        $(bookDivId).fadeIn(1000);
    }*/
}


//function to view a book opened 
function viewBook(objToView) {
    var viewedBookTitle = escape(objToView.id.replace("btnView", "")); //get book title
    //open the viewer page with page 1 and book title
    window.location = 'pdfjs-1.9.426-dist/web/viewer.html?bookName=' + viewedBookTitle + '&bookPage=1';

}

//function to remove book from view and list
function removeBook(objToBeRemoved) {
    var removedBookTitle = objToBeRemoved.id.replace("btnRem", "");
    if (deleteBook(currentUser, "sh_" + removedBookTitle, removedBookTitle)) { //NEED TO CHANGE IT LATER ON
        document.getElementById("bID" + removedBookTitle).remove();
    }

    /*for (var i = shelf.books.length - 1; i >= 0; i--) {
        var removedBookTitle = objToBeRemoved.id.replace("btnRem", "");

        if (removedBookTitle == shelf.books[i].title) {
            shelf.books.splice(i, 1);
            document.getElementById("bID" + removedBookTitle).remove();
            //TODO SAVE NEW DATA
        }
    }*/
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


// Setup the dnd listeners.
/*var dropZone = document.getElementById("drop_zone");
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleFileSelect);
*/

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