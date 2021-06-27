import {
	IAirportDatabase,
	QSchemaInternal
} from '@airport/air-control';
import {
	DbColumn,
	DbEntity,
	DbSchema,
	DbSequence,
	repositoryEntity
} from '@airport/ground-control';
import { IContext } from '@airport/di';

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
		numSequencesNeeded: number[],
		context: IIdGeneratorContext
	): Promise<number[][]>

	initialize(
		sequences?: DbSequence[]
	): Promise<void>

	tempInitialize(
		sequences?: DbSequence[]
	): Promise<void>

}

export function setSeqGen(
	sequenceGenerator: ISequenceGenerator
) {
	SEQ_GEN = sequenceGenerator;
}

var SEQ_GEN: ISequenceGenerator;

export function diSet(
	dbSchema: DbSchema,
	dbEntityId: number // EntityId
): boolean {
	if (!SEQ_GEN
		|| !dbSchema) {
		return false;
	}

	const dbEntity = dbSchema.currentVersion.entities[dbEntityId];

	return SEQ_GEN.exists(dbEntity);
}

export function duoDiSet(
	dbSchema: DbSchema,
	dbEntityId: number
): boolean {
	return dbSchema && dbSchema.currentVersion.entities[dbEntityId] as any as boolean;
}

export async function getSysWideOpId(
	airDb: IAirportDatabase,
	sequenceGenerator: ISequenceGenerator
): Promise<number> {
	const sysWideOpIdGeneratedColumn
		      = (airDb.QM[repositoryEntity.SYS_WIDE_OP_ID_SCHEMA] as QSchemaInternal)
		.__dbSchema__.currentVersion
		.entityMapByName[repositoryEntity.SYS_WIDE_OP_ID_ENTITY].columnMap['ID'];

	const generatedNumWrapper = await sequenceGenerator
		.generateSequenceNumbers(
			[sysWideOpIdGeneratedColumn], [1]);

	return generatedNumWrapper[0][0];
}
