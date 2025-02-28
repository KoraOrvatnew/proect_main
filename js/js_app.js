const API_KEY = "529c790f-3578-406b-94dd-d8956b7d306b";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
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

  data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie_cover-inner">
        <img
          src="${movie.posterUrlPreview}" /*прьевью фильмов*/
          class="movie_cover"
          alt="${movie.nameRu}" /*название*/
        />
        <div class="movie_cover--darkened"></div>
      </div>
      <div class="movie_info">
        <div class="movie_title">Название: ${movie.nameRu}</div>
        <div class="movie_category">Жанр: ${movie.genres.map( /*жанр*/
          (genre) => ` ${genre.genre}`
        )}</div>
        ${movie.ratingKinopoisk &&
            `
        <div class="movie_average--${getClassByRate(
          movie.ratingKinopoisk
        )}
          ">${movie.ratingKinopoisk}</div>
        `}
      </div>
        <div>
                <button class="btnwatchLater">Хочу посмотреть</button>
              </div>
      
        `;
    moviesEl.appendChild(movieEl);
  });
}





