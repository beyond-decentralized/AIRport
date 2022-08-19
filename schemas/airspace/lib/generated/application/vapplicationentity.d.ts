import { IVBooleanField, IVNumberField, IVStringField } from '@airbridge/validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntity_TableConfiguration } from '@airport/tarmaq-entity';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/ApplicationVersion';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationColumn } from '../../ddl/application/ApplicationColumn';
import { ApplicationOperationVDescriptor } from './vapplicationoperation';
import { ApplicationOperation } from '../../ddl/application/ApplicationOperation';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationProperty } from '../../ddl/application/ApplicationProperty';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
import { ApplicationRelation } from '../../ddl/application/ApplicationRelation';
export interface ApplicationEntityVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    index?: number | IVNumberField;
    isLocal?: boolean | IVBooleanField;
    isAirEntity?: boolean | IVBooleanField;
    name?: string | IVStringField;
    tableConfig?: ApplicationEntity_TableConfiguration | IVStringField;
    applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    columns?: ApplicationColumnVDescriptor<ApplicationColumn>;
    operations?: ApplicationOperationVDescriptor<ApplicationOperation>;
    properties?: ApplicationPropertyVDescriptor<ApplicationProperty>;
    relations?: ApplicationRelationVDescriptor<ApplicationRelation>;
    relationReferences?: ApplicationRelationVDescriptor<ApplicationRelation>;
}
//# sourceMappingURL=vapplicationentity.d.ts.map