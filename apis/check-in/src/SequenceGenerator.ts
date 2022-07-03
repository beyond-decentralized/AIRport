import {
	IAirportDatabase,
	QApplicationInternal
} from '@airport/air-traffic-control';
import {
	DbColumn,
	DbEntity,
	DbApplication,
	DbSequence,
	airEntity
} from '@airport/ground-control';
import { IContext } from '@airport/direction-indicator';

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

var SEQ_GEN: ISequenceGenerator;

export function diSet(
	dbApplication: DbApplication,
	dbEntityId: number // ApplicationEntity_LocalId
): boolean {
	if (!SEQ_GEN
		|| !dbApplication) {
		return false;
	}

	const dbEntity = dbApplication.currentVersion[0]
		.applicationVersion.entities[dbEntityId];

	return SEQ_GEN.exists(dbEntity);
}

export function duoDiSet(
	dbApplication: DbApplication,
	dbEntityId: number
): boolean {
	return dbApplication && dbApplication.currentVersion[0]
		.applicationVersion.entities[dbEntityId] as any as boolean;
}

export async function getSysWideOpId(
	airDb: IAirportDatabase,
	sequenceGenerator: ISequenceGenerator,
): Promise<number> {
	const sequences = await getSysWideOpIds(1, airDb, sequenceGenerator)
	return sequences[0]
}

export async function getSysWideOpIds(
	numSequencesNeeded: number,
	airportDatabase: IAirportDatabase,
	sequenceGenerator: ISequenceGenerator,
): Promise<number[]> {
	if (!numSequencesNeeded) {
		return []
	}
	const sysWideOpIdGeneratedColumn
		= (airportDatabase.QM[airEntity.SYS_WIDE_OP_ID_APPLICATION] as QApplicationInternal)
			.__dbApplication__.currentVersion[0].applicationVersion
			.entityMapByName[airEntity.SYS_WIDE_OP_ID_ENTITY]
			.columnMap['SYSTEM_WIDE_OPERATION_LID'];

	const generatedNumWrapper = await sequenceGenerator
		.generateSequenceNumbers(
			[sysWideOpIdGeneratedColumn], [numSequencesNeeded]);

	return generatedNumWrapper[0];
}