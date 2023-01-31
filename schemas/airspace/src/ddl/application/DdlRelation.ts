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
} from '@airport/tarmaq-entity'
import {
	EntityRelationType,
	DbRelation_LocalId,
	DbRelation_Index,
	DbRelation,
} from '@airport/ground-control'
import { DdlEntity } from './DdlEntity'
import { DdlProperty } from './DdlProperty'
import { DdlRelationColumn } from './DdlRelationColumn'
import { DdlVersionedObject } from './DdlVersionedObject'

@Entity()
@Table({
	name: 'DB_RELATIONS'
})
export class DdlRelation
	extends DdlVersionedObject
	implements DbRelation {

	@DbNumber()
	@Id()
	@Column({ name: 'DB_RELATION_LID' })
	_localId: DbRelation_LocalId

	@DbNumber()
	@Column({ name: 'DB_RELATION_INDEX', nullable: false })
	index?: DbRelation_Index

	@ManyToOne()
	@JoinColumn({
		name: 'DB_PROPERTY_LID',
		referencedColumnName: 'DB_PROPERTY_LID', nullable: false
	})
	property?: DdlProperty

	@Json()
	@Column({ name: 'FOREIGN_KEY' })
	foreignKey?: ForeignKey

	@Json()
	@Column({ name: 'MANY_TO_ONE_ELEMENTS' })
	manyToOneElems?: ManyToOneElements

	@Json()
	@Column({ name: 'ONE_TO_MANY_ELEMENTS' })
	oneToManyElems?: OneToManyElements

	@DbString()
	@Column({ name: 'RELATION_TYPE', nullable: false })
	relationType?: EntityRelationType

	// @Column({name: "IS_REPOSITORY_JOIN"})
	// isRepositoryJoin: boolean;

	@Column({ name: 'IS_LID', nullable: false })
	isId?: boolean

	// @Column({name: "ADD_TO_JOIN_FUNCTION"})
	// addToJoinFunction: string;
	//
	// @Column({name: "JOIN_FUNCTION_WITH_OPERATOR"})
	// joinFunctionWithOperator: number;

	@ManyToOne()
	@JoinColumn({
		name: 'DB_ENTITY_LID',
		referencedColumnName: 'DB_ENTITY_LID', nullable: false
	})
	entity?: DdlEntity

	@ManyToOne()
	@JoinColumn({
		name: 'RELATION_DB_ENTITY_LID',
		referencedColumnName: 'DB_ENTITY_LID', nullable: false
	})
	relationEntity?: DdlEntity

	@OneToMany({ mappedBy: 'manyRelation' })
	manyRelationColumns?: DdlRelationColumn[] = []

	@OneToMany({ mappedBy: 'oneRelation' })
	oneRelationColumns?: DdlRelationColumn[] = []

}
