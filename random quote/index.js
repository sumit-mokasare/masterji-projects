const quoteContent = document.querySelector('.quote')
const authorText = document.querySelector('.author')
const refrashButton = document.querySelector('.refrash-icon')
const twitterButton = document.querySelector('.twitter-icon')
const quoteCard = document.querySelector('.quote-card')

const motivationalImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80",
];



async function fetchQuotes() {
    let url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'
    let response = await fetch(url)
    let data = await response.json();
    return data
}


async function handleData() {
    
    let data = await fetchQuotes()
    quoteContent.innerHTML = data.data.content
    authorText.textContent = ` ~${data.data.author}`
    let randomImage = Math.floor(Math.random() * motivationalImages.length)
    quoteCard.style.backgroundImage = `url('${motivationalImages[randomImage]}')`

}
handleData()

let angle = 0
function refrashAnimation() {
    let rotate = setInterval(() => {
        angle += 10
        refrashButton.style.transform = `rotate(${angle}deg)`;
        if (angle >= 360) {
            angle = 0
            clearInterval(rotate)
        }
    }, 10)

}

function exportCard() {
    html2canvas(quoteCard, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "motivational-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function handleShearQuote() {
    let quote = quoteContent.textContent
    let author = authorText.textContent
    let tweetText = `${quote}  ${author}`
    console.log(tweetText);

    let tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetURL, '_blank')

}
refrashButton.addEventListener('click', () => {
    handleData()
    refrashAnimation()
})
twitterButton.addEventListener('click', handleShearQuote)
// handleData();






