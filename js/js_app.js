const API_URL_POPULAR = "https://media-new-7c859-default-rtdb.firebaseio.com/films.json";
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

function getClassByRate(vote) {
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
    moviesEl.innerHTML = "";

    Object.values(data).forEach((movie, index) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <div class="movie_cover-inner">
                <img
                    src="${movie.img}"
                    class="movie_cover"
                    alt="${movie.name}"
                />
                <div class="movie_cover--darkened"></div>
            </div>
            <div class="movie_info">
                <div><button class="openModal" data-index="${index}">Подробнее</button></div>
                <div>             
                
                  <button class="Favorit" onclick="addToFavorites('${movie.name}')">В избранное</button>
                                
                  <button class="BtnDel" onclick="removeFromFavorites('${movie.name}')">Удалить</button>                    
                </div>
                <div class="movie_title">Название: ${movie.name}</div>
                <div class="movie_category">Жанр: ${movie.genre}</div>
                <div class="movie_year">Год выпуска: ${movie.year}</div>
                
                ${movie.rating ? `<div class="movie_average--${getClassByRate(movie.rating)}">${movie.rating}</div>` : ""}
                ${movie.age ? `<div class="movie_age ${getClassByRate(movie.age)}">${movie.age}</div>` : ""}
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
            const index = button.getAttribute('data-index');
            const movieData = Object.values(data)[index];
            modal.querySelector('.modal-content p').textContent = `Описание: ${movieData.description}`;
            modal.querySelector('.modal-content .poster').src = movieData.img;
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

// Функция для добавления фильма в избранное
function addToFavorites(movieName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieName)) {
        favorites.push(movieName);
        localStorage.setItem('favorites', JSON.stringify(favorites));                      
                
        alert(`${movieName} - фильм добавлен в избранное!`);
    } else {
        alert(`${movieName} - фильм уже добавлен!`);
      
    }
}

// Функция для удаления фильма из избранного
function removeFromFavorites(movieName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(movieName)) {
        favorites = favorites.filter(favorite => favorite !== movieName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movieName} - фильм удален из избранного!`);
        // Обновление списка избранных фильмов после удаления
        displayFavorites();
    } else {
        alert(`${movieName} - фильм не найден в избранном!`);
    }
}

// Функция для отображения избранных фильмов
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = ''; // Очистка списка перед обновлением

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li>Нет избранных фильмов</li>';
    } else {
        favorites.forEach(movieName => {
            const li = document.createElement('li');
            li.textContent = movieName; 
            favoritesList.appendChild(li);
        });
    }
}

// Вызываем функцию для отображения избранных фильмов при загрузке
displayFavorites();