/* eslint-disable */
export const MAPPED_SUPERCLASS = [
    {
        "type": "VersionedApplicationObject",
        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\VersionedApplicationObject.ts",
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
            "name": "VersionedApplicationObject",
            "type": "typeof VersionedApplicationObject",
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
                        "path": "@airport/air-traffic-control"
                    },
                    "ManyToOne": null,
                    "MappedSuperclass": null,
                    "ApplicationVersion": {
                        "fileImports": null,
                        "isLocal": true,
                        "objectMapByAsName": {
                            "ApplicationVersion": {
                                "asName": "ApplicationVersion",
                                "moduleImport": null,
                                "sourceName": "ApplicationVersion"
                            }
                        },
                        "path": "./ApplicationVersion"
                    }
                },
                "importMapByModulePath": {
                    "@airport/air-traffic-control": null,
                    "./ApplicationVersion": null
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
                                    "name": "DEPRECATED_SINCE_APPLICATION_VERSION_ID",
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
                    "type": "ApplicationVersion",
                    "ownerEntity": null,
                    "nonArrayType": "ApplicationVersion",
                    "entity": {
                        "type": "ApplicationVersion",
                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationVersion.ts",
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
                                "type": "ApplicationVersionId",
                                "ownerEntity": null,
                                "nonArrayType": "ApplicationVersionId",
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
                                            "name": "APPLICATION_VERSIONS"
                                        }
                                    ]
                                }
                            ],
                            "isGenerated": false,
                            "isId": false,
                            "isMappedSuperclass": false,
                            "isTransient": false,
                            "name": "ApplicationVersion",
                            "type": "typeof ApplicationVersion",
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
                                        "path": "@airport/air-traffic-control"
                                    },
                                    "DbNumber": null,
                                    "DbString": null,
                                    "Entity": null,
                                    "Id": null,
                                    "JoinColumn": null,
                                    "Json": null,
                                    "ManyToOne": null,
                                    "OneToMany": null,
                                    "SequenceGenerator": null,
                                    "Table": null,
                                    "Transient": null,
                                    "ApplicationVersionId": {
                                        "fileImports": null,
                                        "isLocal": false,
                                        "objectMapByAsName": {
                                            "ApplicationVersionId": {
                                                "asName": "ApplicationVersionId",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionId"
                                            },
                                            "ApplicationVersionInteger": {
                                                "asName": "ApplicationVersionInteger",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionInteger"
                                            },
                                            "ApplicationVersionMajor": {
                                                "asName": "ApplicationVersionMajor",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionMajor"
                                            },
                                            "ApplicationVersionMinor": {
                                                "asName": "ApplicationVersionMinor",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionMinor"
                                            },
                                            "ApplicationVersionPatch": {
                                                "asName": "ApplicationVersionPatch",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionPatch"
                                            },
                                            "ApplicationVersionString": {
                                                "asName": "ApplicationVersionString",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationVersionString"
                                            }
                                        },
                                        "path": "@airport/ground-control"
                                    },
                                    "ApplicationVersionInteger": null,
                                    "ApplicationVersionMajor": null,
                                    "ApplicationVersionMinor": null,
                                    "ApplicationVersionPatch": null,
                                    "ApplicationVersionString": null,
                                    "Application": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "Application": {
                                                "asName": "Application",
                                                "moduleImport": null,
                                                "sourceName": "Application"
                                            }
                                        },
                                        "path": "./Application"
                                    },
                                    "ApplicationEntity": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "ApplicationEntity": {
                                                "asName": "ApplicationEntity",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationEntity"
                                            }
                                        },
                                        "path": "./ApplicationEntity"
                                    },
                                    "ApplicationReference": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "ApplicationReference": {
                                                "asName": "ApplicationReference",
                                                "moduleImport": null,
                                                "sourceName": "ApplicationReference"
                                            }
                                        },
                                        "path": "./ApplicationReference"
                                    },
                                    "IApplicationEntity": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "IApplicationEntity": {
                                                "asName": "IApplicationEntity",
                                                "moduleImport": null,
                                                "sourceName": "IApplicationEntity"
                                            }
                                        },
                                        "path": "../../generated/application/applicationentity"
                                    },
                                    "IApplicationReference": {
                                        "fileImports": null,
                                        "isLocal": true,
                                        "objectMapByAsName": {
                                            "IApplicationReference": {
                                                "asName": "IApplicationReference",
                                                "moduleImport": null,
                                                "sourceName": "IApplicationReference"
                                            }
                                        },
                                        "path": "../../generated/application/applicationreference"
                                    },
                                    "JsonApplicationWithLastIds": {
                                        "fileImports": null,
                                        "isLocal": false,
                                        "objectMapByAsName": {
                                            "JsonApplicationWithLastIds": {
                                                "asName": "JsonApplicationWithLastIds",
                                                "moduleImport": null,
                                                "sourceName": "JsonApplicationWithLastIds"
                                            }
                                        },
                                        "path": "@airport/apron"
                                    }
                                },
                                "importMapByModulePath": {
                                    "@airport/air-traffic-control": null,
                                    "@airport/ground-control": null,
                                    "./Application": null,
                                    "./ApplicationEntity": null,
                                    "./ApplicationReference": null,
                                    "../../generated/application/applicationentity": null,
                                    "../../generated/application/applicationreference": null,
                                    "@airport/apron": null
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
                                    "type": "ApplicationVersionId",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionId",
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
                                    "type": "ApplicationVersionInteger",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionInteger",
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
                                    "type": "ApplicationVersionString",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionString",
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
                                    "type": "ApplicationVersionMajor",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionMajor",
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
                                    "type": "ApplicationVersionMinor",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionMinor",
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
                                    "type": "ApplicationVersionPatch",
                                    "ownerEntity": null,
                                    "nonArrayType": "ApplicationVersionPatch",
                                    "primitive": "number",
                                    "index": 5
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "Column",
                                            "values": [
                                                {
                                                    "name": "JSON_APPLICATION",
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
                                    "name": "jsonApplication",
                                    "type": "JsonApplicationWithLastIds",
                                    "ownerEntity": null,
                                    "nonArrayType": "JsonApplicationWithLastIds",
                                    "primitive": "Json",
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
                                                    "name": "APPLICATION_INDEX",
                                                    "nullable": false
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "application",
                                    "type": "Application",
                                    "ownerEntity": null,
                                    "nonArrayType": "Application",
                                    "entity": {
                                        "type": "Application",
                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\Application.ts",
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
                                                                "name": "APPLICATION_INDEX",
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
                                                "type": "ApplicationIndex",
                                                "ownerEntity": null,
                                                "nonArrayType": "ApplicationIndex",
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
                                                            "name": "APPLICATIONS"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "Application",
                                            "type": "typeof Application",
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
                                                            }
                                                        },
                                                        "path": "@airport/air-traffic-control"
                                                    },
                                                    "DbNumber": null,
                                                    "DbString": null,
                                                    "Entity": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "Json": null,
                                                    "ManyToOne": null,
                                                    "OneToMany": null,
                                                    "Table": null,
                                                    "PackageName": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "PackageName": {
                                                                "asName": "PackageName",
                                                                "moduleImport": null,
                                                                "sourceName": "PackageName"
                                                            },
                                                            "ApplicationIndex": {
                                                                "asName": "ApplicationIndex",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationIndex"
                                                            },
                                                            "FullApplicationName": {
                                                                "asName": "FullApplicationName",
                                                                "moduleImport": null,
                                                                "sourceName": "FullApplicationName"
                                                            },
                                                            "ApplicationScope": {
                                                                "asName": "ApplicationScope",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationScope"
                                                            },
                                                            "ApplicationStatus": {
                                                                "asName": "ApplicationStatus",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationStatus"
                                                            },
                                                            "ApplicationName": {
                                                                "asName": "ApplicationName",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationName"
                                                            }
                                                        },
                                                        "path": "@airport/ground-control"
                                                    },
                                                    "ApplicationIndex": null,
                                                    "FullApplicationName": null,
                                                    "ApplicationScope": null,
                                                    "ApplicationStatus": null,
                                                    "ApplicationName": null,
                                                    "Domain": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "Domain": {
                                                                "asName": "Domain",
                                                                "moduleImport": null,
                                                                "sourceName": "Domain"
                                                            }
                                                        },
                                                        "path": "./Domain"
                                                    },
                                                    "ApplicationCurrentVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationCurrentVersion": {
                                                                "asName": "ApplicationCurrentVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationCurrentVersion"
                                                            }
                                                        },
                                                        "path": "./ApplicationCurrentVersion"
                                                    },
                                                    "ApplicationVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationVersion": {
                                                                "asName": "ApplicationVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationVersion"
                                                            }
                                                        },
                                                        "path": "./ApplicationVersion"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-traffic-control": null,
                                                    "@airport/ground-control": null,
                                                    "./Domain": null,
                                                    "./ApplicationCurrentVersion": null,
                                                    "./ApplicationVersion": null
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
                                                                    "name": "APPLICATION_INDEX",
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
                                                    "type": "ApplicationIndex",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationIndex",
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
                                                    "entity": {
                                                        "type": "Domain",
                                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\Domain.ts",
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
                                                                    }
                                                                ],
                                                                "isGenerated": false,
                                                                "isId": true,
                                                                "isMappedSuperclass": false,
                                                                "isTransient": false,
                                                                "name": "id",
                                                                "type": "DomainId",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "DomainId",
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
                                                                            "name": "DOMAINS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "Domain",
                                                            "type": "typeof Domain",
                                                            "fileImports": {
                                                                "importMapByObjectAsName": {
                                                                    "DbNumber": {
                                                                        "fileImports": null,
                                                                        "isLocal": false,
                                                                        "objectMapByAsName": {
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
                                                                        "path": "@airport/air-traffic-control"
                                                                    },
                                                                    "DbString": null,
                                                                    "Entity": null,
                                                                    "Id": null,
                                                                    "OneToMany": null,
                                                                    "Table": null,
                                                                    "DomainId": {
                                                                        "fileImports": null,
                                                                        "isLocal": false,
                                                                        "objectMapByAsName": {
                                                                            "DomainId": {
                                                                                "asName": "DomainId",
                                                                                "moduleImport": null,
                                                                                "sourceName": "DomainId"
                                                                            },
                                                                            "DomainName": {
                                                                                "asName": "DomainName",
                                                                                "moduleImport": null,
                                                                                "sourceName": "DomainName"
                                                                            }
                                                                        },
                                                                        "path": "@airport/ground-control"
                                                                    },
                                                                    "DomainName": null,
                                                                    "Application": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "Application": {
                                                                                "asName": "Application",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Application"
                                                                            }
                                                                        },
                                                                        "path": "./Application"
                                                                    }
                                                                },
                                                                "importMapByModulePath": {
                                                                    "@airport/air-traffic-control": null,
                                                                    "@airport/ground-control": null,
                                                                    "./Application": null
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
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": true,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "id",
                                                                    "type": "DomainId",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "DomainId",
                                                                    "primitive": "number",
                                                                    "index": 0
                                                                },
                                                                {
                                                                    "decorators": [
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
                                                                    "type": "DomainName",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "DomainName",
                                                                    "primitive": "string",
                                                                    "index": 1
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "OneToMany",
                                                                            "values": [
                                                                                {
                                                                                    "mappedBy": "domain"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": false,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "applications",
                                                                    "type": "Application[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "Application",
                                                                    "entity": null,
                                                                    "index": 2
                                                                }
                                                            ],
                                                            "methodSignatures": [],
                                                            "constructors": [
                                                                {
                                                                    "parameters": [],
                                                                    "returnType": "Domain"
                                                                }
                                                            ]
                                                        },
                                                        "implementedInterfaceNames": []
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
                                                    "type": "ApplicationScope",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationScope",
                                                    "primitive": "string",
                                                    "index": 2
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "APPLICATION_NAME",
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
                                                    "type": "ApplicationName",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationName",
                                                    "primitive": "string",
                                                    "index": 3
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "FULL_APPLICATION_NAME",
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
                                                    "name": "fullName",
                                                    "type": "FullApplicationName",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "FullApplicationName",
                                                    "primitive": "string",
                                                    "index": 4
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
                                                            "name": "DbString",
                                                            "values": []
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "status",
                                                    "type": "ApplicationStatus",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationStatus",
                                                    "primitive": "string",
                                                    "index": 5
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "SIGNATURE",
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
                                                    "name": "signature",
                                                    "type": "string",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "string",
                                                    "primitive": "string",
                                                    "index": 6
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "application"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "versions",
                                                    "type": "ApplicationVersion[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationVersion",
                                                    "entity": null,
                                                    "index": 7
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "OneToMany",
                                                            "values": [
                                                                {
                                                                    "mappedBy": "application"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "isGenerated": false,
                                                    "isId": false,
                                                    "isMappedSuperclass": false,
                                                    "isTransient": false,
                                                    "name": "currentVersion",
                                                    "type": "ApplicationCurrentVersion[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationCurrentVersion",
                                                    "entity": {
                                                        "type": "ApplicationCurrentVersion",
                                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationCurrentVersion.ts",
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
                                                                        "name": "ManyToOne",
                                                                        "values": []
                                                                    },
                                                                    {
                                                                        "name": "JoinColumn",
                                                                        "values": [
                                                                            {
                                                                                "name": "APPLICATION_INDEX",
                                                                                "referencedColumnName": "APPLICATION_INDEX",
                                                                                "nullable": false
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "isGenerated": false,
                                                                "isId": true,
                                                                "isMappedSuperclass": false,
                                                                "isTransient": false,
                                                                "name": "application",
                                                                "type": "Application",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "Application",
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
                                                                                "name": "APPLICATION_VERSION_ID",
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
                                                                "name": "applicationVersion",
                                                                "type": "ApplicationVersion",
                                                                "ownerEntity": null,
                                                                "nonArrayType": "ApplicationVersion",
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
                                                                            "name": "APPLICATION_CURRENT_VERSIONS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "ApplicationCurrentVersion",
                                                            "type": "typeof ApplicationCurrentVersion",
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
                                                                        "path": "@airport/air-traffic-control"
                                                                    },
                                                                    "Id": null,
                                                                    "JoinColumn": null,
                                                                    "ManyToOne": null,
                                                                    "Table": null,
                                                                    "Application": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "Application": {
                                                                                "asName": "Application",
                                                                                "moduleImport": null,
                                                                                "sourceName": "Application"
                                                                            }
                                                                        },
                                                                        "path": "./Application"
                                                                    },
                                                                    "ApplicationVersion": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ApplicationVersion": {
                                                                                "asName": "ApplicationVersion",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationVersion"
                                                                            }
                                                                        },
                                                                        "path": "./ApplicationVersion"
                                                                    }
                                                                },
                                                                "importMapByModulePath": {
                                                                    "@airport/air-traffic-control": null,
                                                                    "./Application": null,
                                                                    "./ApplicationVersion": null
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
                                                                                    "name": "APPLICATION_INDEX",
                                                                                    "referencedColumnName": "APPLICATION_INDEX",
                                                                                    "nullable": false
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    "isGenerated": false,
                                                                    "isId": true,
                                                                    "isMappedSuperclass": false,
                                                                    "isTransient": false,
                                                                    "name": "application",
                                                                    "type": "Application",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "Application",
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
                                                                                    "name": "APPLICATION_VERSION_ID",
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
                                                                    "name": "applicationVersion",
                                                                    "type": "ApplicationVersion",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ApplicationVersion",
                                                                    "entity": null,
                                                                    "index": 1
                                                                }
                                                            ],
                                                            "methodSignatures": [],
                                                            "constructors": [
                                                                {
                                                                    "parameters": [],
                                                                    "returnType": "ApplicationCurrentVersion"
                                                                }
                                                            ]
                                                        },
                                                        "implementedInterfaceNames": []
                                                    },
                                                    "index": 8
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "Application"
                                                }
                                            ]
                                        },
                                        "implementedInterfaceNames": []
                                    },
                                    "index": 7
                                },
                                {
                                    "decorators": [
                                        {
                                            "name": "OneToMany",
                                            "values": [
                                                {
                                                    "mappedBy": "applicationVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "entities",
                                    "type": "ApplicationEntity[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "ApplicationEntity",
                                    "entity": {
                                        "type": "ApplicationEntity",
                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationEntity.ts",
                                        "parentClassName": "VersionedApplicationObject",
                                        "location": "./VersionedApplicationObject",
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
                                                            "name": "APPLICATION_ENTITIES"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "ApplicationEntity",
                                            "type": "typeof ApplicationEntity",
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
                                                        "path": "@airport/air-traffic-control"
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
                                                    "EntityId": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
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
                                                    "EntityIsLocal": null,
                                                    "EntityIsRepositoryEntity": null,
                                                    "EntityName": null,
                                                    "TableIndex": null,
                                                    "ApplicationColumn": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationColumn": {
                                                                "asName": "ApplicationColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationColumn"
                                                            }
                                                        },
                                                        "path": "./ApplicationColumn"
                                                    },
                                                    "ApplicationOperation": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationOperation": {
                                                                "asName": "ApplicationOperation",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationOperation"
                                                            }
                                                        },
                                                        "path": "./ApplicationOperation"
                                                    },
                                                    "ApplicationProperty": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationProperty": {
                                                                "asName": "ApplicationProperty",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationProperty"
                                                            }
                                                        },
                                                        "path": "./ApplicationProperty"
                                                    },
                                                    "ApplicationRelation": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationRelation": {
                                                                "asName": "ApplicationRelation",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationRelation"
                                                            }
                                                        },
                                                        "path": "./ApplicationRelation"
                                                    },
                                                    "ApplicationVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationVersion": {
                                                                "asName": "ApplicationVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationVersion"
                                                            }
                                                        },
                                                        "path": "./ApplicationVersion"
                                                    },
                                                    "VersionedApplicationObject": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "VersionedApplicationObject": {
                                                                "asName": "VersionedApplicationObject",
                                                                "moduleImport": null,
                                                                "sourceName": "VersionedApplicationObject"
                                                            }
                                                        },
                                                        "path": "./VersionedApplicationObject"
                                                    },
                                                    "IApplicationColumn": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "IApplicationColumn": {
                                                                "asName": "IApplicationColumn",
                                                                "moduleImport": null,
                                                                "sourceName": "IApplicationColumn"
                                                            }
                                                        },
                                                        "path": "../../generated/application/applicationcolumn"
                                                    },
                                                    "IApplicationProperty": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "IApplicationProperty": {
                                                                "asName": "IApplicationProperty",
                                                                "moduleImport": null,
                                                                "sourceName": "IApplicationProperty"
                                                            }
                                                        },
                                                        "path": "../../generated/application/applicationproperty"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-traffic-control": null,
                                                    "@airport/ground-control": null,
                                                    "./ApplicationColumn": null,
                                                    "./ApplicationOperation": null,
                                                    "./ApplicationProperty": null,
                                                    "./ApplicationRelation": null,
                                                    "./ApplicationVersion": null,
                                                    "./VersionedApplicationObject": null,
                                                    "../../generated/application/applicationcolumn": null,
                                                    "../../generated/application/applicationproperty": null
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
                                                                    "name": "APPLICATION_VERSION_ID",
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
                                                    "name": "applicationVersion",
                                                    "type": "ApplicationVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationVersion",
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
                                                    "type": "ApplicationColumn[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationColumn",
                                                    "entity": {
                                                        "type": "ApplicationColumn",
                                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationColumn.ts",
                                                        "parentClassName": "VersionedApplicationObject",
                                                        "location": "./VersionedApplicationObject",
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
                                                                            "name": "APPLICATION_COLUMNS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "ApplicationColumn",
                                                            "type": "typeof ApplicationColumn",
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
                                                                        "path": "@airport/air-traffic-control"
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
                                                                            "ColumnPrecision": {
                                                                                "asName": "ColumnPrecision",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnPrecision"
                                                                            },
                                                                            "ColumnScale": {
                                                                                "asName": "ColumnScale",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ColumnScale"
                                                                            },
                                                                            "IdColumnOnlyIndex": {
                                                                                "asName": "IdColumnOnlyIndex",
                                                                                "moduleImport": null,
                                                                                "sourceName": "IdColumnOnlyIndex"
                                                                            },
                                                                            "ApplicationColumnAllocationSize": {
                                                                                "asName": "ApplicationColumnAllocationSize",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationColumnAllocationSize"
                                                                            },
                                                                            "ApplicationColumnIsGenerated": {
                                                                                "asName": "ApplicationColumnIsGenerated",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationColumnIsGenerated"
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
                                                                    "ColumnPrecision": null,
                                                                    "ColumnScale": null,
                                                                    "IdColumnOnlyIndex": null,
                                                                    "ApplicationColumnAllocationSize": null,
                                                                    "ApplicationColumnIsGenerated": null,
                                                                    "SQLDataType": null,
                                                                    "ApplicationEntity": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ApplicationEntity": {
                                                                                "asName": "ApplicationEntity",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationEntity"
                                                                            }
                                                                        },
                                                                        "path": "./ApplicationEntity"
                                                                    },
                                                                    "ApplicationPropertyColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ApplicationPropertyColumn": {
                                                                                "asName": "ApplicationPropertyColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationPropertyColumn"
                                                                            }
                                                                        },
                                                                        "path": "./ApplicationPropertyColumn"
                                                                    },
                                                                    "ApplicationRelationColumn": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ApplicationRelationColumn": {
                                                                                "asName": "ApplicationRelationColumn",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationRelationColumn"
                                                                            }
                                                                        },
                                                                        "path": "./ApplicationRelationColumn"
                                                                    },
                                                                    "VersionedApplicationObject": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "VersionedApplicationObject": {
                                                                                "asName": "VersionedApplicationObject",
                                                                                "moduleImport": null,
                                                                                "sourceName": "VersionedApplicationObject"
                                                                            }
                                                                        },
                                                                        "path": "./VersionedApplicationObject"
                                                                    }
                                                                },
                                                                "importMapByModulePath": {
                                                                    "@airport/air-traffic-control": null,
                                                                    "@airport/ground-control": null,
                                                                    "./ApplicationEntity": null,
                                                                    "./ApplicationPropertyColumn": null,
                                                                    "./ApplicationRelationColumn": null,
                                                                    "./VersionedApplicationObject": null
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
                                                                    "type": "ApplicationColumnIsGenerated",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ApplicationColumnIsGenerated",
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
                                                                    "type": "ApplicationColumnAllocationSize",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ApplicationColumnAllocationSize",
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
                                                                                    "name": "PRECISION"
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
                                                                    "name": "precision",
                                                                    "type": "ColumnPrecision",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnPrecision",
                                                                    "primitive": "number",
                                                                    "index": 7
                                                                },
                                                                {
                                                                    "decorators": [
                                                                        {
                                                                            "name": "Column",
                                                                            "values": [
                                                                                {
                                                                                    "name": "SCALE"
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
                                                                    "name": "scale",
                                                                    "type": "ColumnScale",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ColumnScale",
                                                                    "primitive": "number",
                                                                    "index": 8
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
                                                                            "name": "DbString",
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
                                                                    "primitive": "string",
                                                                    "index": 9
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
                                                                                    "name": "APPLICATION_ENTITY_ID",
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
                                                                    "type": "ApplicationEntity",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ApplicationEntity",
                                                                    "entity": null,
                                                                    "index": 10
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
                                                                    "type": "ApplicationPropertyColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ApplicationPropertyColumn",
                                                                    "entity": {
                                                                        "type": "ApplicationPropertyColumn",
                                                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationPropertyColumn.ts",
                                                                        "parentClassName": "VersionedApplicationObject",
                                                                        "location": "./VersionedApplicationObject",
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
                                                                                                "name": "APPLICATION_COLUMN_ID",
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
                                                                                "type": "ApplicationColumn",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "ApplicationColumn",
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
                                                                                                "name": "APPLICATION_PROPERTY_ID",
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
                                                                                "type": "ApplicationProperty",
                                                                                "ownerEntity": null,
                                                                                "nonArrayType": "ApplicationProperty",
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
                                                                                            "name": "APPLICATION_PROPERTY_COLUMNS"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            "isGenerated": false,
                                                                            "isId": false,
                                                                            "isMappedSuperclass": false,
                                                                            "isTransient": false,
                                                                            "name": "ApplicationPropertyColumn",
                                                                            "type": "typeof ApplicationPropertyColumn",
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
                                                                                        "path": "@airport/air-traffic-control"
                                                                                    },
                                                                                    "Id": null,
                                                                                    "JoinColumn": null,
                                                                                    "ManyToOne": null,
                                                                                    "Table": null,
                                                                                    "ApplicationColumn": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "ApplicationColumn": {
                                                                                                "asName": "ApplicationColumn",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "ApplicationColumn"
                                                                                            }
                                                                                        },
                                                                                        "path": "./ApplicationColumn"
                                                                                    },
                                                                                    "ApplicationProperty": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "ApplicationProperty": {
                                                                                                "asName": "ApplicationProperty",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "ApplicationProperty"
                                                                                            }
                                                                                        },
                                                                                        "path": "./ApplicationProperty"
                                                                                    },
                                                                                    "VersionedApplicationObject": {
                                                                                        "fileImports": null,
                                                                                        "isLocal": true,
                                                                                        "objectMapByAsName": {
                                                                                            "VersionedApplicationObject": {
                                                                                                "asName": "VersionedApplicationObject",
                                                                                                "moduleImport": null,
                                                                                                "sourceName": "VersionedApplicationObject"
                                                                                            }
                                                                                        },
                                                                                        "path": "./VersionedApplicationObject"
                                                                                    }
                                                                                },
                                                                                "importMapByModulePath": {
                                                                                    "@airport/air-traffic-control": null,
                                                                                    "./ApplicationColumn": null,
                                                                                    "./ApplicationProperty": null,
                                                                                    "./VersionedApplicationObject": null
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
                                                                                                    "name": "APPLICATION_COLUMN_ID",
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
                                                                                    "type": "ApplicationColumn",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "ApplicationColumn",
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
                                                                                                    "name": "APPLICATION_PROPERTY_ID",
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
                                                                                    "type": "ApplicationProperty",
                                                                                    "ownerEntity": null,
                                                                                    "nonArrayType": "ApplicationProperty",
                                                                                    "entity": null,
                                                                                    "index": 1
                                                                                }
                                                                            ],
                                                                            "methodSignatures": [],
                                                                            "constructors": [
                                                                                {
                                                                                    "parameters": [],
                                                                                    "returnType": "ApplicationPropertyColumn"
                                                                                }
                                                                            ]
                                                                        },
                                                                        "implementedInterfaceNames": [],
                                                                        "parentEntity": null
                                                                    },
                                                                    "index": 11
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
                                                                    "type": "ApplicationRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ApplicationRelationColumn",
                                                                    "entity": null,
                                                                    "index": 12
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
                                                                    "type": "ApplicationRelationColumn[]",
                                                                    "ownerEntity": null,
                                                                    "isArray": true,
                                                                    "nonArrayType": "ApplicationRelationColumn",
                                                                    "entity": null,
                                                                    "index": 13
                                                                }
                                                            ],
                                                            "methodSignatures": [],
                                                            "constructors": [
                                                                {
                                                                    "parameters": [],
                                                                    "returnType": "ApplicationColumn"
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
                                                    "type": "ApplicationOperation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationOperation",
                                                    "entity": {
                                                        "type": "ApplicationOperation",
                                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationOperation.ts",
                                                        "parentClassName": "VersionedApplicationObject",
                                                        "location": "./VersionedApplicationObject",
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
                                                                            "name": "APPLICATION_OPERATIONS"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "isGenerated": false,
                                                            "isId": false,
                                                            "isMappedSuperclass": false,
                                                            "isTransient": false,
                                                            "name": "ApplicationOperation",
                                                            "type": "typeof ApplicationOperation",
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
                                                                        "path": "@airport/air-traffic-control"
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
                                                                    "ApplicationEntity": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "ApplicationEntity": {
                                                                                "asName": "ApplicationEntity",
                                                                                "moduleImport": null,
                                                                                "sourceName": "ApplicationEntity"
                                                                            }
                                                                        },
                                                                        "path": "./ApplicationEntity"
                                                                    },
                                                                    "VersionedApplicationObject": {
                                                                        "fileImports": null,
                                                                        "isLocal": true,
                                                                        "objectMapByAsName": {
                                                                            "VersionedApplicationObject": {
                                                                                "asName": "VersionedApplicationObject",
                                                                                "moduleImport": null,
                                                                                "sourceName": "VersionedApplicationObject"
                                                                            }
                                                                        },
                                                                        "path": "./VersionedApplicationObject"
                                                                    }
                                                                },
                                                                "importMapByModulePath": {
                                                                    "@airport/air-traffic-control": null,
                                                                    "@airport/ground-control": null,
                                                                    "./ApplicationEntity": null,
                                                                    "./VersionedApplicationObject": null
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
                                                                                    "name": "APPLICATION_ENTITY_ID",
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
                                                                    "type": "ApplicationEntity",
                                                                    "ownerEntity": null,
                                                                    "nonArrayType": "ApplicationEntity",
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
                                                                    "returnType": "ApplicationOperation"
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
                                                    "type": "ApplicationProperty[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationProperty",
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
                                                    "type": "ApplicationRelation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationRelation",
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
                                                    "type": "ApplicationRelation[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "ApplicationRelation",
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
                                                    "type": "{ [name: string]: IApplicationColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: IApplicationColumn; }",
                                                    "primitive": "Json"
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
                                                    "type": "IApplicationColumn[]",
                                                    "ownerEntity": null,
                                                    "isArray": true,
                                                    "nonArrayType": "IApplicationColumn"
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
                                                    "type": "{ [name: string]: IApplicationColumn; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: IApplicationColumn; }",
                                                    "primitive": "Json"
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
                                                    "type": "{ [name: string]: IApplicationProperty; }",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "{ [name: string]: IApplicationProperty; }",
                                                    "primitive": "Json"
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "ApplicationEntity"
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
                                                    "mappedBy": "ownApplicationVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "references",
                                    "type": "ApplicationReference[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "ApplicationReference",
                                    "entity": {
                                        "type": "ApplicationReference",
                                        "path": "D:\\code\\AIR\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationReference.ts",
                                        "parentClassName": "VersionedApplicationObject",
                                        "location": "./VersionedApplicationObject",
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
                                                                "name": "OWN_APPLICATION_VERSION_ID",
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
                                                "name": "ownApplicationVersion",
                                                "type": "ApplicationVersion",
                                                "ownerEntity": null,
                                                "nonArrayType": "ApplicationVersion",
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
                                                                "name": "REFERENCED_APPLICATION_VERSION_ID",
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
                                                "name": "referencedApplicationVersion",
                                                "type": "ApplicationVersion",
                                                "ownerEntity": null,
                                                "nonArrayType": "ApplicationVersion",
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
                                                            "name": "APPLICATION_REFERENCES"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "isGenerated": false,
                                            "isId": false,
                                            "isMappedSuperclass": false,
                                            "isTransient": false,
                                            "name": "ApplicationReference",
                                            "type": "typeof ApplicationReference",
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
                                                        "path": "@airport/air-traffic-control"
                                                    },
                                                    "DbNumber": null,
                                                    "Entity": null,
                                                    "Id": null,
                                                    "JoinColumn": null,
                                                    "ManyToOne": null,
                                                    "Table": null,
                                                    "ApplicationReferenceIndex": {
                                                        "fileImports": null,
                                                        "isLocal": false,
                                                        "objectMapByAsName": {
                                                            "ApplicationReferenceIndex": {
                                                                "asName": "ApplicationReferenceIndex",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationReferenceIndex"
                                                            }
                                                        },
                                                        "path": "@airport/ground-control"
                                                    },
                                                    "ApplicationVersion": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "ApplicationVersion": {
                                                                "asName": "ApplicationVersion",
                                                                "moduleImport": null,
                                                                "sourceName": "ApplicationVersion"
                                                            }
                                                        },
                                                        "path": "./ApplicationVersion"
                                                    },
                                                    "VersionedApplicationObject": {
                                                        "fileImports": null,
                                                        "isLocal": true,
                                                        "objectMapByAsName": {
                                                            "VersionedApplicationObject": {
                                                                "asName": "VersionedApplicationObject",
                                                                "moduleImport": null,
                                                                "sourceName": "VersionedApplicationObject"
                                                            }
                                                        },
                                                        "path": "./VersionedApplicationObject"
                                                    }
                                                },
                                                "importMapByModulePath": {
                                                    "@airport/air-traffic-control": null,
                                                    "@airport/ground-control": null,
                                                    "./ApplicationVersion": null,
                                                    "./VersionedApplicationObject": null
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
                                                                    "name": "OWN_APPLICATION_VERSION_ID",
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
                                                    "name": "ownApplicationVersion",
                                                    "type": "ApplicationVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationVersion",
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
                                                                    "name": "REFERENCED_APPLICATION_VERSION_ID",
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
                                                    "name": "referencedApplicationVersion",
                                                    "type": "ApplicationVersion",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationVersion",
                                                    "entity": null,
                                                    "index": 1
                                                },
                                                {
                                                    "decorators": [
                                                        {
                                                            "name": "Column",
                                                            "values": [
                                                                {
                                                                    "name": "APPLICATION_REFERENCE_INDEX",
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
                                                    "type": "ApplicationReferenceIndex",
                                                    "ownerEntity": null,
                                                    "nonArrayType": "ApplicationReferenceIndex",
                                                    "primitive": "number",
                                                    "index": 2
                                                }
                                            ],
                                            "methodSignatures": [],
                                            "constructors": [
                                                {
                                                    "parameters": [],
                                                    "returnType": "ApplicationReference"
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
                                                    "mappedBy": "referencedApplicationVersion"
                                                }
                                            ]
                                        }
                                    ],
                                    "isGenerated": false,
                                    "isId": false,
                                    "isMappedSuperclass": false,
                                    "isTransient": false,
                                    "name": "referencedBy",
                                    "type": "ApplicationReference[]",
                                    "ownerEntity": null,
                                    "isArray": true,
                                    "nonArrayType": "ApplicationReference",
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
                                    "name": "entityMapByName",
                                    "type": "{ [entityName: string]: IApplicationEntity; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [entityName: string]: IApplicationEntity; }",
                                    "primitive": "Json"
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
                                    "type": "{ [fullApplicationName: string]: IApplicationReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [fullApplicationName: string]: IApplicationReference; }",
                                    "primitive": "Json"
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
                                    "type": "{ [fullApplicationName: string]: IApplicationReference; }",
                                    "ownerEntity": null,
                                    "nonArrayType": "{ [fullApplicationName: string]: IApplicationReference; }",
                                    "primitive": "Json"
                                }
                            ],
                            "methodSignatures": [],
                            "constructors": [
                                {
                                    "parameters": [],
                                    "returnType": "ApplicationVersion"
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
                                    "name": "REMOVED_IN_APPLICATION_VERSION_ID",
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
                    "type": "ApplicationVersion",
                    "ownerEntity": null,
                    "nonArrayType": "ApplicationVersion",
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
                                    "name": "SINCE_APPLICATION_VERSION_ID",
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
                    "type": "ApplicationVersion",
                    "ownerEntity": null,
                    "nonArrayType": "ApplicationVersion",
                    "entity": null,
                    "index": 2
                }
            ],
            "methodSignatures": [],
            "constructors": [
                {
                    "parameters": [],
                    "returnType": "VersionedApplicationObject"
                }
            ]
        },
        "implementedInterfaceNames": [],
        "project": "@airport/airspace"
    }
];
//# sourceMappingURL=mappedSuperclass.js.map