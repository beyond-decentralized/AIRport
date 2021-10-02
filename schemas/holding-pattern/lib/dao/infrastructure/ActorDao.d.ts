import { TmTerminalId, UserId } from '@airport/travel-document-checkpoint';
import { ActorId, ActorUuId } from '../../ddl/ddl';
import { BaseActorDao, IActor, IBaseActorDao } from '../../generated/generated';
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminalId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminalId[], actorMap: Map<UserId, Map<TmTerminalId, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminalId[], actorMap: Map<UserId, Map<TmTerminalId, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(uuIds: ActorUuId[], userIds: UserId[], terminalIds: TmTerminalId[]): Promise<IActor[]>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
//# sourceMappingURL=ActorDao.d.ts.map