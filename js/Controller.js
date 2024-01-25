import { Model } from './Model.js';
import { View } from './View.js';

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.view.timerButton.addEventListener('click', () =>
			this.toggleTimerButton()
		);
		this.view.pheromonesButton.addEventListener('click', () =>
			this.togglePheromonesButton()
		);
		window.addEventListener(
			'keydown',
			(event) => {
				if (event.key === ' ') {
					this.view.timerButton.click();
				}
			},
			true
		);

		Promise.all(this.view.imagePromises).then(() => {
			this.view.renderMaze(this.model.myMaze);
		});
	}

	togglePheromonesButton() {
		if (this.view.graphicalPheromones) {
			this.view.pheromonesButton.style.backgroundColor = '#888888';
		} else {
			this.view.pheromonesButton.style.backgroundColor = '#4caf50';
		}
		this.view.graphicalPheromones = !this.view.graphicalPheromones;
		this.view.renderMaze(this.model.myMaze);
	}

	toggleTimerButton() {
		if (this.model.isRunning) {
			clearInterval(this.model.intervalId);
			clearInterval(this.model.timerIntervalId);
			this.model.stopChrono();
			this.view.updateTimer(this.model.ms);
			this.view.displayStartButton();
		} else {
			this.model.startChrono();
			this.model.intervalId = setInterval(() => {
				this.view.renderMaze(this.model.myMaze);
				this.model.tick();
				if(this.model.myMaze.numberOfObjective <= 0 && this.model.travelingFood === false){
					this.view.timerButton.click()
				} 
			}, 1000 / this.model.gameFps);
			this.model.timerIntervalId = setInterval(() => {
				this.model.timerTick()
				this.view.updateTimer(this.model.ms);
			}, 1000 / this.model.timerFps);
			this.view.displayStopButton();
		}
	}
}
const app = new Controller(new Model(), new View());
