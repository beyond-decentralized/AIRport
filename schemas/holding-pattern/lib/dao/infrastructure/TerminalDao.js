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
const LogicalOperation_1 = require("@airport/air-control/lib/impl/core/operation/LogicalOperation");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let TerminalDao = class TerminalDao extends generated_1.BaseTerminalDao {
    constructor(utils) {
        super(utils);
    }
    async findMapByIds(ownerIds, names, secondIds) {
        const terminalMap = new Map();
        const terminals = await this.findByIds(ownerIds, names, secondIds);
        for (const terminal of terminals) {
            this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(terminalMap, terminal.owner.id), terminal.name)
                .set(terminal.secondId, terminal);
        }
        return terminalMap;
    }
    async findByIds(ownerIds, names, secondIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = generated_1.Q.Terminal
            ],
            where: LogicalOperation_1.and(d.owner.id.in(ownerIds), d.name.in(names), d.secondId.in(secondIds))
        });
    }
};
TerminalDao = __decorate([
    Service_1.Service(InjectionTokens_2.TerminalDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], TerminalDao);
exports.TerminalDao = TerminalDao;
//# sourceMappingURL=TerminalDao.js.map