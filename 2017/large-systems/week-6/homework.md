---
layout: post
title: Local Networks

date: 7 Mar 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

**Due** 14 Mar 2017

## OSC Mice
Get the [OSC Mice](https://gist.github.com/nasser/c6993f3112a93388de2ce3b7513d6f34) sketch from class working if you haven't already. Try getting it to run between two computers on the same network if you can!

**Due** 21 Mar 2017

## Networked Pong
Implement a Pong game that will be played over the network using OSC.

The goal is to achieve a coherent game of Pong over the network with someone else's game. You may work alone or collaborate on Pong implementations that are meant to work together, but I recommend working together.

This is your midterm.

### The Specification

The game window should be 500 x 500 pixels. The ball should be 20 x 20 pixels. The paddles should be 10 x 100 pixels. Standard Pong rules should apply.

The OSC protocol consists of two messages:

### `/player/position float float`
* When you receive a /player/position message, interpret it as an update to your opponent’s position.
* The first float is the x coordinate, the second is the y coordinate.
* The values range from 0 to 500, where 0 represents the left-most edge and 500 represents the rightmost edge in x, and 0 represents the bottom of the and 500 represents the top in y.

### `/ball/position float float`
* When you receive /ball/position message, interpret it as an update to where your opponent thinks the ball is
* Interpret the arguments as coordinates as in /player/position
* You may choose to visualize this position, compare it to where you think the ball is, or ignore it.

### Suggested Approach
Make a local pong game *first*. Implement the basic logic of pong with placeholder variables for the other paddle. Once that works, move on to adding OSC as we did in class to interact with another pong client.
