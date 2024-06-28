import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "../definition/application/DbEntity";
import { DbColumn } from "../definition/application/DbProperty";
import { DbSequence } from "../definition/application/DbSequence";

/**
* Sequence generator is needed at Airport initialization time. A Dao
* is responsible for checking that a corresponding sequence is already
* initialized before it itself can be declared to be initialized.
*/
export interface IIdGeneratorContext
    extends IContext {
    di: {
        sequenceGenerator: ISequenceGenerator,
    }
    isSyncNode: boolean
}
export interface ISequenceGenerator {

    exists(
        dbEntity: DbEntity
    ): boolean

    generateSequenceNumbers(
        dbColumns: DbColumn[],
        numSequencesNeeded: number[]
    ): Promise<number[][]>

    generateSequenceNumbersForColumn(
        domainName: string,
        applicationName: string,
        entityName: string,
        columnName: string,
        numSequencesNeeded: number
    ): Promise<number[]>

    initialize(
        context: IContext,
        sequences?: DbSequence[]
    ): Promise<void>

    tempInitialize(
        context: IContext,
        sequences?: DbSequence[]
    ): Promise<void>

}
