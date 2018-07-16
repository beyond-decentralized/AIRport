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
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let UserDao = class UserDao extends generated_1.BaseUserDao {
    constructor(utils) {
        super(utils);
    }
    findMapByUniqueId(userUniqueIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findFieldsMapByUniqueId(userUniqueIds, {});
        });
    }
    findFieldsMapByUniqueId(userUniqueIds, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMap = new Map();
            const users = yield this.findFieldsByUniqueId(userUniqueIds, {});
            for (const user of users) {
                userMap.set(user.uniqueId, user);
            }
            return userMap;
        });
    }
    findByUniqueId(uniqueIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findFieldsByUniqueId(uniqueIds, {});
        });
    }
    findFieldsByUniqueId(uniqueIds, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let u;
            return yield this.db.find.tree({
                select,
                from: [
                    u = generated_1.Q.User
                ],
                where: u.uniqueId.in(uniqueIds)
            });
        });
    }
};
UserDao = __decorate([
    Service_1.Service(InjectionTokens_2.UserDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], UserDao);
exports.UserDao = UserDao;
//# sourceMappingURL=UserDao.js.map