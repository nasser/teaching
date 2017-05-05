---
layout: post
title: Week 11 Notes

date: 25/26 Apr 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

The final chapter of Large Systems is the discussion of hardware.
This is part of what makes this class *more* than a networking class.
Although the details are different, the concepts we've been discussing all semester continue to apply.
We're still confronted with logical systems in more than one place that need to coordinate with each other.
The difference here is that the systems are *very* constrained compared to the laptops and servers we've interacted with so far, and as a result communication becomes less convenient in practice.
But the same thinking around protocols and interfaces we've been talking about all semester will make these systems easier to design and reason about.

## Serial Communication
We started our exploration of hardware by looking at [serial communication](https://en.wikipedia.org/wiki/Serial_communication), where bits are sent one at a time over a wire. The opposite of this is [parallel communication](https://en.wikipedia.org/wiki/Parallel_communication), where multiple bits move across multiple wires at the same time. For a variety of reasons (including [clock skew](https://en.wikipedia.org/wiki/Clock_skew), [crosstalk](https://en.wikipedia.org/wiki/Crosstalk), and cable cost), parallel interfaces have become less popular outside of specific use cases (typically within circuit boards).

![](y3iValE3XFyRtRsFeKeQFA.png)

*[DB25](https://en.wikipedia.org/wiki/D-subminiature) printer cable with many pins. At least 8 of the 25 pins were each dedicated to a bit and sent at the same time, depending on the protocol*

So, serial communication is a very general idea, but to communicate between a laptop and an Arduino we looked at the [RS-232 serial protocol](https://en.wikipedia.org/wiki/RS-232). RS-232 is so ubiquitous that in many context when people just say "serial" they are referring to RS-232. RS-232 was originally used as an interface for *computer peripherals*, like game controllers and drawing tablets.

![](FLF79CaykfqNiNP47D1eg.png)

*RS-232 historically ran over [DB9](https://en.wikipedia.org/wiki/D-subminiature#Communications_ports) and only used one pin to transmit and one to receive data*

We run RS-232 over [USB](https://en.wikipedia.org/wiki/USB), which is its own distinct physical interface and protocol, but it is designed to be able to [*emulate* RS-232](https://en.wikipedia.org/wiki/USB_communications_device_class) (USB has multiple different ["device classes"](https://en.wikipedia.org/wiki/USB#Device_classes), so USB devices can announce what they do (e.g. printers, thumb drives, and webcams all work over USB, but they'd all have different device classes), and [one of those device classes](https://en.wikipedia.org/wiki/USB_communications_device_class) can emulate RS-232).

We differentiated between a *computer* which tends to be quite powerful and runs an operating system providing you with a TCP/IP stack among other things, and a *microcontroller* like the Arduino, which tends to be underpowered and lacking in an OS. Talking to a microcontroller is necessarily absent of the conveniences of a more powerful device, but its power consumption, battery life, size, and weight tend to be better. You also cannot wire sensors directly to pins on a modern computer the way you can on an Arduino, though the Raspberry Pi is something of an exception to this (it *is* a computer in that it runs Linux, but it exposes programmable pins and plays the roll of a microcontroller in many sense).

## An Aside on Binary and Voltages
We tend to think of computers communicating in 1s and 0s, where a 1 is represented electrically by a *high* volgate and a 0 is represented by a *low* voltage.
In practice, these are the kind of electronics you will encounter for sure.
But historically there have been counting systems besides binary and computing systems that did not work in 1s and 0s.

### Numeral Systems
Binary is a [*base-2* numeral system](https://en.wikipedia.org/wiki/Binary_number) (or: counting system), which is to say that it is a numeral system with 2 digits (0 and 1). The normally  way we count is in [*base-10*, or "decimal"](https://en.wikipedia.org/wiki/Decimal) which is a numeral system with 10 digits (0, 1, 2, 3, 4, 5, 6, 7, 8, and 9). The only reason the popularity of base 10 is the fact that we have ten fingers and history. Another numeral system you will encounter in computing is [*base-16* or "hexadecimal"](https://en.wikipedia.org/wiki/Hexadecimal) with sixteen digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F) that gets used because it is small and yet can more compactly express numbers than decimal.
Mathematically speaking, you could have a numeral system with as many digits as you want, you just have to make up symbols for each digit. Wikipedia goes up to [60](https://en.wikipedia.org/wiki/Sexagesimal), but there is no formal "limit" on the base of a numeral system.

![](nAGgE6s5GPbdI8h4N7CwA.png)

*macOs's Calculator app has a Programmer Mode that makes converting between bases quicker*

### Non-binary Computers
Historically, computers didn't always use binary encoding for data. [Ternary computers](https://en.wikipedia.org/wiki/Ternary_computer) like the Soviet [Setun](https://en.wikipedia.org/wiki/Setun) continued to be made into the 70s, and the American [ENIAC](https://en.wikipedia.org/wiki/ENIAC) and [7070](https://en.wikipedia.org/wiki/IBM_7070) were [decimal computers](https://en.wikipedia.org/wiki/Decimal_computer).

Instead of dividing voltages simply into "high" (1) and "low" (0), ternary computers have to divide voltage levels into "high", (2) "medium" (1), and "low" (0). Decimal computers have to divide voltages *even further* to try and interpret ten different discrete voltage levels. The requirement for more sensitive voltage detection increases the complexity of the computer. Meanwhile, there isn't anything you can't represent in base-2 anyway, so the simpler base-2 computers took over with time.

### Analog Computers
An analog computer is a computer that does not operate on discrete values, but rather continuous ones. A voltage level of 4.562v, for example, is not meant to mean a value of `HIGH` or 1, it literally represents the value 4.562. Computing in this way is very different from digital computers but still possible. Synthesizers and video effects in the 80s tended to be analog computers.

![](14EsplSsJf7gbEz6mBZbw.png)

*Plugboard computers flowed analog data from one computing unit to another using manually wired cabling. They were used to model mathematical problems in air forces and space programs through the 70s*

## Communicating in Bytes
RS-232 enables you to push bits across the wire on one end and have them show up on the other end. It's a two way protocol, so there's always exactly one sender and one recipient. The bits can mean whatever you want them to mean, but you are usually constrained to sending and receiving eight at a time (operating systems rarely let user code address individual bits of memory, the lowest level of granularity tends to be the byte). By using the the binary counting system, eight bits can be thought of representing a number between 0 and 255. If all you want to send is a stream of numbers, then all you have to do is stream bytes and read them in on the other end (What those numbers *actually mean*, e.g. a temperature reading or a pressure sensor reading, is up to you. Numbers are numbers, your interpretation provides the meaning).

### Sending Text
Often, we want to send more than just a stream of numbers. Sending readable text is convenient for debugging and other purposes. The constraints of the medium cannot be changed, however. We need to represent text in terms of bytes, i.e. in terms of numbers. The easiest way to do that is to assign a number to every letter. Such a scheme is called a *character encoding* and the most prevalent one today is [ASCII](https://en.wikipedia.org/wiki/ASCII).

![](FZzAXpCJAw1c27NvbyYbg.png)

ASCII assigns numbers between 0 and 31 to control codes that are no longer meaningful aside from Tab, Line Feed and Carriage Return. The remaining "printable" characters are a mix of punctuation, digits and latin letters. If you're expecting ASCII text as part of your protocol (i.e. you've decided that your devices are going to be sending ASCII data to each other), receiving a byte with the value 76 can be understood to mean the latin letter `L`. Nothing is being *converted* per se, you're just *choosing* to interpret the number of 76 as the letter `L`.

The main limitation of ASCII is that it does not encode alphabets beyond the latin one. Indeed, in order to represent *all alphabets* you need more than one byte per character and a fairly complicated scheme to manage the whole thing. There is already a system in place that does a decent job at this called [Unicode](https://en.wikipedia.org/wiki/Unicode). To accomplish its goal of representing all written human cultures, Unicide is unavoidably much more complex. As an example, where ASCII defined 127 code points, Unicode defines a whopping 1,114,112 code points. Its [most popular encoding](https://en.wikipedia.org/wiki/UTF-8) is backwards compatible with ASCII, however, so it tends to be a "drop in replacement". If you're on a device running an operating system, you can count on the OS to provide you a Unicode implementation. If you're on e.g. an Arduino, that's going to be a lot harder to come by. Text should be understood to be, in general, a hard problem.

### Sending Something Else
What if you don't want to send text, but you want to send another kind of structured data? Let's say the values from multiple sensors at the same time? You have to design your own protocol for this. You could, for example, send the value of each sensor in turn and try and make sure your computer knows how to tell the bytes apart, you can pick certain "special" bytes to describe the bytes that follow them, and so on. This byte protocol design replaces what you might use JSON for on more capable devices.

### Controlling The Microcontroller
Often, all you want to do is read or write values from the pins of your microcontroller, and designing and implementing a protocol for that might be overkill. The [firmata protocol](https://github.com/firmata/protocol) is simple, popular protocol that provides exactly that. You install provided firmata code on your microcontroller which prepares it to participate in the protocol. Then, you can use libraries on your computer to talk to your microcontroller and read and write to and from its pins. Computer libraries exist for [Processing](https://github.com/firmata/processing), [openFrameworks](http://openframeworks.cc/documentation/communication/ofArduino/), [node](http://johnny-five.io/), and many others.

## Resources
* [Electronics Tutorials — Binary](http://www.electronics-tutorials.ws/category/binary), especially [Binary Numbers](http://www.electronics-tutorials.ws/binary/bin_1.html)
