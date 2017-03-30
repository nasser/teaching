---
layout: post
title: Midterm Notes

date: 28 Mar 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

## Networked Pong
We wrote a networked version of the classic video game Pong for the midterm and played them in class. The goal of this assignment was to get through writing a Large System from start to finish, and primarily identify when and how that becomes challenging. Which is to say: things were somewhat chaotic, but that is entirely to be expected!

### Theory vs Practice
In *theory*, two applications implementing the same protocol should be able to communicate without coordinating any further. Put another way, you and I should be able to agree on a protocol, go off and write our own apps, and have them talk without looking at each others' code. Indeed, this is how the internet works, where the Google Chrome team does not coordinate with *every website* to make sure that their browser works with every server. Instead, everyone agreed to the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) and tries to implement it correctly so that everything can click together without additional coordination. This is what allows Large Systems to scale to very big sizes and grow organically over time.

In *practice*, however, this is a challenge to accomplish. Especially for new, untested protocols, different people might *interpret* parts of the protocol differently and end up with incompatible apps. Because everything rests on humans *agreeing*, there is no way to "enforce" a protocol.

#### Message Mismatch
In class, some people used the specified `/player/position` and `/ball/position` OSC labels, but others used `/position` or `/ballX`. These apps will not be able to talk to each other, because they are sending and expecting different data. In this case, the app that did not follow the protocol is at fault. Notice that the computer has no way of informing you of this error. Both sides will effectively *ignore* each other silently. We can see why this is from the code:

```js
oscServer.on("message", function (msg, rinfo) {
  if(msg[0] == "/ball/position") {
    ballX = parseFloat(msg[1]);
    ballY = parseFloat(msg[2]);
  } else if(msg[0] == "/player/position") {
    playerX = parseFloat(msg[1]);
    playerY = parseFloat(msg[2]);
  }
});
```

You can read that as:

1. I just got an OSC message (`oscServer.on("message"`)
2. If the messages is labeled "/ball/position" (`if(msg[0] == "/ball/position")`) update my ball variables
3. If the messages is labeled "/player/position" (`if(msg[0] == "/player/position")`) update my player variables
4. **If the message has any other label, do nothing**

The last step is implicit. If your app is receiving OSC messages labeled `/ballX` or `/player`, none of the if branches will fire, and no action will be taken!

### Ambiguous Protocol
An additional challenge to the assignment is the ambiguity of the protocol. The way the ball is handled is not clear, both players seem to have their own local idea of where the ball is and they are expected to send that position to each other, and there is no clear way to reconcile them. Even a technically correct implementation of this protocol would be buggy, because there is a *conceptual* bug in the way it was originally designed. There are better ways a networked pong could work, and part of your homework is to explore that.

### IP/Port Configuration
There was a tedium involved in copying IP addresses and port numbers between machines. This is typical when prototyping, but can become a real headache when growing your projects.

Depending on the situation there are a few ways this can be handled. Ports can almost always be hardcoded. It is not often that you will be generating new port numbers in an app, so picking some numbers between 1024 and 65,536 (the allowable range for port numbers) and just using those is generally OK. Strictly speaking, if another application *happens* to use the same port number on the same machine, you will have a problem (which ever app requests the port second will be denied), but in practice this tends to not happen. As [an example from my own practice](https://github.com/arcadia-unity/Arcadia/blob/develop/Editor/repl-client.javascript#L10), in a project that uses UDP networking for live coding, we do allow people to specify a port number from the command line, but default to a hardcoded number.

For IPs, If you are installing in a local space and can control the router, you can *assign every device its own IP*. Since the IPs will not change, you do not need to copy them around over and over again.

* [OSX Tutorial](http://www.macinstruct.com/node/550)
* [RPi Tutorial](https://www.modmypi.com/blog/how-to-give-your-raspberry-pi-a-static-ip-address-update)

Generally, you have control over the last two numbers in the IP address, and they can be between 0 and 255. No two computers on the same router can share an IP address, so if you're manually assigning them keep that in mind.

If you're talking to a cloud server, the IP will be fixed and this will not be an issue.

### Distinct Apps
The key thing to remember is: every machine in your system is a *distinct* program with its own view of the world, and it is *your job* to keep them synchronized. This additional synchronization work is what makes Large Systems unique among other kinds of creative coding. Sending and receiving OSC messages and using them to update variables is an example of this synchronization, and we will continue to see more.
