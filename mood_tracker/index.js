
const daysContainer = document.getElementById('dates')
const monthYear = document.getElementById('month-year')
const prevMonth = document.getElementById('prevMonth')
const nextMonth = document.getElementById('nextMonth')


let currentDate = new Date();

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
        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        daysContainer.innerHTML += `<div class="${isToday ? "today" : ""} date-box">${day}</div>`;
    }
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