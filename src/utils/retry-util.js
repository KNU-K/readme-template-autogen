function retryUtil(promptFn, retries = 3) {
    return new Promise((resolve) => {
        const attempt = () => {
            promptFn()
                .then((answer) => {
                    if (!answer.trim() && retries > 0) {
                        console.log(`Please provide an answer. You have ${retries} retry attempts left.`);
                        retries--;
                        attempt(); // 재시도
                        return;
                    }

                    if (!answer.trim() && retries <= 0) {
                        console.log("No more retries. Proceeding with an empty answer.");
                        resolve("");
                        return;
                    }
                    resolve(answer);
                })
                .catch(() => {
                    console.log("Something went wrong. Please try again.");
                    attempt();
                });
        };

        attempt();
    });
}

module.exports = { retryUtil };
