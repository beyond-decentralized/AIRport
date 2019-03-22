import { TerminalId } from '@airport/arrivals-n-departures';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingNodeTerminalDao, IBaseSharingNodeTerminalDao, ISharingNodeTerminal } from '../../generated/generated';
export interface ISharingNodeTerminalDao extends IBaseSharingNodeTerminalDao {
    findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId: TerminalId, sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, ISharingNodeTerminal>>;
}
export declare class SharingNodeTerminalDao extends BaseSharingNodeTerminalDao implements ISharingNodeTerminalDao {
    findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(terminalId: TerminalId, sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, ISharingNodeTerminal>>;
}
