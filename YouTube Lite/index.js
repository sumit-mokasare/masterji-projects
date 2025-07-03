let cardContainer = document.querySelector('.video-container')
let search = document.getElementById('search')
let searchButton = document.getElementById('searchButton')


const fetchAip = async () => {

    try {
        let url = 'https://api.freeapi.app/api/v1/public/youtube/videos'
        const response = await fetch(url)
        const data = await response.json()
        return data.data.data
    } catch (error) {
        throw new Error(error)
    }
}

async function getFilterData(searchValue) {
    let data = await fetchAip()
    let filetredVideo = filterVideo(data, searchValue)
    displayCard(data, filetredVideo)
}
getFilterData()

function filterVideo(video, searchTerm) {
    let lowre = searchTerm?.toLowerCase()
    let data = video.filter((item) => {
        let title = item.items.snippet.localized.title
        let channelTitle = item.items.snippet.channelTitle
        if (title.toLowerCase().includes(lowre) || channelTitle.toLowerCase().includes(lowre)) {
            return item
        }
    })

    return data
}

function displayCard(fetchData, fitlerData) {

    cardContainer.innerHTML = ''

    let displayData = fitlerData.length ? fitlerData : fetchData

    if (fitlerData === 0 && search.value.trim()) {
        console.log('asdfj');
        let elem = document.createElement('h1')
        elem.style.textAlign = 'center'
        elem.innerText = 'No Video Availeble !'
        cardContainer.appendChild(elem)
        return
    }

    displayData.forEach((item) => {
        let videoId = item.items.id
        let chainnleId = item.items.snippet.channelId
        let card = document.createElement('div');
        card.className = 'video-card fade-in';

        card.innerHTML = `
            
                <a class="video-link" href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${item.items.snippet.thumbnails.maxres.url}" alt="thumbnail Image">
                </a>
                <div class="card-detail">
                    <img src="https://yt3.googleusercontent.com/arHIKjc6JTqF_b4QJKPHhQC_Jr8q0XfI7LEpJ0-VuiI0ZRz9xFNz94TWl4CLOcozLx-iAhV_=s160-c-k-c0x00ffffff-no-rj" alt="profile logo">
                    <div class="card-title">
                        <p>${item.items.snippet.localized.title}</p>
                       <a class='chainnle-logo' href="https://www.youtube.com/channel/${chainnleId}" target="_blank">
                            <span>${item.items.snippet.channelTitle}</span>
                        </a>
                    </div>
                </div>
        `
        cardContainer.appendChild(card)
    })
}


let debounceId
search.addEventListener('input', (e) => {
    clearTimeout(debounceId)
    debounceId = setTimeout(() => {
        getFilterData(e.target.value)
    }, 300)
})








