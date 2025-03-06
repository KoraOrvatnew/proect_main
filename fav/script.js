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
    displayFavorites();
}
function displayFavorites(){
// Получаем избранные товары из localStorage и отображаем их
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesList = document.getElementById('favoritesList');
const deleteContainerBtn = document.getElementById('delete-container')
if (favorites.length === 0) {
    favoritesList.innerHTML = '<li>Нет избранных фильмов</li>';
} else {
  favoritesList.innerHTML = "";
     favorites.forEach(product => {
        const li = document.createElement('li');
         li.innerHTML = product + ' <button class="BtnDel" onclick="removeFromFavorites(\'' + product.toString() + '\')">Удалить</button>';
       
        favoritesList.appendChild(li);
     });
}
}
displayFavorites();