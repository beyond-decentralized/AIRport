export interface IAirportDatabasePopulator {
    populate(): void;
}
export declare class AirportDatabasePopulator implements IAirportDatabasePopulator {
    private airDb;
    constructor();
    populate(): void;
}
