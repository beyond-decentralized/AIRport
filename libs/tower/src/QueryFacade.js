"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var air_control_1 = require("@airport/air-control");
var di_1 = require("@airport/di");
var ground_control_1 = require("@airport/ground-control");
var diTokens_1 = require("./diTokens");
var QueryFacade = /** @class */ (function () {
    function QueryFacade() {
        var _this = this;
        di_1.DI.get(function (transactionalConnector) {
            _this.connector = transactionalConnector;
        }, ground_control_1.TRANS_CONNECTOR);
    }
    QueryFacade.prototype.find = function (dbEntity, query, queryResultType, cacheForUpdate) {
        if (cacheForUpdate === void 0) { cacheForUpdate = air_control_1.UpdateCacheType.NONE; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.connector.find(this.getPortableQuery(dbEntity, query, queryResultType))];
                    case 1:
                        result = _b.sent();
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
                            (_a = this.databaseFacade).cacheForUpdate.apply(_a, [cacheForUpdate, dbEntity].concat(result));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    QueryFacade.prototype.findOne = function (dbEntity, query, queryResultType, cacheForUpdate) {
        if (cacheForUpdate === void 0) { cacheForUpdate = air_control_1.UpdateCacheType.NONE; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connector.findOne(this.getPortableQuery(dbEntity, query, queryResultType))];
                    case 1:
                        result = _a.sent();
                        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
                            this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, result);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    QueryFacade.prototype.search = function (dbEntity, query, queryResultType, cacheForUpdate) {
        if (cacheForUpdate === void 0) { cacheForUpdate = air_control_1.UpdateCacheType.NONE; }
        return this.connector.search(this.getPortableQuery(dbEntity, query, queryResultType));
    };
    QueryFacade.prototype.searchOne = function (dbEntity, query, queryResultType, cacheForUpdate) {
        if (cacheForUpdate === void 0) { cacheForUpdate = air_control_1.UpdateCacheType.NONE; }
        return this.connector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType));
    };
    QueryFacade.prototype.getPortableQuery = function (dbEntity, query, queryResultType, cacheForUpdate) {
        if (cacheForUpdate === void 0) { cacheForUpdate = false; }
        return {
            jsonQuery: query.toJSON(),
            parameterMap: query.getParameters(),
            queryResultType: queryResultType,
            schemaIndex: dbEntity.schemaVersion.schema.index,
            tableIndex: dbEntity.index,
            values: query.values
        };
    };
    return QueryFacade;
}());
exports.QueryFacade = QueryFacade;
di_1.DI.set(diTokens_1.QUERY_FACADE, QueryFacade);
