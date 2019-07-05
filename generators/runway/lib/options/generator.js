"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Created by Papa on 4/24/2016.
 */
const parser_1 = require("./parser");
function readConfiguration(projectPath, programArguments) {
    let flags = parser_1.parseFlags(programArguments);
    let configFilePath = projectPath + '/' + flags.optionsFilePath;
    let configFile = fs.readFileSync(configFilePath);
    let configString = configFile.toString();
    let config = JSON.parse(configString);
    verifyConfiguration(config);
    return config;
}
exports.readConfiguration = readConfiguration;
function verifyConfiguration(options) {
    if (!options.name) {
        throw new Error(`"name" must be specified in package.json.`);
    }
    if (!options.airport) {
        throw new Error(`"airport" configuration object must be specified in package.json.`);
    }
    if (typeof options.airport.domain !== 'string') {
        throw new Error(`"airport.domain" configuration object must be specified 
		(as HTTL Domain URL or 'private') in package.json.  
		It is: ${options.airport.domain}`);
    }
    options.airport.ddlDir = 'src/ddl';
    // if (!options.airport.ddlDir) {
    // 	throw new Error(
    // 	`"airport.ddlDir" configuration property must be specified in package.json.`);
    // }
    options.airport.generatedDir = 'src/generated';
    // if (!options.airport.generatedDir) {
    // 	throw new Error(
    // 	`"airport.generatedDir" configuration property must be specified in package.json.`);
    // }
    if (!options.airport.cacheGeneratedPaths && options.airport.cacheGeneratedPaths !== false) {
        options.airport.cacheGeneratedPaths = false;
    }
    let node_modulesLinks = options.airport.node_modulesLinks;
    if (!node_modulesLinks) {
        node_modulesLinks = {};
        options.airport.node_modulesLinks = node_modulesLinks;
    }
    if (!node_modulesLinks.pathToProject) {
        node_modulesLinks.pathToProject = options.airport.ddlDir;
    }
    else {
        node_modulesLinks.pathToProject = node_modulesLinks.pathToProject + '/' + options.airport.ddlDir;
    }
}
//# sourceMappingURL=generator.js.map