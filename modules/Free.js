import { Cell } from './Cell.js';

export class Free extends Cell {
	constructor(x, y, qty = Math.random()) {
		super(x, y);
		this._qty = qty;
	}

	getQty() {
		return this._qty;
	}

	setQty(newValue) {
		this._qty = newValue;
	}
}
