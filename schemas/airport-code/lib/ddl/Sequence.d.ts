import { ApplicationColumn_Index, Application_Index, ApplicationEntity_TableIndex } from '@airport/ground-control';
export declare type SequenceIncrementBy = number;
export declare type SequenceCurrentValue = number;
export declare class Sequence {
    applicationIndex: Application_Index;
    tableIndex: ApplicationEntity_TableIndex;
    columnIndex: ApplicationColumn_Index;
    incrementBy: SequenceIncrementBy;
    currentValue: SequenceCurrentValue;
}
//# sourceMappingURL=Sequence.d.ts.map