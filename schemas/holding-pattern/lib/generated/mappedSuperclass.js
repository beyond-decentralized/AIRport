/* eslint-disable */
export const MAPPED_SUPERCLASS = [
    {
        "type": "RepositoryEntity",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\repository\\RepositoryEntity.ts",
        "parentClassName": null,
        "isSuperclass": true,
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
                                "name": "REPOSITORY_ID",
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
                "name": "repository",
                "type": "Repository",
                "ownerEntity": null,
                "nonArrayType": "Repository",
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
                                "name": "ACTOR_ID",
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
                "name": "actor",
                "type": "Actor",
                "ownerEntity": null,
                "nonArrayType": "Actor",
                "entity": null,
                "index": 1
            },
            {
                "decorators": [
                    {
                        "name": "Id",
                        "values": []
                    },
                    {
                        "name": "Column",
                        "values": [
                            {
                                "name": "ACTOR_RECORD_ID",
                                "nullable": false
                            }
                        ]
                    },
                    {
                        "name": "GeneratedValue",
                        "values": []
                    }
                ],
                "isGenerated": true,
                "isId": true,
                "isMappedSuperclass": false,
                "isTransient": false,
                "name": "actorRecordId",
                "type": "number",
                "ownerEntity": null,
                "nonArrayType": "number",
                "primitive": "number",
                "index": 2
            }
        ],
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
            "name": "RepositoryEntity",
            "type": "typeof RepositoryEntity",
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
                            "DbDate": {
                                "asName": "DbDate",
                                "moduleImport": null,
                                "sourceName": "DbDate"
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
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            },
                            "Transient": {
                                "asName": "Transient",
                                "moduleImport": null,
                                "sourceName": "Transient"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    },
                    "DbDate": null,
                    "DbNumber": null,
                    "DbString": null,
                    "GeneratedValue": null,
                    "Id": null,
                    "JoinColumn": null,
                    "ManyToOne": null,
                    "MappedSuperclass": null,
                    "Transient": null,
                    "Actor": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "Actor": {
                                "asName": "Actor",
                                "moduleImport": null,
                                "sourceName": "Actor"
                            }
                        },
                        "path": "../infrastructure/Actor"
                    },
                    "SystemWideOperationId": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "SystemWideOperationId": {
                                "asName": "SystemWideOperationId",
                                "moduleImport": null,
                                "sourceName": "SystemWideOperationId"
                            }
                        },
                        "path": "../common"
                    },
                    "Repository": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "Repository": {
                                "asName": "Repository",
                                "moduleImport": null,
                                "sourceName": "Repository"
                            }
                        },
                        "path": "./Repository"
                    },
                    "User": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "User": {
                                "asName": "User",
                                "moduleImport": null,
                                "sourceName": "User"
                            }
                        },
                        "path": "@airport/travel-document-checkpoint"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "../infrastructure/Actor": null,
                    "../common": null,
                    "./Repository": null,
                    "@airport/travel-document-checkpoint": null
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
                                    "name": "REPOSITORY_ID",
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
                    "name": "repository",
                    "type": "Repository",
                    "ownerEntity": null,
                    "nonArrayType": "Repository",
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
                                    "name": "ACTOR_ID",
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
                    "name": "actor",
                    "type": "Actor",
                    "ownerEntity": null,
                    "nonArrayType": "Actor",
                    "entity": null,
                    "index": 1
                },
                {
                    "decorators": [
                        {
                            "name": "Id",
                            "values": []
                        },
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "ACTOR_RECORD_ID",
                                    "nullable": false
                                }
                            ]
                        },
                        {
                            "name": "GeneratedValue",
                            "values": []
                        }
                    ],
                    "isGenerated": true,
                    "isId": true,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "actorRecordId",
                    "type": "number",
                    "ownerEntity": null,
                    "nonArrayType": "number",
                    "primitive": "number",
                    "index": 2
                },
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "AGE_SUITABILITY",
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
                    "name": "ageSuitability",
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
                                    "name": "CREATED_AT"
                                }
                            ]
                        },
                        {
                            "name": "DbDate",
                            "values": []
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "createdAt",
                    "type": "Date",
                    "ownerEntity": null,
                    "nonArrayType": "Date",
                    "primitive": "Date",
                    "index": 4
                },
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "SYSTEM_WIDE_OPERATION_ID",
                                    "nullable": false
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "systemWideOperationId",
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
                                    "name": "ORIGINAL_REPOSITORY_ID",
                                    "referencedColumnName": "ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "originalRepository",
                    "type": "Repository",
                    "ownerEntity": null,
                    "nonArrayType": "Repository",
                    "entity": null,
                    "index": 6
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
                                    "name": "ORIGINAL_ACTOR_ID",
                                    "referencedColumnName": "ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "originalActor",
                    "type": "Actor",
                    "ownerEntity": null,
                    "nonArrayType": "Actor",
                    "entity": null,
                    "index": 7
                },
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "ORIGINAL_ACTOR_RECORD_ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "originalActorRecordId",
                    "type": "number",
                    "ownerEntity": null,
                    "nonArrayType": "number",
                    "primitive": "number",
                    "index": 8
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
                    "name": "id",
                    "type": "string",
                    "ownerEntity": null,
                    "nonArrayType": "string",
                    "primitive": "string"
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
                    "name": "createdBy",
                    "type": "User",
                    "ownerEntity": null,
                    "nonArrayType": "User"
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "RepositoryEntity"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ChildRepoRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ChildRepoRow.ts",
        "parentClassName": "RepositoryEntity",
        "location": "../repository/RepositoryEntity",
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
            "name": "ChildRepoRow",
            "type": "typeof ChildRepoRow",
            "fileImports": {
                "importMapByObjectAsName": {
                    "MappedSuperclass": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    },
                    "RepositoryEntity": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "RepositoryEntity": {
                                "asName": "RepositoryEntity",
                                "moduleImport": null,
                                "sourceName": "RepositoryEntity"
                            }
                        },
                        "path": "../repository/RepositoryEntity"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "../repository/RepositoryEntity": null
                }
            },
            "properties": [],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "ChildRepoRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "parentEntity": {
            "type": "RepositoryEntity",
            "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\repository\\RepositoryEntity.ts",
            "parentClassName": null,
            "isSuperclass": true,
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
                                    "name": "REPOSITORY_ID",
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
                    "name": "repository",
                    "type": "Repository",
                    "ownerEntity": null,
                    "nonArrayType": "Repository",
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
                                    "name": "ACTOR_ID",
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
                    "name": "actor",
                    "type": "Actor",
                    "ownerEntity": null,
                    "nonArrayType": "Actor",
                    "entity": null,
                    "index": 1
                },
                {
                    "decorators": [
                        {
                            "name": "Id",
                            "values": []
                        },
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "ACTOR_RECORD_ID",
                                    "nullable": false
                                }
                            ]
                        },
                        {
                            "name": "GeneratedValue",
                            "values": []
                        }
                    ],
                    "isGenerated": true,
                    "isId": true,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "actorRecordId",
                    "type": "number",
                    "ownerEntity": null,
                    "nonArrayType": "number",
                    "primitive": "number",
                    "index": 2
                }
            ],
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
                "name": "RepositoryEntity",
                "type": "typeof RepositoryEntity",
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
                                "DbDate": {
                                    "asName": "DbDate",
                                    "moduleImport": null,
                                    "sourceName": "DbDate"
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
                                "MappedSuperclass": {
                                    "asName": "MappedSuperclass",
                                    "moduleImport": null,
                                    "sourceName": "MappedSuperclass"
                                },
                                "Transient": {
                                    "asName": "Transient",
                                    "moduleImport": null,
                                    "sourceName": "Transient"
                                }
                            },
                            "path": "@airport/air-traffic-control"
                        },
                        "DbDate": null,
                        "DbNumber": null,
                        "DbString": null,
                        "GeneratedValue": null,
                        "Id": null,
                        "JoinColumn": null,
                        "ManyToOne": null,
                        "MappedSuperclass": null,
                        "Transient": null,
                        "Actor": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Actor": {
                                    "asName": "Actor",
                                    "moduleImport": null,
                                    "sourceName": "Actor"
                                }
                            },
                            "path": "../infrastructure/Actor"
                        },
                        "SystemWideOperationId": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "SystemWideOperationId": {
                                    "asName": "SystemWideOperationId",
                                    "moduleImport": null,
                                    "sourceName": "SystemWideOperationId"
                                }
                            },
                            "path": "../common"
                        },
                        "Repository": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Repository": {
                                    "asName": "Repository",
                                    "moduleImport": null,
                                    "sourceName": "Repository"
                                }
                            },
                            "path": "./Repository"
                        },
                        "User": {
                            "fileImports": null,
                            "isLocal": false,
                            "objectMapByAsName": {
                                "User": {
                                    "asName": "User",
                                    "moduleImport": null,
                                    "sourceName": "User"
                                }
                            },
                            "path": "@airport/travel-document-checkpoint"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-traffic-control": null,
                        "../infrastructure/Actor": null,
                        "../common": null,
                        "./Repository": null,
                        "@airport/travel-document-checkpoint": null
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
                                        "name": "REPOSITORY_ID",
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
                        "name": "repository",
                        "type": "Repository",
                        "ownerEntity": null,
                        "nonArrayType": "Repository",
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
                                        "name": "ACTOR_ID",
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
                        "name": "actor",
                        "type": "Actor",
                        "ownerEntity": null,
                        "nonArrayType": "Actor",
                        "entity": null,
                        "index": 1
                    },
                    {
                        "decorators": [
                            {
                                "name": "Id",
                                "values": []
                            },
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "ACTOR_RECORD_ID",
                                        "nullable": false
                                    }
                                ]
                            },
                            {
                                "name": "GeneratedValue",
                                "values": []
                            }
                        ],
                        "isGenerated": true,
                        "isId": true,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "actorRecordId",
                        "type": "number",
                        "ownerEntity": null,
                        "nonArrayType": "number",
                        "primitive": "number",
                        "index": 2
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "AGE_SUITABILITY",
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
                        "name": "ageSuitability",
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
                                        "name": "CREATED_AT"
                                    }
                                ]
                            },
                            {
                                "name": "DbDate",
                                "values": []
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "createdAt",
                        "type": "Date",
                        "ownerEntity": null,
                        "nonArrayType": "Date",
                        "primitive": "Date",
                        "index": 4
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "SYSTEM_WIDE_OPERATION_ID",
                                        "nullable": false
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "systemWideOperationId",
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
                                        "name": "ORIGINAL_REPOSITORY_ID",
                                        "referencedColumnName": "ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalRepository",
                        "type": "Repository",
                        "ownerEntity": null,
                        "nonArrayType": "Repository",
                        "entity": null,
                        "index": 6
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
                                        "name": "ORIGINAL_ACTOR_ID",
                                        "referencedColumnName": "ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalActor",
                        "type": "Actor",
                        "ownerEntity": null,
                        "nonArrayType": "Actor",
                        "entity": null,
                        "index": 7
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "ORIGINAL_ACTOR_RECORD_ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalActorRecordId",
                        "type": "number",
                        "ownerEntity": null,
                        "nonArrayType": "number",
                        "primitive": "number",
                        "index": 8
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
                        "name": "id",
                        "type": "string",
                        "ownerEntity": null,
                        "nonArrayType": "string",
                        "primitive": "string"
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
                        "name": "createdBy",
                        "type": "User",
                        "ownerEntity": null,
                        "nonArrayType": "User"
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "RepositoryEntity"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ChildRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ChildRow.ts",
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
            "name": "ChildRow",
            "type": "typeof ChildRow",
            "fileImports": {
                "importMapByObjectAsName": {
                    "MappedSuperclass": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null
                }
            },
            "properties": [],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "ChildRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ImmutableRepoRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ImmutableRepoRow.ts",
        "parentClassName": "RepositoryEntity",
        "location": "../repository/RepositoryEntity",
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
            "name": "ImmutableRepoRow",
            "type": "typeof ImmutableRepoRow",
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
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    },
                    "MappedSuperclass": null,
                    "RepositoryEntity": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "RepositoryEntity": {
                                "asName": "RepositoryEntity",
                                "moduleImport": null,
                                "sourceName": "RepositoryEntity"
                            }
                        },
                        "path": "../repository/RepositoryEntity"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "../repository/RepositoryEntity": null
                }
            },
            "properties": [
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "CREATED_AT"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "createdAt",
                    "type": "Date",
                    "ownerEntity": null,
                    "nonArrayType": "Date",
                    "primitive": "Date",
                    "index": 0
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "ImmutableRepoRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "parentEntity": {
            "type": "RepositoryEntity",
            "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\repository\\RepositoryEntity.ts",
            "parentClassName": null,
            "isSuperclass": true,
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
                                    "name": "REPOSITORY_ID",
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
                    "name": "repository",
                    "type": "Repository",
                    "ownerEntity": null,
                    "nonArrayType": "Repository",
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
                                    "name": "ACTOR_ID",
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
                    "name": "actor",
                    "type": "Actor",
                    "ownerEntity": null,
                    "nonArrayType": "Actor",
                    "entity": null,
                    "index": 1
                },
                {
                    "decorators": [
                        {
                            "name": "Id",
                            "values": []
                        },
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "ACTOR_RECORD_ID",
                                    "nullable": false
                                }
                            ]
                        },
                        {
                            "name": "GeneratedValue",
                            "values": []
                        }
                    ],
                    "isGenerated": true,
                    "isId": true,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "actorRecordId",
                    "type": "number",
                    "ownerEntity": null,
                    "nonArrayType": "number",
                    "primitive": "number",
                    "index": 2
                }
            ],
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
                "name": "RepositoryEntity",
                "type": "typeof RepositoryEntity",
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
                                "DbDate": {
                                    "asName": "DbDate",
                                    "moduleImport": null,
                                    "sourceName": "DbDate"
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
                                "MappedSuperclass": {
                                    "asName": "MappedSuperclass",
                                    "moduleImport": null,
                                    "sourceName": "MappedSuperclass"
                                },
                                "Transient": {
                                    "asName": "Transient",
                                    "moduleImport": null,
                                    "sourceName": "Transient"
                                }
                            },
                            "path": "@airport/air-traffic-control"
                        },
                        "DbDate": null,
                        "DbNumber": null,
                        "DbString": null,
                        "GeneratedValue": null,
                        "Id": null,
                        "JoinColumn": null,
                        "ManyToOne": null,
                        "MappedSuperclass": null,
                        "Transient": null,
                        "Actor": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Actor": {
                                    "asName": "Actor",
                                    "moduleImport": null,
                                    "sourceName": "Actor"
                                }
                            },
                            "path": "../infrastructure/Actor"
                        },
                        "SystemWideOperationId": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "SystemWideOperationId": {
                                    "asName": "SystemWideOperationId",
                                    "moduleImport": null,
                                    "sourceName": "SystemWideOperationId"
                                }
                            },
                            "path": "../common"
                        },
                        "Repository": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Repository": {
                                    "asName": "Repository",
                                    "moduleImport": null,
                                    "sourceName": "Repository"
                                }
                            },
                            "path": "./Repository"
                        },
                        "User": {
                            "fileImports": null,
                            "isLocal": false,
                            "objectMapByAsName": {
                                "User": {
                                    "asName": "User",
                                    "moduleImport": null,
                                    "sourceName": "User"
                                }
                            },
                            "path": "@airport/travel-document-checkpoint"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-traffic-control": null,
                        "../infrastructure/Actor": null,
                        "../common": null,
                        "./Repository": null,
                        "@airport/travel-document-checkpoint": null
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
                                        "name": "REPOSITORY_ID",
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
                        "name": "repository",
                        "type": "Repository",
                        "ownerEntity": null,
                        "nonArrayType": "Repository",
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
                                        "name": "ACTOR_ID",
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
                        "name": "actor",
                        "type": "Actor",
                        "ownerEntity": null,
                        "nonArrayType": "Actor",
                        "entity": null,
                        "index": 1
                    },
                    {
                        "decorators": [
                            {
                                "name": "Id",
                                "values": []
                            },
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "ACTOR_RECORD_ID",
                                        "nullable": false
                                    }
                                ]
                            },
                            {
                                "name": "GeneratedValue",
                                "values": []
                            }
                        ],
                        "isGenerated": true,
                        "isId": true,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "actorRecordId",
                        "type": "number",
                        "ownerEntity": null,
                        "nonArrayType": "number",
                        "primitive": "number",
                        "index": 2
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "AGE_SUITABILITY",
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
                        "name": "ageSuitability",
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
                                        "name": "CREATED_AT"
                                    }
                                ]
                            },
                            {
                                "name": "DbDate",
                                "values": []
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "createdAt",
                        "type": "Date",
                        "ownerEntity": null,
                        "nonArrayType": "Date",
                        "primitive": "Date",
                        "index": 4
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "SYSTEM_WIDE_OPERATION_ID",
                                        "nullable": false
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "systemWideOperationId",
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
                                        "name": "ORIGINAL_REPOSITORY_ID",
                                        "referencedColumnName": "ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalRepository",
                        "type": "Repository",
                        "ownerEntity": null,
                        "nonArrayType": "Repository",
                        "entity": null,
                        "index": 6
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
                                        "name": "ORIGINAL_ACTOR_ID",
                                        "referencedColumnName": "ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalActor",
                        "type": "Actor",
                        "ownerEntity": null,
                        "nonArrayType": "Actor",
                        "entity": null,
                        "index": 7
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "ORIGINAL_ACTOR_RECORD_ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "originalActorRecordId",
                        "type": "number",
                        "ownerEntity": null,
                        "nonArrayType": "number",
                        "primitive": "number",
                        "index": 8
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
                        "name": "id",
                        "type": "string",
                        "ownerEntity": null,
                        "nonArrayType": "string",
                        "primitive": "string"
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
                        "name": "createdBy",
                        "type": "User",
                        "ownerEntity": null,
                        "nonArrayType": "User"
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "RepositoryEntity"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ImmutableRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ImmutableRow.ts",
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
            "name": "ImmutableRow",
            "type": "typeof ImmutableRow",
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
                        "path": "@airport/air-traffic-control"
                    },
                    "JoinColumn": null,
                    "ManyToOne": null,
                    "MappedSuperclass": null,
                    "IUser": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "IUser": {
                                "asName": "IUser",
                                "moduleImport": null,
                                "sourceName": "IUser"
                            }
                        },
                        "path": "@airport/travel-document-checkpoint"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "@airport/travel-document-checkpoint": null
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
                                    "name": "USER_ACCOUNT_ID"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "user",
                    "type": "IUser",
                    "ownerEntity": null,
                    "nonArrayType": "IUser",
                    "fromProject": "@airport/travel-document-checkpoint",
                    "otherApplicationDbEntity": {
                        "columnMap": null,
                        "columns": [
                            {
                                "entity": null,
                                "id": null,
                                "index": 0,
                                "isGenerated": true,
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
                                "type": "NUMBER",
                                "idIndex": 0
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 1,
                                "isGenerated": false,
                                "manyRelationColumns": [],
                                "name": "EMAIL",
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
                                "type": "STRING"
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 2,
                                "isGenerated": false,
                                "manyRelationColumns": [],
                                "name": "PASSWORD_HASH",
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
                                "type": "STRING"
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 3,
                                "isGenerated": false,
                                "manyRelationColumns": [],
                                "name": "RANKING",
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
                                "type": "NUMBER"
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 4,
                                "isGenerated": false,
                                "manyRelationColumns": [],
                                "name": "USERNAME",
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
                                "type": "STRING"
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 5,
                                "isGenerated": false,
                                "manyRelationColumns": [],
                                "name": "UUID",
                                "notNull": true,
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
                                "type": "STRING"
                            }
                        ],
                        "idColumns": [
                            {
                                "entity": null,
                                "id": null,
                                "index": 0,
                                "isGenerated": true,
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
                                "type": "NUMBER",
                                "idIndex": 0
                            }
                        ],
                        "idColumnMap": null,
                        "id": null,
                        "index": 4,
                        "isLocal": true,
                        "isRepositoryEntity": false,
                        "name": "User",
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
                                "name": "email",
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
                                "index": 2,
                                "isId": false,
                                "name": "passwordHash",
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
                                "index": 3,
                                "isId": false,
                                "name": "ranking",
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
                                "index": 4,
                                "isId": false,
                                "name": "username",
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
                                "index": 5,
                                "isId": false,
                                "name": "uuId",
                                "relation": null,
                                "sinceVersion": null
                            }
                        ],
                        "relationReferences": [],
                        "relations": [],
                        "applicationVersion": null,
                        "sinceVersion": null,
                        "tableConfig": null
                    },
                    "index": 0
                },
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "CREATED_AT"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "createdAt",
                    "type": "Date",
                    "ownerEntity": null,
                    "nonArrayType": "Date",
                    "primitive": "Date",
                    "index": 1
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "ImmutableRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/holding-pattern"
    },
    {
        "type": "MutableRepoRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\MutableRepoRow.ts",
        "parentClassName": "ImmutableRepoRow",
        "location": "./ImmutableRepoRow",
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
            "name": "MutableRepoRow",
            "type": "typeof MutableRepoRow",
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
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    },
                    "MappedSuperclass": null,
                    "ImmutableRepoRow": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "ImmutableRepoRow": {
                                "asName": "ImmutableRepoRow",
                                "moduleImport": null,
                                "sourceName": "ImmutableRepoRow"
                            }
                        },
                        "path": "./ImmutableRepoRow"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "./ImmutableRepoRow": null
                }
            },
            "properties": [
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "UPDATED_AT"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "updatedAt",
                    "type": "Date",
                    "ownerEntity": null,
                    "nonArrayType": "Date",
                    "primitive": "Date",
                    "index": 0
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "MutableRepoRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "parentEntity": {
            "type": "ImmutableRepoRow",
            "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ImmutableRepoRow.ts",
            "parentClassName": "RepositoryEntity",
            "location": "../repository/RepositoryEntity",
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
                "name": "ImmutableRepoRow",
                "type": "typeof ImmutableRepoRow",
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
                                "MappedSuperclass": {
                                    "asName": "MappedSuperclass",
                                    "moduleImport": null,
                                    "sourceName": "MappedSuperclass"
                                }
                            },
                            "path": "@airport/air-traffic-control"
                        },
                        "MappedSuperclass": null,
                        "RepositoryEntity": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "RepositoryEntity": {
                                    "asName": "RepositoryEntity",
                                    "moduleImport": null,
                                    "sourceName": "RepositoryEntity"
                                }
                            },
                            "path": "../repository/RepositoryEntity"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-traffic-control": null,
                        "../repository/RepositoryEntity": null
                    }
                },
                "properties": [
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "CREATED_AT"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "createdAt",
                        "type": "Date",
                        "ownerEntity": null,
                        "nonArrayType": "Date",
                        "primitive": "Date",
                        "index": 0
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "ImmutableRepoRow"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "parentEntity": {
                "type": "RepositoryEntity",
                "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\repository\\RepositoryEntity.ts",
                "parentClassName": null,
                "isSuperclass": true,
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
                                        "name": "REPOSITORY_ID",
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
                        "name": "repository",
                        "type": "Repository",
                        "ownerEntity": null,
                        "nonArrayType": "Repository",
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
                                        "name": "ACTOR_ID",
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
                        "name": "actor",
                        "type": "Actor",
                        "ownerEntity": null,
                        "nonArrayType": "Actor",
                        "entity": null,
                        "index": 1
                    },
                    {
                        "decorators": [
                            {
                                "name": "Id",
                                "values": []
                            },
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "ACTOR_RECORD_ID",
                                        "nullable": false
                                    }
                                ]
                            },
                            {
                                "name": "GeneratedValue",
                                "values": []
                            }
                        ],
                        "isGenerated": true,
                        "isId": true,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "actorRecordId",
                        "type": "number",
                        "ownerEntity": null,
                        "nonArrayType": "number",
                        "primitive": "number",
                        "index": 2
                    }
                ],
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
                    "name": "RepositoryEntity",
                    "type": "typeof RepositoryEntity",
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
                                    "DbDate": {
                                        "asName": "DbDate",
                                        "moduleImport": null,
                                        "sourceName": "DbDate"
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
                                    "MappedSuperclass": {
                                        "asName": "MappedSuperclass",
                                        "moduleImport": null,
                                        "sourceName": "MappedSuperclass"
                                    },
                                    "Transient": {
                                        "asName": "Transient",
                                        "moduleImport": null,
                                        "sourceName": "Transient"
                                    }
                                },
                                "path": "@airport/air-traffic-control"
                            },
                            "DbDate": null,
                            "DbNumber": null,
                            "DbString": null,
                            "GeneratedValue": null,
                            "Id": null,
                            "JoinColumn": null,
                            "ManyToOne": null,
                            "MappedSuperclass": null,
                            "Transient": null,
                            "Actor": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "Actor": {
                                        "asName": "Actor",
                                        "moduleImport": null,
                                        "sourceName": "Actor"
                                    }
                                },
                                "path": "../infrastructure/Actor"
                            },
                            "SystemWideOperationId": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "SystemWideOperationId": {
                                        "asName": "SystemWideOperationId",
                                        "moduleImport": null,
                                        "sourceName": "SystemWideOperationId"
                                    }
                                },
                                "path": "../common"
                            },
                            "Repository": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "Repository": {
                                        "asName": "Repository",
                                        "moduleImport": null,
                                        "sourceName": "Repository"
                                    }
                                },
                                "path": "./Repository"
                            },
                            "User": {
                                "fileImports": null,
                                "isLocal": false,
                                "objectMapByAsName": {
                                    "User": {
                                        "asName": "User",
                                        "moduleImport": null,
                                        "sourceName": "User"
                                    }
                                },
                                "path": "@airport/travel-document-checkpoint"
                            }
                        },
                        "importMapByModulePath": {
                            "@airport/air-traffic-control": null,
                            "../infrastructure/Actor": null,
                            "../common": null,
                            "./Repository": null,
                            "@airport/travel-document-checkpoint": null
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
                                            "name": "REPOSITORY_ID",
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
                            "name": "repository",
                            "type": "Repository",
                            "ownerEntity": null,
                            "nonArrayType": "Repository",
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
                                            "name": "ACTOR_ID",
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
                            "name": "actor",
                            "type": "Actor",
                            "ownerEntity": null,
                            "nonArrayType": "Actor",
                            "entity": null,
                            "index": 1
                        },
                        {
                            "decorators": [
                                {
                                    "name": "Id",
                                    "values": []
                                },
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "ACTOR_RECORD_ID",
                                            "nullable": false
                                        }
                                    ]
                                },
                                {
                                    "name": "GeneratedValue",
                                    "values": []
                                }
                            ],
                            "isGenerated": true,
                            "isId": true,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "actorRecordId",
                            "type": "number",
                            "ownerEntity": null,
                            "nonArrayType": "number",
                            "primitive": "number",
                            "index": 2
                        },
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "AGE_SUITABILITY",
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
                            "name": "ageSuitability",
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
                                            "name": "CREATED_AT"
                                        }
                                    ]
                                },
                                {
                                    "name": "DbDate",
                                    "values": []
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "createdAt",
                            "type": "Date",
                            "ownerEntity": null,
                            "nonArrayType": "Date",
                            "primitive": "Date",
                            "index": 4
                        },
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "SYSTEM_WIDE_OPERATION_ID",
                                            "nullable": false
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "systemWideOperationId",
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
                                            "name": "ORIGINAL_REPOSITORY_ID",
                                            "referencedColumnName": "ID"
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "originalRepository",
                            "type": "Repository",
                            "ownerEntity": null,
                            "nonArrayType": "Repository",
                            "entity": null,
                            "index": 6
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
                                            "name": "ORIGINAL_ACTOR_ID",
                                            "referencedColumnName": "ID"
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "originalActor",
                            "type": "Actor",
                            "ownerEntity": null,
                            "nonArrayType": "Actor",
                            "entity": null,
                            "index": 7
                        },
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "ORIGINAL_ACTOR_RECORD_ID"
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "originalActorRecordId",
                            "type": "number",
                            "ownerEntity": null,
                            "nonArrayType": "number",
                            "primitive": "number",
                            "index": 8
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
                            "name": "id",
                            "type": "string",
                            "ownerEntity": null,
                            "nonArrayType": "string",
                            "primitive": "string"
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
                            "name": "createdBy",
                            "type": "User",
                            "ownerEntity": null,
                            "nonArrayType": "User"
                        }
                    ],
                    "methodSignatures": [],
                    "constructors": [
                        {
                            "parameters": [],
                            "returnType": "RepositoryEntity"
                        }
                    ]
                },
                "implementedInterfaceNames": [],
                "project": "@airport/holding-pattern"
            },
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "MutableRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\MutableRow.ts",
        "parentClassName": "ImmutableRow",
        "location": "./ImmutableRow",
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
            "name": "MutableRow",
            "type": "typeof MutableRow",
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
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    },
                    "MappedSuperclass": null,
                    "ImmutableRow": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "ImmutableRow": {
                                "asName": "ImmutableRow",
                                "moduleImport": null,
                                "sourceName": "ImmutableRow"
                            }
                        },
                        "path": "./ImmutableRow"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "./ImmutableRow": null
                }
            },
            "properties": [
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "UPDATED_AT"
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "updatedAt",
                    "type": "Date",
                    "ownerEntity": null,
                    "nonArrayType": "Date",
                    "primitive": "Date",
                    "index": 0
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "MutableRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "parentEntity": {
            "type": "ImmutableRow",
            "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ImmutableRow.ts",
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
                "name": "ImmutableRow",
                "type": "typeof ImmutableRow",
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
                            "path": "@airport/air-traffic-control"
                        },
                        "JoinColumn": null,
                        "ManyToOne": null,
                        "MappedSuperclass": null,
                        "IUser": {
                            "fileImports": null,
                            "isLocal": false,
                            "objectMapByAsName": {
                                "IUser": {
                                    "asName": "IUser",
                                    "moduleImport": null,
                                    "sourceName": "IUser"
                                }
                            },
                            "path": "@airport/travel-document-checkpoint"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-traffic-control": null,
                        "@airport/travel-document-checkpoint": null
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
                                        "name": "USER_ACCOUNT_ID"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "user",
                        "type": "IUser",
                        "ownerEntity": null,
                        "nonArrayType": "IUser",
                        "fromProject": "@airport/travel-document-checkpoint",
                        "otherApplicationDbEntity": {
                            "columnMap": null,
                            "columns": [
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 0,
                                    "isGenerated": true,
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
                                    "type": "NUMBER",
                                    "idIndex": 0
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 1,
                                    "isGenerated": false,
                                    "manyRelationColumns": [],
                                    "name": "EMAIL",
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
                                    "type": "STRING"
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 2,
                                    "isGenerated": false,
                                    "manyRelationColumns": [],
                                    "name": "PASSWORD_HASH",
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
                                    "type": "STRING"
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 3,
                                    "isGenerated": false,
                                    "manyRelationColumns": [],
                                    "name": "RANKING",
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
                                    "type": "NUMBER"
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 4,
                                    "isGenerated": false,
                                    "manyRelationColumns": [],
                                    "name": "USERNAME",
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
                                    "type": "STRING"
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 5,
                                    "isGenerated": false,
                                    "manyRelationColumns": [],
                                    "name": "UUID",
                                    "notNull": true,
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
                                    "type": "STRING"
                                }
                            ],
                            "idColumns": [
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 0,
                                    "isGenerated": true,
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
                                    "type": "NUMBER",
                                    "idIndex": 0
                                }
                            ],
                            "idColumnMap": null,
                            "id": null,
                            "index": 4,
                            "isLocal": true,
                            "isRepositoryEntity": false,
                            "name": "User",
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
                                    "name": "email",
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
                                    "index": 2,
                                    "isId": false,
                                    "name": "passwordHash",
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
                                    "index": 3,
                                    "isId": false,
                                    "name": "ranking",
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
                                    "index": 4,
                                    "isId": false,
                                    "name": "username",
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
                                    "index": 5,
                                    "isId": false,
                                    "name": "uuId",
                                    "relation": null,
                                    "sinceVersion": null
                                }
                            ],
                            "relationReferences": [],
                            "relations": [],
                            "applicationVersion": null,
                            "sinceVersion": null,
                            "tableConfig": null
                        },
                        "index": 0
                    },
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "CREATED_AT"
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "createdAt",
                        "type": "Date",
                        "ownerEntity": null,
                        "nonArrayType": "Date",
                        "primitive": "Date",
                        "index": 1
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "ImmutableRow"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ReferenceRow",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\holding-pattern\\src\\ddl\\traditional\\ReferenceRow.ts",
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
            "name": "ReferenceRow",
            "type": "typeof ReferenceRow",
            "fileImports": {
                "importMapByObjectAsName": {
                    "MappedSuperclass": {
                        "fileImports": null,
                        "isLocal": false,
                        "objectMapByAsName": {
                            "MappedSuperclass": {
                                "asName": "MappedSuperclass",
                                "moduleImport": null,
                                "sourceName": "MappedSuperclass"
                            }
                        },
                        "path": "@airport/air-traffic-control"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null
                }
            },
            "properties": [],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "ReferenceRow"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/holding-pattern"
    }
];
//# sourceMappingURL=mappedSuperclass.js.map