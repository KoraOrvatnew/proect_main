// const API_KEY = "529c790f-3578-406b-94dd-d8956b7d306b";
// const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_POPULAR = "https://media-new-7c859-default-rtdb.firebaseio.com/films.json"
// const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}


function getClassByRate(vote) { /*рейтинг */
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";
console.log(typeof(data));
  Object.values(data).forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie_cover-inner">
        <img
          src="${movie.img}" /*прьевью фильмов*/
          class="movie_cover"
          alt="${movie.name}" /*название*/
        />
        <div class="movie_cover--darkened"></div>
      </div>
      <div class="movie_info">
      <div>
                <button class="btnwatchLater">Хочу посмотреть</button>
              </div>
        <div class="movie_title">Название: ${movie.name}</div>
        <div class="movie_category">Жанр: ${movie.genre}</div>
        ${movie.rating &&
            `
        <div class="movie_average--${getClassByRate(
          movie.rating
        )}
          ">${movie.rating}</div>
        `}
      </div>
        
      
        `;
    moviesEl.appendChild(movieEl);
  });
}


