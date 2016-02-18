---
layout: post
title: Back and Forth

date: 16 Feb 2016
school: parsons
class: large systems
semester: spring
year: 2016
--- 

**Due** 23 Feb 2016

![](http://thecircular.org/wp-content/uploads/2014/04/Two-way-communication.jpg)

In pairs, use OSC to create a two way networked experience. The experience can be anything as long as two seperate machines communicate using OSC. Examples include: chat applications, [two](https://en.wikipedia.org/wiki/Pong) [player](https://en.wikipedia.org/wiki/Tetris) [games](https://en.wikipedia.org/wiki/Nidhogg_(video_game), interactive installations.

You are free to use any programming language, but the most straightforward approach is to use [Processing](https://processing.org/) and the [oscP5](http://www.sojamo.de/libraries/oscP5/) library. 

### Install oscP5 in Processing

In Processing, select Sketch > Import Library... > Add Library...

![](http://i.imgur.com/0p3PrnH.png)

Search for oscP5, select it, and click install

![](http://imgur.com/G041rkd.png)

### Use oscP5 in Processing

Sketches that use oscP5 begin with  

    import oscP5.*;
    import netP5.*;


### Finding your IP

You will need to know the IP address of your machines.

* [OSX](http://osxdaily.com/2010/11/21/find-ip-address-mac/)
* [Windows](http://windows.microsoft.com/en-us/windows/find-computers-ip-address#1TC=windows-7)
* [Linux](http://www.cyberciti.biz/faq/bash-shell-command-to-find-get-ip-address/)

### oscP5 examples

* [`oscP5message`](http://www.sojamo.de/libraries/oscP5/examples/oscP5message/oscP5message.pde) demonstrates different kinds of data that can be put in a message
* [`oscP5parsing`](http://www.sojamo.de/libraries/oscP5/examples/oscP5parsing/oscP5parsing.pde) demonstrates sending data and unpacking recieved data
* [`oscP5broadcaster`](http://www.sojamo.de/libraries/oscP5/examples/oscP5broadcaster/oscP5broadcaster.pde) demonstrates a more intricate protocol with multiple messages

### Submission

Email me your code as an attachment or a link before Tuesday to get feedback on it. Come to class prepared to present your work, discuss your expeirence, the problems you faced, how you overcame them.