"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryActorDao extends generated_1.BaseRepositoryActorDao {
    async findAllForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        let ra, a, d;
        const id = air_control_1.Y;
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
                ra = generated_1.Q.RepositoryActor,
                a = ra.actor.innerJoin(),
                d = a.terminal.innerJoin()
            ],
            where: air_control_1.and(ra.repository.id.in(repositoryIds), d.isLocal.equals(true))
        });
    }
    async findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds) {
        const records = await this.findAllForLocalActorsWhereRepositoryIdIn(repositoryIds);
        const actorIdMapByRepositoryId = new Map();
        for (const record of records) {
            this.utils.ensureChildJsSet(actorIdMapByRepositoryId, record.repository.id)
                .add(record.actor.id);
        }
        return actorIdMapByRepositoryId;
    }
}
exports.RepositoryActorDao = RepositoryActorDao;
di_1.DI.set(diTokens_1.REPOSITORY_ACTOR_DAO, RepositoryActorDao);
//# sourceMappingURL=RepositoryActorDao.js.map