import { Cell } from './Cell.js';

export class Objective extends Cell {
	constructor(x, y, qty = 10) {
		super(x, y);
		this._qty = qty;
	}
}
