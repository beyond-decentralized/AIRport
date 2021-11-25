import { TerminalId } from '@airport/arrivals-n-departures';
import { SharingNode_Id } from '../../ddl/ddl';
import { BaseSharingNodeTerminalDao, IBaseSharingNodeTerminalDao, ISharingNodeTerminal } from '../../generated/generated';
export interface ISharingNodeTerminalDao extends IBaseSharingNodeTerminalDao {
    findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId: TerminalId, sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, ISharingNodeTerminal>>;
}
export declare class SharingNodeTerminalDao extends BaseSharingNodeTerminalDao implements ISharingNodeTerminalDao {
    findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId: TerminalId, sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, ISharingNodeTerminal>>;
}
//# sourceMappingURL=SharingNodeTerminalDao.d.ts.map