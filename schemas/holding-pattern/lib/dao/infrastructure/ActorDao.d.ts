import { ApplicationSignature } from '@airport/ground-control';
import { TmTerminal_Id, UserId } from '@airport/travel-document-checkpoint';
import { ActorId, ActorUuId } from '../../ddl/ddl';
import { BaseActorDao, IActor, IBaseActorDao } from '../../generated/generated';
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminal_Id[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminal_Id[], actorMap: Map<UserId, Map<TmTerminal_Id, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
    findByApplicationSignature(applicationSignature: ApplicationSignature): Promise<IActor>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminal_Id[], actorMap: Map<UserId, Map<TmTerminal_Id, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminal_Id[]): Promise<IActor[]>;
    findByApplicationSignature(applicationSignature: ApplicationSignature): Promise<IActor>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
//# sourceMappingURL=ActorDao.d.ts.map