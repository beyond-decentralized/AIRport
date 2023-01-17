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
	ApplicationColumn_LocalId,
	ApplicationColumn_Index,
	ApplicationColumn_Name,
	ApplicationColumn_NotNull,
	ApplicationColumn_Precision,
	ApplicationColumn_Scale,
	ApplicationColumn_IdIndex,
	ApplicationColumn_AllocationSize,
	ApplicationColumn_IsGenerated,
	SQLDataType
} from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn';
import { ApplicationRelationColumn } from './ApplicationRelationColumn';
import { VersionedApplicationObject } from './VersionedApplicationObject';
import { IApplicationPropertyColumn } from '../../generated/interfaces';

@Entity()
@Table({
	name: 'APPLICATION_COLUMNS'
})
export class ApplicationColumn
	extends VersionedApplicationObject {

	@DbNumber()
	@Id()
	@Column({ name: 'APPLICATION_COLUMN_LID' })
	_localId: ApplicationColumn_LocalId;

	/**
	 * Overall column index (within the entity).
	 */
	// FIXME: disallow SQL keywords in names (for columns, etc.), like 'INDEX', etc.
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	index?: ApplicationColumn_Index;

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({ name: 'ID_INDEX' })
	@DbNumber()
	idIndex?: ApplicationColumn_IdIndex;

	@Column({ name: 'IS_GENERATED', nullable: false })
	@DbBoolean()
	isGenerated?: ApplicationColumn_IsGenerated;

	@Column({ name: 'ALLOCATION_SIZE' })
	@DbNumber()
	allocationSize?: ApplicationColumn_AllocationSize;

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name?: ApplicationColumn_Name;

	@Column({ name: 'NOT_NULL', nullable: false })
	@DbBoolean()
	notNull?: ApplicationColumn_NotNull;

	@Column({ name: 'PRECISION' })
	@DbNumber()
	precision?: ApplicationColumn_Precision;

	@Column({ name: 'SCALE' })
	@DbNumber()
	scale?: ApplicationColumn_Scale;

	@Column({ name: 'TYPE', nullable: false })
	@DbString()
	type?: SQLDataType;

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_ENTITY_LID',
		referencedColumnName: 'APPLICATION_ENTITY_LID', nullable: false
	})
	entity?: ApplicationEntity;

	@OneToMany({ mappedBy: 'column' })
	propertyColumns?: ApplicationPropertyColumn[] = [];

	@OneToMany({ mappedBy: 'manyColumn' })
	manyRelationColumns?: ApplicationRelationColumn[] = [];

	@OneToMany({ mappedBy: 'oneColumn' })
	oneRelationColumns?: ApplicationRelationColumn[] = [];

	@Transient()
	propertyColumnMap?: { [propertyIndex: number]: IApplicationPropertyColumn } = {}

}
