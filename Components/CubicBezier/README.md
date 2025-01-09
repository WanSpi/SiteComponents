# CubicBezier

CubicBezier

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## Create

```JavaScript
Core.CubicBezier.Create(.5, .5, .5, .5);
```

```JavaScript
new Core.CubicBezier.CubicBezierObject(.5, .5, .5, .5);
```

## CubicBezierObject

```JavaScript
CubicBezierObject.GetProgression(time); // time - [0, 1]
```

## Default objects

```JavaScript
Core.CubicBezier.Ease       // CubicBezierObject(.25, .1, .25, 1),
Core.CubicBezier.EaseIn     // CubicBezierObject(.42, 0, 1, 1),
Core.CubicBezier.EaseOut    // CubicBezierObject(0, 0, .58, 1),
Core.CubicBezier.EaseInOut  // CubicBezierObject(.42, 0, .58, 1),
Core.CubicBezier.Linear     // CubicBezierObject(.5, .5, .5, .5),
```

## Files

* /CubicBezier.js