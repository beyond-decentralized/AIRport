import { IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/tarmaq-entity';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationRelationColumnVDescriptor } from './vapplicationrelationcolumn';
export interface ApplicationRelationVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    index?: number | IVNumberField;
    foreignKey?: ForeignKey | IVStringField;
    manyToOneElems?: ManyToOneElements | IVStringField;
    oneToManyElems?: OneToManyElements | IVStringField;
    relationType?: string | IVStringField;
    isId?: boolean | IVBooleanField;
    property?: ApplicationPropertyVDescriptor;
    entity?: ApplicationEntityVDescriptor;
    relationEntity?: ApplicationEntityVDescriptor;
    manyRelationColumns?: ApplicationRelationColumnVDescriptor;
    oneRelationColumns?: ApplicationRelationColumnVDescriptor;
}
//# sourceMappingURL=vapplicationrelation.d.ts.map