export type SystemWideOperationId_Id = number;

export interface ISystemWideOperationIdUtils {

    getSysWideOpId(
    ): Promise<number>

    getSysWideOpIds(
        numSequencesNeeded: number,
    ): Promise<number[]>

}
