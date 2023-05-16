const daySelect = document.getElementById('day');
for (let i = 1; i <= 100; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `Dia ${i}`;
    daySelect.appendChild(option);
}

const gotasSelect = document.getElementById('gotas');
for (let i = 1; i <= 15; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${i} Gotas`;
    gotasSelect.appendChild(option);
}

const currentDateSpan = document.getElementById('current-date');
const currentDateInput = document.getElementById('current-date-input');
const currentDate = new Date().toLocaleDateString();
currentDateSpan.textContent = currentDate;
currentDateInput.value = currentDate;
          
const reportList = document.getElementById('report-list');
const reportForm = document.getElementById('report-form');
const usedDays = [];
          
reportForm.addEventListener('submit', (event) => {
    event.preventDefault();
          
    const day = document.getElementById('day').value;
          
    if (usedDays.includes(day)) {
        alert(`O dia ${day} já foi utilizado.`);
        return;
    }
          
    usedDays.push(day);
    const gotas = document.getElementById('gotas').value;
    const description = document.getElementById('description').value;
          
    const reportItem = document.createElement('div');
    reportItem.classList.add('report-item');
    reportItem.dataset.day = day;
    reportItem.innerHTML = `<h2>Dia ${day} - ${currentDate} - ${gotas} Gotas</h2><p>${description}</p><button class="delete-btn">Delete</button>`;
          
    reportList.appendChild(reportItem);
          
    reportForm.reset();

    function attachDeleteEvent(reportItem, day) {
        const deleteButton = reportItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            reportList.removeChild(reportItem);
            usedDays.splice(usedDays.indexOf(day), 1);
        });
    }

    const reportItems = reportList.querySelectorAll('.report-item');
    for (let i = 0; i < reportItems.length; i++) {
        const reportItem = reportItems[i];
        const day = reportItem.dataset.day;
        attachDeleteEvent(reportItem, day);
    }

});