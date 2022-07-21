# AIRport - beyond decentralized data.

![AIRport - winged DApps](/presentations/images/logo/AIRPort_logo_with_slogan_1.0.png)

* [Description](#description)
  * [The Problem](#problem)
  * [The Solution](#solution)
* [Blockchain](#blockchain)
* [Storage](#storage)
* [Access Control](#access-control)
* [Data Reuse](#data-reuse)
* [Developer Experience](#developer-experience)
* [Technical Details](#tech-details)

## Description <a name="description"></a>
AIRport allows Decentralized Applications to interoperate by providing a relational
database and an API framework, backed by transaction log storage.

More documentation can be found "[here](https://beyond-decentralized.world/)".

## Technical details<a name="tech-details"></a>

### How it works

*  User navigates to a web page and saves/retrieves data.
*  A new tab is opened in the background with AIRport framework in it
*  AIRport contacts Transaction Log data hosts (Ex: IPFS), retrieves data,
puts into in-memory SqLite database, queries it, makes modifications to it,
writes the Transaction Log entries back to data hosts.
*  Access to database is allowed only from App logic that runs in
 domain-sanboxed IFrames (inside AIRport tab).



### Entity Definitions

```typescript
@Entity()
export class Parent extends AirEntity {

    value: string;

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

### Queries

Apps can define entities which depend on entities in other
Apps, via @ManyToOne() relations.  Apps can build joins that include 
entities from other Apps.

### Data Access Objects (DAOs)

```typescript
@Injected()
export class ParentDao 
       extends BaseParentDao {

    async findById(
      parentUuId: string
    ) {
      let p: QParent,
          c: QChild
      return await this._find({
        select: {
          '*': Y,
      	  children: {}
        },
        from: [
          p = Q.Parent,
          c  = p.children.leftJoin()
        ],
        where: p.equals(parentUuId)
      })
    }

    async updateInPlace(
        parent: Parent
    ): Promise<void> {
        const p: QParent
        await this._updateWhere({
            update: p = Q.Parent,
            set: {
                total: plus(p.total, 1)
            },
            where: p.equals(parent)
        })
    }

}
```

### APIs

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
    ) {
      await this.parentDao.save(parent)
    }

    @Api()
    async findById(
      parentUuId: string
    ) {
      return await this.parentDao.findById(parentUuId)
    }

}
```

## Directory Structure

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

[ORMs](/ORMs)
Object Relational Mapping frameworks.

[platforms](/platforms)
Platform adaptors for Web and Native.

[schemas](/schemas)
Internal AIRport schemas.

## Latest
Find out about the latest developments at the [AIRport blog](https://beyond-decentralized.world/blog.html)

## License
AIRport is distributed under the terms of both the MIT license and the Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE-APACHE), [LICENSE-MIT](LICENSE-MIT)
