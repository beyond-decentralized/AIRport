"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/airport-code",
    "versions": [
        {
            "entities": [
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
                            "name": "SCHEMA_INDEX",
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
                            "name": "TABLE_INDEX",
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
                            "name": "COLUMN_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SEQUENCE_INCREMENT_BY",
                            "propertyRefs": [
                                {
                                    "index": 4
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
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Sequence",
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
                            "name": "schemaIndex"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "tableIndex"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "columnIndex"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "incrementBy"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "SEQUENCE_SETTINGS"
                    }
                },
                {
                    "columns": [
                        {
                            "allocationSize": 1000,
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
                            "name": "CREATE_TIMESTAMP",
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
                            "name": "RANDOM_NUMBER",
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
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "DOMAIN_ID",
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
                    "index": 1,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SequenceConsumer",
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
                            "name": "createTimestamp"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "randomNumber"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "domain",
                            "relationRef": {
                                "index": 0
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
                            "relationTableIndex": 2,
                            "relationTableSchemaIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "SEQUENCE_CONSUMERS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SIZE",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "LAST_RESERVED_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "RESERVATION_MILLIS",
                            "propertyRefs": [
                                {
                                    "index": 4
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
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SEQUENCE_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
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
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "CONSUMER_ID",
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
                            "index": 3
                        },
                        {
                            "index": 4
                        }
                    ],
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SequenceBlock",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "sequence",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "consumer",
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
                            "name": "size"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "lastReservedId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "reservationMillis"
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
                            "relationTableIndex": 0
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "SEQUENCE_BLOCKS"
                    }
                }
            ],
            "integerVersion": 1,
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map