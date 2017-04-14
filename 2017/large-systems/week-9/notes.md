---
layout: post
title: Week 9 Notes

date: 1 Apr 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

## 💻 🔌 ⌁ 🔌 💻
This week we focused on using HTTP for real time communication. The web was [originally](https://www.w3.org/History/1989/proposal.html) designed to move *documents* over the internet, and still does so today. These origins as a document protocol cause HTTP to be

1. **Stateless** — different requests are not automatically connected, and information from one request is not carried over into subsequent requests
2. **Document Oriented** — Each resource is requested separately. HTTP does not "stream" information normally.
3. **Client-Initiated** — Clients (browsers) can request data and receive a response, but servers cannot independently send data to a Client if it has not asked for it

Modern features like streaming video, and automatically updating webpages are hacked on top of this document protocol, but it is always there beneath everything.

### Forms
We looked at form-based interactivity that was available very early on. If you want to take this approach, you will need the  [`bodyparser`](https://github.com/expressjs/body-parser) library in addition to `express`. It is not without headaches, though, and there are some [potential security issues](http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html) with it, so I would recommend using the realtime approach (below) even for things that are not strictly speaking realtime, if you can.

### Hacks
Historically, to create the illusion of realtime communication between a client and a browser, a couple of hacks were used. You could write JavaScript on your client to request data from the server in the *background* without refreshing the page. This came to be called [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) and was hugely popular. It made early modern web applications like GMail possible. By emitting an AJAX request every few milliseconds, you can simulate realtime communication. Some sites even had an invisible *Flash* plugin just to do realtime communication!

### WebSockets
To address the limitations of a document-oriented protocol, the [`WebSocket`](https://en.wikipedia.org/wiki/WebSocket) protocol was introduced. It is a true two-way communication protocol running over TCP designed for browsers. It has its own API that can be used directly.

### Socket.io
The problem with WebSockets is a general problem with cutting edge browser technology: you can't know if someone's browser supports it ahead of time. A user on an old phone or computer might have a browser that does not support WebSockets, and your experience would not work for them.

[socket.io](http://socket.io/) solves this by checking, and using WebSockets if available, but *falling back to one of the hacks* otherwise. The interface to you as a programmer is the same, so you do not have to worry about it, but your experience will work on more devices.

#### Events
socket.io is based around *events*. Like OSC, you can create named events with associated data, and send them to a listening server or client. Its how parts of your network can tell other parts "hey, something happened, and here's a description". The name of the event is up to you and reflects the semantics of your network.

In our controllers demo, the only event we tracked was `button-pressed`, with the associated of *which* button was pressed during that event. [`socket.emit`](https://socket.io/docs/client-api/#socket-emit-eventname-args-ack) will send an event across the network

```js
function sendPress(direction) {
  socket.emit("button-pressed", direction);
}
```

On the server, we react an incoming connection by attaching a handler for the `"button-pressed"` message with [`socket.on`](https://socket.io/docs/server-api/#socket-on-eventname-callback)

```js
io.on('connection', function(socket) {
  console.log('a user connected ' + socket.id);

  socket.on("button-pressed", function(data) {
    console.log("player " + socket.id + " pressed " + data);
    // ...
  })
});
```

We mentioned that `emit` appears in code like a normal function call, you know exactly when your own code is going to generate an event. Receiving is different, however. You never know when a packet is going to arrive, so the best we can do is *schedule* a function to run if a `"button-pressed"` event ever arrives.

socket.io is powerful in that emitting and receiving are both possible on clients and servers at any time. The server has an [`emit`](https://socket.io/docs/server-api/#socket-emit-eventname-args-ack), and the client has an [`on`](https://socket.io/docs/client-api/#socket-on-eventname-callback) function.
