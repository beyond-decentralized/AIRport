import { Y } from '@airport/air-control';
import { vespa } from './impl/AccessPoint';

export class Factor {
  name: string;
  description: string;
}

export class Thread {
  data: string;
  name: string;
}

@vespa.Entity()
class VespaThread {

  data = vespa.type.document(Thread, {
    data: Y
  });

  @vespa.Attribute({
    fastSearch: true,
  })
  @vespa.Indexing({
    index: Y,
  })
  name = vespa.type.string(Thread, (q: QThread) => q.name);

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
