"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPPED_SUPERCLASS = [
    {
        "type": "Stageable",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
            "name": "Stageable",
            "type": "typeof Stageable",
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
                        "path": "@airport/air-control"
                    },
                    "MappedSuperclass": null
                },
                "importMapByModulePath": {
                    "@airport/air-control": null
                }
            },
            "properties": [
                {
                    "decorators": [
                        {
                            "name": "Column",
                            "values": [
                                {
                                    "name": "IS_DRAFT",
                                    "nullable": false
                                }
                            ]
                        }
                    ],
                    "isGenerated": false,
                    "isId": false,
                    "isMappedSuperclass": false,
                    "isTransient": false,
                    "name": "draft",
                    "type": "boolean",
                    "ownerEntity": null,
                    "nonArrayType": "boolean",
                    "primitive": "boolean",
                    "index": 0
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "Stageable"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/holding-pattern"
    },
    {
        "type": "RepositoryEntity",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/repository/repositoryentity.ts",
        "parentClassName": "Stageable",
        "location": "../infrastructure/Stageable",
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
                "type": "IRepository",
                "ownerEntity": null,
                "nonArrayType": "IRepository",
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
                "type": "IActor",
                "ownerEntity": null,
                "nonArrayType": "IActor",
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
                            }
                        },
                        "path": "@airport/air-control"
                    },
                    "GeneratedValue": null,
                    "Id": null,
                    "JoinColumn": null,
                    "ManyToOne": null,
                    "MappedSuperclass": null,
                    "IActor": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "IActor": {
                                "asName": "IActor",
                                "moduleImport": null,
                                "sourceName": "IActor"
                            }
                        },
                        "path": "../../generated/infrastructure/qactor"
                    },
                    "IRepository": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "IRepository": {
                                "asName": "IRepository",
                                "moduleImport": null,
                                "sourceName": "IRepository"
                            }
                        },
                        "path": "../../generated/repository/qrepository"
                    },
                    "Stageable": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "Stageable": {
                                "asName": "Stageable",
                                "moduleImport": null,
                                "sourceName": "Stageable"
                            }
                        },
                        "path": "../infrastructure/Stageable"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-control": null,
                    "../../generated/infrastructure/qactor": null,
                    "../../generated/repository/qrepository": null,
                    "../infrastructure/Stageable": null
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
                    "type": "IRepository",
                    "ownerEntity": null,
                    "nonArrayType": "IRepository",
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
                    "type": "IActor",
                    "ownerEntity": null,
                    "nonArrayType": "IActor",
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
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "RepositoryEntity"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "parentEntity": {
            "type": "Stageable",
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                "name": "Stageable",
                "type": "typeof Stageable",
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
                            "path": "@airport/air-control"
                        },
                        "MappedSuperclass": null
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null
                    }
                },
                "properties": [
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "IS_DRAFT",
                                        "nullable": false
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "draft",
                        "type": "boolean",
                        "ownerEntity": null,
                        "nonArrayType": "boolean",
                        "primitive": "boolean",
                        "index": 0
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "Stageable"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ChildRepoRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/childreporow.ts",
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
                        "path": "@airport/air-control"
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
                    "@airport/air-control": null,
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
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/repository/repositoryentity.ts",
            "parentClassName": "Stageable",
            "location": "../infrastructure/Stageable",
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
                    "type": "IRepository",
                    "ownerEntity": null,
                    "nonArrayType": "IRepository",
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
                    "type": "IActor",
                    "ownerEntity": null,
                    "nonArrayType": "IActor",
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
                                }
                            },
                            "path": "@airport/air-control"
                        },
                        "GeneratedValue": null,
                        "Id": null,
                        "JoinColumn": null,
                        "ManyToOne": null,
                        "MappedSuperclass": null,
                        "IActor": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "IActor": {
                                    "asName": "IActor",
                                    "moduleImport": null,
                                    "sourceName": "IActor"
                                }
                            },
                            "path": "../../generated/infrastructure/qactor"
                        },
                        "IRepository": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "IRepository": {
                                    "asName": "IRepository",
                                    "moduleImport": null,
                                    "sourceName": "IRepository"
                                }
                            },
                            "path": "../../generated/repository/qrepository"
                        },
                        "Stageable": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Stageable": {
                                    "asName": "Stageable",
                                    "moduleImport": null,
                                    "sourceName": "Stageable"
                                }
                            },
                            "path": "../infrastructure/Stageable"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null,
                        "../../generated/infrastructure/qactor": null,
                        "../../generated/repository/qrepository": null,
                        "../infrastructure/Stageable": null
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
                        "type": "IRepository",
                        "ownerEntity": null,
                        "nonArrayType": "IRepository",
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
                        "type": "IActor",
                        "ownerEntity": null,
                        "nonArrayType": "IActor",
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
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "RepositoryEntity"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "parentEntity": {
                "type": "Stageable",
                "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                    "name": "Stageable",
                    "type": "typeof Stageable",
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
                                "path": "@airport/air-control"
                            },
                            "MappedSuperclass": null
                        },
                        "importMapByModulePath": {
                            "@airport/air-control": null
                        }
                    },
                    "properties": [
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "IS_DRAFT",
                                            "nullable": false
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "draft",
                            "type": "boolean",
                            "ownerEntity": null,
                            "nonArrayType": "boolean",
                            "primitive": "boolean",
                            "index": 0
                        }
                    ],
                    "methodSignatures": [],
                    "constructors": [
                        {
                            "parameters": [],
                            "returnType": "Stageable"
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
        "type": "ChildRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/childrow.ts",
        "parentClassName": "Stageable",
        "location": "../infrastructure/Stageable",
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
                        "path": "@airport/air-control"
                    },
                    "Stageable": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "Stageable": {
                                "asName": "Stageable",
                                "moduleImport": null,
                                "sourceName": "Stageable"
                            }
                        },
                        "path": "../infrastructure/Stageable"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-control": null,
                    "../infrastructure/Stageable": null
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
        "parentEntity": {
            "type": "Stageable",
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                "name": "Stageable",
                "type": "typeof Stageable",
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
                            "path": "@airport/air-control"
                        },
                        "MappedSuperclass": null
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null
                    }
                },
                "properties": [
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "IS_DRAFT",
                                        "nullable": false
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "draft",
                        "type": "boolean",
                        "ownerEntity": null,
                        "nonArrayType": "boolean",
                        "primitive": "boolean",
                        "index": 0
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "Stageable"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "ImmutableRepoRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/immutablereporow.ts",
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
                    "@airport/air-control": null,
                    "@airport/travel-document-checkpoint": null,
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
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/repository/repositoryentity.ts",
            "parentClassName": "Stageable",
            "location": "../infrastructure/Stageable",
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
                    "type": "IRepository",
                    "ownerEntity": null,
                    "nonArrayType": "IRepository",
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
                    "type": "IActor",
                    "ownerEntity": null,
                    "nonArrayType": "IActor",
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
                                }
                            },
                            "path": "@airport/air-control"
                        },
                        "GeneratedValue": null,
                        "Id": null,
                        "JoinColumn": null,
                        "ManyToOne": null,
                        "MappedSuperclass": null,
                        "IActor": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "IActor": {
                                    "asName": "IActor",
                                    "moduleImport": null,
                                    "sourceName": "IActor"
                                }
                            },
                            "path": "../../generated/infrastructure/qactor"
                        },
                        "IRepository": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "IRepository": {
                                    "asName": "IRepository",
                                    "moduleImport": null,
                                    "sourceName": "IRepository"
                                }
                            },
                            "path": "../../generated/repository/qrepository"
                        },
                        "Stageable": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Stageable": {
                                    "asName": "Stageable",
                                    "moduleImport": null,
                                    "sourceName": "Stageable"
                                }
                            },
                            "path": "../infrastructure/Stageable"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null,
                        "../../generated/infrastructure/qactor": null,
                        "../../generated/repository/qrepository": null,
                        "../infrastructure/Stageable": null
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
                        "type": "IRepository",
                        "ownerEntity": null,
                        "nonArrayType": "IRepository",
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
                        "type": "IActor",
                        "ownerEntity": null,
                        "nonArrayType": "IActor",
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
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "RepositoryEntity"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "parentEntity": {
                "type": "Stageable",
                "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                    "name": "Stageable",
                    "type": "typeof Stageable",
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
                                "path": "@airport/air-control"
                            },
                            "MappedSuperclass": null
                        },
                        "importMapByModulePath": {
                            "@airport/air-control": null
                        }
                    },
                    "properties": [
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "IS_DRAFT",
                                            "nullable": false
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "draft",
                            "type": "boolean",
                            "ownerEntity": null,
                            "nonArrayType": "boolean",
                            "primitive": "boolean",
                            "index": 0
                        }
                    ],
                    "methodSignatures": [],
                    "constructors": [
                        {
                            "parameters": [],
                            "returnType": "Stageable"
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
        "type": "ImmutableRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/immutablerow.ts",
        "parentClassName": "Stageable",
        "location": "../infrastructure/Stageable",
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
                        "path": "@airport/air-control"
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
                    },
                    "Stageable": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "Stageable": {
                                "asName": "Stageable",
                                "moduleImport": null,
                                "sourceName": "Stageable"
                            }
                        },
                        "path": "../infrastructure/Stageable"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-control": null,
                    "@airport/travel-document-checkpoint": null,
                    "../infrastructure/Stageable": null
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
                    "otherSchemaDbEntity": {
                        "columnMap": null,
                        "columns": [
                            {
                                "entity": null,
                                "id": null,
                                "index": 0,
                                "isGenerated": true,
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
                                "name": "UNIQUE_IDENTIFIER",
                                "notNull": false,
                                "propertyColumns": [
                                    {
                                        "column": null,
                                        "property": null
                                    }
                                ],
                                "sinceVersion": null,
                                "type": 5
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 2,
                                "isGenerated": false,
                                "name": "FIRST_NAME",
                                "notNull": false,
                                "propertyColumns": [
                                    {
                                        "column": null,
                                        "property": null
                                    }
                                ],
                                "sinceVersion": null,
                                "type": 5
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 3,
                                "isGenerated": false,
                                "name": "LAST_NAME",
                                "notNull": false,
                                "propertyColumns": [
                                    {
                                        "column": null,
                                        "property": null
                                    }
                                ],
                                "sinceVersion": null,
                                "type": 5
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 4,
                                "isGenerated": false,
                                "name": "MIDDLE_NAME",
                                "notNull": false,
                                "propertyColumns": [
                                    {
                                        "column": null,
                                        "property": null
                                    }
                                ],
                                "sinceVersion": null,
                                "type": 5
                            },
                            {
                                "entity": null,
                                "id": null,
                                "index": 5,
                                "isGenerated": false,
                                "name": "PHONE",
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
                                "isGenerated": true,
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
                        "name": "User",
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
                                "name": "uniqueId",
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
                                "index": 2,
                                "isId": false,
                                "name": "firstName",
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
                                "index": 3,
                                "isId": false,
                                "name": "lastName",
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
                                "index": 4,
                                "isId": false,
                                "name": "middleName",
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
                                "index": 5,
                                "isId": false,
                                "name": "phone",
                                "relation": null,
                                "sinceVersion": null
                            },
                            {
                                "propertyColumns": [],
                                "entity": null,
                                "id": null,
                                "index": 6,
                                "isId": false,
                                "name": "userTerminal",
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
                            },
                            {
                                "propertyColumns": [],
                                "entity": null,
                                "id": null,
                                "index": 7,
                                "isId": false,
                                "name": "userTerminalAgts",
                                "relation": [
                                    {
                                        "isId": false,
                                        "oneToManyElems": null,
                                        "relationType": 0,
                                        "id": null,
                                        "index": 1,
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
                            },
                            {
                                "isId": false,
                                "oneToManyElems": null,
                                "relationType": 0,
                                "id": null,
                                "index": 1,
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
        "parentEntity": {
            "type": "Stageable",
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                "name": "Stageable",
                "type": "typeof Stageable",
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
                            "path": "@airport/air-control"
                        },
                        "MappedSuperclass": null
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null
                    }
                },
                "properties": [
                    {
                        "decorators": [
                            {
                                "name": "Column",
                                "values": [
                                    {
                                        "name": "IS_DRAFT",
                                        "nullable": false
                                    }
                                ]
                            }
                        ],
                        "isGenerated": false,
                        "isId": false,
                        "isMappedSuperclass": false,
                        "isTransient": false,
                        "name": "draft",
                        "type": "boolean",
                        "ownerEntity": null,
                        "nonArrayType": "boolean",
                        "primitive": "boolean",
                        "index": 0
                    }
                ],
                "methodSignatures": [],
                "constructors": [
                    {
                        "parameters": [],
                        "returnType": "Stageable"
                    }
                ]
            },
            "implementedInterfaceNames": [],
            "project": "@airport/holding-pattern"
        },
        "project": "@airport/holding-pattern"
    },
    {
        "type": "MutableRepoRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/mutablereporow.ts",
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
                        "path": "@airport/air-control"
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
                    "@airport/air-control": null,
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
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/immutablereporow.ts",
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
                        "@airport/air-control": null,
                        "@airport/travel-document-checkpoint": null,
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
                "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/repository/repositoryentity.ts",
                "parentClassName": "Stageable",
                "location": "../infrastructure/Stageable",
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
                        "type": "IRepository",
                        "ownerEntity": null,
                        "nonArrayType": "IRepository",
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
                        "type": "IActor",
                        "ownerEntity": null,
                        "nonArrayType": "IActor",
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
                                    }
                                },
                                "path": "@airport/air-control"
                            },
                            "GeneratedValue": null,
                            "Id": null,
                            "JoinColumn": null,
                            "ManyToOne": null,
                            "MappedSuperclass": null,
                            "IActor": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "IActor": {
                                        "asName": "IActor",
                                        "moduleImport": null,
                                        "sourceName": "IActor"
                                    }
                                },
                                "path": "../../generated/infrastructure/qactor"
                            },
                            "IRepository": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "IRepository": {
                                        "asName": "IRepository",
                                        "moduleImport": null,
                                        "sourceName": "IRepository"
                                    }
                                },
                                "path": "../../generated/repository/qrepository"
                            },
                            "Stageable": {
                                "fileImports": null,
                                "isLocal": true,
                                "objectMapByAsName": {
                                    "Stageable": {
                                        "asName": "Stageable",
                                        "moduleImport": null,
                                        "sourceName": "Stageable"
                                    }
                                },
                                "path": "../infrastructure/Stageable"
                            }
                        },
                        "importMapByModulePath": {
                            "@airport/air-control": null,
                            "../../generated/infrastructure/qactor": null,
                            "../../generated/repository/qrepository": null,
                            "../infrastructure/Stageable": null
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
                            "type": "IRepository",
                            "ownerEntity": null,
                            "nonArrayType": "IRepository",
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
                            "type": "IActor",
                            "ownerEntity": null,
                            "nonArrayType": "IActor",
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
                    "methodSignatures": [],
                    "constructors": [
                        {
                            "parameters": [],
                            "returnType": "RepositoryEntity"
                        }
                    ]
                },
                "implementedInterfaceNames": [],
                "parentEntity": {
                    "type": "Stageable",
                    "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                        "name": "Stageable",
                        "type": "typeof Stageable",
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
                                    "path": "@airport/air-control"
                                },
                                "MappedSuperclass": null
                            },
                            "importMapByModulePath": {
                                "@airport/air-control": null
                            }
                        },
                        "properties": [
                            {
                                "decorators": [
                                    {
                                        "name": "Column",
                                        "values": [
                                            {
                                                "name": "IS_DRAFT",
                                                "nullable": false
                                            }
                                        ]
                                    }
                                ],
                                "isGenerated": false,
                                "isId": false,
                                "isMappedSuperclass": false,
                                "isTransient": false,
                                "name": "draft",
                                "type": "boolean",
                                "ownerEntity": null,
                                "nonArrayType": "boolean",
                                "primitive": "boolean",
                                "index": 0
                            }
                        ],
                        "methodSignatures": [],
                        "constructors": [
                            {
                                "parameters": [],
                                "returnType": "Stageable"
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
        "project": "@airport/holding-pattern"
    },
    {
        "type": "MutableRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/mutablerow.ts",
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
                        "path": "@airport/air-control"
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
                    "@airport/air-control": null,
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
            "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/immutablerow.ts",
            "parentClassName": "Stageable",
            "location": "../infrastructure/Stageable",
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
                            "path": "@airport/air-control"
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
                        },
                        "Stageable": {
                            "fileImports": null,
                            "isLocal": true,
                            "objectMapByAsName": {
                                "Stageable": {
                                    "asName": "Stageable",
                                    "moduleImport": null,
                                    "sourceName": "Stageable"
                                }
                            },
                            "path": "../infrastructure/Stageable"
                        }
                    },
                    "importMapByModulePath": {
                        "@airport/air-control": null,
                        "@airport/travel-document-checkpoint": null,
                        "../infrastructure/Stageable": null
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
                        "otherSchemaDbEntity": {
                            "columnMap": null,
                            "columns": [
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 0,
                                    "isGenerated": true,
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
                                    "name": "UNIQUE_IDENTIFIER",
                                    "notNull": false,
                                    "propertyColumns": [
                                        {
                                            "column": null,
                                            "property": null
                                        }
                                    ],
                                    "sinceVersion": null,
                                    "type": 5
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 2,
                                    "isGenerated": false,
                                    "name": "FIRST_NAME",
                                    "notNull": false,
                                    "propertyColumns": [
                                        {
                                            "column": null,
                                            "property": null
                                        }
                                    ],
                                    "sinceVersion": null,
                                    "type": 5
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 3,
                                    "isGenerated": false,
                                    "name": "LAST_NAME",
                                    "notNull": false,
                                    "propertyColumns": [
                                        {
                                            "column": null,
                                            "property": null
                                        }
                                    ],
                                    "sinceVersion": null,
                                    "type": 5
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 4,
                                    "isGenerated": false,
                                    "name": "MIDDLE_NAME",
                                    "notNull": false,
                                    "propertyColumns": [
                                        {
                                            "column": null,
                                            "property": null
                                        }
                                    ],
                                    "sinceVersion": null,
                                    "type": 5
                                },
                                {
                                    "entity": null,
                                    "id": null,
                                    "index": 5,
                                    "isGenerated": false,
                                    "name": "PHONE",
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
                                    "isGenerated": true,
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
                            "name": "User",
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
                                    "name": "uniqueId",
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
                                    "index": 2,
                                    "isId": false,
                                    "name": "firstName",
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
                                    "index": 3,
                                    "isId": false,
                                    "name": "lastName",
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
                                    "index": 4,
                                    "isId": false,
                                    "name": "middleName",
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
                                    "index": 5,
                                    "isId": false,
                                    "name": "phone",
                                    "relation": null,
                                    "sinceVersion": null
                                },
                                {
                                    "propertyColumns": [],
                                    "entity": null,
                                    "id": null,
                                    "index": 6,
                                    "isId": false,
                                    "name": "userTerminal",
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
                                },
                                {
                                    "propertyColumns": [],
                                    "entity": null,
                                    "id": null,
                                    "index": 7,
                                    "isId": false,
                                    "name": "userTerminalAgts",
                                    "relation": [
                                        {
                                            "isId": false,
                                            "oneToManyElems": null,
                                            "relationType": 0,
                                            "id": null,
                                            "index": 1,
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
                                },
                                {
                                    "isId": false,
                                    "oneToManyElems": null,
                                    "relationType": 0,
                                    "id": null,
                                    "index": 1,
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
            "parentEntity": {
                "type": "Stageable",
                "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/infrastructure/stageable.ts",
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
                    "name": "Stageable",
                    "type": "typeof Stageable",
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
                                "path": "@airport/air-control"
                            },
                            "MappedSuperclass": null
                        },
                        "importMapByModulePath": {
                            "@airport/air-control": null
                        }
                    },
                    "properties": [
                        {
                            "decorators": [
                                {
                                    "name": "Column",
                                    "values": [
                                        {
                                            "name": "IS_DRAFT",
                                            "nullable": false
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "draft",
                            "type": "boolean",
                            "ownerEntity": null,
                            "nonArrayType": "boolean",
                            "primitive": "boolean",
                            "index": 0
                        }
                    ],
                    "methodSignatures": [],
                    "constructors": [
                        {
                            "parameters": [],
                            "returnType": "Stageable"
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
        "type": "ReferenceRow",
        "path": "c:/users/papa/dac/airport/schemas/holding-pattern/src/ddl/traditional/referencerow.ts",
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
                        "path": "@airport/air-control"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-control": null
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