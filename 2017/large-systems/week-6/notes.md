---
layout: post
title: Week 6 Notes

date: 7 Mar 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

## Local Networks

We started looking at *local networks* this week. These are networks that do not leave the local router or group of routers. While similar to connecting to the internet, the fact that everything is local has important properties, primarily that you can *control* everything as opposed to talking to a web api that is out of your hands.

My advice to you when running installations is to bring your own router to control as much of the network as possible. This will make debugging easier. I will be bringing my own router to class when we need it for exactly this purpose.

## Beyond The Web

We also started looking at non-web protocols. Recall that the web (HTTP) is an *application layer* protocol built on TCP, and when we use web APIs we are constructing HTTP requests and consuming HTTP responses to interact with a service we're interested in. We looked at the *transport* layer protocols, which simply move *bytes* from machine to machine and do not constrain or specify how those bytes should be formatted. They are largely fixed due to the fact that they have to be implemented by the operating system. In practice, you will tend to pick a transport layer protocol to build on as opposed to thinking of a new one for yourself. Historically, there have been a few options here (including [IPX](https://en.wikipedia.org/wiki/IPX/SPX) mentioned in class), but today only two remain: UDP and TCP.

### User Datagram Protocol (UDP)
[UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) is a simple, connectionless, unreliable protocol. It is connectionless in that you do not establish and maintain a connection between machines in order to communicate. This keeps it simple. It is unreliable in that no guarantee is made that your messages will arrive, and if they do arrive, no guarantee is made that they will arrive in order. The tradeoff is that there is less overhead to communicate with UDP than there is with TCP. It gets used in situations where a few missing packages are acceptable and there is a high volume of traffic.

### Transmission Control Protocol (TCP)
[TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) is a connection-oriented, reliable protocol. You establish and maintain a connection between two machines in order to communicate, and TCP does the work of guaranteeing that *all* your messages arrive in the order they were sent. This involves numbering every message, sending extra messages back and forth behind the scenes to confirm that every message has made it through, and retransmitting messages if needed. The tradeoff is that TCP is a "noisier" or "chattier" protocol — there is more data going back and forth in addition to your messages, which can make it undesirable in some cases.

### Open Sound Control (OSC)
[OSC](https://en.wikipedia.org/wiki/Open_Sound_Control) was originally built to coordinate digital musical instruments and replace MIDI. It is technically an application layer protocol built on UDP, but using it is a lot like using UDP directly. The difference is that OSC supports more than raw bytes. It can assign labels to messages, and move strings, numbers, or one of a few other datatypes. This extra level of sophistication is very convenient, but on the other hand OSC makes very few assumptions about what your network is actually doing. This is a nice middle ground to build local networked systems on.
