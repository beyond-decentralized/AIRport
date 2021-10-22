import { and, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildJsSet } from '@airport/ground-control';
import { REPOSITORY_ACTOR_DAO } from '../../tokens';
import { BaseRepositoryActorDao, Q, } from '../../generated/generated';
export class RepositoryActorDao extends BaseRepositoryActorDao {
    async findAllForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        let ra, a, d;
        const id = Y;
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
                ra = Q.RepositoryActor,
                a = ra.actor.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: and(ra.repository.id.in(repositoryIds), d.isLocal.equals(true))
        });
    }
    async findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        const records = await this.findAllForLocalActorsWhereRepositoryIdIn(repositoryIds);
        const actorIdMapByRepositoryId = new Map();
        for (const record of records) {
            ensureChildJsSet(actorIdMapByRepositoryId, record.repository.id)
                .add(record.actor.id);
        }
        return actorIdMapByRepositoryId;
    }
}
DI.set(REPOSITORY_ACTOR_DAO, RepositoryActorDao);
//# sourceMappingURL=RepositoryActorDao.js.map