# Sync loops

## Definition

Syncing consists of a two way conversation between a TM and an AGT:

* TM sends a number of RepositoryTransactionBlocks to be synced with other TMs.

* AGT then syncs them to other TMs and responds back to the sending TM with the
RTBs that other TMs have sent to it.

## Maintenance

To eliminate unnecessary duplication of messages both TM and AGT send back
maintenance messages:

* TM sends back records the RTBs it has received from the AGT

This allows the AGT to stop syncing those RTBs to a TM

* AGT sends back records of RTBs it has received from a TM

This allows a TM to stop transmitting those RTBs to be synced (to the AGT)

### 