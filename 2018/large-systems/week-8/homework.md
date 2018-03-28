---
layout: page
title: Midterm – Networked Painting

date: 13 Mar 2018
school: parsons
class: large systems
semester: spring
year: 2018
---

**Due** 27 Mar 2018

Build a collaborative painting app that allows you to paint on a canvas with another person over the network.

### The Application

Your app will need

1. Some way of specifying the remote host, remote port, and local port. You can do this on the command line, or you can create an interface for it if you like.
2. To allow the *local user* to paint on the canvas
3. To allow the *local user* to choose a color for their paint
4. To display the *remote user's* painting using their color on the canvas in real time

You may work in groups if you like, and you may use whatever platform you want as long as it can communicate over OSC and fulfill the above list. I will be providing examples in node and Electron.

I recommend the following approach:

1. Get a working painting program in p5. The only inputs you need to worry about are `mouseX` and `mouseY`, and however you decide to allow the user to pick their color. You can draw the user's paint however you like. It can be as simple as drawing circles or lines whenever the user moves the mouse [as in this example](https://alpha.editor.p5js.org/nasser/sketches/ByI-4YtFf), or as intricate as you like. 
2. Implement it in Electron, as we [did in class](https://github.com/nasser/electron-p5).
3. Add OSC networking code to it, as we [did in class](https://gist.github.com/nasser/c30587731865f7f8796eb555ca98e37c).

### The Protocol

Applications will communicate over OSC. Your application *must* conform to this protocol so that it can work with other groups' applications. Each message has a *label* (OSC calls this the "address" of the message) and a *value* (for example `/brush-x` `number` means the message label *must* be `brush-x` and the value you provide it can be any number).

The following messages are allowed:

* `/brush-x` `number`
  * an application should send this message when their *local user* moves their paintbrush horizontally
  * when an application receives this message they should update their *remote user*'s paintbrush and draw for them
* `/brush-y` `number`
  * an application should send this message when their *local user* moves their paintbrush vertically
  * when an application receives this message they should update their *remote user*'s paintbrush and draw for them
* `/color` `string`
  * an application should send this message when their *local user* changes their color
  * when an application receives this message they should update their *remote user*'s paint color and use that color going forward
