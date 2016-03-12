---
layout: post
title: Networked Pong

date: 8 Mar 2016
school: parsons
class: large systems
semester: spring
year: 2016
---   

**Due** 29 Mar 2016

Implement a Pong game that will be played over the network using OSC.

The goal is not to make a game where you can win, but to achieve a coherent game of Pong over the network with another codebase. You may work together or collaborate on Pong implementations that are meant to work together, but make it known in class that you did so.

This is your midterm.

### The Specification

The game window should be 500 x 500 pixels. The ball should be 20 x 20 pixels. The paddles should be 10 x 100 pixels. Standard Pong rules should apply.

The OSC protocol consists of two messages:

### `/player/position float float`
* When you recieve a /player/position message, interpret it as an update to your opponent’s position.
* The first float is the x coordinate, the second is the y coordinate.
* The values range from 0 to 500, where 0 represents the left-most edge and 500 represents the rightmost edge in x, and 0 represents the bottom of the and 500 represents the top in y.
  
### `/ball/position float float`
* When you recieve /ball/position message, interpret it as an update to where your opponent thinks the ball is
* Interpret the arguments as coordinates as in /player/position
* You may choose to visualize this position, compare it to where you think the ball is, or ignore it.