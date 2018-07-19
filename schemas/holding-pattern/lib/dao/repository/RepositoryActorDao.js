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
const Inject_1 = require("typedi/decorators/Inject");
const __1 = require("../..");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let RepositoryActorDao = class RepositoryActorDao extends generated_1.BaseRepositoryActorDao {
    constructor(utils) {
        super(utils);
    }
    async findAllForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        let ra, a, d;
        const id = air_control_1.Y;
        return await this.db.find.tree({
            select: {
                repository: {
                    id
                },
                actor: {
                    id
                }
            },
            from: [
                ra = __1.Q.RepositoryActor,
                a = ra.actor.innerJoin(),
                d = a.database.innerJoin()
            ],
            where: air_control_1.and(ra.repository.id.in(repositoryIds), d.isLocal.equals(true))
        });
    }
    async findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        const records = await this.findAllForLocalActorsWhereRepositoryIdIn(repositoryIds);
        const actorIdMapByRepositoryId = new Map();
        for (const record of records) {
            this.utils.ensureChildJsSet(actorIdMapByRepositoryId, record.repository.id)
                .add(record.actor.id);
        }
        return actorIdMapByRepositoryId;
    }
};
RepositoryActorDao = __decorate([
    typedi_1.Service(InjectionTokens_1.RepositoryActorDaoToken),
    __param(0, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], RepositoryActorDao);
exports.RepositoryActorDao = RepositoryActorDao;
//# sourceMappingURL=RepositoryActorDao.js.map