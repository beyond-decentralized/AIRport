var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, AND, Y } from '@airport/tarmaq-query';
import { ensureChildJsMap } from '@airport/ground-control';
import { BaseActorDao, Q } from '../../generated/generated';
import { Injected } from '@airport/direction-indicator';
let ActorDao = class ActorDao extends BaseActorDao {
    async findWithDetailsAndGlobalIdsByIds(actorIds) {
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => a._localId.IN(actorIds));
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
        return await this.findWithDetailsAndGlobalIdsByWhereClause((a) => AND(a.GUID.IN(actorGUIDs), a.terminal._localId.IN(terminalIds), a.userAccount._localId.IN(userAccountIds)));
    }
    async findByDomainAndApplication_Names(domainName, applicationName) {
        let act;
        let application;
        let domain;
        let terminal;
        let userAccount;
        return await this.db.find.tree({
            SELECT: {
                _localId: Y,
                application: {
                    ...ALL_FIELDS,
                    domain: {}
                },
                terminal: {},
                userAccount: {},
                GUID: Y
            },
            FROM: [
                act = Q.Actor,
                application = act.application.INNER_JOIN(),
                domain = application.domain.INNER_JOIN(),
                terminal = act.terminal.LEFT_JOIN(),
                userAccount = act.userAccount.LEFT_JOIN()
            ],
            WHERE: AND(domain.name.equals(domainName), application.name.equals(applicationName))
        });
    }
    async findByGUIDs(actorGUIDs) {
        let a;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [
                a = Q.Actor
            ],
            WHERE: a.GUID.IN(actorGUIDs)
        });
    }
    async findWithUserAccountBy_LocalIdIn(actor_localIds) {
        let a, u;
        return await this.db.find.graph({
            SELECT: {
                '*': Y,
                userAccount: {
                    _localId: Y,
                    GUID: Y,
                    ranking: Y,
                    username: Y
                }
            },
            FROM: [
                a = Q.Actor,
                u = a.userAccount.LEFT_JOIN(),
                u.continent.LEFT_JOIN(),
                u.country.LEFT_JOIN(),
                u.metroArea.LEFT_JOIN(),
                u.state.LEFT_JOIN()
            ],
            WHERE: a._localId.IN(actor_localIds)
        });
    }
    async insert(actors, context) {
        let a;
        const VALUES = [];
        for (const actor of actors) {
            VALUES.push([
                actor.GUID, actor.application.index,
                actor.userAccount._localId, actor.terminal._localId
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: a = Q.Actor,
            columns: [
                a.GUID,
                a.application.index,
                a.userAccount._localId,
                a.terminal._localId
            ],
            VALUES
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
            SELECT: {
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
            FROM: [
                a = Q.Actor,
                ap = a.application.LEFT_JOIN(),
                ap.domain.LEFT_JOIN(),
                t = a.terminal.LEFT_JOIN(),
                t.owner.LEFT_JOIN(),
                a.userAccount.LEFT_JOIN()
            ],
            WHERE: getWhereClause(a)
        });
    }
};
ActorDao = __decorate([
    Injected()
], ActorDao);
export { ActorDao };
//# sourceMappingURL=ActorDao.js.map