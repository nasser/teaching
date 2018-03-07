---
layout: page
title: Starting an (OSC) chat application

date: 6 Mar 2018
school: parsons
class: large systems
semester: spring
year: 2018
---

**Due** 13 Mar 2018

### Test the UDP chat app

I [fixed the bug](https://gist.github.com/nasser/395510e906192f8ba27c078d7ed95f37) in the chat application from class. I totally messed up: we needed to listen on IP "0.0.0.0" which is a special address that means "listen for all incoming messages". Listening on "127.0.0.1" means we only get messages *coming from* "127.0.0.1", which is why it worked locally but not on the network. Download it and try it out across multiple computers if you can!

### Make an OSC chat app

Next week we're going to look at [OSC](https://en.wikipedia.org/wiki/Open_Sound_Control). OSC is a protocol that sits on top of UDP and TCP and can be much more convenient to use. It is supported by just about every programming language through libraries.

To get your feet wet with OSC, translate the chat application to work over OSC instead of UDP.

1. Create a new folder for the project
2. In your terminal, `cd` into that new folder
3. Install [`node-osc`](https://github.com/MylesBorins/node-osc) using npm by running: `npm install node-osc`
4. Follow their examples for sending and receiving messages to confirm that it works locally
5. Convert the chat app to use OSC instead of UDP, test locally
6. Test the chat app across multiple machines if you can
