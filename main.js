//developer mode
var verbose = 1;

var data = [];
var btn1 = document.getElementById("search");

btn1.addEventListener("click", function () {
    var movieName = document.getElementById("movieName").value;
    callApi(movieName);


});

// function callApi()
function callApi(movieName) {

    //creating XMLHttpRequest constructor
    var xhr = new XMLHttpRequest();

    // This configures the object to perform a GET request to the given url
    xhr.open('GET', "http://www.omdbapi.com/?t=" + movieName + "&apikey=28dd1798")
    // xhr.open("GET", " http://www.omdbapi.com/?i=tt3896198&apikey=28dd1798");

    //This will send the GET request to  the server
    xhr.send();

    //calling the function after the information  has been retrive
    xhr.onload = function () {

        // checking the request is successful or not
        if (xhr.status === 200) {

            var json = xhr.response
            console.log(json);

            obj = JSON.parse(json);
            console.log(obj);
            data[0] = obj;
        }
        else {
            console.log("Error Code is:" + xhr.status);
        }

    }


    console.log(data);
    moviePage(data);
}



//function to  create movie page
function moviePage(data) {

    location.replace("movie.html")

    console.log(data);
    var title = document.getElementById("title");

    title.innerHTML = data[0]["Title"];



}



