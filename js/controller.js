class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.view.toggleButton.addEventListener('click', () => this.toggle());
		window.addEventListener(
			'keydown',
			(event, button = this.view.toggleButton) => {
				if (event.key === ' ') {
					button.click();
				}
			},
			true
		);

this.myMaze = new Maze(9,9);
// let cellSize = 100;

// const canvas = document.getElementById('gridCanvas');
// const ctx = canvas.getContext('2d');
	}

	toggle() {
		if (this.model.isRunning) {
			clearInterval(this.model.intervalId);
			this.model.stopChrono();
			this.view.updateTimer(this.model.ms);
			this.view.displayStartButton();
		} else {
			this.model.startChrono();
			this.model.intervalId = setInterval(() => {
				this.model.tick();
				this.view.updateTimer(this.model.ms);
			}, 1000 / this.model.fps);
			this.view.displayStopButton();
		}
	}
}
const app = new Controller(new Model(), new View());
