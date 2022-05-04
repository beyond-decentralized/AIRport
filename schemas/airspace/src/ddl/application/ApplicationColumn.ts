import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                                from '@airport/air-traffic-control';
import {
	ColumnId,
	ColumnIndex,
	ColumnName,
	ColumnNotNull,
	ColumnPrecision,
	ColumnScale,
	IdColumnOnlyIndex,
	ApplicationColumnAllocationSize,
	ApplicationColumnIsGenerated,
	SQLDataType
}                                from '@airport/ground-control';
import { ApplicationEntity }          from './ApplicationEntity';
import { ApplicationPropertyColumn }  from './ApplicationPropertyColumn';
import { ApplicationRelationColumn }  from './ApplicationRelationColumn';
import { VersionedApplicationObject } from './VersionedApplicationObject';

@Entity()
@Table({
	name: 'APPLICATION_COLUMNS'
})
export class ApplicationColumn
	extends VersionedApplicationObject {

	@DbNumber()
	@Id()
	id: ColumnId;

	/**
	 * Overall column index (within the entity).
	 */
	// FIXME: disallow SQL keywords in names (for columns, etc.), like 'INDEX', etc.
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	index: ColumnIndex;

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({ name: 'ID_INDEX' })
	@DbNumber()
	idIndex?: IdColumnOnlyIndex;

	@Column({ name: 'IS_GENERATED', nullable: false })
	@DbBoolean()
	isGenerated: ApplicationColumnIsGenerated;

	@Column({ name: 'ALLOCATION_SIZE' })
	@DbNumber()
	allocationSize?: ApplicationColumnAllocationSize;

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name: ColumnName;

	@Column({ name: 'NOT_NULL', nullable: false })
	@DbBoolean()
	notNull: ColumnNotNull;

	@Column({ name: 'PRECISION' })
	@DbNumber()
	precision: ColumnPrecision;

	@Column({ name: 'SCALE' })
	@DbNumber()
	scale: ColumnScale;

	@Column({ name: 'TYPE', nullable: false })
	@DbString()
	type: SQLDataType;

	@ManyToOne()
	@JoinColumn({ name: 'APPLICATION_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
	entity: ApplicationEntity;

	@OneToMany({ mappedBy: 'column' })
	propertyColumns: ApplicationPropertyColumn[] = [];

	@OneToMany({ mappedBy: 'manyColumn' })
	manyRelationColumns: ApplicationRelationColumn[] = [];

	@OneToMany({ mappedBy: 'oneColumn' })
	oneRelationColumns: ApplicationRelationColumn[] = [];

}
