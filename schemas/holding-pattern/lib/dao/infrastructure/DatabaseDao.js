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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogicalOperation_1 = require("@airport/air-control/lib/impl/core/operation/LogicalOperation");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let DatabaseDao = class DatabaseDao extends generated_1.BaseDatabaseDao {
    constructor(utils) {
        super(utils);
    }
    findMapByIds(ownerIds, names, secondIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseMap = new Map();
            const databases = yield this.findByIds(ownerIds, names, secondIds);
            for (const database of databases) {
                this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(databaseMap, database.owner.id), database.name)
                    .set(database.secondId, database);
            }
            return databaseMap;
        });
    }
    findByIds(ownerIds, names, secondIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let d;
            return yield this.db.find.tree({
                select: {},
                from: [
                    d = generated_1.Q.Database
                ],
                where: LogicalOperation_1.and(d.owner.id.in(ownerIds), d.name.in(names), d.secondId.in(secondIds))
            });
        });
    }
};
DatabaseDao = __decorate([
    Service_1.Service(InjectionTokens_2.DatabaseDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], DatabaseDao);
exports.DatabaseDao = DatabaseDao;
//# sourceMappingURL=DatabaseDao.js.map