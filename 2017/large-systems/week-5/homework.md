---
layout: post
title: JavaScript

date: 21 Feb 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

**Due** 7 Mar 2017

## Visualization
Use the additional JavaScript work we did in class to approach [last week's homework](../../week-4/homework) again. Try and have a complete visualization to share with the class the next time we meet.

### Example
I've put together [a commented example](https://gist.github.com/nasser/1c2392ec17021e5ef41e6ccd74774232) that might be helpful. It uses data from [flutrack.org](http://www.flutrack.org/) to turn tweets about flu symptoms into a musical piece. I hacked the [Oscillator Frequency example](https://p5js.org/examples/sound-oscillator-frequency.html) as a starting point. To use it, copy the empty p5.js example and replace `sketch.js` with [the one I wrote](https://gist.github.com/nasser/1c2392ec17021e5ef41e6ccd74774232). Uncomment the line in `index.html` that says

```html
<script language="javascript" src="libraries/p5.sound.js"></script>
```

and you should be good to go.

## OSC
If you manage to get the Visualization assignment done, try and get a head start on the next topic: [OSC](https://en.wikipedia.org/wiki/Open_Sound_Control). Try and get two machines sending OSC messages to each other. If you can get a Hello World style sketch working, i.e. send "Hello World" from one machine and print it out on another, that would be a great start. You can run two apps on the same machine to simulate two machines, or work with a partner.

Because OSC is its own protocol and *not* the web, we rely entirely on a web browser to use it, so our usual p5.js set up will need to change a bit. Your options include:

* [p5js-osc](https://github.com/genekogan/p5js-osc) - This involves setting up a node.js server that your p5.js code talks to
* [node's osc](https://www.npmjs.com/package/osc) + [electron](https://github.com/nasser/electron-quick-start) - This involves using a node.js package directly inside an electron app. You can use the [electron/p5.js quick start repository](https://github.com/nasser/electron-quick-start) I set up
* [oscP5](http://www.sojamo.de/libraries/oscP5/) - This is OSC from traditional, non-JavaScript Processing. If you are more comfortable with this, then go for it.
* [ofxOsc](http://openframeworks.cc/documentation/ofxOsc/) - OSC is built into openframeworks, so you can use that if you're more comfortable, too.
