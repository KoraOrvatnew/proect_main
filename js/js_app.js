const API_URL_POPULAR = "https://media-new-7c859-default-rtdb.firebaseio.com/films.json"
getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
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
  moviesEl.innerHTML = "";

  Object.values(data).forEach((movie, index) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie_cover-inner">
          <img
            src="${movie.img}" /*превью фильмов*/
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
          <button class="openModal" data-index="${index}">Нажми меня!</button>
          ${movie.rating &&
            `
            <div class="movie_average--${getClassByRate(movie.rating)}">
              ${movie.rating}
            </div>
          `}
        </div>
      `;
    moviesEl.appendChild(movieEl);
  });

  // Настройка обработчиков событий для модального окна
  const modal = document.querySelector('#modal');
  const openModalButtons = document.querySelectorAll('.openModal');
  const closeButton = document.querySelector('.close');

  openModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
