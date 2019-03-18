"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
const EntityUtils_1 = require("./utils/EntityUtils");
const FieldUtils_1 = require("./utils/FieldUtils");
const QueryUtils_1 = require("./utils/QueryUtils");
const SchemaUtils_1 = require("./utils/SchemaUtils");
class Utils extends ground_control_1.DatastructureUtils {
    constructor() {
        super();
        di_1.DI.get((airportDb, Metadata) => {
            this.airportDb = airportDb;
            this.Metadata = Metadata;
            this.Entity = new EntityUtils_1.EntityUtils(this);
            this.Field = new FieldUtils_1.FieldUtils(this);
            this.Query = new QueryUtils_1.QueryUtils(this);
            this.Schema = new SchemaUtils_1.SchemaUtils(this.airportDb, this);
        }, diTokens_1.AIRPORT_DATABASE, diTokens_1.Q_METADATA_UTILS);
    }
    strsToNums(strings) {
        return strings.map(str => parseInt(str));
    }
    objectExists(object) {
        return object !== null && object !== undefined;
    }
    valuesEqual(value1, value2, checkChildObjects = false) {
        if (typeof value1 === 'object') {
            if (value1 instanceof Date) {
                if (value2 instanceof Date) {
                    return value1.getTime() === value2.getTime();
                }
                else {
                    return false;
                }
            }
            else {
                if (typeof value2 !== 'object') {
                    return false;
                }
                if (!checkChildObjects) {
                    // Skip child objects
                    return true;
                }
                let checkedKeys = {};
                for (let key in value1) {
                    checkedKeys[key] = true;
                    if (!this.valuesEqual(value1[key], value2[key], checkChildObjects)) {
                        return false;
                    }
                }
                for (let key in value2) {
                    if (!checkedKeys[key]) {
                        return false;
                    }
                }
                return true;
            }
        }
        if (!value1) {
            if (value1 === '') {
                return value2 === '';
            }
            else if (value1 === false) {
                return value2 === false;
            }
            else if (value1 === 0) {
                return value2 === 0;
            }
            if (value2 === '' || value2 === false || value2 === 0) {
                return false;
            }
            // treat undefined and null as same value
            return (!value2);
        }
        if (!value2) {
            return false;
        }
        return value1 === value2;
    }
    compareNumbers(number1, number2) {
        if (number1 < number2) {
            return -1;
        }
        if (number1 > number2) {
            return 1;
        }
        return 0;
    }
}
exports.Utils = Utils;
di_1.DI.set(diTokens_1.UTILS, Utils);
//# sourceMappingURL=Utils.js.map