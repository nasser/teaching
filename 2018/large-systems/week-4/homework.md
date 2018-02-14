---
layout: page
title: Consuming Authenticated Data

date: 13 Feb 2018
school: parsons
class: large systems
semester: spring
year: 2018
---

**Due** 20 Feb 2018

1. Pick an API that requires authentication from [the list](https://github.com/toddmotto/public-apis) or anywhere else. Remember that OAuth is considerably more of a challenge, so stick to APIs that provide keys for now.
2. Sign up for it and get an API key. Watch out for costs and rate limits! Try and stick to free APIs for now.
3. Pull data from the API into a p5 sketch like last week's homework.
4. Be mindful of how this experience was different from last week's.

If you encounter CORS problems, you might be able to get around them by using [npm `serve`](https://www.npmjs.com/package/serve) from your p5 directory and visiting [`http://localhost:5000`](http://localhost:5000). This is jumping ahead a bit, and we're going to look at JavaScript and node in more detail later, but `serve` lets you create a small local server so that your browser treats your project like a web page and not a file on your computer.


[Here's](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) the chapter from Fielding's thesis about REST if you're interested.
