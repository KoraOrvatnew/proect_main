const API_URL = 'https://media-new-7c859-default-rtdb.firebaseio.com/'

const createForm = document.getElementById('create-form')
const filmName = document.getElementById('name')
const filmGenre = document.getElementById('genre')
const filmRating= document.getElementById('rating')
const filmYear = document.getElementById('year')
const filmImageLink = document.getElementById('img')
const filmDescription = document.getElementById('description')
const addBtn = document.getElementById('add')

const addContainerBtn = document.getElementById('add-container')
const updateContainerBtn = document.getElementById('update-container')
const deleteContainerBtn = document.getElementById('delete-container')

const addContainer = document.querySelector('.add-film')
const updateContainer = document.querySelector('.update-film')
const deleteContainer = document.querySelector('.delete-film')

addBtn.onclick = (event) => {
    event.preventDefault()
    const film = {
        name: filmName.value,
        genre: filmGenre.value,
        rating: filmRating.value,
        year: filmYear.value,
        img: filmImageLink.value,
        description: filmDescription.value     
       
       
    }
    addFilm(film)
}

function addFilm(film) {
    fetch(`${API_URL}/films.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(film)
    }).then(() => {
        filmName.value = ''
        filmRating.value = ''
        filmGenre.value = ''
        // filmYear.value = ''
        filmImageLink.value = ''
        filmDescription.value = ''
    })
    .catch(err =>  console.log(err))
}

addContainerBtn.onclick = () => {
    addContainer.style.display = 'block'
    updateContainer.style.display = 'none'
    deleteContainer.style.display = 'none'
}

updateContainerBtn.onclick = () => {
    addContainer.style.display = 'none'
    updateContainer.style.display = 'block'
    deleteContainer.style.display = 'none'
    showUpdateContainer()
}

deleteContainerBtn.onclick = () => {
    addContainer.style.display = 'none'
    updateContainer.style.display = 'none'
    deleteContainer.style.display = 'block'
    showDeleteContainer()
}


function showUpdateContainer() {
    updateContainer.innerHTML = ''

    fetch(`${API_URL}/films.json`)
        .then(response => response.json())
        .then(films => {
            console.log(films);
            
			const arr = Object.values(films).map((film, i) => {
				return {
					...film,
					id: Object.keys(films)[i],
				};
			});
            arr.forEach(film => {

                const form = document.createElement('form')
                const name = document.createElement('input')
                name.type = 'text'
                name.value = film.name

                const genre = document.createElement('input')
                genre.type = 'text'
                genre.value = film.genre

                const rating = document.createElement('input')
                rating.type = 'number'
                rating.value = film.rating

                const year = document.createElement('input')
                year.type = 'text'
                year.value = film.year
                const img = document.createElement('input')
                img.type = 'text'
                img.value = film.img
                const description = document.createElement('textarea')
                description.value = film.description
                const btn = document.createElement('button')
                btn.textContent = 'Update'

                btn.onclick = (event) => {
                    event.preventDefault()
                    const updatedFilm = {
                        name: name.value,
                        genre: genre.value,
                        rating: rating.value,
                        year: year.value,
                        img: img.value,
                        description: description.value
                    }
                    updateFilm(film.id, updatedFilm)
                }
                form.append(name, genre, year, rating, description, img, btn) /*year, genre*/
                updateContainer.appendChild(form)
            })

        })

}

function updateFilm(id, film) {
    fetch(`${API_URL}/films/${id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(film)
    }).then(res => res.json)
    .then(() => {
        showUpdateContainer()

    })
   .catch(err =>  console.log(err))
}


function showDeleteContainer() {
    deleteContainer.innerHTML = ''

    fetch(`${API_URL}/films.json`)
        .then(response => response.json())
        .then(films => {
            console.log(films);
            
			const arr = Object.values(films).map((film, i) => {
				return {
					...film,
					id: Object.keys(films)[i],
				};
			});
            arr.forEach(film => {

                const form = document.createElement('form')
                const name = document.createElement('h4')
                name.innerText = film.name
                const btn = document.createElement('button')
                btn.textContent = 'Delete'

                btn.onclick = (event) => {
                    event.preventDefault()
                    deleteFilm(film.id)
                }
                form.append(name, btn)
                deleteContainer.appendChild(form)
            })

        })

}

function deleteFilm(id) {
    fetch(`${API_URL}/films/${id}.json`, {
        method: 'DELETE',
    }).then(() => {
        showDeleteContainer()

    })
   .catch(err =>  console.log(err))
}