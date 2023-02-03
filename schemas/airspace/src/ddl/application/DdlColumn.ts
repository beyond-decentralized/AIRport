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
	Table,
	Transient
} from '@airport/tarmaq-entity';
import {
	DbColumn_LocalId,
	DbColumn_Index,
	DbColumn_Name,
	DbColumn_NotNull,
	DbColumn_Precision,
	DbColumn_Scale,
	DbColumn_IdIndex,
	DbColumn_AllocationSize,
	DbColumn_IsGenerated,
	SQLDataType,
	DbPropertyColumn,
	DbColumn
} from '@airport/ground-control';
import { DdlEntity } from './DdlEntity';
import { DdlPropertyColumn } from './DdlPropertyColumn';
import { DdlRelationColumn } from './DdlRelationColumn';
import { DdlVersionedObject } from './DdlVersionedObject';

@Entity()
@Table({
	name: 'DB_COLUMNS'
})
export class DdlColumn
	extends DdlVersionedObject
	implements DbColumn {

	@DbNumber()
	@Id()
	@Column({ name: 'DB_COLUMN_LID' })
	_localId: DbColumn_LocalId;

	/**
	 * Overall column index (within the entity).
	 */
	// FIXME: disallow SQL keywords in names (for columns, etc.), like 'INDEX', etc.
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	index: DbColumn_Index;

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({ name: 'ID_INDEX' })
	@DbNumber()
	idIndex?: DbColumn_IdIndex;

	@Column({ name: 'IS_GENERATED', nullable: false })
	@DbBoolean()
	isGenerated: DbColumn_IsGenerated;

	@Column({ name: 'ALLOCATION_SIZE' })
	@DbNumber()
	allocationSize?: DbColumn_AllocationSize;

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name: DbColumn_Name;

	@Column({ name: 'NOT_NULL', nullable: false })
	@DbBoolean()
	notNull: DbColumn_NotNull;

	@Column({ name: 'PRECISION' })
	@DbNumber()
	precision?: DbColumn_Precision;

	@Column({ name: 'SCALE' })
	@DbNumber()
	scale?: DbColumn_Scale;

	@Column({ name: 'TYPE', nullable: false })
	@DbString()
	type: SQLDataType;

	@ManyToOne()
	@JoinColumn({
		name: 'DB_ENTITY_LID',
		referencedColumnName: 'DB_ENTITY_LID', nullable: false
	})
	entity: DdlEntity;

	@OneToMany({ mappedBy: 'column' })
	propertyColumns: DdlPropertyColumn[] = [];

	@OneToMany({ mappedBy: 'manyColumn' })
	manyRelationColumns?: DdlRelationColumn[] = [];

	@OneToMany({ mappedBy: 'oneColumn' })
	oneRelationColumns?: DdlRelationColumn[] = [];

	@Transient()
	propertyColumnMap?: { [propertyIndex: number]: DbPropertyColumn } = {}

}
