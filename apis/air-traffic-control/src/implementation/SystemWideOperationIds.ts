import {
	ISequenceGenerator,
	airEntity
} from '@airport/ground-control';
import { IAirportDatabase, QApplicationInternal } from '../definition/AirportDatabase';

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