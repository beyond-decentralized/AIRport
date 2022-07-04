var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, and, Y } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { TransactionType } from '@airport/ground-control';
import { BaseRepositoryDao, Q, } from '../../generated/generated';
let RepositoryDao = class RepositoryDao extends BaseRepositoryDao {
    async getRepositoryLoadInfo(repositorySource, repositoryGUID, context) {
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
            where: and(r.source.equals(repositorySource), r.GUID.equals(repositoryGUID), th.transactionType.equals(TransactionType.REMOTE_SYNC))
        }, context);
    }
    async findReposWithDetailsAndSyncNodeIds(repositoryIds) {
        let r;
        const _localId = Y;
        return await this.db.find.tree({
            select: {
                _localId,
                owner: {
                    _localId
                },
                createdAt: Y,
                uuId: Y
            },
            from: [
                r = Q.Repository
            ],
            where: r._localId.in(repositoryIds)
        });
    }
    async findByIds(repositoryIds) {
        let r;
        return await this.db.find.tree({
            select: {
                ...ALL_FIELDS,
                owner: {}
            },
            from: [
                r = Q.Repository,
                r.owner.innerJoin()
            ],
            where: r._localId.in(repositoryIds)
        });
    }
    async findByGUIDs(repositoryGUIDs) {
        let r;
        return await this.db.find.tree({
            select: {},
            from: [
                r = Q.Repository
            ],
            where: r.GUID.in(repositoryGUIDs)
        });
    }
    async insert(repositories, context) {
        let r;
        const values = [];
        for (const repository of repositories) {
            values.push([
                repository.createdAt, repository.GUID, repository.ageSuitability,
                repository.source, repository.immutable, repository.owner._localId,
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            insertInto: r = Q.Repository,
            columns: [
                r.createdAt,
                r.GUID,
                r.ageSuitability,
                r.source,
                r.immutable,
                r.owner._localId
            ],
            values
        }, context);
        for (let i = 0; i < repositories.length; i++) {
            let repository = repositories[i];
            repository._localId = _localIds[i][0];
        }
    }
};
RepositoryDao = __decorate([
    Injected()
], RepositoryDao);
export { RepositoryDao };
//# sourceMappingURL=RepositoryDao.js.map