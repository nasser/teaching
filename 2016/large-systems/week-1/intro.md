---
layout: post
title: Beginnings &amp; Homework due Feb 2

date: 25 Jan 2016
school: parsons
class: large systems
semester: spring
year: 2016
--- 

![](http://cdn.theatlantic.com/assets/media/img/mt/2015/10/IMG_2731/lead_960.jpg)
<cite>From [The Room Where the Internet Was Born](http://www.theatlantic.com/technology/archive/2015/11/where-was-the-internet-born/413221/) by [Ingrid Burrington](http://lifewinning.com/), photo by [Sam Kronick](http://www.samkronick.com/)</cite>

Welcome! I am sorry I could not be with you for your first class. I have included in writing what would have been my introductory lecture. See you all next week!

## What is a "Large System"?
I define a system to be "Large" if *software is executing simultaneously in more than one place and must be coordinated*. Examples include:

* Multiplayer video games
* Sensors in the field that report data back to a server
* Installations that poll web APIs
* Swarms of devices
* Custom hardware that communicates with computers
* Email

"Large System" is about as formal a term as "Creative Coding" is. The closest concept in Computer Science is a [Distributed System](https://en.wikipedia.org/wiki/Distributed_computing).

## Why this class?
This class was formed on the observation that students tend to build large interconnected projects, but recieve little to no instruction in how to reason about such systems. The fact is that there is a *wealth* of literature going back decades on the subject. Indeed, one of the earliest things we tried to do with computers was get them to talk. [CSP](https://en.wikipedia.org/wiki/Communicating_sequential_processes), a conceptual model of concurrency that is gaining popularity with the Go programing language and Clojure's core.async library, was put forth in a [1978 paper](http://spinroot.com/courses/summer/Papers/hoare_1978.pdf). The so-called ["mother of all demos"](https://www.youtube.com/watch?v=yJDv-zdhzMY) featured video conferencing and collaborative document editing in 1968 (!).

The hope is to bring this thinking to you, the DT student, to empower your practice. I intend to expose you to the conceptual and technical tools you need to coordinate multiple devices in a hetrogenous network.

Another way to think of this class is by analogy. As Arduino and the maker community are to electrical engineering, and openFrameworks and creative coding are to software engineering, this class (humbly) aspires to be to network engineering. I want you to understand what you are doing, be able to design a coherent network, but always in the service of your greater vision and goals.

## Who is this class for?
If you are working on projects that can be classified as Large, this class will give you the foundation to build them with less grasping in the dark. Many multi-device installations will benifit, as will online experiences and games.

There will be a lot of code to write, in multiple languages. Indeed, one of the natural side effects of running different code on different machines is that they will be written in different languages, but yet must communicate somehow. We will be using Processing, JavaScript, and Arduino/C++ primarily. Proficiency helps, but fluency is not required. You are also welcome to use whatever language you are comfortable with as long as it can participate in our networks correctly. As we will see, a robust network must be able to handle new and unforeseen actors.

## Who am I?
You can read about me and my work [on my site](http://nas.sr), but for the direct purposes of this class my experience with Large Systems includes Twitter bots, social media powered video games, data visualizations pulling from multiple sources, video game backends, and about a decade of web development experience. My more public focuses have been video games and programming language design, but networking has always been the ace up my sleve and this knowledge has saved me more than once. By the end of the semester, I hope you all too have similar aces up your sleves, or at least some other high value card.

## Homework

### Your Practice
What Large Systems are you building? Have something in mind for the midterm or final? We will go around next week getting caught up on what everyone is working on, so be prepared to talk about your projects.

### Network View
The Large System we interact with most frequently is the internet. We will be looking at different ways to study the way information moves through the network, but the simplest way is to use your browser. Modern browsers will expose statistics on their incoming and outgoing traffic. To see this in Chrome, go to `View > Developer > Developer Tools`.

![]({{ site.url }}/images/network-view-1.png)

Then click the Network tab.

![]({{ site.url }}/images/network-view-2.png)

[Firefox users should follow this guide](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor).

These tools will expose each piece of data being requested by your browser. Visit a few sites with the network view open. What do you see? Does anything surprise you? What does a news site look like compared to a video streaming site? What does your own site look like? Come to class prepared to discuss.

### Largest Systems
Find examples of the "Largest" systems you can think of. What does Largest even mean? How were these systems built? Who built them? Who uses them? What are their goals? Have they achieved them? Come to class prepared to discuss.