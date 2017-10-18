---
layout: post
title: Scripts &rarr; Systems

date: 17 Oct 2017
school: nyu
class: game design
semester: fall
year: 2017
---

**Due** 24 Oct 2017

1. Build a prototype in Unity using only built-in components and your own C# scripts, i.e. nothing from the Asset Store
2. This week, try and write your own scripts if you haven't done that yet
3. Use `GetComponent` and the concepts we covered in class to get your GameObjects and Components to *talk* to each other and interact
4. Be prepared to talk about how your code is interacting in class
5. If you can reuse your components to make variations of your prototype that's even better!

### Resources

#### Prototyping Video
The [recording of my prototyping stream](https://www.youtube.com/watch?v=y3-s7ZfwUAg) is available for your review if it helps

#### Cheat Sheet
The [cheat sheet](http://nas.sr/teaching/2016/game-design/unity-cheat-sheet/) has been ported to C# and is yours to study

### Class Review

#### The dot operator
The dot symbol `.` shows up a lot. Microsoft calls it the "member access" operator, and [their technical documentation](https://msdn.microsoft.com/en-us/library/6zhxzbds.aspx) might be helpful, but here's how I think about it: `a.b` means get the thing named `b` out of the thing named `a`. `a.b.c` means get the thing named `b` out of the thing named `a`, then get the thing named `c` out of *that* thing. I say *thing* here because it can be objects, classes, namespaces, or methods.

##### Examples

```csharp
Debug.Log("Hello");
```

Get the [`Log` method](https://docs.unity3d.com/ScriptReference/Debug.Log.html) out of the [`Debug` class](https://docs.unity3d.com/ScriptReference/Debug.html) and call it with the string `"Hello"`

```csharp
gameObject.transform.Translate(1, 3, 4);
```

Get the [`Translate` method](https://docs.unity3d.com/ScriptReference/Transform.Translate.html) out of the [`transform` object](https://docs.unity3d.com/ScriptReference/GameObject-transform.html) out of the [`gameObject` object](https://docs.unity3d.com/ScriptReference/Component-gameObject.html) the current script is attached to and call it with the parameters `1, 3, 4`.


#### Generic Methods

When we called `GetComponent` in class, the syntax looks a bit different from other methods

```csharp
GetComponent<Rigidbody>().AddForce(1, 0, 0);
```

`GetComponent` here is what C# calls a *generic method*. [Unity](https://docs.unity3d.com/Manual/GenericFunctions.html) and [Microsoft](https://msdn.microsoft.com/en-us/library/twcad0zb.aspx) have their own documentation if that helps. That means it's a method that knows something extra about the type of data it is operating on, in this case the type of component it is returning. You put the type information between angle brackets before the parentheses. Other than that, it's like calling a normal method. Generics are what allow MonoDevelop to display auto completion for you. There are other ways of calling `GetComponent` without the angle brackets

```csharp
GetComponent("Rigidbody");
GetComponent(typeof(Rigidbody));
```

But C# does not actually know the exact kind of component that will be returned, so you *cannot* do this:

```csharp
GetComponent("Rigidbody").AddForce(1, 0, 0); // does not work
GetComponent(typeof(Rigidbody)).AddForce(1, 0, 0); // does not work
```

Instead, you have to *cast* the value, basically tell C# that you're sure you will get a `Rigidbody` object

```csharp
((Rigidbody)GetComponent("Rigidbody")).AddForce(1, 0, 0); // does will work
((Rigidbody)GetComponent(typeof(Rigidbody))).AddForce(1, 0, 0); // does will work
```

This is pretty clunky, and does not get auto completion, so I prefer generics.
