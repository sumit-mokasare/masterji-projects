const API_URL = 'https://api.freeapi.app/api/v1/public/books'

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const filterCheckBox = document.querySelectorAll('.check-box')
const selector = document.getElementById('desgin-type')
const cardContainer = document.querySelector('.card-container')
const pagenationContainer = document.querySelector('.pagenation-btns')



async function fetchData() {
    let response = await fetch(API_URL)
    let data = await response.json()
    return data.data.data
}

let itemParPage = 6
let currentPage = 1

function dilsplayCard(data) {
    cardContainer.innerHTML = ' '
    data.forEach((item) => {
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
        <div class="cover">
                <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="thumnail Image">
        </div>
                <div class="card-detail">
                <h4>${item.volumeInfo.title}</h4>
                <p>Author: ${item.volumeInfo.authors[0]}</p>
                <p>Publisher: ${item.volumeInfo.publisher}</p>
                <p>date: ${item.volumeInfo.publishedDate}</p>
        </div>
        `
        cardContainer.appendChild(card)
    })

}

async function displayData(page) {
    let data = await fetchData()
    let startIndex = (page - 1) * itemParPage
    let endIndex = startIndex + itemParPage
    let pageData = data.slice(startIndex, endIndex)
    console.log('pagedata ', pageData);
    dilsplayCard(pageData)
}

async function generatePaginationButton() {
    let data = await fetchData()
    const totalePage = Math.ceil(data.length / itemParPage)

    pagenationContainer.innerHTML = ''

    const PreviousButton = document.createElement('button')
    PreviousButton.textContent = 'Previous'
    PreviousButton.disabled = currentPage === 1
    PreviousButton.addEventListener('click', (e) => {
        if (currentPage > 1) {
            currentPage--
            displayData(currentPage)
            generatePaginationButton()
        }
    })
    pagenationContainer.appendChild(PreviousButton)

    for (let i = 1; i < totalePage; i++) {
        const button = document.createElement('button')
        button.textContent = i
        button.disabled = i === currentPage
        button.addEventListener('click', () => {
            currentPage = i
            displayData(currentPage)
            generatePaginationButton()
        })
        pagenationContainer.appendChild(button)
    }

    const nextButton = document.createElement('button')
    nextButton.textContent = 'next'
    nextButton.disabled = currentPage === totalePage
    nextButton.addEventListener('click', (e) => {
        if (currentPage < totalePage) {
            currentPage++
            displayData(currentPage)
            generatePaginationButton()
        }
    })
    pagenationContainer.appendChild(nextButton)
}

displayData(currentPage);
generatePaginationButton();





