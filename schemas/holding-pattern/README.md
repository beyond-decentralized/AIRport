# Holding Pattern

## Why the name 

"A path taken by an aircraft waiting to land."

@airport/holding-pattern stores repository history data and metadata.
This is how AIRport holds data in transaction logs.

## Description

Contains:

Actor   -   A User, using a specific Client, that performs operations via
a specific Application at a specific Terminal 

Repository  - unit of data in AIRport
    *   member/RepositoryMember
    *   member/RepositoryMemberAcceptance
    *   member/RepositoryMemberInvitation
    *   member/RepositoryMemberUpdate
    *   RepositoryApplication
    *   RepositoryClient
    *   RepositoryDatabase
    *   RepositoryReference
    *   RepositoryTerminal
    *   RepositoryType

History:

To be used by device local analytics and data processing.  Specifically the
"privacy-first" Turbase advertisement engine.


TransactionHistory =>   Transaction log entry, possibly across repositories
    *   RepositoryTransactionHistory =>
        *   OperationHistory =>
            *   RecordHistory =>
                *   RecordHistoryNewValue
                *   RecordHistoryOldValue

