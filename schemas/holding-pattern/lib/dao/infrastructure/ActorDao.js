"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class ActorDao extends generated_1.BaseActorDao {
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a.id.in(actorIds));
    }
    async findMapsWithDetailsByGlobalIds(randomIds, userIds, terminalIds, actorMap, actorMapById) {
        const actors = await this.findWithDetailsByGlobalIds(randomIds, userIds, terminalIds);
        for (const actor of actors) {
            ground_control_1.ensureChildJsMap(actorMap, actor.user.id)
                .set(actor.terminal.id, actor);
            actorMapById.set(actor.id, actor);
        }
    }
    async findWithDetailsByGlobalIds(randomIds, userIds, terminalIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => air_control_1.and(a.randomId.in(randomIds), a.terminal.id.in(terminalIds), a.user.id.in(userIds)));
    }
    async findWithDetailsAndGlobalIdsByWhereClause(getWhereClause) {
        let a;
        let u;
        const id = air_control_1.Y;
        return await this.db.find.tree({
            select: {
                id,
                randomId: air_control_1.Y,
                user: {
                    id,
                },
                terminal: {
                    id
                }
            },
            from: [
                a = generated_1.Q.Actor
            ],
            where: getWhereClause(a)
        });
    }
}
exports.ActorDao = ActorDao;
di_1.DI.set(tokens_1.ACTOR_DAO, ActorDao);
//# sourceMappingURL=ActorDao.js.map