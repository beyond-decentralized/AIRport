export declare const airApi: {
    setQApplication: (qApplication: QApplication) => void;
    dS: (__dbApplication__: any, dbEntityId: number) => boolean;
    ddS: (__dbApplication__: any, dbEntityId: number) => boolean;
};
export interface QApplication {
    __dbApplication__?: any;
    domain: string;
    name: string;
    [name: string]: any;
}
//# sourceMappingURL=qApplicatonStubs.d.ts.map