export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "sinceVersion": number;
    "versions": {
        "entities": ({
            "columns": {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "notNull": boolean;
                "propertyRefs": {
                    "index": number;
                }[];
                "sinceVersion": number;
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
                "sinceVersion": number;
            }[];
            "relations": any[];
            "sinceVersion": number;
            "tableConfig": {
                "name": string;
                "indexes": any[];
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
            "sinceVersion": number;
            "tableConfig"?: undefined;
        })[];
        "integerVersion": number;
        "referencedSchemas": any[];
        "versionString": string;
    }[];
};
