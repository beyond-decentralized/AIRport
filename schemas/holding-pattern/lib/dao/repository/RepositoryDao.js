"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryDao extends generated_1.BaseRepositoryDao {
    async findReposWithTransactionLogDetailsByIds(repositoryIds) {
        let r;
        let ra;
        let a;
        let u;
        let d;
        let id = air_control_1.Y;
        return await this.db.find.map().tree({
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
        return await this.db.find.map().tree({
            select: {
                ...this.db.duo.getAllFieldsSelect(),
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
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        const resultRows = await airDb.find.sheet({
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
            ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(ground_control_1.ensureChildJsMap(repositoryIdMap, resultRow[0]), resultRow[1]), resultRow[2]), resultRow[3]), resultRow[4]), resultRow[5]).set(resultRow[6], resultRow[7]);
        }
        return repositoryIdMap;
    }
}
exports.RepositoryDao = RepositoryDao;
di_1.DI.set(diTokens_1.REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map