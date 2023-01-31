import { Inject, Injected } from '@airport/direction-indicator';
import {
	ISequenceGenerator,
	Dictionary
} from '@airport/ground-control';
import { DbSystemWideOperationIdUtils } from '../../definition/utils/DbSystemWideOperationIdUtils';

@Injected()
export class SystemWideOperationIdUtils
	implements DbSystemWideOperationIdUtils {

	@Inject()
	dictionary: Dictionary

	@Inject()
	sequenceGenerator: ISequenceGenerator

	async getSysWideOpId(
	): Promise<number> {
		const sequences = await this.getSysWideOpIds(1)

		return sequences[0]
	}

	async getSysWideOpIds(
		numSequencesNeeded: number,
	): Promise<number[]> {
		const airport = this.dictionary.airport
		const SystemWideOperationId = this.dictionary.SystemWideOperationId
		return await this.sequenceGenerator
			.generateSequenceNumbersForColumn(
				airport.DOMAIN_NAME,
				airport.apps.AIRPORT_CODE.name,
				SystemWideOperationId.name,
				SystemWideOperationId.columns.SYSTEM_WIDE_OPERATION_LID,
				numSequencesNeeded
			);
	}

}
