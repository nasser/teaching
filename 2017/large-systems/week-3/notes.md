---
layout: post
title: Week 3 Notes

date: 7 Feb 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

We focused on the dotted line this week, or what moves in between systems.

![](../LrUeWwZTpGj0uBBNVUeYqg.png)

Specifically, we focused on the *formatting* of that data. The key realization was that systems can only move *byte* between each other. What those bytes actually *mean* is something that has to be agreed upon before hand. Another way to think of it is that bytes are just numbers between 0 and 255, and all you can do is send a stream of such numbers between systems. That is the dotted line at the most basic level. What those numbers *represent* is what both sides need to agree on. This agreement is what's called a *protocol*.

One way of assigning meaning to bytes is to decide that certain bytes mean certain things. For example, if you are sensing the temperature in five rooms, and you want to design a system to send that information between computers, you could decide that the first byte is the temperature of room 1, the second byte is the temperature of room 2, and so on, such that five bytes is the total size of your packet.

Thinking in terms of bytes is clumsy and confusing, but very efficient as far as computers are concerned. In practice, you will only design byte-protocols when interacting with underpowered hardware like Arduino, but as an example of something we all use, the IP protocol's packets are specified by bytes.

![](../USJMQXGUs0mSWBsJQHifdg.png)

The "total length" is *always* the 3rd and 4th byte. The "source address" is *always* bytes 12-16. Again, this data just shows up as a stream of bytes, and we only know to interpret certain bytes in a certain way (that is, we only know that they *mean* one thing and not another) because we all agreed to this protocol.

In the reliance on agreement is unavoidable in Large Systems. It's the only way to communicate with a system you did not build, and the only way to design a system that can be communicated with by something you did not build. The fact that you can write brand new code that the designers of the internet did not anticipate and still communicate over that same internet is an example of this working. The fact that you can talk to the Twitter API even though they've never seen your code is an example of this working. The fact that everything depends on humans agreeing brings a lot of this into the realm of *diplomacy*. ICANN and IANA came up in class, as did Ted Cruz's asinine "internet give away video" (which I will not link to). An excellent answer to the question of who controls the internet was [published in Fusion](http://fusion.net/story/343533/who-controls-the-internet/) a few months ago and is a good deep read into the diplomacy and politics of the agreements that hold the internet together.

In practice, most modern protocols that we will design and interact with will be "human readable", which means you can look at the bytes directly and they will look like "text". This usually means that the bytes are encoded in [ASCII](https://en.wikipedia.org/wiki/ASCII) and the protocol is designed around English language keywords. Again, this does not change the fact that we're still dealing with bytes, we're just agreeing to interpret the bytes as text, and look for specific patterns of text (words) that will have special meaning. The text encoding section later on gets into this.

HTTP packets have their own ASCII format, and anything designed to interact with HTTP (web browsers and web servers) has to be able to read this format

```
GET /tutorials/other/top-20-mysql-best-practices/ HTTP/1.1
Host: net.tutsplus.com
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
Cookie: PHPSESSID=r2t5uvjq435r4q7ib3vtdjq120
Pragma: no-cache
Cache-Control: no-cache
```

Instead of inventing a new format for every new protocols, most will use an existing *serialization format* that already has wide adoption. We looked at [JSON](https://en.wikipedia.org/wiki/JSON) extensively in class, but alternatives include [XML](https://en.wikipedia.org/wiki/XML), [YAML](https://en.wikipedia.org/wiki/YAML), and others.

Serialization formats specify how to convert between data as it exists in your code (e.g. stored in variable, something your program can interact with) and bytes. Importantly, they do not specify, *what* the data is. You can think of them as containers. Many of them will convert your data into bytes that can be read as text, but many will not ([MessagePack](http://msgpack.org/index.html) and [ProtocolBuffers](https://developers.google.com/protocol-buffers/) for example). Most modern web APIs will support JSON.

### Setting up p5.js

1. Download the complete library from [their site](https://p5js.org/download/)
2. Unzip the file
3. Copy the `empty-example` folder for each new project
4. Edit `sketch.js` to implement your sketch
5. Open `index.html` to view the sketch

This will work for many basic uses, but browser place a lot of restrictions on what a file can do. To get around these restrictions while continuing to work on your own machine, you will have to simulate a web server. There are [many ways to do this](https://gist.github.com/willurd/5720255), and they are largely equivalent. The way we did it in class was via a node.js package called statik.

1. Get [the latest Node.js](https://nodejs.org/en/)
2. Run `npm install -g statik` in your terminal
3. `cd` into the folder you want to start the server in (the folder with `index.html`)
4. Run `statik .` in your terminal
5. Visit [`http://localhost:3000`](http://localhost:3000) in your browser

Alternatively `statik path/to/sketch` will also work, where `path/to/sketch` is the path to your sketch directory. Depending on your machine, you may need to do `sudo install -g statik` in step 2.

### Text Encoding

Modern computers can only communicate in bits (Two possible values, `1` or `0`), and we have settled on calling a group of eight bits a "byte". Given eight bits, where each bit can be one of two possible values, the total number of possible bytes is 2^8 = 255. The way we choose to interpret those values is up to us. It is often helpful to think of them as numbers, such that `01000001` = 65. Computer hardware is designed to interpret bytes this way in order to perform arithmetic.

To turn numbers into text, all we have to do is agree on which number means which letter. Historically, there have been many agreements like this, but the most lasting one is the [American Standard Code for Information Interchange, or ASCII](https://en.wikipedia.org/wiki/ASCII).

![](../iRkl1ZRf9pQdChdGAjNtPA.png)

ASCII assigned certain numbers between 32 and 127 to letters and punctuation. Numbers below 32 were used as "control codes" and are not relevant on modern computers. I want to stress that the way bytes "turn into" text is by wide agreement that bytes represent numbers, and that certain numbers represent certain letters. Nothing actually happens to the bytes to "transform" them into text. The only thing that changes is our perception of the bytes.

A lot of technology became standardized on ASCII for a variety of reasons, to the point that "text" has become synonymous with ASCII. Notably absent from that chart, of course, is every writing system on the planet that is not Latin. This has presented a hurdle to non-Latin cultures participating on the internet and is a big part of my personal research. In the past two decades an alternative to ASCII, [Unicode](https://en.wikipedia.org/wiki/Unicode), has gained wide adoption. Unicode aims to encode every written language on the planet in one encoding. One Unicode encoding called [UTF-8](https://en.wikipedia.org/wiki/UTF-8) was cleverly designed so that the encoding of Latin characters is *identical* to ASCII, so that a lot of systems did not have to be changed to work with Unicode.

### Misc
This is a diagram of how the different layers of the internet "wrap" each other. Physically, they just add additional bytes to the start of a packet from a lower layer, but we think of them conceptually as wrapping each other.

![](../9i9pFdqNGXhOgFZ4n9cQ.png)

### Links
* [Minitel](https://en.wikipedia.org/wiki/Minitel)
* [The JSON Specification](http://www.json.org/)
* [MessagePack](http://msgpack.org/index.html)
