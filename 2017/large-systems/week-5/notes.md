---
layout: post
title: Week 5 Notes

date: 14 Feb 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

We did a deep dive into JavaScript this week. In addition to the concepts that make Large Systems work, the JavaScript language is a tool that has become unavoidable in this kind of work. It is [quite different from Java](https://i.imgur.com/76Wtthy.jpg), which you have seen in Processing, in ways that are quite powerful. We will use it in the browser via p5.js and on servers via node.js, at the very least.

## Child of the Browser Wars
It is important to trace JavaScript's history back to the [Browser Wars](https://en.wikipedia.org/wiki/Browser_wars), specifically the [First Browser War](https://en.wikipedia.org/wiki/Browser_wars#First_Browser_War). This is a somewhat over-the-top name for the competition between browser vendors in the 90s for dominance of the then young web market. What's relevant for us is that JavaScript was born in chaos, and has [inherited a lot of quirks](https://www.destroyallsoftware.com/talks/wat) as a result. I bring this up because, in addition to being a weird story, while JavaScript is extremely powerful and useful, it is wonky and weird, and if you find yourself not understanding some confusing behavior or syntax, you're not missing some profound point. There are just some quirks to learn in order to use the language. Realizing that helped me when I was learning code, and it may help you.

## Learning JavaScript
Like any programing language, mastery of JavaScript will come with time and practice. We can't focus too much on the language itself in this class, because we're really here to talk about Large Systems, but my hope is that the assignments will keep you practicing and getting better. I definitely recommend using our great TA for help, as well as online resources. These are a few that I've used:

* [p5.js's JavaScript basics](https://github.com/processing/p5.js/wiki/JavaScript-basics)
* [Mozilla's Introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [Eloquent JavaScript](http://eloquentjavascript.net/)

## Different Hosts
JavaScript, as a language, defines its basic types and syntax, but it is designed to run in a *host*. That host gives JavaScript access to the outside world, input, output, and a lot of its apparently built in functionality. This is how the same language can do very different things, depending on its host.

### The Browser
This is the most usual host, and for years it was *the only* host. The browser provides JavaScript with information about the [current location](https://www.w3schools.com/jsref/obj_location.asp), [the window](https://www.w3schools.com/jsref/obj_window.asp), [the document](https://www.w3schools.com/jsref/dom_obj_document.asp) that is being displayed, and more. Importantly, the [Document Object Model, or the DOM](https://en.wikipedia.org/wiki/Document_Object_Model), the programmatic way to manipulate HTML documents or UIs. Via the DOM we can access the [canvas](https://www.w3schools.com/html/html5_canvas.asp) and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL). Combine all of that with the fact that everything is distributed by design (it's all on the web), and this makes the browser one of the most powerful graphical interactive platforms on the planet today.

There are limitations, however. Because of its role in people's personal lives, the code that browsers run is extremely limited, or *sandboxed*. There are mechanisms to restrict [where data can be loaded from](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), how the file system is accessed, knowledge about other tabs, and so on. This is important for every day browsing, but can become a pain when trying to use JavaScript as a creative tool.

### Node.js
For situations where a graphical or interactive platform are not important, node.js shines. It uses Chrome's JavaScript engine, which is quite fast, and provides access to the [file system](https://nodejs.org/api/fs.html), [sockets](https://nodejs.org/api/dgram.html), the [operating system](https://nodejs.org/api/os.html), and most importantly, a staggering [ecosystem of packages](http://npmjs.com/).

### Electron
Sometimes we want it all: the graphical and UI power of the browser, but without the limitations, and access to the full machine and an ecosystem of packages. The good people at GitHub gave us [Electron](http://electron.atom.io/) so we can have exactly that. Electron is a browser-like host for JavaScript designed to build apps. You can think of it as a special purpose browser with node.js built in. It is one of my favorite ways to write JavaScript, and I've prepared an [electron/p5.js starter](https://github.com/nasser/electron-quick-start) for you to use if you want.
