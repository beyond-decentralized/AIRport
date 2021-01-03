import { Y } from '@airport/air-control';
import { Document } from '@airport/hw-control';
import { vespa } from './impl/AccessPoint';

export class Factor {
  name: string;
  description: string;
}

export class Thread {
  data: string;
  name: string
}

@vespa.Entity()
class VespaThread {

  @Document<Thread>({
    test: 'hello',
  })
  data: string;

  @vespa.Attribute({
    fastSearch: true,
  })
  @vespa.Indexing({
    index: Y,
  })
  name = vespa.type.string(Thread, {
    name: '',
  });

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
