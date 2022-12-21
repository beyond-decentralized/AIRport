export const airApi = {
    setQApp: function (
        qApplication: QApp
    ) { },
    dS: function (
        __dbApplication__,
        dbEntityId: number
    ): boolean { return true },
    ddS: function (
        __dbApplication__,
        dbEntityId: number
    ): boolean { return true }
}
globalThis.airApi = airApi

export interface QApp {
    __dbApplication__?
    domain: string;
    name: string;

    [name: string]: any;
}