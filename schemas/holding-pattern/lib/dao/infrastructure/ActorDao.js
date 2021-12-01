import { and, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { ACTOR_DAO } from '../../tokens';
import { BaseActorDao, Q } from '../../generated/generated';
export class ActorDao extends BaseActorDao {
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a.id.in(actorIds));
    }
    async findMapsWithDetailsByGlobalIds(uuIds, userIds, terminalIds, actorMap, actorMapById) {
        const actors = await this.findWithDetailsByGlobalIds(uuIds, userIds, terminalIds);
        for (const actor of actors) {
            ensureChildJsMap(actorMap, actor.user.id)
                .set(actor.terminal.id, actor);
            actorMapById.set(actor.id, actor);
        }
    }
    async findWithDetailsByGlobalIds(uuIds, userIds, terminalIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => and(a.uuId.in(uuIds), a.terminal.id.in(terminalIds), a.user.id.in(userIds)));
    }
    async findByApplicationSignature(applicationSignature) {
        let act;
        let application;
        let terminal;
        let user;
        return await this.db.findOne.graph({
            select: {
                id: Y,
                application: {},
                terminal: {},
                user: {},
                uuId: Y
            },
            from: [
                act = Q.Actor,
                application = act.application.innerJoin(),
                terminal = act.terminal.leftJoin(),
                user = act.user.leftJoin()
            ],
            where: application.signature.equals(applicationSignature)
        });
    }
    async findByUuIds(uuIds) {
        let a;
        return await this.db.find.tree({
            select: {},
            from: [
                a = Q.Actor
            ],
            where: a.uuId.in(uuIds)
        });
    }
    async insert(actors) {
        let t;
        const values = [];
        for (const actor of actors) {
            values.push([
                actor.uuId, actor.user.id, actor.terminal.id,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: t = Q.Terminal,
            columns: [
                t.uuId,
                t.user.id,
                t.terminal.id
            ],
            values
        });
    }
    async findWithDetailsAndGlobalIdsByWhereClause(getWhereClause) {
        let a;
        let u;
        const id = Y;
        return await this.db.find.tree({
            select: {
                id,
                uuId: Y,
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