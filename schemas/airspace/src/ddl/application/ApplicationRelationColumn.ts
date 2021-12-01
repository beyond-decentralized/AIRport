import {
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from '@airport/air-control'
import {ApplicationColumn}          from './ApplicationColumn'
import {ApplicationRelation}        from './ApplicationRelation'
import {VersionedApplicationObject} from './VersionedApplicationObject'

export type ApplicationRelationColumnId = number;

@Entity()
@Table({
	name: 'SCHEMA_RELATION_COLUMNS'
})
export class ApplicationRelationColumn
	extends VersionedApplicationObject {

	@Id()
	id: ApplicationRelationColumnId

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_SCHEMA_COLUMN_ID',
		referencedColumnName: 'ID',
		nullable: false
	})
	manyColumn: ApplicationColumn

	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	oneColumn: ApplicationColumn

	@ManyToOne()
	@JoinColumn({name: 'MANY_SCHEMA_RELATION_ID', referencedColumnName: 'ID'})
	manyRelation?: ApplicationRelation

	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_RELATION_ID', referencedColumnName: 'ID'})
	oneRelation?: ApplicationRelation

	@ManyToOne()
	@JoinColumn({name: 'PARENT_RELATION_ID', referencedColumnName: 'ID'})
	parentRelation: ApplicationRelation

}
