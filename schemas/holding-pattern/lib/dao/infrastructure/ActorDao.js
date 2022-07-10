var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, and, Y } from '@airport/tarmaq-query';
import { ensureChildJsMap } from '@airport/ground-control';
import { BaseActorDao, Q } from '../../generated/generated';
import { Injected } from '@airport/direction-indicator';
let ActorDao = class ActorDao extends BaseActorDao {
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a._localId.in(actorIds));
    }
    async findMapsWithDetailsByGlobalIds(actorGUIDs, userAccountIds, terminalIds, actorMap, actorMapById) {
        const actors = await this.findWithDetailsByGlobalIds(actorGUIDs, userAccountIds, terminalIds);
        for (const actor of actors) {
            ensureChildJsMap(actorMap, actor.userAccount._localId)
                .set(actor.terminal._localId, actor);
            actorMapById.set(actor._localId, actor);
        }
    }
    async findWithDetailsByGlobalIds(actorGUIDs, userAccountIds, terminalIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => and(a.GUID.in(actorGUIDs), a.terminal._localId.in(terminalIds), a.userAccount._localId.in(userAccountIds)));
    }
    async findByDomainAndApplication_Names(domainName, applicationName) {
        let act;
        let application;
        let domain;
        let terminal;
        let userAccount;
        return await this.db.find.tree({
            select: {
                _localId: Y,
                application: {
                    ...ALL_FIELDS,
                    domain: {}
                },
                terminal: {},
                userAccount: {},
                GUID: Y
            },
            from: [
                act = Q.Actor,
                application = act.application.innerJoin(),
                domain = application.domain.innerJoin(),
                terminal = act.terminal.leftJoin(),
                userAccount = act.userAccount.leftJoin()
            ],
            where: and(domain.name.equals(domainName), application.name.equals(applicationName))
        });
    }
    async findByGUIDs(actorGUIDs) {
        let a;
        return await this.db.find.tree({
            select: {},
            from: [
                a = Q.Actor
            ],
            where: a.GUID.in(actorGUIDs)
        });
    }
    async findWithUserAccountBy_LocalIdIn(actor_localIds) {
        let a, u;
        return await this.db.find.graph({
            select: {
                '*': Y,
                userAccount: {
                    _localId: Y,
                    GUID: Y,
                    ranking: Y,
                    username: Y
                }
            },
            from: [
                a = Q.Actor,
                u = a.userAccount.leftJoin(),
                u.continent.leftJoin(),
                u.country.leftJoin(),
                u.metroArea.leftJoin(),
                u.state.leftJoin()
            ],
            where: a._localId.in(actor_localIds)
        });
    }
    async insert(actors, context) {
        let a;
        const values = [];
        for (const actor of actors) {
            values.push([
                actor.GUID, actor.application.index,
                actor.userAccount._localId, actor.terminal._localId
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            insertInto: a = Q.Actor,
            columns: [
                a.GUID,
                a.application.index,
                a.userAccount._localId,
                a.terminal._localId
            ],
            values
        }, context);
        for (let i = 0; i < actors.length; i++) {
            let actor = actors[i];
            actor._localId = _localIds[i][0];
        }
    }
    async findWithDetailsAndGlobalIdsByWhereClause(getWhereClause) {
        let a;
        let ap;
        let t;
        const id = Y;
        const username = Y;
        const GUID = Y;
        return await this.db.find.tree({
            select: {
                ...ALL_FIELDS,
                application: {
                    index: Y,
                    name: Y,
                    domain: {
                        name: Y
                    }
                },
                terminal: {
                    id,
                    GUID,
                    owner: {
                        id,
                        username,
                        GUID,
                    }
                },
                userAccount: {
                    id,
                    username,
                    GUID,
                }
            },
            from: [
                a = Q.Actor,
                ap = a.application.leftJoin(),
                ap.domain.leftJoin(),
                t = a.terminal.leftJoin(),
                t.owner.leftJoin(),
                a.userAccount.leftJoin()
            ],
            where: getWhereClause(a)
        });
    }
};
ActorDao = __decorate([
    Injected()
], ActorDao);
export { ActorDao };
//# sourceMappingURL=ActorDao.js.map