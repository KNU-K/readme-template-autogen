const readline = require("readline");
const { retryUtil } = require("../utils/retry-util");

function askQuestions(questions, retries = 3) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const answers = [];

        const askQuestion = async (index) => {
            if (index === questions.length) {
                rl.close();
                resolve(answers);
                return;
            }

            const answer = await retryUtil(() => {
                return new Promise((res) => {
                    rl.question(questions[index], (answer) => {
                        res(answer);
                    });
                });
            }, retries);

            answers.push(answer);
            askQuestion(index + 1);
        };

        askQuestion(0);
    });
}

module.exports = { askQuestions };
