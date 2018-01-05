/**
 * HEADER DOCUMENTATION --> TO BE DONE LATER
 */


                             /* GLOBAL VARIALBES */

// temporary variable for username, used for filtering purposes
var username;

// temporary variable for book, used for filtering purposes
var booktitle;

// temporary varialbe for note id, used for filtering purposes
var noteID;

                             /* UTILITY FUNCTIONS */

// Utility function used to filter array by usrname
function findByUsername(element) {
    return element.username == username;
}

// Utility function used to filter array by booktitle
function findByBookTitle(element) {
    return element.bookTitle == booktitle;
}

function findByID(element) {
    return element.id == noteID;
}

/* 
    Utility function used to validate username 
    return true if validated and false if not
*/
function validateUsername(userName) {
    var validated;

    // set username variable to current user to be used when findByUsername() is called
    username = userName;

    /* Validate currentUserName*/
    // If current username is not in local storage
    // then an error occured; maybe someone changed the local storage value
    // so check that value
    var users_storage = localStorage.getItem("users_storage");
    var currentUserNameCheck = users_storage.find(findByUsername);
    if (userName == currentUserNameCheck) {
        validated = true;
    } else {
        validated = false;
    }
    return validated;
}

                             /* USER IDENTITY DATA */

/* Returns the username of the currently logged in user */
function getCurrentUser() {
    var currentUserName;

    // get Current user from local sotrage
    var currentUserName = localStorage.getItem("currentUser");
    if (!validateUsername(currentUserName)) {
        setCurrentUser("");
        currentUserName = "";
    }
    return currentUserName;

}


/* 
    Sets the current username to logged in user
    returns true if successfully set and false if not.
*/

function setCurrentUser(userName) {
    // Validation to prevent setting user to any random user
    var validated = validateUsername(userName);
    if (validated)
        localStorage.setItem("currentUser", userName);

    return validated;
}


                             /* NOTES DATA */

/*
    returns from localStorage an array the notes of a user 
 */
function getNotes(userName) {
    var userNotes;

    // validated username and if valid then retrive the notes array, else return an empty array
    if (validateUsername(userName)) {
        var notes = localStorage.getItem("notes");

        // set username variable to current username
        username = userName;

        // retrives the object with username as speicified username
        var notesObj = notes.find(findByUsername);

        userNotes = notesObj.username; // to retrive the array of notes not the obj of username AND array of notes

    } else {
        userNotes = [];
    }
    return userNotes;
}

/* returns from localStorage all the notes of a user for
 a specific book */
function getNotes(bookTitle, userName = getCurrentUser()) {
    var userNotes;
    userNotes = getNotes(userName);

    if (userNotes.length != 0) {
        booktitle = bookTitle;
        // returns an array of notes that has the specified book title
        userNotes = userNotes.filter(findByBookTitle);
    }

    return userNotes;
}

/* 
    sets a note into account of a specific user
    if note exists it will be overwritten
*/
function setNote(note, userName = getCurrentUser()) {
    var userNotes;

    // get notes from storage
    userNotes = getNotes(userName);

    // Check if note id already exists
    noteID = note.id;
    var index = userNotes.findIndex(findByID);
    
    // if note doesn't exist then add it
    if (index == -1) {

        userNotes.push(note);
    } 
    // if note already exists then replace the old version
    else {
        userNotes[index] = note;
    }
    // put notes back into storage
    localStorage.setItem("notes") = userNotes;
}

