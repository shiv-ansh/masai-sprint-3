//developer mode
var verbose = 1;

var data = [];
var btn1 = document.getElementById("search");

btn1.addEventListener("click", function () {
    document.body.style.background = "black";
    let movieName = document.getElementById("movieName").value;
    callApi(movieName);
    document.getElementById("movieName").value = "";

});

// function callApi()
function callApi(movieName) {
    console.log(movieName);
    fetch("http://www.omdbapi.com/?s=" + movieName + "&apikey=28dd1798")
        .then(res => res.json())
        .then(res => {
            console.log("Response", res)
            let movies = res.Search;
            let output = "";
            movies.forEach((ele) =>
                (output += `
                  <div class="col-md-4 col-lg-3 my-2">
                    <div class="text-center">
                      <img src="${ele.Poster}" width="300px" height="440px">
                      <h5 class="text-white">${ele.Title}</h5>
                      <a onclick="movieSelected('${ele.imdbID}')" class="btn btn-primary mb-5" href="#">Movie Details</a>
                    </div>
                  </div>
                `
                ));

            document.getElementById("movies").innerHTML = output;
        })
        .catch(error => {
            console.log(error)
        });
}

//selected movie
function movieSelected(id) {
    console.log("Hello World")
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    fetch("http://www.omdbapi.com/?i=" + movieId + "&apikey=28dd1798")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            let movie = res;

            let output = `
            <h2 class="mt-3 mb-3 ">${movie.Title}</h2>
          <div class="row my-5">
            <div class="col-12 col-lg-4">
          
              <img src="${movie.Poster}" class="thumbnail ">
            </div>
            <div class="col-12 col-lg-8 mt-lg-2 mt-sm-5">
          
              <ul class="list-group">
                <li class="list-group-item list-group-item-dark"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item list-group-item-dark"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item list-group-item-dark"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item list-group-item-dark"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item list-group-item-dark"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item list-group-item-dark"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item list-group-item-dark"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div >
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-danger">Go Back To Search</a>
            </div>
          </div>
        `;

            document.getElementById("movie").innerHTML = output;
        })
        .catch((err) => {
            console.log(err);
        });
}

// //function to  create movie page
// function moviePage(data) {

//     location.replace("movie.html")

//     console.log(data);
//     var title = document.getElementById("title");

//     title.innerHTML = data[0]["Title"];



// }



