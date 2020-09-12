import { ColumnDecorator, GeneratedValueDecorator, IdDecorator, JoinColumnConfiguration, JoinColumnDecorator, JoinColumnsDecorator, ManyToOneDecorator, OneToManyDecorator, SequenceGeneratorDecorator, SubQueryDecorator, TraditionalServerSeqDecorator, TransientDecorator } from '../../../../lingo/core/entity/metadata/ColumnDecorators';
/**
 * Created by Papa on 8/20/2016.
 */
export declare const Id: IdDecorator;
export declare const Column: ColumnDecorator;
export declare const JoinColumn: JoinColumnDecorator;
export declare const JoinColumns: JoinColumnsDecorator;
/**
 * Function used to add a clause to a Join
 export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
    (
        otm: QOtm, // One-to-Many IQEntity
        mto: QMto // Many-to-One IQEntity
    ): JSONBaseOperation;
}
 */
export declare const SubQuery: SubQueryDecorator<any, any>;
/**
 * Non-JPA decorator.
 *
 * Marks an object property as a join column
 * with a repository join column attached automatically.
 */
export interface RJoinColumnDecorator {
    (rJoinColumnConfiguration: JoinColumnConfiguration): PropertyDecorator;
}
export declare const RJoinColumn: RJoinColumnDecorator;
export declare const RJoinColumns: JoinColumnsDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a json object. Internally stored as a string.
 * During retrieves, the value will be parsed using JSON.parse.
 * During persists, the value will be serialized using JSON.stringify.
 */
export interface JsonDecorator {
    (): PropertyDecorator;
}
export declare const Json: JsonDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a "any" terminal type.
 */
export interface DbAnyDecorator {
    (): PropertyDecorator;
}
export declare const DbAny: DbAnyDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a "boolean" type.
 */
export interface DbBooleanDecorator {
    (): PropertyDecorator;
}
export declare const DbBoolean: DbBooleanDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbDateDecorator {
    (): PropertyDecorator;
}
export declare const DbDate: DbDateDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbNumberDecorator {
    (): PropertyDecorator;
}
export declare const DbNumber: DbNumberDecorator;
/**
 * Non-JPA decorator.
 *
 * Marks the column as a boolean type.
 */
export interface DbStringDecorator {
    (): PropertyDecorator;
}
export declare const DbString: DbStringDecorator;
export declare const Transient: TransientDecorator;
export declare const ManyToOne: ManyToOneDecorator;
export declare const OneToMany: OneToManyDecorator;
export declare const GeneratedValue: GeneratedValueDecorator;
export declare const SequenceGenerator: SequenceGeneratorDecorator;
export declare const TraditionalServerSeq: TraditionalServerSeqDecorator;
//# sourceMappingURL=ColumnDecorators.d.ts.map