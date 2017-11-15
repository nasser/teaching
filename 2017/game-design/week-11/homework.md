---
layout: post
title: Flexible Code

date: 14 Nov 2017
school: nyu
class: game design
semester: fall
year: 2017
---

**Due** 21 Nov 2017

## As Flexible As Possible

Build a prototype that has the *most* interactions/behavior/features and uses the *least* number of Unity components

If you want to present your coroutine homework next week please do that as well. Sorry I didn't make time for it tonight!

## Final Project Proposals

If you haven't sent me a proposal, please do so!

# Notes

To recap the lecture on flexible code:

* When possible, prefer *local* code over *global* code.
  * Prefer code that interacts *with itself* over code that interacts with *other scripts*
  * Prefer code that interacts with *children* over code that interacts with *objects across the scene*
* Be mindful of *who knows what*, and try and keep the interpretation of events *local*
  * e.g. a hazard should not modify a player, but rather send the player a message that the player can then interpret for themselves
  * e.g. a pickup should not modify a player, but rather attach a component to the player and allow the player to use that component locally
* Be mindful of the *assumptions* your code makes
  * Does it assume other objects have certain components?
  * Does it assume two different behaviors always happen together?
  * Does it assume objects with certain names exist in the scene?
  * Does it hard code values?
* Try and turn *hardcoded* values into *parameters*
* Remember that everything is a tradeoff
