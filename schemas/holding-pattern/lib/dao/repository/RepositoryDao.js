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
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const generated_1 = require("../../generated/generated");
const InjectionTokens_2 = require("../../InjectionTokens");
let RepositoryDao = class RepositoryDao extends generated_1.BaseRepositoryDao {
    constructor(utils) {
        super(utils);
    }
    async findReposWithTransactionLogDetailsByIds(repositoryIds) {
        let r;
        let ra;
        let a;
        let u;
        let d;
        let id = air_control_1.Y;
        return await this.db.find.mapped.tree({
            select: {
                orderedId: air_control_1.Y,
                randomId: air_control_1.Y,
                ownerActor: {
                    user: {
                        id
                    },
                    terminal: {
                        id
                    }
                },
            },
            from: [
                r = generated_1.Q.Repository,
                ra = r.repositoryActors.innerJoin(),
                a = ra.actor.innerJoin(),
                u = a.user.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: 
            // and(
            r.id.in(repositoryIds),
        });
    }
    async findReposWithDetailsAndSyncNodeIds(repositoryIds) {
        let r;
        const id = air_control_1.Y;
        return await this.db.find.tree({
            select: {
                id,
                ownerActor: {
                    id
                },
                orderedId: air_control_1.Y,
                randomId: air_control_1.Y
            },
            from: [
                r = generated_1.Q.Repository
            ],
            where: r.id.in(repositoryIds)
        });
    }
    async findReposWithDetailsByIds(repositoryIdsInClause, dbName, userEmail) {
        let r;
        let ra;
        let a;
        let u;
        let d;
        let id = air_control_1.Y;
        return await this.db.find.mapped.tree({
            select: {
                ...this.db.dmo.getAllFieldsSelect(),
                repositoryActors: {
                    actor: {
                        user: {
                            id
                        },
                        terminal: {
                            id
                        }
                    }
                },
            },
            from: [
                r = generated_1.Q.Repository,
                ra = r.repositoryActors.innerJoin(),
                a = ra.actor.innerJoin(),
                u = a.user.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: air_control_1.and(r.id.in(repositoryIdsInClause), d.name.equals(dbName), u.uniqueId.equals(userEmail))
        });
    }
    async findReposWithGlobalIds(repositoryIds) {
        const repositoryMapById = new Map();
        let r;
        let a;
        let u;
        const repositories = await this.db.find.tree({
            select: {
                id: air_control_1.Y,
                orderedId: air_control_1.Y,
                randomId: air_control_1.Y,
                ownerActor: {
                    id: air_control_1.Y,
                    user: {
                        uniqueId: air_control_1.Y
                    },
                }
            },
            from: [
                r = generated_1.Q.Repository,
                a = r.ownerActor.innerJoin(),
                u = a.user.innerJoin()
            ],
            where: r.id.in(repositoryIds)
        });
        for (const repository of repositories) {
            repositoryMapById.set(repository.id, repository);
        }
        return repositoryMapById;
    }
    async findLocalRepoIdsByGlobalIds(orderedIds, randomIds, ownerActorRandomIds, ownerUserUniqueIds, ownerTerminalNames, ownerTerminalSecondIds, ownerTerminalOwnerUserUniqueIds) {
        const repositoryIdMap = new Map();
        let r;
        let oa;
        let od;
        let odu;
        let ou;
        const resultRows = await this.db.common.find.sheet({
            from: [
                r = generated_1.Q.Repository,
                oa = r.ownerActor.innerJoin(),
                ou = oa.user.innerJoin(),
                od = oa.terminal.innerJoin(),
                odu = od.owner.innerJoin(),
            ],
            select: [
                odu.uniqueId,
                od.name,
                od.secondId,
                ou.uniqueId,
                oa.randomId,
                r.orderedId,
                r.randomId,
                r.id,
            ],
            where: air_control_1.and(r.orderedId.in(orderedIds), r.randomId.in(randomIds), oa.randomId.in(ownerActorRandomIds), ou.uniqueId.in(ownerUserUniqueIds), od.name.in(ownerTerminalNames), od.secondId.in(ownerTerminalSecondIds), odu.uniqueId.in(ownerTerminalOwnerUserUniqueIds))
        });
        for (const resultRow of resultRows) {
            this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(repositoryIdMap, resultRow[0]), resultRow[1]), resultRow[2]), resultRow[3]), resultRow[4]), resultRow[5]).set(resultRow[6], resultRow[7]);
        }
        return repositoryIdMap;
    }
};
RepositoryDao = __decorate([
    typedi_1.Service(InjectionTokens_2.RepositoryDaoToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], RepositoryDao);
exports.RepositoryDao = RepositoryDao;
//# sourceMappingURL=RepositoryDao.js.map