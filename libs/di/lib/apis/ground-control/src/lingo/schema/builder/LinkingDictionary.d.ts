import { RelationColumnReference } from "./RelationColumnReference";
export interface ILinkingDictionary {
    dbColumnRelationMapByManySide: {
        [domain: string]: {
            [schemaName: string]: {
                [entityIndex: number]: {
                    [manyRelationIndex: number]: {
                        [manyColumnIndex: number]: RelationColumnReference;
                    };
                };
            };
        };
    };
    dbColumnRelationMapByOneSide: {
        [domain: string]: {
            [schemaName: string]: {
                [entityIndex: number]: {
                    [oneRelationIndex: number]: {
                        [oneColumnIndex: number]: RelationColumnReference;
                    };
                };
            };
        };
    };
}
//# sourceMappingURL=LinkingDictionary.d.ts.map