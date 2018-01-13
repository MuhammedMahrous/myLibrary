    var parameters = location.search.substring(1).split("&"); // get the book and page name from the URL

                var temp = parameters[0].split("=");
                var bookName = "../Books/" + unescape(temp[1]) + ".pdf";
                var bookNamePure = unescape(temp[1]);
                temp = parameters[1].split("=");
                var pageNumber = unescape(temp[1]);

    //bookName = "../Books/formale.pdf"; //Temp value for the book name
    //pageNumber = 1; //Temp value for the page number

    //When loaded content open the book
    document.addEventListener("DOMContentLoaded", function() {
        openBook(bookName, pageNumber);
    });

    //open the book function
    function openBook(bookName, desiredPage) {
        PDFViewerApplication.cleanup(); //clean up old instance 
        PDFViewerApplication.close().then(function() {
            PDFViewerApplication.open(bookName).then(function() { //when book is opened then start
                //var numPages = PDFViewerApplication.pagesCount;
                //console.log("page count" + numPages);

                if ((desiredPage > numPages) || (desiredPage < 1)) {
                    //console.log("Out size ERROR");
                    return;
                }
                //navigate to the desired page
                PDFViewerApplication.initialBookmark = "page=" + desiredPage;
                setCurrentBookTitle(bookNamePure)  //save book to the local storage
                    //console.log("Current book title saved");
                /*} else {
                    //console.log("Error to save the Current book title");
                }*/

                //console.log(PDFViewerApplication);
            });
        });
        //console.log(PDFViewerApplication);
    }