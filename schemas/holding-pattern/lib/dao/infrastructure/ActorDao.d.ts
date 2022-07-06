import { Application_Name, Domain_Name } from '@airport/ground-control';
import { Terminal_LocalId, User_LocalId } from '@airport/travel-document-checkpoint';
import { Actor_LocalId, Actor_GUID } from '../../ddl/ddl';
import { BaseActorDao, IActor, IBaseActorDao } from '../../generated/generated';
import { IContext } from '@airport/direction-indicator';
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_LocalId[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_LocalId[], terminalIds: Terminal_LocalId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_LocalId[], terminalIds: Terminal_LocalId[], actorMap: Map<User_LocalId, Map<Terminal_LocalId, IActor>>, actorMapById: Map<Actor_LocalId, IActor>): Promise<void>;
    findWithUsersBy_LocalIdIn(actor_localIds: Actor_LocalId[]): Promise<IActor[]>;
    findByDomainAndApplication_Names(domainName: Domain_Name, applicationName: Application_Name): Promise<IActor[]>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_LocalId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_LocalId[], terminalIds: Terminal_LocalId[], actorMap: Map<User_LocalId, Map<Terminal_LocalId, IActor>>, actorMapById: Map<Actor_LocalId, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_LocalId[], terminalIds: Terminal_LocalId[]): Promise<IActor[]>;
    findByDomainAndApplication_Names(domainName: Domain_Name, applicationName: Application_Name): Promise<IActor[]>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    findWithUsersBy_LocalIdIn(actor_localIds: Actor_LocalId[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
//# sourceMappingURL=ActorDao.d.ts.map