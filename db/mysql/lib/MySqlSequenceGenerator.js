"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const sequence_1 = require("@airport/sequence");
class MySqlSequenceGenerator extends sequence_1.SequenceGenerator {
    nativeGenerate() {
        throw new Error('Method not implemented.');
    }
}
exports.MySqlSequenceGenerator = MySqlSequenceGenerator;
di_1.DI.set(check_in_1.SEQUENCE_GENERATOR, MySqlSequenceGenerator);
//# sourceMappingURL=MySqlSequenceGenerator.js.map