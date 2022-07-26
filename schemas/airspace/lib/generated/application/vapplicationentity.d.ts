import { IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntity_TableConfiguration } from '@airport/tarmaq-entity';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/applicationversion';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationColumn } from '../../ddl/application/applicationcolumn';
import { ApplicationOperationVDescriptor } from './vapplicationoperation';
import { ApplicationOperation } from '../../ddl/application/applicationoperation';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationProperty } from '../../ddl/application/applicationproperty';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
import { ApplicationRelation } from '../../ddl/application/applicationrelation';
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