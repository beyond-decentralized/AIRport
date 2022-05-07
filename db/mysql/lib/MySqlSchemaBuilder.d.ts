import { IAirportDatabase } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { ISequence } from '@airport/airport-code';
import { DbApplication, JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export declare class MySqlSchemaBuilder extends SqlSchemaBuilder {
    airportDatabase: IAirportDatabase;
    createApplication(jsonApplication: JsonApplication, context: IContext): Promise<void>;
    getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): string;
    getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    buildAllSequences(jsonApplications: JsonApplication[], context: IContext): Promise<ISequence[]>;
    stageSequences(jsonApplications: JsonApplication[], context: IContext): ISequence[];
    buildSequences(dbApplication: DbApplication, jsonEntity: JsonApplicationEntity): ISequence[];
}
//# sourceMappingURL=MySqlSchemaBuilder.d.ts.map