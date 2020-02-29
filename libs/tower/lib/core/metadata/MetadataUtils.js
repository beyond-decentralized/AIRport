/**
 * Created by Papa on 9/2/2016.
 */
/*
declare function require(moduleName: string): any;

export class MetadataUtils {

    static isRepositoryId(columnName: string) {
        return columnName === repositoryEntity.FOREIGN_KEY;
    }

    static isStubObject(entity: any): boolean {
        return entity.__isStub__;
    }

    static setIsStubObject(entity: any): void {
        entity.__isStub__ = true;
    }

    static isEmpty(
        value: any
    ) {
        return value === undefined || value === null;
    }

    static isIdEmpty(
        value: any
    ) {
        return this.isEmpty(value) || value === '';
    }

    static doCascade(
        dbRelation: DbRelation,
        crudOperation: CRUDOperation
    ): boolean {
        if (dbRelation.relationType !== EntityRelationType.ONE_TO_MANY) {
            return false;
        }

        if (!dbRelation.oneToManyElems) {
            return false;
        }

        const cascade: any = dbRelation.oneToManyElems.cascade;

        switch (crudOperation) {
            case CRUDOperation.CREATE:
            case CRUDOperation.UPDATE:
                return cascade === CascadeType.ALL || cascade === CascadeType.PERSIST;
            case CRUDOperation.DELETE:
                return cascade === CascadeType.ALL || cascade === CascadeType.REMOVE;
            default:
                throw new Error(
                `Unsupported CRUDOperation '${crudOperation}' for cascade check.`)
        }
    }

}
*/
//# sourceMappingURL=MetadataUtils.js.map