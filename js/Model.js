import { Maze } from '../modules/Maze.js';
import { Ant } from '../modules/Ant.js';

export class Model {
	constructor() {
		this.intervalId = null;
		this.gameFps = 10;
		this.travelingFood = false;
		this.pheromonesDecreasingSpeed = 1.5;

		this.isRunning = false;
		this.ms = 0;
		this.timerIntervalId = null;
		this.timerFps = 60;
		this.startTime = null;

		this.myMaze = new Maze(14);
		this.myAnts = Array.from(
			{ length: 5 },
			() => new Ant(this.myMaze.startCell)
		);
	}

	startChrono() {
		this.startTime = new Date().getTime() - this.ms;
		this.isRunning = true;
	}

	stopChrono() {
		this.ms = new Date().getTime() - this.startTime;
		this.isRunning = false;
	}

	timerTick() {
		this.ms = new Date().getTime() - this.startTime;
	}

	tick() {
		if (this.isRunning) {
			this.travelingFood = false;
			this.decreasePheromones();
			this.myAnts.forEach((ant) => {
				ant.move(this.myMaze);
				if (ant.foodFound === true) this.travelingFood = true;
			});
		}
	}

	decreasePheromones() {
		this.myMaze.cells.forEach((line) => {
			line.forEach((cell) => {
				if (cell.getType() === 'Free') {
					cell._qty = Math.max(
						cell._qty * (1 - this.pheromonesDecreasingSpeed / 100),
						0
					);
				}
			});
		});
	}
}
