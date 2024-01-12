class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbours = {};
        this.top = this.bottom = this.right = this.left = true;
    }
}

class Maze {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.start = {};
        this.end = {};


        for (let y = 0; y < this.size; ++y) {
            this.cells.push([]);
            for (let x = 0; x < this.size; ++x) {
                this.cells[y].push(new Cell(x, y));
            }
        }
    }

    generateMaze() {
        let visited = new Set();
        let stack = [];
        
        let startCell = this.cells[Math.floor(Math.random() * this.size)][Math.floor(Math.random() * this.size)];
        stack.push(startCell);
        visited.add(startCell);

        while (stack.length > 0) {
            let currentCell = stack.pop();
            
            let neighbours = this.getUnvisitedNeighbours(currentCell, visited);

            if (neighbours.length > 0) {
                stack.push(currentCell);
                let chosenNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
                this.removeWalls(currentCell, chosenNeighbour);

                visited.add(chosenNeighbour);
                stack.push(chosenNeighbour);
            }
        }
    }

    getUnvisitedNeighbours(cell, visited) {
        let neighbours = [];

        let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; 
        directions.forEach(([dx, dy]) => {
            let x = cell.x + dx;
            let y = cell.y + dy;

            if (x >= 0 && y >= 0 && x < this.size && y < this.size && !visited.has(this.cells[y][x])) {
                neighbours.push(this.cells[y][x]);
            }
        });

        return neighbours;
    }

    removeWalls(cell1, cell2) {
        let x = cell1.x - cell2.x;
        let y = cell1.y - cell2.y;

        if (x === 1) {
            cell1.left = cell2.right = false;
        } else if (x === -1) {
            cell1.right = cell2.left = false;
        }

        if (y === 1) {
            cell1.top = cell2.bottom = false;
        } else if (y === -1) {
            cell1.bottom = cell2.top = false;
        }
    }


}


const myMaze = new Maze(15);
myMaze.generateMaze();


const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function blankCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


blankCanvas();


function drawWalls(cell) {
    if (cell.left) {
        ctx.moveTo(cell.x * 10, cell.y * 10);
        ctx.lineTo(cell.x * 10, cell.y * 10 + 10);
    }

    if (cell.bottom) {
        ctx.moveTo(cell.x * 10, cell.y * 10 + 10);
        ctx.lineTo(cell.x * 10 + 10, cell.y * 10 + 10);
    }

    if (cell.right) {
        ctx.moveTo(cell.x * 10 + 10, cell.y * 10 + 10);
        ctx.lineTo(cell.x * 10 + 10, cell.y * 10);
    }

    if (cell.top) {
        ctx.moveTo(cell.x * 10 + 10, cell.y * 10);
        ctx.lineTo(cell.x * 10, cell.y * 10);
    }

    ctx.stroke();
}


myMaze.cells.forEach(row => {
    row.forEach(cell => {
        drawWalls(cell);
    });
});