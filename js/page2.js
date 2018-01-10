var currentUser = "getCurrentUser()";

//Get shelft from DB Temp now
var shelfs = getShlefs(currentUser); //returns null at line 322
//DRAW SHELFS
function fillShelfs() {
    for (var index = 0; index < shelfs.length; index++) { // Draw each shelf
        var shelf = shelfs[index];
        $("#shelfsContainer").append(function(n) {


            $("#containerDiv").remove(); //get all the elemnt to delete it
            var shelfDiv = "<div class='shelfStyle' id='sh_" + shelf.title + "'><text>' " + shelf.title + "'</text><br><label> Add new book.</label><input id='btnNewBook" + shelf.title + "' type='file' name='New Book'><br><br>" +
                "<img class='deletebtn' id='" + shelf.title + "' src='img/close_pic.png' height=30 width=30 style='float: right;'onclick='removeshelf(this)' /></div>";
            return shelfDiv;
        });
        //Add listeners
        var dropZone = document.getElementById("sh_" + shelf.title);
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleFileSelect);

        document.getElementById("sh_" + shelf.title).onchange = handleFileSelect;

        shelf.books.forEach(book => { // Fill the shelfs with books 
            var output = '<div id="bID' + book.title + '" class="card"> <img src="img/book-image.png" alt="Conver" class="bookCard"> <div class="container"> <h4><b>' + shelf.title + '</b></h4><button id="btnRem' + shelf.title + '" onclick="removeBook(this);">Remove</button><button id="btnView' + shelf.title + '" onclick="viewBook(this);">View</button></div></div>';
            document.getElementById("sh_" + shelf.title).innerHTML += output; //added new book item to the list
        });
    }
}

//Shows the note creation
function addtitle() {
    //if ($("li".length = 0)) { //Only create on shlef at a time
    $("#creationContainer").append(function(n) {
        var note = "<div id='containerDiv' class='addShelfReq'><textarea class='note-title' id='t1' placeholder='title' maxlength='50'></textarea><br>" +
            "<img class='hide' id='img1' src='img/close_pic.png' height=30 width=30 /><img class='hide' id='imgSave1' src='img/Check_mark.png' height=30 width=30 style='float: right;' /></div>";
        return note;

    });

    //}
}

function addshelf() {
    var title = document.getElementById('t1').value;
    //CHECK NOT EMPTY
    if (title != "") {
        //CHECK THE TITLE IS UNIQUE
        if (createShlef(currentUser, title)) { //CHECK IF USER IS NOT ""
            var d = new Date();
            $("#shelfsContainer").append(function(n) {


                $("#containerDiv").remove(); //get all the li elemnts to delete it
                var shelf = "<div class='shelfStyle' id='sh_" + title + "'><text>' " + title + "'</text><br><label> Add new book.</label><input id='btnNewBook" + title + "' type='file' name='New Book'><br><br>" +
                    "<img class='deletebtn' id='" + title + "' src='img/close_pic.png' height=30 width=30 style='float: right;'onclick='removeshelf(this)' /></div>";
                return shelf;
            });


            var dropZone = document.getElementById("sh_" + title);
            dropZone.addEventListener('dragover', handleDragOver);
            dropZone.addEventListener('drop', handleFileSelect);

            var inputBookBtn = document.getElementById("btnNewBook" + title);
            inputBookBtn.addEventListener('change', handleFileSelect);
        } else {
            alert("title exist before");
        }
    } else {
        alert("title cannot be empty");
    }

}

//REMOVE A SHELF
function removeshelf(opj) {
    var btn_id = opj.id;
    var div_id = "sh_" + btn_id;
    //REMOVE FROM DB FIRST
    document.getElementById(div_id).remove();
}



$(document).ready(function() {


    $("#show").click(function() {

        addtitle();


        $("#img1").click(function() {

            $("#containerDiv").remove();
        });
        $("#imgSave1").click(function() {
            addshelf();

        });

    });
});