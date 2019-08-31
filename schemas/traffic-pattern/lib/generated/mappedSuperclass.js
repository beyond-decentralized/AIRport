"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPPED_SUPERCLASS = [
    {
        "type": "VersionedSchemaObject",
        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/VersionedSchemaObject.ts",
        "parentClassName": null,
        "isSuperclass": true,
        "ids": [],
        "docEntry": {
            "decorators": [
                {
                    "name": "MappedSuperclass",
                    "values": []
                }
            ],
            "isGenerated": false,
            "isId": false,
            "isMappedSuperclass": true,
            "isTransient": false,
            "name": "VersionedSchemaObject",
            "type": "typeof VersionedSchemaObject",
            "fileImports": {
                "importMapByObjectAsName": {
                    "JoinColumn": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "JoinColumn": {
                                "asName": "JoinColumn",
                                "moduleImport": null,
                                "sourceName": "JoinColumn"
                            },
                            "ManyToOne": {
                                "asName": "ManyToOne",
                                "moduleImport": null,
                                "sourceName": "ManyToOne"
                            },
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-control"
                    },
                    "ManyToOne": null,
                    "MappedSuperclass": null,
                    "SchemaVersion": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "SchemaVersion": {
                                "asName": "SchemaVersion",
                                "moduleImport": null,
                                "sourceName": "SchemaVersion"
                            }
                        },
                        "path": "./SchemaVersion"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-control": null,
                    "./SchemaVersion": null
                }
            },
            "properties": [
                {
                    "decorators": [
                        {
                            "name": "ManyToOne",
                            "values": []
                        },
                        {
                            "name": "JoinColumn",
                            "values": [
                                {
                                    "name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
                                    "referencedColumnName": "ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "deprecatedSinceVersion",
                    "type": "SchemaVersion",
                    "ownerEntity": null,
                    "nonArrayType": "SchemaVersion",
                    "entity": {
                        "type": "SchemaVersion",
                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/SchemaVersion.ts",
                        "parentClassName": null,
                        "isSuperclass": false,
                        "ids": [
                            {
                                "allocationSize": 100,
                                "decorators": [
                                    {
                                        "name": "Id",
                                        "values": []
                                    },
                                    {
                                        "name": "SequenceGenerator",
                                        "values": [
                                            {
                                                "allocationSize": 100
                                            }
                                        ]
                                    },
                                    {
                                        "name": "DbNumber",
                                        "values": []
                                    }
                                ],
                                "isGenerated": false,
                                "isId": true,
                                "isMappedSuperclass": false,
                                "isTransient": false,
                                "name": "id",
                                "type": "number",
                                "ownerEntity": null,
                                "nonArrayType": "number",
                                "primitive": "number",
                                "index": 0
                            }
                        ],
                        "docEntry": {
                            "decorators": [
                                {
                                    "name": "Entity",
                                    "values": []
                                },
                                {
                                    "name": "Table",
                                    "values": [
                                        {
                                            "name": "SCHEMA_VERSIONS"
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "SchemaVersion",
                            "type": "typeof SchemaVersion",
                            "fileImports": {
                                "importMapByObjectAsName": {
                                    "Column": {
                                        "fileImports": null,
                                        "isLocal": false,
                                        "objectMapByAsName": {
                                            "Column": {
                                                "asName": "Column",
                                                "moduleImport": null,
                                                "sourceName": "Column"
                                            },
                                            "DbNumber": {
                                                "asName": "DbNumber",
                                                "moduleImport": null,
                                                "sourceName": "DbNumber"
                                            },
                                            "Entity": {
                                                "asName": "Entity",
                                                "moduleImport": null,
                                                "sourceName": "Entity"
                                            },
                                            "GeneratedValue": {
                                                "asName": "GeneratedValue",
                                                "moduleImport": null,
                                                "sourceName": "GeneratedValue"
                                            },
                                            "Id": {
                                                "asName": "Id",
                                                "moduleImport": null,
                                                "sourceName": "Id"
                                            },
                                            "JoinColumn": {
                                                "asName": "JoinColumn",
                                                "moduleImport": null,
                                                "sourceName": "JoinColumn"
                                            },
                                            "ManyToOne": {
                                                "asName": "ManyToOne",
                                                "moduleImport": null,
                                                "sourceName": "ManyToOne"
                                            },
                                            "OneToMany": {
                                                "asName": "OneToMany",
                                                "moduleImport": null,
                                                "sourceName": "OneToMany"
                                            },
                                            "SequenceGenerator": {
                                                "asName": "SequenceGenerator",
                                                "moduleImport": null,
                                                "sourceName": "SequenceGenerator"
                                            },
                                            "Table": {
                                                "asName": "Table",
                                                "moduleImport": null,
                                                "sourceName": "Table"
                                            },
                                            "Transient": {
                                                "asName": "Transient",
                                                "moduleImport": null,
                                                "sourceName": "Transient"
                                            }
                                        },
                                        "path": "@airport/air-control"
                                    },
                                    "DbNumber": null,
                                    "Entity": null,
                                    "GeneratedValue": null,
                                    "Id": null,
                                    "JoinColumn": null,
                                    "ManyToOne": null,
                                    "OneToMany": null,
                                    "SequenceGenerator": null,
                                    "Table": null,
                                    "Transient": null,
                                    "SchemaVersionId": {
                                        "fileImports": null,
                                        "isLocal": false,
                                        "objectMapByAsName": {
                                            "SchemaVersionId": {
                                                "asName": "SchemaVersionId",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionId"
                                            },
                                            "SchemaVersionInteger": {
                                                "asName": "SchemaVersionInteger",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionInteger"
                                            },
                                            "SchemaVersionMajor": {
                                                "asName": "SchemaVersionMajor",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionMajor"
                                            },
                                            "SchemaVersionMinor": {
                                                "asName": "SchemaVersionMinor",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionMinor"
                                            },
                                            "SchemaVersionPatch": {
                                                "asName": "SchemaVersionPatch",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionPatch"
                                            },
                                            "SchemaVersionString": {
                                                "asName": "SchemaVersionString",
                                                "moduleImport": null,
                                                "sourceName": "SchemaVersionString"
                                            }
                                        },
                                        "path": "@airport/ground-control"
                                    },
                                    "SchemaVersionInteger": null,
                                    "SchemaVersionMajor": null,
                                    "SchemaVersionMinor": null,
                                    "SchemaVersionPatch": null,
                                    "SchemaVersionString": null,
                                    "ISchemaEntity": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "ISchemaEntity": {
                                                "asName": "ISchemaEntity",
                                                "moduleImport": null,
                                                "sourceName": "ISchemaEntity"
                                            }
                                        },
                                        "path": "../../generated/schema/qschemaentity"
                                    },
                                    "ISchemaReference": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "ISchemaReference": {
                                                "asName": "ISchemaReference",
                                                "moduleImport": null,
                                                "sourceName": "ISchemaReference"
                                            }
                                        },
                                        "path": "../../generated/schema/qschemareference"
                                    },
                                    "Schema": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "Schema": {
                                                "asName": "Schema",
                                                "moduleImport": null,
                                                "sourceName": "Schema"
                                            }
                                        },
                                        "path": "./Schema"
                                    },
                                    "SchemaEntity": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "SchemaEntity": {
                                                "asName": "SchemaEntity",
                                                "moduleImport": null,
                                                "sourceName": "SchemaEntity"
                                            }
                                        },
                                        "path": "./SchemaEntity"
                                    },
                                    "SchemaReference": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "SchemaReference": {
                                                "asName": "SchemaReference",
                                                "moduleImport": null,
                                                "sourceName": "SchemaReference"
                                            }
                                        },
                                        "path": "./SchemaReference"
                                    }
                                },
                                "importMapByModulePath": {
                                    "@airport/air-control": null,
                                    "@airport/ground-control": null,
                                    "../../generated/schema/qschemaentity": null,
                                    "../../generated/schema/qschemareference": null,
                                    "./Schema": null,
                                    "./SchemaEntity": null,
                                    "./SchemaReference": null
                                }
                            },
                            "properties": [
                                {
                                    "allocationSize": 100,
                                    "decorators": [
                                        {
                                            "name": "Id",
                                            "values": []
                                        },
                                        {
                                            "name": "SequenceGenerator",
                                            "values": [
                                                {
                                                    "allocationSize": 100
                                                }
                                            ]
                                        },
                                        {
                                            "name": "DbNumber",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": true,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "id",
                                    "type": "number",
                                    "ownerEntity": null,
                                    "nonArrayType": "number",
                                    "primitive": "number",
                                    "index": 0
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "INTEGER_VERSION",
                                                    "nullable": false
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "integerVersion",
                                    "type": "number",
                                    "ownerEntity": null,
                                    "nonArrayType": "number",
                                    "primitive": "number",
                                    "index": 1
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "VERSION_STRING",
                                                    "nullable": false
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "versionString",
                                    "type": "string",
                                    "ownerEntity": null,
                                    "nonArrayType": "string",
                                    "primitive": "string",
                                    "index": 2
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "MAJOR_VERSION",
                                                    "nullable": false
                                                }
                                            ]
                                        },
                                        {
                                            "name": "DbNumber",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "majorVersion",
                                    "type": "number",
                                    "ownerEntity": null,
                                    "nonArrayType": "number",
                                    "primitive": "number",
                                    "index": 3
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "MINOR_VERSION",
                                                    "nullable": false
                                                }
                                            ]
                                        },
                                        {
                                            "name": "DbNumber",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "minorVersion",
                                    "type": "number",
                                    "ownerEntity": null,
                                    "nonArrayType": "number",
                                    "primitive": "number",
                                    "index": 4
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "PATCH_VERSION",
                                                    "nullable": false
                                                }
                                            ]
                                        },
                                        {
                                            "name": "DbNumber",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "patchVersion",
                                    "type": "number",
                                    "ownerEntity": null,
                                    "nonArrayType": "number",
                                    "primitive": "number",
                                    "index": 5
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "ManyToOne",
                                            "values": []
                                        },
                                        {
                                            "name": "JoinColumn",
                                            "values": [
                                                {
                                                    "name": "SCHEMA_INDEX",
                                                    "nullable": false
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "schema",
                                    "type": "Schema",
                                    "ownerEntity": null,
                                    "nonArrayType": "Schema",
                                    "entity": {
                                        "type": "Schema",
                                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/Schema.ts",
                                        "parentClassName": null,
                                        "isSuperclass": false,
                                        "ids": [
                                            {
                                                "decorators": [
                                                    {
                                                        "name": "Id",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "DbNumber",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "Column",
                                                        "values": [
                                                            {
                                                                "name": "SCHEMA_INDEX",
                                                                "nullable": false
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "isGenerated": false,
                                                "isId": true,
                                                "isMappedSuperclass": false,
                                                "isTransient": false,
                                                "name": "index",
                                                "type": "number",
                                                "ownerEntity": null,
                                                "nonArrayType": "number",
                                                "primitive": "number",
                                                "index": 0
                                            }
                                        ],
                                        "docEntry": {
                                            "decorators": [
                                                {
                                                    "name": "Entity",
                                                    "values": []
                                                },
                                                {
                                                    "name": "Table",
                                                    "values": [
                                                        {
                                                            "name": "SCHEMAS"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "Schema",
                                            "type": "typeof Schema",
                                            "fileImports": {
                                                "importMapByObjectAsName": {
                                                    "Column": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "Column": {
                                                                "asName": "Column",
                                                                "moduleImport": null,
                                                                "sourceName": "Column"
                                                            },
                                                            "DbNumber": {
                                                                "asName": "DbNumber",
                                                                "moduleImport": null,
                                                                "sourceName": "DbNumber"
                                                            },
                                                            "DbString": {
                                                                "asName": "DbString",
                                                                "moduleImport": null,
                                                                "sourceName": "DbString"
                                                            },
                                                            "Entity": {
                                                                "asName": "Entity",
                                                                "moduleImport": null,
                                                                "sourceName": "Entity"
                                                            },
                                                            "Id": {
                                                                "asName": "Id",
                                                                "moduleImport": null,
                                                                "sourceName": "Id"
                                                            },
                                                            "JoinColumn": {
                                                                "asName": "JoinColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "JoinColumn"
                                                            },
                                                            "ManyToOne": {
                                                                "asName": "ManyToOne",
                                                                "moduleImport": null,
                                                                "sourceName": "ManyToOne"
                                                            },
                                                            "OneToMany": {
                                                                "asName": "OneToMany",
                                                                "moduleImport": null,
                                                                "sourceName": "OneToMany"
                                                            },
                                                            "Table": {
                                                                "asName": "Table",
                                                                "moduleImport": null,
                                                                "sourceName": "Table"
                                                            }
                                                        },
                                                        "path": "@airport/air-control"
                                                    },
                                                    "DbNumber": null,
                                                    "DbString": null,
                                                    "Entity": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "ManyToOne": null,
                                                    "OneToMany": null,
                                                    "Table": null,
                                                    "SchemaIndex": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "SchemaIndex": {
                                                                "asName": "SchemaIndex",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaIndex"
                                                            },
                                                            "SchemaName": {
                                                                "asName": "SchemaName",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaName"
                                                            },
                                                            "SchemaScope": {
                                                                "asName": "SchemaScope",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaScope"
                                                            },
                                                            "SchemaStatus": {
                                                                "asName": "SchemaStatus",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaStatus"
                                                            }
                                                        },
                                                        "path": "@airport/ground-control"
                                                    },
                                                    "SchemaName": null,
                                                    "SchemaScope": null,
                                                    "SchemaStatus": null,
                                                    "Domain": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "Domain": {
                                                                "asName": "Domain",
                                                                "moduleImport": null,
                                                                "sourceName": "Domain"
                                                            }
                                                        },
                                                        "path": "@airport/territory"
                                                    },
                                                    "SchemaVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaVersion": {
                                                                "asName": "SchemaVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaVersion"
                                                            }
                                                        },
                                                        "path": "./SchemaVersion"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-control": null,
                                                    "@airport/ground-control": null,
                                                    "@airport/territory": null,
                                                    "./SchemaVersion": null
                                                }
                                            },
                                            "properties": [
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Id",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "DbNumber",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "SCHEMA_INDEX",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": true,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "index",
                                                    "type": "number",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "number",
                                                    "primitive": "number",
                                                    "index": 0
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "ManyToOne",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "JoinColumn",
                                                            "values": [
                                                                {
                                                                    "name": "DOMAIN_ID",
                                                                    "referencedColumnName": "ID",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "domain",
                                                    "type": "Domain",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "Domain",
                                                    "fromProject": "@airport/territory",
                                                    "otherSchemaDbEntity": {
                                                        "columnMap": null,
                                                        "columns": [
                                                            {
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 0,
                                                                "isGenerated": false,
                                                                "name": "ID",
                                                                "notNull": false,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null
                                                                    }
                                                                ],
                                                                "sinceVersion": null,
                                                                "type": 4,
                                                                "idIndex": 0
                                                            },
                                                            {
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 1,
                                                                "isGenerated": false,
                                                                "name": "NAME",
                                                                "notNull": false,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null
                                                                    }
                                                                ],
                                                                "sinceVersion": null,
                                                                "type": 5
                                                            }
                                                        ],
                                                        "idColumns": [
                                                            {
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 0,
                                                                "isGenerated": false,
                                                                "name": "ID",
                                                                "notNull": false,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null
                                                                    }
                                                                ],
                                                                "sinceVersion": null,
                                                                "type": 4,
                                                                "idIndex": 0
                                                            }
                                                        ],
                                                        "id": null,
                                                        "index": 2,
                                                        "isLocal": true,
                                                        "isRepositoryEntity": false,
                                                        "name": "Domain",
                                                        "propertyMap": null,
                                                        "properties": [
                                                            {
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null
                                                                    }
                                                                ],
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 0,
                                                                "isId": true,
                                                                "name": "id",
                                                                "relation": null,
                                                                "sinceVersion": null
                                                            },
                                                            {
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null
                                                                    }
                                                                ],
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 1,
                                                                "isId": false,
                                                                "name": "name",
                                                                "relation": null,
                                                                "sinceVersion": null
                                                            },
                                                            {
                                                                "propertyColumns": [],
                                                                "entity": null,
                                                                "id": null,
                                                                "index": 2,
                                                                "isId": false,
                                                                "name": "applications",
                                                                "relation": [
                                                                    {
                                                                        "isId": false,
                                                                        "oneToManyElems": null,
                                                                        "relationType": 0,
                                                                        "id": null,
                                                                        "index": 0,
                                                                        "property": null,
                                                                        "manyRelationColumns": [],
                                                                        "oneRelationColumns": [],
                                                                        "relationEntity": null,
                                                                        "sinceVersion": null
                                                                    }
                                                                ],
                                                                "sinceVersion": null
                                                            }
                                                        ],
                                                        "relationReferences": [],
                                                        "relations": [
                                                            {
                                                                "isId": false,
                                                                "oneToManyElems": null,
                                                                "relationType": 0,
                                                                "id": null,
                                                                "index": 0,
                                                                "property": null,
                                                                "manyRelationColumns": [],
                                                                "oneRelationColumns": [],
                                                                "relationEntity": null,
                                                                "sinceVersion": null
                                                            }
                                                        ],
                                                        "schemaVersion": null,
                                                        "sinceVersion": null,
                                                        "tableConfig": null
                                                    },
                                                    "index": 1
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "SCOPE",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "DbString",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "scope",
                                                    "type": "SchemaScope",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaScope",
                                                    "primitive": "string",
                                                    "index": 2
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "SCHEMA_NAME",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "DbString",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "name",
                                                    "type": "string",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "string",
                                                    "primitive": "string",
                                                    "index": 3
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "STATUS",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "DbNumber",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "status",
                                                    "type": "SchemaStatus",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaStatus",
                                                    "primitive": "number",
                                                    "index": 4
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "schema"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "versions",
                                                    "type": "SchemaVersion[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaVersion",
                                                    "entity": null,
                                                    "index": 5
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "ManyToOne",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "JoinColumn",
                                                            "values": [
                                                                {
                                                                    "name": "CURRENT_VERSION_ID",
                                                                    "referencedColumnName": "ID",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "currentVersion",
                                                    "type": "SchemaVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaVersion",
                                                    "entity": null,
                                                    "index": 6
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "Schema"
                                                }
                                            ]
                                        },
                                        "implementedInterfaceNames": []
                                    },
                                    "index": 6
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "OneToMany",
                                            "values": [
                                                {
                                                    "mappedBy": "schemaVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "entities",
                                    "type": "SchemaEntity[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "SchemaEntity",
                                    "entity": {
                                        "type": "SchemaEntity",
                                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/SchemaEntity.ts",
                                        "parentClassName": "VersionedSchemaObject",
                                        "location": "./VersionedSchemaObject",
                                        "isSuperclass": false,
                                        "ids": [
                                            {
                                                "decorators": [
                                                    {
                                                        "name": "Id",
                                                        "values": []
                                                    }
                                                ],
                                                "isGenerated": false,
                                                "isId": true,
                                                "isMappedSuperclass": false,
                                                "isTransient": false,
                                                "name": "id",
                                                "type": "number",
                                                "ownerEntity": null,
                                                "nonArrayType": "number",
                                                "primitive": "number",
                                                "index": 0
                                            }
                                        ],
                                        "docEntry": {
                                            "decorators": [
                                                {
                                                    "name": "Entity",
                                                    "values": []
                                                },
                                                {
                                                    "name": "Table",
                                                    "values": [
                                                        {
                                                            "name": "SCHEMA_ENTITIES"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "SchemaEntity",
                                            "type": "typeof SchemaEntity",
                                            "fileImports": {
                                                "importMapByObjectAsName": {
                                                    "Column": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "Column": {
                                                                "asName": "Column",
                                                                "moduleImport": null,
                                                                "sourceName": "Column"
                                                            },
                                                            "Entity": {
                                                                "asName": "Entity",
                                                                "moduleImport": null,
                                                                "sourceName": "Entity"
                                                            },
                                                            "GeneratedValue": {
                                                                "asName": "GeneratedValue",
                                                                "moduleImport": null,
                                                                "sourceName": "GeneratedValue"
                                                            },
                                                            "Id": {
                                                                "asName": "Id",
                                                                "moduleImport": null,
                                                                "sourceName": "Id"
                                                            },
                                                            "JoinColumn": {
                                                                "asName": "JoinColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "JoinColumn"
                                                            },
                                                            "Json": {
                                                                "asName": "Json",
                                                                "moduleImport": null,
                                                                "sourceName": "Json"
                                                            },
                                                            "ManyToOne": {
                                                                "asName": "ManyToOne",
                                                                "moduleImport": null,
                                                                "sourceName": "ManyToOne"
                                                            },
                                                            "OneToMany": {
                                                                "asName": "OneToMany",
                                                                "moduleImport": null,
                                                                "sourceName": "OneToMany"
                                                            },
                                                            "Table": {
                                                                "asName": "Table",
                                                                "moduleImport": null,
                                                                "sourceName": "Table"
                                                            },
                                                            "TableConfiguration": {
                                                                "asName": "TableConfiguration",
                                                                "moduleImport": null,
                                                                "sourceName": "TableConfiguration"
                                                            },
                                                            "Transient": {
                                                                "asName": "Transient",
                                                                "moduleImport": null,
                                                                "sourceName": "Transient"
                                                            }
                                                        },
                                                        "path": "@airport/air-control"
                                                    },
                                                    "Entity": null,
                                                    "GeneratedValue": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "Json": null,
                                                    "ManyToOne": null,
                                                    "OneToMany": null,
                                                    "Table": null,
                                                    "TableConfiguration": null,
                                                    "Transient": null,
                                                    "DbNumber": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "DbNumber": {
                                                                "asName": "DbNumber",
                                                                "moduleImport": null,
                                                                "sourceName": "DbNumber"
                                                            }
                                                        },
                                                        "path": "@airport/air-control"
                                                    },
                                                    "CascadeType": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "CascadeType": {
                                                                "asName": "CascadeType",
                                                                "moduleImport": null,
                                                                "sourceName": "CascadeType"
                                                            },
                                                            "EntityId": {
                                                                "asName": "EntityId",
                                                                "moduleImport": null,
                                                                "sourceName": "EntityId"
                                                            },
                                                            "EntityIsLocal": {
                                                                "asName": "EntityIsLocal",
                                                                "moduleImport": null,
                                                                "sourceName": "EntityIsLocal"
                                                            },
                                                            "EntityIsRepositoryEntity": {
                                                                "asName": "EntityIsRepositoryEntity",
                                                                "moduleImport": null,
                                                                "sourceName": "EntityIsRepositoryEntity"
                                                            },
                                                            "EntityName": {
                                                                "asName": "EntityName",
                                                                "moduleImport": null,
                                                                "sourceName": "EntityName"
                                                            },
                                                            "TableIndex": {
                                                                "asName": "TableIndex",
                                                                "moduleImport": null,
                                                                "sourceName": "TableIndex"
                                                            }
                                                        },
                                                        "path": "@airport/ground-control"
                                                    },
                                                    "EntityId": null,
                                                    "EntityIsLocal": null,
                                                    "EntityIsRepositoryEntity": null,
                                                    "EntityName": null,
                                                    "TableIndex": null,
                                                    "ISchemaColumn": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ISchemaColumn": {
                                                                "asName": "ISchemaColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "ISchemaColumn"
                                                            }
                                                        },
                                                        "path": "../../generated/schema/qschemacolumn"
                                                    },
                                                    "ISchemaProperty": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ISchemaProperty": {
                                                                "asName": "ISchemaProperty",
                                                                "moduleImport": null,
                                                                "sourceName": "ISchemaProperty"
                                                            }
                                                        },
                                                        "path": "../../generated/schema/qschemaproperty"
                                                    },
                                                    "SchemaColumn": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaColumn": {
                                                                "asName": "SchemaColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaColumn"
                                                            }
                                                        },
                                                        "path": "./SchemaColumn"
                                                    },
                                                    "SchemaProperty": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaProperty": {
                                                                "asName": "SchemaProperty",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaProperty"
                                                            }
                                                        },
                                                        "path": "./SchemaProperty"
                                                    },
                                                    "SchemaRelation": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaRelation": {
                                                                "asName": "SchemaRelation",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaRelation"
                                                            }
                                                        },
                                                        "path": "./SchemaRelation"
                                                    },
                                                    "SchemaVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaVersion": {
                                                                "asName": "SchemaVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaVersion"
                                                            }
                                                        },
                                                        "path": "./SchemaVersion"
                                                    },
                                                    "VersionedSchemaObject": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "VersionedSchemaObject": {
                                                                "asName": "VersionedSchemaObject",
                                                                "moduleImport": null,
                                                                "sourceName": "VersionedSchemaObject"
                                                            }
                                                        },
                                                        "path": "./VersionedSchemaObject"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-control": null,
                                                    "@airport/ground-control": null,
                                                    "../../generated/schema/qschemacolumn": null,
                                                    "../../generated/schema/qschemaproperty": null,
                                                    "./SchemaColumn": null,
                                                    "./SchemaProperty": null,
                                                    "./SchemaRelation": null,
                                                    "./SchemaVersion": null,
                                                    "./VersionedSchemaObject": null
                                                }
                                            },
                                            "properties": [
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Id",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": true,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "id",
                                                    "type": "number",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "number",
                                                    "primitive": "number",
                                                    "index": 0
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "TABLE_INDEX",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "DbNumber",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "index",
                                                    "type": "number",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "number",
                                                    "primitive": "number",
                                                    "index": 1
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "IS_LOCAL",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "isLocal",
                                                    "type": "boolean",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "boolean",
                                                    "primitive": "boolean",
                                                    "index": 2
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "IS_REPOSITORY_ENTITY",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "isRepositoryEntity",
                                                    "type": "boolean",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "boolean",
                                                    "primitive": "boolean",
                                                    "index": 3
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "NAME",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "name",
                                                    "type": "string",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "string",
                                                    "primitive": "string",
                                                    "index": 4
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "TABLE_CONFIGURATION",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "Json",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "tableConfig",
                                                    "type": "TableConfiguration",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "TableConfiguration",
                                                    "primitive": "Json",
                                                    "index": 5
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "ManyToOne",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "JoinColumn",
                                                            "values": [
                                                                {
                                                                    "name": "SCHEMA_VERSION_ID",
                                                                    "referencedColumnName": "ID",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "schemaVersion",
                                                    "type": "SchemaVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaVersion",
                                                    "entity": null,
                                                    "index": 6
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "entity"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "columns",
                                                    "type": "SchemaColumn[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaColumn",
                                                    "entity": {
                                                        "type": "SchemaColumn",
                                                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/SchemaColumn.ts",
                                                        "parentClassName": "VersionedSchemaObject",
                                                        "location": "./VersionedSchemaObject",
                                                        "isSuperclass": false,
                                                        "ids": [
                                                            {
                                                                "decorators": [
                                                                    {
                                                                        "name": "Id",
                                                                        "values": []
                                                                    }
                                                                ],
                                                                "isGenerated": false,
                                                                "isId": true,
                                                                "isMappedSuperclass": false,
                                                                "isTransient": false,
                                                                "name": "id",
                                                                "type": "number",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "number",
                                                                "primitive": "number",
                                                                "index": 0
                                                            }
                                                        ],
                                                        "docEntry": {
                                                            "decorators": [
                                                                {
                                                                    "name": "Entity",
                                                                    "values": []
                                                                },
                                                                {
                                                                    "name": "Table",
                                                                    "values": [
                                                                        {
                                                                            "name": "SCHEMA_COLUMNS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "SchemaColumn",
                                                            "type": "typeof SchemaColumn",
                                                            "fileImports": {
                                                                "importMapByObjectAsName": {
                                                                    "Column": {
                                                                        "fileImports": null,
                                                                        "isLocal": false,
                                                                        "objectMapByAsName": {
                                                                            "Column": {
                                                                                "asName": "Column",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Column"
                                                                            },
                                                                            "DbNumber": {
                                                                                "asName": "DbNumber",
                                                                                "moduleImport": null,
                                                                                "sourceName": "DbNumber"
                                                                            },
                                                                            "Entity": {
                                                                                "asName": "Entity",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Entity"
                                                                            },
                                                                            "GeneratedValue": {
                                                                                "asName": "GeneratedValue",
                                                                                "moduleImport": null,
                                                                                "sourceName": "GeneratedValue"
                                                                            },
                                                                            "Id": {
                                                                                "asName": "Id",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Id"
                                                                            },
                                                                            "JoinColumn": {
                                                                                "asName": "JoinColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "JoinColumn"
                                                                            },
                                                                            "ManyToOne": {
                                                                                "asName": "ManyToOne",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ManyToOne"
                                                                            },
                                                                            "OneToMany": {
                                                                                "asName": "OneToMany",
                                                                                "moduleImport": null,
                                                                                "sourceName": "OneToMany"
                                                                            },
                                                                            "Table": {
                                                                                "asName": "Table",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Table"
                                                                            }
                                                                        },
                                                                        "path": "@airport/air-control"
                                                                    },
                                                                    "DbNumber": null,
                                                                    "Entity": null,
                                                                    "GeneratedValue": null,
                                                                    "Id": null,
                                                                    "JoinColumn": null,
                                                                    "ManyToOne": null,
                                                                    "OneToMany": null,
                                                                    "Table": null,
                                                                    "ColumnId": {
                                                                        "fileImports": null,
                                                                        "isLocal": false,
                                                                        "objectMapByAsName": {
                                                                            "ColumnId": {
                                                                                "asName": "ColumnId",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnId"
                                                                            },
                                                                            "ColumnIndex": {
                                                                                "asName": "ColumnIndex",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnIndex"
                                                                            },
                                                                            "ColumnName": {
                                                                                "asName": "ColumnName",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnName"
                                                                            },
                                                                            "ColumnNotNull": {
                                                                                "asName": "ColumnNotNull",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnNotNull"
                                                                            },
                                                                            "IdColumnOnlyIndex": {
                                                                                "asName": "IdColumnOnlyIndex",
                                                                                "moduleImport": null,
                                                                                "sourceName": "IdColumnOnlyIndex"
                                                                            },
                                                                            "SchemaColumnAllocationSize": {
                                                                                "asName": "SchemaColumnAllocationSize",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SchemaColumnAllocationSize"
                                                                            },
                                                                            "SchemaColumnIsGenerated": {
                                                                                "asName": "SchemaColumnIsGenerated",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SchemaColumnIsGenerated"
                                                                            },
                                                                            "SQLDataType": {
                                                                                "asName": "SQLDataType",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SQLDataType"
                                                                            }
                                                                        },
                                                                        "path": "@airport/ground-control"
                                                                    },
                                                                    "ColumnIndex": null,
                                                                    "ColumnName": null,
                                                                    "ColumnNotNull": null,
                                                                    "IdColumnOnlyIndex": null,
                                                                    "SchemaColumnAllocationSize": null,
                                                                    "SchemaColumnIsGenerated": null,
                                                                    "SQLDataType": null,
                                                                    "ISchemaPropertyColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ISchemaPropertyColumn": {
                                                                                "asName": "ISchemaPropertyColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ISchemaPropertyColumn"
                                                                            }
                                                                        },
                                                                        "path": "../../generated/schema/qschemapropertycolumn"
                                                                    },
                                                                    "ISchemaRelationColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ISchemaRelationColumn": {
                                                                                "asName": "ISchemaRelationColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ISchemaRelationColumn"
                                                                            }
                                                                        },
                                                                        "path": "../../generated/schema/qschemarelationcolumn"
                                                                    },
                                                                    "SchemaEntity": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "SchemaEntity": {
                                                                                "asName": "SchemaEntity",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SchemaEntity"
                                                                            }
                                                                        },
                                                                        "path": "./SchemaEntity"
                                                                    },
                                                                    "VersionedSchemaObject": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "VersionedSchemaObject": {
                                                                                "asName": "VersionedSchemaObject",
                                                                                "moduleImport": null,
                                                                                "sourceName": "VersionedSchemaObject"
                                                                            }
                                                                        },
                                                                        "path": "./VersionedSchemaObject"
                                                                    }
                                                                },
                                                                "importMapByModulePath": {
                                                                    "@airport/air-control": null,
                                                                    "@airport/ground-control": null,
                                                                    "../../generated/schema/qschemapropertycolumn": null,
                                                                    "../../generated/schema/qschemarelationcolumn": null,
                                                                    "./SchemaEntity": null,
                                                                    "./VersionedSchemaObject": null
                                                                }
                                                            },
                                                            "properties": [
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Id",
                                                                            "values": []
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": true,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "id",
                                                                    "type": "number",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "number",
                                                                    "primitive": "number",
                                                                    "index": 0
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "COLUMN_INDEX",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "index",
                                                                    "type": "number",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "number",
                                                                    "primitive": "number",
                                                                    "index": 1
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "ManyToOne",
                                                                            "values": []
                                                                        },
                                                                        {
                                                                            "name": "JoinColumn",
                                                                            "values": [
                                                                                {
                                                                                    "name": "SCHEMA_ENTITY_ID",
                                                                                    "referencedColumnName": "ID",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "entity",
                                                                    "type": "SchemaEntity",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "SchemaEntity",
                                                                    "entity": null,
                                                                    "index": 2
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "ID_INDEX"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "idIndex",
                                                                    "type": "number",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "number",
                                                                    "primitive": "number",
                                                                    "index": 3
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "IS_GENERATED",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "isGenerated",
                                                                    "type": "boolean",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "boolean",
                                                                    "primitive": "boolean",
                                                                    "index": 4
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "ALLOCATION_SIZE"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "allocationSize",
                                                                    "type": "number",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "number",
                                                                    "primitive": "number",
                                                                    "index": 5
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "NAME",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "name",
                                                                    "type": "string",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "string",
                                                                    "primitive": "string",
                                                                    "index": 6
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "NOT_NULL",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "notNull",
                                                                    "type": "boolean",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "boolean",
                                                                    "primitive": "boolean",
                                                                    "index": 7
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "DbNumber",
                                                                            "values": []
                                                                        },
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "TYPE",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "type",
                                                                    "type": "SQLDataType",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "SQLDataType",
                                                                    "primitive": "number",
                                                                    "index": 8
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "OneToMany",
                                                                            "values": [
                                                                                {
                                                                                    "mappedBy": "column"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "propertyColumns",
                                                                    "type": "ISchemaPropertyColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ISchemaPropertyColumn",
                                                                    "entity": {
                                                                        "type": "SchemaPropertyColumn",
                                                                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/SchemaPropertyColumn.ts",
                                                                        "parentClassName": "VersionedSchemaObject",
                                                                        "location": "./VersionedSchemaObject",
                                                                        "isSuperclass": false,
                                                                        "ids": [
                                                                            {
                                                                                "decorators": [
                                                                                    {
                                                                                        "name": "Id",
                                                                                        "values": []
                                                                                    },
                                                                                    {
                                                                                        "name": "ManyToOne",
                                                                                        "values": []
                                                                                    },
                                                                                    {
                                                                                        "name": "JoinColumn",
                                                                                        "values": [
                                                                                            {
                                                                                                "name": "SCHEMA_COLUMN_ID",
                                                                                                "referencedColumnName": "ID",
                                                                                                "nullable": false
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ],
                                                                                "isGenerated": false,
                                                                                "isId": true,
                                                                                "isMappedSuperclass": false,
                                                                                "isTransient": false,
                                                                                "name": "column",
                                                                                "type": "ISchemaColumn",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "ISchemaColumn",
                                                                                "entity": null,
                                                                                "index": 0
                                                                            },
                                                                            {
                                                                                "decorators": [
                                                                                    {
                                                                                        "name": "Id",
                                                                                        "values": []
                                                                                    },
                                                                                    {
                                                                                        "name": "ManyToOne",
                                                                                        "values": []
                                                                                    },
                                                                                    {
                                                                                        "name": "JoinColumn",
                                                                                        "values": [
                                                                                            {
                                                                                                "name": "SCHEMA_PROPERTY_ID",
                                                                                                "referencedColumnName": "ID",
                                                                                                "nullable": false
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ],
                                                                                "isGenerated": false,
                                                                                "isId": true,
                                                                                "isMappedSuperclass": false,
                                                                                "isTransient": false,
                                                                                "name": "property",
                                                                                "type": "ISchemaProperty",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "ISchemaProperty",
                                                                                "entity": null,
                                                                                "index": 1
                                                                            }
                                                                        ],
                                                                        "docEntry": {
                                                                            "decorators": [
                                                                                {
                                                                                    "name": "Entity",
                                                                                    "values": []
                                                                                },
                                                                                {
                                                                                    "name": "Table",
                                                                                    "values": [
                                                                                        {
                                                                                            "name": "SCHEMA_PROPERTY_COLUMNS"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "isGenerated": false,
                                                                            "isId": false,
                                                                            "isMappedSuperclass": false,
                                                                            "isTransient": false,
                                                                            "name": "SchemaPropertyColumn",
                                                                            "type": "typeof SchemaPropertyColumn",
                                                                            "fileImports": {
                                                                                "importMapByObjectAsName": {
                                                                                    "Entity": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": false,
                                                                                        "objectMapByAsName": {
                                                                                            "Entity": {
                                                                                                "asName": "Entity",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "Entity"
                                                                                            },
                                                                                            "Id": {
                                                                                                "asName": "Id",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "Id"
                                                                                            },
                                                                                            "JoinColumn": {
                                                                                                "asName": "JoinColumn",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "JoinColumn"
                                                                                            },
                                                                                            "ManyToOne": {
                                                                                                "asName": "ManyToOne",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "ManyToOne"
                                                                                            },
                                                                                            "Table": {
                                                                                                "asName": "Table",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "Table"
                                                                                            }
                                                                                        },
                                                                                        "path": "@airport/air-control"
                                                                                    },
                                                                                    "Id": null,
                                                                                    "JoinColumn": null,
                                                                                    "ManyToOne": null,
                                                                                    "Table": null,
                                                                                    "ISchemaColumn": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "ISchemaColumn": {
                                                                                                "asName": "ISchemaColumn",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "ISchemaColumn"
                                                                                            }
                                                                                        },
                                                                                        "path": "../../generated/schema/qschemacolumn"
                                                                                    },
                                                                                    "ISchemaProperty": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "ISchemaProperty": {
                                                                                                "asName": "ISchemaProperty",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "ISchemaProperty"
                                                                                            }
                                                                                        },
                                                                                        "path": "../../generated/schema/qschemaproperty"
                                                                                    },
                                                                                    "VersionedSchemaObject": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "VersionedSchemaObject": {
                                                                                                "asName": "VersionedSchemaObject",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "VersionedSchemaObject"
                                                                                            }
                                                                                        },
                                                                                        "path": "./VersionedSchemaObject"
                                                                                    }
                                                                                },
                                                                                "importMapByModulePath": {
                                                                                    "@airport/air-control": null,
                                                                                    "../../generated/schema/qschemacolumn": null,
                                                                                    "../../generated/schema/qschemaproperty": null,
                                                                                    "./VersionedSchemaObject": null
                                                                                }
                                                                            },
                                                                            "properties": [
                                                                                {
                                                                                    "decorators": [
                                                                                        {
                                                                                            "name": "Id",
                                                                                            "values": []
                                                                                        },
                                                                                        {
                                                                                            "name": "ManyToOne",
                                                                                            "values": []
                                                                                        },
                                                                                        {
                                                                                            "name": "JoinColumn",
                                                                                            "values": [
                                                                                                {
                                                                                                    "name": "SCHEMA_COLUMN_ID",
                                                                                                    "referencedColumnName": "ID",
                                                                                                    "nullable": false
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "isGenerated": false,
                                                                                    "isId": true,
                                                                                    "isMappedSuperclass": false,
                                                                                    "isTransient": false,
                                                                                    "name": "column",
                                                                                    "type": "ISchemaColumn",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "ISchemaColumn",
                                                                                    "entity": null,
                                                                                    "index": 0
                                                                                },
                                                                                {
                                                                                    "decorators": [
                                                                                        {
                                                                                            "name": "Id",
                                                                                            "values": []
                                                                                        },
                                                                                        {
                                                                                            "name": "ManyToOne",
                                                                                            "values": []
                                                                                        },
                                                                                        {
                                                                                            "name": "JoinColumn",
                                                                                            "values": [
                                                                                                {
                                                                                                    "name": "SCHEMA_PROPERTY_ID",
                                                                                                    "referencedColumnName": "ID",
                                                                                                    "nullable": false
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ],
                                                                                    "isGenerated": false,
                                                                                    "isId": true,
                                                                                    "isMappedSuperclass": false,
                                                                                    "isTransient": false,
                                                                                    "name": "property",
                                                                                    "type": "ISchemaProperty",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "ISchemaProperty",
                                                                                    "entity": null,
                                                                                    "index": 1
                                                                                }
                                                                            ],
                                                                            "methodSignatures": [],
                                                                            "constructors": [
                                                                                {
                                                                                    "parameters": [],
                                                                                    "returnType": "SchemaPropertyColumn"
                                                                                }
                                                                            ]
                                                                        },
                                                                        "implementedInterfaceNames": [],
                                                                        "parentEntity": null
                                                                    },
                                                                    "index": 9
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "OneToMany",
                                                                            "values": [
                                                                                {
                                                                                    "mappedBy": "manyColumn"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "manyRelationColumns",
                                                                    "type": "ISchemaRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ISchemaRelationColumn",
                                                                    "entity": null,
                                                                    "index": 10
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "OneToMany",
                                                                            "values": [
                                                                                {
                                                                                    "mappedBy": "oneColumn"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "oneRelationColumns",
                                                                    "type": "ISchemaRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ISchemaRelationColumn",
                                                                    "entity": null,
                                                                    "index": 11
                                                                }
                                                            ],
                                                            "methodSignatures": [],
                                                            "constructors": [
                                                                {
                                                                    "parameters": [],
                                                                    "returnType": "SchemaColumn"
                                                                }
                                                            ]
                                                        },
                                                        "implementedInterfaceNames": [],
                                                        "parentEntity": null
                                                    },
                                                    "index": 7
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "cascade": "CascadeType.ALL",
                                                                    "mappedBy": "entity"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "properties",
                                                    "type": "SchemaProperty[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaProperty",
                                                    "entity": null,
                                                    "index": 8
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "entity"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "relations",
                                                    "type": "SchemaRelation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaRelation",
                                                    "entity": null,
                                                    "index": 9
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "relationEntity"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "relationReferences",
                                                    "type": "SchemaRelation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaRelation",
                                                    "entity": null,
                                                    "index": 10
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Transient",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": true,
                                                    "name": "columnMap",
                                                    "type": "{ [name: string]: ISchemaColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: ISchemaColumn; }",
                                                    "isMap": true,
                                                    "mapValueType": "ISchemaColumn",
                                                    "mapValueIsPrimitive": false,
                                                    "mapKeyName": "name",
                                                    "mapKeyType": "string"
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Transient",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": true,
                                                    "name": "idColumns",
                                                    "type": "ISchemaColumn[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ISchemaColumn"
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Transient",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": true,
                                                    "name": "idColumnMap",
                                                    "type": "{ [name: string]: ISchemaColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: ISchemaColumn; }",
                                                    "isMap": true,
                                                    "mapValueType": "ISchemaColumn",
                                                    "mapValueIsPrimitive": false,
                                                    "mapKeyName": "name",
                                                    "mapKeyType": "string"
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Transient",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": true,
                                                    "name": "propertyMap",
                                                    "type": "{ [name: string]: ISchemaProperty; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: ISchemaProperty; }",
                                                    "isMap": true,
                                                    "mapValueType": "ISchemaProperty",
                                                    "mapValueIsPrimitive": false,
                                                    "mapKeyName": "name",
                                                    "mapKeyType": "string"
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "SchemaEntity"
                                                }
                                            ]
                                        },
                                        "implementedInterfaceNames": [],
                                        "parentEntity": null
                                    },
                                    "index": 7
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "OneToMany",
                                            "values": [
                                                {
                                                    "mappedBy": "ownSchemaVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "references",
                                    "type": "SchemaReference[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "SchemaReference",
                                    "entity": {
                                        "type": "SchemaReference",
                                        "path": "/media/artem/E4D01D0CD01CE718/dac/airport/schemas/traffic-pattern/src/ddl/schema/SchemaReference.ts",
                                        "parentClassName": "VersionedSchemaObject",
                                        "location": "./VersionedSchemaObject",
                                        "isSuperclass": false,
                                        "ids": [
                                            {
                                                "decorators": [
                                                    {
                                                        "name": "Id",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "ManyToOne",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "JoinColumn",
                                                        "values": [
                                                            {
                                                                "name": "OWN_SCHEMA_VERSION_ID",
                                                                "referencedColumnName": "ID",
                                                                "nullable": false
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "isGenerated": false,
                                                "isId": true,
                                                "isMappedSuperclass": false,
                                                "isTransient": false,
                                                "name": "ownSchemaVersion",
                                                "type": "SchemaVersion",
                                                "ownerEntity": null,
                                                "nonArrayType": "SchemaVersion",
                                                "entity": null,
                                                "index": 0
                                            },
                                            {
                                                "decorators": [
                                                    {
                                                        "name": "Id",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "ManyToOne",
                                                        "values": []
                                                    },
                                                    {
                                                        "name": "JoinColumn",
                                                        "values": [
                                                            {
                                                                "name": "REFERENCED_SCHEMA_VERSION_ID",
                                                                "referencedColumnName": "ID",
                                                                "nullable": false
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "isGenerated": false,
                                                "isId": true,
                                                "isMappedSuperclass": false,
                                                "isTransient": false,
                                                "name": "referencedSchemaVersion",
                                                "type": "SchemaVersion",
                                                "ownerEntity": null,
                                                "nonArrayType": "SchemaVersion",
                                                "entity": null,
                                                "index": 1
                                            }
                                        ],
                                        "docEntry": {
                                            "decorators": [
                                                {
                                                    "name": "Entity",
                                                    "values": []
                                                },
                                                {
                                                    "name": "Table",
                                                    "values": [
                                                        {
                                                            "name": "SCHEMA_REFERENCES"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "SchemaReference",
                                            "type": "typeof SchemaReference",
                                            "fileImports": {
                                                "importMapByObjectAsName": {
                                                    "Column": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "Column": {
                                                                "asName": "Column",
                                                                "moduleImport": null,
                                                                "sourceName": "Column"
                                                            },
                                                            "Entity": {
                                                                "asName": "Entity",
                                                                "moduleImport": null,
                                                                "sourceName": "Entity"
                                                            },
                                                            "Id": {
                                                                "asName": "Id",
                                                                "moduleImport": null,
                                                                "sourceName": "Id"
                                                            },
                                                            "JoinColumn": {
                                                                "asName": "JoinColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "JoinColumn"
                                                            },
                                                            "ManyToOne": {
                                                                "asName": "ManyToOne",
                                                                "moduleImport": null,
                                                                "sourceName": "ManyToOne"
                                                            },
                                                            "Table": {
                                                                "asName": "Table",
                                                                "moduleImport": null,
                                                                "sourceName": "Table"
                                                            }
                                                        },
                                                        "path": "@airport/air-control"
                                                    },
                                                    "Entity": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "ManyToOne": null,
                                                    "Table": null,
                                                    "SchemaReferenceIndex": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "SchemaReferenceIndex": {
                                                                "asName": "SchemaReferenceIndex",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaReferenceIndex"
                                                            }
                                                        },
                                                        "path": "@airport/ground-control"
                                                    },
                                                    "SchemaVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaVersion": {
                                                                "asName": "SchemaVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaVersion"
                                                            }
                                                        },
                                                        "path": "./SchemaVersion"
                                                    },
                                                    "VersionedSchemaObject": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "VersionedSchemaObject": {
                                                                "asName": "VersionedSchemaObject",
                                                                "moduleImport": null,
                                                                "sourceName": "VersionedSchemaObject"
                                                            }
                                                        },
                                                        "path": "./VersionedSchemaObject"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-control": null,
                                                    "@airport/ground-control": null,
                                                    "./SchemaVersion": null,
                                                    "./VersionedSchemaObject": null
                                                }
                                            },
                                            "properties": [
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Id",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "ManyToOne",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "JoinColumn",
                                                            "values": [
                                                                {
                                                                    "name": "OWN_SCHEMA_VERSION_ID",
                                                                    "referencedColumnName": "ID",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": true,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "ownSchemaVersion",
                                                    "type": "SchemaVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaVersion",
                                                    "entity": null,
                                                    "index": 0
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Id",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "ManyToOne",
                                                            "values": []
                                                        },
                                                        {
                                                            "name": "JoinColumn",
                                                            "values": [
                                                                {
                                                                    "name": "REFERENCED_SCHEMA_VERSION_ID",
                                                                    "referencedColumnName": "ID",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": true,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "referencedSchemaVersion",
                                                    "type": "SchemaVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaVersion",
                                                    "entity": null,
                                                    "index": 1
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "SCHEMA_REFERENCE_INDEX",
                                                                    "nullable": false
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "index",
                                                    "type": "number",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "number",
                                                    "primitive": "number",
                                                    "index": 2
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "SchemaReference"
                                                }
                                            ]
                                        },
                                        "implementedInterfaceNames": [],
                                        "parentEntity": null
                                    },
                                    "index": 8
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "OneToMany",
                                            "values": [
                                                {
                                                    "mappedBy": "referencedSchemaVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "referencedBy",
                                    "type": "SchemaReference[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "SchemaReference",
                                    "entity": null,
                                    "index": 9
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Transient",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": true,
                                    "name": "entityMapByName",
                                    "type": "{ [entityName: string]: ISchemaEntity; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [entityName: string]: ISchemaEntity; }",
                                    "isMap": true,
                                    "mapValueType": "ISchemaEntity",
                                    "mapValueIsPrimitive": false,
                                    "mapKeyName": "entityName",
                                    "mapKeyType": "string"
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Transient",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": true,
                                    "name": "referencesMapByName",
                                    "type": "{ [schemaName: string]: ISchemaReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [schemaName: string]: ISchemaReference; }",
                                    "isMap": true,
                                    "mapValueType": "ISchemaReference",
                                    "mapValueIsPrimitive": false,
                                    "mapKeyName": "schemaName",
                                    "mapKeyType": "string"
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Transient",
                                            "values": []
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": true,
                                    "name": "referencedByMapByName",
                                    "type": "{ [schemaName: string]: ISchemaReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [schemaName: string]: ISchemaReference; }",
                                    "isMap": true,
                                    "mapValueType": "ISchemaReference",
                                    "mapValueIsPrimitive": false,
                                    "mapKeyName": "schemaName",
                                    "mapKeyType": "string"
                                }
                            ],
                            "methodSignatures": [],
                            "constructors": [
                                {
                                    "parameters": [],
                                    "returnType": "SchemaVersion"
                                }
                            ]
                        },
                        "implementedInterfaceNames": []
                    },
                    "index": 0
                },
                {
                    "decorators": [
                        {
                            "name": "ManyToOne",
                            "values": []
                        },
                        {
                            "name": "JoinColumn",
                            "values": [
                                {
                                    "name": "REMOVED_IN_SCHEMA_VERSION_ID",
                                    "referencedColumnName": "ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "removedInVersion",
                    "type": "SchemaVersion",
                    "ownerEntity": null,
                    "nonArrayType": "SchemaVersion",
                    "entity": null,
                    "index": 1
                },
                {
                    "decorators": [
                        {
                            "name": "ManyToOne",
                            "values": []
                        },
                        {
                            "name": "JoinColumn",
                            "values": [
                                {
                                    "name": "SINCE_SCHEMA_VERSION_ID",
                                    "referencedColumnName": "ID",
                                    "nullable": false
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "sinceVersion",
                    "type": "SchemaVersion",
                    "ownerEntity": null,
                    "nonArrayType": "SchemaVersion",
                    "entity": null,
                    "index": 2
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "VersionedSchemaObject"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/traffic-pattern"
    }
];
//# sourceMappingURL=mappedSuperclass.js.map