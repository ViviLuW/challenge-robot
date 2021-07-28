const inquirer = require('inquirer');
const fs = require('fs');
const Robot = require('./Robot');

module.exports = class Application {

    inputCommand = [{
        name : 'action',
        message : 'Enter a command',
        type : 'input'
    }];

    /** Constructor  */
    constructor(grid, filepath) {
        this.filePath = filepath;
        this.robot = null;
        this.grid = grid;
    }

    /** ******* FUNCTIONS ******* */

    /*
     *  @function: helpScreen()
     *  @description: Display the help screen in prompt mode
     *  @inputs: NA
     *  @output: NA
     */
    helpScreen() {
        console.info('\n\n***  HELP SCREEN ***');
        console.info('PLACE x,y,direction: Place the robot on the grid ');
        console.info('MOVE: Move the robot forward one step');
        console.info('LEFT: Turn the robot left');
        console.info('RIGHT: Turn the robot right');
        console.info('REPORT: Display the current position and direction of the robot');
        console.info('STOP: Exit the application \n');

        this.menuPrompt().then();
    }

    /*
     *  @function: menuPrompt
     *  @description: Wait for the commands from the user
     *  @inputs: NA
     *  @output: NA
     */
    async menuPrompt() {
        const cmd = await inquirer.prompt(this.inputCommand);

        console.log('\nCommand To Execute: ', cmd.action.toUpperCase());

        if (cmd.action.toUpperCase() === 'HELP') return this.helpScreen();

        if (cmd.action.toUpperCase() === 'STOP') return this.stop();

        if (!this.robot.placed && !cmd.action.toUpperCase().includes('PLACE')) {
            console.error("\nThe first valid command to the robot is a PLACE command\n");
            return this.menuPrompt();
        }

        await this.commandsPrompt(cmd.action.toUpperCase());
    }

    /*
     *  @function: start
     *  @description: Start the simulation and create the robot
     *  @inputs: NA
     *  @output: Call the functions to execute from file or prompt
     */
    start(){
        this.robot = new Robot(this.grid);
        return this.filePath ? this.commandsFile(this.filePath) : this.menuPrompt();
    }


    /*
     *  @function: stop
     *  @description: Exit the program
     *  @inputs: NA
     *  @output: Exit process
     */
    stop() {
        console.log('\n *** STOPPING THE SIMULATION... HAVE A NICE DAY! ***');
        return process.exit();
    }

    /*
     *  @function: commandsPrompt
     *  @description: Take the user input and check if it is valid
     *  @inputs: {String} command
     *  @output: Returns to the menu of the Prompt
     */
    commandsPrompt(command) {
        //Check if multiple inputs
        if (!/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command) && command.split(" ").length > 1){
            console.error('Please enter one command only');
            return this.menuPrompt();
        }

        // Check if the robot was placed
        if (!command.includes('PLACE') && !this.robot.placed) {
            console.error('The Robot must be placed first');
            return this.menuPrompt();
        }

        console.log(`\n---> Executing ${command.trim()}`);
        this.executeCommand(command.trim());
        //console.log("\n...Command Execution Completed");

        return this.menuPrompt();
    }

    /*
     *  @function: commandsFile
     *  @description: Take the commands from the file filepath
     *  @inputs: {String} filePath
     *  @output: NA
     */
    commandsFile(filepath){
        console.info(`\n...Reading File: ${filepath.trim()}`);

        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error to open the file');
            }
            else{
                const commands = data.split(/\r\n/);
                //console.log('\n....Start to read the file .....');

                for (const command of commands) {
                    if (!command.includes('PLACE') && !this.robot.placed) {
                        console.error('The Robot must be placed first');
                        continue;
                    }

                    if (!/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command) && command.split(" ").length > 1){
                        console.error('Please enter one command only per line');
                        continue;
                    }

                    console.log(`\n---> Executing ${command.trim()}`);
                    this.executeCommand(command.trim());
                }
                //console.info('\nExecution Completed');
            }
        })
    }

    /*
     *  @function: executeCommand
     *  @description: Execute the command
     *  @inputs: {String} command
     *  @output: NA
     */
    executeCommand(command){
        switch (command) {
            case 'MOVE':
                this.robot.move();
                break;
            case 'LEFT':
                this.robot.left();
                break;
            case 'RIGHT':
                this.robot.right();
                break;
            case 'REPORT':
                console.info('\nCurrent Location: ', (this.robot.report()));
                break;
            default:
                if(command.includes('PLACE')) {
                    const startPoint = command.split(/[ ,]+/);
                    this.robot.place(parseInt(startPoint[1]), parseInt(startPoint[2]), startPoint[3]);
                } else {
                    console.error('\nInvalid command...\n');
                }
                break;
        }
    }
}