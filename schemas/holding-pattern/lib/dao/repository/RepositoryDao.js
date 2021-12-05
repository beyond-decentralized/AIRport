import { ALL_FIELDS, and, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { REPOSITORY_DAO } from '../../tokens';
import { BaseRepositoryDao, Q, } from '../../generated/generated';
export class RepositoryDao extends BaseRepositoryDao {
    async getRepositoryLoadInfo(repositorySource, repositoryUuId, context) {
        let r;
        let rth;
        let th;
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
                th = rth.transactionHistory.innerJoin()
            ],
            where: and(r.source.equals(repositorySource), r.uuId.equals(repositoryUuId), th.transactionType.equals(TransactionType.REMOTE_SYNC))
        }, context);
    }
    async findReposWithDetailsAndSyncNodeIds(repositoryIds) {
        let r;
        const id = Y;
        return await this.db.find.tree({
            select: {
                id,
                owner: {
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
    async findByIds(repositoryIds) {
        let r;
        return await this.db.find.tree({
            select: {
                ...ALL_FIELDS,
                owner: {
                    id: Y
                }
            },
            from: [
                r = Q.Repository,
                r.owner.innerJoin()
            ],
            where: r.id.in(repositoryIds)
        });
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
                repository.source, repository.immutable, repository.owner.id,
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
                r.owner.id
            ],
            values
        });
    }
}
DI.set(REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map