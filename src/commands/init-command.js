const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const { askQuestions } = require("../utils/ask-qustions");
const { questions } = require("../constants");
class InitCommand {
    name;
    templateInputPath;
    templateOutputPath;

    constructor(name) {
        this.name = name;
        this.templateInputPath = path.join(__dirname, "../../public", "template", "template.md"); // Ensure this is set properly
        this.templateOutputPath = path.join(process.cwd(), "readme.md");
    }

    makeAction() {
        const template = fs.readFileSync(this.templateInputPath, "utf8");
        const questionsText = questions.map((item) => item.text);
        if (fs.existsSync(this.templateOutputPath)) {
            console.log("File already exists.");
            return;
        }
        askQuestions(questionsText)
            .then((answers) => {
                questions.forEach(({ delimiter, text }, idx) => {
                    console.log(answers[idx]);
                    const changedTemplate = template.replaceAll(delimiter, answers[idx]);
                    console.log("성공적으로 만들어졌습니다.");
                    fs.writeFileSync(this.templateOutputPath, changedTemplate, "utf8");
                });
            })
            .catch(() => {
                console.log("README.md를 만드는 과정에서 오류가 발생했습니다.");
            });
    }

    prepareCommand() {
        return new Command(this.name).description("init 설명").action(this.makeAction.bind(this)); // Use bind to ensure `this` is correct
    }

    static command(name) {
        return new InitCommand(name).prepareCommand();
    }
}

module.exports = InitCommand;
