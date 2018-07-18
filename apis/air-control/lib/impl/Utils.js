"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const EntityUtils_1 = require("./utils/EntityUtils");
const FieldUtils_1 = require("./utils/FieldUtils");
const QMetadataUtils_1 = require("./utils/QMetadataUtils");
const QueryUtils_1 = require("./utils/QueryUtils");
const SchemaUtils_1 = require("./utils/SchemaUtils");
let Utils = class Utils extends ground_control_1.DatastructureUtils {
    constructor(airportDb) {
        super();
        this.airportDb = airportDb;
        this.Entity = new EntityUtils_1.EntityUtils(this);
        this.Field = new FieldUtils_1.FieldUtils(this);
        this.Medatada = new QMetadataUtils_1.QMetadataUtils(airportDb, this);
        this.Query = new QueryUtils_1.QueryUtils(this);
        this.Schema = new SchemaUtils_1.SchemaUtils(airportDb, this);
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
    typedi_1.Service(InjectionTokens_1.UtilsToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __metadata("design:paramtypes", [Object])
], Utils);
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map