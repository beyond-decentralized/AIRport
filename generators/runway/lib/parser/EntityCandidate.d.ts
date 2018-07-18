import { ClassDocEntry, DocEntry, PropertyDocEntry } from "./DocEntry";
/**
 * Created by Papa on 3/27/2016.
 */
export declare class Interface {
    name: string;
    implementedBySet: Set<EntityCandidate>;
    implementation?: EntityCandidate;
    constructor(path: string, name: string);
}
export declare class EntityCandidate {
    type: string;
    path: string;
    parentClassName: string;
    private location?;
    private verified?;
    isSuperclass?: boolean;
    ids: DocEntry[];
    docEntry: ClassDocEntry;
    implementedInterfaceNames: string[];
    static create(type: string, path: string, parentClass: string, parentImport: string, isSuperClass: boolean): EntityCandidate;
    parentEntity: EntityCandidate;
    constructor(type: string, path: string, parentClassName: string, location?: string, verified?: boolean, isSuperclass?: boolean);
    getIdProperties(): PropertyDocEntry[];
    getNonIdProperties(): PropertyDocEntry[];
    private getPropertiesOfType;
    getTransientProperties(): PropertyDocEntry[];
    matches(type: string, location?: string): boolean;
}
