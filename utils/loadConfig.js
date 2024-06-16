const path = require("path");
const fs = require("fs");

function loadConfig(realm, environment) {
  // function loadConfig(locale, realm, environment) {
  // const localesPath = path.resolve(__dirname, '../config/localesData.json');
  // const localeConfigs = JSON.parse(fs.readFileSync(localesPath, 'utf-8'));
  // const localeConfig = localeConfigs[locale];

  // if (!localeConfig) {
  //     throw new Error(`Locale configuration not found for: ${locale}`);
  // }

  let baseUrl;
  // , business_group, client_id, client_secret

  switch (`${environment}_${realm}`) {
    case "dev_america":
    case "dev_europe":
    case "dev_asia":
      baseUrl = process.env.DEV_ALL_REALM_BASE_URL;
      break;
    case "int_america":
      baseUrl = process.env.INT_REALM_US_BASE_URL;
      break;
    case "int_europe":
      baseUrl = process.env.INT_REALM_EU_BASE_URL;
      break;
    case "int_asia":
      baseUrl = process.env.INT_REALM_AS_BASE_URL;
      break;
    default:
      throw new Error(
        `Unknown environment-realm combination: ${environment}_${realm}`
      );
  }

  const config = {
    baseUrl,
    // business_group,
    // client_id,
    // client_secret,
    // commonData: localeConfig,
  };

  return config;
}

module.exports = { loadConfig };
