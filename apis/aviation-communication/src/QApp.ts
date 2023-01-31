export const airApi = {
    setQApp: function (
        qApplication: QApp
    ) { },
    dS: function (
        __dbDbApplication__,
        dbEntityId: number
    ): boolean { return true },
    ddS: function (
        __dbDbApplication__,
        dbEntityId: number
    ): boolean { return true }
}

export interface QApp {
    __dbDbApplication__?
    domain: string;
    name: string;

    [name: string]: any;
}

export function loadGlobalAirApi() {
    globalThis.airApi = airApi
}