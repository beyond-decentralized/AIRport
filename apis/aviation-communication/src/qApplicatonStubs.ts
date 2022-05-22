export const airApi = {
    setQApplication: function (
        qApplication: QApplication
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

export interface QApplication {
    __dbApplication__?
    domain: string;
    name: string;

    [name: string]: any;
}