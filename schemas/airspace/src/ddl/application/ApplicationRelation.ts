import {
	Column,
	DbNumber,
	DbString,
	Entity,
	ForeignKey,
	Id,
	JoinColumn,
	Json,
	ManyToOne,
	ManyToOneElements,
	OneToMany,
	OneToManyElements,
	Table
}                              from '@airport/air-traffic-control'
import {
	EntityRelationType,
	RelationId,
	RelationIndex,
}                              from '@airport/ground-control'
import {ApplicationEntity}          from './ApplicationEntity'
import {ApplicationProperty}        from './ApplicationProperty'
import {ApplicationRelationColumn}  from './ApplicationRelationColumn'
import {VersionedApplicationObject} from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'APPLICATION_RELATIONS'
})
export class ApplicationRelation
	extends VersionedApplicationObject {

	@DbNumber()
	@Id()
	id: RelationId

	@DbNumber()
	@Column({name: 'RELATION_INDEX', nullable: false})
	index: RelationIndex

	@ManyToOne()
	@JoinColumn({name: 'APPLICATION_PROPERTY_ID', referencedColumnName: 'ID', nullable: false})
	property: ApplicationProperty

	@Json()
	@Column({name: 'FOREIGN_KEY'})
	foreignKey: ForeignKey

	@Json()
	@Column({name: 'MANY_TO_ONE_ELEMENTS'})
	manyToOneElems: ManyToOneElements

	@Json()
	@Column({name: 'ONE_TO_MANY_ELEMENTS'})
	oneToManyElems: OneToManyElements

	@DbString()
	@Column({name: 'RELATION_TYPE', nullable: false})
	relationType: EntityRelationType

	// @Column({name: "IS_REPOSITORY_JOIN"})
	// isRepositoryJoin: boolean;

	@Column({name: 'IS_ID', nullable: false})
	isId: boolean

	// @Column({name: "ADD_TO_JOIN_FUNCTION"})
	// addToJoinFunction: string;
	//
	// @Column({name: "JOIN_FUNCTION_WITH_OPERATOR"})
	// joinFunctionWithOperator: number;

	@ManyToOne()
	@JoinColumn({name: 'APPLICATION_TABLE_ID', referencedColumnName: 'ID', nullable: false})
	entity: ApplicationEntity

	@ManyToOne()
	@JoinColumn({name: 'RELATION_APPLICATION_TABLE_ID', referencedColumnName: 'ID', nullable: false})
	relationEntity: ApplicationEntity

	@OneToMany({mappedBy: 'manyRelation'})
	manyRelationColumns: ApplicationRelationColumn[] = []

	@OneToMany({mappedBy: 'oneRelation'})
	oneRelationColumns?: ApplicationRelationColumn[] = []

}
