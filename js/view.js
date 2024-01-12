let isRunning = false;
let seconds = 0;
let minutes = 0;
let timerInterval;
const timerElement = document.getElementById('timer');
const toggleButton = document.getElementById('startstopButton');

function updateTimer() {
    seconds++;

    const formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
    timerElement.textContent = formattedTime;
}

function padNumber(num) {
    return num.toString().padStart(2, '0');
}

toggleButton.addEventListener('click', function () {
    if (isRunning) {
        clearInterval(timerInterval);
        toggleButton.textContent = 'Start';
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        toggleButton.textContent = 'Stop';
    }

    isRunning = !isRunning;
});