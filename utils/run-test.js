const { exec } = require("child_process");
// const fs = require("fs");

const path = require("path");

// Absolute path to cross-env
const crossEnvPath = path.join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  "cross-env"
);

// Define the arrays of locales, realms, and environments
const localesByRealm = {
  europe: ["GB", "DE"],
  america: ["US", "CA"],
  asia: ["JP", "NZ"],
};
const allLocales = Object.values(localesByRealm).flat();
const realms = Object.keys(localesByRealm);

const environments = ["int", "dev"];

// Function to run all tests for a specific combination
const runTest = (locale, realm, environment) => {
  return new Promise((resolve) => {
    // Define the command string with locale, realm, and environment parameters using cross-env
    const command = `${crossEnvPath} LOCALE=${locale} REALM=${realm} ENVIRONMENT=${environment} npx playwright test`;
    // const command = `cross-env LOCALE=${locale} REALM=${realm} ENVIRONMENT=${environment} npx playwright test`;
    // const command = "npx playwright test";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${command}: ${error.message}`);
        resolve({
          locale,
          realm,
          environment,
          status: "failed",
          output: stderr|| error.message,
        });
      } else if (stderr) {
        console.error(`Error output for ${command}: ${stderr}`);
        resolve({
          locale,
          realm,
          environment,
          status: "failed",
          output: stderr,
        });
      } else {
        console.log(`Output for ${command}:\n${stdout}`);
        resolve({
          locale,
          realm,
          environment,
          status: "passed",
          output: stdout,
        });
      }
    });
  });
};

// Function to delete old Allure results
// const deleteOldAllureResults = () => {
//   const allureResultsDir = "allure-results";
//   if (fs.existsSync(allureResultsDir)) {
//     fs.rmSync(allureResultsDir, { recursive: true, force: true });
//   }
// };

// Function to delete old Allure report
// const deleteOldAllureReport = () => {
//   const allureRportDir = "allure-report";
//   if (fs.existsSync(allureRportDir)) {
//     fs.rmSync(allureRportDir, { recursive: true, force: true });
//   }
// };

// Generate combinations based on the provided arguments
const determineCombinations = (locale, realm, environment) => {
  const combinations = [];
  if (locale && realm && environment) {
    combinations.push({ locale, realm, environment });
  } else if (!locale && realm && environment) {
    for (const loc of localesByRealm[realm]) {
      combinations.push({ locale: loc, realm, environment });
    }
  } else if (locale && !realm && environment) {
    for (const r of realms) {
      combinations.push({ locale, realm: r, environment });
    }
  } else if (locale && realm && !environment) {
    for (const env of environments) {
      combinations.push({ locale, realm, environment: env });
    }
  } else {
    for (const loc of allLocales) {
      for (const r of realms) {
        for (const env of environments) {
          combinations.push({ locale: loc, realm: r, environment: env });
        }
      }
    }
  }
  return combinations;
};

// Get the arguments from command-line
const args = process.argv.slice(2);

let givenLocale, givenRealm, givenEnvironment;
for (const arg of args) {
  if (allLocales.includes(arg)) {
    givenLocale = arg;
  } else if (realms.includes(arg)) {
    givenRealm = arg;
  } else if (environments.includes(arg)) {
    givenEnvironment = arg;
  } else {
    console.error(
      `Invalid argument: ${arg}. Please provide a valid locale, realm, or environment.`
    );
    process.exit(1);
  }
}

// Function to generate Allure report
const generateAllureReport = () => {
  return new Promise((resolve, reject) => {
    exec(
      "npx allure generate allure-results --clean -o allure-report",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error generating Allure report: ${error.message}`);
          reject(error);
        } else if (stderr) {
          console.error(
            `Error output while generating Allure report: ${stderr}`
          );
          reject(stderr);
        } else {
          console.log(`Allure report generated:\n${stdout}`);
          resolve(stdout);
        }
      }
    );
  });
};

// Run the tests
(async () => {
  const results = [];
  // Determine the combinations to run based on the provided arguments
  const combinations = determineCombinations(
    givenLocale,
    givenRealm,
    givenEnvironment
  );

  console.log("start executions");
  // console.log("COMBINATIONS ARE ===>> ", combinations);
  // deleteOldAllureResults();
  // deleteOldAllureReport();

  //   const result = await runTest();
  //   results.push(result);
  // Run tests for each combination
  // for (const { locale, realm, environment } of combinations) {
  //   const result = await runTest(locale, realm, environment);
  //   results.push(result);
  // }

  //  Imporooved version for run all tests
  for (const { locale, realm, environment } of combinations) {
    try {
      const result = await runTest(locale, realm, environment);
      results.push(result);
    } catch (error) {
      console.error(
        `Error running test for ${locale}, ${realm}, ${environment}: ${error.message}`
      );
      results.push({
        locale,
        realm,
        environment,
        status: "failed",
        output: error.message,
      });
    }
  }

  console.log("All tests completed.");
  results.forEach((result) => {
    console.log(
      `Locale: ${result.locale}, Realm: ${result.realm}, Environment: ${result.environment}, Status: ${result.status}`
    );
    console.log(result.output);
  });

  // Generate the Allure report (locally not blocking if not generated, can dispaly report with commande "npx allure serve allure-results" BUT for github actions report must be generated in all cases to can deploy it in github pages )
  try {
    await generateAllureReport();
  } catch (error) {
    console.error("Failed to generate Allure report:", error);
  }

  // Optionally, exit with a non-zero status if any tests failed
  const failedTests = results.filter((result) => result.status === "failed");
  if (failedTests.length > 0) {
    process.exit(1);
  }
})();
