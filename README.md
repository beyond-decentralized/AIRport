# ![AIRport - Decentralized Relational Platform](/AIRport_logo_2x1.png)

## Description <a name="description"></a>
AIRport allows Distributed Applications to interoperate by providing an API
framework on top of a relational database. Data is stored in virual
Repositories with one Transaction Log per repository.

More documentation can be found at [Beyond Decentralized](https://beyond-decentralized.world/documentation.html).

## How it works

*  User navigates to a web page and saves/retrieves data.
*  A new tab is opened in the background with AIRport framework in it
*  AIRport contacts Transaction Log data hosts (Ex: IPFS), retrieves data,
puts into in-memory SqLite database, queries it, makes modifications to it,
writes the Transaction Log entries back to data hosts.
*  Access to database is allowed only from App logic that runs in
 domain-sanboxed IFrames (inside AIRport tab).

## Build instructions

If something isn't building and it really should, run 'rush update'

Check out [AIRroot](https://github.com/beyond-decentralized/AIRroot) for framework build instructions.

## Entity Definitions

```typescript
@Entity()
export class Parent extends AirEntity {

    value: string;

    total: number;

    @OneToMany({mappedBy: 'parent'})
    children: Child[];
}

@Entity()
export class Child extends AirEntity {

    value: string;

    @ManyToOne()
    parent: Parent;
}
```

## Queries

Apps can define entities which depend on entities in other
Apps, via @ManyToOne() relations.  Apps can build joins that include 
entities from other Apps.

## Data Access Objects (DAOs)

```typescript
@Injected()
export class ParentDao 
       extends BaseParentDao {

    async findById(
      parentUuId: string
    ): Promise<Parent> {
      let p: QParent,
          c: QChild
      return await this._findOne({
        SELECT: {
          '*': Y,
      	  children: {}
        },
        FROM: [
          p = this.qSchema.Parent,
          c  = p.children.LEFT_JOIN()
        ],
        WHERE: p.equals(parentUuId)
      })
    }

    async updateInPlace(
        parent: Parent
    ): Promise<void> {
        const p: QParent
        await this._updateWhere({
            UPDATE: p = this.qSchema.Parent,
            SET: {
                total: PLUS(p.total, 1)
            },
            WHERE: p.equals(parent)
        })
    }

}
```

## APIs

Public API methods are annotated with @Api() decorator.  Apps can
invoke @Api() methods of other Apps.  Apps can join across
application schemas but must call APIs of other Apps to modify
their data.   


```typescript
@Injected()
export class ParentApi {

    @Inject()
    parentDao: ParentDao

    @Api()
    async save(
      parent: Parent
    ): Promise<void> {
      await this.parentDao.save(parent)
    }

    @Api()
    async findById(
      parentUuId: string
    ): Promise<Parent> {
      return await this.parentDao.findById(parentUuId)
    }

}
```

## Directory Structure

[ORMs](/ORMs)
Object Relational Mapping frameworks.

[apis](/apis)
Internal and external APIs.

[databases](/databases)
Database adapters.

[engines](/engines)
Core Logic of AIRport.

[generators](/generators)
Code generators.

[libs](/libs)
Libraries.

[platforms](/platforms)
Platform adaptors for Web and Native.

[schemas](/schemas)
Internal AIRport schemas.

## Latest
Find out about the latest developments at the [Beyond Decentralized blog](https://beyond-decentralized.world/blog.html)

## License
AIRport is distributed under the terms of both the MIT license and the Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE-APACHE), [LICENSE-MIT](LICENSE-MIT)
