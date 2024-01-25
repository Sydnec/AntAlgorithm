import { Cell } from './Cell.js';

export class Free extends Cell {
	constructor(x, y, qty = 0) {
		super(x, y);
		this._qty = qty;
	}
}
