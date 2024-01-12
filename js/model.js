class Model {
    constructor() {
        this.seconds = 0;
        this.isRunning = false;
        this.timerInterval = null;
    }

    getSeconds() {
        return this.seconds;
    }

    setSeconds(value) {
        this.seconds = value;
    }

    getIsRunning() {
        return this.isRunning;
    }

    setIsRunning(value) {
        this.isRunning = value;
    }

    getTimerInterval() {
        return this.timerInterval;
    }

    setTimerInterval(value) {
        this.timerInterval = value;
    }
}

const model = new Model();
