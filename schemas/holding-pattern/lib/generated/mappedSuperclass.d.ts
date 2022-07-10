export declare const MAPPED_SUPERCLASS: ({
    type: string;
    path: string;
    parentClassName: any;
    isSuperclass: boolean;
    ids: ({
        decorators: {
            name: string;
            values: {
                name: string;
                referencedColumnName: string;
                nullable: boolean;
            }[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        ownerEntity: any;
        nonArrayType: string;
        entity: any;
        index: number;
        primitive?: undefined;
    } | {
        decorators: {
            name: string;
            values: {
                name: string;
                nullable: boolean;
            }[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        ownerEntity: any;
        nonArrayType: string;
        primitive: string;
        index: number;
        entity?: undefined;
    })[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                Column: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Column: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbDate: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbNumber: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        GeneratedValue: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        Id: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        JoinColumn: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        ManyToOne: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        Transient: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                DbDate: any;
                DbNumber: any;
                GeneratedValue: any;
                Id: any;
                JoinColumn: any;
                ManyToOne: any;
                MappedSuperclass: any;
                Transient: any;
                Actor: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Actor: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                SystemWideOperationId: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        SystemWideOperationId: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                Repository: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Repository: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                UserAccount: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        UserAccount: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                IOC: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        IOC: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                AIR_ENTITY_UTILS: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        AIR_ENTITY_UTILS: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                AirEntity?: undefined;
                IUserAccount?: undefined;
                ImmutableRepoRow?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "../infrastructure/Actor": any;
                "../common": any;
                "./Repository": any;
                "@airport/travel-document-checkpoint": any;
                "@airport/direction-indicator": any;
                "@airport/aviation-communication": any;
                "../repository/AirEntity"?: undefined;
                "./ImmutableRepoRow"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: ({
            decorators: {
                name: string;
                values: {
                    name: string;
                    referencedColumnName: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            entity: any;
            index: number;
            primitive?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
            entity?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
            entity?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                    referencedColumnName: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            entity: any;
            index: number;
            primitive?: undefined;
        } | {
            decorators: any[];
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            isGenerated?: undefined;
            isId?: undefined;
            isMappedSuperclass?: undefined;
            entity?: undefined;
            index?: undefined;
            primitive?: undefined;
        } | {
            decorators: any[];
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            isGenerated?: undefined;
            isId?: undefined;
            isMappedSuperclass?: undefined;
            entity?: undefined;
            index?: undefined;
        })[];
        methodSignatures: any[];
        constructors: {
            parameters: {
                decorators: any[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
            }[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    project: string;
    location?: undefined;
    parentEntity?: undefined;
} | {
    type: string;
    path: string;
    parentClassName: string;
    location: string;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                MappedSuperclass: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                AirEntity: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        AirEntity: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                Column?: undefined;
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                JoinColumn?: undefined;
                ManyToOne?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                IUserAccount?: undefined;
                ImmutableRepoRow?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "../repository/AirEntity": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/travel-document-checkpoint"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "./ImmutableRepoRow"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: any[];
        methodSignatures: any[];
        constructors: {
            parameters: {
                decorators: any[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
            }[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    parentEntity: {
        type: string;
        path: string;
        parentClassName: any;
        isSuperclass: boolean;
        ids: ({
            decorators: {
                name: string;
                values: {
                    name: string;
                    referencedColumnName: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            entity: any;
            index: number;
            primitive?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
            entity?: undefined;
        })[];
        docEntry: {
            decorators: {
                name: string;
                values: any[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            fileImports: {
                importMapByObjectAsName: {
                    Column: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Column: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbDate: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbNumber: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            GeneratedValue: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            Id: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            JoinColumn: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            ManyToOne: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            MappedSuperclass: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            Transient: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    DbDate: any;
                    DbNumber: any;
                    GeneratedValue: any;
                    Id: any;
                    JoinColumn: any;
                    ManyToOne: any;
                    MappedSuperclass: any;
                    Transient: any;
                    Actor: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Actor: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    SystemWideOperationId: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            SystemWideOperationId: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    Repository: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Repository: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    UserAccount: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            UserAccount: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    IOC: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            IOC: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    AIR_ENTITY_UTILS: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            AIR_ENTITY_UTILS: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    AirEntity?: undefined;
                    IUserAccount?: undefined;
                };
                importMapByModulePath: {
                    "@airport/air-traffic-control": any;
                    "../infrastructure/Actor": any;
                    "../common": any;
                    "./Repository": any;
                    "@airport/travel-document-checkpoint": any;
                    "@airport/direction-indicator": any;
                    "@airport/aviation-communication": any;
                    "../repository/AirEntity"?: undefined;
                };
            };
            properties: ({
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        referencedColumnName: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                entity: any;
                index: number;
                primitive?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                entity?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                entity?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        referencedColumnName: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                entity: any;
                index: number;
                primitive?: undefined;
            } | {
                decorators: any[];
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                isGenerated?: undefined;
                isId?: undefined;
                isMappedSuperclass?: undefined;
                entity?: undefined;
                index?: undefined;
                primitive?: undefined;
            } | {
                decorators: any[];
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                isGenerated?: undefined;
                isId?: undefined;
                isMappedSuperclass?: undefined;
                entity?: undefined;
                index?: undefined;
            })[];
            methodSignatures: any[];
            constructors: {
                parameters: {
                    decorators: any[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                }[];
                returnType: string;
            }[];
        };
        implementedInterfaceNames: any[];
        project: string;
        location?: undefined;
        parentEntity?: undefined;
    };
    project: string;
} | {
    type: string;
    path: string;
    parentClassName: any;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                MappedSuperclass: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                Column?: undefined;
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                JoinColumn?: undefined;
                ManyToOne?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                AirEntity?: undefined;
                IUserAccount?: undefined;
                ImmutableRepoRow?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/travel-document-checkpoint"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "../repository/AirEntity"?: undefined;
                "./ImmutableRepoRow"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: any[];
        methodSignatures: any[];
        constructors: {
            parameters: any[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    project: string;
    location?: undefined;
    parentEntity?: undefined;
} | {
    type: string;
    path: string;
    parentClassName: string;
    location: string;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                Column: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Column: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbDate?: undefined;
                        DbNumber?: undefined;
                        GeneratedValue?: undefined;
                        Id?: undefined;
                        JoinColumn?: undefined;
                        ManyToOne?: undefined;
                        Transient?: undefined;
                    };
                    path: string;
                };
                MappedSuperclass: any;
                AirEntity: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        AirEntity: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                JoinColumn?: undefined;
                ManyToOne?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                IUserAccount?: undefined;
                ImmutableRepoRow?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "../repository/AirEntity": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/travel-document-checkpoint"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "./ImmutableRepoRow"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: {
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
        }[];
        methodSignatures: any[];
        constructors: {
            parameters: {
                decorators: any[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
            }[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    parentEntity: {
        type: string;
        path: string;
        parentClassName: any;
        isSuperclass: boolean;
        ids: ({
            decorators: {
                name: string;
                values: {
                    name: string;
                    referencedColumnName: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            entity: any;
            index: number;
            primitive?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                    nullable: boolean;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
            entity?: undefined;
        })[];
        docEntry: {
            decorators: {
                name: string;
                values: any[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            fileImports: {
                importMapByObjectAsName: {
                    Column: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Column: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbDate: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbNumber: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            GeneratedValue: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            Id: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            JoinColumn: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            ManyToOne: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            MappedSuperclass: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            Transient: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    DbDate: any;
                    DbNumber: any;
                    GeneratedValue: any;
                    Id: any;
                    JoinColumn: any;
                    ManyToOne: any;
                    MappedSuperclass: any;
                    Transient: any;
                    Actor: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Actor: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    SystemWideOperationId: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            SystemWideOperationId: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    Repository: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Repository: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    UserAccount: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            UserAccount: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    IOC: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            IOC: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    AIR_ENTITY_UTILS: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            AIR_ENTITY_UTILS: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    AirEntity?: undefined;
                    IUserAccount?: undefined;
                };
                importMapByModulePath: {
                    "@airport/air-traffic-control": any;
                    "../infrastructure/Actor": any;
                    "../common": any;
                    "./Repository": any;
                    "@airport/travel-document-checkpoint": any;
                    "@airport/direction-indicator": any;
                    "@airport/aviation-communication": any;
                    "../repository/AirEntity"?: undefined;
                };
            };
            properties: ({
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        referencedColumnName: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                entity: any;
                index: number;
                primitive?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                entity?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                entity?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        referencedColumnName: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                entity: any;
                index: number;
                primitive?: undefined;
            } | {
                decorators: any[];
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                isGenerated?: undefined;
                isId?: undefined;
                isMappedSuperclass?: undefined;
                entity?: undefined;
                index?: undefined;
                primitive?: undefined;
            } | {
                decorators: any[];
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                isGenerated?: undefined;
                isId?: undefined;
                isMappedSuperclass?: undefined;
                entity?: undefined;
                index?: undefined;
            })[];
            methodSignatures: any[];
            constructors: {
                parameters: {
                    decorators: any[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                }[];
                returnType: string;
            }[];
        };
        implementedInterfaceNames: any[];
        project: string;
        location?: undefined;
        parentEntity?: undefined;
    };
    project: string;
} | {
    type: string;
    path: string;
    parentClassName: any;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                Column: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Column: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        JoinColumn: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        ManyToOne: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbDate?: undefined;
                        DbNumber?: undefined;
                        GeneratedValue?: undefined;
                        Id?: undefined;
                        Transient?: undefined;
                    };
                    path: string;
                };
                JoinColumn: any;
                ManyToOne: any;
                MappedSuperclass: any;
                IUserAccount: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        IUserAccount: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                AirEntity?: undefined;
                ImmutableRepoRow?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "@airport/travel-document-checkpoint": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "../repository/AirEntity"?: undefined;
                "./ImmutableRepoRow"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: ({
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            fromProject: string;
            otherApplicationDbEntity: {
                columnMap: any;
                columns: ({
                    entity: any;
                    _localId: any;
                    index: number;
                    isGenerated: boolean;
                    manyRelationColumns: any[];
                    name: string;
                    notNull: boolean;
                    oneRelationColumns: any[];
                    propertyColumnMap: any;
                    propertyColumns: {
                        column: any;
                        property: any;
                        sinceVersion: any;
                    }[];
                    sinceVersion: any;
                    type: string;
                    idIndex: number;
                } | {
                    entity: any;
                    _localId: any;
                    index: number;
                    isGenerated: boolean;
                    manyRelationColumns: any[];
                    name: string;
                    notNull: boolean;
                    oneRelationColumns: any[];
                    propertyColumnMap: any;
                    propertyColumns: {
                        column: any;
                        property: any;
                        sinceVersion: any;
                    }[];
                    sinceVersion: any;
                    type: string;
                    idIndex?: undefined;
                })[];
                idColumns: {
                    entity: any;
                    _localId: any;
                    index: number;
                    isGenerated: boolean;
                    manyRelationColumns: any[];
                    name: string;
                    notNull: boolean;
                    oneRelationColumns: any[];
                    propertyColumnMap: any;
                    propertyColumns: {
                        column: any;
                        property: any;
                        sinceVersion: any;
                    }[];
                    sinceVersion: any;
                    type: string;
                    idIndex: number;
                }[];
                idColumnMap: any;
                _localId: any;
                index: number;
                isLocal: boolean;
                isAirEntity: boolean;
                name: string;
                propertyMap: any;
                properties: {
                    propertyColumns: {
                        column: any;
                        property: any;
                        sinceVersion: any;
                    }[];
                    entity: any;
                    _localId: any;
                    index: number;
                    isId: boolean;
                    name: string;
                    relation: {
                        isId: boolean;
                        relationType: string;
                        _localId: any;
                        index: number;
                        property: any;
                        manyRelationColumns: any[];
                        oneRelationColumns: any[];
                        relationEntity: any;
                        sinceVersion: any;
                    }[];
                    sinceVersion: any;
                }[];
                relationReferences: any[];
                relations: {
                    isId: boolean;
                    relationType: string;
                    _localId: any;
                    index: number;
                    property: any;
                    manyRelationColumns: any[];
                    oneRelationColumns: any[];
                    relationEntity: any;
                    sinceVersion: any;
                }[];
                applicationVersion: any;
                sinceVersion: any;
                tableConfig: any;
            };
            index: number;
            primitive?: undefined;
        } | {
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
            fromProject?: undefined;
            otherApplicationDbEntity?: undefined;
        })[];
        methodSignatures: any[];
        constructors: {
            parameters: any[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    project: string;
    location?: undefined;
    parentEntity?: undefined;
} | {
    type: string;
    path: string;
    parentClassName: string;
    location: string;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                Column: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Column: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbDate?: undefined;
                        DbNumber?: undefined;
                        GeneratedValue?: undefined;
                        Id?: undefined;
                        JoinColumn?: undefined;
                        ManyToOne?: undefined;
                        Transient?: undefined;
                    };
                    path: string;
                };
                MappedSuperclass: any;
                ImmutableRepoRow: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        ImmutableRepoRow: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                JoinColumn?: undefined;
                ManyToOne?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                AirEntity?: undefined;
                IUserAccount?: undefined;
                ImmutableRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "./ImmutableRepoRow": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/travel-document-checkpoint"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "../repository/AirEntity"?: undefined;
                "./ImmutableRow"?: undefined;
            };
        };
        properties: {
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
        }[];
        methodSignatures: any[];
        constructors: {
            parameters: {
                decorators: any[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
            }[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    parentEntity: {
        type: string;
        path: string;
        parentClassName: string;
        location: string;
        isSuperclass: boolean;
        ids: any[];
        docEntry: {
            decorators: {
                name: string;
                values: any[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            fileImports: {
                importMapByObjectAsName: {
                    Column: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Column: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            MappedSuperclass: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbDate?: undefined;
                            DbNumber?: undefined;
                            GeneratedValue?: undefined;
                            Id?: undefined;
                            JoinColumn?: undefined;
                            ManyToOne?: undefined;
                            Transient?: undefined;
                        };
                        path: string;
                    };
                    MappedSuperclass: any;
                    AirEntity: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            AirEntity: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    DbDate?: undefined;
                    DbNumber?: undefined;
                    GeneratedValue?: undefined;
                    Id?: undefined;
                    JoinColumn?: undefined;
                    ManyToOne?: undefined;
                    Transient?: undefined;
                    Actor?: undefined;
                    SystemWideOperationId?: undefined;
                    Repository?: undefined;
                    UserAccount?: undefined;
                    IOC?: undefined;
                    AIR_ENTITY_UTILS?: undefined;
                    IUserAccount?: undefined;
                };
                importMapByModulePath: {
                    "@airport/air-traffic-control": any;
                    "../repository/AirEntity": any;
                    "../infrastructure/Actor"?: undefined;
                    "../common"?: undefined;
                    "./Repository"?: undefined;
                    "@airport/travel-document-checkpoint"?: undefined;
                    "@airport/direction-indicator"?: undefined;
                    "@airport/aviation-communication"?: undefined;
                };
            };
            properties: {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
            }[];
            methodSignatures: any[];
            constructors: {
                parameters: {
                    decorators: any[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                }[];
                returnType: string;
            }[];
        };
        implementedInterfaceNames: any[];
        parentEntity: {
            type: string;
            path: string;
            parentClassName: any;
            isSuperclass: boolean;
            ids: ({
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        referencedColumnName: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                entity: any;
                index: number;
                primitive?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                        nullable: boolean;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                entity?: undefined;
            })[];
            docEntry: {
                decorators: {
                    name: string;
                    values: any[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                fileImports: {
                    importMapByObjectAsName: {
                        Column: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                Column: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                DbDate: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                DbNumber: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                GeneratedValue: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                Id: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                JoinColumn: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                ManyToOne: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                MappedSuperclass: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                                Transient: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        DbDate: any;
                        DbNumber: any;
                        GeneratedValue: any;
                        Id: any;
                        JoinColumn: any;
                        ManyToOne: any;
                        MappedSuperclass: any;
                        Transient: any;
                        Actor: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                Actor: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        SystemWideOperationId: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                SystemWideOperationId: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        Repository: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                Repository: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        UserAccount: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                UserAccount: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        IOC: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                IOC: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                        AIR_ENTITY_UTILS: {
                            fileImports: any;
                            isLocal: boolean;
                            objectMapByAsName: {
                                AIR_ENTITY_UTILS: {
                                    asName: string;
                                    moduleImport: any;
                                    sourceName: string;
                                };
                            };
                            path: string;
                        };
                    };
                    importMapByModulePath: {
                        "@airport/air-traffic-control": any;
                        "../infrastructure/Actor": any;
                        "../common": any;
                        "./Repository": any;
                        "@airport/travel-document-checkpoint": any;
                        "@airport/direction-indicator": any;
                        "@airport/aviation-communication": any;
                    };
                };
                properties: ({
                    decorators: {
                        name: string;
                        values: {
                            name: string;
                            referencedColumnName: string;
                            nullable: boolean;
                        }[];
                    }[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    entity: any;
                    index: number;
                    primitive?: undefined;
                } | {
                    decorators: {
                        name: string;
                        values: {
                            name: string;
                            nullable: boolean;
                        }[];
                    }[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    primitive: string;
                    index: number;
                    entity?: undefined;
                } | {
                    decorators: {
                        name: string;
                        values: {
                            name: string;
                        }[];
                    }[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    primitive: string;
                    index: number;
                    entity?: undefined;
                } | {
                    decorators: {
                        name: string;
                        values: {
                            name: string;
                            referencedColumnName: string;
                        }[];
                    }[];
                    isGenerated: boolean;
                    isId: boolean;
                    isMappedSuperclass: boolean;
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    entity: any;
                    index: number;
                    primitive?: undefined;
                } | {
                    decorators: any[];
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    isGenerated?: undefined;
                    isId?: undefined;
                    isMappedSuperclass?: undefined;
                    entity?: undefined;
                    index?: undefined;
                    primitive?: undefined;
                } | {
                    decorators: any[];
                    isTransient: boolean;
                    name: string;
                    optional: boolean;
                    type: string;
                    ownerEntity: any;
                    nonArrayType: string;
                    primitive: string;
                    isGenerated?: undefined;
                    isId?: undefined;
                    isMappedSuperclass?: undefined;
                    entity?: undefined;
                    index?: undefined;
                })[];
                methodSignatures: any[];
                constructors: {
                    parameters: {
                        decorators: any[];
                        isGenerated: boolean;
                        isId: boolean;
                        isMappedSuperclass: boolean;
                        isTransient: boolean;
                        name: string;
                        optional: boolean;
                        type: string;
                    }[];
                    returnType: string;
                }[];
            };
            implementedInterfaceNames: any[];
            project: string;
        };
        project: string;
    };
    project: string;
} | {
    type: string;
    path: string;
    parentClassName: string;
    location: string;
    isSuperclass: boolean;
    ids: any[];
    docEntry: {
        decorators: {
            name: string;
            values: any[];
        }[];
        isGenerated: boolean;
        isId: boolean;
        isMappedSuperclass: boolean;
        isTransient: boolean;
        name: string;
        optional: boolean;
        type: string;
        fileImports: {
            importMapByObjectAsName: {
                Column: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        Column: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        MappedSuperclass: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                        DbDate?: undefined;
                        DbNumber?: undefined;
                        GeneratedValue?: undefined;
                        Id?: undefined;
                        JoinColumn?: undefined;
                        ManyToOne?: undefined;
                        Transient?: undefined;
                    };
                    path: string;
                };
                MappedSuperclass: any;
                ImmutableRow: {
                    fileImports: any;
                    isLocal: boolean;
                    objectMapByAsName: {
                        ImmutableRow: {
                            asName: string;
                            moduleImport: any;
                            sourceName: string;
                        };
                    };
                    path: string;
                };
                DbDate?: undefined;
                DbNumber?: undefined;
                GeneratedValue?: undefined;
                Id?: undefined;
                JoinColumn?: undefined;
                ManyToOne?: undefined;
                Transient?: undefined;
                Actor?: undefined;
                SystemWideOperationId?: undefined;
                Repository?: undefined;
                UserAccount?: undefined;
                IOC?: undefined;
                AIR_ENTITY_UTILS?: undefined;
                AirEntity?: undefined;
                IUserAccount?: undefined;
                ImmutableRepoRow?: undefined;
            };
            importMapByModulePath: {
                "@airport/air-traffic-control": any;
                "./ImmutableRow": any;
                "../infrastructure/Actor"?: undefined;
                "../common"?: undefined;
                "./Repository"?: undefined;
                "@airport/travel-document-checkpoint"?: undefined;
                "@airport/direction-indicator"?: undefined;
                "@airport/aviation-communication"?: undefined;
                "../repository/AirEntity"?: undefined;
                "./ImmutableRepoRow"?: undefined;
            };
        };
        properties: {
            decorators: {
                name: string;
                values: {
                    name: string;
                }[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            ownerEntity: any;
            nonArrayType: string;
            primitive: string;
            index: number;
        }[];
        methodSignatures: any[];
        constructors: {
            parameters: any[];
            returnType: string;
        }[];
    };
    implementedInterfaceNames: any[];
    parentEntity: {
        type: string;
        path: string;
        parentClassName: any;
        isSuperclass: boolean;
        ids: any[];
        docEntry: {
            decorators: {
                name: string;
                values: any[];
            }[];
            isGenerated: boolean;
            isId: boolean;
            isMappedSuperclass: boolean;
            isTransient: boolean;
            name: string;
            optional: boolean;
            type: string;
            fileImports: {
                importMapByObjectAsName: {
                    Column: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            Column: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            JoinColumn: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            ManyToOne: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            MappedSuperclass: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                            DbDate?: undefined;
                            DbNumber?: undefined;
                            GeneratedValue?: undefined;
                            Id?: undefined;
                            Transient?: undefined;
                        };
                        path: string;
                    };
                    JoinColumn: any;
                    ManyToOne: any;
                    MappedSuperclass: any;
                    IUserAccount: {
                        fileImports: any;
                        isLocal: boolean;
                        objectMapByAsName: {
                            IUserAccount: {
                                asName: string;
                                moduleImport: any;
                                sourceName: string;
                            };
                        };
                        path: string;
                    };
                    DbDate?: undefined;
                    DbNumber?: undefined;
                    GeneratedValue?: undefined;
                    Id?: undefined;
                    Transient?: undefined;
                    Actor?: undefined;
                    SystemWideOperationId?: undefined;
                    Repository?: undefined;
                    UserAccount?: undefined;
                    IOC?: undefined;
                    AIR_ENTITY_UTILS?: undefined;
                    AirEntity?: undefined;
                };
                importMapByModulePath: {
                    "@airport/air-traffic-control": any;
                    "@airport/travel-document-checkpoint": any;
                    "../infrastructure/Actor"?: undefined;
                    "../common"?: undefined;
                    "./Repository"?: undefined;
                    "@airport/direction-indicator"?: undefined;
                    "@airport/aviation-communication"?: undefined;
                    "../repository/AirEntity"?: undefined;
                };
            };
            properties: ({
                decorators: {
                    name: string;
                    values: {
                        name: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                fromProject: string;
                otherApplicationDbEntity: {
                    columnMap: any;
                    columns: ({
                        entity: any;
                        _localId: any;
                        index: number;
                        isGenerated: boolean;
                        manyRelationColumns: any[];
                        name: string;
                        notNull: boolean;
                        oneRelationColumns: any[];
                        propertyColumnMap: any;
                        propertyColumns: {
                            column: any;
                            property: any;
                            sinceVersion: any;
                        }[];
                        sinceVersion: any;
                        type: string;
                        idIndex: number;
                    } | {
                        entity: any;
                        _localId: any;
                        index: number;
                        isGenerated: boolean;
                        manyRelationColumns: any[];
                        name: string;
                        notNull: boolean;
                        oneRelationColumns: any[];
                        propertyColumnMap: any;
                        propertyColumns: {
                            column: any;
                            property: any;
                            sinceVersion: any;
                        }[];
                        sinceVersion: any;
                        type: string;
                        idIndex?: undefined;
                    })[];
                    idColumns: {
                        entity: any;
                        _localId: any;
                        index: number;
                        isGenerated: boolean;
                        manyRelationColumns: any[];
                        name: string;
                        notNull: boolean;
                        oneRelationColumns: any[];
                        propertyColumnMap: any;
                        propertyColumns: {
                            column: any;
                            property: any;
                            sinceVersion: any;
                        }[];
                        sinceVersion: any;
                        type: string;
                        idIndex: number;
                    }[];
                    idColumnMap: any;
                    _localId: any;
                    index: number;
                    isLocal: boolean;
                    isAirEntity: boolean;
                    name: string;
                    propertyMap: any;
                    properties: {
                        propertyColumns: {
                            column: any;
                            property: any;
                            sinceVersion: any;
                        }[];
                        entity: any;
                        _localId: any;
                        index: number;
                        isId: boolean;
                        name: string;
                        relation: {
                            isId: boolean;
                            relationType: string;
                            _localId: any;
                            index: number;
                            property: any;
                            manyRelationColumns: any[];
                            oneRelationColumns: any[];
                            relationEntity: any;
                            sinceVersion: any;
                        }[];
                        sinceVersion: any;
                    }[];
                    relationReferences: any[];
                    relations: {
                        isId: boolean;
                        relationType: string;
                        _localId: any;
                        index: number;
                        property: any;
                        manyRelationColumns: any[];
                        oneRelationColumns: any[];
                        relationEntity: any;
                        sinceVersion: any;
                    }[];
                    applicationVersion: any;
                    sinceVersion: any;
                    tableConfig: any;
                };
                index: number;
                primitive?: undefined;
            } | {
                decorators: {
                    name: string;
                    values: {
                        name: string;
                    }[];
                }[];
                isGenerated: boolean;
                isId: boolean;
                isMappedSuperclass: boolean;
                isTransient: boolean;
                name: string;
                optional: boolean;
                type: string;
                ownerEntity: any;
                nonArrayType: string;
                primitive: string;
                index: number;
                fromProject?: undefined;
                otherApplicationDbEntity?: undefined;
            })[];
            methodSignatures: any[];
            constructors: {
                parameters: any[];
                returnType: string;
            }[];
        };
        implementedInterfaceNames: any[];
        project: string;
        location?: undefined;
        parentEntity?: undefined;
    };
    project: string;
})[];
//# sourceMappingURL=mappedSuperclass.d.ts.map