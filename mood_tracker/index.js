
const daysContainer = document.getElementById('dates')
const monthYear = document.getElementById('month-year')
const prevMonth = document.getElementById('prevMonth')
const nextMonth = document.getElementById('nextMonth')
const moodSideContainer = document.querySelector('.moods-side')

const moodArr = [
    {
        Image: 'assests/angry.png',
        text: 'angry'
    },
    {
        Image: 'assests/cary.png',
        text: 'crying'
    },
    {
        Image: 'assests/happy.png',
        text: 'happy'
    },
]



let currentDate = new Date();

let isToday = undefined
let currentDay


function getSelectedDateKey() {

    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
    return selectedDate.toISOString().split('T')[0];
}

function renderCalendar(date) {
    daysContainer.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // Day of week (0-6)
    const totalDays = new Date(year, month + 1, 0).getDate(); // Days in month

    const today = new Date();

    // Display month & year
    monthYear.innerHTML = ` <span>${year}</span> ${date.toLocaleString("default", { month: "long" })}`;

    // Padding before first day
    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div class="date-box"></div>`;
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
        isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        const dateBox = document.createElement('div');
        dateBox.className = `date-box ${isToday ? 'today' : ''}`;
        dateBox.textContent = day;

        dateBox.addEventListener('click', () => {
            currentDay = day;
            showMoodOnData();
        });

        if (isToday) {
            currentDay = day
        }

        daysContainer.appendChild(dateBox)
    }
    showMoodOnData()
}

// Handle buttons
prevMonth.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
};
nextMonth.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
};

renderCalendar(currentDate);

function displyaMood(moodArr) {
    let key = getSelectedDateKey()
  
    if (!key) {
        return 'not key found'
    }
    moodArr.forEach((item) => {
        let moodBoxDiv = document.createElement('div')
        let img = document.createElement('img')

        moodBoxDiv.classList.add('mood-box')
        moodBoxDiv.innerHTML = `${item.text}<br>`

        img.src = item.Image
        img.setAttribute('width', '20%')
        img.setAttribute('height', '35%')
        moodBoxDiv.appendChild(img);

        moodBoxDiv.addEventListener('click', () => {
            savetoLocalstorage(img.src)
            showMoodOnData()
        })

        moodSideContainer.appendChild(moodBoxDiv)
    })

}

function savetoLocalstorage(image) {
    let key = getSelectedDateKey();
    const selectedMood = {
        img: image,
        date: key
    }
    let allMoods = JSON.parse(localStorage.getItem('moods')) || [];
    allMoods[key] = selectedMood
    localStorage.setItem('moods', JSON.stringify(allMoods))
}

function showMoodOnData() {
    let key = getSelectedDateKey()
    let allMoods = JSON.parse(localStorage.getItem('moods'))
    const moodFormDate = allMoods[key];

    const dateBoxes = document.querySelectorAll('.date-box');
    dateBoxes.forEach((box) => {
        const day = parseInt(box.textContent)

        if (!isNaN(day) && day === currentDay){
            box.innerHTML = `${currentDay}`
            if (moodFormDate) {
                const img = document.createElement('img');
                img.src = moodFormDate.img;
                img.classList.add('mood-image');
                box.appendChild(img);
            }
        }

    })

}


displyaMood(moodArr);
showMoodOnData()


