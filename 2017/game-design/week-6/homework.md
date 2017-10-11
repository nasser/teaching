---
layout: post
title: Coded Prototype

date: 10 Oct 2017
school: nyu
class: game design
semester: fall
year: 2017
---

**Due** 17 Oct 2017

1. Build three prototypes in Unity using a mix of C# scripts, built in components, and Asset Store assets
2. You can use prototypes from the previous exercises, or new ideas
3. Come to class prepared to present one of your prototypes

### Resources
1. I put together [a cheat sheet](http://nas.sr/teaching/2016/game-design/unity-cheat-sheet/) of Unity's coding style that you can study. We will go over it in detail next week.
2. Last year I streamed [an entire game development cycle in 2h22m](https://www.youtube.com/watch?v=y3-s7ZfwUAg) which you might find helpful. I go through *everything*, including ideation, unity development, and some iteration.
3. [Unity's Messages](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) is a nice rundown of all the events your code can react to.

### Examples
Some of these include parts of Unity we'll look at next week. Try them out and come to class with any questions you have.

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
