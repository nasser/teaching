---
layout: post
title: Coded Prototype

date: 18 Oct 2016
school: nyu
class: game design
semester: fall
year: 2016
--- 

**Due** 25 Oct 2016

1. Build three prototypes in Unity using C# scripts
2. You can use prototypes from the previous exercises, or new ideas
3. If you use new ideas, make sure to go through the game brainstorming/game design document/punch list plan as before

### Twitch Stream

To give you a concrete sense of the concepts we're talking about, I will be streaming my own prototyping session this Saturday (the 24th) at 3pm on [my twitch channel](twitch.tv/ramseynasser). If you can make it, stop by and watch me work. If you can't, that's cool too. I will be recording the session and it will be made available to you to rewatch and study at your leisure.

### C# Scripts

We talked a lot about the underlying semantics of C# last week. It's important to have a sense of what is happening, but here's some more practical information we didn't get to:

* GameObjects in your game will experience events
  * e.g. bumping into things, being clicked on, time passing
* Unity keeps track of this, and when an object experiences an event, Unity sends the object a "message"
  * There is a finite number of messages built in to Unity and they are listed [in their documentation](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html).
* Different objects will react differently to messages
  * A player bumping into a power up might gain health
  * A player bumping into an enemy might lose health
* You specify how your objects react to messages using scripts
* A script contains code to respond to some messages in the form of C# methods
  * e.g. `void Update()`, `void Start()` for the Update and Start messages
* When Unity sends a message to a GameObject *every matching method on every component is triggered*
  * e.g. if you have a GameObject with three scripts that all have `Update` methods, *all three of them are triggered every frame*
  * e.g. if you have a GameObject with three scripts that all have `OnCollisionEnter` methods, *all three of them are triggered whenever the object bumps into another object*
  * The order they're triggered, in general, is up to Unity
* You can mix and match scripts on GameObjects
* Scripts only run when attached to a GameObject and Unity sends that GameObject a message that the scripts can respond to

### Cheat Sheet
We will look at the Unity API more closely next week, but as a head start here's a [cheat sheet](http://nas.sr/teaching/2015/game-design-studio/unity-cheat-sheet/) I made last year that might be helpful. The syntax is UnityScript, but the concepts are the same. I should have a C# cheat sheet for you by next week.

### Examples

#### Taking Input
A common task in game development is reacting to user input. There is no input event or message in Unity, but there is `Update` and the [Input class](https://docs.unity3d.com/ScriptReference/Input.html). We can check every frame if a key is pressed and react to that. Here's a script that moves up, down, left, right depending on the keys pressed. Look at the documentation on [GetKey](https://docs.unity3d.com/ScriptReference/Input.GetKey.html) and [Translate](https://docs.unity3d.com/ScriptReference/Transform.Translate.html) for more information.

```csharp
using UnityEngine;
using System.Collections;

public class Mover : MonoBehaviour {
  public void Update () {
    if (Input.GetKey ("up")) {
      // up key is pressed, move up
      transform.Translate (0, 1, 0);
    } else if (Input.GetKey ("down")) {
      // down key is pressed, move down
      transform.Translate (0, -1, 0);
    } else if (Input.GetKey ("left")) {
      // down key is pressed, move down
      transform.Translate (-1, 0, 0);
    } else if (Input.GetKey ("left")) {
      // down key is pressed, move down
      transform.Translate (1, 0, 0);
    }
  }
}
```

#### Removing GameObjects
Another common response to an event is to remove a GameObject. If an object is "picked up" or "destroyed" in the game you might want to do this. Here's a script that removes everything it touches from the game. It needs to be attached to a GameObject that also has a 2D collider component (e.g. a [BoxCollider2D](https://docs.unity3d.com/Manual/class-BoxCollider2D.html) or a [CircleCollider2D](https://docs.unity3d.com/Manual/class-CircleCollider2D.html)) with `Is Trigger` set to `true` and a [Rigidbody2D](https://docs.unity3d.com/Manual/class-Rigidbody2D.html). Look at [OnTriggerEnter2D](https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnTriggerEnter2D.html), [Collider2D](https://docs.unity3d.com/ScriptReference/Collider2D.html), and [Destroy](https://docs.unity3d.com/ScriptReference/Object.Destroy.html) for more information.

```csharp
using UnityEngine;
using System.Collections;

public class RemovesEverything : MonoBehaviour {
  void OnTriggerEnter2D(Collider2D other) {
    Destroy (other.gameObject);
  }
}
```

#### Playing A Sound
Unity scripting is all about coordinating components. Here's a script that plays a sound when an object is moving too fast because of physics. 

1. It asks the [`Rigidbody` component](https://docs.unity3d.com/ScriptReference/Rigidbody.html) (the built in component responsible for physics) how fast its going, or more specifically what the [magnitude](https://docs.unity3d.com/ScriptReference/Vector3-magnitude.html) of its [velocity](https://docs.unity3d.com/ScriptReference/Rigidbody-velocity.html) is
2. If it is above some amount (controlled by the public `tooFast` variable), it asks the [`AudioSource` component](https://docs.unity3d.com/ScriptReference/AudioSource.html) to [Play](https://docs.unity3d.com/ScriptReference/AudioSource.Play.html) whatever clip is has associated with it. You need to set up the Rigidbody and AudioSource components in the Editor.

```csharp
using UnityEngine;
using System.Collections;

public class ScreamWhenTooFast : MonoBehaviour {
  public float tooFast;
  void Update() {
    float howFast = GetComponent<Rigidbody> ().velocity.magnitude;
    if (howFast > tooFast) {
      GetComponent<AudioSource> ().Play ();
    }
  }
}
```