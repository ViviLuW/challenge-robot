const path = require('path');
const argv = require('yargs')
    .usage('Usage: $0 <command> [Options]')
    .command('start', 'Start the simulation', {
        prompt: {
            alias: 'p',
            description: 'Apply commands through prompt'
        },
        file: {
            alias: 'f',
            description: 'Apply commands from a text file'
        }
    })
    .check((argv) => {
        if (argv.f && argv.f === true) {
            return new Error('No file was passed through');
        }

        if (argv.f && path.extname(argv.f) !== '.txt') {
            return new Error('File must be of type .txt');
        }
        return true;
    })
    .example('start', 'Read commands from prompt')
    .example('start -p', 'Read commands from prompt')
    .example('start -f ./tests/exampleC.txt', 'Read instructions from a txt file')
    .options({
        help: {
            alias: 'h',
            describe: 'Get the help screen',
        }
    })
    .demandCommand(1, 'You need at least the start command to begin the Application').argv;

const Application = require('./Classes/Application');

/** Start the Application */
console.log("\n******* WELCOME TO THE TOY ROBOT SIMULATOR *******")

if(argv.file === undefined){console.log("\n ** PROMPT MODE **");}
else{console.log("\n ** FILE MODE **");}

const app = new Application({x: 5, y: 5}, argv.file || null);

app.start();
