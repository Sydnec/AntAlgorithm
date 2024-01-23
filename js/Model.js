import { Maze } from '../modules/Maze.js';
import { Ant } from '../modules/Ant.js';

export class Model {
	constructor() {
		this.ms = 0;
		this.fps = 15;
		this.intervalId = null;
		this.isRunning = false;
		this.startTime = null;

		this.myMaze = new Maze(20);
		this.myAnts = Array.from({ length: 1 }, () => new Ant(this.myMaze.startCell.x, this.myMaze.startCell.y));
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
			this.myAnts.forEach(ant => {
				ant.move(this.myMaze)
			});
		}
	}
}
