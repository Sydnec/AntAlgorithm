class Model {
    constructor() {
        this.ms = 0;
        this.fps = 30;
        this.intervalId = null;
        this.isRunning = false;
        this.startTime = null;

        // let _grid = [
        //     [0, 0, 0, 0],
        //     [0, 0, 0, 0],
        //     [0, 0, 0, 0]
        // ];
        // let _nbLines   = _grid.length;
        // let _nbColumns = _grid[0].length;
        // let _cellSize  = 100;
    }

    startChrono(){
        this.startTime = new Date().getTime() - this.ms;
        this.isRunning = true;
    }
    
    stopChrono(){
        this.ms = new Date().getTime() - this.startTime;
        this.isRunning = false;
    }

    tick() {
        if(this.isRunning){
            this.ms = new Date().getTime() - this.startTime;
        }
    }
}