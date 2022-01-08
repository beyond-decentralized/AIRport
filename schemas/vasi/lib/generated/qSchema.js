import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getFullApplicationName } from '@airport/ground-control';
import { Address, AgeSuitable, Immutable, ImmutableWithActor, Language, Mutable, MutableWithActor, SystemGenerated, TranslationType } from '../ddl/ddl';
const __constructors__ = {
    Address: Address,
    AgeSuitable: AgeSuitable,
    Immutable: Immutable,
    ImmutableWithActor: ImmutableWithActor,
    Language: Language,
    Mutable: Mutable,
    MutableWithActor: MutableWithActor,
    SystemGenerated: SystemGenerated,
    TranslationType: TranslationType
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
    name: '@airport/vasi'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getFullApplicationName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map