import { Cell } from './Cell.js';

export class Objective extends Cell {
	constructor(x, y, qty = 1.0) {
		super(x, y);
		this._qty = qty;
	}
}
