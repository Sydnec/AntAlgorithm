class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.cellSize = 16;
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
		
		this.canvas = document.getElementById('gridCanvas')
		const ctx = this.canvas.getContext('2d');

		for (let x = 0; x < this.myMaze.height; x++) {
			for (let y = 0; y < this.myMaze.width; y++) {
				const cellType = this.myMaze.cells[x][y].getType();
				const img = new Image();
				img.src = `images/${cellType.toLowerCase()}.png`;

				img.onload = () => {
					ctx.drawImage(img, y * this.cellSize, x * this.cellSize, this.cellSize, this.cellSize);
				};
			}
		}
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
