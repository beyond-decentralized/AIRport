"use strict";
/**
 * Created by Papa on 4/24/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ArgumentType;
(function (ArgumentType) {
    ArgumentType[ArgumentType["CONFIG"] = 0] = "CONFIG";
})(ArgumentType = exports.ArgumentType || (exports.ArgumentType = {}));
class Flags {
}
exports.Flags = Flags;
exports.ARGUMENT_FLAGS = {
    '--config': ArgumentType.CONFIG,
    '-c': ArgumentType.CONFIG
};
//# sourceMappingURL=Arguments.js.map