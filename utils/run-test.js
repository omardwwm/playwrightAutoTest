const { exec } = require('child_process');
const fs = require('fs');

// Function to run all tests for a specific combination
const runTest = () => {
    return new Promise((resolve) => {
        const command = "npx playwright test";
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${command}: ${error.message}`);
                resolve({ status: 'failed', output: stderr });
            } else if (stderr) {
                console.error(`Error output for ${command}: ${stderr}`);
                resolve({ status: 'failed', output: stderr });
            } else {
                console.log(`Output for ${command}:\n${stdout}`);
                resolve({ status: 'passed', output: stdout });
            }
        });
    });
};

const deleteOldAllureResults = () => {
    if (fs.existsSync('allure-results')) {
        fs.rmdirSync('allure-results'), { recursive: true };
    }
};

// Function to generate Allure report
const generateAllureReport = () => {
    return new Promise((resolve, reject) => {
        exec('npx allure generate --clean', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${error.message}`);
                reject(error);
            } else if (stderr) {
                console.error(`Error output while generating Allure report: ${stderr}`);
                reject(stderr);
            } else {
                console.log(`Allure report generated:\n${stdout}`);
                resolve(stdout);
            }
        });
    });
};

// Run the tests
(async () => {
    const results = [];
    // Determine the combinations to run based on the provided arguments
    // const combinations = determineCombinations(givenLocale, givenRealm, givenEnvironment);
    deleteOldAllureResults();
    // for (const { locale, realm, environment } of combinations) {
    // }
    const result = await runTest();
    results.push(result);

    console.log('All tests completed.');
    results.forEach(result => {
        console.log(`Status: ${result.status}`);
        console.log(result.output);
    });

    // Optionally, exit with a non-zero status if any tests failed
    const failedTests = results.filter(result => result.status === 'failed');
    if (failedTests.length > 0) {
        process.exit(1);
    }
    await generateAllureReport();
})();