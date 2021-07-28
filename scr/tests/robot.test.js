const Robot = require('../Classes/Robot');
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

describe('Unit Tests for the Robot Class', () => {

    let robot = null;

    const Direction = {
        NORTH: 1,
        EAST: 2,
        SOUTH: 3,
        WEST: 4
    }

    beforeEach(() => {
        robot = new Robot({x: 5, y: 5});
    });

    it('Creation of new robot with default values', () => {
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    it('Place the robot based on x,y and direction', () => {
        robot.place(2, 2, 'WEST');
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(2);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('Testing the boundary NORTH', () => {
        robot.place(4, 4, 'NORTH');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(4);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('Testing the boundary WEST', () => {
        robot.place(4, 4, 'WEST');
        robot.move();
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(4);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('Testing the boundary SOUTH', () => {
        robot.place(4, 0, 'SOUTH');
        robot.move();
        expect(robot.x).toBe(4);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('Testing the boundary SOUTH', () => {
        robot.place(0, 0, 'SOUTH');
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('Testing the boundary WEST', () => {
        robot.place(0, 0, 'WEST');
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('Incorrect direction', () => {
        robot.place(2, 2, 'SOUH');
        expect(console.log).toBeCalledTimes(1)
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('Move to NORTH', () => {
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('Move to EAST', () => {
        robot.place(1, 1,'EAST');
        robot.move();
        expect(robot.x).toBe(2);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('Move to SOUTH', () => {
        robot.place(1, 1,'SOUTH');
        robot.move();
        expect(robot.x).toBe(1);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('Move to WEST', () => {
        robot.place(1, 1,'WEST');
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('Report position test', () => {
        expect(robot.report()).toBe('0,0,NORTH');
    });

    it('Turn the robot left', () => {
        robot.left();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.WEST);
    });

    it('Turn the robot right', () => {
        robot.right();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.EAST);
    })
});