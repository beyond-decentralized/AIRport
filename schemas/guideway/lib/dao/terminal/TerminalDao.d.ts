import { AgtRepositoryId, TerminalId, TerminalPassword } from '@airport/arrivals-n-departures';
import { ITerminal } from '../../generated/interfaces';
import { TerminalLastPollConnectionDatetime } from '../../ddl/ddl';
import { BaseTerminalDao, IBaseTerminalDao } from '../../generated/baseDaos';
export declare type TerminalKey = string;
export interface ITerminalDao extends IBaseTerminalDao {
    findTerminalVerificationRecords(terminalIds: TerminalId[]): Promise<Map<TerminalId, [TerminalPassword, TerminalLastPollConnectionDatetime, TerminalId]>>;
    /**
     * Finds Terminals with Repository Relations and User Info,
     * via matching records in Terminal Repository Verification Stage.
     *
     * @param {TerminalRepositoryVerificationStageServerId} serverId
     * @param {TerminalRepositoryVerificationStageRunId} verificationRunId
     * @returns {Promise<Map<TerminalKey, ITerminal>>}
     */
    findTerminalRepositoryVerificationRecords(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, AgtRepositoryId>>;
    findSseLoginVerificationRecords(terminalPasswords: TerminalPassword[]): Promise<Map<TerminalPassword, ITerminal>>;
    updateLastPollConnectionDatetime(terminalIds: TerminalId[], lastPollConnectionDatetime: TerminalLastPollConnectionDatetime): Promise<void>;
    updateLastSseConnectionDatetime(terminalPasswords: TerminalPassword[]): Promise<void>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    findTerminalVerificationRecords(terminalIds: TerminalId[]): Promise<Map<TerminalId, [TerminalPassword, TerminalLastPollConnectionDatetime, TerminalId]>>;
    findTerminalRepositoryVerificationRecords(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, AgtRepositoryId>>;
    findSseLoginVerificationRecords(terminalPasswords: TerminalPassword[]): Promise<Map<TerminalPassword, ITerminal>>;
    updateLastPollConnectionDatetime(terminalIds: TerminalId[], lastPollConnectionDatetime: TerminalLastPollConnectionDatetime): Promise<void>;
    updateLastSseConnectionDatetime(terminalPasswords: TerminalPassword[]): Promise<void>;
}
