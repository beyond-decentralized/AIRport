export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "versions": {
        "entities": ({
            "columns": {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            }[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
            }[];
            "relations": any[];
            "tableConfig": {
                "name": string;
            };
        } | {
            "columns": any[];
            "idColumnRefs": any[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": any[];
            "relations": any[];
            "tableConfig"?: undefined;
        })[];
        "referencedSchemas": any[];
        "versionString": string;
    }[];
};
