import { Maze } from '../modules/Maze.js';

export class Model {
	constructor() {
		this.ms = 0;
		this.fps = 30;
		this.intervalId = null;
		this.isRunning = false;
		this.startTime = null;

		this.myMaze = new Maze(20);
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
