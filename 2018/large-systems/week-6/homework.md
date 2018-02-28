---
layout: page
title: Starting a chat application

date: 27 Feb 2018
school: parsons
class: large systems
semester: spring
year: 2018
---

**Due** 6 Mar 2018

Using the [code from class](https://gist.github.com/nasser/71fa7bee711278954ba37634ee79d3b6), build a working UDP chat client.

The plan is to:

1. Accept input from the user
2. Send that input to another app using UDP
3. Display that input in the other app

Remember that `chat.js` was our script that accepted user input, `client.js` was our script that send data over UDP, and `server.js` was our script that received data over UDP and displayed it.

Try and break the problem into steps

1. Integrate `client.js` into `chat.js` to make it so you can type whatever message you want and send it to a running `server.js` app
2. Make it so you can keep sending messages to the server without restarting the app
3. Integrate `server.js` so you can send and receive from the same app

### Note about ports

We will discuss ports next week, but keep this in mind for the assignment, only one program can *listen* on a port at any given time on one machine. To make this chat work on the same machine, each program will have to *listen* on a different port. So, if you have two programs Program A and Program B, Program A can listen on port 3333 and Program B can listen on 4444. In order to communicate, they need to send messaged to *each other's ports*. So, Program A needs to send to port 4444 (Program B's listening port) and Program B needs to send to port 3333 (Program A's listening port).

You can do this by writing two different `.js` files if you like, one for Program A and one for Program B, that has different ports. You will need a new variable to differentiate between listening port and sending port.
