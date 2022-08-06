import { IVBooleanField, IVNumberField, IVStringField } from '@airbridge/validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/tarmaq-entity';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationProperty } from '../../ddl/application/applicationproperty';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationEntity } from '../../ddl/application/applicationentity';
import { ApplicationRelationColumnVDescriptor } from './vapplicationrelationcolumn';
import { ApplicationRelationColumn } from '../../ddl/application/applicationrelationcolumn';
export interface ApplicationRelationVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    index?: number | IVNumberField;
    foreignKey?: ForeignKey | IVStringField;
    manyToOneElems?: ManyToOneElements | IVStringField;
    oneToManyElems?: OneToManyElements | IVStringField;
    relationType?: string | IVStringField;
    isId?: boolean | IVBooleanField;
    property?: ApplicationPropertyVDescriptor<ApplicationProperty>;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    relationEntity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    manyRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>;
    oneRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>;
}
//# sourceMappingURL=vapplicationrelation.d.ts.map