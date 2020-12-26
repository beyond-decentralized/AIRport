import {Y}        from '@airport/air-control'
import {Document} from '@airport/hw-control'
import {vespa}    from './impl/VespaDecoratorsImpl'

export class Factor {
	name: string
	description: string
}

@vespa.Entity()
class Thread {

	@Document<Thread>({
		test: 'hello'
	})
	data: string

	@vespa.Attribute({
		fastSearch: true
	})
	@vespa.Indexing({
		index: Y
	})
	name: string

}

@vespa.Default()
@vespa.Fieldset<Thread>(
	Thread,
	{
		fields: {
			name: Y
		}
	}
)
class Default {
}
