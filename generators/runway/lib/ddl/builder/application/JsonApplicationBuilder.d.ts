import { JsonApplicationWithApi } from '@airport/check-in';
import { DbApplication, JsonOperation, JsonApplication } from '@airport/ground-control';
import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { SIndexedApplication } from './SApplication';
export declare class JsonApplicationBuilder {
    private config;
    private entityMapByName;
    existingApplication: JsonApplication;
    constructor(config: Configuration, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, existingApplicationString: string);
    build(domain: string, applicationMapByProjectName: {
        [projectName: string]: DbApplication;
    }, entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }): [JsonApplicationWithApi, SIndexedApplication];
    addOperations(jsonApplication: JsonApplication, entityOperationMap: {
        [entityName: string]: {
            [operationName: string]: JsonOperation;
        };
    }): void;
    private convertSIndexedApplicationToJsonApplication;
    private convertTableConfig;
    private getIdColumnReferences;
    private getPropertiesAndRelations;
    private buildColumnRelations;
    private prepOneToManyElems;
}
//# sourceMappingURL=JsonApplicationBuilder.d.ts.map