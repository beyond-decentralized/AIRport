export interface ISystemWideOperationIdUtils {

    getSysWideOpId(
    ): Promise<number>

    getSysWideOpIds(
        numSequencesNeeded: number,
    ): Promise<number[]>

}
