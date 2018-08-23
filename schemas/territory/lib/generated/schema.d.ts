export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "versions": {
        "entities": ({
            "columns": ({
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            })[];
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": ({
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": {
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            }[];
            "tableConfig": {
                "name": string;
            };
        })[];
        "integerVersion": number;
        "referencedSchemas": any[];
        "versionString": string;
    }[];
};
