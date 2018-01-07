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
function validateUsername(userName = getCurrentUser()) {
    var validated;

    // set username variable to current user to be used when findByUsername() is called
    username = userName;

    /* Validate currentUserName*/
    // If current username is not in local storage
    // then an error occured; maybe someone changed the local storage value
    // so check that value
    var users_storage = JSON.parse(localStorage.getItem("user_storage"));
    var currentUser = users_storage.find(findByUsername);
    var currentUserNameCheck = currentUser.username;
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
function getNotes(userName = getCurrentUser()) {
    var userNotes;

    // validated username and if valid then retrive the notes array, else return an empty array
    var valid = validateUsername(userName);
    var notes = JSON.parse(localStorage.getItem("notes"));

    if (valid && notes) {

        // set username variable to current username
        username = userName;

        // retrives the object with username as speicified username
        var notesObj = notes.find(findByUsername);        
        userNotes = notesObj.userNotes; // to retrive the array of notes not the obj of username AND array of notes

    } else {
        userNotes = [];
    }
    return userNotes;
}

/* returns from localStorage all the notes of a user for
 a specific book */
function getNotesByBookTitle(bookTitle, userName = getCurrentUser()) {
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

    // create a notes object with the right format { "username" : "CURRENTUSERNAME", "userNotes" : []}
    var notesObj = {};
    notesObj.username = userName;
    notesObj.userNotes = userNotes;

    var allUsersNotes = JSON.parse(localStorage.getItem("notes"));

    // if array of notes doesn't exist yet, then create an empty
    if (allUsersNotes == null)
        allUsersNotes = [];

    // set username variable to current username
    username = userName;

    // find index of this user notes object if it exists
    var currentUserNotesObj = allUsersNotes.findIndex(findByUsername);


    // if notes object doesn't exist then add it
    if (index == -1) {

        allUsersNotes.push(notesObj);
    }
    // if notes object already exists then replace the old version
    else {
        allUsersNotes[currentUserNotesObj] = notesObj;
    }

    localStorage.setItem("notes", JSON.stringify(allUsersNotes));
}

function createShlef(username,title ) {
  

    // create localStorage if it does not exist
    if (!localStorage.getItem('shelfs')) {
        localStorage.setItem('shelfs', JSON.stringify([{"username": username, "userShelfs": []}]));
    }

    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
    
     
    // create data for user for the first 
    if (userShelfIndex == -1) {
        allShelfs.push({"username": username, "userShelfs": []})
        localStorage.setItem('shelfs', JSON.stringify(allShelfs));
        userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
    }
    
    // check if shelf already exists
    if (allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == title).length > 0) {
        return false;
    } else {
        newShlef = {
            "title": title,
            "books": []
        };
        allShelfs[userShelfIndex].userShelfs.push(newShlef);
        
        //update all shelfs data 
        localStorage.setItem('shelfs', JSON.stringify(allShelfs));

        return true;

    }

}

function getShlefs(username) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfs = allShelfs.filter(shelf => shelf.username == username);
        if (userShelfs.length > 0)
            return userShelfs[0].userShelfs
        else
            return false;
    } else
        return false;
}

function getShlef(username,title ) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            var shelf = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == title);
            return shelf[0].books;
        } else
            return false;
    } else
        return false;
}

function setBook(username,shelfTitle, book) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books.push(book);
            localStorage.setItem('shelfs', JSON.stringify(allShelfs));
            return true;
        } else
            return false;
    } else
        return false;
}

function deleteBook (username,shelfTitle, BookPath ) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            var books = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books;
            var index = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books.findIndex(book => book.filePath == BookPath);
            books.splice(index, 1);
            return true;
        } else
            return false;
    } else
        return false;
}


function createShlef(username,title ) {
  

    // create localStorage if it does not exist
    if (!localStorage.getItem('shelfs')) {
        localStorage.setItem('shelfs', JSON.stringify([{"username": username, "userShelfs": []}]));
    }

    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
    
     
    // create data for user for the first 
    if (userShelfIndex == -1) {
        allShelfs.push({"username": username, "userShelfs": []})
        localStorage.setItem('shelfs', JSON.stringify(allShelfs));
        userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
    }
    
    // check if shelf already exists
    if (allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == title).length > 0) {
        return false;
    } else {
        newShlef = {
            "title": title,
            "books": []
        };
        allShelfs[userShelfIndex].userShelfs.push(newShlef);
        
        //update all shelfs data 
        localStorage.setItem('shelfs', JSON.stringify(allShelfs));

        return true;

    }

}

function getShlefs(username) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfs = allShelfs.filter(shelf => shelf.username == username);
        if (userShelfs.length > 0)
            return userShelfs[0].userShelfs
        else
            return false;
    } else
        return false;
}

function getShlef(username,title ) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            var shelf = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == title);
            return shelf[0].books;
        } else
            return false;
    } else
        return false;
}

function setBook(username,shelfTitle, book) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books.push(book);
            localStorage.setItem('shelfs', JSON.stringify(allShelfs));
            return true;
        } else
            return false;
    } else
        return false;
}

function deleteBook (username,shelfTitle, BookPath ) {
    var allShelfs = JSON.parse(localStorage.getItem("shelfs"));
    if (allShelfs.length > 0) {
        var userShelfIndex = allShelfs.findIndex(shelf => shelf.username == username);
        if (userShelfIndex != -1) {
            var books = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books;
            var index = allShelfs[userShelfIndex].userShelfs.filter(shelf => shelf.title == shelfTitle)[0].books.findIndex(book => book.filePath == BookPath);
            books.splice(index, 1);
            return true;
        } else
            return false;
    } else
        return false;
}

