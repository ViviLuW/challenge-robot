const Application = require("../Classes/Application");
const consoleSpyInfo = jest.spyOn(console, 'info').mockImplementation()
const consoleSpyError = jest.spyOn(console, 'error').mockImplementation()

describe('Unit Tests for the Application Class', () => {

    let app = null;

    beforeEach(() => {
        app = new Application();
    });

    it('Help Screen', () => {
        app.helpScreen();
        expect(console.info).toBeCalledTimes(7);
    });

    it('Test multiple commands', () => {
        app.commandsPrompt("MOVE MOVE");
        expect(console.error).toBeCalledTimes(1);
    });

    it('Test open file', () => {
        app.commandsFile("./text1.txt")
        expect(console.error).toBeCalledTimes(1);
    });
});