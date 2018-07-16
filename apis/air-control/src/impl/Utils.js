var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DatastructureUtils } from "@airport/ground-control";
import { Inject, Service } from "typedi";
import { AirportDatabaseToken, UtilsToken } from "../InjectionTokens";
import { EntityUtils } from "./utils/EntityUtils";
import { FieldUtils } from "./utils/FieldUtils";
import { QMetadataUtils } from "./utils/QMetadataUtils";
import { QueryUtils } from "./utils/QueryUtils";
import { SchemaUtils } from "./utils/SchemaUtils";
let Utils = class Utils extends DatastructureUtils {
    constructor(airportDb) {
        super();
        this.airportDb = airportDb;
        this.Entity = new EntityUtils(this);
        this.Field = new FieldUtils(this);
        this.Medatada = new QMetadataUtils(airportDb, this);
        this.Query = new QueryUtils(this);
        this.Schema = new SchemaUtils(airportDb, this);
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
};
Utils = __decorate([
    Service(UtilsToken),
    __param(0, Inject(_ => AirportDatabaseToken)),
    __metadata("design:paramtypes", [Object])
], Utils);
export { Utils };
//# sourceMappingURL=Utils.js.map