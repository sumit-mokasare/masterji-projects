const quoteContent = document.querySelector('.quote')
const authorText = document.querySelector('.author')
const refrashButton = document.querySelector('.refrash-icon')


async function fetchQuotes() {
    let url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'
    let response = await fetch(url)
    let data = await response.json();
    return data
}


async function handleData() {
    let data = await fetchQuotes()
    quoteContent.innerHTML = data.data.content
    authorText.innerHTML = data.data.author
    refrashButton.style
    refrashButton.style.transform = 'rotate(90deg)'

}
refrashButton.addEventListener('click', handleData)
handleData();






