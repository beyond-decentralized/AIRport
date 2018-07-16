import {Column, DbString, Entity, Id, Table} from "@airport/air-control";

export type TuningParametersParameterGroup = string;
export type TuningParametersParameterName = string;
export type TuningParametersParameterValue = string;
export type TuningParametersServerType = string;

@Entity()
@Table({name: "AGT_TUNING_PARAMETERS"})
export class TuningParameters {

	@Id()
	@Column({name: "SERVER_TYPE"})
	@DbString()
	serverType: TuningParametersServerType;

	@Id()
	@Column({name: "PARAMETER_GROUP"})
	@DbString()
	parameterGroup: TuningParametersParameterGroup;

	@Id()
	@Column({name: "PARAMETER_NAME"})
	@DbString()
	parameterName: TuningParametersParameterName;

	@Column({name: "PARAMETER_VALUE"})
	@DbString()
	parameterValue: TuningParametersParameterValue;

}