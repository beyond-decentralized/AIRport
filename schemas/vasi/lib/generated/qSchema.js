import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
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
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map