import { Y }     from '@airport/air-control';
import { vespa } from './impl/AccessPoint';

export class Factor {
	name: string;
	description: string;
}

export class Thread {
	data: string;
	name: string;
}

@vespa.Document()
class VespaThread {

	@vespa.Indexing({
		index: Y,
	})
	data = vespa.Join(Thread, {
		data: Y
	});

	@vespa.Indexing({
		index: Y,
	})
	name = Q.Thread.name;

}

@vespa.Default()
@vespa.Fieldset<Thread>(
	Thread,
	{
		fields: {
			name: Y,
		},
	},
)
class Default {
}
