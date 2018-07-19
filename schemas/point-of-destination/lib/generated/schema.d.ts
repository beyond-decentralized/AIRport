export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "versions": {
        "entities": {
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
                    "oneSchemaIndex": number;
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
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            })[];
            "relations": {
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex": number;
            }[];
            "tableConfig": {
                "name": string;
            };
        }[];
        "referencedSchemas": any[];
        "versionString": string;
    }[];
};
