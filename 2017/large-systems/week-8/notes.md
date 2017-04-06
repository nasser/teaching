---
layout: post
title: Week 8 Notes

date: 4 Apr 2017
school: parsons
class: large systems
semester: spring
year: 2017
---

## The ☁️
We started looking at "the cloud" or, more technically, renting time and resources on virtual computers in data centers to run your code. This is frequently the quickest and cheapest way to get your code running for long periods of time on computers beyond your laptop. You can also tap into computational resources that you would not otherwise have access to.

The cloud, of course, is not magical. Many journalists have covered its implications, but [Ingrid Burrington's work for the Atlantic](https://www.theatlantic.com/author/ingrid-burrington/) is a good place to start. The following articles specifically address the geopolitical realities of the cloud:

* [Why Amazon's Data Centers Are Hidden in Spy Country](https://www.theatlantic.com/technology/archive/2016/01/amazon-web-services-data-center/423147/)
* [Why Are There So Many Data Centers in Iowa?](https://www.theatlantic.com/technology/archive/2015/12/why-are-so-many-data-centers-built-in-iowa/418005/)
* [The Strange Geopolitics of the International Cloud](https://www.theatlantic.com/technology/archive/2015/11/the-strange-geopolitics-of-the-international-cloud/416370/)
* [What People Mean When They Talk About ‘The Cloud’](https://www.theatlantic.com/technology/archive/2015/11/what-people-mean-when-they-talk-about-the-cloud/413758/)

Additionally, [Greenpeace](http://greenpeace.org) has an initiative and writeup on [the environmental impact of the cloud](http://www.greenpeace.org/international/en/publications/Campaign-reports/Climate-Reports/How-Clean-is-Your-Cloud/).

None of this is to say that you shouldn't use cloud computing in your work. Quite the opposite, it might be the most efficient solution to many problems. But when you *do* lean on the cloud, be mindful that it exists within a larger context, and it is not magically devoid of repercussions.

### Cloud Providers
There are a number of organizations that will lease you time on their systems. Some will own and manage their own hardware, and some will actually lease you time that they themselves are leasing from a larger organization. The choice of who to host with depends on a number of factors, including what kind of capabilities you require, the stability of the service, its convenience, and its cost. In class, we are using [Digital Ocean](https://www.digitalocean.com/), but alternatives include:

#### [Amazon AWS](https://aws.amazon.com/)
Amazon's flagship cloud computing platform. It is *extremely* powerful and full featured, and many other cloud services are actually built on it. It is useable by artists and hackers like us, but given that it was designed for large scale networking the learning curve can be quite steep. They have a large number of *products*, each of which does a different thing, but the main ones for our purposes would be [EC2](https://aws.amazon.com/ec2/?nc2=h_m1), their computer-in-the-cloud service, [S3](https://aws.amazon.com/s3/?nc2=h_m1), their file storage service, and [DynamoDB](https://aws.amazon.com/dynamodb/?nc2=h_m1), their database. I've used EC2 for access to a Linux box in the cloud, and I manage some of my domain names with AWS as well.

#### [Heroku](https://www.heroku.com/)
Much simpler than Amazon, Heroku does not actually give you access to a computer in the cloud. Instead, they host *applications*, meaning all you can do is push code to a git repository they provide you, and they manage the rest. This means that the burden of maintaining a server is taken off your shoulders, and all you have to do is write the code that your app depends on. The flipside is you are limited by the design of their system, and have to work within their constraints. They only support a set number of languages, and you cannot use the server as a normal computer (you cannot, for example, create files easily). I've run projects out of Heroku in the past.

#### [Now](https://zeit.co/now)
Fairly new and quite radical, now is even lighter weight than Heroku. You don't even need a git repository, just a `package.json` file. They automatically generate a URL for your app and run your code there, and every new version gets its own URL. I haven't used Now in production anywhere, but its kind of cool and weird and worth trying once or twice.

#### [Linode](https://www.linode.com/)
Old school access to a Linux box in the cloud. This is like Digital Ocean without the bells and whistles. I host many of my twitter bots here.

## Coding Servers
A web server is any program listening on port 80 that correctly participates in the [web protocol, HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol). This is something a browser can talk to. You can write such a program in any programming language using a number of libraries, but in class we are using the [JavaScript language](https://www.javascript.com/) on the [node.js runtime](https://nodejs.org/en/) and the [express.js](https://expressjs.com/) library. Express makes developing servers more straightforward than dealing with node.js's networking directly. Namely, withoug express, we would have to deal with raw bytes coming off of a TCP socket, but express parses this for us nicely and lets us react to HTTP requests like `get` and `put`.

In class we went through a basic deployment of an express app to a Digital Ocean droplet. We skipped some things like encryption and process management that you'd want on a more production-ready server. Configuring a server is a large topic, and it is different for every project. There are tutorials online that offer good guidance, and a lot of knowledge comes from experience over time. I found [this lengstorf](https://code.lengstorf.com/deploy-nodejs-ssl-digitalocean/) tutorial on a more complete express app deployment interesting. You can compare what we did in class with this tutorial to see the difference between a minimal server and a more complete one.

## Secure Shell (SSH)
We access our Digital Ocean droplets using `ssh`, an encrypted connection between our computers and the virtual machine in the cloud. The fact that it is encrypted is important, because otherwise *anyone* could conceivably send commands to your droplet and change, break, or steal things. Because, like any Large System, the machine on Digital Ocean's side only sees a bunch of bytes when anyone sends it a message, it needs a way to confirm that the bytes do in fact come from you. This is done using Public Key Cryptography. Computerphile has a nice video on [the basic idea](https://www.youtube.com/watch?v=GSIDS_lvRv4). The actual mathematics and technolgy that goes into achieving this is quite intense, but you do not need to understand it deeply to use it (I certainly don't).

In class, we generated a pair of keys and told Digital Ocean our public key. This allowed us to use our private key to encrypt messages we sent to them. `ssh` is a command line program that gives you terminal access to the remote machine, but it also allows for secure file sharing. We used [Cyberduck](https://cyberduck.io/) in class to upload whole folders to the server after we had tested our code locally to ensure it worked.
