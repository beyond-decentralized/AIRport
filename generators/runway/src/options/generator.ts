import * as fs from "fs";
import { Configuration } from "./Options";
/**
 * Created by Papa on 4/24/2016.
 */
import { parseFlags } from "./parser";

export function readConfiguration(
	projectPath: string,
	programArguments: string[]
): Configuration {

	let flags = parseFlags(programArguments);
	let configFilePath = projectPath + '/' + flags.optionsFilePath;

	let configFile = fs.readFileSync(configFilePath);
	let configString = configFile.toString();
	let config: Configuration = JSON.parse(configString);
	verifyConfiguration(config);

	return config;
}

function verifyConfiguration(
	options: Configuration
): void {
	if (!options.name) {
		throw `"name" must be specified in package.json.`;
	}
	if (!options.airport) {
		throw `"airport" configuration object must be specified in package.json.`;
	}
	if (typeof options.airport.domain !== 'string') {
		throw `"airport.domain" configuration object must be specified (as HTTL Domain URL or 'private') in package.json.  It is: ${options.airport.domain}`;
	}
	if (!options.airport.ddlDir) {
		throw `"airport.ddlDir" configuration property must be specified in package.json.`;
	}
	if (!options.airport.generatedDir) {
		throw `"airport.generatedDir" configuration property must be specified in package.json.`;
	}
	if (!options.airport.cacheGeneratedPaths && options.airport.cacheGeneratedPaths !== false) {
		options.airport.cacheGeneratedPaths = false;
	}
	let node_modulesLinks = options.airport.node_modulesLinks;
	if (!node_modulesLinks) {
		node_modulesLinks = <any>{};
		options.airport.node_modulesLinks = node_modulesLinks;
	}
	if (!node_modulesLinks.pathToProject) {
		node_modulesLinks.pathToProject = options.airport.ddlDir;
	} else {
		node_modulesLinks.pathToProject = node_modulesLinks.pathToProject + '/' + options.airport.ddlDir;
	}
}