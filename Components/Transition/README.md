# Transition

Transition

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)
* [CubicBezier](https://github.com/WanSpi/SiteComponents/tree/main/Components/CubicBezier)

## Create

```JavaScript
Core.Transition.Create({
    Duration: 1000, // number | milisecunds | default 1000
    TickEvent: function(value) {
        // Code
    },
    EndEvent: function() {
        // Code
    },
    CubicBezier: Core.CubicBezier.Ease // CubicBezierObject | default EaseInOut
});
```

```JavaScript
new Core.Transition.TransitionObject({
    Duration: 1000, // number | milisecunds | default 1000
    TickEvent: function(value) {
        // Code
    },
    EndEvent: function() {
        // Code
    },
    CubicBezier: Core.CubicBezier.Ease // CubicBezierObject | default EaseInOut
});
```

## TransitionObject

### Tick parameters

```JavaScript
TransitionObject.Time; // [0, Duration]
TransitionObject.Value; // [0, 1]
```

### Activate methods

```JavaScript
TransitionObject.Start();
TransitionObject.Pause();
TransitionObject.Stop();
```

### Config methods

```JavaScript
TransitionObject.SetCubicBezier(CubicBezierObject cubicBezier);
TransitionObject.SetDuration(int duration);
TransitionObject.SetTickEvent(function tickEvent);
TransitionObject.SetEndEvent(function endEvent);
```

## Files

* /Transition.js