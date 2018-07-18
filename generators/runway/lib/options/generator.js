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
        throw `"name" must be specified in package.json.`;
    }
    if (!options.airport) {
        throw `"airport" configuration object must be specified in package.json.`;
    }
    if (options.airport.domain !== 'public' && options.airport.domain !== 'private') {
        throw `"airport.domain" configuration object must be specified (as 'public' or 'private') in package.json.  It is: ${options.airport.domain}`;
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