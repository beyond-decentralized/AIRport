import { and, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { ACTOR_DAO } from '../../tokens';
import { BaseActorDao, Q, } from '../../generated/generated';
export class ActorDao extends BaseActorDao {
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a.id.in(actorIds));
    }
    async findMapsWithDetailsByGlobalIds(randomIds, userIds, terminalIds, actorMap, actorMapById) {
        const actors = await this.findWithDetailsByGlobalIds(randomIds, userIds, terminalIds);
        for (const actor of actors) {
            ensureChildJsMap(actorMap, actor.user.id)
                .set(actor.terminal.id, actor);
            actorMapById.set(actor.id, actor);
        }
    }
    async findWithDetailsByGlobalIds(randomIds, userIds, terminalIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => and(a.randomId.in(randomIds), a.terminal.id.in(terminalIds), a.user.id.in(userIds)));
    }
    async findWithDetailsAndGlobalIdsByWhereClause(getWhereClause) {
        let a;
        let u;
        const id = Y;
        return await this.db.find.tree({
            select: {
                id,
                randomId: Y,
                user: {
                    id,
                },
                terminal: {
                    id
                }
            },
            from: [
                a = Q.Actor
            ],
            where: getWhereClause(a)
        });
    }
}
DI.set(ACTOR_DAO, ActorDao);
//# sourceMappingURL=ActorDao.js.map