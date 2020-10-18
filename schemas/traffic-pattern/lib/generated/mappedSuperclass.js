export const MAPPED_SUPERCLASS = [
    {
        "type": "VersionedSchemaObject",
        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/versionedschemaobject.ts",
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
                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemaversion.ts",
                        "parentClassName": null,
                        "isSuperclass": false,
                        "ids": [
                            {
                                "allocationSize": 100,
                                "decorators": [
                                    {
                                        "name": "DbNumber",
                                        "values": []
                                    },
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
                                    }
                                ],
                                "isGenerated": false,
                                "isId": true,
                                "isMappedSuperclass": false,
                                "isTransient": false,
                                "name": "id",
                                "type": "SchemaVersionId",
                                "ownerEntity": null,
                                "nonArrayType": "SchemaVersionId",
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
                                    "DbString": null,
                                    "Entity": null,
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
                                            "name": "DbNumber",
                                            "values": []
                                        },
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
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": true,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "id",
                                    "type": "SchemaVersionId",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionId",
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
                                    "name": "integerVersion",
                                    "type": "SchemaVersionInteger",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionInteger",
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
                                    "name": "versionString",
                                    "type": "SchemaVersionString",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionString",
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
                                    "type": "SchemaVersionMajor",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionMajor",
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
                                    "type": "SchemaVersionMinor",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionMinor",
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
                                    "type": "SchemaVersionPatch",
                                    "ownerEntity": null,
                                    "nonArrayType": "SchemaVersionPatch",
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
                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schema.ts",
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
                                                "type": "SchemaIndex",
                                                "ownerEntity": null,
                                                "nonArrayType": "SchemaIndex",
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
                                                    "type": "SchemaIndex",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaIndex",
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
                                                                "manyRelationColumns": [],
                                                                "name": "ID",
                                                                "notNull": false,
                                                                "oneRelationColumns": [],
                                                                "propertyColumnMap": null,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null,
                                                                        "sinceVersion": null
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
                                                                "manyRelationColumns": [],
                                                                "name": "NAME",
                                                                "notNull": false,
                                                                "oneRelationColumns": [],
                                                                "propertyColumnMap": null,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null,
                                                                        "sinceVersion": null
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
                                                                "manyRelationColumns": [],
                                                                "name": "ID",
                                                                "notNull": false,
                                                                "oneRelationColumns": [],
                                                                "propertyColumnMap": null,
                                                                "propertyColumns": [
                                                                    {
                                                                        "column": null,
                                                                        "property": null,
                                                                        "sinceVersion": null
                                                                    }
                                                                ],
                                                                "sinceVersion": null,
                                                                "type": 4,
                                                                "idIndex": 0
                                                            }
                                                        ],
                                                        "idColumnMap": null,
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
                                                                        "property": null,
                                                                        "sinceVersion": null
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
                                                                        "property": null,
                                                                        "sinceVersion": null
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
                                                    "type": "SchemaName",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaName",
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
                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemaentity.ts",
                                        "parentClassName": "VersionedSchemaObject",
                                        "location": "./VersionedSchemaObject",
                                        "isSuperclass": false,
                                        "ids": [
                                            {
                                                "decorators": [
                                                    {
                                                        "name": "DbNumber",
                                                        "values": []
                                                    },
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
                                                "type": "EntityId",
                                                "ownerEntity": null,
                                                "nonArrayType": "EntityId",
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
                                                            "DbBoolean": {
                                                                "asName": "DbBoolean",
                                                                "moduleImport": null,
                                                                "sourceName": "DbBoolean"
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
                                                    "DbBoolean": null,
                                                    "DbNumber": null,
                                                    "DbString": null,
                                                    "Entity": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "Json": null,
                                                    "ManyToOne": null,
                                                    "OneToMany": null,
                                                    "Table": null,
                                                    "TableConfiguration": null,
                                                    "Transient": null,
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
                                                    "SchemaOperation": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "SchemaOperation": {
                                                                "asName": "SchemaOperation",
                                                                "moduleImport": null,
                                                                "sourceName": "SchemaOperation"
                                                            }
                                                        },
                                                        "path": "./SchemaOperation"
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
                                                    "./SchemaColumn": null,
                                                    "./SchemaOperation": null,
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
                                                            "name": "DbNumber",
                                                            "values": []
                                                        },
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
                                                    "type": "EntityId",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "EntityId",
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
                                                    "type": "TableIndex",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "TableIndex",
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
                                                        },
                                                        {
                                                            "name": "DbBoolean",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "isLocal",
                                                    "type": "EntityIsLocal",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "EntityIsLocal",
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
                                                        },
                                                        {
                                                            "name": "DbBoolean",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "isRepositoryEntity",
                                                    "type": "EntityIsRepositoryEntity",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "EntityIsRepositoryEntity",
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
                                                    "type": "EntityName",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "EntityName",
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
                                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemacolumn.ts",
                                                        "parentClassName": "VersionedSchemaObject",
                                                        "location": "./VersionedSchemaObject",
                                                        "isSuperclass": false,
                                                        "ids": [
                                                            {
                                                                "decorators": [
                                                                    {
                                                                        "name": "DbNumber",
                                                                        "values": []
                                                                    },
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
                                                                "type": "ColumnId",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "ColumnId",
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
                                                                            "DbBoolean": {
                                                                                "asName": "DbBoolean",
                                                                                "moduleImport": null,
                                                                                "sourceName": "DbBoolean"
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
                                                                    "DbBoolean": null,
                                                                    "DbNumber": null,
                                                                    "DbString": null,
                                                                    "Entity": null,
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
                                                                    "SchemaPropertyColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "SchemaPropertyColumn": {
                                                                                "asName": "SchemaPropertyColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SchemaPropertyColumn"
                                                                            }
                                                                        },
                                                                        "path": "./SchemaPropertyColumn"
                                                                    },
                                                                    "SchemaRelationColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "SchemaRelationColumn": {
                                                                                "asName": "SchemaRelationColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "SchemaRelationColumn"
                                                                            }
                                                                        },
                                                                        "path": "./SchemaRelationColumn"
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
                                                                    "./SchemaEntity": null,
                                                                    "./SchemaPropertyColumn": null,
                                                                    "./SchemaRelationColumn": null,
                                                                    "./VersionedSchemaObject": null
                                                                }
                                                            },
                                                            "properties": [
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "DbNumber",
                                                                            "values": []
                                                                        },
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
                                                                    "type": "ColumnId",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnId",
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
                                                                    "type": "ColumnIndex",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnIndex",
                                                                    "primitive": "number",
                                                                    "index": 1
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
                                                                    "name": "idIndex",
                                                                    "type": "IdColumnOnlyIndex",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "IdColumnOnlyIndex",
                                                                    "primitive": "number",
                                                                    "index": 2
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
                                                                        },
                                                                        {
                                                                            "name": "DbBoolean",
                                                                            "values": []
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "isGenerated",
                                                                    "type": "SchemaColumnIsGenerated",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "SchemaColumnIsGenerated",
                                                                    "primitive": "boolean",
                                                                    "index": 3
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
                                                                    "name": "allocationSize",
                                                                    "type": "SchemaColumnAllocationSize",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "SchemaColumnAllocationSize",
                                                                    "primitive": "number",
                                                                    "index": 4
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
                                                                    "type": "ColumnName",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnName",
                                                                    "primitive": "string",
                                                                    "index": 5
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
                                                                        },
                                                                        {
                                                                            "name": "DbBoolean",
                                                                            "values": []
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "notNull",
                                                                    "type": "ColumnNotNull",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnNotNull",
                                                                    "primitive": "boolean",
                                                                    "index": 6
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "TYPE",
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
                                                                    "name": "type",
                                                                    "type": "SQLDataType",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "SQLDataType",
                                                                    "primitive": "number",
                                                                    "index": 7
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
                                                                    "type": "SchemaPropertyColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "SchemaPropertyColumn",
                                                                    "entity": {
                                                                        "type": "SchemaPropertyColumn",
                                                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemapropertycolumn.ts",
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
                                                                                "type": "SchemaColumn",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "SchemaColumn",
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
                                                                                "type": "SchemaProperty",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "SchemaProperty",
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
                                                                                    "./SchemaColumn": null,
                                                                                    "./SchemaProperty": null,
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
                                                                                    "type": "SchemaColumn",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "SchemaColumn",
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
                                                                                    "type": "SchemaProperty",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "SchemaProperty",
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
                                                                    "type": "SchemaRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "SchemaRelationColumn",
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
                                                                    "type": "SchemaRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "SchemaRelationColumn",
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
                                                    "name": "operations",
                                                    "type": "SchemaOperation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaOperation",
                                                    "entity": {
                                                        "type": "SchemaOperation",
                                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemaoperation.ts",
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
                                                                        "name": "GeneratedValue",
                                                                        "values": []
                                                                    },
                                                                    {
                                                                        "name": "DbNumber",
                                                                        "values": []
                                                                    }
                                                                ],
                                                                "isGenerated": true,
                                                                "isId": true,
                                                                "isMappedSuperclass": false,
                                                                "isTransient": false,
                                                                "name": "id",
                                                                "type": "Operation_Id",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "Operation_Id",
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
                                                                            "name": "SCHEMA_OPERATIONS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "SchemaOperation",
                                                            "type": "typeof SchemaOperation",
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
                                                                    "GeneratedValue": null,
                                                                    "Id": null,
                                                                    "JoinColumn": null,
                                                                    "Json": null,
                                                                    "ManyToOne": null,
                                                                    "Table": null,
                                                                    "Operation_Id": {
                                                                        "fileImports": null,
                                                                        "isLocal": false,
                                                                        "objectMapByAsName": {
                                                                            "Operation_Id": {
                                                                                "asName": "Operation_Id",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Operation_Id"
                                                                            },
                                                                            "Operation_Name": {
                                                                                "asName": "Operation_Name",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Operation_Name"
                                                                            },
                                                                            "Operation_Rule": {
                                                                                "asName": "Operation_Rule",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Operation_Rule"
                                                                            },
                                                                            "Operation_Type": {
                                                                                "asName": "Operation_Type",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Operation_Type"
                                                                            }
                                                                        },
                                                                        "path": "@airport/ground-control"
                                                                    },
                                                                    "Operation_Name": null,
                                                                    "Operation_Rule": null,
                                                                    "Operation_Type": null,
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
                                                                        },
                                                                        {
                                                                            "name": "GeneratedValue",
                                                                            "values": []
                                                                        },
                                                                        {
                                                                            "name": "DbNumber",
                                                                            "values": []
                                                                        }
                                                                    ],
                                                                    "isGenerated": true,
                                                                    "isId": true,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "id",
                                                                    "type": "Operation_Id",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "Operation_Id",
                                                                    "primitive": "number",
                                                                    "index": 0
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "TYPE",
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
                                                                    "name": "type",
                                                                    "type": "Operation_Type",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "Operation_Type",
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
                                                                                    "name": "NAME",
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
                                                                    "type": "Operation_Name",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "Operation_Name",
                                                                    "primitive": "string",
                                                                    "index": 3
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "RULE",
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
                                                                    "name": "rule",
                                                                    "type": "Operation_Rule",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "Operation_Rule",
                                                                    "primitive": "Json",
                                                                    "index": 4
                                                                }
                                                            ],
                                                            "methodSignatures": [],
                                                            "constructors": [
                                                                {
                                                                    "parameters": [],
                                                                    "returnType": "SchemaOperation"
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
                                                    "index": 9
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
                                                    "index": 10
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
                                                    "index": 11
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
                                                    "type": "{ [name: string]: SchemaColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: SchemaColumn; }",
                                                    "isMap": true,
                                                    "mapValueType": "SchemaColumn",
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
                                                    "type": "SchemaColumn[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "SchemaColumn"
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
                                                    "type": "{ [name: string]: SchemaColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: SchemaColumn; }",
                                                    "isMap": true,
                                                    "mapValueType": "SchemaColumn",
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
                                                    "type": "{ [name: string]: SchemaProperty; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: SchemaProperty; }",
                                                    "isMap": true,
                                                    "mapValueType": "SchemaProperty",
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
                                        "path": "c:/users/papa/vc/ts/airport/schemas/traffic-pattern/src/ddl/schema/schemareference.ts",
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
                                                    "DbNumber": null,
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
                                                    "type": "SchemaReferenceIndex",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "SchemaReferenceIndex",
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
                                    "type": "{ [entityName: string]: SchemaEntity; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [entityName: string]: SchemaEntity; }",
                                    "isMap": true,
                                    "mapValueType": "SchemaEntity",
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
                                    "type": "{ [schemaName: string]: SchemaReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [schemaName: string]: SchemaReference; }",
                                    "isMap": true,
                                    "mapValueType": "SchemaReference",
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
                                    "type": "{ [schemaName: string]: SchemaReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [schemaName: string]: SchemaReference; }",
                                    "isMap": true,
                                    "mapValueType": "SchemaReference",
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