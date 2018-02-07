---
layout: page
title: Consuming Data

date: 6 Feb 2018
school: parsons
class: large systems
semester: spring
year: 2018
---

**Due** 13 Feb 2018

Using the [code from class](https://gist.github.com/nasser/5eba676b2e3bf23198009b3529524587) as a starting point, write a p5.js sketch that consumes data from a JSON URL and visualizes it/does something interesting with it.

1. [Download p5.js](https://p5js.org/download/) and extract it
2. Copy the `empty-example` to start a new project. Give the new folder a new unique name.
3. Pick an API from [this list](https://github.com/toddmotto/public-apis) to pull data from. Make sure to pick an API where `Auth` is `No`. We will talk about authentication next week.
4. Make a visualization of the data by connecting values you extract from the JSON to values that affect your sketch in p5.

Remember to look at the JSON in your browser to make sense of its structure. This is part of the benefit of a readable serialization format. Read up on JSON's [syntax](https://www.tutorialspoint.com/json/json_syntax.htm) and [data types](https://www.tutorialspoint.com/json/json_data_types.htm). They map more or less to JavaScript syntax and data types.

If you're *totally stuck* on what to draw, try hacking some networking code into an existing p5 example. Something simple like [shapes](https://p5js.org/examples/hello-p5-simple-shapes.html), [points and lines](https://p5js.org/examples/form-points-and-lines.html), or [primitives](https://p5js.org/examples/form-shape-primitives.html) is an OK place to start.

Next week we will look at web APIs that require authentication, so if you have any you are interested bring them to class as well.
