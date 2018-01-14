var currentUser = getCurrentUser();
var shelfs= getShlefs(currentUser);
//logout function related with log_out_btn
function log_out_btn() {
    var empty = "yggygygygyggy";
    setCurrentUser(empty);
    alert(empty);
}


//Get shelft from DB Temp now
//returns null at line 322

function checkShelfs(currentUser) {
    var msg = "No Shelfes Created";
    if (!shelfs){
    	document.getElementById("p2").innerHTML = msg;
    	document.getElementById("p2").style.display = "block";
    }
    

}

//DRAW SHELFS

function fillShelfs() {
    if (validateUsername()) {

    	//shelfsUser = getShlefs(currentUser);
        for (var index = 0; index < shelfs.length; index++) { // Draw each shelf
            var shelf = shelfs[index];
            $("#shelfsContainer").append(function (n) {


                $("#containerDiv").remove(); //get all the elemnt to delete it
                // var shelfDiv = "<div class='shelfStyle' id='sh_" + shelf.title + "'><text>' " + shelf.title + "'</text><br><label> Add new book.</label><input id='btnNewBook" + shelf.title + "' type='file' name='New Book'><br><br>" +
                //     "<img class='deletebtn' id='" + shelf.title + "' src='img/close_pic.png' height=30 width=30 style='float: right;'onclick='removeshelf(this)' /></div>";


                var shelfDiv = `<div class='shelfStyle bookshelf--frame' id='sh_` + shelf.title + `' class="form-control">
                    <h1>
                        <span class="badge badge-default" style="background-color: rgb(154, 133, 72);
                        float: left;padding: 6px; border-radius: 0px">`+shelf.title+`</span>
                    </h1>
                    <input id='btnNewBook` +shelf.title + `' type='file' name='New Book' style="position: absolute;color:white;">
                    <i class='fa fa-remove fa-5x deletebtn' id='`+shelf.title+`' style='float: right; color:white;' onclick='removeshelf(this)'></i>
                    <div style="height: 290px;width:5px;display: inline-block;"></div>
                </div>`;
                return shelfDiv;
            });
            //Add listeners
            var dropZone = document.getElementById("sh_" + shelf.title);
            dropZone.addEventListener('dragover', handleDragOver);
            dropZone.addEventListener('drop', handleFileSelect);

            document.getElementById("sh_" + shelf.title).onchange = handleFileSelect;

            shelf.books.forEach(book => { // Fill the shelfs with books 
                // var output = `<div id="bID' + book.title + '" class="card"> <img src="img/book-image.png" alt="Conver" class="bookCard"> <div class="container"> <h4><b>' + book.title + '</b></h4><button id="btnRem' + book.title + '" onclick="removeBook(this);">Remove</button><button id="btnView' + book.title + '" onclick="viewBook(this);">View</button></div></div>`;
                
                var output = `<div id="bID` + book.title + `" class="book-wrapper" style="height: 240px;margin-top: 40px;">
                <i class='fa fa-remove fa-3x deletebtn' style='float: right; color:white;' id="btnRem`    
                + book.title + `" onclick="removeBook(this);"></i>
                <img src="img/book-image.png" alt="`+book.title+`" id="btnView` + book.title + `" style="cursor: pointer;" onclick="viewBook(this);">
                <span class="bookTitleStyle" onclick="document.getElementById('btnView` + book.title +`').click()">` + book.title.split('_').join(' ') + `</span>  
                
                </div>`
                document.getElementById("sh_" + shelf.title).innerHTML += output; //added new book item to the list
            });
        }
    } else {
        window.location = "index.html";
    }
}

//Shows the note creation
/*function addtitle() {
    //if ($("li".length = 0)) { //Only create on shlef at a time
    $("#creationContainer").append(function(n) {
        var note = "<div id='containerDiv' class='addShelfReq'><textarea class='note-title' id='t1' placeholder='title' maxlength='50'></textarea><br>" +
            "<img class='hide' id='img1' src='img/close_pic.png' height=30 width=30 /><img class='hide' id='imgSave1' src='img/Check_mark.png' height=30 width=30 style='float: right;' /></div>";
        return note;

    });

    //}
}*/

function addshelf() {
    var title = document.getElementById('new-shelf-input').value;
    //CHECK NOT EMPTY
    if (title != "") {
        //CHECK THE TITLE IS UNIQUE
        if (createShlef(currentUser, title)) { //CHECK IF USER IS NOT ""
            var d = new Date();
            $("#shelfsContainer").append(function (n) {


                $('.modal-wrapper').toggleClass('open'); //hide the modal
                $('.page-wrapper').toggleClass('blur'); //remove the blur
    			document.getElementById("p2").style.display = "none"; //remove the temp text

                // var shelf = "<div class='shelfStyle' id='sh_" + title + "'><text>' " + title + "'</text><br><label> Add new book.</label><input id='btnNewBook" + title + "' type='file' name='New Book'><br><br>" +
                //     "<img class='deletebtn' id='" + title + "' src='img/close_pic.png' height=30 width=30 style='float: right;'onclick='removeshelf(this)' /></div>";
                
                var shelf = `<div class='shelfStyle bookshelf--frame' id='sh_` + title + `' class="form-control">
                <h1>
                    <span class="badge badge-default" style="background-color: rgb(154, 133, 72);
                    float: left;padding: 6px; border-radius: 0px">`+title+`</span>
                </h1>
                <input id='btnNewBook` +title + `' type='file' name='New Book' style="position: absolute;color:white;">
                <i class='fa fa-remove fa-5x deletebtn' id='`+title+`' style='float: right; color:white;' onclick='removeshelf(this)'></i>
                <div style="height: 290px;width:5px;display: inline-block;"></div>
            </div>`;

                    return shelf;
            });


            var dropZone = document.getElementById("sh_" + title);
            dropZone.addEventListener('dragover', handleDragOver);
            dropZone.addEventListener('drop', handleFileSelect);

            var inputBookBtn = document.getElementById("btnNewBook" + title);
            inputBookBtn.addEventListener('change', handleFileSelect);
        } else {
            dialog("title exist before");
        }
    } else {
        dialog("title cannot be empty");
        }

}

//REMOVE A SHELF
function removeshelf(opj) {
    var btn_id = opj.id;
    var div_id = "sh_" + btn_id;
    //REMOVE FROM DB FIRST
    if (deleteShelf(currentUser, btn_id)) {
        document.getElementById(div_id).remove();
    } else {
        
        dialog("Shelf not removed");
    }
}

// Get the modal


// When the user clicks the button, open the modal 
function dialog(msgBody) {
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    document.getElementById("msg").innerHTML = msgBody;

    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {

        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}



$(document).ready(function () {

    //shelfs = getShlefs(currentUser);
    checkShelfs();
    $('.trigger').click(function () {
        $('.modal-wrapper').toggleClass('open');
        $('.page-wrapper').toggleClass('blur');
        $('#new-shelf-input').val("");
        return false;
    });

    $('.saveShelf').click(addshelf);

    /*$("#show").click(function() {

        addtitle();


        $("#img1").click(function() {

            $("#containerDiv").remove();
        });
        $("#imgSave1").click(function() {
            addshelf();

        });

    });*/
});