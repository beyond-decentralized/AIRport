import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
export declare class MappedSuperclassBuilder {
    private config;
    private entityMapByName;
    mappedSuperclassVarName: string;
    constructor(config: Configuration, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
    private buildEntity;
    private dropCircularDependencies;
}
