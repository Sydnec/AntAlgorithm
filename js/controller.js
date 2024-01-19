class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.toggleButton.addEventListener('click', () => this.toggle());
    }

    toggle() {
        if (this.model.isRunning) {
            clearInterval(this.model.intervalId);
            this.model.stopChrono()
            this.view.updateTimer(this.model.ms)
            this.view.displayStartButton() 
        } else {
            this.model.startChrono()
            this.model.intervalId = setInterval(() => {
                this.model.tick();
                this.view.updateTimer(this.model.ms);
            }, 1000/this.model.fps);
            this.view.displayStopButton()
        }
    }
}

const app = new Controller(new Model(), new View());
