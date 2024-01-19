class Model {
	constructor() {
		this.ms = 0;
		this.fps = 30;
		this.intervalId = null;
		this.isRunning = false;
		this.startTime = null;

		// let _grid = new Labyrinth(7, 7);
	}

	startChrono() {
		this.startTime = new Date().getTime() - this.ms;
		this.isRunning = true;
	}

	stopChrono() {
		this.ms = new Date().getTime() - this.startTime;
		this.isRunning = false;
	}

	tick() {
		if (this.isRunning) {
			this.ms = new Date().getTime() - this.startTime;
		}
	}
}
