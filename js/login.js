var window_opened = "";

var users_array = new Array();

// used in check authority function to be passed to data.js to set it to current user
var search_by_user;

//create function as constractor to create objects from it
function users(username, userpassword, useremail, userphone) {
    //this here mean that you create these attributes in this object
    this.username = username;
    this.userpassword = userpassword;
    this.useremail = useremail;
    this.userphone = userphone;
}



//(just as design)this function to show inputs of sign up and hidden the others
function show_reg() {
    window_opened = "reg";
    document.getElementById("login_status").style.display="none";
    document.getElementById("login_status").innerHTML="";

}

//(just as design)this function uses to show the inputs of login and hidden the others
function show_login() {
    window_opened = "login";


}


//action of registration or login
function check_action() {

    var get_users_storage;
    var array_length_in_storage;


    //check if you open registration form do these codes
    if (window_opened == "reg") {
        var notfound_before = true;
        if (localStorage["user_storage"]) {
            var get_users_storage = JSON.parse(localStorage["user_storage"]);
            var array_length_in_storage = get_users_storage.length;
            for (var init_val = 0; init_val < array_length_in_storage; init_val++) {
                if (get_users_storage[init_val].username == document.getElementById("username").value) {
                    notfound_before = false;
                }
            }
        }


        if (notfound_before == true) {
            //variables to save users values
            var username;
            var password;
            var email;
            var phone;
            //get users values from the inputs in html5 page

            username = document.getElementById("username").value;
            password = document.getElementById("userpassword").value;
            email = document.getElementById("useremail").value;
            phone = document.getElementById("userphone").value;

            //to update array if found keys before in local storage 
            if (localStorage.getItem("user_storage")) {
                users_array = localStorage.getItem("user_storage");
                //parse convert from string into object or array 
                users_array = JSON.parse(users_array);
            }
          
            //push new object to the array with its values
            var obj_user = new users(username, password, email, phone);
            users_array.push(obj_user);
            //stringfy convert from 
            localStorage["user_storage"] = JSON.stringify(users_array);
            setCurrentUser(username);

        } else {
            alert("userName Used before");
        }
    }



    //check if you open login form do these codes
    if (window_opened == "login") {

        search_by_user; // made it public to access it in check authority function
        var search_by_pass;
        search_by_user = document.getElementById("username_log").value;
        search_by_pass = document.getElementById("userpassword_log").value;
        //get keys to search if this user already signed up


        if (localStorage["user_storage"]) {
            var get_users_storage = JSON.parse(localStorage["user_storage"]);
            var array_length_in_storage = get_users_storage.length;
            for (var init_val = 0; init_val < array_length_in_storage; init_val++) {
                if (get_users_storage[init_val].username == search_by_user) {
                    if (get_users_storage[init_val].userpassword == search_by_pass) {
                        //user already exist in our system can login ##@@
                        check_authourity("can");
                        break;
                    } else {
                        //user didn't exist in our system can't login  ##@@
                        check_authourity("cannot");
                        
                    }
                } else {
                    //user didn't exist in our system can't login  ##@@
                    check_authourity("notexistuserINstorage");
                    
                }
            }
        } else {
            check_authourity("notexist");
        }

    }
}


//after he try to login ##@@
function check_authourity(can_or_cannot) {
    if (can_or_cannot == "can") {
        //        alert("done");
        setCurrentUser(search_by_user);
        //window.location = "BooksNotes.html";
     	window.location = "shelfs.html";
           
    }
    if (can_or_cannot == "cannot") {
         // alert("wrongpass");
         document.getElementById("login_status").style.display="block";
         document.getElementById("login_status").innerHTML="Invalid Password";
         document.getElementById("login_status").style.color="red";
    }
    if (can_or_cannot == "notexist") {
        // alert("notexist_emptyStorage");
        document.getElementById("login_status").style.display="block";
         document.getElementById("login_status").innerHTML="You Must SignUp First";
         document.getElementById("login_status").style.color="red";
    }

    if (can_or_cannot == "notexistuserINstorage") {
        //alert("notexistuser_INstorage");
        document.getElementById("login_status").style.display="block";
        document.getElementById("login_status").innerHTML="Invalid UserName";
        document.getElementById("login_status").style.color="red";
    }

}




// ###################################********************* validation functions *********########################################################## 
var check_email = false;
var check_phone = false;

function validateuserphone() {
    usermobile = document.getElementById("userphone").value;
    var phoneno = /^01[0125]{1}\d{8}$/;
    var checknum = phoneno.test(usermobile);
    if (checknum == true) {
        check_phone = true;
        document.getElementById("userphone").style.borderColor = "gray";
    } else {
        check_phone = false;
        document.getElementById("userphone").style.borderColor = "red";
    }
}

function validateemail() {
    userema2 = document.getElementById("useremail").value;
    var emailexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var checkemail = emailexp.test(userema2);

    if (checkemail == true) {
        check_email = true;
        document.getElementById("useremail").style.borderColor = "gray";
    } else {
        check_email = false;
        document.getElementById("useremail").style.borderColor = "red";

    }
}

///////////////////////////////////////////////////////////////////////////
function validateemail() {
    userema2 = document.getElementById("useremail").value;

}

function validateemail() {

}