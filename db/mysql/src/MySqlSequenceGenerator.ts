import {SEQUENCE_GENERATOR} from '@airport/check-in'
import {DI}                 from '@airport/di'
import {SequenceGenerator}  from '@airport/sequence'

export class MySqlSequenceGenerator
	extends SequenceGenerator {

	protected nativeGenerate(): Promise<number> {
		throw new Error('Method not implemented.')
	}

}

DI.set(SEQUENCE_GENERATOR, MySqlSequenceGenerator)
