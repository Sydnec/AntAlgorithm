class Model {
    constructor() {
        this.ms = 0;
        this.fps = 30
        this.intervalId = null;
        this.isRunning = false;
        this.timerElement = document.getElementById('timer')
    }

    getIsRunning(){
        return this.isRunning;
    }
    setIsRunning(value){
        this.isRunning = value;
    }

    updateView() {
        this.timerElement.textContent = Math.floor(this.ms / 60000).toString().padStart(2, '0') + ":" + Math.floor((this.ms % 60000) / 1000).toString().padStart(2, '0');
    }
    
    tick() {
        this.ms += 1000/30;
        this.updateView();
    }
}