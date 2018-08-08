"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/travel-document-checkpoint",
    "versions": [
        {
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 2,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "USER_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 3,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "UserTerminal",
                    "properties": [
                        {
                            "index": 0,
                            "isId": false,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "terminal",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 2
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 3
                        }
                    ],
                    "tableConfig": {
                        "name": "USER_TERMINAL"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 5,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                },
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 2
                                }
                            ],
                            "name": "AGT_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PASSWORD",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 2,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "USER_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 3,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                },
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 1
                                }
                            ],
                            "name": "TERMINAL_ID",
                            "propertyRefs": [
                                {
                                    "index": 4
                                },
                                {
                                    "index": 6
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 1,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "UserTerminalAgt",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": true,
                            "name": "agtId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "password"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "terminal",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "agt",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "terminalAgt",
                            "relationRef": {
                                "index": 3
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 2
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 3
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 5
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 4
                        }
                    ],
                    "tableConfig": {
                        "name": "USER_TERMINAL_AGT"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "UNIQUE_IDENTIFIER",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "FIRST_NAME",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "LAST_NAME",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "MIDDLE_NAME",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PHONE",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 5
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "User",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "uniqueId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "firstName"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "lastName"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "middleName"
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 5,
                            "isId": false,
                            "name": "phone"
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "userTerminal",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "userTerminalAgts",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "user"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 0
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "user"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 1
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SECOND_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "IS_LOCAL",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 1
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "OWNER_USER_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Terminal",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "secondId"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "owner",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 4,
                            "isId": false,
                            "name": "isLocal"
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "terminalAgts",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "userTerminal",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "userTerminalAgt",
                            "relationRef": {
                                "index": 3
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 2
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "terminal"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 4
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "terminal"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 0
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "terminal"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 1
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PASSWORD",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 3,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 5,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "AGT_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 4,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "TerminalAgt",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "terminal",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "agt",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 2,
                            "isId": false,
                            "name": "password"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "userTerminalAgts",
                            "relationRef": {
                                "index": 2
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 3
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 5
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "terminalAgt"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "TERMINAL_AGTS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ADDRESS",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 5,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Agt",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "address"
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "terminalAgts",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "userTerminalAgts",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "agt"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 4
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "agt"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1
                        }
                    ]
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map