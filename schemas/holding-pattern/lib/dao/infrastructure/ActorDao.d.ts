import { ApplicationName, DomainName } from '@airport/ground-control';
import { TmTerminal_Id, User_Id } from '@airport/travel-document-checkpoint';
import { Actor_Id, Actor_GUID } from '../../ddl/ddl';
import { BaseActorDao, IActor, IBaseActorDao } from '../../generated/generated';
import { IContext } from '@airport/direction-indicator';
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_Id[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_Id[], terminalIds: TmTerminal_Id[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_Id[], terminalIds: TmTerminal_Id[], actorMap: Map<User_Id, Map<TmTerminal_Id, IActor>>, actorMapById: Map<Actor_Id, IActor>): Promise<void>;
    findByDomainAndApplicationNames(domainName: DomainName, applicationName: ApplicationName): Promise<IActor[]>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_Id[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_Id[], terminalIds: TmTerminal_Id[], actorMap: Map<User_Id, Map<TmTerminal_Id, IActor>>, actorMapById: Map<Actor_Id, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userIds: User_Id[], terminalIds: TmTerminal_Id[]): Promise<IActor[]>;
    findByDomainAndApplicationNames(domainName: DomainName, applicationName: ApplicationName): Promise<IActor[]>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
//# sourceMappingURL=ActorDao.d.ts.map