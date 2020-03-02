"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 4/24/2016.
 */
const Arguments_1 = require("./Arguments");
function parseFlags(programArguments) {
    let flags = new Arguments_1.Flags();
    let argumentGroups = getArgumentGroups(programArguments);
    let foundFlags = {};
    argumentGroups.forEach((argumentGroup) => {
        let flag = argumentGroup[0];
        let argType = Arguments_1.ARGUMENT_FLAGS[flag];
        switch (argType) {
            case Arguments_1.ArgumentType.CONFIG:
                if (foundFlags[argType]) {
                    throw new Error(`Flag already specified '${flag}'`);
                }
                verifyArgumentGroupLength(argumentGroup, 2);
                foundFlags[argType] = true;
                flags.optionsFilePath = argumentGroup[1];
            default:
                throw new Error(`Unexpected flag '${flag}'`);
        }
    });
    if (!flags.optionsFilePath) {
        flags.optionsFilePath = 'package.json';
    }
    return flags;
}
exports.parseFlags = parseFlags;
function verifyArgumentGroupLength(argumentGroup, expectedLength) {
    if (argumentGroup.length !== expectedLength) {
        throw new Error(`Expecting '${expectedLength - 1}' values for '${argumentGroup[0]}' flag`);
    }
}
function getArgumentGroups(programArguments) {
    let optionGroups = [];
    let currentOptionGroup;
    for (let i = 2; i < programArguments.length; i++) {
        let currentArgument = programArguments[i];
        // we have a new option
        if (currentArgument.indexOf('-') === 0) {
            if (currentOptionGroup) {
                optionGroups.push(currentOptionGroup);
            }
            currentOptionGroup = [];
        }
        currentOptionGroup.push(currentArgument);
    }
    if (currentOptionGroup) {
        optionGroups.push(currentOptionGroup);
    }
    return optionGroups;
}
//# sourceMappingURL=parser.js.map