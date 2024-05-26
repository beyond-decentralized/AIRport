import { SequenceGenerator } from '@airport/sequence'

export class NoOpSequenceGenerator
	extends SequenceGenerator {

	protected nativeGenerate(): Promise<number> {
		throw new Error('Method not implemented.')
	}

}
