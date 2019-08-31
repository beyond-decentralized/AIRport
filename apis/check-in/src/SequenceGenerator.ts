import {
	DbColumn,
	DbEntity,
	DbSchema,
	DbSequence
} from '@airport/ground-control'

/**
 * Sequence generator is needed at Airport initialization time. A Dao
 * is responsible for checking that a corresponding sequence is already
 * initialized before it itself can be declared to be initialized.
 */
export interface ISequenceGenerator {

	exists(
		dbEntity: DbEntity
	): boolean

	generateSequenceNumbers(
		dbColumns: DbColumn[],
		numSequencesNeeded: number[]
	): Promise<number[][]>

	init(
		sequences?: DbSequence[]
	): Promise<void>

	tempInit(
		sequences?: DbSequence[]
	): Promise<void>

}

export function setSeqGen(
	sequenceGenerator: ISequenceGenerator
) {
	SEQ_GEN = sequenceGenerator
}

var SEQ_GEN: ISequenceGenerator

export function diSet(
	dbSchema: DbSchema,
	dbEntityId: number // EntityId
): boolean {
	if (!SEQ_GEN
		|| !dbSchema) {
		return false
	}

	const dbEntity = dbSchema.currentVersion.entities[dbEntityId]

	return SEQ_GEN.exists(dbEntity)
}

export function duoDiSet(
	dbSchema: DbSchema,
	dbEntityId: number
): boolean {
	return dbSchema && dbSchema.currentVersion.entities[dbEntityId] as any as boolean
}
