// script.js

// Функция для добавления товара в избранное
function addToFavorites(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (!favorites.includes(product)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${product} добавлен в избранное!`);
    } else {
        alert(`${product} уже в избранном!`);
    }
}