---
layout: post
title: Week 4 Notes

date: 14 Feb 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

We started looking at *web APIs* as an introduction to a kind of large system you might find yourself interacting a lot with. Web APIs use [the web](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) to communicate *requests* from *clients* (usually machines that humans use, like laptops or phones) and *responses* from *servers* (usually machines in data centers). By reusing the Web (which was originally designed for documents and webpages) as a communication medium, these APIs are useable without a lot of new technology. Many of them go even further and use JSON or XML as standard serialization formats, so there is even less new technology required. The result is a large collection of new services that are useable by most programming languages and tools out of the box.

#### RESTful design
The APIs we are interacting are an instance of [*REpresentational State Transfer* or REST](https://en.wikipedia.org/wiki/Representational_state_transfer) applies to [web services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_Web_services). REST is a result of [Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding)' PhD work in 2000, and is in some ways a reflection of HTTP itself (which Fielding was also involved with). The [architectural constraints](https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints) are worth a read, as is [his thesis](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) if you want a *really* deep dive.

Let's look at a raw request as an example. This is what I get in Wireshark after visiting `http://api.openweathermap.org/data/2.5/weather?q=New%20York&APPID=7bbbb47522848e8b9c26ba35c226c734`.

```
GET /data/2.5/weather?q=New%20York&APPID=7bbbb47522848e8b9c26ba35c226c734 HTTP/1.1
Host: api.openweathermap.org
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US,en;q=0.8,ar;q=0.6
Cookie: __utma=124807636.237961739.1486492833.1487113174.1487123500.4; __utmz=124807636.1487113174.3.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)
```

Part of the way HTTP works is that every request looks like this, so web APIs will be no different because they operate on the web. The first line in the packet can be broken into three parts: the "verb" (`GET`) the "noun" (`/data/2.5/weather?q=New%20York&APPID=7bbbb47522848e8b9c26ba35c226c734`) and the HTTP version (`HTTP/1.1`). The rest of the packet are standard HTTP fields and are less important to this discussion.

The noun specifies what we're talking about, in this case `/data/2.5/weather` with some extra data. The verb specifies what we want to do with that thing, in this case we want to `GET` it, just read data. When you visit a webpage or use a function like `loadJSON`, a `GET` request similar to this one is generated and sent over the network for you.

The core idea behind REST, and many APIs you will see, is the following:

1. There are a standard and limited number of ["verbs"](http://www.restapitutorial.com/lessons/httpmethods.html). No one can add or create new ones, and this places (intentional) limits on what a client can ask for. Some services support other verbs including POST and DELETE allow clients to upload new information or remove information.
2. There is an *unlimited* number of nouns. A service can make up any number of URLs that it wants to support its features. For example, we saw both `/maps/api/directions/json` and `/maps/api/streetview` on Google's API. They support two different *nouns* (i.e. we ask about JSON formatted directions *or* streetview images) but the number of *verbs* we can use to interact with them is limited to the ones listed above.

Many libraries will make this more or less transparent to you, but this is what is always happening under the hood.

#### Alternatives
RESTful design is by no means perfect. There are [criticisms of it](http://mikeschinkel.com/blog/why-rest-is-more-like-religion-than-most-technologies/), debates on how to [best apply the technique](http://www.w2lessons.com/2011/05/why-and-how-you-should-write-rest.html), some cool kids [don't even call it REST anymore](http://blog.steveklabnik.com/posts/2012-02-23-rest-is-over) and alternatives are being explored. They're out of scope for this class, but I wanted to expose you to them in case you were curious as to what an alternative might look like.

1. Facebook's [GraphQL](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html?utm_source=tuicool) (the introduction specifically has a REST critique)
2. Netflix's [Falcor](https://netflix.github.io/falcor/)

#### Time
We've begun to encounter the difficulty of *time*, and the fact that certain functions return useful values well after they've been called. Code that runs with predictable timing, or code where the text of your program describes the order that things happen in is called *synchronous* code. Code where things can happen out of order is called *asynchronous* code. Remember that the strategy is to avoid waiting for every network communication to finish, otherwise any user experience you're working on will suffer from long pauses. Instead, we have to accept the fact that we have to think about our code's relationship with time differently. We will spend this whole semester dealing with this, so if its confusing right now don't worry! The three basic strategies are:

1. Try and force asynchronous to be synchronous. This usually involves pausing for some time, and can be the simplest thing to do if the pause is OK. When we use `preload` in p5, we're doing this (waiting until everything has loaded before we start the sketch)
2. Use a *callback*. We can start a process of unknowable time and schedule some code (a "callback") to run when it finishes. Meanwhile, the rest of our program continues to run without pausing. When we pass a second argument to `loadJSON` we are doing this.
3. Use *promises*. We can start a process of unknowable time and receive a placeholder object that we are "promised" will turn into the real data eventually. The rest of our code can run without pausing and check on the placeholder to see if its done periodically. When we use the value returned by `loadJSON` we are doing this.
