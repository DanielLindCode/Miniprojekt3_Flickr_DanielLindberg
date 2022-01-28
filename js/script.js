const btn = document.getElementById("searchbutton");
const searchBox = document.getElementById("searchBox");
const quantityBox = document.getElementById("quantityBox");

const size = document.getElementsByClassName("selectClass")[0];

//ToDO kolla upp "keyCode"

// EventListeners on inputs and btn
searchBox.addEventListener('keyup', (e) => {
    // if (e.keyCode === 13) {
    //     console.log(searchBox.value);
    //     console.log('eventet:', e.code);
    //     removeImg();
    //     searchFunction();

    //     return searchBox.value;
    // }
    return searchBox.value;
});

quantityBox.addEventListener('keyup', (e) => {
    // if (e.keyCode === 13) {
    //     //console.log(quantityBox.value);
    //     return quantityBox.value;
    // }
    return quantityBox.value;
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    removeImg();
    searchFunction();
});

// Error if search input is empty. Else pass the values from inputs through getImg function. 
function searchFunction() {

    if (searchBox.value == "" || quantityBox == "") {
        console.error("Error")
        alert("Enter a search word AND quantity")
    } else {
        //console.log(size[0].value);
        getImg(searchBox.value, quantityBox.value, size.value);
    }
};

function getImg(searchText, searchQ) {


    const KEY = '96830315909f91f9c355df1c2d4f7b5e';

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=${searchQ}&page=1`;


    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                const promise = response.json();
                //console.log(promise);
                return promise;
            }
            else {
                throw 'Could not connect to API';
            }
        }
    ).then(
        function (data) {
            console.log(data);
            if (data.photos.photo.length == 0){
                alert("No searach results found");
            } else {getImageUrl(data);}
        }
    ).catch(
        function (error) {
            console.log(error);
            alert("Connection problems with the API. Please see response log in console for more information.");
        }
    );
};

function getImageUrl(photoObject) {
    for (const iterator of photoObject.photos.photo) {
        //console.log(iterator);
        let imgUrl = `https://live.staticflickr.com/${iterator.server}/${iterator.id}_${iterator.secret}_${size.value}.jpg`;

        //console.log(imgUrl);
        displayImg(imgUrl);
    }
}

// Appends img to the gallery and makes it clickable
function displayImg(url) {
    let img = document.createElement("img");
    img.src = url;

    document.querySelector(".gallery").appendChild(img);
    img.onclick = function () {
        window.open(url);
    }
}

function removeImg() {
    const img = document.querySelectorAll("img");
    //console.log(img.length);
    for (const iterator of img) {
        iterator.remove();
    }
}