import devEnvironmentVariables from "../config/env";
const contentful = require("contentful/dist/contentful.browser.min.js");

const { REACT_APP_CONTENTFUL_SPACE_ID, REACT_APP_CONTENTFUL_ACCESS_TOKEN } =
	devEnvironmentVariables;

export const client = contentful.createClient({
	space: REACT_APP_CONTENTFUL_SPACE_ID,
	accessToken: REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});
