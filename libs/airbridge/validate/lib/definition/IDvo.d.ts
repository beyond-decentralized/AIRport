/**
 * Data Validation Object.
 */
export interface IDvo<Entity, EntityVDescritor> {
    validate(entity: Entity, rules: EntityVDescritor): Promise<boolean>;
}
//# sourceMappingURL=IDvo.d.ts.map