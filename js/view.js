// View
class View {
    constructor() {
        this.timerElement = document.getElementById('timer');
        this.toggleButton = document.getElementById('startstopButton');
        this.toggleButton.addEventListener('click', this.toggleTimer.bind(this));
    }

    updateTimer() { // Ajoute une seconde et change l'affichage
        model.setSeconds(model.getSeconds() + 1);
        const formattedTime = this.formatTime(model.getSeconds());
        this.timerElement.textContent = formattedTime;
    }

    formatTime(seconds) { // Affichage au format 00:00
        return Math.floor(seconds / 60).toString().padStart(2, '0') + ":" + (seconds % 60).toString().padStart(2, '0');
    }

    toggleTimer() {
        if (model.getIsRunning()) { // Pause
            clearInterval(model.getTimerInterval());
            this.toggleButton.textContent = 'Start';
        } else { // Reprise
            model.setTimerInterval(setInterval(this.updateTimer.bind(this), 1000));
            this.toggleButton.textContent = 'Stop';
        }

        model.setIsRunning(!model.getIsRunning());
    }
}

const view = new View();
