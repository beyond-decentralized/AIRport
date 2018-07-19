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
const air_control_1 = require("@airport/air-control");
const typedi_1 = require("typedi");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let ActorDao = class ActorDao extends generated_1.BaseActorDao {
    constructor(utils) {
        super(utils);
    }
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a.id.in(actorIds));
    }
    async findMapsWithDetailsByGlobalIds(randomIds, userIds, databaseIds, actorMap, actorMapById) {
        const actors = await this.findWithDetailsByGlobalIds(randomIds, userIds, databaseIds);
        for (const actor of actors) {
            this.utils.ensureChildJsMap(actorMap, actor.user.id)
                .set(actor.database.id, actor);
            actorMapById.set(actor.id, actor);
        }
    }
    async findWithDetailsByGlobalIds(randomIds, userIds, databaseIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => air_control_1.and(a.randomId.in(randomIds), a.database.id.in(databaseIds), a.user.id.in(userIds)));
    }
    async findWithDetailsAndGlobalIdsByWhereClause(getWhereClause) {
        let a;
        let u;
        const id = air_control_1.Y;
        return await this.db.find.tree({
            select: {
                id,
                randomId: air_control_1.Y,
                user: {
                    id,
                },
                database: {
                    id
                }
            },
            from: [
                a = generated_1.Q.Actor
            ],
            where: getWhereClause(a)
        });
    }
};
ActorDao = __decorate([
    typedi_1.Service(InjectionTokens_1.ActorDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], ActorDao);
exports.ActorDao = ActorDao;
//# sourceMappingURL=ActorDao.js.map