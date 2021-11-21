import { AIRPORT_DATABASE, and, Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { REPOSITORY_DAO } from '../../tokens';
import { BaseRepositoryDao, Q, } from '../../generated/generated';
export class RepositoryDao extends BaseRepositoryDao {
    async findReposWithTransactionLogDetailsByIds(repositoryIds) {
        let r;
        let ra;
        let a;
        let u;
        let d;
        let id = Y;
        return await this.db.find.map().tree({
            select: {
                createdAt: Y,
                uuId: Y,
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
                r = Q.Repository,
                ra = r.repositoryActors.innerJoin(),
                a = ra.actor.innerJoin(),
                u = a.user.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: 
            // and(
            r.id.in(repositoryIds),
            // d.name.equals(dbName),
            // u.uniqueId.equals(userEmail)
            // )
        });
    }
    async findReposWithDetailsAndSyncNodeIds(repositoryIds) {
        let r;
        const id = Y;
        return await this.db.find.tree({
            select: {
                id,
                ownerActor: {
                    id
                },
                createdAt: Y,
                uuId: Y
            },
            from: [
                r = Q.Repository
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
        let id = Y;
        return await this.db.find.map().tree({
            select: {
                ...this.db.duo.select.fields,
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
                r = Q.Repository,
                ra = r.repositoryActors.innerJoin(),
                a = ra.actor.innerJoin(),
                u = a.user.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: and(r.id.in(repositoryIdsInClause), d.name.equals(dbName), u.email.equals(userEmail))
        });
    }
    async findReposWithGlobalIds(repositoryIds) {
        const repositoryMapById = new Map();
        let r;
        let a;
        let u;
        const repositories = await this.db.find.tree({
            select: {
                id: Y,
                createdAt: Y,
                uuId: Y,
                ownerActor: {
                    id: Y,
                    user: {
                        privateId: Y
                    },
                }
            },
            from: [
                r = Q.Repository,
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
    async findLocalRepoIdsByGlobalIds(createdAts, uuIds, ownerActorRandomIds, ownerUserUniqueIds, ownerTerminalNames, ownerTerminalSecondIds, ownerTerminalOwnerUserUniqueIds) {
        const repositoryIdMap = new Map();
        let r;
        let oa;
        let od;
        let odu;
        let ou;
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const resultRows = await airDb.find.sheet({
            from: [
                r = Q.Repository,
                oa = r.ownerActor.innerJoin(),
                ou = oa.user.innerJoin(),
                od = oa.terminal.innerJoin(),
                odu = od.owner.innerJoin(),
            ],
            select: [
                odu.privateId,
                od.name,
                od.secondId,
                ou.privateId,
                oa.uuId,
                r.createdAt,
                r.uuId,
                r.id,
            ],
            where: and(r.createdAt.in(createdAts), r.uuId.in(uuIds), oa.uuId.in(ownerActorRandomIds), ou.privateId.in(ownerUserUniqueIds), od.name.in(ownerTerminalNames), od.secondId.in(ownerTerminalSecondIds), odu.privateId.in(ownerTerminalOwnerUserUniqueIds))
        });
        for (const resultRow of resultRows) {
            ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(repositoryIdMap, resultRow[0]), resultRow[1]), resultRow[2]), resultRow[3]), resultRow[4]), resultRow[5].getTime()).set(resultRow[6], resultRow[7]);
        }
        return repositoryIdMap;
    }
    async findReposForAppSignature(applicationSignature) {
        let repo;
        let act;
        let app;
        return await this.db.find.tree({
            select: {},
            from: [
                repo = Q.Repository,
                act = repo.ownerActor.innerJoin(),
                app = act.application.innerJoin()
            ],
            where: app.signature.equals(applicationSignature)
        });
    }
}
DI.set(REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map