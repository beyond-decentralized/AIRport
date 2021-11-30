import { AIRPORT_DATABASE, and, Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { REPOSITORY_DAO } from '../../tokens';
import { BaseRepositoryDao, Q, } from '../../generated/generated';
export class RepositoryDao extends BaseRepositoryDao {
    async getRepositoryLoadInfo(repositorySource, repositoryUuId) {
        let r;
        let rth;
        let th;
        let t;
        return await this.db.findOne.tree({
            select: {
                immutable: Y,
                repositoryTransactionHistory: {
                    saveTimestamp: Y
                }
            },
            from: [
                r = Q.Repository,
                rth = r.repositoryTransactionHistory.innerJoin(),
                th = rth.transactionHistory.innerJoin(),
                t = th.terminal.innerJoin()
            ],
            where: and(r.source.equals(repositorySource), r.uuId.equals(repositoryUuId), t.isLocal.equals(false))
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
                        uuId: Y
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
    async findLocalRepoIdsByGlobalIds(createdAts, uuIds, ownerActorRandomIds, ownerUserUniqueIds, ownerTerminalUuids, ownerTerminalOwnerUserUniqueIds) {
        const repositoryIdMap = new Map();
        let repo;
        let ownerActor;
        let terminal;
        let terminalUser;
        let repoOwnerUser;
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const resultRows = await airDb.find.sheet({
            from: [
                repo = Q.Repository,
                ownerActor = repo.ownerActor.innerJoin(),
                repoOwnerUser = ownerActor.user.innerJoin(),
                terminal = ownerActor.terminal.innerJoin(),
                terminalUser = terminal.owner.innerJoin(),
            ],
            select: [
                terminalUser.uuId,
                terminal.uuId,
                repoOwnerUser.uuId,
                ownerActor.uuId,
                repo.createdAt,
                repo.uuId,
                repo.id,
            ],
            where: and(repo.createdAt.in(createdAts), repo.uuId.in(uuIds), ownerActor.uuId.in(ownerActorRandomIds), repoOwnerUser.uuId.in(ownerUserUniqueIds), terminal.uuId.in(ownerTerminalUuids), terminalUser.uuId.in(ownerTerminalOwnerUserUniqueIds))
        });
        for (const resultRow of resultRows) {
            ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(repositoryIdMap, resultRow[0]), resultRow[1]), resultRow[2]), resultRow[3]), resultRow[4].getTime()).set(resultRow[5], resultRow[6]);
        }
        return repositoryIdMap;
    }
    async findByUuIds(uuIds) {
        let r;
        return await this.db.find.tree({
            select: {},
            from: [
                r = Q.QRepository
            ],
            where: r.uuId.in(uuIds)
        });
    }
    async insert(repositories) {
        let r;
        const values = [];
        for (const repository of repositories) {
            values.push([
                repository.createdAt, repository.uuId, repository.ageSuitability,
                repository.source, repository.immutable, repository.ownerActor.id,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: r = Q.Repository,
            columns: [
                r.createdAt,
                r.uuId,
                r.ageSuitability,
                r.source,
                r.immutable,
                r.ownerActor.id
            ],
            values
        });
    }
}
DI.set(REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map