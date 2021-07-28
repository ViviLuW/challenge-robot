/** Directions */
const Direction = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 3,
    WEST: 4
}

module.exports = class Robot {

    /** Constructor */
    constructor(boundaries) {
        this.x = 0;
        this.y = 0;
        this.boundaries = boundaries;
        this.direction = Direction.NORTH;
        this.placed = false;
    }

    /** ******* FUNCTIONS ******* */

    /*
     *  @function: report()
     *  @description: Reports the position of the robot
     *  @inputs: NA
     *  @output: {Int} x position
     *           {Int} y position
     *           {String} Direction
     */
    report() {
        return `${this.x},${this.y},${Object.keys(Direction).find(key => Direction[key] === this.direction)}`
    }

    /*
     *  @function: place()
     *  @description: Place the robot to start the simulation
     *  @inputs: {Int} x position
     *           {Int} y position
     *           {String} direction
     *  @output: NA
     */
    place(x, y, direction) {
        if ((x <= this.boundaries.x && x >= 0) && (this.y <= this.boundaries.y && y >= 0) &&
            Object.keys(Direction).includes(direction)) {
            this.x = x;
            this.y = y;
            this.direction = Direction[direction];
            this.placed = true;
        } else {
            console.log('\nThe Robot could not be placed.');
        }
    }

    /*
     *  @function: left()
     *  @description: Turns left the robot
     *  @inputs: NA
     *  @output: NA
     */
    left() {
        return this.direction - 1 === 0 ? this.direction = Direction.WEST : this.direction--;
    }

    /*
     *  @function: right()
     *  @description: Turns left the robot
     *  @inputs: NA
     *  @output: NA
     */
    right() {
        return this.direction + 1 === Object.keys(Direction).length ? this.direction = Direction.NORTH : this.direction++;
    }

    /*
     *  @function: move()
     *  @description: Move the toy robot one unit forward in the direction it is currently facing.
     *  @inputs: NA
     *  @output: NA
     */
    move() {
        switch (this.direction) {
            case Direction.NORTH:
                this.y + 1 < this.boundaries.y ? this.y++ : null;
                break;
            case Direction.EAST:
                this.x + 1 < this.boundaries.x ? this.x++ : null;
                break;
            case Direction.SOUTH:
                this.y - 1 >= 0 ? this.y-- : null;
                break;
            case Direction.WEST:
                this.x - 1  >= 0 ? this.x-- : null;
                break;
        }
    }

}