
let films = [
    {
      "id": 0,
      "filmName": "The Godfather (1972)",
      "rating": 0
    },
    {
      "id": 1,
      "filmName": "The Shawshank Redemption (1994)",
      "rating": 0
    },
    {
      "id": 2,
      "filmName": "The Dark Knight (2008)",
      "rating": 0
    },
    {
      "id": 3,
      "filmName": "12 Angry Men (1957)",
      "rating": 0
    },
    {
      "id": 4,
      "filmName": "Shindler's List (1993)",
      "rating": 0
    },
    {
      "id": 5,
      "filmName": "The Lord of the Rings: The Return of the King (2003)",
      "rating": 0
    }
  ];

function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
      return false;
    };
}

var filmList = [];

function createFilmList(){if (supports_html5_storage()) {
    if (localStorage.getItem("itemList")) {
            var itemList = JSON.parse(localStorage.getItem("itemList"));
        }
        else {
            var itemList = films;
            localStorage.setItem("itemList", JSON.stringify(itemList));
        }

}
filmList = itemList.sort(compareNames);

var container = document.getElementById('container');

for (let i = 0; i< filmList.length; i++) {
    let item = filmList[i];
    
    let rating = item.rating;
    
    let filmDiv = document.createElement('div');
    
    filmDiv.id = item.id;
    filmDiv.className = "film";
    
    let filmName = document.createElement('p');
    filmName.className = "filmName";
    filmName.innerHTML = item.filmName;
    filmDiv.appendChild(filmName);

    let filmRate = document.createElement('div');
    filmRate.className = "rating";

    for (let j=5; j>0; j--) {
        if (j>rating){
            filmRate.innerHTML+= '<span'+' class="'+'a'+j+'"'+' onclick="setRate()"'+'>&#9734</span>'
        
    } else {
        filmRate.innerHTML+= '<span'+' class="'+'a'+j+'"'+' onclick="setRate()"'+' style="color: gold"'+'>&#9733</span>';
    }
}
    filmDiv.appendChild(filmRate);
    container.appendChild(filmDiv);
};};
createFilmList();
function addFilm() {
    let newFilmName = document.getElementById("addFilm").value;
    let newFilm = {
        "id": filmList.length,
        "filmName": newFilmName,
        "rating": 0
    }
    filmList.push(newFilm);
    localStorage.setItem("itemList", JSON.stringify(filmList));
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createFilmList();
}

function compareFilms(a, b) {
    return a.rating - b.rating;
}
function compareNames(a, b) {
    if (a.rating> b.rating)
        return -1;
    if (a.rating< b.rating) 
        return 1;
    if (a.filmName> b.filmName)
        return 1;
    if (a.filmName< b.filmName) 
        return -1; 
    return 0;
};

function setRate(event, el) {

    event = event || window.event;
    
    let star = event.currentTarget;
    let starNumber = +star.className.substring(1);
    let currFilmId = star.parentNode.parentNode.id;
    for (let k= 0; k<filmList.length; k++) {
        if (filmList[k].id==currFilmId){
            filmList[k].rating = starNumber;
            
            localStorage.setItem("itemList", JSON.stringify(filmList));
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            createFilmList();
            console.log(filmList[k]);
        }
    }
};
