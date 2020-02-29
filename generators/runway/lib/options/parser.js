/**
 * Created by Papa on 4/24/2016.
 */
import { ARGUMENT_FLAGS, ArgumentType, Flags } from './Arguments';
export function parseFlags(programArguments) {
    let flags = new Flags();
    let argumentGroups = getArgumentGroups(programArguments);
    let foundFlags = {};
    argumentGroups.forEach((argumentGroup) => {
        let flag = argumentGroup[0];
        let argType = ARGUMENT_FLAGS[flag];
        switch (argType) {
            case ArgumentType.CONFIG:
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