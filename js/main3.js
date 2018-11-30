let app = {
    init: function () {
        let modal = document.querySelector(".modal");
        serverData.getConfig();
        console.log("hola");

        document.getElementById("preference-button").addEventListener("click", function () {


            modal.classList.remove("off");
            modal.classList.add("on");
            /*por que no funciona con el getelemtbyclassname??*/
        });
        document.getElementById("cancelButton").addEventListener("click", function () {
            modal.classList.remove("on");
            modal.classList.add("off");
        });

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
            console.log("You picked " + choosen);
            modal.classList.remove("on");
            modal.classList.add("off");
        });


        document.getElementById("search-button").addEventListener("click", app.currentPage);
        document.getElementById("search-button").addEventListener("click", serverData.getData);
        document.querySelectorAll(".go-home").forEach(function (item) {
            item.addEventListener("click", function () {

                app.currentPage(0);
            })
        });

    },
    currentPage: function (page) {
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

}




let serverData = {
    baseUrl: "https://api.themoviedb.org/3/",
    baseImgUrl: null,
    configData: null,
    //    httpRequest: "POST",
    getConfig: function () {
        let url = "".concat(serverData.baseUrl, "configuration?api_key=", apikey);

        fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                baseImgUrl = data.images.secure_base_url;
                configData = data.images;
                console.log("config:", data);
                console.log("config fetched");
                serverData.runSearch("the big bang");
            })
            .catch(function (err) {
                alert(err);
            });

    },




    runSearch: function (keyword) {
        let url = "".concat(serverData.baseUrl, "search/movie?api_key=", apikey, "&query=", keyword);
        fetch(url)
            .then(result => result.json())
            .then((data) => {
                document.getElementById("ponloaqui").innerHTML = JSON.stringify(data, null, 4)
            })
    }


    //    getData: function () {
    //
    //        let formdata = new FormData();
    //
    //        formdata.append("search-input", document.getElementById("search-input").value);
    //
    //
    //        let customSettings = {
    //            method: serverData.httpRequest,
    //            mode: "cors",
    //            body: formdata
    //        };
    //
    //        let request = new Request(serverData.url, customSettings); /*?, o ;?*/
    //
    //        fetch(request)
    //            .then(function (response) {
    //
    //                console.log(response);
    //                return response.json();
    //            })
    //
    //            .then(function (data) {
    //
    //                console.log(data);
    //                //                   console.log(data.numbers);
    //
    //            })
    //    }
}

document.addEventListener("DOMContentLoaded", app.init);



//            for (i = 0; i <= 20; i++) {
            //                let results = data.results;
            //
            //                let resultsS = JSON.stringify(results);
            //
            //                localStorage.setItem("westeros-results", resultsS);
            //            }
        })

        //        .then((result) => {
        //            //            for (i = 0; i <= 20; i++) {
        //            let array = [];
        //            let getStotage = localStorage.getItem("westeros-results");
        //
        //            let obj = JSON.parse(getStotage);
        //
        //            //                console.log(obj);
        //            //                console.log(obj.id);
        //
        //            array.push(obj);
        //            //       
        //            //
        //
        //            console.log(array);
        //            array.forEach(function () {
        //                    let id = obj.vote_count;
        //                    console.log(id);
        //                    //                })
        //                }
        //
        //            )
        //        })




        //            localStorage.setItem("westeros-id", id);





        //            window.localStorage.setItem("data", "()");
        //            console.log("data saved in local storage");
        //            document.getElementById("ponloaqui").innerHTML = JSON.stringify(data, null, 4)









        //        .then(function () {
        //            let page2 = document.getElementById("search-results");
        //            let page1 = document.getElementById("home");
        //            page2.classList.add("active");
        //            page1.classList.remove("active")
        //        })
        
        
         //    let urlTv = "".concat(baseUrl, "search/tv?api_key=", apikey, "&query=", keyword);
    //    fetch(urlTv)
    //        .then(result => result.json())
    //        .then((data) => {
    //
    //        })
    //        .catch(error => console.log(error));

    //            getDataLocalS()

        
        
        
        
        
//
//
//    function getDataLocalS() {
//
//        for (i = 0; i <= 20; i++) {
//            let getStotage = localStorage.getItem("westeros-results");
//
//            let obj = JSON.parse(getStotage);
//            console.log(results[1])
//            //        let output = document.getElementById("newInfo");
//
//            //        getStotage.output();
//            let id = window.localStorage.getItem("id");
//            document.getElementById("newInfo").innerHTML = getStotage.getItem("id");
//
//        }
//
//
//
//    }









//let saveData{"id", data.gete}

        
        
        