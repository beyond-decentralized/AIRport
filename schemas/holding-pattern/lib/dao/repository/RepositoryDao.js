var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AND, Y } from '@airport/tarmaq-query';
import { Injected } from '@airport/direction-indicator';
import { TransactionType } from '@airport/ground-control';
import { BaseRepositoryDao, Q, } from '../../generated/generated';
let RepositoryDao = class RepositoryDao extends BaseRepositoryDao {
    async getRepositoryLoadInfo(repositorySource, repositoryGUID, context) {
        let r;
        let rth;
        let th;
        return await this.db.findOne.tree({
            SELECT: {
                immutable: Y,
                repositoryTransactionHistory: {
                    saveTimestamp: Y
                }
            },
            FROM: [
                r = Q.Repository,
                rth = r.repositoryTransactionHistory.innerJoin(),
                th = rth.transactionHistory.innerJoin()
            ],
            WHERE: AND(r.source.equals(repositorySource), r.GUID.equals(repositoryGUID), th.transactionType.equals(TransactionType.REMOTE_SYNC))
        }, context);
    }
    async findReposWithDetailsAndSyncNodeIds(repositoryIds) {
        let r;
        const _localId = Y;
        return await this.db.find.tree({
            SELECT: {
                _localId,
                owner: {
                    _localId
                },
                createdAt: Y,
                GUID: Y
            },
            FROM: [
                r = Q.Repository
            ],
            WHERE: r._localId.IN(repositoryIds)
        });
    }
    async findWithOwnerBy_LocalIds(repositoryIds) {
        let r;
        return await this.db.find.tree({
            SELECT: {
                '*': Y,
                owner: {
                    _localId: Y,
                    GUID: Y,
                    username: Y
                }
            },
            FROM: [
                r = Q.Repository,
                r.owner.innerJoin()
            ],
            WHERE: r._localId.IN(repositoryIds)
        });
    }
    async findWithOwnerBy_LocalIdIn(repository_localIds) {
        let r, o;
        return await this.db.find.graph({
            SELECT: {
                '*': Y,
                owner: {
                    _localId: Y,
                    GUID: Y,
                    ranking: Y,
                    username: Y
                }
            },
            FROM: [
                r = Q.Repository,
                r.owner.innerJoin()
            ],
            WHERE: r._localId.IN(repository_localIds)
        });
    }
    async findByGUIDs(repositoryGUIDs) {
        let r;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [
                r = Q.Repository
            ],
            WHERE: r.GUID.IN(repositoryGUIDs)
        });
    }
    async insert(repositories, context) {
        let r;
        const VALUES = [];
        for (const repository of repositories) {
            VALUES.push([
                repository.createdAt, repository.GUID, repository.ageSuitability,
                repository.source, repository.immutable, repository.owner._localId,
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: r = Q.Repository,
            columns: [
                r.createdAt,
                r.GUID,
                r.ageSuitability,
                r.source,
                r.immutable,
                r.owner._localId
            ],
            VALUES
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