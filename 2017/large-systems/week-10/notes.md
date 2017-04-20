---
layout: post
title: Week 10 Notes

date: 18 Apr 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

To store and query information, we looked at *databases* this week.

## Why not files?
This is a good and important question.
In many cases, you actually do not need anything more complicated that files in folders to store your "data".
Databases are often more complex to set up and maintain than plain files, so being mindful of *why* you're using them and what you're gaining
Even databases usually *do* eventually their data to files on the filesystem (you are just shielded from that).
The main reasons to use a database instead of files:

1. Speed — Accessing data from a database can be faster than reading files from disk (databases will store information in memory for quicker retrieval)
2. Querying — Databases allow you to ask complex questions about your data beyond what a filesystem provides with a more convenient interface
3. Scale — Some database systems allow you to scale to enormous sizes and actually span multiple hard drives via the same interface


If you don't care about these use cases, you may not need a database.

### Database Families
There are a few *families* of databases, all of which present different ideas around how to organize and query data. Within each kind family are a number of actual databases you can use in your projects.

#### Relational Databases
**Examples** [MySQL](https://www.mysql.com/), [SQLite](https://www.sqlite.org/), [Postgres](https://www.postgresql.org/)

Also known as RDBMS (Relational Database Management System), or Table databases, this is one of oldest ideas around how to organize data. For many people the word "database" means "relational database" and nothing else. The idea is that you organize data into *tables* with a fixed set of *columns*, and every *row* is a new piece of data. Each column has a descriptive name and specifies what *type* of data it accepts. The decision of what tables to use and what columns they should have is called the *scheme* and it describes the "shape" of the database. For example, a table of friends might have the following schema:

**Friends**

| **name (string)** | **height (int)** | **birthday (date)** |

This specifies that a Friend has a name, which is a string, a height, which is an integer, and a birthday which is a date. Different databases will support different types of data, and *date* as a datatype is quite common.

Populating the database could look like:

| **name (string)** | **height (int)** | **birthday (date)** |
| "Ramsey" | 170 | 04/09 |
| "Billy" | 175 | 06/12 |
| "Sally" | 180 | 01/20 |
| "Ahmad" | 155 | 02/02 |

Some things that are easy to do:
1. Ask the database for every friend above a certain height
1. Ask the database for every friend with the same birthday
1. Guarantee that every friend as a height and birthday
1. Guarantee that every friend's as a height is always an integer

Some things that are hard to do:
1. Add a new column after the fact
1. Insert a friend without a height
1. Insert a friend without a birthday
1. Design a table that relates friends to *multiple data*

Tables are "joined" using [*foreign keys*](https://en.wikipedia.org/wiki/Foreign_key), which are entries in a row that refer to IDs in another table. Sometimes [intermediate tables](https://en.wikipedia.org/wiki/Associative_entity) are used to join two tables.

The language you insert or query data with is called the [Structured Query Language](https://en.wikipedia.org/wiki/SQL). Like everything else in this family, it is quite old and there is a lot of writing available on it. Every different database will implement SQL a little differently, but it is technically standardized.

There is quite a bit more to it, including [mathematical operations](https://en.wikipedia.org/wiki/Database_normalization) you can apply to your tables to make certain guarantees about the structure of your data. Youtube tutorials do a decent job of getting a bit deeper, and I found [this one to be OK](https://www.youtube.com/watch?v=NvrpuBAMddw). Studying how other systems organize their data is also helpful. Here's Wikipedia's schema:

[![](https://upload.wikimedia.org/wikipedia/commons/2/2d/MediaWiki_1.10_database_schema.png)](https://upload.wikimedia.org/wikipedia/commons/2/2d/MediaWiki_1.10_database_schema.png)

And Wordpress's:

[![](http://web-profile.net/wp-content/uploads/wordpress_db_schema.png)](http://web-profile.net/wp-content/uploads/wordpress_db_schema.png)

#### Graph Databases
**Examples** [Neo4j](https://neo4j.com/product/), [datomic](http://www.datomic.com/)

Here, data is represented as [a graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)), with *nodes* and *edges* between them. They are much less mainstream, but suitable for datasets where "connectivity" is important. They're also good at modeling many-to-many relationships, where relational databases might require many intermediate tables.

Neo4j is fairly robust and well supported, and their videos provide a good inroduction to this family

- [Intro to Neo4j](https://www.youtube.com/watch?v=U8ZGVx1NmQg)
- [Neo4j Top Use Cases](https://www.youtube.com/watch?v=lb90EBfAj0o)
- [Building the Wikipedia Knowledge Graph in Neo4j](https://www.youtube.com/watch?v=o6wueyweC34)

#### Document Stores
**Examples** [MongoDB](https://www.mongodb.com/), [DynamoDB](https://aws.amazon.com/dynamodb/)

Data is stored as a collection of *documents*, which can be thought of as JSON documents. They don't have a particular order or relationship to each other, and each document can have its own content, i.e. there usually isn't a schema in place. Document stores are good for data who's structure is unknown and might even change over time, but enforcing rules about data, preventing errors, and optimization becomes harder.

If you're thinking of storing data as a bunch of JSON files in a folder, you might want to consider a document store.

MongoDB has [a free online set of courses](https://university.mongodb.com/) if you want to explore that route, and [Amazon's DynamoDB](https://aws.amazon.com/dynamodb/) is well documented and supported as well.

#### Key-Value Stores
**Examples** [Redis](https://redis.io/), [Riak](http://basho.com/products/#riak), [memcached](https://memcached.org/)

At their simplest, key value stores associate *keys* (names) with *values* and nothing else. That is, you can say "the key `foo` now has the value `bar`" and if you ask the database later "what is the value of `foo`?" it will respond with `bar`.

This simplicity allows for very fast operation, and key-value stores (especially memcached) get used for fast temporary storage. Some databases like Redis offer data structures on top of simple values, meaning your values can be lists and hash maps beyond numbers and strings.

They also tend to be easy to sey up, so for many use cases a simple key-value store is all you actually need. The [try redis](https://try.redis.io/) page is a great way to get a feel for these systems.

### Aesthetics
A common icon for databases you will see around is a sequence of stacked cylinders

![](vIA2c9yUrE7p4RBuuKGMA.png)

This comes from classic high capacity storage hardware that often took the form of memory platters.

![](http://worldpowersystems.com/archives/Ivall/Disk-memory-large-vertical.jpg)

This hardware included technology as old as [drum memory](https://en.wikipedia.org/wiki/Drum_memory), but even as recently as a few years ago computers used [mechanical hard dives](https://en.wikipedia.org/wiki/Hard_disk_drive) with internal magnetic memory platters.

![](https://www.technobuffalo.com/wp-content/uploads/2012/11/HDD-Internals-2-640x424.jpg)
