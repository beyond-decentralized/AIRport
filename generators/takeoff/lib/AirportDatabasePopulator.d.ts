import { IAirportDatabase } from '@airport/air-control';
export interface IAirportDatabasePopulator {
    populate(): void;
}
export declare class AirportDatabasePopulator implements IAirportDatabasePopulator {
    private airportDatabase;
    constructor(airportDatabase: IAirportDatabase);
    populate(): void;
}
