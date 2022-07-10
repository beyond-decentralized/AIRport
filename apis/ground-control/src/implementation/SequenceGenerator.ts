import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "../definition/application/Entity";
import { DbColumn } from "../definition/application/Property";
import { DbSequence } from "../definition/application/Sequence";

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
    isServer: boolean
}
export interface ISequenceGenerator {

    exists(
        dbEntity: DbEntity
    ): boolean

    generateSequenceNumbers(
        dbColumns: DbColumn[],
        numSequencesNeeded: number[]
    ): Promise<number[][]>

    initialize(
        context: IContext,
        sequences?: DbSequence[]
    ): Promise<void>

    tempInitialize(
        context: IContext,
        sequences?: DbSequence[]
    ): Promise<void>

}

export function setSeqGen(
    sequenceGenerator: ISequenceGenerator
) {
    SEQ_GEN = sequenceGenerator;
}

export var SEQ_GEN: ISequenceGenerator;