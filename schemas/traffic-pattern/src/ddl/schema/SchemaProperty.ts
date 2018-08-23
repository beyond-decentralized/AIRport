import {
	Column,
	Entity,
	Id,
	JoinColumns,
	ManyToOne,
	OneToMany,
	Table
}                              from '@airport/air-control';
import {
	CascadeType,
	PropertyName
} from '@airport/ground-control'
import {ISchemaEntity}         from "../../generated/schema/qschemaentity";
import {ISchemaProperty}       from "../../generated/schema/qschemaproperty";
import {ISchemaPropertyColumn} from "../../generated/schema/qschemapropertycolumn";
import {ISchemaRelation}       from "../../generated/schema/qschemarelation";

@Entity()
@Table({
	name: "SCHEMA_PROPERTIES"
})
export class SchemaProperty
	implements ISchemaProperty {

	@Id()
	index: number;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	])
	entity: ISchemaEntity;

	name: PropertyName;

	@Column({name: "IS_ID"})
	isId: boolean;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	propertyColumns: ISchemaPropertyColumn[];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	relation: ISchemaRelation[];

}