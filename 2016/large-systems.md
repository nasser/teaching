---
layout: page
title: Large Systems
school: parsons
class: large systems
semester: spring
year: 2016
---

![](http://clipartfreefor.com/cliparts/internet-clipart/cliparti1_internet-clipart_02.jpg)

[Sylabus]({{ site.url }}/{{ page.year }}/{{ page.class | slugify }}/syllabus.pdf)

### Posts
{% assign posts = site.posts | where: "school", page.school | where: "class", page.class | where: "semester", page.semester | where: "year", page.year | sort: "year" | reverse %}
{% for post in posts %}
*{{ post.date | date_to_string }}* [{{ post.title }}]({{ post.id }}) 
{% endfor %}