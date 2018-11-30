document.addEventListener("DOMContentLoaded", app.init);




let app = {
//    url: "https://api.themoviedb.org/3/movie/550?api_key=5d0d263a63f74a0129c210a5174b08b3",
//    httpRequest: "POST",
//    serverData: function () {
//
//
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
//    },

    inti: function () {
console.log("hola");
        document.getElementById("preference-button").addEventListener("click", app.currentPage);
        
    },



//    currentPage: function (page) {
//        let pageList = [];
//        pageList = document.querySelectorAll(".page");
//
//
//        for (let i = 0; i < pageList.length; i++) {
//            if (page == i) {
//                pageList[i].classList.add("active");
//            } else {
//                pageList[i].classList.remove("active");
//            }
//            console.log("hola");
//        }
//
//
//    }
}
