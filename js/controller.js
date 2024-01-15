class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View(this);
    }

    toggle() {
        if (this.model.getIsRunning()) {
            clearInterval(this.model.intervalId);
            this.view.displayStartButton() 
        } else {
            this.model.intervalId = setInterval(() => this.model.tick(), 1000/this.model.fps);
            this.view.displayStopButton()
        }
        this.model.setIsRunning(!this.model.getIsRunning());
    }
}

const controller = new Controller();
