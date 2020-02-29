/**
 * Created by Papa on 4/24/2016.
 */
export var ArgumentType;
(function (ArgumentType) {
    ArgumentType[ArgumentType["CONFIG"] = 0] = "CONFIG";
})(ArgumentType || (ArgumentType = {}));
export class Flags {
}
export var ARGUMENT_FLAGS = {
    '--config': ArgumentType.CONFIG,
    '-c': ArgumentType.CONFIG
};
//# sourceMappingURL=Arguments.js.map