// require = require('esm')(module);
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
// const { loginIconicsAndSaveAgentSfidAccessToken } = require('./loginIcnxAndSaveAgentSfidToken.js');
// const { getSfidAgentAccessToken } = require('./AgentTokenGetSet.js');

// Define the arrays of locales, realms, and environments
const localesByRealm = {
    europe: ["GB", "DE"],
    america: ["US", "CA"],
    asia: ["JP", "NZ"],
  };
const allLocales = Object.values(localesByRealm).flat();
const realms = Object.keys(localesByRealm);
const environments = ['int', 'dev'];

// const isCIRun = process.env.CI_ENV;
// const workers = isCIRun ? 2 : 4;

// const TOTAL_SHARDS = isCIRun ? 10 : 1;  // Adjust shard count for CI
// const SHARD_INDEX_START = 1;

console.log('process.env.CI IS =>', process.env.CI);
console.log('process.env.CI_ENV IS =>', process.env.CI_ENV);
const workers = process.env.CI ? 2 : 2;
// Set fixed shard values
// const TOTAL_SHARDS = isCIRun ? 5 : 1
const TOTAL_SHARDS = process.env.CI ? 5 : 5;
// const SHARD_INDEX_START = 1; // Start index


const deleteOldAllureResults = (allureResultsDir) => {
    try {
        if (fs.existsSync(allureResultsDir)) {
            fs.rmSync(allureResultsDir, { recursive: true, force: true });
            console.log(`Deleted old Allure results in ${allureResultsDir}`);
        } else {
            console.log(`No old Allure results found in ${allureResultsDir}`);
        }
    } catch (error) {
        console.error(`Error deleting old Allure results: ${error.message}`);
        throw error;
    }
};

const generateAllureReport = (allureResultsDir, allureReportDir) => {
    return new Promise((resolve, reject) => {
        const command = `npx allure generate ${allureResultsDir} --clean -o ${allureReportDir}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${error.message}`);
                reject(error);
            } else if (stderr) {
                console.error(`Error output while generating Allure report: ${stderr}`);
                reject(stderr);
            } else {
                console.log(`Allure report generated at ${allureReportDir}:\n${stdout}`);
                resolve(stdout);
            }
        });
    });
};

const runTest = async (locale, realm, environment, shardIndex) => {
    console.log(`RUNNING TEST FOR LOCALE=> ${locale} in REALM=> ${realm} in ENVIRONMENT=> ${environment}` +
        (shardIndex ? ` on SHARD ${shardIndex}/${TOTAL_SHARDS}` : ""));

    const shardCommand = shardIndex ? ` --shard=${shardIndex}/${TOTAL_SHARDS}` : "";
    const command = `cross-env LOCALE=${locale} REALM=${realm} ENVIRONMENT=${environment} npx playwright test${shardCommand} --workers ${workers}`;

    // const allureResultsDir = `allure-results/${environment}/shard_${shardIndex}`;
    // const allureReportDir = `allure-report/${environment}/shard_${shardIndex}`;

    // Ensure the allure-results directory exists
    // fs.mkdirSync(allureResultsDir, { recursive: true });

    return new Promise((resolve) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${command}: ${error.message}`);
                resolve({
                    locale,
                    realm,
                    environment,
                    shardIndex,
                    status: "failed",
                    output: stderr || error.message,
                });
            } else if (stderr) {
                console.error(`Error output for ${command}: ${stderr}`);
                resolve({
                    locale,
                    realm,
                    environment,
                    shardIndex,
                    status: "failed",
                    output: stderr,
                });
            } else {
                console.log(`Output for ${command}:\n${stdout}`);
                resolve({
                    locale,
                    realm,
                    environment,
                    shardIndex,
                    status: "passed",
                    output: stdout,
                });
            }
        });
    });
};

// Get the arguments from command-line
const args = process.argv.slice(2);
console.log('Arguments of command are => ', args);

let givenLocale, givenRealm, givenEnvironment, givenShard;
for (const arg of args) {
    if (allLocales.includes(arg)) {
        givenLocale = arg;
    } else if (realms.includes(arg)) {
        givenRealm = arg;
    } else if (environments.includes(arg)) {
        givenEnvironment = arg;
    } else if (!isNaN(arg)) {
        givenShard = parseInt(arg, 10);
    } else {
        console.error(`Invalid argument: ${arg}. Please provide a valid locale, realm, or environment.`);
        process.exit(1);
    }
};

console.log(`Parsed arguments - Locale: ${givenLocale}, Realm: ${givenRealm}, Environment: ${givenEnvironment}, Shard: ${givenShard}`);

// Function to determine combinations to run based on given arguments
const determineCombinations = (givenLocale, givenRealm, givenEnvironment) => {
    const combinations = [];
    const environmentsToRun = givenEnvironment ? [givenEnvironment] : environments;
    const realmsToRun = givenRealm ? [givenRealm] : realms;

    for (const environment of environmentsToRun) {
        if (givenLocale) {
            const validRealms = realms.filter(realm => localesByRealm[realm].includes(givenLocale));
            for (const realm of validRealms) {
                combinations.push({ locale: givenLocale, realm, environment });
            }
        } else {
            for (const realm of realmsToRun) {
                const availableLocales = localesByRealm[realm];
                for (const locale of availableLocales) {
                    combinations.push({ locale, realm, environment });
                }
            }
        }
    }

    return combinations;
};

(async () => {
    try {
        const results = [];

        // Determine the combinations to run based on the provided arguments
        const combinations = determineCombinations(givenLocale, givenRealm, givenEnvironment);

        console.log("Start executions");
        console.log("COMBINATIONS ARE ===>> ", combinations);

        // const shardIndex = rocess.env.CI ? givenShard : SHARD_INDEX_START;
        // const shardIndex = process.env.CI ? givenShard : 1;
        const shardIndex = givenShard

        // const allureResultsDir = `allure-results/${givenEnvironment}/shard_${shardIndex}`;
        const allureRportExtraName = process.env.CI ? `-shard_${givenShard}` : "";
        const allureResultsDir = `allure-results`;

        deleteOldAllureResults(allureResultsDir);

        for (const { locale, realm, environment } of combinations) {
            try {
                const result = await runTest(locale, realm, environment, shardIndex);
                results.push(result);
            } catch (error) {
                console.error(
                    `Error running test for ${locale}, ${realm}, ${environment} on shard ${shardIndex}: ${error.message}`
                );
                results.push({
                    locale,
                    realm,
                    environment,
                    shardIndex,
                    status: "failed",
                    output: error.message,
                });
            }
        }

        console.log("All tests completed.");
        results.forEach((result) => {
            console.log(
                `Locale: ${result.locale}, Realm: ${result.realm}, Environment: ${result.environment}, Shard: ${result.shardIndex}, Status: ${result.status}`
            );
            console.log(result.output);
        });

        try {
            // const allureReportDir = `allure-report-${givenEnvironment}-shard_${shardIndex}`;
            const allureReportDir = `allure-report-${givenEnvironment}${allureRportExtraName}`;
            await generateAllureReport(allureResultsDir, allureReportDir);
            console.log(`Allure report generated successfully at ${allureReportDir}.`);
        } catch (error) {
            console.error("Failed to generate Allure report:", error);
        }

        const failedTests = results.filter((result) => result.status === "failed");
        if (failedTests.length > 0) {
            console.error("Some tests failed.");
            process.exit(1);
        } else {
            console.log("All tests passed successfully.");
        }
    } catch (error) {
        console.error("Error during test execution:", error);
        process.exit(1);
    }
})();
