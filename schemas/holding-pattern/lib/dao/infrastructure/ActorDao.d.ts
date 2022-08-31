import { Application_Name, Domain_Name } from '@airport/ground-control';
import { Terminal_GUID, Terminal_LocalId, UserAccount_GUID, UserAccount_LocalId } from '@airport/travel-document-checkpoint';
import { Actor_LocalId, Actor_GUID, Actor } from '../../ddl/ddl';
import { BaseActorDao, IActor, IBaseActorDao } from '../../generated/generated';
import { IContext } from '@airport/direction-indicator';
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_LocalId[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userAccountIds: UserAccount_LocalId[], terminalIds: Terminal_LocalId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userAccountIds: UserAccount_LocalId[], terminalIds: Terminal_LocalId[], actorMap: Map<UserAccount_LocalId, Map<Terminal_LocalId, IActor>>, actorMapById: Map<Actor_LocalId, IActor>): Promise<void>;
    findWithUserAccountBy_LocalIdIn(actor_localIds: Actor_LocalId[]): Promise<IActor[]>;
    findByDomainAndApplication_Names(domainName: Domain_Name, applicationName: Application_Name): Promise<IActor[]>;
    findOneByDomainAndApplication_Names_UserAccountGUID_TerminalGUID(domainName: Domain_Name, applicationName: Application_Name, userAccountGUID: UserAccount_GUID, terminalGUID: Terminal_GUID): Promise<IActor>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: Actor_LocalId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userAccountIds: UserAccount_LocalId[], terminalIds: Terminal_LocalId[], actorMap: Map<UserAccount_LocalId, Map<Terminal_LocalId, IActor>>, actorMapById: Map<Actor_LocalId, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(actorGUIDs: Actor_GUID[], userAccountIds: UserAccount_LocalId[], terminalIds: Terminal_LocalId[]): Promise<IActor[]>;
    findByDomainAndApplication_Names(domainName: Domain_Name, applicationName: Application_Name): Promise<IActor[]>;
    findOneByDomainAndApplication_Names_UserAccountGUID_TerminalGUID(domainName: Domain_Name, applicationName: Application_Name, userAccountGUID: UserAccount_GUID, terminalGUID: Terminal_GUID): Promise<Actor>;
    findByGUIDs(actorGUIDs: Actor_GUID[]): Promise<IActor[]>;
    findWithUserAccountBy_LocalIdIn(actor_localIds: Actor_LocalId[]): Promise<IActor[]>;
    insert(actors: IActor[], context: IContext): Promise<void>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
//# sourceMappingURL=ActorDao.d.ts.map