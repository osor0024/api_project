let nataliasCode = (function () {

    document.addEventListener("DOMContentLoaded", init);

    /*globals*/
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector(".overlay");
    let baseUrl = "https://api.themoviedb.org/3/";
    let imgUrl = null;
    let imgSize = [];

    let mode = "movie";
    mode = localStorage.getItem("preference");

    let backButtonL = document.querySelectorAll("#backButton");

    let timeKey = "timeKey";

    let staleDataTimeOut = 3600;
    let prButton = document.querySelectorAll("#preferenceButton");
    let srButton = document.querySelectorAll("#searchButtonDiv");
    let srInput =document.querySelectorAll("#search-input");
    
    function init() {

        addEventsL();
//        console.log(trY);
    }

    function addEventsL() {
        MakeSureMode();
        h1change();
        getLocalStorageData();

        backButtonL[0].addEventListener("click", function (ev) {
            console.log(ev)
            if (currentPage.length == 1) {
                currentPage(0);
                let searchInput = document.getElementById("search-input");
                searchInput.value = "";
            }
        });
        backButtonL[1].addEventListener("click", function () {
            if (currentPage.length == 1) {
                currentPage(1);
                let searchInput = document.getElementById("search-input");
                searchInput.value = "";
            }
        });
        //    document.querySelector("#backButton2").addEventListener("click", function () {
        //        window.history.back();
        //    });
        //    document.querySelector("#backButton3").addEventListener("click", function () {
        //        window.history.back();
        //    });
        document.getElementById("saveButton").addEventListener("click", function () {
            window.location.reload();
        });
        prButton[0].addEventListener("click", showModal);
        prButton[1].addEventListener("click", showModal);
        prButton[2].addEventListener("click", showModal);
        document.getElementById("cancelButton").addEventListener("click", removeModal);
        document.getElementById("saveButton").addEventListener("click", function () {
            let preferOptions = document.getElementsByName("preferences");
            let choosen = null;
            for (let i = 0; i < preferOptions.length; i++) {
                if (preferOptions[i].checked) {
                    choosen = preferOptions[i].value;
                    break;
                }
            }
            alert(choosen);
            localStorage.setItem("preference", choosen);
            console.log("You picked " + choosen)
            modal.classList.remove("on");
            modal.classList.add("off");

        });
        prButton[0].addEventListener("click", showOverlay);
        document.getElementById("cancelButton").addEventListener("click", removeOverlay);
        prButton[1].addEventListener("click", showOverlay);
        document.getElementById("cancelButton").addEventListener("click", removeOverlay);
        prButton[2].addEventListener("click", showOverlay);
        document.getElementById("cancelButton").addEventListener("click", removeOverlay);
        document.getElementById("saveButton").addEventListener("click", removeOverlay);

       srButton[0].addEventListener("click", serverData);
         srButton[1].addEventListener("click", serverData);
         srButton[2].addEventListener("click", serverData);
        

        srInput[0].addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                console.log("i did it!");
                document.getElementById("searchButtonDiv").click();
            }

        });
          srInput[1].addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                console.log("i did it!");
                document.getElementById("searchButtonDiv").click();
            }

        });
          srInput[2].addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                console.log("i did it!");
                document.getElementById("searchButtonDiv").click();
            }

        });

       srButton[0].addEventListener("click", function () {
            let searchInput = document.getElementById("search-input");
            event.preventDefault();

            if (searchInput.value.length == 0) {
                alert("Please enter the movie's name");
                searchInput.focus();

                return;

            } else {

                currentPage(1);

            }
            startSearch();

        });
         srButton[1].addEventListener("click", function () {
            let searchInput = document.getElementById("search-input");
            event.preventDefault();

            if (searchInput.value.length == 0) {
                alert("Please enter the movie's name");
                searchInput.focus();

                return;

            } 
            startSearch();

        });
         srButton[2].addEventListener("click", function () {
            let searchInput = document.getElementById("search-input");
            event.preventDefault();

            if (searchInput.value.length == 0) {
                alert("Please enter the movie's name");
                searchInput.focus();

                return;

            } else {

                currentPage(1);

            }
            startSearch();

        });

        //    document.querySelectorAll(".content>div").addEventListener("click", function () {
        //        currentPage(2)
        //    });
        // 




        //    document.querySelectorAll(".go-home").addEventListener("click", currentPage(0));




    }

    function currentPage(page) {
        let pageList = [];
        pageList = document.querySelectorAll(".page");

        for (let i = 0; i < pageList.length; i++) {
            if (page == i) {
                pageList[i].classList.add("active");
            } else {
                pageList[i].classList.remove("active");
            }
            console.log("hola pagina");
        }


    }

    function showModal() {
        if (currentPage.length === !0) {
            modal.classList.remove("scdoff");
            modal.classList.add("scdon");
            console.log("si sirvo");
        } else {
            console.log("si sirvo 2");
            modal.classList.remove("scdoff");
            modal.classList.remove("off");
            modal.classList.add("on");

        }
    }

    function removeModal() {
        if (currentPage.length == 0) {
            modal.classList.add("scdoff");
            modal.classList.remove("scdon");
        } else {

            modal.classList.remove("on");
            modal.classList.add("off");
        }
    }

    function h1change() {
        let h1 = document.getElementById("changeh1");
        if (mode == "tv") {
            h1.innerHTML = "";
            h1.innerHTML = "Tv shows";

        }
    }

    function MakeSureMode() {
        if (mode == null) {
            mode = "movie";
        }
    }

    function showOverlay() {

        overlay.classList.remove("hide");
        overlay.classList.add("show");
    }

    function removeOverlay() {

        overlay.classList.remove("show");
        overlay.classList.add("hide");
    }


    function serverData() {

        let url = "".concat(baseUrl, "configuration?api_key=", apikey);

        fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                imgUrl = data.images.secure_base_url;
                imgSize = data.images.poster_sizes;
                //                configData = data.images;
                console.log("config:", data);
                console.log("config fetched");
                localStorage.setItem("config", JSON.stringify(data));

            })
            .catch(function (err) {
                alert(err);
            });

        runSearch();
    }

    function startSearch() {
        console.log("start search");
        searchString = document.getElementById("search-input").value;
        if (!searchString) {
            alert("Please enter search data");
            return;
        }

        runSearch(searchString);
        document.getElementById("search-input").innerHTML = "";

    }

    function runSearch() {
        let url = "".concat(baseUrl, "search/", mode, "?", "api_key=", apikey, "&query=", searchString);
        //`${baseUrl}search/${mode}?api_key=${apikey}&query=${searchString}`;
        fetch(url)
            .then(result => result.json())
            .then((data) => {

                createPage(data);
            })

            .catch(error => console.log(error));

    }


    function createPage(data) {
        let content = document.querySelector("#search-results>.content");
        let title = document.querySelector("#search-results>.title");
        let message = document.createElement("h2");
        content.innerHTML = "";
        title.innerHTML = "";

        if (data.total_results == 0) {
            message.innerHTML = `No results found for ${searchString}`;

        } else {
            message.innerHTML = `Results for "${searchString}"`;
        }
        title.appendChild(message);

        let documentFragment = new DocumentFragment();
        documentFragment.appendChild(createMovieCards(data.results));
        content.appendChild(documentFragment);

        let cardList = document.querySelectorAll(".content>div");

        cardList.forEach(function (item) {
            item.addEventListener("click", getRecommendations);
            item.addEventListener("click", function () {
                currentPage(2);
            })
        });
        document.querySelectorAll(".content>div").addEventListener("click", heyhey)
    }

    function heyhey() {
        currentPage(2)
    }

    function createPageRecommd(data) {
        let content = document.querySelector("#recommend-results>.content");
        let title = document.querySelector("#recommend-results>.title");
        let message = document.createElement("h2");
        content.innerHTML = "";
        title.innerHTML = "";

        if (data.total_results == 0) {
            message.innerHTML = `No results found for "${searchString}"`;

        } else {
            message.innerHTML = `Recommend content for "${searchString}"`;
        }
        title.appendChild(message);

        let documentFragment = new DocumentFragment();
        documentFragment.appendChild(createMovieCards(data.results));
        content.appendChild(documentFragment);
        heyhey()
    };


    function createMovieCards(results) {
        let documentFragment = new DocumentFragment();

        results.forEach(function (movie) {
            let movieCard = document.createElement("div");
            let section = document.createElement("section");
            let image = document.createElement("img");
            let videoTitle = document.createElement("p");
            let videoDate = document.createElement("p");
            let videoRating = document.createElement("p");
            let videoOverview = document.createElement("p");


            videoTitle.textContent = movie.title;
            videoDate.textContent = movie.release_date;
            videoRating.textContent = movie.vote_average;
            videoOverview.textContent = movie.overview;

            image.src = `${imgUrl}${imgSize[2]}${movie.poster_path}`;

            movieCard.setAttribute("data-title", movie.title);
            movieCard.setAttribute("data-id", movie.id);

            movieCard.className = "movieCard";
            section.className = "imageSection";

            section.appendChild(image);
            movieCard.appendChild(section);
            movieCard.appendChild(videoTitle);
            movieCard.appendChild(videoDate);
            movieCard.appendChild(videoRating);
            movieCard.appendChild(videoOverview);

            documentFragment.appendChild(movieCard);


        });

        return documentFragment;
    }

    function getRecommendations() {
        console.log(this);
        let movieTitle = this.getAttribute("data-title");
        let movieID = this.getAttribute("data-id")
        console.log("you clicked: " + movieTitle + " " + movieID);

        let url = "".concat(baseUrl, mode, "/", movieID, "/recommendations?", "api_key=", apikey);

        fetch(url)
            .then(result => result.json())
            .then((data) => {
                createPageRecommd(data);
                console.log("exito");
            })
            .catch((error) => console.log(error));

    }

    function getLocalStorageData() {
        // First see if the key exists in local storage
        if (localStorage.getItem(timeKey)) {
            console.log("Retrieving Saved Date from Local Storage");
            let savedDate = localStorage.getItem(timeKey); // get the saved date sting
            savedDate = new Date(savedDate); // use this string to initialize a new Date object
            console.log(savedDate);

            let seconds = calculateElapsedTime(savedDate);



            if (seconds > staleDataTimeOut) {
                console.log("Local Storage Data is stale");

                saveDateToLocalStorage();
            }
        } else {
            saveDateToLocalStorage();
        }
    }

    function saveDateToLocalStorage() {
        console.log("Saving current Date to Local Storage");
        //    h3.innerHTML += "<br>Saving current Date to Local Storage";
        let now = new Date();
        localStorage.setItem(timeKey, now);
    }

    function calculateElapsedTime(savedDate) {
        let now = new Date(); // get the current time
        console.log(now);

        // calculate elapsed time
        let elapsedTime = now.getTime() - savedDate.getTime(); // this in milliseconds

        let seconds = Math.ceil(elapsedTime / 1000);
        console.log("Elapsed Time: " + seconds + " seconds");
        return seconds;
    }
})();
