/*This file contains the agreed formats of data entities in our project. */

/*

                                             *****   IMPORTANT NOTE  *****
            1.each capitalized word means that's the place of the value while the all small cased words means
            that's a name of a variable.
               
*/

/* <-- The Users --> */
users_storage = [{
        "username": "USER_NAME",
        "userpassword": "USER_PASSWORD",
        "usermail": "USER_MAIL",
        "userphone": "USER_PHONE"
    }, {}, {} // multiple users exist.
]

currentUser = "username";




/* <-- The notes --> */
// 1. note object

NOTE = {
    "id": "USERNAME + DATE", // The note id is the concatination of current user name and date of creation of the note.
    "bookTitle":"BOOK_TITLE",
    "pageNo": "PAGE_NUMBER",
    "noteTitle": "NOTE_TITLE",
    "content": "CONTENT",
    "dateOf": "CREATION_DATE",
    "Class": "colourClass"
}

// 2. Notes array

notes = [{
        "username":"USERNAME",
        "userNotes" :        [NOTE_OBJ, NOTE_OBJ, NOTE_OBJ]         
    },{
        "username":"USERNAME",
        "userNotes" :        [NOTE_OBJ, NOTE_OBJ, NOTE_OBJ]         
    }
]



/* <-- The shelfs --> */

// 1. book object

BOOK = {
    "title": "TITLE",
    "filePath": "FILE_PATH", // Path to the pdf file. // ID
    "imgPath": "IMG_PATH" // Path to the icon image representing the book in the view.
}

// 2. Shelf object

SHELF = {
    "title": "SHELF_TITLE", // ID 
    "books": [BOOK_OBJ, BOOK_OBJ, BOOK_OBJ]
}

// 3. Shelf array

shelfs = [
    {
    "username" : "USERNAME",
    "userShelfs" : [SHELF_OBJ, SHELF_OBJ, SHELF_OBJ]
    },
    {
    "username" : "USERNAME",
    "userShelfs" : [SHELF_OBJ, SHELF_OBJ, SHELF_OBJ]
    } 
]
