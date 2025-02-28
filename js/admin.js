const API_URL = 'https://mediaserver-291be-default-rtdb.firebaseio.com/' /*хранилка*/ */

const createForm = document.getElementById('create-form')
const pizzaName = document.getElementById('name')
const pizzaPrice = document.getElementById('price')
const pizzaImageLink = document.getElementById('img')
const pizzaDescription = document.getElementById('description')
const addBtn = document.getElementById('add')

const addContainerBtn = document.getElementById('add-container')
const updateContainerBtn = document.getElementById('update-container')
const deleteContainerBtn = document.getElementById('delete-container')

const addContainer = document.querySelector('.add-pizza')
const updateContainer = document.querySelector('.update-pizza')
const deleteContainer = document.querySelector('.delete-pizza')


addBtn.onclick = (event) => {
    event.preventDefault()
    const pizza = {
        name: pizzaName.value,
        price: pizzaPrice.value,
        img: pizzaImageLink.value,
        description: pizzaDescription.value
    }
    addPizza(pizza)
}

function addPizza(pizza) {
    fetch(`${API_URL}/pizzas.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza)
    }).then(() => {
        pizzaName.value = ''
        pizzaPrice.value = ''
        pizzaImageLink.value = ''
        pizzaDescription.value = ''
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

    fetch(`${API_URL}/pizzas.json`)
        .then(response => response.json())
        .then(pizzas => {
            console.log(pizzas);
            
			const arr = Object.values(pizzas).map((pizza, i) => {
				return {
					...pizza,
					id: Object.keys(pizzas)[i],
				};
			});
            arr.forEach(pizza => {

                const form = document.createElement('form')
                const name = document.createElement('input')
                name.type = 'text'
                name.value = pizza.name
                const price = document.createElement('input')
                price.type = 'number'
                price.value = pizza.price
                const img = document.createElement('input')
                img.type = 'text'
                img.value = pizza.img
                const description = document.createElement('textarea')
                description.value = pizza.description
                const btn = document.createElement('button')
                btn.textContent = 'Update'

                btn.onclick = (event) => {
                    event.preventDefault()
                    const updatedPizza = {
                        name: name.value,
                        price: price.value,
                        img: img.value,
                        description: description.value
                    }
                    updatePizza(pizza.id, updatedPizza)
                }
                form.append(name, price, description, img, btn)
                updateContainer.appendChild(form)
            })

        })

}

function updatePizza(id, pizza) {
    fetch(`${API_URL}/pizzas/${id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza)
    }).then(res => res.json)
    .then(() => {
        showUpdateContainer()

    })
   .catch(err =>  console.log(err))
}


function showDeleteContainer() {
    deleteContainer.innerHTML = ''

    fetch(`${API_URL}/pizzas.json`)
        .then(response => response.json())
        .then(pizzas => {
            console.log(pizzas);
            
			const arr = Object.values(pizzas).map((pizza, i) => {
				return {
					...pizza,
					id: Object.keys(pizzas)[i],
				};
			});
            arr.forEach(pizza => {

                const form = document.createElement('form')
                const name = document.createElement('h4')
                name.innerText = pizza.name
                const btn = document.createElement('button')
                btn.textContent = 'Delete'

                btn.onclick = (event) => {
                    event.preventDefault()
                    deletePizza(pizza.id)
                }
                form.append(name, btn)
                deleteContainer.appendChild(form)
            })

        })

}

function deletePizza(id) {
    fetch(`${API_URL}/pizzas/${id}.json`, {
        method: 'DELETE',
    }).then(() => {
        showDeleteContainer()

    })
   .catch(err =>  console.log(err))
}