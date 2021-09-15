/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Address } from '../ddl/Address';
import { Immutable } from '../ddl/attributes/Immutable';
import { SystemGenerated } from '../ddl/attributes/SystemGenerated';
import { Language } from '../ddl/Language';
import { TranslationType } from '../ddl/TranslationType';
import { ImmutableWithActor } from '../ddl/attributes/ImmutableWithActor';
import { AgeSuitable } from '../ddl/attributes/AgeSuitable';
import { Mutable } from '../ddl/attributes/Mutable';
import { MutableWithActor } from '../ddl/attributes/MutableWithActor';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'vasi');
    accumulator.add(Address, 0);
    accumulator.add(Immutable, undefined);
    accumulator.add(SystemGenerated, undefined);
    accumulator.add(Language, 1);
    accumulator.add(TranslationType, 2);
    accumulator.add(ImmutableWithActor, undefined);
    accumulator.add(AgeSuitable, undefined);
    accumulator.add(Mutable, undefined);
    accumulator.add(MutableWithActor, undefined);
});
//# sourceMappingURL=entityMappings.js.map