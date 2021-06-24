import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	Table
} from '@airport/air-control';

export type Address_Id = number;
export type Address_Longitude = string;
export type Address_Latitude = string;
export type Address_StreetNumber = string;
export type Address_Street = string;
export type Address_Town = string;
export type Address_Region = string;
export type Address_Country = string;
export type Address_PostalCode = string;

@Entity()
@Table({ name: 'ADDRESSES' })
export class Address {

	@GeneratedValue()
	@Id()
	@Column({ name: 'ADDRESS_ID' })
	id: number;

	@Column({ name: 'LATITUDE' })
	latitude: string;

	@Column({ name: 'LONGITUDE' })
	longitude: string;

	@Column({ name: 'STREET_NUMBER' })
	streetNumber: string;

	@Column({ name: 'STREET' })
	street: string;

	@Column({ name: 'TOWN' })
	town: string;

	@Column({ name: 'REGION' })
	region: string;

	@Column({ name: 'COUNTRY' })
	country: string;

	@Column({ name: 'POSTAL_CODE' })
	postalCode: string;
}