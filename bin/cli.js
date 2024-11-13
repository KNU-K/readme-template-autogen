const { program } = require("commander");
const commands = require("../src/commands");

const Application = () => {
    program.name("cli-tool").description("This is a CLI tool.").version("1.0.0");

    Object.keys(commands).forEach((commandName) => {
        program.addCommand(commands[commandName]);
    });
    program.parse(process.argv);
};

module.exports = Application;
